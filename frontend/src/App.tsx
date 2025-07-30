import { AppProvider, useAppContext } from './context/AppContext';
import Layout from './components/Layout';
import YamlEditor from './components/YamlEditor';
import ExcelProcessor from './components/ExcelProcessor';
import ResultsDashboard from './components/ResultsDashboard';

const DtaAnalysisContent = () => <YamlEditor />;
const DataTransformationContent = () => {
  const { processingState } = useAppContext();
  if (processingState.step === 'completed') {
    return <ResultsDashboard />;
  }
  return <ExcelProcessor />;
};

function AppContent() {
  const { activeTab } = useAppContext();

  return (
    <Layout>
      {activeTab === 'DTA Analysis' ? <DtaAnalysisContent /> : <DataTransformationContent />}
    </Layout>
  );
}

function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}

export default App;
