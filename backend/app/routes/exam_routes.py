from fastapi import APIRouter
from fastapi.responses import StreamingResponse
from app.schemas.exam_schema import ExamCreate
from app.services.exam_service import save_exam, list_exams, get_exam_by_id
from app.utils.pdf_generator import generate_pdf

router = APIRouter(prefix="/exams", tags=["Exams"])

@router.post("/")
def create_exam(exam: ExamCreate):
    save_exam(exam.dict())
    return {"msg": "Exam saved"}

@router.get("/")
def get_exams():
    return list_exams()

@router.get("/{exam_id}/download-pdf")
def download_exam_pdf(exam_id: str):
    exam = get_exam_by_id(exam_id)
    if not exam:
        return {"error": "Exam not found"}
    
    pdf_buffer = generate_pdf(exam)
    pdf_data = pdf_buffer.getvalue()
    
    filename = exam.get("title", "sem_titulo").replace(" ", "_")
    
    return StreamingResponse(
        iter([pdf_data]),
        media_type="application/pdf",
        headers={
            "Content-Disposition": f'attachment; filename="{filename}.pdf"',
            "Content-Length": str(len(pdf_data)),
            "Content-Type": "application/pdf"
        }
    )
