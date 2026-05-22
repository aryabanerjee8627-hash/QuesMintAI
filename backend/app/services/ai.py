import json
from typing import List, Any
import google.generativeai as genai
from loguru import logger
from app.core.config import get_settings
from app.schemas.quiz import QuestionType

settings = get_settings()

# Initialize the Gemini SDK with REST transport for better compatibility in Docker
genai.configure(api_key=settings.GEMINI_API_KEY, transport='rest')

SYSTEM_PROMPT = """
You are an expert educator and multimodal content analyzer.
Your task is to generate a comprehensive quiz based on the provided images.

STRICT GROUNDING & ANTI-HALLUCINATION:
1. SOURCE-ONLY: You MUST NOT generate information, facts, formulas, or theories not present in the provided images or PDF pages. 
2. MULTIMODAL ANALYSIS: You MUST analyze both text and visual elements (diagrams, charts, graphs, illustrations, and tables). You are encouraged to create questions based on these visual elements.
3. REJECT EXTERNAL KNOWLEDGE: All questions, options, and explanations must be derived 100% from the uploaded content.
4. NO INVENTIONS: If a requested subject-specific element (e.g., a specific formula or historical date) is missing from the source, do not invent it. Stick to what is available.

CORE INSTRUCTIONS:
1. FULL SCAN: You must analyze EVERY image or page provided. Do not ignore any part of the content.
2. UNIFORM COVERAGE: Distribute the questions evenly across all images/pages and topics.
3. VISUAL QUESTIONS: When creating questions from diagrams or charts, describe the visual context clearly in the question text (e.g., "Based on the provided circuit diagram...", "According to the graph showing population growth...").
4. FORMAT: Output MUST be a valid JSON list of objects matching the requested schema.
4. STEM & MATHEMATICAL CONTENT: You MUST format all mathematical expressions, variables, algebraic formulas, physics equations, chemical formulas/symbols, and subscripts/superscripts using standard LaTeX. Use single dollar signs $...$ for inline math and double dollar signs $$...$$ for block equations.

SUBJECT-SPECIFIC RULES:
- CHEMISTRY & PHYSICS: Include relevant formulas and equations ONLY IF they appear in the source material. Balance conceptual questions with calculation problems derived from the source.
- MATHEMATICS: Create variations of problems found in the text (e.g., changing numerical values) while maintaining the core concept. CONSTRAINT: Do not repeat the same type/structure of question more than twice in a single quiz.
- BIOLOGY: Emphasize terminology, processes, and classification found in the material.
- COMPUTER SCIENCE: Include code snippets or logic concepts only if they are present in the provided content.
- ENGLISH, HISTORY, GEOGRAPHY: Focus on reading comprehension, chronological events, and spatial relationships derived strictly from the text.

SCHEMA RULES:
- "question": The question text.
- "type": One of: one_word, true_or_false, mcq, long_answer.
- "options": A list of 4 strings (ONLY for mcq, otherwise null).
- "correct_index": An integer 0-3 (ONLY for mcq).
- "answer": The correct answer (text).
- "explanation": A brief educational explanation derived from the source.
"""

def generate_quiz_from_images(
    image_data_list: List[dict],
    question_count: int,
    preferred_types: List[QuestionType],
    subject: str = "General"
) -> List[dict]:
    logger.info(f"AI Service: Processing {len(image_data_list)} files for {question_count} questions (Subject: {subject})")
    
    # Using gemini-3-flash-preview because 2.0 currently has a 0-quota limit in this project
    model = genai.GenerativeModel(
        model_name="gemini-3-flash-preview",
        system_instruction=SYSTEM_PROMPT
    )

    parts = []
    
    for item in image_data_list:
        parts.append({
            "mime_type": item["mime_type"],
            "data": item["data"]
        })

    # Add the text prompt
    prompt = f"""
    Generate a {subject} quiz with exactly {question_count} questions.
    Allowed question types: {', '.join([t.value for t in preferred_types])}.
    
    Subject Context: {subject}
    Remember: Ensure total coverage of all provided images. 
    Stay strictly within the provided images. Do not use external knowledge."""
    
    parts.append(prompt)

    try:
        # Generate content with JSON enforcement
        logger.info("Requesting generation from Gemini 1.5 Flash...")
        response = model.generate_content(
            parts,
            generation_config={"response_mime_type": "application/json"}
        )

        if not response.text:
            logger.error("AI Service: Gemini returned an empty response.")
            if response.candidates:
                logger.error(f"Finish Reason: {response.candidates[0].finish_reason}")
                logger.error(f"Safety Ratings: {response.candidates[0].safety_ratings}")
            return []

        logger.debug(f"Raw AI Response: {response.text}")
        quiz_data = json.loads(response.text)

        final_questions = []
        if isinstance(quiz_data, dict) and "questions" in quiz_data:
            final_questions = quiz_data["questions"]
        elif isinstance(quiz_data, list):
            final_questions = quiz_data
        elif isinstance(quiz_data, dict):
            # If it's a single object instead of a list, wrap it
            final_questions = [quiz_data]
            
        if not final_questions:
            logger.warning("AI Service: Parsed JSON but found no questions.")

        logger.success(f"AI Service: Successfully generated {len(final_questions)} questions")
        return final_questions
    
    except json.JSONDecodeError as e:
        logger.error(f"AI Service: Failed to parse JSON response: {e}")
        logger.error(f"Response text: {response.text if 'response' in locals() else 'N/A'}")
        return []
    except Exception as e:
        logger.error(f"AI Service: Unexpected error during generation: {e}")
        if "response" in locals():
            try:
                # If .text fails, it might be due to safety filters
                if not response.candidates:
                    logger.error("No candidates returned. This usually means the prompt was blocked.")
                else:
                    logger.error(f"Finish reason: {response.candidates[0].finish_reason}")
            except:
                pass
        return []
