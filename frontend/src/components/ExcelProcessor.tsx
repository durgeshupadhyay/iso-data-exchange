import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import * as XLSX from 'xlsx';
import { ProcessingState } from '../types/processing';
import FlowDiagram from './FlowDiagram';

const ExcelProcessor: React.FC = () => {
  const [processingState, setProcessingState] = useState<ProcessingState>({
    step: 'idle',
    progress: 0,
    statusText: 'Waiting for file...',
  });

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      setProcessingState({
        step: 'uploading',
        progress: 0,
        statusText: 'Uploading file...',
      });

      const reader = new FileReader();
      reader.onprogress = (event) => {
        if (event.lengthComputable) {
          const progress = Math.round((event.loaded * 100) / event.total);
          setProcessingState((prevState) => ({ ...prevState, progress }));
        }
      };
      reader.onload = () => {
        try {
          const data = new Uint8Array(reader.result as ArrayBuffer);
          const workbook = XLSX.read(data, { type: 'array' });
          const sheetName = workbook.SheetNames[0];
          const worksheet = workbook.Sheets[sheetName];
          const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
          setProcessingState({
            step: 'preview',
            progress: 100,
            statusText: 'File uploaded successfully. Ready to process.',
            data: jsonData as any[][],
          });
        } catch (error) {
          setProcessingState({
            step: 'error',
            progress: 0,
            statusText: 'Invalid file format.',
            error: 'Could not parse the Excel file.',
          });
        }
      };
      reader.readAsArrayBuffer(file);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx'],
      'application/vnd.ms-excel': ['.xls'],
    },
    maxSize: 100 * 1024 * 1024, // 100MB
  });

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Excel Data Upload and Transformation</h2>
      <div
        {...getRootProps()}
        className={`p-10 border-2 border-dashed rounded-md text-center cursor-pointer ${
          isDragActive ? 'border-orange-500 bg-orange-50' : 'border-gray-300'
        }`}
      >
        <input {...getInputProps()} />
        <p>Drag 'n' drop an Excel file here, or click to select a file</p>
      </div>

      {processingState.step === 'uploading' && (
        <div className="mt-4">
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div
              className="bg-blue-600 h-2.5 rounded-full"
              style={{ width: `${processingState.progress}%` }}
            ></div>
          </div>
          <p className="text-center mt-2">{processingState.statusText}</p>
        </div>
      )}

      {processingState.step === 'preview' && processingState.data && (
        <div className="mt-4">
          <h3 className="text-xl font-bold mb-2">Data Preview</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white">
              {/* ... table content ... */}
            </table>
          </div>
          <button
            onClick={() => {
              setProcessingState((prevState) => ({
                ...prevState,
                step: 'processing',
                progress: 0,
                statusText: 'Starting processing...',
              }));
              // Simulate processing steps
              setTimeout(() => {
                setProcessingState((prevState) => ({
                  ...prevState,
                  progress: 25,
                  statusText: 'Performing quality check...',
                }));
              }, 1000);
              setTimeout(() => {
                setProcessingState((prevState) => ({
                  ...prevState,
                  progress: 50,
                  statusText: 'Transforming data...',
                }));
              }, 2000);
              setTimeout(() => {
                setProcessingState((prevState) => ({
                  ...prevState,
                  progress: 75,
                  statusText: 'Generating CTMS ready file...',
                }));
              }, 3000);
              setTimeout(() => {
                setProcessingState((prevState) => ({
                  ...prevState,
                  step: 'completed',
                  progress: 100,
                  statusText: 'Processing complete.',
                }));
              }, 4000);
            }}
            className="mt-4 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
          >
            Process File
          </button>
        </div>
      )}

      {(processingState.step === 'processing' || processingState.step === 'completed') && (
        <div className="mt-4">
          <FlowDiagram currentStep={processingState.progress / 25} />
          <div className="w-full bg-gray-200 rounded-full h-4 mt-4">
            <div
              className="bg-green-600 h-4 rounded-full text-center text-white text-sm"
              style={{ width: `${processingState.progress}%` }}
            >
              {processingState.progress}%
            </div>
          </div>
          <p className="text-center mt-2">{processingState.statusText}</p>
        </div>
      )}

      {processingState.error && (
        <div className="mt-4 p-4 bg-red-100 text-red-700 rounded">
          <h3 className="font-bold">Error:</h3>
          <p>{processingState.error}</p>
        </div>
      )}
    </div>
  );
};

export default ExcelProcessor;
