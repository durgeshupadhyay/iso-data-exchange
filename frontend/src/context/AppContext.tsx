import React, { createContext, useState, useContext, ReactNode } from 'react';

interface AppContextType {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  currentStep: number;
  setCurrentStep: (step: number) => void;
  totalSteps: number;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [activeTab, setActiveTab] = useState('DTA Analysis');
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 4; // Example: 4 steps in the workflow

  return (
    <AppContext.Provider
      value={{
        activeTab,
        setActiveTab,
        currentStep,
        setCurrentStep,
        totalSteps,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};
