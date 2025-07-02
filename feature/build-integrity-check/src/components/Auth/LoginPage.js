import React, { useState, useEffect } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import AuthService from '../../services/authService';
import './Auth.css';

const LoginPage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        rememberMe: false
    });
    const [loading, setLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const [errors, setErrors] = useState({});

    useEffect(() => {
        // Check if redirected from signup with success message
        if (location.state?.message) {
            setSuccessMessage(location.state.message);
            // Pre-fill email if available
            if (location.state.userInfo?.email) {
                setFormData(prev => ({
                    ...prev,
                    email: location.state.userInfo.email
                }));
            }
        }
    }, [location.state]);

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));

        // Clear specific error when user starts typing
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setErrors({});

        try {
            // Validate login credentials using AuthService
            const validation = AuthService.validateLogin(formData.email, formData.password);
            
            if (!validation.isValid) {
                if (validation.field) {
                    setErrors({ [validation.field]: validation.error });
                } else {
                    setErrors({ general: validation.error });
                }
                setLoading(false);
                return;
            }

            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1000));

            // Create login session using AuthService
            AuthService.createLoginSession(validation.user);

            // Navigate to dashboard after successful login
            navigate('/dashboard', { replace: true });
        } catch (error) {
            console.error('Login failed:', error);
            setErrors({ general: 'Login failed. Please try again.' });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-page login-page">
            <div className="login-container">
                <div className="login-left">
                    <div className="login-form-container">
                        <div className="login-header">
                            <h1>Welcome Back</h1>
                            <p>Sign in to your AI Test Master account</p>
                        </div>

                        {successMessage && (
                            <div className="success-message">
                                {successMessage}
                            </div>
                        )}

                        {errors.general && (
                            <div className="error-message">
                                {errors.general}
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="login-form">
                            <div className="form-group">
                                <label htmlFor="email">Email Address</label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    required
                                    placeholder="Enter your email"
                                    autoComplete="email"
                                    className={errors.email ? 'error' : ''}
                                />
                                {errors.email && (
                                    <span className="field-error">{errors.email}</span>
                                )}
                            </div>

                            <div className="form-group">
                                <label htmlFor="password">Password</label>
                                <div className="password-input-container">
                                    <input
                                        type="password"
                                        id="password"
                                        name="password"
                                        value={formData.password}
                                        onChange={handleInputChange}
                                        required
                                        placeholder="Enter password"
                                        autoComplete="current-password"
                                        className={errors.password ? 'error' : ''}
                                    />
                                    <button type="button" className="password-toggle">
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                                            <circle cx="12" cy="12" r="3" />
                                        </svg>
                                    </button>
                                </div>
                                {errors.password && (
                                    <span className="field-error">{errors.password}</span>
                                )}
                            </div>

                            <div className="form-options">
                                <label className="checkbox-label">
                                    <input
                                        type="checkbox"
                                        name="rememberMe"
                                        checked={formData.rememberMe}
                                        onChange={handleInputChange}
                                    />
                                    <span className="checkmark"></span>
                                    Remember me
                                </label>
                                <Link to="/forgot-password" className="forgot-link">
                                    Forgot password?
                                </Link>
                            </div>

                            <button type="submit" className="btn-signin" disabled={loading}>
                                {loading ? (
                                    <>
                                        <span className="spinner"></span>
                                        Signing in...
                                    </>
                                ) : (
                                    'Sign In'
                                )}
                            </button>
                        </form>

                        <div className="auth-footer">
                            <p>
                                Don't have an account?{' '}
                                <Link to="/signup" className="auth-link">
                                    Sign Up
                                </Link>
                            </p>
                        </div>

                        <div className="back-to-home">
                            <Link to="/landing" className="back-link">
                                ← Back to Home
                            </Link>
                        </div>
                    </div>
                </div>

                <div className="login-right">
                    <div className="analytics-section">
                        <div className="analytics-icon">
                            <svg width="80" height="80" viewBox="0 0 24 24" fill="none">
                                <rect x="3" y="3" width="18" height="18" rx="2" fill="rgba(255,255,255,0.1)" stroke="rgba(255,255,255,0.3)" strokeWidth="1" />
                                <path d="M8 12L12 8L16 12" stroke="white" strokeWidth="2" fill="none" />
                                <rect x="7" y="14" width="2" height="4" fill="white" opacity="0.7" />
                                <rect x="11" y="12" width="2" height="6" fill="white" opacity="0.8" />
                                <rect x="15" y="10" width="2" height="8" fill="white" />
                            </svg>
                        </div>

                        <h2>Powerful Analytics</h2>
                        <p>Access comprehensive testing insights, real-time metrics, and intelligent recommendations to optimize your workflow.</p>

                        <ul className="analytics-features">
                            <li>
                                <span className="feature-bullet">•</span>
                                Real-time test execution monitoring
                            </li>
                            <li>
                                <span className="feature-bullet">•</span>
                                Detailed performance metrics
                            </li>
                            <li>
                                <span className="feature-bullet">•</span>
                                Customizable reporting dashboards
                            </li>
                            <li>
                                <span className="feature-bullet">•</span>
                                Team collaboration insights
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
