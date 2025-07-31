import React from 'react';
import Header from './Header';
import Tabs from './Tabs';
import StepIndicator from './StepIndicator';
import { useAppContext } from '../context/AppContext';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { activeTab, setActiveTab, currentStep, totalSteps } = useAppContext();

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="container mx-auto p-4">
        <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />
        <div className="my-8">
          <StepIndicator currentStep={currentStep} totalSteps={totalSteps} />
        </div>
        <main>{children}</main>
      </div>
    </div>
  );
};

export default Layout;
