from pydantic import BaseModel
from typing import List

class Question(BaseModel):
    question: str
    options: List[str]
    answer: str

class Exam(BaseModel):
    title: str
    subject: str
    grade: str
    questions: List[Question]
