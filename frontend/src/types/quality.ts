export type IssueSeverity = 'error' | 'warning' | 'info';

export interface QualityIssue {
  id: number;
  description: string;
  severity: IssueSeverity;
  fieldName: string;
  rowNumber: number;
  value: any;
  suggestion?: string;
  autoCorrected: boolean;
}

export interface QualityMetrics {
  recordsProcessed: number;
  qualityScore: number;
  issuesDetected: number;
  criticalErrors: number;
}

export interface TransformedData {
  [key: string]: any;
}
