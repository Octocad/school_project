from fastapi import APIRouter
from app.schemas.ai_schema import AIGenerateRequest
from app.services.ai_service import generate_questions

router = APIRouter(prefix="/ai", tags=["AI"])

@router.post("/generate")
def generate_exam(req: AIGenerateRequest):
    questions = generate_questions(req.subject, req.grade, req.topic, req.difficulty)
    return {"questions": questions}
