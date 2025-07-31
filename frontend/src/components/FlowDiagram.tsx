import React, { useMemo } from 'react';
import ReactFlow, { Node, Edge } from 'reactflow';
import 'reactflow/dist/style.css';

interface FlowDiagramProps {
  currentStep: number;
}

const FlowDiagram: React.FC<FlowDiagramProps> = ({ currentStep }) => {
  const nodes: Node[] = useMemo(
    () => [
      { id: '1', position: { x: 0, y: 0 }, data: { label: 'Source Data' }, style: { background: currentStep >= 1 ? '#4ade80' : '#e5e7eb', color: 'white' } },
      { id: '2', position: { x: 250, y: 0 }, data: { label: 'Quality Check' }, style: { background: currentStep >= 2 ? '#4ade80' : '#e5e7eb', color: 'white' } },
      { id: '3', position: { x: 500, y: 0 }, data: { label: 'Transform' }, style: { background: currentStep >= 3 ? '#4ade80' : '#e5e7eb', color: 'white' } },
      { id: '4', position: { x: 750, y: 0 }, data: { label: 'CTMS Ready' }, style: { background: currentStep >= 4 ? '#4ade80' : '#e5e7eb', color: 'white' } },
    ],
    [currentStep]
  );

  const edges: Edge[] = useMemo(
    () => [
      { id: 'e1-2', source: '1', target: '2', animated: currentStep >= 1 && currentStep < 2 },
      { id: 'e2-3', source: '2', target: '3', animated: currentStep >= 2 && currentStep < 3 },
      { id: 'e3-4', source: '3', target: '4', animated: currentStep >= 3 && currentStep < 4 },
    ],
    [currentStep]
  );

  return (
    <div style={{ height: 200 }}>
      <ReactFlow nodes={nodes} edges={edges} fitView />
    </div>
  );
};

export default FlowDiagram;
