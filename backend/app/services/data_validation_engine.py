from app.services.rules import business_rules, data_format_rules, referential_integrity_rules

class DataValidationEngine:
    def __init__(self, dta_config: dict):
        self.dta_config = dta_config

    def validate_data(self, data: list[dict]):
        results = []
        for i, record in enumerate(data):
            errors = []
            for rule in self.dta_config.get('validation_rules', []):
                # This is a simplified example. A real implementation would be more dynamic.
                if rule['rule'] == 'required':
                    error = data_format_rules.check_required_field(record, rule['field'])
                    if error:
                        errors.append(error)
                elif rule['rule'] == 'date_format':
                    error = data_format_rules.check_date_format(record, rule['field'], rule.get('format'))
                    if error:
                        errors.append(error)

            if errors:
                results.append({"row": i + 1, "errors": errors})
        return results

    def generate_validation_report(self, validation_results: list):
        total_errors = sum(len(r['errors']) for r in validation_results)
        report = {
            "total_records": len(validation_results),
            "total_errors": total_errors,
            "error_details": validation_results,
        }
        return report

def get_validation_engine(dta_config: dict):
    return DataValidationEngine(dta_config)
