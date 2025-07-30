import React from 'react';
import { utils, writeFile } from 'xlsx';
import { unparse } from 'papaparse';

interface ExportButtonProps<TData> {
  data: TData[];
  columns: { header: string; accessor: keyof TData }[];
  filename: string;
}

function ExportButton<TData extends object>({ data, columns, filename }: ExportButtonProps<TData>) {
  const handleExport = (format: 'csv' | 'xlsx' | 'json') => {
    const exportData = data.map(row => {
      const newRow: { [key: string]: any } = {};
      columns.forEach(col => {
        newRow[col.header] = row[col.accessor];
      });
      return newRow;
    });

    if (format === 'csv') {
      const csv = unparse(exportData);
      const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${filename}.csv`;
      a.click();
      URL.revokeObjectURL(url);
    } else if (format === 'xlsx') {
      const ws = utils.json_to_sheet(exportData);
      const wb = utils.book_new();
      utils.book_append_sheet(wb, ws, 'Data');
      writeFile(wb, `${filename}.xlsx`);
    } else if (format === 'json') {
      const json = JSON.stringify(exportData, null, 2);
      const blob = new Blob([json], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${filename}.json`;
      a.click();
      URL.revokeObjectURL(url);
    }
  };

  return (
    <div className="flex space-x-2">
      <button onClick={() => handleExport('csv')} className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded">
        Export CSV
      </button>
      <button onClick={() => handleExport('xlsx')} className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded">
        Export XLSX
      </button>
      <button onClick={() => handleExport('json')} className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded">
        Export JSON
      </button>
    </div>
  );
}

export default ExportButton;
