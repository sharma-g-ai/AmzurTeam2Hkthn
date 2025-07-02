import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LandingPage.css';

const LandingPage = () => {
    const navigate = useNavigate();
    const [showLoginModal, setShowLoginModal] = useState(false);
    const [showSignupModal, setShowSignupModal] = useState(false);

    const handleGetStarted = () => {
        navigate('/signup');
    };

    const handleSignIn = () => {
        navigate('/login');
    };

    const handleLoginSubmit = (e) => {
        e.preventDefault();
        // Handle login logic here
        setShowLoginModal(false);
        navigate('/');
    };

    const handleSignupSubmit = (e) => {
        e.preventDefault();
        // Handle signup logic here
        setShowSignupModal(false);
        navigate('/');
    };

    return (
        <div className="landing-page">
            {/* Navigation Header */}
            <nav className="landing-nav">
                <div className="nav-container">
                    <div className="nav-logo">
                        <img src="https://amzur.com/wp-content/uploads/2022/07/Amzur-logo-2022-white.png" alt="Amzur Technologies" />

                    </div>
                    <div className="nav-links">
                        <a href="#features">Features</a>
                        <a href="#solutions">Solutions</a>
                        <a href="#pricing">Pricing</a>
                        <a href="#integrations">Integrations</a>
                    </div>
                    <div className="nav-actions">
                        <button className="btn-nav-signin" onClick={handleSignIn}>
                            <span className="nav-icon">👤</span>
                            Sign In
                        </button>
                        <button className="btn-nav-signup" onClick={handleGetStarted}>
                            <span className="nav-icon">🚀</span>
                            Sign Up
                        </button>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="hero-section">
                <div className="hero-container">
                    <div className="hero-content">
                        <div className="hero-badge">
                            🚀 AI-Powered Testing Revolution
                        </div>
                        <h1 className="hero-title">
                            Transform Your Testing with <span className="title-highlight">AI Test Master</span>
                        </h1>
                        <p className="hero-subtitle">
                            The ultimate AI-powered testing platform that automates your entire testing
                            lifecycle. Generate self-healing test scripts, validate builds across environments,
                            and deliver flawless software with zero manual intervention.
                        </p>
                        <div className="hero-actions">
                            <button className="btn-primary-large" onClick={handleGetStarted}>
                                <span className="btn-icon">🛡️</span>
                                Get Started
                            </button>
                        </div>
                        <div className="hero-stats">
                            <div className="stat-item">
                                <span className="stat-icon">✅</span>
                                <span className="stat-text">99.9% Uptime Guarantee</span>
                            </div>
                            <div className="stat-item">
                                <span className="stat-icon">⚡</span>
                                <span className="stat-text">10,000+ Tests Per Day</span>
                            </div>
                            <div className="stat-item">
                                <span className="stat-icon">📈</span>
                                <span className="stat-text">85% Time Saved</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Dashboard Preview Section */}
            <section id="dashboard" className="dashboard-section">
                <div className="section-container">
                    <h2 className="section-title">Powerful Dashboard Interface</h2>
                    <p className="section-subtitle">
                        Get instant insights with our intuitive dashboard that adapts to your role and priorities.
                    </p>
                    <div className="dashboard-preview">
                        <div className="dashboard-card">
                            <div className="dashboard-stats">
                                <div className="stat-box">
                                    <span className="stat-number">1,247</span>
                                    <span className="stat-label">Tests Passed</span>
                                    <span className="stat-change positive">+12%</span>
                                </div>
                                <div className="stat-box">
                                    <span className="stat-number">23</span>
                                    <span className="stat-label">Tests Failed</span>
                                    <span className="stat-change negative">-5%</span>
                                </div>
                                <div className="stat-box">
                                    <span className="stat-number">8</span>
                                    <span className="stat-label">Running</span>
                                </div>
                                <div className="stat-box">
                                    <span className="stat-number">94%</span>
                                    <span className="stat-label">Coverage</span>
                                    <span className="stat-change positive">+2.1%</span>
                                </div>
                            </div>
                            <div className="chart-placeholder">
                                <h4>Test Execution Trends</h4>
                                <div className="chart-area">Chart Placeholder</div>
                            </div>
                            <div className="recent-tests">
                                <h4>Recent Test Runs</h4>
                                <div className="test-item">
                                    <span>Login Flow Tests</span>
                                    <span className="status passed">Passed</span>
                                </div>
                                <div className="test-item">
                                    <span>API Integration</span>
                                    <span className="status passed">Passed</span>
                                </div>
                                <div className="test-item">
                                    <span>Payment Gateway</span>
                                    <span className="status failed">Failed</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Test Management Section */}
            <section className="test-management-section">
                <div className="section-container">
                    <h2 className="section-title">Complete Test Management</h2>
                    <p className="section-subtitle">
                        Organize, execute, and monitor all your tests from a single, powerful interface.
                    </p>
                    <div className="test-suite-preview">
                        <div className="suite-header">
                            <h3>Test Suite Management</h3>
                            <div className="suite-actions">
                                <button className="btn-run-tests">Run Tests</button>
                                <button className="btn-filter">Filter</button>
                            </div>
                        </div>
                        <div className="test-suites">
                            <div className="suite-item">
                                <h4>User Authentication Tests</h4>
                                <p>15 test cases • 2 hours ago</p>
                                <span className="status passed">Passed</span>
                            </div>
                            <div className="suite-item">
                                <h4>Payment Processing Tests</h4>
                                <p>8 test cases • 30 minutes ago</p>
                                <span className="status failed">Failed</span>
                            </div>
                            <div className="suite-item">
                                <h4>API Integration Tests</h4>
                                <p>22 test cases • Currently running</p>
                                <span className="status running">Running</span>
                            </div>
                            <div className="suite-item">
                                <h4>Scheduled Regression Tests</h4>
                                <p>45 test cases • Next run: Tonight at 2:00 AM</p>
                                <span className="status scheduled">Scheduled</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section id="features" className="features-section">
                <div className="section-container">
                    <h2 className="section-title">Powerful Features for Modern Testing</h2>
                    <p className="section-subtitle">
                        From AI-powered automation to comprehensive reporting, every feature is designed
                        to make your testing process faster, smarter, and more reliable.
                    </p>
                    <div className="features-grid">
                        <div className="feature-card">
                            <div className="feature-icon">🤖</div>
                            <h3>AI Test Generation</h3>
                            <p>Automatically generate comprehensive test scripts from user interactions and application behavior.</p>
                            <ul>
                                <li>Self-healing scripts</li>
                                <li>Multi-language support</li>
                                <li>Pattern recognition</li>
                            </ul>
                        </div>
                        <div className="feature-card">
                            <div className="feature-icon">🔧</div>
                            <h3>Build Integrity Check</h3>
                            <p>Validate builds across multiple environments with automated smoke and sanity testing.</p>
                            <ul>
                                <li>Multi-environment support</li>
                                <li>CRUD operations</li>
                                <li>Instant validation</li>
                            </ul>
                        </div>
                        <div className="feature-card">
                            <div className="feature-icon">👥</div>
                            <h3>Role-Based Dashboards</h3>
                            <p>Customized insights for QA Engineers, Developers, and Clients with relevant metrics.</p>
                            <ul>
                                <li>Personalized metrics</li>
                                <li>Real-time updates</li>
                                <li>Trend analysis</li>
                            </ul>
                        </div>
                        <div className="feature-card">
                            <div className="feature-icon">🔄</div>
                            <h3>CI/CD Integration</h3>
                            <p>Seamlessly integrate with Jenkins, GitLab CI, GitHub Actions, and more.</p>
                            <ul>
                                <li>Pipeline automation</li>
                                <li>Build triggering</li>
                                <li>Status monitoring</li>
                            </ul>
                        </div>
                        <div className="feature-card">
                            <div className="feature-icon">📹</div>
                            <h3>Smart Test Recording</h3>
                            <p>Record user interactions and automatically capture screenshots for comprehensive test documentation.</p>
                            <ul>
                                <li>Auto-capture</li>
                                <li>Playback capability</li>
                                <li>Screenshot comparison</li>
                            </ul>
                        </div>
                        <div className="feature-card">
                            <div className="feature-icon">📊</div>
                            <h3>Advanced Reporting</h3>
                            <p>Generate detailed reports with visual analytics and export in multiple formats.</p>
                            <ul>
                                <li>Visual charts</li>
                                <li>Multiple formats</li>
                                <li>Historical trends</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* Roles Section */}
            <section id="solutions" className="roles-section">
                <div className="section-container">
                    <h2 className="section-title">Built for Every Role</h2>
                    <p className="section-subtitle">
                        Whether you're a QA Engineer, Developer, or Client, AI Test Master provides
                        tailored experiences that match your specific needs and workflows.
                    </p>
                    <div className="roles-grid">
                        <div className="role-card">
                            <div className="role-icon">🧪</div>
                            <h3>QA Engineers</h3>
                            <p>Comprehensive testing suite with advanced automation capabilities</p>
                            <ul>
                                <li>Unit, API, UI & Regression Testing</li>
                                <li>Test Execution Metrics & Trends</li>
                                <li>Bug Tracking & Resolution</li>
                                <li>Test Data Management</li>
                            </ul>
                        </div>
                        <div className="role-card">
                            <div className="role-icon">💻</div>
                            <h3>Developers</h3>
                            <p>Developer-focused tools for code quality and integration testing</p>
                            <ul>
                                <li>Code Coverage & Quality Metrics</li>
                                <li>Integration Test Results</li>
                                <li>CRUD Operations & Test Logs</li>
                                <li>Performance Monitoring</li>
                            </ul>
                        </div>
                        <div className="role-card">
                            <div className="role-icon">📈</div>
                            <h3>Clients</h3>
                            <p>Business-friendly insights and project health overview</p>
                            <ul>
                                <li>End-to-End Test Results</li>
                                <li>Acceptance Criteria Fulfillment</li>
                                <li>Release Readiness Status</li>
                                <li>Executive Summary Reports</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* Pricing Section */}
            <section id="pricing" className="pricing-section">
                <div className="section-container">
                    <h2 className="section-title">Choose Your Testing Plan</h2>
                    <p className="section-subtitle">
                        Start with our free trial and scale as your testing needs grow. No hidden fees, cancel anytime.
                    </p>
                    <div className="pricing-grid">
                        <div className="pricing-card">
                            <h3>Starter</h3>
                            <div className="price">$29<span>/month</span></div>
                            <p>Perfect for small teams getting started with AI testing</p>
                            <ul>
                                <li>Up to 1,000 test executions/month</li>
                                <li>Basic AI test generation</li>
                                <li>Email support</li>
                                <li>Web dashboard access</li>
                                <li>Basic reporting</li>
                                <li>2 team members</li>
                            </ul>
                            <button className="btn-pricing">Get Started</button>
                        </div>
                        <div className="pricing-card popular">
                            <div className="popular-badge">Most Popular</div>
                            <h3>Professional</h3>
                            <div className="price">$99<span>/month</span></div>
                            <p>Advanced testing capabilities for growing teams</p>
                            <ul>
                                <li>Up to 10,000 test executions/month</li>
                                <li>Advanced AI test generation</li>
                                <li>Self-healing test scripts</li>
                                <li>Priority support</li>
                                <li>Advanced analytics</li>
                                <li>API integrations</li>
                                <li>10 team members</li>
                                <li>Custom test environments</li>
                            </ul>
                            <button className="btn-pricing">Get Started</button>
                        </div>
                        <div className="pricing-card">
                            <h3>Enterprise</h3>
                            <div className="price">$299<span>/month</span></div>
                            <p>Complete testing solution for large organizations</p>
                            <ul>
                                <li>Unlimited test executions</li>
                                <li>Full AI testing suite</li>
                                <li>Custom integrations</li>
                                <li>24/7 dedicated support</li>
                                <li>Advanced security features</li>
                                <li>Custom reporting</li>
                                <li>Unlimited team members</li>
                                <li>On-premise deployment</li>
                                <li>SLA guarantees</li>
                            </ul>
                            <button className="btn-pricing">Get Started</button>
                        </div>
                    </div>
                    <div className="pricing-footer">
                        <p>All plans include 14-day free trial • No credit card required</p>
                        <div className="guarantee-badges">
                            <span>99.9% Uptime SLA</span>
                            <span>24/7 Support</span>
                            <span>Cancel Anytime</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* Integrations Section */}
            <section id="integrations" className="integrations-section">
                <div className="section-container">
                    <h2 className="section-title">Seamless Integrations</h2>
                    <p className="section-subtitle">
                        Connect with your existing tools and workflows. AI Test Master integrates with
                        popular platforms to fit perfectly into your development ecosystem.
                    </p>
                    <div className="integrations-grid">
                        <div className="integration-card">
                            <div className="integration-icon">🐙</div>
                            <h3>GitHub</h3>
                            <p>Version control and CI/CD</p>
                        </div>
                        <div className="integration-card">
                            <div className="integration-icon">🏗️</div>
                            <h3>Jenkins</h3>
                            <p>Build automation</p>
                        </div>
                        <div className="integration-card">
                            <div className="integration-icon">🌐</div>
                            <h3>Selenium</h3>
                            <p>Web testing framework</p>
                        </div>
                        <div className="integration-card">
                            <div className="integration-icon">📝</div>
                            <h3>JIRA</h3>
                            <p>Issue tracking</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="cta-section">
                <div className="section-container">
                    <h2 className="cta-title">Ready to Transform Your Testing?</h2>
                    <p className="cta-subtitle">
                        Join thousands of teams who have revolutionized their testing process with AI Test Master.
                        Start your free trial today and experience the future of automated testing.
                    </p>
                    <button className="btn-cta" onClick={handleGetStarted}>
                        Get Started
                    </button>
                    <p className="cta-note">No credit card required • 14-day free trial • Cancel anytime</p>
                </div>
            </section>

            {/* Footer */}
            <footer className="landing-footer">
                <div className="footer-container">
                    <div className="footer-content">
                        <div className="footer-brand">
                            <img src="https://amzur.com/wp-content/uploads/2022/07/Amzur-logo-2022-white.png" alt="Amzur Logo" />
                            <p>Revolutionizing testing with artificial intelligence</p>
                        </div>
                        <div className="footer-links">
                            <div className="footer-section">
                                <h4>Product</h4>
                                <a href="#features">Features</a>
                                <a href="#solutions">Solutions</a>
                                <a href="#pricing">Pricing</a>
                                <a href="#integrations">Integrations</a>
                            </div>
                            <div className="footer-section">
                                <h4>Company</h4>
                                <a href="#about">About</a>
                                <a href="#careers">Careers</a>
                                <a href="#contact">Contact</a>
                                <a href="#blog">Blog</a>
                            </div>
                            <div className="footer-section">
                                <h4>Support</h4>
                                <a href="#help">Help Center</a>
                                <a href="#docs">Documentation</a>
                                <a href="#api">API Reference</a>
                                <a href="#status">Status</a>
                            </div>
                        </div>
                    </div>
                    <div className="footer-bottom">
                        <p>© 2025 Amzur Technologies, Inc. All Rights Reserved.</p>
                        <p>Built with React and powered by AI</p>
                    </div>
                </div>
            </footer>

            {/* Login Modal */}
            {showLoginModal && (
                <div className="modal-overlay" onClick={() => setShowLoginModal(false)}>
                    <div className="auth-modal" onClick={(e) => e.stopPropagation()}>
                        <button className="modal-close" onClick={() => setShowLoginModal(false)}>×</button>
                        <div className="auth-header">
                            <h2>Welcome Back</h2>
                            <p>Sign in to your AI Test Master account</p>
                        </div>
                        <form onSubmit={handleLoginSubmit} className="auth-form">
                            <div className="form-group">
                                <label>Email Address</label>
                                <input type="email" required placeholder="Enter your email" />
                            </div>
                            <div className="form-group">
                                <label>Password</label>
                                <input type="password" required placeholder="Enter your password" />
                            </div>
                            <div className="form-options">
                                <label className="checkbox-label">
                                    <input type="checkbox" />
                                    <span>Remember me</span>
                                </label>
                                <a href="#forgot" className="forgot-link">Forgot password?</a>
                            </div>
                            <button type="submit" className="btn-auth">Sign In</button>
                        </form>
                        <div className="auth-footer">
                            <p>Don't have an account?
                                <button onClick={() => {
                                    setShowLoginModal(false);
                                    setShowSignupModal(true);
                                }} className="link-button">Sign up</button>
                            </p>
                        </div>
                    </div>
                </div>
            )}

            {/* Signup Modal */}
            {showSignupModal && (
                <div className="modal-overlay" onClick={() => setShowSignupModal(false)}>
                    <div className="auth-modal" onClick={(e) => e.stopPropagation()}>
                        <button className="modal-close" onClick={() => setShowSignupModal(false)}>×</button>
                        <div className="auth-header">
                            <h2>Get Started</h2>
                            <p>Create your AI Test Master account</p>
                        </div>
                        <form onSubmit={handleSignupSubmit} className="auth-form">
                            <div className="form-row">
                                <div className="form-group">
                                    <label>First Name</label>
                                    <input type="text" required placeholder="First name" />
                                </div>
                                <div className="form-group">
                                    <label>Last Name</label>
                                    <input type="text" required placeholder="Last name" />
                                </div>
                            </div>
                            <div className="form-group">
                                <label>Email Address</label>
                                <input type="email" required placeholder="Enter your email" />
                            </div>
                            <div className="form-group">
                                <label>Company</label>
                                <input type="text" required placeholder="Company name" />
                            </div>
                            <div className="form-group">
                                <label>Password</label>
                                <input type="password" required placeholder="Create a password" />
                            </div>
                            <div className="form-group">
                                <label className="checkbox-label">
                                    <input type="checkbox" required />
                                    <span>I agree to the <a href="#terms">Terms of Service</a> and <a href="#privacy">Privacy Policy</a></span>
                                </label>
                            </div>
                            <button type="submit" className="btn-auth">Start Free Trial</button>
                        </form>
                        <div className="auth-footer">
                            <p>Already have an account?
                                <button onClick={() => {
                                    setShowSignupModal(false);
                                    setShowLoginModal(true);
                                }} className="link-button">Sign in</button>
                            </p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default LandingPage;
