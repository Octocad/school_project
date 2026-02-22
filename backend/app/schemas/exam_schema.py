from pydantic import BaseModel
from typing import List

class ExamCreate(BaseModel):
    title: str
    subject: str
    grade: str
    questions: List[dict]
