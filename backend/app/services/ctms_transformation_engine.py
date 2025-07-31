from datetime import datetime

class CTMSTransformationEngine:
    def __init__(self, dta_config: dict):
        self.dta_config = dta_config

    def _apply_field_mapping(self, record: dict):
        mapped_record = {}
        for source, target in self.dta_config.get('field_mappings', {}).items():
            if source in record:
                mapped_record[target] = record[source]
        return mapped_record

    def _normalize_data(self, record: dict):
        for field, value in record.items():
            if isinstance(value, str):
                record[field] = value.strip()
            # Add more normalization rules here
        return record

    def _enrich_data(self, record: dict):
        # Add GSK internal IDs, etc.
        record['gsk_internal_id'] = f"GSK_{record.get('cdm_site_name', 'NA')}_{record.get('cdm_patient_id', 'NA')}"
        return record

    def transform_record(self, record: dict):
        mapped_record = self._apply_field_mapping(record)
        normalized_record = self._normalize_data(mapped_record)
        enriched_record = self._enrich_data(normalized_record)
        return enriched_record

    def batch_transform(self, data: list[dict]):
        return [self.transform_record(r) for r in data]

    def generate_transformation_report(self, original_data: list[dict], transformed_data: list[dict]):
        report = {
            "total_records": len(original_data),
            "transformations": [],
        }
        for i, (original, transformed) in enumerate(zip(original_data, transformed_data)):
            changes = []
            for key, value in transformed.items():
                if key not in original or original[key] != value:
                    changes.append({"field": key, "old_value": original.get(key), "new_value": value})
            if changes:
                report["transformations"].append({"row": i + 1, "changes": changes})
        return report

    def validate_transformed_data(self, data: list[dict]):
        # Placeholder for post-transformation validation
        return {"status": "success", "errors": []}

def get_transformation_engine(dta_config: dict):
    return CTMSTransformationEngine(dta_config)
