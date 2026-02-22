from fastapi import APIRouter
from app.services.repository_service import save_material, list_materials

router = APIRouter(prefix="/repository", tags=["Repository"])

@router.post("/")
def upload_material(material: dict):
    save_material(material)
    return {"msg": "Material saved"}

@router.get("/")
def get_materials():
    return list_materials()
