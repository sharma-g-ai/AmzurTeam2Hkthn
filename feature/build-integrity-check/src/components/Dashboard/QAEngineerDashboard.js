import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './QAEngineerDashboard.css';

const QAEngineerDashboard = () => {
    const navigate = useNavigate();
    const [applicationUrl, setApplicationUrl] = useState('');
    const [selectedTests, setSelectedTests] = useState({
        functional: [],
        performance: [],
        security: [],
        integration: [],
        uiux: [],
        automated: []
    });

    const testingCategories = {
        functional: {
            title: 'Functional Testing',
            description: 'Validates that the software functions as expected',
            tests: [
                'Unit Testing',
                'Integration Testing',
                'System Testing',
                'Smoke Testing',
                'Regression Testing',
                'Sanity Testing',
                'Acceptance Testing'
            ]
        },
        performance: {
            title: 'Performance Testing',
            description: 'Evaluates the speed, responsiveness, and stability',
            tests: [
                'Load Testing',
                'Stress Testing',
                'Volume Testing',
                'Spike Testing',
                'Endurance Testing'
            ]
        },
        security: {
            title: 'Security Testing',
            description: 'Identifies vulnerabilities in the system',
            tests: [
                'Authentication Testing',
                'Authorization Testing',
                'Data Protection Testing',
                'SQL Injection Testing',
                'Cross-Site Scripting (XSS)'
            ]
        },
        integration: {
            title: 'Integration Testing',
            description: 'Tests interaction between software components and modules',
            tests: [
                'API Testing',
                'Database Integration',
                'Third-party Integration',
                'System Integration'
            ]
        },
        uiux: {
            title: 'UI/UX Testing',
            description: 'Evaluates the user interface and user experience',
            tests: [
                'Usability Testing',
                'Accessibility Testing',
                'Cross-browser Testing',
                'Responsive Design Testing'
            ]
        },
        automated: {
            title: 'Automated Testing',
            description: 'Uses automated testing tools',
            tests: [
                'Automated Regression Testing',
                'Automated API Testing',
                'Automated Performance Testing',
                'CI/CD Pipeline Testing'
            ]
        }
    };

    const handleTestToggle = (category, testName) => {
        setSelectedTests(prev => ({
            ...prev,
            [category]: prev[category].includes(testName)
                ? prev[category].filter(test => test !== testName)
                : [...prev[category], testName]
        }));
    };

    const handleSelectAll = (category) => {
        const allTests = testingCategories[category].tests;
        const currentTests = selectedTests[category];
        const isAllSelected = allTests.length === currentTests.length;

        setSelectedTests(prev => ({
            ...prev,
            [category]: isAllSelected ? [] : [...allTests]
        }));
    };

    const isAllSelected = (category) => {
        return testingCategories[category].tests.length === selectedTests[category].length;
    };

    const getTotalSelectedTests = () => {
        return Object.values(selectedTests).reduce((total, tests) => total + tests.length, 0);
    };

    const handleCancel = () => {
        navigate('/');
    };

    const handleProceed = () => {
        const totalSelected = getTotalSelectedTests();
        if (totalSelected === 0) {
            alert('Please select at least one test type to proceed.');
            return;
        }

        console.log('Selected tests:', selectedTests);
        console.log('Application URL:', applicationUrl);
        alert(`Proceeding with ${totalSelected} selected tests for ${applicationUrl}`);
        
        // Navigate to next step or back to dashboard
        navigate('/');
    };

    return (
        <div className="qa-dashboard-container">
            <div className="qa-dashboard-header">
                <h1>QA Engineer Dashboard</h1>
                <p className="qa-dashboard-subtitle">
                    Select the types of testing you want to perform on your application
                </p>
            </div>

            <div className="qa-dashboard-content">
                {/* Application URL */}
                <div className="application-url-section">
                    <label htmlFor="applicationUrl" className="url-label">
                        Application URL
                    </label>
                    <input
                        type="url"
                        id="applicationUrl"
                        className="url-input"
                        placeholder="https://your-application-url.com"
                        value={applicationUrl}
                        onChange={(e) => setApplicationUrl(e.target.value)}
                    />
                </div>

                {/* Testing Categories */}
                <div className="testing-categories">
                    {Object.entries(testingCategories).map(([categoryKey, category]) => (
                        <div key={categoryKey} className="testing-category">
                            <div className="category-header">
                                <div className="category-info">
                                    <h3 className="category-title">{category.title}</h3>
                                    <p className="category-description">{category.description}</p>
                                </div>
                                <button
                                    className={`select-all-btn ${isAllSelected(categoryKey) ? 'selected' : ''}`}
                                    onClick={() => handleSelectAll(categoryKey)}
                                >
                                    {isAllSelected(categoryKey) ? 'Deselect All' : 'Select All'}
                                    <span className="dropdown-arrow">⌄</span>
                                </button>
                            </div>

                            <div className="tests-list">
                                {category.tests.map((testName) => (
                                    <div key={testName} className="test-item">
                                        <label className="test-checkbox">
                                            <input
                                                type="checkbox"
                                                checked={selectedTests[categoryKey].includes(testName)}
                                                onChange={() => handleTestToggle(categoryKey, testName)}
                                            />
                                            <span className="checkmark"></span>
                                            <span className="test-name">{testName}</span>
                                        </label>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Selection Summary */}
                <div className="selection-summary">
                    <span className="selected-count">
                        {getTotalSelectedTests()} tests selected
                    </span>
                </div>

                {/* Action Buttons */}
                <div className="qa-dashboard-actions">
                    <button className="btn btn-cancel" onClick={handleCancel}>
                        Cancel
                    </button>
                    <button className="btn btn-proceed" onClick={handleProceed}>
                        Proceed
                    </button>
                </div>
            </div>
        </div>
    );
};

export default QAEngineerDashboard;
