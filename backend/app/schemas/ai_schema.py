from pydantic import BaseModel

class AIGenerateRequest(BaseModel):
    subject: str
    grade: str
    topic: str
    difficulty: str = "medium"
    num_questions: int = 5
