import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './components/Landing/LandingPage';
import LoginPage from './components/Auth/LoginPage';
import SignupPage from './components/Auth/SignupPage';
import WelcomeScreen from './components/Welcome/WelcomeScreen';
import BuildIntegrityForm from './components/Dashboard/BuildIntegrityForm';
import AITestDashboard from './components/Dashboard/AITestDashboard';
import QAEngineerDashboard from './components/Dashboard/QAEngineerDashboard';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Default route redirects to landing page */}
          <Route path="/" element={<Navigate to="/landing" replace />} />
          <Route path="/landing" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/welcome" element={<WelcomeScreen />} />
          <Route path="/dashboard" element={<AITestDashboard />} />
          <Route path="/build-integrity-check" element={<BuildIntegrityForm />} />
          <Route path="/qa-engineer-dashboard" element={<QAEngineerDashboard />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
