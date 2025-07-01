import React from 'react';
import EnvironmentSelector from './EnvironmentSelector';
import ApplicationDropdown from './ApplicationDropdown';
import BuildDropdown from './BuildDropdown';
import ModuleDropdown from './ModuleDropdown';
import TestRunner from '../Testing/TestRunner';
import ResultsModal from '../Testing/ResultsModal';
import CRUDModal from '../CRUD/CRUDModal';
import './BuildIntegrityDashboard.css';

const BuildIntegrityDashboard = () => {
  return (
    <div className="build-integrity-dashboard">
      <header className="dashboard-header">
        <h1>AI Test Master</h1>
        <h2>Build Integrity Check Dashboard</h2>
        <p className="dashboard-subtitle">
          Configure your environment and run comprehensive build integrity tests
        </p>
      </header>

      <main className="dashboard-content">
        {/* Step 1: Environment Selection */}
        <section className="dashboard-section">
          <EnvironmentSelector />
        </section>

        {/* Step 2: Selection Dropdowns */}
        <section className="dashboard-section">
          <div className="selection-grid">
            <ApplicationDropdown />
            <BuildDropdown />
            <ModuleDropdown />
          </div>
        </section>

        {/* Step 3: Test Execution */}
        <section className="dashboard-section">
          <TestRunner />
        </section>
      </main>

      {/* Modals */}
      <ResultsModal />
      <CRUDModal />
    </div>
  );
};

export default BuildIntegrityDashboard;
