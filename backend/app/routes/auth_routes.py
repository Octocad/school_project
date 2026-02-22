from fastapi import APIRouter

router = APIRouter(prefix="/auth", tags=["Auth"])

@router.post("/login")
def login(email: str, password: str):
    return {"token": "fake-jwt-token", "user": {"email": email}}
