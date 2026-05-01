from typing import List, Optional
from fastapi import APIRouter, Depends, HTTPException, UploadFile, File, Form
from app.api.deps.auth import get_current_user
from app.schemas.quiz import QuestionType, QuizResponse, QuizBase
from app.services.ai import generate_quiz_from_images
from app.services.database import db_service

router = APIRouter(prefix="/quiz", tags=["quiz"])

@router.post("/generate", response_model=QuizResponse)
async def generate_quiz(
    files: List[UploadFile] = File(...),
    keywords: Optional[str] = Form(None),
    question_count: int = Form(20),
    question_types: str = Form("mcq"),
    current_user: dict = Depends(get_current_user)
):
    """
    1. Receives images and generation parameters.
    2. Calls Gemini AI to generate quiz content.
    3. Persists the quiz and questions to Supabase.
    4. Returns the full DB-backed quiz object.
    """
    
    # 1. Validation Logic
    if len(files) > 10:
        raise HTTPException(status_code=400, detail="Maximum 10 images allowed")
    

    image_bytes_list = []
    for file in files:
        if file.content_type not in ["image/jpeg", "image/png"]:
            raise HTTPException(status_code=400, detail=f"File {file.filename} is not a valid image (JPEG/PNG only)")
        
        content = await file.read()
        image_bytes_list.append(content)


    try:
        preferred_types = [QuestionType(t.strip()) for t in question_types.split(",")]
    except ValueError:
        raise HTTPException(status_code=400, detail="Invalid question type provided")

    # 2. AI Generation Logic
    raw_questions = generate_quiz_from_images(
        image_data_list=image_bytes_list,
        question_count=question_count,
        preferred_types=preferred_types,
        keywords=keywords
    )

    if not raw_questions:
        raise HTTPException(status_code=500, detail="AI failed to generate quiz content")

    # 3. Persistence Logic (Senior Tip: Keep the title descriptive)
    title = f"Quiz on {keywords}" if keywords else f"Quiz from {len(files)} images"
    
    try:
        saved_quiz = await db_service.save_quiz(
            user_id=current_user["id"],
            title=title,
            questions=raw_questions
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
