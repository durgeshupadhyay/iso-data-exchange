export interface ProcessingState {
  step: 'idle' | 'uploading' | 'preview' | 'processing' | 'completed' | 'error';
  progress: number;
  statusText: string;
  data?: any[][];
  error?: string;
}
