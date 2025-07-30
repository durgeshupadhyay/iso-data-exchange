from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.core.config import settings

app = FastAPI(
    title="DTA-to-CTMS Data Transformation Tool",
    description="An API for transforming and loading DTA data into a CTMS.",
    version="0.1.0",
)

# CORS Middleware
if settings.CORS_ORIGINS:
    app.add_middleware(
        CORSMiddleware,
        allow_origins=[str(origin) for origin in settings.CORS_ORIGINS],
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )

@app.get("/")
def read_root():
    return {"message": "Welcome to the DTA-to-CTMS API"}

# Placeholder for future API routers
# from .api import items
# app.include_router(items.router)
