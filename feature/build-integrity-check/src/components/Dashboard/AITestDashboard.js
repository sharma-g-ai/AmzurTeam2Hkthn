import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AITestDashboard.css';

const AITestDashboard = () => {
    const navigate = useNavigate();
    const [selectedTimeRange, setSelectedTimeRange] = useState('Last 30 days');

    const handleRunNewTask = () => {
        navigate('/build-integrity-check');
    };

    const testStats = [
        { label: 'Total Tests', value: '1,247', change: '+12%', positive: true },
        { label: 'Passed Tests', value: '1,156', change: '+8%', positive: true },
        { label: 'Failed Tests', value: '91', change: '-5%', positive: true },
        { label: 'Test Coverage', value: '92.7%', change: '+2.1%', positive: true }
    ];

    const projects = [
        {
            name: 'E-commerce Platform',
            status: 'Active',
            lastRun: '2 hours ago',
            coverage: '94%',
            tests: 324,
            passed: 310,
            failed: 14
        },
        {
            name: 'Mobile Banking App',
            status: 'Active',
            lastRun: '5 hours ago',
            coverage: '89%',
            tests: 267,
            passed: 251,
            failed: 16
        },
        {
            name: 'Analytics Dashboard',
            status: 'Completed',
            lastRun: '1 day ago',
            coverage: '96%',
            tests: 198,
            passed: 192,
            failed: 6
        },
        {
            name: 'Payment Gateway',
            status: 'Active',
            lastRun: '3 hours ago',
            coverage: '91%',
            tests: 156,
            passed: 148,
            failed: 8
        }
    ];

    const recentActivities = [
        {
            type: 'test_run',
            project: 'E-commerce Platform',
            action: 'Test suite completed',
            time: '2 hours ago',
            status: 'success'
        },
        {
            type: 'test_failure',
            project: 'Mobile Banking App',
            action: 'Authentication tests failed',
            time: '5 hours ago',
            status: 'error'
        },
        {
            type: 'test_run',
            project: 'Analytics Dashboard',
            action: 'Performance tests completed',
            time: '1 day ago',
            status: 'success'
        },
        {
            type: 'alert',
            project: 'Payment Gateway',
            action: 'Coverage threshold warning',
            time: '2 days ago',
            status: 'warning'
        },
        {
            type: 'test_run',
            project: 'E-commerce Platform',
            action: 'Regression tests started',
            time: '3 days ago',
            status: 'info'
        }
    ];

    const getStatusBadgeClass = (status) => {
        switch (status.toLowerCase()) {
            case 'active': return 'status-active';
            case 'completed': return 'status-completed';
            case 'pending': return 'status-pending';
            default: return 'status-default';
        }
    };

    const getActivityIcon = (type) => {
        switch (type) {
            case 'test_run': return '▶️';
            case 'test_failure': return '❌';
            case 'alert': return '⚠️';
            default: return 'ℹ️';
        }
    };

    const getActivityStatusClass = (status) => {
        switch (status) {
            case 'success': return 'activity-success';
            case 'error': return 'activity-error';
            case 'warning': return 'activity-warning';
            default: return 'activity-info';
        }
    };

    // New state for view switching
    const [view, setView] = React.useState('dashboard'); // 'dashboard', 'projects', 'activity', 'project-detail'
    const [selectedProject, setSelectedProject] = React.useState(null);

    // Handlers for View All buttons
    const handleViewAllProjects = () => setView('projects');
    const handleViewAllActivity = () => setView('activity');
    const handleBack = () => setView('dashboard');
    const handleViewProjectDetails = (project) => {
        setSelectedProject(project);
        setView('project-detail');
    };

    // Placeholder for detailed screens (replace with your actual detailed components as needed)
    const renderProjectsDetail = () => (
        <div className="details-view">
            <button className="btn btn-outline" onClick={handleBack}>Back</button>
            <h2>All Projects - Detailed View</h2>
            {/* Example: show Analytics Dashboard card as in your screenshot */}
            <div className="project-detail-card">
                <h3>Analytics Dashboard</h3>
                <div>Status: <span className="badge completed">COMPLETED</span></div>
                <div>Coverage: 96%</div>
                <div>Total Tests: 198</div>
                <div className="results-row">
                    <div className="passed">192 PASSED</div>
                    <div className="failed">6 FAILED</div>
                </div>
                <div>Last run: 1 day ago</div>
                <button className="btn btn-outline">View Details</button>
            </div>
            {/* Add more detailed cards as needed */}
        </div>
    );

    const renderProjectDetail = () => {
        if (!selectedProject) return null;

        // Sample detailed data based on the screenshots
        const detailedData = {
            'Analytics Dashboard': {
                testExecution: {
                    passed: 192,
                    failed: 6,
                    blocked: 0,
                    inProgress: 0,
                    passPercentage: 96
                },
                applicationInfo: {
                    url: 'https://analytics.example.com',
                    environment: 'Production',
                    browser: 'Chrome 125.0',
                    testFramework: 'Selenium + TestNG',
                    buildVersion: 'v2.4.1',
                    tester: 'John Doe',
                    testSuite: 'Regression Suite',
                    testStartDate: 'June 25, 2025',
                    testEndDate: 'June 27, 2025',
                    duration: '2 days'
                },
                bugReports: {
                    totalBugs: 8,
                    open: 3,
                    inProgress: 2,
                    resolved: 1,
                    recentIssues: [
                        { title: 'Cart calculation error', id: '#BUG-001', priority: 'High' },
                        { title: 'Payment gateway timeout', id: '#BUG-002', priority: 'Medium' },
                        { title: 'UI alignment issue', id: '#BUG-003', priority: 'Low' }
                    ]
                },
                testCases: [
                    { id: 'TC_001', description: 'User Login Functionality', status: 'PASSED', priority: 'High', executionTime: '2.3s' },
                    { id: 'TC_002', description: 'Dashboard Data Loading', status: 'PASSED', priority: 'High', executionTime: '4.1s' },
                    { id: 'TC_003', description: 'Chart Rendering Function', status: 'FAILED', priority: 'Critical', executionTime: '3.7s' },
                    { id: 'TC_004', description: 'Export Functionality', status: 'BLOCKED', priority: 'High', executionTime: '-' },
                    { id: 'TC_005', description: 'User Profile Update', status: 'IN PROGRESS', priority: 'Medium', executionTime: '-' }
                ],
                timeline: [
                    { date: 'June 25, 2025 - 2:00 AM', event: 'Test Execution Started', description: 'Regression test suite initiated with 156 test cases' },
                    { date: 'June 25, 2025 - 2:30 PM', event: 'First Critical Bug Found', description: 'Chart calculation error discovered during dashboard tests' },
                    { date: 'June 26, 2025 - 4:00 PM', event: 'Day 1 Complete', description: '85 test cases executed, 78 passed, 7 failed' },
                    { date: 'June 27, 2025 - 4:00 PM', event: 'Testing Completed', description: 'All test cases executed, final reports generated' }
                ],
                artifacts: {
                    testExecutionReport: 'Available',
                    bugReport: 'Available',
                    coverageReport: 'Available',
                    screenshots: '12 Files'
                },
                metrics: {
                    codeCoverage: '97.3%',
                    testEfficiency: '94.2%',
                    avgExecutionTime: '3.2s',
                    totalExecutionTime: '5.3 minutes'
                }
            },
            'E-commerce Platform': {
                testExecution: {
                    passed: 310,
                    failed: 14,
                    blocked: 3,
                    inProgress: 2,
                    passPercentage: 94
                },
                applicationInfo: {
                    url: 'https://shop.example.com',
                    environment: 'Production',
                    browser: 'Chrome 125.0',
                    testFramework: 'Selenium + TestNG',
                    buildVersion: 'v2.4.1',
                    tester: 'John Doe',
                    testSuite: 'Regression Suite',
                    testStartDate: 'June 25, 2025',
                    testEndDate: 'June 27, 2025',
                    duration: '2 days'
                },
                bugReports: {
                    totalBugs: 12,
                    open: 5,
                    inProgress: 3,
                    resolved: 2,
                    recentIssues: [
                        { title: 'Cart calculation error', id: '#BUG-001', priority: 'High' },
                        { title: 'Payment gateway timeout', id: '#BUG-002', priority: 'Medium' },
                        { title: 'UI alignment issue', id: '#BUG-003', priority: 'Low' }
                    ]
                },
                testCases: [
                    { id: 'TC_001', description: 'User Login Functionality', status: 'PASSED', priority: 'High', executionTime: '2.3s' },
                    { id: 'TC_002', description: 'Product Search Feature', status: 'PASSED', priority: 'High', executionTime: '4.1s' },
                    { id: 'TC_003', description: 'Add to Cart Function', status: 'FAILED', priority: 'Critical', executionTime: '3.7s' },
                    { id: 'TC_004', description: 'Checkout Process', status: 'BLOCKED', priority: 'High', executionTime: '-' },
                    { id: 'TC_005', description: 'User Registration', status: 'IN PROGRESS', priority: 'Medium', executionTime: '-' }
                ],
                timeline: [
                    { date: 'June 25, 2025 - 2:00 AM', event: 'Test Execution Started', description: 'Regression test suite initiated with 156 test cases' },
                    { date: 'June 25, 2025 - 2:30 PM', event: 'First Critical Bug Found', description: 'Cart calculation error discovered during checkout tests' },
                    { date: 'June 26, 2025 - 4:00 PM', event: 'Day 1 Complete', description: '85 test cases executed, 78 passed, 7 failed' },
                    { date: 'June 27, 2025 - 4:00 PM', event: 'Testing Completed', description: 'All test cases executed, final reports generated' }
                ],
                artifacts: {
                    testExecutionReport: 'Available',
                    bugReport: 'Available',
                    coverageReport: 'Available',
                    screenshots: '12 Files'
                },
                metrics: {
                    codeCoverage: '87.3%',
                    testEfficiency: '91.2%',
                    avgExecutionTime: '3.5s',
                    totalExecutionTime: '8.3 minutes'
                }
            }
        };

        const data = detailedData[selectedProject.name] || detailedData['Analytics Dashboard'];

        return (
            <div className="project-detail-view">
                <div className="detail-header">
                    <button className="btn btn-outline" onClick={handleBack}>← Back</button>
                    <h1>{selectedProject.name} Test Results</h1>
                    <div className="detail-status">
                        <span className={`status-badge status-${selectedProject.status.toLowerCase()}`}>
                            {selectedProject.status.toUpperCase()}
                        </span>
                    </div>
                </div>

                {/* Test Execution Summary */}
                <div className="detail-section">
                    <h2>Test Execution Summary</h2>
                    <div className="execution-summary">
                        <div className="execution-stats">
                            <div className="stat-box passed">
                                <div className="stat-number">{data.testExecution.passed}</div>
                                <div className="stat-label">Passed</div>
                            </div>
                            <div className="stat-box failed">
                                <div className="stat-number">{data.testExecution.failed}</div>
                                <div className="stat-label">Failed</div>
                            </div>
                            <div className="stat-box blocked">
                                <div className="stat-number">{data.testExecution.blocked}</div>
                                <div className="stat-label">Blocked</div>
                            </div>
                            <div className="stat-box in-progress">
                                <div className="stat-number">{data.testExecution.inProgress}</div>
                                <div className="stat-label">In Progress</div>
                            </div>
                        </div>
                        <div className="progress-bar">
                            <div className="progress-fill" style={{ width: `${data.testExecution.passPercentage}%` }}></div>
                        </div>
                        <div className="progress-text">{data.testExecution.passPercentage}% Test Cases Passed</div>
                    </div>
                </div>

                {/* Application Information */}
                <div className="detail-section">
                    <h2>Application Information</h2>
                    <div className="info-grid">
                        <div className="info-column">
                            <div className="info-item">
                                <label>Application URL</label>
                                <a href={data.applicationInfo.url} target="_blank" rel="noopener noreferrer">
                                    {data.applicationInfo.url}
                                </a>
                            </div>
                            <div className="info-item">
                                <label>Environment</label>
                                <span>{data.applicationInfo.environment}</span>
                            </div>
                            <div className="info-item">
                                <label>Test Start Date</label>
                                <span>{data.applicationInfo.testStartDate}</span>
                            </div>
                            <div className="info-item">
                                <label>Test End Date</label>
                                <span>{data.applicationInfo.testEndDate}</span>
                            </div>
                            <div className="info-item">
                                <label>Duration</label>
                                <span>{data.applicationInfo.duration}</span>
                            </div>
                        </div>
                        <div className="info-column">
                            <div className="info-item">
                                <label>Browser</label>
                                <span>{data.applicationInfo.browser}</span>
                            </div>
                            <div className="info-item">
                                <label>Test Framework</label>
                                <span>{data.applicationInfo.testFramework}</span>
                            </div>
                            <div className="info-item">
                                <label>Build Version</label>
                                <span>{data.applicationInfo.buildVersion}</span>
                            </div>
                            <div className="info-item">
                                <label>Tester</label>
                                <span>{data.applicationInfo.tester}</span>
                            </div>
                            <div className="info-item">
                                <label>Test Suite</label>
                                <span>{data.applicationInfo.testSuite}</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bug Reports & Issues */}
                <div className="detail-section">
                    <h2>Bug Reports & Issues</h2>
                    <div className="bug-summary-grid">
                        <div className="bug-summary">
                            <h3>Bug Summary</h3>
                            <div className="bug-stats">
                                <div className="bug-stat">
                                    <label>Total Bugs Filed</label>
                                    <span>{data.bugReports.totalBugs}</span>
                                </div>
                                <div className="bug-stat">
                                    <label>Open</label>
                                    <span>{data.bugReports.open}</span>
                                </div>
                                <div className="bug-stat">
                                    <label>In Progress</label>
                                    <span>{data.bugReports.inProgress}</span>
                                </div>
                                <div className="bug-stat">
                                    <label>Resolved</label>
                                    <span>{data.bugReports.resolved}</span>
                                </div>
                            </div>
                        </div>
                        <div className="recent-issues">
                            <h3>Recent Issues</h3>
                            <div className="issues-list">
                                {data.bugReports.recentIssues.map((issue, index) => (
                                    <div key={index} className="issue-item">
                                        <div className="issue-title">{issue.title}</div>
                                        <div className="issue-meta">
                                            <span className="issue-id">{issue.id}</span>
                                            <span className={`priority priority-${issue.priority.toLowerCase()}`}>
                                                {issue.priority}
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Test Cases Breakdown */}
                <div className="detail-section">
                    <h2>Test Cases Breakdown</h2>
                    <div className="test-cases-table">
                        <div className="table-header">
                            <div>Test Case ID</div>
                            <div>Description</div>
                            <div>Status</div>
                            <div>Priority</div>
                            <div>Execution Time</div>
                        </div>
                        {data.testCases.map((testCase, index) => (
                            <div key={index} className="table-row">
                                <div className="test-id">{testCase.id}</div>
                                <div className="test-description">{testCase.description}</div>
                                <div className={`test-status status-${testCase.status.toLowerCase().replace(' ', '-')}`}>
                                    {testCase.status}
                                </div>
                                <div className={`test-priority priority-${testCase.priority.toLowerCase()}`}>
                                    {testCase.priority}
                                </div>
                                <div className="execution-time">{testCase.executionTime}</div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Test Execution Timeline */}
                <div className="detail-section">
                    <h2>Test Execution Timeline</h2>
                    <div className="timeline">
                        {data.timeline.map((event, index) => (
                            <div key={index} className="timeline-item">
                                <div className="timeline-marker"></div>
                                <div className="timeline-content">
                                    <div className="timeline-date">{event.date}</div>
                                    <div className="timeline-event">{event.event}</div>
                                    <div className="timeline-description">{event.description}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Test Artifacts & Reports */}
                <div className="detail-section">
                    <h2>Test Artifacts & Reports</h2>
                    <div className="artifacts-grid">
                        <div className="artifacts-section">
                            <h3>Generated Reports</h3>
                            <div className="artifact-list">
                                <div className="artifact-item">
                                    <span>Test Execution Report</span>
                                    <span className="artifact-status">{data.artifacts.testExecutionReport}</span>
                                </div>
                                <div className="artifact-item">
                                    <span>Bug Report</span>
                                    <span className="artifact-status">{data.artifacts.bugReport}</span>
                                </div>
                                <div className="artifact-item">
                                    <span>Coverage Report</span>
                                    <span className="artifact-status">{data.artifacts.coverageReport}</span>
                                </div>
                                <div className="artifact-item">
                                    <span>Screenshots</span>
                                    <span className="artifact-status">{data.artifacts.screenshots}</span>
                                </div>
                            </div>
                        </div>
                        <div className="metrics-section">
                            <h3>Test Metrics</h3>
                            <div className="metrics-list">
                                <div className="metric-item">
                                    <span>Code Coverage</span>
                                    <span className="metric-value">{data.metrics.codeCoverage}</span>
                                </div>
                                <div className="metric-item">
                                    <span>Test Efficiency</span>
                                    <span className="metric-value">{data.metrics.testEfficiency}</span>
                                </div>
                                <div className="metric-item">
                                    <span>Avg. Execution Time</span>
                                    <span className="metric-value">{data.metrics.avgExecutionTime}</span>
                                </div>
                                <div className="metric-item">
                                    <span>Total Execution Time</span>
                                    <span className="metric-value">{data.metrics.totalExecutionTime}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    const renderActivityDetail = () => (
        <div className="details-view">
            <button className="btn btn-outline" onClick={handleBack}>Back</button>
            <h2>Recent Activity - Detailed View</h2>
            {/* Example: show E-commerce Platform Test Results as in your screenshot */}
            <div className="activity-detail-card">
                <h3>E-commerce Platform Test Results</h3>
                <div className="test-summary">
                    <div>Passed: 139</div>
                    <div>Failed: 12</div>
                    <div>Blocked: 3</div>
                    <div>In Progress: 2</div>
                    <div>89% Test Cases Passed</div>
                </div>
                <div className="application-info">
                    <div>Application URL: <a href="https://shop.example.com">https://shop.example.com</a></div>
                    <div>Environment: Production</div>
                    <div>Browser: Chrome 125.0</div>
                    <div>Test Framework: Selenium + TestNG</div>
                    <div>Build Version: v2.4.1</div>
                    <div>Tester: John Doe</div>
                    <div>Test Suite: Regression Suite</div>
                </div>
                {/* Add more details as per your screenshots */}
            </div>
        </div>
    );

    return (
        <div className="ai-test-dashboard">
            {view === 'dashboard' && (
                <>
                    <div className="dashboard-header">
                        <div className="header-top">
                            <h1>Dashboard</h1>
                            <div className="header-controls">
                                <select
                                    value={selectedTimeRange}
                                    onChange={(e) => setSelectedTimeRange(e.target.value)}
                                    className="time-range-selector"
                                >
                                    <option>Last 7 days</option>
                                    <option>Last 30 days</option>
                                    <option>Last 90 days</option>
                                    <option>Last 6 months</option>
                                </select>
                                <button className="btn btn-primary" onClick={handleRunNewTask}>New Test Project</button>
                            </div>
                        </div>
                    </div>

                    <div className="dashboard-content">
                        {/* Statistics Cards */}
                        <div className="stats-section">
                            <h2>Test Overview</h2>
                            <div className="stats-grid">
                                {testStats.map((stat, index) => (
                                    <div key={index} className="stat-card">
                                        <div className="stat-value">{stat.value}</div>
                                        <div className="stat-label">{stat.label}</div>
                                        <div className={`stat-change ${stat.positive ? 'positive' : 'negative'}`}>
                                            {stat.change}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="dashboard-main">
                            {/* Projects Section */}
                            <div className="projects-section">
                                <div className="section-header">
                                    <h2>Active Projects</h2>
                                    <button className="btn btn-outline" onClick={handleViewAllProjects}>View All</button>
                                </div>
                                <div className="projects-grid">
                                    {projects.map((project, index) => (
                                        <div key={index} className="project-card">
                                            <div className="project-header">
                                                <h3>{project.name}</h3>
                                                <span className={`status-badge ${getStatusBadgeClass(project.status)}`}>
                                                    {project.status}
                                                </span>
                                            </div>
                                            <div className="project-stats">
                                                <div className="stat">
                                                    <span className="stat-label">Coverage</span>
                                                    <span className="stat-value">{project.coverage}</span>
                                                </div>
                                                <div className="stat">
                                                    <span className="stat-label">Total Tests</span>
                                                    <span className="stat-value">{project.tests}</span>
                                                </div>
                                            </div>
                                            <div className="project-results">
                                                <div className="result-item passed">
                                                    <span className="result-count">{project.passed}</span>
                                                    <span className="result-label">Passed</span>
                                                </div>
                                                <div className="result-item failed">
                                                    <span className="result-count">{project.failed}</span>
                                                    <span className="result-label">Failed</span>
                                                </div>
                                            </div>
                                            <div className="project-footer">
                                                <span className="last-run">Last run: {project.lastRun}</span>
                                                <button
                                                    className="btn btn-sm btn-outline"
                                                    onClick={() => handleViewProjectDetails(project)}
                                                >
                                                    View Details
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Activity Feed */}
                            <div className="activity-section">
                                <div className="section-header">
                                    <h2>Recent Activity</h2>
                                    <button className="btn btn-outline" onClick={handleViewAllActivity}>View All</button>
                                </div>
                                <div className="activity-feed">
                                    {recentActivities.map((activity, index) => (
                                        <div key={index} className={`activity-item ${getActivityStatusClass(activity.status)}`}>
                                            <div className="activity-icon">
                                                {getActivityIcon(activity.type)}
                                            </div>
                                            <div className="activity-content">
                                                <div className="activity-main">
                                                    <span className="activity-project">{activity.project}</span>
                                                    <span className="activity-action">{activity.action}</span>
                                                </div>
                                                <div className="activity-time">{activity.time}</div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Quick Actions */}
                        <div className="quick-actions">
                            <h2>Quick Actions</h2>
                            <div className="actions-grid">
                                <button className="action-card" onClick={handleRunNewTask}>
                                    <div className="action-icon">✓</div>
                                    <div className="action-label">Build Integrity Check</div>
                                </button>
                                <button className="action-card">
                                    <div className="action-icon">🧪</div>
                                    <div className="action-label">Create Test Suite</div>
                                </button>
                                <button className="action-card">
                                    <div className="action-icon">📊</div>
                                    <div className="action-label">Generate Report</div>
                                </button>
                                <button className="action-card">
                                    <div className="action-icon">⚙️</div>
                                    <div className="action-label">Configure Tests</div>
                                </button>
                                <button className="action-card">
                                    <div className="action-icon">🔍</div>
                                    <div className="action-label">Analyze Results</div>
                                </button>
                                <button className="action-card">
                                    <div className="action-icon">🤖</div>
                                    <div className="action-label">AI Test Generation</div>
                                </button>
                            </div>
                        </div>
                    </div>
                </>
            )}
            {view === 'projects' && renderProjectsDetail()}
            {view === 'activity' && renderActivityDetail()}
            {view === 'project-detail' && renderProjectDetail()}
        </div>
    );
};

export default AITestDashboard;
