from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.routes.ai_routes import router as ai_router
from app.routes.exam_routes import router as exam_router
from app.routes.repository_routes import router as repo_router
from app.routes.auth_routes import router as auth_router

app = FastAPI(title="School_Project")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth_router)
app.include_router(ai_router)
app.include_router(exam_router)
app.include_router(repo_router)

@app.get("/")
def root():
    return {"msg": "School_Project Backend Running"}
