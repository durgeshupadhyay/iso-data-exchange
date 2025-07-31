from pydantic import BaseModel
from typing import List, Optional, Dict, Any

class Recommendation(BaseModel):
    confidence: float
    suggestion: str

class FieldMappingRecommendation(BaseModel):
    field: str
    recommendations: List[Recommendation]

class DataQualityRecommendation(BaseModel):
    rule: str
    confidence: float

class FuzzyMatchingRecommendation(BaseModel):
    field: str
    reason: str

class AIRecommendations(BaseModel):
    field_mapping_recommendations: List[FieldMappingRecommendation]
    data_quality_recommendations: List[DataQualityRecommendation]
    fuzzy_matching_recommendations: List[FuzzyMatchingRecommendation]
