from fastapi import APIRouter, Depends
from pydantic import BaseModel
from typing import List, Dict, Any
from app.services.ctms_transformation_engine import get_transformation_engine

router = APIRouter()

class TransformationRequest(BaseModel):
    dta_config: Dict[str, Any]
    data: List[Dict[str, Any]]

@router.post("/transform")
def transform_data(request: TransformationRequest):
    transformation_engine = get_transformation_engine(request.dta_config)
    transformed_data = transformation_engine.batch_transform(request.data)
    report = transformation_engine.generate_transformation_report(request.data, transformed_data)
    validation_results = transformation_engine.validate_transformed_data(transformed_data)

    return {
        "transformed_data": transformed_data,
        "report": report,
        "validation_results": validation_results,
    }
