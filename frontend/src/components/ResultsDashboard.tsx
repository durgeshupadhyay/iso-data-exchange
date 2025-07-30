import React from 'react';
import MetricCard from './MetricCard';
import IssuesTable from './IssuesTable';
import DataTable from './DataTable';
import { QualityMetrics, QualityIssue, TransformedData } from '../types/quality';
import { FiCheckCircle, FiAlertTriangle, FiXCircle, FiTrendingUp } from 'react-icons/fi';
import { createColumnHelper } from '@tanstack/react-table';

const mockMetrics: QualityMetrics = {
  recordsProcessed: 1500,
  qualityScore: 92.5,
  issuesDetected: 112,
  criticalErrors: 5,
};

const mockIssues: QualityIssue[] = [
  { id: 1, description: 'Invalid date format', severity: 'error', fieldName: 'visit_date', rowNumber: 10, value: '2023/01/01', autoCorrected: true, suggestion: '2023-01-01' },
  { id: 2, description: 'Missing required field', severity: 'error', fieldName: 'patient_id', rowNumber: 15, value: null, autoCorrected: false },
  { id: 3, description: 'Potential PI name mismatch', severity: 'warning', fieldName: 'PI_Name', rowNumber: 22, value: 'Dr. John Smith', suggestion: 'Dr. Jon Smith' },
  { id: 4, description: 'Site name not harmonized', severity: 'info', fieldName: 'site_name', rowNumber: 30, value: 'Main Hospital', suggestion: 'General Hospital' },
];

const mockData: TransformedData[] = [
  { cdm_site_name: 'General Hospital', cdm_principal_investigator: 'Dr. Jon Smith', cdm_patient_id: 'P001', cdm_visit_date: '2023-01-10' },
  { cdm_site_name: 'General Hospital', cdm_principal_investigator: 'Dr. Jon Smith', cdm_patient_id: 'P002', cdm_visit_date: '2023-01-11' },
];

const columnHelper = createColumnHelper<TransformedData>();

const columns = [
  columnHelper.accessor('cdm_site_name', { header: 'Site Name' }),
  columnHelper.accessor('cdm_principal_investigator', { header: 'Principal Investigator' }),
  columnHelper.accessor('cdm_patient_id', { header: 'Patient ID' }),
  columnHelper.accessor('cdm_visit_date', { header: 'Visit Date' }),
];

const ResultsDashboard: React.FC = () => {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Data Quality Results</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <MetricCard title="Records Processed" value={mockMetrics.recordsProcessed} icon={<FiTrendingUp className="text-blue-500" />} />
        <MetricCard title="Data Quality Score" value={`${mockMetrics.qualityScore}%`} icon={<FiCheckCircle className="text-green-500" />} />
        <MetricCard title="Issues Detected" value={mockMetrics.issuesDetected} icon={<FiAlertTriangle className="text-yellow-500" />} />
        <MetricCard title="Critical Errors" value={mockMetrics.criticalErrors} icon={<FiXCircle className="text-red-500" />} />
      </div>
      <IssuesTable issues={mockIssues} />
      <div className="mt-8">
        <h3 className="text-xl font-bold mb-2">Transformed Data Preview</h3>
        <DataTable columns={columns} data={mockData} filename="transformed_data" />
      </div>
    </div>
  );
};

export default ResultsDashboard;
