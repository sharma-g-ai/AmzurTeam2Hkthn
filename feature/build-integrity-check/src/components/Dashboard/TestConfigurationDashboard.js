import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './TestConfigurationDashboard.css';

const TestConfigurationDashboard = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        applicationUrl: 'https://www.example.com',
        testManagementTool: 'Jira',
        languageAndTools: 'JavaScript - Cypress'
    });

    const testManagementTools = [
        'Jira',
        'Azure DevOps',
        'TestRail',
        'Zephyr',
        'qTest',
        'PractiTest',
        'TestLink'
    ];

    const languageAndToolsOptions = [
        'JavaScript - Cypress',
        'JavaScript - Selenium',
        'Python - Selenium',
        'Java - Selenium',
        'C# - Selenium',
        'TypeScript - Playwright',
        'JavaScript - Playwright',
        'Python - Pytest',
        'Java - TestNG',
        'Ruby - RSpec'
    ];

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleImport = () => {
        console.log('Importing configuration:', formData);
        // Add your import logic here
        alert('Configuration imported successfully!');
    };

    const handleBackToDashboard = () => {
        navigate('/');
    };

    return (
        <div className="test-config-container">
            {/* Sidebar */}
            <div className="test-config-sidebar">
                <div className="sidebar-header">
                    <button className="back-button" onClick={handleBackToDashboard}>
                        ←
                    </button>
                    <h2 className="sidebar-title">AI Test Master</h2>
                </div>

                <nav className="sidebar-nav">
                    <ul className="nav-list">
                        <li className="nav-item active">
                            <span className="nav-link">Dashboard</span>
                        </li>
                        <li className="nav-item">
                            <span className="nav-link">Test Cases</span>
                        </li>
                        <li className="nav-item">
                            <span className="nav-link">Test Scripts</span>
                        </li>
                        <li className="nav-item">
                            <span className="nav-link">Git Repository</span>
                        </li>
                        <li className="nav-item">
                            <span className="nav-link">Reports</span>
                        </li>
                        <li className="nav-item">
                            <span className="nav-link">Settings</span>
                        </li>
                        <li className="nav-item">
                            <span className="nav-link">Help</span>
                        </li>
                    </ul>
                </nav>
            </div>

            {/* Main Content */}
            <div className="test-config-main">
                <div className="main-header">
                    <h1 className="page-title">Dashboard</h1>
                    <div className="header-actions">
                        <button className="record-btn">• Record</button>
                        <button className="edit-btn">✏️</button>
                        <div className="user-avatar">AI</div>
                    </div>
                </div>

                <div className="config-form">
                    <div className="form-group">
                        <label htmlFor="applicationUrl" className="form-label">
                            Application URL
                        </label>
                        <input
                            type="url"
                            id="applicationUrl"
                            name="applicationUrl"
                            className="form-input"
                            value={formData.applicationUrl}
                            onChange={handleInputChange}
                            placeholder="https://www.example.com"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="testManagementTool" className="form-label">
                            Test Management Tool
                        </label>
                        <select
                            id="testManagementTool"
                            name="testManagementTool"
                            className="form-select"
                            value={formData.testManagementTool}
                            onChange={handleInputChange}
                        >
                            {testManagementTools.map((tool) => (
                                <option key={tool} value={tool}>
                                    {tool}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="form-group">
                        <label htmlFor="languageAndTools" className="form-label">
                            Language & Tools
                        </label>
                        <select
                            id="languageAndTools"
                            name="languageAndTools"
                            className="form-select"
                            value={formData.languageAndTools}
                            onChange={handleInputChange}
                        >
                            {languageAndToolsOptions.map((option) => (
                                <option key={option} value={option}>
                                    {option}
                                </option>
                            ))}
                        </select>
                    </div>

                    <button className="import-btn" onClick={handleImport}>
                        Import
                    </button>
                </div>
            </div>
        </div>
    );
};

export default TestConfigurationDashboard;
