import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './BuildIntegrityForm.css';

const BuildIntegrityForm = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        sdlcModel: '',
        sdlcDocuments: '',
        buildVersion: '',
        gitVersion: '',
        projectManagement: '',
        environment: '',
        applicationUrl: '',
        testObjective: ''
    });

    const [showSdlcDropdown, setShowSdlcDropdown] = useState(true);
    const [charCount, setCharCount] = useState(0);
    const [uploadedFile, setUploadedFile] = useState(null);
    const [isResetting, setIsResetting] = useState(false);
    const [errors, setErrors] = useState({});
    const [touched, setTouched] = useState({});
    const [showValidationModal, setShowValidationModal] = useState(false);
    const [showDocumentsModal, setShowDocumentsModal] = useState(false);
    const [showDocumentDetailModal, setShowDocumentDetailModal] = useState(false);
    const [selectedDocument, setSelectedDocument] = useState(null);
    const [showValidationFailedModal, setShowValidationFailedModal] = useState(false);
    const [showFailureReportModal, setShowFailureReportModal] = useState(false);
    const [showRecommendedTestingModal, setShowRecommendedTestingModal] = useState(false);
    const [selectedTestingTypes, setSelectedTestingTypes] = useState([]);

    const handleBackToDashboard = () => {
        navigate('/');
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));

        // Clear error when user starts typing
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }

        if (name === 'testObjective') {
            setCharCount(value.length);
        }
    };

    const handleBlur = (e) => {
        const { name } = e.target;
        setTouched(prev => ({
            ...prev,
            [name]: true
        }));
    };

    const handleSdlcSelect = (value, text) => {
        setFormData(prev => ({
            ...prev,
            sdlcModel: value
        }));
        setTouched(prev => ({
            ...prev,
            sdlcModel: true
        }));
        setShowSdlcDropdown(false);
    };

    const handleReset = () => {
        setIsResetting(true);

        setFormData({
            sdlcModel: '',
            sdlcDocuments: '',
            buildVersion: '',
            gitVersion: '',
            projectManagement: '',
            environment: '',
            applicationUrl: '',
            testObjective: ''
        });
        setCharCount(0);
        setUploadedFile(null);
        setShowSdlcDropdown(false);
        setErrors({});
        setTouched({});

        // Reset the file input
        const fileInput = document.getElementById('documentFile');
        if (fileInput) {
            fileInput.value = '';
        }

        console.log('Form has been reset');

        // Reset button feedback
        setTimeout(() => {
            setIsResetting(false);
        }, 1000);
    };

    const handleFileUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            setUploadedFile(file);

            // Clear any existing error for sdlcDocuments when a file is uploaded
            if (errors.sdlcDocuments) {
                setErrors(prev => ({
                    ...prev,
                    sdlcDocuments: ''
                }));
            }

            console.log('File uploaded:', {
                name: file.name,
                size: `${(file.size / 1024 / 1024).toFixed(2)} MB`,
                type: file.type || 'Unknown type',
                lastModified: new Date(file.lastModified).toLocaleDateString()
            });
        }
    };

    const handleRemoveFile = () => {
        setUploadedFile(null);

        // Clear the file input
        const fileInput = document.getElementById('documentFile');
        if (fileInput) {
            fileInput.value = '';
        }

        // If no document type is selected and file is removed, show validation error if field was touched
        if (!formData.sdlcDocuments && touched.sdlcDocuments) {
            setErrors(prev => ({
                ...prev,
                sdlcDocuments: 'SDLC Documents selection or file upload is required'
            }));
        }
    };

    const validateForm = () => {
        const newErrors = {};

        if (!formData.sdlcModel) newErrors.sdlcModel = 'SDLC Model is required';

        // For SDLC Documents, require either dropdown selection OR uploaded file
        if (!formData.sdlcDocuments && !uploadedFile) {
            newErrors.sdlcDocuments = 'SDLC Documents selection or file upload is required';
        }

        if (!formData.buildVersion) newErrors.buildVersion = 'Build Version is required';
        if (!formData.projectManagement) newErrors.projectManagement = 'Project Management System is required';
        if (!formData.environment) newErrors.environment = 'Environment is required';
        if (!formData.applicationUrl) newErrors.applicationUrl = 'Application URL is required';
        if (!formData.testObjective) newErrors.testObjective = 'Test Objective is required';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleValidityCheck = () => {
        // Mark all required fields as touched
        const allTouched = {
            sdlcModel: true,
            sdlcDocuments: true,
            buildVersion: true,
            projectManagement: true,
            environment: true,
            applicationUrl: true,
            testObjective: true
        };
        setTouched(allTouched);

        if (validateForm()) {
            // All required fields are filled correctly, proceed with success
            console.log('Performing validity check...', formData);
            setShowValidationModal(true);
        } else {
            // Show validation failed modal for form validation errors
            setShowValidationFailedModal(true);
        }
    };

    const handleProceedToTesting = () => {
        if (validateForm()) {
            console.log('Proceeding to testing...', formData);
            alert('Proceeding to testing phase...');
        } else {
            alert('Please fill in all required fields marked with *');
        }
    };

    const handleViewDocuments = () => {
        console.log('Viewing documents...', uploadedFile);
        setShowValidationModal(false);
        setShowDocumentsModal(true);
    };

    const handleContinue = () => {
        console.log('Continuing with validation results...', formData);
        setShowValidationModal(false);
        alert('Continuing to next step...');
    };

    const handleCloseModal = () => {
        setShowValidationModal(false);
    };

    const handleCloseValidationFailedModal = () => {
        setShowValidationFailedModal(false);
    };

    const handleViewFailureReport = () => {
        setShowValidationFailedModal(false);
        setShowFailureReportModal(true);
    };

    const handleCloseFailureReport = () => {
        setShowFailureReportModal(false);
    };

    const handleCloseDocumentsModal = () => {
        setShowDocumentsModal(false);
    };

    const handleBackToValidation = () => {
        setShowDocumentsModal(false);
        setShowValidationModal(true);
    };

    const handleRecommendedTesting = () => {
        console.log('Starting recommended testing...');
        setShowDocumentsModal(false);
        setShowRecommendedTestingModal(true);
    };

    const handleDocumentDownload = (document, event) => {
        event.stopPropagation(); // Prevent triggering the document click

        if (document.downloadUrl) {
            const link = document.createElement('a');
            link.href = document.downloadUrl;
            link.download = document.fileName || document.title;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            console.log('Downloading document:', document.title);
        } else {
            alert('Download not available for this document');
        }
    };

    const handleDocumentClick = (document) => {
        console.log('Opening document:', document.title);

        if (document.url) {
            // If document has a URL, open it in a new tab
            window.open(document.url, '_blank');
        } else if (document.downloadUrl) {
            // If document has a download URL, trigger download
            const link = document.createElement('a');
            link.href = document.downloadUrl;
            link.download = document.fileName || document.title;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        } else {
            // Fallback for documents without URLs
            alert(`Opening ${document.title}...`);
        }
    };

    const handleDocumentArrowClick = (document, event) => {
        event.stopPropagation(); // Prevent triggering the document click
        setSelectedDocument(document);
        setShowDocumentDetailModal(true);
    };

    const handleCloseDocumentDetail = () => {
        setShowDocumentDetailModal(false);
        setSelectedDocument(null);
    };

    const handleBackToDocumentsList = () => {
        setShowDocumentDetailModal(false);
        setSelectedDocument(null);
    };

    const handleViewSelectedDocument = () => {
        if (selectedDocument) {
            handleDocumentClick(selectedDocument);
        }
    };

    const handleDownloadSelectedDocument = () => {
        if (selectedDocument) {
            handleDocumentDownload(selectedDocument, { stopPropagation: () => { } });
        }
    };

    const handleContinueToTestingTypes = () => {
        console.log('Recommended Testing...');
        setShowDocumentDetailModal(false);
        setShowRecommendedTestingModal(true);
    };

    const handleCloseRecommendedTesting = () => {
        setShowRecommendedTestingModal(false);
    };

    const handleBackToDocumentDetail = () => {
        setShowRecommendedTestingModal(false);
        setShowDocumentDetailModal(true);
    };

    const handleTestingTypeToggle = (testingType) => {
        setSelectedTestingTypes(prev => {
            if (prev.includes(testingType)) {
                return prev.filter(type => type !== testingType);
            } else {
                return [...prev, testingType];
            }
        });
    };

    const handleGoToAITestDashboard = () => {
        console.log('Navigating to AI Test Dashboard with selected testing types:', selectedTestingTypes);
        setShowRecommendedTestingModal(false);
        navigate('/');
    };

    const handleNextFromTestingTypes = () => {
        console.log('Proceeding with selected testing types:', selectedTestingTypes);
        setShowRecommendedTestingModal(false);
        navigate('/qa-engineer-dashboard');
    };

    // Sample documents data with actual document URLs - this would come from your backend API
    const testingDocuments = [
        {
            id: 1,
            title: 'Test Plan Document',
            description: 'Comprehensive testing guidelines and procedures',
            icon: '📄',
            url: 'https://example.com/documents/test-plan.pdf', // Direct view URL
            downloadUrl: 'https://api.example.com/documents/download/test-plan.pdf', // Download URL
            fileName: 'Project_TestStrategy_v1.5.pdf',
            fileSize: '1.8 MB',
            fileType: 'PDF',
            lastUpdated: 'March 15, 2025',
            createdBy: 'QA Lead',
            version: '1.5'
        },
        {
            id: 2,
            title: 'Test Strategy Document',
            description: 'High level approach and testing methodology',
            icon: '📄',
            url: 'https://example.com/documents/test-strategy.pdf',
            downloadUrl: 'https://api.example.com/documents/download/test-strategy.pdf',
            fileName: 'Test_Strategy_Document_v2.1.pdf',
            fileSize: '1.8 MB',
            fileType: 'PDF',
            lastUpdated: 'March 20, 2025',
            createdBy: 'Test Manager',
            version: '2.1'
        },
        {
            id: 3,
            title: 'Requirement Traceability Matrix',
            description: 'Mapping between requirements and test cases',
            icon: '📄',
            url: 'https://example.com/documents/rtm.xlsx',
            downloadUrl: 'https://api.example.com/documents/download/rtm.xlsx',
            fileName: 'RTM_Requirements_v3.0.xlsx',
            fileSize: '850 KB',
            fileType: 'Excel',
            lastUpdated: 'March 18, 2025',
            createdBy: 'Business Analyst',
            version: '3.0'
        }
    ];

    const sdlcOptions = [
        { value: 'sdlc', label: 'SDLC Model', selected: true },
        { value: 'waterfall', label: 'Waterfall' },
        { value: 'agile', label: 'Agile' },
        { value: 'devops', label: 'DevOps' },
        { value: 'spiral', label: 'Spiral' },
        { value: 'v-model', label: 'V-Model' }
    ];

    // Recommended testing types data
    const recommendedTestingTypes = [
        {
            id: 'user-acceptance',
            name: 'Unit Testing',
            description: 'Unit Testing Securising, Testing',
            recommended: true
        },
        {
            id: 'security',
            name: 'Sanity Testing',
            description: 'A sanity test is a quick check performed after receiving a new build to ensure that critical functionalities are working as expected.',
            recommended: false
        }
    ];

    return (
        <div className="build-integrity-form-container">
            {/* Header */}
            <div className="form-header">
                <button
                    className="back-button"
                    onClick={handleBackToDashboard}
                    title="Back to AI Test Dashboard"
                >
                    ← Back to Dashboard
                </button>
                <div className="form-header-icon">✓</div>
                <h1>Build Integrity Check</h1>
            </div>

            {/* Form Container */}
            <div className="form-content">
                <form onSubmit={(e) => e.preventDefault()}>
                    {/* SDLC Model */}
                    <div className="form-group">
                        <label htmlFor="sdlcModel">
                            SDLC Model <span className="required-icon">*</span>
                        </label>
                        {errors.sdlcModel && touched.sdlcModel && <div className="error-message">{errors.sdlcModel}</div>}
                        <div className="dropdown-container-custom">
                            <select
                                id="sdlcModel"
                                name="sdlcModel"
                                className={`form-control ${errors.sdlcModel && touched.sdlcModel ? 'error' : ''}`}
                                value={formData.sdlcModel}
                                onChange={handleInputChange}
                                onBlur={handleBlur}
                                onFocus={() => setShowSdlcDropdown(true)}
                            >
                                <option value="">Select SDLC Model</option>
                                <option value="waterfall">Waterfall</option>
                                <option value="agile">Agile</option>
                                <option value="devops">DevOps</option>
                                <option value="spiral">Spiral</option>
                                <option value="v-model">V-Model</option>
                            </select>

                            {showSdlcDropdown && (
                                <div className="custom-dropdown-menu">
                                    {sdlcOptions.map((option) => (
                                        <div
                                            key={option.value}
                                            className={`custom-dropdown-item ${option.selected ? 'selected' : ''}`}
                                            onClick={() => handleSdlcSelect(option.value, option.label)}
                                        >
                                            {option.label}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* SDLC Documents */}
                    <div className="form-group">
                        <label htmlFor="sdlcDocuments">
                            SDLC Documents <span className="required-icon">*</span>
                        </label>
                        {errors.sdlcDocuments && touched.sdlcDocuments && <div className="error-message">{errors.sdlcDocuments}</div>}
                        <div className="sdlc-documents-container">
                            <select
                                id="sdlcDocuments"
                                name="sdlcDocuments"
                                className={`form-control ${errors.sdlcDocuments && touched.sdlcDocuments ? 'error' : ''}`}
                                value={formData.sdlcDocuments}
                                onChange={handleInputChange}
                                onBlur={handleBlur}
                            >
                                <option value="">Select Document Type</option>
                                <option value="requirements">Requirements Document</option>
                                <option value="design">Design Document</option>
                                <option value="test-plan">Test Plan</option>
                                <option value="user-manual">User Manual</option>
                            </select>

                            <div className="file-upload-container">
                                <input
                                    type="file"
                                    id="documentFile"
                                    className="file-input"
                                    onChange={handleFileUpload}
                                />
                                <label htmlFor="documentFile" className="file-upload-btn">
                                    📁 Upload Document
                                </label>

                                {uploadedFile && (
                                    <div className="uploaded-file">
                                        <div className="file-info">
                                            <span className="file-name">📄 {uploadedFile.name}</span>
                                            <span className="file-details">
                                                {(uploadedFile.size / 1024 / 1024).toFixed(2)} MB
                                                {uploadedFile.type && ` • ${uploadedFile.type}`}
                                            </span>
                                        </div>
                                        <button
                                            type="button"
                                            className="remove-file-btn"
                                            onClick={handleRemoveFile}
                                            title="Remove file"
                                        >
                                            ✕
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Version Control Details */}
                    <div className="form-group">
                        <label>Version Control Details</label>

                        <div className="version-control-group">
                            <label htmlFor="buildVersion" className="sub-label">• Build Version No. <span className="required-icon">*</span></label>
                            {errors.buildVersion && touched.buildVersion && <div className="error-message">{errors.buildVersion}</div>}
                            <input
                                type="text"
                                id="buildVersion"
                                name="buildVersion"
                                className={`form-control text-input ${errors.buildVersion && touched.buildVersion ? 'error' : ''}`}
                                placeholder="Enter Build Version"
                                value={formData.buildVersion}
                                onChange={handleInputChange}
                                onBlur={handleBlur}
                            />
                        </div>

                        <div className="version-control-group">
                            <label htmlFor="gitVersion" className="sub-label">• GIT Version No.</label>
                            <input
                                type="text"
                                id="gitVersion"
                                name="gitVersion"
                                className="form-control text-input"
                                placeholder="Enter GIT Version"
                                value={formData.gitVersion}
                                onChange={handleInputChange}
                                onBlur={handleBlur}
                            />
                        </div>
                    </div>

                    {/* Project Management System */}
                    <div className="form-group">
                        <label htmlFor="projectManagement">
                            Project Management System <span className="required-icon">*</span>
                        </label>
                        {errors.projectManagement && touched.projectManagement && <div className="error-message">{errors.projectManagement}</div>}
                        <select
                            id="projectManagement"
                            name="projectManagement"
                            className={`form-control ${errors.projectManagement && touched.projectManagement ? 'error' : ''}`}
                            value={formData.projectManagement}
                            onChange={handleInputChange}
                            onBlur={handleBlur}
                        >
                            <option value="">Select Tracking System</option>
                            <option value="jira">JIRA</option>
                            <option value="azure-devops">Azure DevOps</option>
                            <option value="trello">Trello</option>
                            <option value="asana">Asana</option>
                        </select>
                    </div>

                    {/* Environment */}
                    <div className="form-group">
                        <label htmlFor="environment">
                            Environment <span className="required-icon">*</span>
                        </label>
                        {errors.environment && touched.environment && <div className="error-message">{errors.environment}</div>}
                        <select
                            id="environment"
                            name="environment"
                            className={`form-control ${errors.environment && touched.environment ? 'error' : ''}`}
                            value={formData.environment}
                            onChange={handleInputChange}
                            onBlur={handleBlur}
                        >
                            <option value="">Select Environment</option>
                            <option value="development">Development</option>
                            <option value="testing">Testing</option>
                            <option value="staging">Staging</option>
                            <option value="production">Production</option>
                        </select>
                    </div>

                    {/* Application URL */}
                    <div className="form-group">
                        <label htmlFor="applicationUrl">
                            Application URL <span className="required-icon">*</span>
                        </label>
                        {errors.applicationUrl && touched.applicationUrl && <div className="error-message">{errors.applicationUrl}</div>}
                        <input
                            type="url"
                            id="applicationUrl"
                            name="applicationUrl"
                            className={`form-control text-input ${errors.applicationUrl && touched.applicationUrl ? 'error' : ''}`}
                            placeholder="Enter Application URL"
                            value={formData.applicationUrl}
                            onChange={handleInputChange}
                            onBlur={handleBlur}
                        />
                    </div>

                    {/* Test Objective */}
                    <div className="form-group">
                        <label htmlFor="testObjective">
                            Test Objective <span className="required-icon">*</span>
                        </label>
                        {errors.testObjective && touched.testObjective && <div className="error-message">{errors.testObjective}</div>}
                        <textarea
                            id="testObjective"
                            name="testObjective"
                            className={`form-control textarea ${errors.testObjective && touched.testObjective ? 'error' : ''}`}
                            placeholder="Enter a summary of the build and any important notes..."
                            maxLength="5000"
                            value={formData.testObjective}
                            onChange={handleInputChange}
                            onBlur={handleBlur}
                        />
                        <div className="char-counter">
                            {charCount}/5000 characters
                        </div>
                    </div>

                    {/* Note Section */}
                    <div className="note-section">
                        <strong>Note:</strong> Build integrity check validates build stability and high level features mentioned in release notes or respective document.
                    </div>

                    {/* Action Buttons */}
                    <div className="button-group">
                        <button type="button" className="btn btn-primary" onClick={handleValidityCheck}>
                            Perform Validity Check
                        </button>
                        <button
                            type="button"
                            className={`btn btn-secondary ${isResetting ? 'resetting' : ''}`}
                            onClick={handleReset}
                            disabled={isResetting}
                        >
                            {isResetting ? '✓ Reset Complete' : 'Reset'}
                        </button>
                        <button type="button" className="btn btn-outline" onClick={handleProceedToTesting}>
                            Proceed to testing <span className="icon-arrow">→</span>
                        </button>
                    </div>
                </form>
            </div>

            {/* Click outside handler for dropdown */}
            {showSdlcDropdown && (
                <div
                    className="dropdown-backdrop"
                    onClick={() => setShowSdlcDropdown(false)}
                />
            )}

            {/* Validation Success Modal */}
            {showValidationModal && (
                <div className="modal-overlay" onClick={handleCloseModal}>
                    <div className="validation-modal" onClick={(e) => e.stopPropagation()}>
                        <button className="modal-close-btn" onClick={handleCloseModal}>
                            ✕
                        </button>

                        <div className="modal-content">
                            <div className="success-icon">
                                <div className="checkmark-circle">
                                    <span className="checkmark">✓</span>
                                </div>
                            </div>

                            <h2 className="modal-title">Validation Successful</h2>

                            <p className="modal-message">
                                Build integrity check has been completed successfully.
                            </p>

                            <div className="modal-buttons">
                                <button
                                    className="btn btn-primary modal-btn"
                                    onClick={handleViewDocuments}
                                >
                                    📄 View Documents
                                </button>
                                <button
                                    className="btn btn-outline modal-btn"
                                    onClick={handleContinue}
                                >
                                    Continue
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Validation Failed Modal */}
            {showValidationFailedModal && (
                <div className="modal-overlay" onClick={handleCloseValidationFailedModal}>
                    <div className="validation-failed-modal" onClick={(e) => e.stopPropagation()}>
                        <button className="modal-close-btn" onClick={handleCloseValidationFailedModal}>
                            ✕
                        </button>

                        <div className="modal-content">
                            <div className="error-icon">
                                <div className="error-circle">
                                    <span className="error-x">✕</span>
                                </div>
                            </div>

                            <h2 className="modal-title error-title">Build Verification Failed</h2>

                            <p className="modal-message modal-error-message">
                                The verification process could not be completed successfully. Please check your build settings and try again.
                            </p>

                            <div className="modal-buttons">
                                <button
                                    className="btn btn-outline modal-btn"
                                    onClick={handleViewFailureReport}
                                >
                                    View
                                </button>
                                <button
                                    className="btn btn-danger modal-btn"
                                    onClick={handleCloseValidationFailedModal}
                                >
                                    Close
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Testing Documents Modal */}
            {showDocumentsModal && (
                <div className="modal-overlay" onClick={handleCloseDocumentsModal}>
                    <div className="documents-modal" onClick={(e) => e.stopPropagation()}>
                        <div className="documents-modal-header">
                            <h2 className="documents-modal-title">Testing Documents</h2>
                            <button className="modal-close-btn" onClick={handleCloseDocumentsModal}>
                                ✕
                            </button>
                        </div>

                        <div className="documents-modal-content">
                            <p className="documents-subtitle">Select a document to view details.</p>

                            <div className="documents-list">
                                {testingDocuments.map((document) => (
                                    <div
                                        key={document.id}
                                        className="document-item"
                                        onClick={() => handleDocumentClick(document)}
                                    >
                                        <div className="document-icon">{document.icon}</div>
                                        <div className="document-info">
                                            <h3 className="document-title">{document.title}</h3>
                                            <p className="document-description">{document.description}</p>
                                            {document.fileSize && document.fileType && (
                                                <div className="document-meta">
                                                    <span className="file-size">{document.fileSize}</span>
                                                    <span className="file-type"> • {document.fileType}</span>
                                                </div>
                                            )}
                                        </div>
                                        <div className="document-actions">
                                            {document.downloadUrl && (
                                                <button
                                                    className="download-btn"
                                                    onClick={(e) => handleDocumentDownload(document, e)}
                                                    title="Download document"
                                                >
                                                    ⬇️
                                                </button>
                                            )}
                                            <div
                                                className="document-arrow"
                                                onClick={(e) => handleDocumentArrowClick(document, e)}
                                            >
                                                →
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="documents-modal-buttons">
                                <button
                                    className="btn btn-outline modal-btn"
                                    onClick={handleBackToValidation}
                                >
                                    Back
                                </button>
                                <button
                                    className="btn btn-primary modal-btn"
                                    onClick={handleRecommendedTesting}
                                >
                                    Recommended Testing
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Document Detail Modal */}
            {showDocumentDetailModal && selectedDocument && (
                <div className="modal-overlay" onClick={handleCloseDocumentDetail}>
                    <div className="document-detail-modal" onClick={(e) => e.stopPropagation()}>
                        <div className="document-detail-header">
                            <h2 className="document-detail-title">Testing Documents</h2>
                            <button className="modal-close-btn" onClick={handleCloseDocumentDetail}>
                                ✕
                            </button>
                        </div>

                        <div className="document-detail-content">
                            <div className="document-detail-info">
                                <h3 className="document-name">{selectedDocument.fileName}</h3>
                                <p className="document-size">{selectedDocument.fileSize}</p>

                                <div className="document-details">
                                    <div className="detail-row">
                                        <span className="detail-label">Last updated</span>
                                        <span className="detail-value">{selectedDocument.lastUpdated}</span>
                                    </div>
                                    <div className="detail-row">
                                        <span className="detail-label">Created by</span>
                                        <span className="detail-value">{selectedDocument.createdBy}</span>
                                    </div>
                                    <div className="detail-row">
                                        <span className="detail-label">Version</span>
                                        <span className="detail-value">{selectedDocument.version}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="document-detail-actions">
                                <button
                                    className="btn btn-outline detail-btn"
                                    onClick={handleViewSelectedDocument}
                                >
                                    👁️ View Document
                                </button>
                                <button
                                    className="btn btn-primary detail-btn"
                                    onClick={handleDownloadSelectedDocument}
                                >
                                    ⬇️ Download
                                </button>
                            </div>

                            <div className="document-detail-buttons">
                                <button
                                    className="btn btn-outline modal-btn"
                                    onClick={handleBackToDocumentsList}
                                >
                                    ← Back to document list
                                </button>
                                <button
                                    className="btn btn-primary modal-btn"
                                    onClick={handleContinueToTestingTypes}
                                >
                                    Recommended Testing
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Build Integrity Failure Report Modal */}
            {showFailureReportModal && (
                <div className="modal-overlay" onClick={handleCloseFailureReport}>
                    <div className="failure-report-modal" onClick={(e) => e.stopPropagation()}>
                        <div className="failure-report-header">
                            <div className="failure-report-title-section">
                                <div className="warning-icon">⚠️</div>
                                <h2 className="failure-report-title">Build Integrity Failure Report</h2>
                            </div>
                            <button className="modal-close-btn" onClick={handleCloseFailureReport}>
                                ✕
                            </button>
                        </div>

                        <div className="failure-report-subtitle">
                            Analysis completed on June 26, 2025 at 14:32:15
                        </div>

                        <div className="failure-report-content">
                            <div className="summary-section">
                                <h3>Summary</h3>
                                <div className="summary-cards">
                                    <div className="summary-card critical">
                                        <div className="summary-number">2</div>
                                        <div className="summary-label">CRITICAL ISSUES</div>
                                    </div>
                                    <div className="summary-card missing">
                                        <div className="summary-number">3</div>
                                        <div className="summary-label">MISSING ITEMS</div>
                                    </div>
                                    <div className="summary-card config">
                                        <div className="summary-number">2</div>
                                        <div className="summary-label">CONFIG ISSUES</div>
                                    </div>
                                </div>
                            </div>

                            <div className="issues-section">
                                <div className="issue-category">
                                    <div className="issue-header">
                                        <span className="issue-icon critical">⚠️</span>
                                        <h4>Critical Issues</h4>
                                    </div>

                                    <div className="issue-item">
                                        <div className="issue-title">
                                            <span className="issue-x">✕</span>
                                            Version Mismatch
                                        </div>
                                        <ul className="issue-details">
                                            <li>Build Version: v2.1.0</li>
                                            <li>GIT Version: v2.0.8</li>
                                            <li>Versions must match exactly</li>
                                        </ul>
                                    </div>

                                    <div className="issue-item">
                                        <div className="issue-title">
                                            <span className="issue-x">✕</span>
                                            Required Fields Missing
                                        </div>
                                        <ul className="issue-details">
                                            <li>SDLC Model not selected</li>
                                            <li>Project Management System not specified</li>
                                            <li>Test Objective field empty</li>
                                        </ul>
                                    </div>
                                </div>

                                <div className="issue-category">
                                    <div className="issue-header">
                                        <span className="issue-icon missing">📋</span>
                                        <h4>Missing Documentation</h4>
                                    </div>

                                    <div className="issue-item">
                                        <div className="issue-title">
                                            <span className="issue-x">✕</span>
                                            Required Documents Not Found
                                        </div>
                                        <ul className="issue-details">
                                            <li>Test Strategy Document</li>
                                            <li>Requirements Specification</li>
                                            <li>Build Configuration File</li>
                                        </ul>
                                    </div>
                                </div>

                                <div className="issue-category">
                                    <div className="issue-header">
                                        <span className="issue-icon url">📝</span>
                                        <h4>URL Features Not Documented</h4>
                                    </div>

                                    <div className="issue-item">
                                        <div className="issue-details-plain">
                                            <ul className="issue-details">
                                                <li>/api/v2/user-preferences</li>
                                                <li>/api/v2/analytics/dashboard</li>
                                                <li>/app/admin/system-logs</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>

                                <div className="issue-category">
                                    <div className="issue-header">
                                        <span className="issue-icon documented">🔗</span>
                                        <h4>Documented Features Missing from URL</h4>
                                    </div>

                                    <div className="issue-item">
                                        <div className="issue-details-plain">
                                            <ul className="issue-details">
                                                <li>/api/v2/users/bulk-import</li>
                                                <li>/app/settings/white-labeling</li>
                                                <li>/app/workflows/automation</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>

                                <div className="issue-category">
                                    <div className="issue-header">
                                        <span className="issue-icon config">⚠️</span>
                                        <h4>Configuration Issues</h4>
                                    </div>

                                    <div className="issue-item">
                                        <div className="issue-title">
                                            <span className="issue-gear">⚙️</span>
                                            Environment Configuration
                                        </div>
                                        <ul className="issue-details">
                                            <li>Environment not selected</li>
                                            <li>Database connection unstable</li>
                                        </ul>
                                    </div>
                                </div>

                                <div className="email-notification-section">
                                    <div className="email-header">
                                        <span className="email-icon">📧</span>
                                        <h4>Email Notification</h4>
                                    </div>

                                    <div className="email-content">
                                        <textarea
                                            className="email-input"
                                            placeholder="Enter email IDs separated by commas (e.g., user1@example.com, user2@example.com, user3@example.com)"
                                            rows="3"
                                        />
                                        <button className="send-email-btn">
                                            Send
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Recommended Testing Types Modal */}
            {showRecommendedTestingModal && (
                <div className="modal-overlay" onClick={handleCloseRecommendedTesting}>
                    <div className="recommended-testing-modal" onClick={(e) => e.stopPropagation()}>
                        <div className="recommended-testing-header">
                            <h2 className="recommended-testing-title">Recommended Testing Types</h2>
                            <button className="modal-close-btn" onClick={handleCloseRecommendedTesting}>
                                ✕
                            </button>
                        </div>

                        <div className="recommended-testing-content">
                            <p className="recommended-testing-subtitle">
                                Based on your role as a Client, we recommend the following testing types.
                                Select one or more to proceed or go directly to AI test dashboard.
                            </p>

                            <div className="testing-types-list">
                                {recommendedTestingTypes.map((testingType) => (
                                    <div
                                        key={testingType.id}
                                        className="testing-type-item"
                                        onClick={() => handleTestingTypeToggle(testingType.id)}
                                    >
                                        <div className="testing-type-checkbox">
                                            <input
                                                type="checkbox"
                                                id={testingType.id}
                                                checked={selectedTestingTypes.includes(testingType.id)}
                                                onChange={() => handleTestingTypeToggle(testingType.id)}
                                                className="checkbox-input"
                                            />
                                            <label htmlFor={testingType.id} className="checkbox-label">
                                                <span className="checkmark">
                                                    {selectedTestingTypes.includes(testingType.id) ? '✓' : ''}
                                                </span>
                                            </label>
                                        </div>
                                        <div className="testing-type-info">
                                            <h3 className="testing-type-name">{testingType.name}</h3>
                                            <p className="testing-type-description">{testingType.description}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="recommended-testing-buttons">
                                <button
                                    className="btn btn-primary modal-btn ai-dashboard-btn"
                                    onClick={handleGoToAITestDashboard}
                                    disabled={selectedTestingTypes.length === 0}
                                >
                                    Go to AI Test Dashboard
                                </button>
                                <button
                                    className="btn btn-secondary modal-btn"
                                    onClick={handleNextFromTestingTypes}
                                >
                                    Next
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default BuildIntegrityForm;
