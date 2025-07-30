import { AppProvider, useAppContext } from './context/AppContext';
import Layout from './components/Layout';

const DtaAnalysisContent = () => <div>DTA Analysis Content</div>;
const DataTransformationContent = () => <div>Data Transformation Content</div>;

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
