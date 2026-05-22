import httpx
from typing import List, Dict, Any, Optional
from loguru import logger
from app.core.config import get_settings

settings = get_settings()

class DatabaseService:
    def __init__(self):
        self.url = settings.SUPABASE_URL
        # We use the Service Role Key for backend operations to bypass RLS
        # and ensure the backend can always manage its data.
        self.headers = {
            "apikey": settings.SUPABASE_SERVICE_ROLE_KEY,
            "Authorization": f"Bearer {settings.SUPABASE_SERVICE_ROLE_KEY}",
            "Content-Type": "application/json",
            "Prefer": "return=representation"
        }

    async def save_quiz(self, user_id: str, title: str, questions: List[Dict[str, Any]], difficulty: str = "Medium") -> Dict[str, Any]:
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
                    json={"user_id": user_id, "title": title, "difficulty": difficulty}
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
                quiz_data["question_count"] = len(questions)
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
            for quiz in data:
                quiz["question_count"] = len(quiz.get("questions", []))
            logger.info(f"DB: Found {len(data)} quizzes")
            return data

    async def get_quiz_by_id(self, quiz_id: str, user_id: str) -> Optional[Dict[str, Any]]:
        """
        Retrieves a specific quiz by ID for a specific user.
        """
        logger.info(f"DB: Fetching quiz {quiz_id} for user {user_id}")
        async with httpx.AsyncClient() as client:
            resp = await client.get(
                f"{self.url}/rest/v1/quizzes?id=eq.{quiz_id}&user_id=eq.{user_id}&select=*,questions(*)",
                headers=self.headers
            )
            resp.raise_for_status()
            data = resp.json()
            if not data:
                return None
            quiz = data[0]
            quiz["question_count"] = len(quiz.get("questions", []))
            return quiz

    async def delete_quiz(self, quiz_id: str, user_id: str) -> bool:
        """
        Deletes a quiz for a specific user. 
        Note: Questions are deleted automatically via SQL CASCADE.
        """
        logger.info(f"DB: Deleting quiz {quiz_id} for user {user_id}")
        async with httpx.AsyncClient() as client:
            resp = await client.delete(
                f"{self.url}/rest/v1/quizzes?id=eq.{quiz_id}&user_id=eq.{user_id}",
                headers=self.headers
            )
            resp.raise_for_status()
            return True

    async def get_daily_usage_count(self, user_id: str) -> int:
        """
        Counts the number of quizzes created by a user today (UTC).
        """
        from datetime import datetime, timezone
        # Use Z suffix for UTC which is universally supported by PostgREST
        today_start = datetime.now(timezone.utc).replace(hour=0, minute=0, second=0, microsecond=0).strftime("%Y-%m-%dT%H:%M:%SZ")
        
        logger.info(f"DB: Fetching daily usage for user {user_id} since {today_start}")
        async with httpx.AsyncClient() as client:
            # We use params for safer URL construction and encoding
            resp = await client.get(
                f"{self.url}/rest/v1/quizzes",
                params={
                    "user_id": f"eq.{user_id}",
                    "created_at": f"gte.{today_start}",
                    "select": "id"
                },
                headers={**self.headers, "Prefer": "count=exact"}
            )
            resp.raise_for_status()
            
            # Supabase returns count in Content-Range header when count=exact is used
            content_range = resp.headers.get("Content-Range")
            if content_range and "/" in content_range:
                count = int(content_range.split("/")[-1])
                return count
            
            # Fallback to len if header is missing
            return len(resp.json())

db_service = DatabaseService()
