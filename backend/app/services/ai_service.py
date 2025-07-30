from app.core.config import settings
import openai

# Prompts
FIELD_MAPPING_PROMPT = """
Analyze the following DTA field mappings and suggest optimizations.
Consider fuzzy matching for fields like PI names and site names.
Provide a confidence score for each recommendation.
Configuration:
{config}
"""

DATA_QUALITY_PROMPT = """
Based on the following DTA configuration, suggest data quality validation rules.
Focus on date formats, required fields, and common clinical data issues.
Configuration:
{config}
"""

FUZZY_MATCHING_PROMPT = """
Identify fields in the following DTA configuration that would benefit from fuzzy matching.
Explain why fuzzy matching is needed for each identified field.
Configuration:
{config}
"""

class DTARecommendationService:
    def __init__(self):
        self.client = openai.OpenAI(api_key=settings.OPENAI_API_KEY)
        self.cache = {}

    def analyze_dta_configuration(self, config: dict):
        field_mapping_recs = self.generate_field_mapping_recommendations(config)
        quality_rule_recs = self.suggest_data_quality_rules(config)
        fuzzy_matching_recs = self.detect_fuzzy_matching_needs(config)

        return {
            "field_mapping_recommendations": field_mapping_recs,
            "data_quality_recommendations": quality_rule_recs,
            "fuzzy_matching_recommendations": fuzzy_matching_recs,
        }

    def generate_field_mapping_recommendations(self, config: dict):
        return self._get_ai_recommendations(FIELD_MAPPING_PROMPT, config)

    def suggest_data_quality_rules(self, config: dict):
        return self._get_ai_recommendations(DATA_QUALITY_PROMPT, config)

    def detect_fuzzy_matching_needs(self, config: dict):
        return self._get_ai_recommendations(FUZZY_MATCHING_PROMPT, config)

    def _get_ai_recommendations(self, prompt: str, config: dict):
        config_str = str(config)
        if (prompt, config_str) in self.cache:
            return self.cache[(prompt, config_str)]

        try:
            response = self.client.chat.completions.create(
                model="gpt-4",
                messages=[
                    {"role": "system", "content": "You are a helpful assistant for clinical data transformation."},
                    {"role": "user", "content": prompt.format(config=config_str)}
                ]
            )
            recommendations = response.choices[0].message.content
            self.cache[(prompt, config_str)] = recommendations
            return recommendations
        except Exception as e:
            # Fallback for offline operation or API errors
            return {"error": str(e)}

ai_service = DTARecommendationService()
