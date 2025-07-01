import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import BuildIntegrityForm from './components/Dashboard/BuildIntegrityForm';
import AITestDashboard from './components/Dashboard/AITestDashboard';
import QAEngineerDashboard from './components/Dashboard/QAEngineerDashboard';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<AITestDashboard />} />
          <Route path="/build-integrity-check" element={<BuildIntegrityForm />} />
          <Route path="/qa-engineer-dashboard" element={<QAEngineerDashboard />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
