import React, { useState, useCallback } from 'react';
import AceEditor from 'react-ace';
import { useDropzone } from 'react-dropzone';
import * as yaml from 'js-yaml';
import { YamlValidationError } from '../types/dta';

import 'ace-builds/src-noconflict/mode-yaml';
import 'ace-builds/src-noconflict/theme-github';

const sampleYaml = `source_system: Example_Source
target_system: Veeva_CTMS
field_mappings:
  site_name: cdm_site_name
  PI_Name: cdm_principal_investigator
  patient_id: cdm_patient_id
  visit_date: cdm_visit_date
validation_rules:
  - field: visit_date
    rule: date_format
    format: 'YYYY-MM-DD'
  - field: patient_id
    rule: required
`;

const YamlEditor: React.FC = () => {
  const [yamlContent, setYamlContent] = useState(sampleYaml);
  const [errors, setErrors] = useState<YamlValidationError[]>([]);

  const validateYaml = (content: string) => {
    try {
      yaml.load(content);
      setErrors([]);
    } catch (e: any) {
      setErrors([{ line: e.mark.line, message: e.message }]);
    }
  };

  const handleYamlChange = (newYaml: string) => {
    setYamlContent(newYaml);
    validateYaml(newYaml);
  };

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    const reader = new FileReader();
    reader.onload = () => {
      const fileContent = reader.result as string;
      setYamlContent(fileContent);
      validateYaml(fileContent);
    };
    reader.readAsText(file);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop, accept: { 'application/x-yaml': ['.yaml', '.yml'] } });

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">DTA Configuration</h2>
      <div
        {...getRootProps()}
        className={`p-4 border-2 border-dashed rounded-md text-center cursor-pointer ${
          isDragActive ? 'border-orange-500 bg-orange-50' : 'border-gray-300'
        }`}
      >
        <input {...getInputProps()} />
        <p>Drag 'n' drop a YAML file here, or click to select a file</p>
      </div>
      <AceEditor
        mode="yaml"
        theme="github"
        onChange={handleYamlChange}
        name="yaml-editor"
        editorProps={{ $blockScrolling: true }}
        value={yamlContent}
        width="100%"
        height="400px"
        annotations={errors.map(err => ({
          row: err.line,
          column: 0,
          type: 'error',
          text: err.message,
        }))}
      />
      {errors.length > 0 && (
        <div className="mt-2 p-2 bg-red-100 text-red-700 rounded">
          <h3 className="font-bold">Validation Errors:</h3>
          <ul>
            {errors.map((err, i) => (
              <li key={i}>Line {err.line + 1}: {err.message}</li>
            ))}
          </ul>
        </div>
      )}
      <div className="mt-4 flex space-x-4">
        <button
          onClick={() => {
            const blob = new Blob([yamlContent], { type: 'text/yaml' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'dta-config.yaml';
            a.click();
            URL.revokeObjectURL(url);
          }}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Export YAML
        </button>
        <button
          onClick={() => document.querySelector('input[type="file"]')?.click()}
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
        >
          Import YAML
        </button>
      </div>
    </div>
  );
};

export default YamlEditor;
