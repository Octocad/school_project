from fastapi import APIRouter
from app.schemas.exam_schema import ExamCreate
from app.services.exam_service import save_exam, list_exams

router = APIRouter(prefix="/exams", tags=["Exams"])

@router.post("/")
def create_exam(exam: ExamCreate):
    save_exam(exam.dict())
    return {"msg": "Exam saved"}

@router.get("/")
def get_exams():
    return list_exams()
