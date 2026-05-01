import json
from typing import List, Any
import google.generativeai as genai
from loguru import logger
from app.core.config import get_settings
from app.schemas.quiz import QuestionType

settings = get_settings()

# Initialize the Gemini SDK
genai.configure(api_key=settings.GEMINI_API_KEY)

SYSTEM_PROMPT = """
You are an expert educator and multimodal content analyzer.
Your task is to generate a comprehensive quiz based on the provided images.

CORE INSTRUCTIONS:
1. FULL SCAN: You must analyze EVERY image provided. Do not ignore any part of the content.
2. UNIFORM COVERAGE: Distribute the questions evenly across all images and topics. If there is a small paragraph on a later page, ensure it is represented.
3. GROUNDING: Every question must be directly answerable using only the information in the images.
4. KEYWORDS: If the user provides keywords, prioritize making questions for those topics, but do not neglect the rest of the content.
5. FORMAT: Output MUST be a valid JSON list of objects matching the requested schema.

SCHEMA RULES:
- "question": The question text.
- "type": One of: one_word, true_or_false, mcq, long_answer.
- "options": A list of 4 strings (ONLY for mcq, otherwise null).
- "answer": The correct answer.
- "explanation": A brief educational explanation.
"""

def generate_quiz_from_images(
    image_data_list: List[bytes],
    question_count: int,
    preferred_types: List[QuestionType],
    keywords: str = ""
) -> List[dict]:
    logger.info(f"AI Service: Processing {len(image_data_list)} images for {question_count} questions")
    
    model = genai.GenerativeModel(
        model_name="gemini-1.5-flash",
        system_instruction=SYSTEM_PROMPT
    )

    parts = []
    
    for img_bytes in image_data_list:
        parts.append({
            "mime_type": "image/jpeg",
            "data": img_bytes
        })

    # Add the text prompt
    prompt = f"""
    Generate a quiz with exactly {question_count} questions.
    Allowed question types: {', '.join([t.value for t in preferred_types])}.
    User Priority Keywords: {keywords if keywords else "None provided"}.
    
    Remember: Ensure total coverage of all provided images. 
    Do not be biased toward the first image or large headers."""
    
    parts.append(prompt)

    try:
        # Generate content with JSON enforcement
        logger.info("Requesting generation from Gemini 1.5 Flash...")
        response = model.generate_content(
            parts,
            generation_config={"response_mime_type": "application/json"}
        )

        quiz_data = json.loads(response.text)

        final_questions = []
        if isinstance(quiz_data, dict) and "questions" in quiz_data:
            final_questions = quiz_data["questions"]
        elif isinstance(quiz_data, list):
            final_questions = quiz_data
            
        logger.success(f"AI Service: Successfully generated {len(final_questions)} questions")
        return final_questions
    
    except json.JSONDecodeError as e:
        logger.error(f"AI Service: Failed to parse JSON response: {e}")
        return []
    except Exception as e:
        logger.error(f"AI Service: Unexpected error during generation: {e}")
        return []
