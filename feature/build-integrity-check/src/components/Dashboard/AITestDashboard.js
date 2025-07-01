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

    return (
        <div className="ai-test-dashboard">
            <div className="dashboard-header">
                <div className="header-top">
                    <h1>AI Test Dashboard</h1>
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
                        <button className="btn btn-primary" onClick={handleRunNewTask}>Run New Task</button>
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
                            <button className="btn btn-outline">View All</button>
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
                                        <button className="btn btn-sm btn-outline">View Details</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Activity Feed */}
                    <div className="activity-section">
                        <div className="section-header">
                            <h2>Recent Activity</h2>
                            <button className="btn btn-outline">View All</button>
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
        </div>
    );
};

export default AITestDashboard;
