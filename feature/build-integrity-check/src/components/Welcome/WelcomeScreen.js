import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './WelcomeScreen.css';

const WelcomeScreen = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [userInfo, setUserInfo] = useState({
        name: 'User',
        email: ''
    });
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        // Get user info from navigation state (passed from login)
        if (location.state?.userInfo) {
            setUserInfo(location.state.userInfo);
        }
    }, [location.state]);

    const handleContinue = () => {
        setIsLoading(true);

        // Simulate loading/setup time
        setTimeout(() => {
            navigate('/dashboard');
        }, 1500);
    };

    return (
        <div className="welcome-screen">
            <div className="welcome-container">
                <div className="welcome-content">
                    {/* Welcome Header */}
                    <div className="welcome-header">
                        <div className="welcome-logo">
                            <img src="https://amzur.com/wp-content/uploads/2022/07/Amzur-logo-2022-white.png" alt="Amzur Logo" />
                            <span>AI Test Master</span>
                        </div>
                    </div>

                    {/* Main Welcome Card */}
                    <div className="welcome-card">
                        <div className="welcome-icon">
                            <div className="success-circle">
                                <span className="checkmark">✓</span>
                            </div>
                        </div>

                        <div className="welcome-message">
                            <h1>Welcome to AI Test Master!</h1>
                            <p className="welcome-subtitle">
                                {userInfo.name ? `Hello ${userInfo.name}, ` : 'Hello, '}
                                you're all set to transform your testing experience with AI-powered automation.
                            </p>
                        </div>

                        <div className="welcome-features">
                            <div className="feature-item">
                                <div className="feature-icon">🤖</div>
                                <div className="feature-text">
                                    <h3>AI Test Generation</h3>
                                    <p>Automatically generate test scripts from user interactions</p>
                                </div>
                            </div>

                            <div className="feature-item">
                                <div className="feature-icon">🔧</div>
                                <div className="feature-text">
                                    <h3>Build Integrity Check</h3>
                                    <p>Validate builds across multiple environments</p>
                                </div>
                            </div>

                            <div className="feature-item">
                                <div className="feature-icon">📊</div>
                                <div className="feature-text">
                                    <h3>Advanced Analytics</h3>
                                    <p>Get detailed insights and comprehensive reports</p>
                                </div>
                            </div>
                        </div>

                        <div className="welcome-stats">
                            <div className="stat-item">
                                <span className="stat-number">99.9%</span>
                                <span className="stat-label">Uptime</span>
                            </div>
                            <div className="stat-item">
                                <span className="stat-number">10K+</span>
                                <span className="stat-label">Tests/Day</span>
                            </div>
                            <div className="stat-item">
                                <span className="stat-number">85%</span>
                                <span className="stat-label">Time Saved</span>
                            </div>
                        </div>

                        <div className="welcome-actions">
                            <button
                                className="btn-continue"
                                onClick={handleContinue}
                                disabled={isLoading}
                            >
                                {isLoading ? (
                                    <>
                                        <span className="spinner"></span>
                                        Setting up your dashboard...
                                    </>
                                ) : (
                                    <>
                                        Continue to Dashboard
                                        <span className="arrow">→</span>
                                    </>
                                )}
                            </button>
                        </div>

                        <div className="welcome-note">
                            <p>Your 14-day free trial has started. No credit card required.</p>
                        </div>
                    </div>

                    {/* Quick Tips */}
                    <div className="quick-tips">
                        <h3>Quick Tips to Get Started</h3>
                        <div className="tips-grid">
                            <div className="tip-item">
                                <span className="tip-number">1</span>
                                <p>Explore the Build Integrity Check feature</p>
                            </div>
                            <div className="tip-item">
                                <span className="tip-number">2</span>
                                <p>Set up your first automated test suite</p>
                            </div>
                            <div className="tip-item">
                                <span className="tip-number">3</span>
                                <p>Configure CI/CD integrations</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Background */}
            <div className="welcome-background">
                <div className="bg-pattern"></div>
            </div>
        </div>
    );
};

export default WelcomeScreen;
