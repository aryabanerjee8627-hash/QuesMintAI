from enum import Enum
from typing import List, Optional
from pydantic import BaseModel, Field
from datetime import datetime
from uuid import UUID

class QuestionType(str, Enum):
    one_word = "one_word"
    true_or_false = "true_or_false"
    mcq = "mcq"
    long_answer = "long_answer"

class Question(BaseModel):
    text: str = Field(..., alias="question")
    type: QuestionType
    options: Optional[List[str]] = None 
    correct_index: Optional[int] = None
    answer: str
    explanation: str

    class Config:
        populate_by_name = True

class QuestionInDB(Question):
    id: UUID
    quiz_id: UUID
    created_at: datetime

class QuizBase(BaseModel):
    title: str = Field(..., min_length=1, max_length=100)
    difficulty: str = "Medium"

class QuizCreate(QuizBase):
    questions: List[Question]

class QuizResponse(QuizBase):
    id: UUID
    user_id: UUID
    created_at: datetime
    questions: Optional[List[QuestionInDB]] = None
    question_count: int = 0

