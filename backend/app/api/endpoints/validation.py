from fastapi import APIRouter, Depends
from pydantic import BaseModel
from typing import List, Dict, Any
from app.services.data_validation_engine import get_validation_engine

router = APIRouter()

class ValidationRequest(BaseModel):
    dta_config: Dict[str, Any]
    data: List[Dict[str, Any]]

@router.post("/validate")
def validate_data(request: ValidationRequest):
    validation_engine = get_validation_engine(request.dta_config)
    validation_results = validation_engine.validate_data(request.data)
    report = validation_engine.generate_validation_report(validation_results)
    return report
