from fastapi import APIRouter
from pydantic import BaseModel
from typing import List
from app.services.fuzzy_matching_service import fuzzy_matching_service

router = APIRouter()

class FuzzyMatchRequest(BaseModel):
    queries: List[str]
    choices: List[str]
    scorer: str = 'WRatio'
    score_cutoff: int = 80

@router.post("/match")
def match_entities(request: FuzzyMatchRequest):
    matches = fuzzy_matching_service.batch_match_entities(
        queries=request.queries,
        choices=request.choices,
        scorer=request.scorer,
        score_cutoff=request.score_cutoff,
    )
    report = fuzzy_matching_service.create_match_confidence_report(matches)
    cross_reference = fuzzy_matching_service.build_entity_cross_reference(matches)

    return {"report": report, "cross_reference": cross_reference}
