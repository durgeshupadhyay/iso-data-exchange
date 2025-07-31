import React from 'react';
import { QualityIssue } from '../types/quality';
import { FiCheck, FiX } from 'react-icons/fi';

interface IssuesTableProps {
  issues: QualityIssue[];
}

const IssuesTable: React.FC<IssuesTableProps> = ({ issues }) => {
  const getSeverityClass = (severity: string) => {
    switch (severity) {
      case 'error':
        return 'bg-red-100 text-red-700';
      case 'warning':
        return 'bg-yellow-100 text-yellow-700';
      case 'info':
        return 'bg-blue-100 text-blue-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div>
      <h3 className="text-xl font-bold mb-2">Quality Check Results</h3>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">Severity</th>
              <th className="py-2 px-4 border-b">Description</th>
              <th className="py-2 px-4 border-b">Field</th>
              <th className="py-2 px-4 border-b">Row</th>
              <th className="py-2 px-4 border-b">Value</th>
              <th className="py-2 px-4 border-b">Suggestion</th>
              <th className="py-2 px-4 border-b">Status</th>
              <th className="py-2 px-4 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {issues.map((issue) => (
              <tr key={issue.id}>
                <td className="py-2 px-4 border-b">
                  <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getSeverityClass(issue.severity)}`}>
                    {issue.severity}
                  </span>
                </td>
                <td className="py-2 px-4 border-b">{issue.description}</td>
                <td className="py-2 px-4 border-b">{issue.fieldName}</td>
                <td className="py-2 px-4 border-b">{issue.rowNumber}</td>
                <td className="py-2 px-4 border-b">{String(issue.value)}</td>
                <td className="py-2 px-4 border-b">{issue.suggestion || 'N/A'}</td>
                <td className="py-2 px-4 border-b">
                  {issue.autoCorrected ? (
                    <span className="text-green-500">Auto-corrected</span>
                  ) : (
                    <span className="text-yellow-500">Manual Review</span>
                  )}
                </td>
                <td className="py-2 px-4 border-b">
                  {!issue.autoCorrected && issue.suggestion && (
                    <div className="flex space-x-2">
                      <button className="text-green-500 hover:text-green-700">
                        <FiCheck />
                      </button>
                      <button className="text-red-500 hover:text-red-700">
                        <FiX />
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default IssuesTable;
