from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.config import settings
from app.routers import health


app = FastAPI(
    title=settings.app_name,
    description="Backend API for PriorityOS",
    version="0.1.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[settings.frontend_origin],
    allow_credentials=False,
    allow_methods=["GET", "POST", "PATCH", "DELETE"],
    allow_headers=["Authorization", "Content-Type"],
)

app.include_router(health.router, prefix="/api")


@app.get("/")
def root():
    return {
        "message": "Welcome to PriorityOS API",
        "docs": "/docs",
    }
