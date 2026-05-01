import httpx
from typing import List, Dict, Any
from loguru import logger
from app.core.config import get_settings

settings = get_settings()

class DatabaseService:
    def __init__(self):
        self.url = settings.SUPABASE_URL
        self.headers = {
            "apikey": settings.SUPABASE_ANON_KEY,
            "Authorization": f"Bearer {settings.SUPABASE_ANON_KEY}",
            "Content-Type": "application/json",
            "Prefer": "return=representation"
        }

    async def save_quiz(self, user_id: str, title: str, questions: List[Dict[str, Any]]) -> Dict[str, Any]:
        """
        Saves a quiz and its questions to the database.
        """
        logger.info(f"DB: Saving quiz '{title}' for user {user_id}")
        
        async with httpx.AsyncClient() as client:
            # 1. Insert the Quiz record
            try:
                quiz_resp = await client.post(
                    f"{self.url}/rest/v1/quizzes",
                    headers=self.headers,
                    json={"user_id": user_id, "title": title}
                )
                quiz_resp.raise_for_status()
                
                quiz_data = quiz_resp.json()[0]
                quiz_id = quiz_data["id"]
                logger.debug(f"DB: Quiz header created with ID {quiz_id}")

                # 2. Map the quiz_id to each question
                for q in questions:
                    q["quiz_id"] = quiz_id

                # 3. Bulk insert questions
                questions_resp = await client.post(
                    f"{self.url}/rest/v1/questions",
                    headers=self.headers,
                    json=questions
                )
                questions_resp.raise_for_status()
                
                quiz_data["questions"] = questions_resp.json()
                logger.success(f"DB: Successfully saved quiz and {len(questions)} questions")
                return quiz_data
                
            except httpx.HTTPStatusError as e:
                logger.error(f"DB: Supabase error: {e.response.text}")
                raise e

    async def get_user_quizzes(self, user_id: str) -> List[Dict[str, Any]]:
        """
        Retrieves all quizzes for a user.
        """
        logger.info(f"DB: Fetching quizzes for user {user_id}")
        async with httpx.AsyncClient() as client:
            resp = await client.get(
                f"{self.url}/rest/v1/quizzes?user_id=eq.{user_id}&select=*,questions(*)",
                headers=self.headers
            )
            resp.raise_for_status()
            data = resp.json()
            logger.info(f"DB: Found {len(data)} quizzes")
            return data

db_service = DatabaseService()
