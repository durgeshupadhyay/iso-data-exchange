from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app import schemas
from app.services.ai_service import ai_service
from app.api import deps

router = APIRouter()

@router.post("/recommendations", response_model=schemas.AIRecommendations)
def get_ai_recommendations(
    *,
    db: Session = Depends(deps.get_db),
    config_in: schemas.DTAConfigurationCreate,
):
    """
    Get AI-generated recommendations for a DTA configuration.
    """
    recommendations = ai_service.analyze_dta_configuration(config_in.configuration)
    return recommendations
