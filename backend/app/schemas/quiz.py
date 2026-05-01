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
    question: str
    type: QuestionType
    options: Optional[List[str]] = None 
    answer: str
    explanation: str

class QuestionInDB(Question):
    id: UUID
    quiz_id: UUID
    created_at: datetime

class QuizBase(BaseModel):
    title: str = Field(..., min_length=1, max_length=100)

class QuizCreate(QuizBase):
    questions: List[Question]

class QuizResponse(QuizBase):
    id: UUID
    user_id: UUID
    created_at: datetime
    questions: Optional[List[QuestionInDB]] = None

class QuizGenerateRequest(BaseModel):
    keywords: Optional[str] = Field(None, max_length=200)
    question_count: int = Field(20, ge=1, le=20)
    preferred_types: List[QuestionType] = Field(default=[QuestionType.mcq])
