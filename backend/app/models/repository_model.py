from pydantic import BaseModel
from typing import List

class RepositoryMaterial(BaseModel):
    title: str
    subject: str
    grade: str
    questions: List[dict]
