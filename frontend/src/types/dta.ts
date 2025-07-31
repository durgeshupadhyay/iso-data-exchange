export interface DtaFieldMapping {
  [source: string]: string;
}

export interface DtaValidationRule {
  field: string;
  rule: 'required' | 'date_format';
  format?: string;
}

export interface DtaConfig {
  source_system: string;
  target_system: string;
  field_mappings: DtaFieldMapping;
  validation_rules: DtaValidationRule[];
}

export interface YamlValidationError {
  line: number;
  message: string;
}
