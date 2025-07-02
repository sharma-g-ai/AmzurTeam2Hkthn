import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './components/Landing/LandingPage';
import LoginPage from './components/Auth/LoginPage';
import SignupPage from './components/Auth/SignupPage';
import BuildIntegrityForm from './components/Dashboard/BuildIntegrityForm';
import AITestDashboard from './components/Dashboard/AITestDashboard';
import QAEngineerDashboard from './components/Dashboard/QAEngineerDashboard';
import TestConfigurationDashboard from './components/Dashboard/TestConfigurationDashboard';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Default route shows Landing Page */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/landing" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/dashboard" element={<AITestDashboard />} />
          <Route path="/build-integrity-check" element={<BuildIntegrityForm />} />
          <Route path="/qa-engineer-dashboard" element={<QAEngineerDashboard />} />
          <Route path="/test-configuration" element={<TestConfigurationDashboard />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
