from pydantic import BaseModel
from datetime import date

class TransformationJob(BaseModel):
    id: int
    source_file: str
    target_file: str
    status: str
    created_at: date

    class Config:
        orm_mode = True
