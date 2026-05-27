from typing import List, Optional
from datetime import datetime
from fastapi import APIRouter, Depends, HTTPException, UploadFile, File, Form
from app.api.deps.auth import get_current_user
from app.schemas.quiz import QuestionType, QuizResponse, QuizBase
from app.services.ai import generate_quiz_from_images
from app.services.database import db_service

router = APIRouter(prefix="/quiz", tags=["quiz"])

@router.get("/usage")
async def get_usage(current_user: dict = Depends(get_current_user)):
    """
    Returns the user's daily quiz usage.
    """
    try:
        count = await db_service.get_daily_usage_count(current_user["id"])
        return {"used": count, "limit": 10}
    except Exception as e:
        print(f"Database Error: {e}")
        raise HTTPException(status_code=500, detail="Failed to fetch usage stats")

@router.post("/generate", response_model=QuizResponse)
async def generate_quiz(
    files: List[UploadFile] = File(...),
    subject: str = Form("General"),
    question_count: int = Form(10),
    question_types: str = Form("mcq"),
    difficulty: str = Form("Medium"),
    current_user: dict = Depends(get_current_user)
):
    """
    1. Receives images and generation parameters.
    2. Validates daily limits and constraints.
    3. Calls Gemini AI to generate quiz content.
    4. Persists the quiz and questions to Supabase.
    5. Returns the full DB-backed quiz object.
    """
    
    # 1. Validation Logic
    # Daily Limit Check
    daily_count = await db_service.get_daily_usage_count(current_user["id"])
    if daily_count >= 10:
        raise HTTPException(
            status_code=429, 
            detail="Daily generation limit reached (10/day). Please try again tomorrow."
        )

    if len(files) > 30:
        raise HTTPException(status_code=400, detail="Maximum 30 images/pages allowed")
    
    if question_count > 20:
        raise HTTPException(status_code=400, detail="Maximum 20 questions allowed per quiz")
    

    image_bytes_list = []
    for file in files:
        if file.content_type not in ["image/jpeg", "image/png", "application/pdf"]:
            raise HTTPException(status_code=400, detail=f"File {file.filename} is not a valid format (JPEG/PNG/PDF only)")
        
        content = await file.read()
        image_bytes_list.append({
            "mime_type": file.content_type,
            "data": content
        })


    try:
        preferred_types = [QuestionType(t.strip()) for t in question_types.split(",")]
    except ValueError:
        raise HTTPException(status_code=400, detail="Invalid question type provided")

    # 2. AI Generation Logic
    raw_questions = generate_quiz_from_images(
        image_data_list=image_bytes_list,
        question_count=question_count,
        preferred_types=preferred_types,
        subject=subject
    )

    if not raw_questions:
        raise HTTPException(status_code=500, detail="AI failed to generate quiz content")

    # 3. Persistence Logic (Professional Naming Convention)
    date_str = datetime.now().strftime("%b %d, %Y")
    title = f"{subject} {difficulty} Mastery Assessment ({date_str})"
    
    try:
        saved_quiz = await db_service.save_quiz(
            user_id=current_user["id"],
            title=title,
            questions=raw_questions,
            difficulty=difficulty
        )
        return saved_quiz
    except Exception as e:
        # If DB fails, we log it and tell the user. 
        print(f"Database Error: {e}")
        raise HTTPException(status_code=500, detail="Failed to save quiz to history")

@router.get("/history", response_model=List[QuizResponse])
async def get_quiz_history(current_user: dict = Depends(get_current_user)):
    """
    Retrieves the authenticated user's quiz history.
    """
    try:
        quizzes = await db_service.get_user_quizzes(current_user["id"])
        return quizzes
    except Exception as e:
        print(f"Database Error: {e}")
        raise HTTPException(status_code=500, detail="Failed to fetch quiz history")

@router.get("/{quiz_id}", response_model=QuizResponse)
async def get_quiz(quiz_id: str, current_user: dict = Depends(get_current_user)):
    """
    Retrieves a specific quiz by ID.
    """
    try:
        quiz = await db_service.get_quiz_by_id(quiz_id, current_user["id"])
        if not quiz:
            raise HTTPException(status_code=404, detail="Quiz not found")
        return quiz
    except HTTPException:
        raise
    except Exception as e:
        print(f"Database Error: {e}")
        raise HTTPException(status_code=500, detail="Failed to fetch quiz")

@router.delete("/{quiz_id}")
async def delete_quiz(quiz_id: str, current_user: dict = Depends(get_current_user)):
    """
    Deletes a specific quiz.
    """
    try:
        success = await db_service.delete_quiz(quiz_id, current_user["id"])
        if not success:
            raise HTTPException(status_code=404, detail="Quiz not found")
        return {"message": "Quiz deleted successfully"}
    except Exception as e:
        print(f"Database Error: {e}")
        raise HTTPException(status_code=500, detail="Failed to delete quiz")
