import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import AuthService from '../../services/authService';
import './Auth.css';

const SignupPage = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        company: '',
        password: '',
        agreeToTerms: false
    });
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});

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

    const validateForm = () => {
        const newErrors = {};

        if (!formData.fullName.trim()) {
            newErrors.fullName = 'Full name is required';
        }

        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Email is invalid';
        }

        if (!formData.password) {
            newErrors.password = 'Password is required';
        } else if (formData.password.length < 6) {
            newErrors.password = 'Password must be at least 6 characters long';
        }

        if (!formData.agreeToTerms) {
            newErrors.agreeToTerms = 'You must agree to the terms and conditions';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        setLoading(true);

        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1500));

            // Store user credentials using AuthService
            AuthService.storeUserCredentials(formData);

            // Store user info for login page
            const userInfo = {
                firstName: formData.fullName.split(' ')[0] || formData.fullName,
                lastName: formData.fullName.split(' ').slice(1).join(' ') || '',
                email: formData.email,
                company: formData.company
            };

            // Redirect to login after successful signup
            navigate('/login', {
                state: {
                    userInfo,
                    message: 'Account created successfully! Please sign in with your credentials.'
                }
            });
        } catch (error) {
            console.error('Signup failed:', error);
            setErrors({ general: 'Signup failed. Please try again.' });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-page signup-page">
            <div className="signup-container">
                <div className="signup-left">
                    <div className="signup-form-container">
                        <div className="signup-header">
                            <h1>Create Account</h1>
                            <p>Join AI Test Master and transform your testing experience</p>
                        </div>

                        {errors.general && (
                            <div className="error-message general-error">
                                {errors.general}
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="signup-form">
                            <div className="form-group">
                                <label htmlFor="fullName">Full Name</label>
                                <input
                                    type="text"
                                    id="fullName"
                                    name="fullName"
                                    value={formData.fullName}
                                    onChange={handleInputChange}
                                    placeholder="Enter your full name"
                                    className={errors.fullName ? 'error' : ''}
                                    autoComplete="name"
                                />
                                {errors.fullName && <span className="error-message">{errors.fullName}</span>}
                            </div>

                            <div className="form-group">
                                <label htmlFor="email">Email Address</label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    placeholder="Enter your email"
                                    className={errors.email ? 'error' : ''}
                                    autoComplete="email"
                                />
                                {errors.email && <span className="error-message">{errors.email}</span>}
                            </div>

                            <div className="form-group">
                                <label htmlFor="company">Company <span className="optional">(Optional)</span></label>
                                <input
                                    type="text"
                                    id="company"
                                    name="company"
                                    value={formData.company}
                                    onChange={handleInputChange}
                                    placeholder="Enter your company name"
                                    className={errors.company ? 'error' : ''}
                                    autoComplete="organization"
                                />
                                {errors.company && <span className="error-message">{errors.company}</span>}
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
                                        placeholder="Create a password"
                                        className={errors.password ? 'error' : ''}
                                        autoComplete="new-password"
                                    />
                                    <button type="button" className="password-toggle">
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                                            <circle cx="12" cy="12" r="3" />
                                        </svg>
                                    </button>
                                </div>
                                {errors.password && <span className="error-message">{errors.password}</span>}
                                <div className="password-hint">Password must be at least 6 characters long</div>
                            </div>

                            <div className="form-group">
                                <label className={`checkbox-label ${errors.agreeToTerms ? 'error' : ''}`}>
                                    <input
                                        type="checkbox"
                                        name="agreeToTerms"
                                        checked={formData.agreeToTerms}
                                        onChange={handleInputChange}
                                    />
                                    <span className="checkmark"></span>
                                    I agree to the{' '}
                                    <Link to="/terms" target="_blank" className="inline-link">
                                        Terms of Service
                                    </Link>{' '}
                                    and{' '}
                                    <Link to="/privacy" target="_blank" className="inline-link">
                                        Privacy Policy
                                    </Link>
                                </label>
                                {errors.agreeToTerms && <span className="error-message">{errors.agreeToTerms}</span>}
                            </div>

                            <button type="submit" className="btn-signup" disabled={loading}>
                                {loading ? (
                                    <>
                                        <span className="spinner"></span>
                                        Creating Account...
                                    </>
                                ) : (
                                    'Create Account'
                                )}
                            </button>
                        </form>

                        <div className="auth-footer">
                            <p>
                                Already have an account?{' '}
                                <Link to="/login" className="auth-link">
                                    Sign In
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

                <div className="signup-right">
                    <div className="ai-testing-section">
                        <div className="ai-testing-icon">
                            <svg width="80" height="80" viewBox="0 0 24 24" fill="none">
                                <rect x="3" y="3" width="18" height="18" rx="2" fill="rgba(255,255,255,0.1)" stroke="rgba(255,255,255,0.3)" strokeWidth="1" />
                                <circle cx="12" cy="12" r="3" fill="white" opacity="0.8" />
                                <path d="M12 8L16 12L12 16L8 12Z" fill="white" opacity="0.6" />
                                <circle cx="7" cy="7" r="1" fill="white" opacity="0.7" />
                                <circle cx="17" cy="7" r="1" fill="white" opacity="0.7" />
                                <circle cx="7" cy="17" r="1" fill="white" opacity="0.7" />
                                <circle cx="17" cy="17" r="1" fill="white" opacity="0.7" />
                            </svg>
                        </div>

                        <h2>AI-Powered Testing</h2>
                        <p>Transform your testing workflow with intelligent automation, smart test generation, and advanced analytics.</p>

                        <ul className="ai-testing-features">
                            <li>
                                <span className="feature-bullet">•</span>
                                Automated test case generation
                            </li>
                            <li>
                                <span className="feature-bullet">•</span>
                                Smart bug detection and reporting
                            </li>
                            <li>
                                <span className="feature-bullet">•</span>
                                Real-time collaboration tools
                            </li>
                            <li>
                                <span className="feature-bullet">•</span>
                                Comprehensive analytics dashboard
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignupPage;
