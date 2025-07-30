from fastapi import FastAPI

app = FastAPI(
    title="DTA-to-CTMS Data Transformation Tool",
    description="An API for transforming and loading DTA data into a CTMS.",
    version="0.1.0",
)

@app.get("/")
def read_root():
    return {"message": "Welcome to the DTA-to-CTMS API"}

# Placeholder for future API routers
# from .api import items
# app.include_router(items.router)
