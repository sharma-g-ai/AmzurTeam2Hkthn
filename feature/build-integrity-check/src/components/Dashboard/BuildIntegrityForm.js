import React, { useState } from 'react';
import './BuildIntegrityForm.css';

const BuildIntegrityForm = () => {
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
    const [showValidationModal, setShowValidationModal] = useState(false);
    const [showDocumentsModal, setShowDocumentsModal] = useState(false);

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

    const handleSdlcSelect = (value, text) => {
        setFormData(prev => ({
            ...prev,
            sdlcModel: value
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
    };

    const validateForm = () => {
        const newErrors = {};
        
        if (!formData.sdlcModel) newErrors.sdlcModel = 'SDLC Model is required';
        if (!formData.sdlcDocuments) newErrors.sdlcDocuments = 'SDLC Documents is required';
        if (!formData.buildVersion) newErrors.buildVersion = 'Build Version is required';
        if (!formData.projectManagement) newErrors.projectManagement = 'Project Management System is required';
        if (!formData.environment) newErrors.environment = 'Environment is required';
        if (!formData.applicationUrl) newErrors.applicationUrl = 'Application URL is required';
        if (!formData.testObjective) newErrors.testObjective = 'Test Objective is required';
        
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleValidityCheck = () => {
        if (validateForm()) {
            console.log('Performing validity check...', formData);
            setShowValidationModal(true);
        } else {
            alert('Please fill in all required fields marked with *');
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
        alert('Starting recommended testing phase...');
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

    // Sample documents data with actual document URLs - this would come from your backend API
    const testingDocuments = [
        {
            id: 1,
            title: 'Test Plan Document',
            description: 'Comprehensive testing guidelines and procedures',
            icon: '📄',
            url: 'https://example.com/documents/test-plan.pdf', // Direct view URL
            downloadUrl: 'https://api.example.com/documents/download/test-plan.pdf', // Download URL
            fileName: 'test_plan_document.pdf',
            fileSize: '2.4 MB',
            fileType: 'PDF'
        },
        {
            id: 2,
            title: 'Test Strategy Document',
            description: 'High level approach and testing methodology',
            icon: '📄',
            url: 'https://example.com/documents/test-strategy.pdf',
            downloadUrl: 'https://api.example.com/documents/download/test-strategy.pdf',
            fileName: 'test_strategy_document.pdf',
            fileSize: '1.8 MB',
            fileType: 'PDF'
        },
        {
            id: 3,
            title: 'Requirement Traceability Matrix',
            description: 'Mapping between requirements and test cases',
            icon: '📄',
            url: 'https://example.com/documents/rtm.xlsx',
            downloadUrl: 'https://api.example.com/documents/download/rtm.xlsx',
            fileName: 'requirement_traceability_matrix.xlsx',
            fileSize: '850 KB',
            fileType: 'Excel'
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

    return (
        <div className="build-integrity-form-container">
            {/* Header */}
            <div className="form-header">
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
                        {errors.sdlcModel && <div className="error-message">{errors.sdlcModel}</div>}
                        <div className="dropdown-container-custom">
                            <select
                                id="sdlcModel"
                                name="sdlcModel"
                                className="form-control"
                                value={formData.sdlcModel}
                                onChange={handleInputChange}
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
                        {errors.sdlcDocuments && <div className="error-message">{errors.sdlcDocuments}</div>}
                        <div className="sdlc-documents-container">
                            <select
                                id="sdlcDocuments"
                                name="sdlcDocuments"
                                className="form-control"
                                value={formData.sdlcDocuments}
                                onChange={handleInputChange}
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
                            {errors.buildVersion && <div className="error-message">{errors.buildVersion}</div>}
                            <input
                                type="text"
                                id="buildVersion"
                                name="buildVersion"
                                className="form-control text-input"
                                placeholder="Enter Build Version"
                                value={formData.buildVersion}
                                onChange={handleInputChange}
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
                            />
                        </div>
                    </div>

                    {/* Project Management System */}
                    <div className="form-group">
                        <label htmlFor="projectManagement">
                            Project Management System <span className="required-icon">*</span>
                        </label>
                        {errors.projectManagement && <div className="error-message">{errors.projectManagement}</div>}
                        <select
                            id="projectManagement"
                            name="projectManagement"
                            className="form-control"
                            value={formData.projectManagement}
                            onChange={handleInputChange}
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
                        {errors.environment && <div className="error-message">{errors.environment}</div>}
                        <select
                            id="environment"
                            name="environment"
                            className="form-control"
                            value={formData.environment}
                            onChange={handleInputChange}
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
                        {errors.applicationUrl && <div className="error-message">{errors.applicationUrl}</div>}
                        <input
                            type="url"
                            id="applicationUrl"
                            name="applicationUrl"
                            className="form-control text-input"
                            placeholder="Enter Application URL"
                            value={formData.applicationUrl}
                            onChange={handleInputChange}
                        />
                    </div>

                    {/* Test Objective */}
                    <div className="form-group">
                        <label htmlFor="testObjective">
                            Test Objective <span className="required-icon">*</span>
                        </label>
                        {errors.testObjective && <div className="error-message">{errors.testObjective}</div>}
                        <textarea
                            id="testObjective"
                            name="testObjective"
                            className="form-control textarea"
                            placeholder="Enter a summary of the build and any important notes..."
                            maxLength="5000"
                            value={formData.testObjective}
                            onChange={handleInputChange}
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
                                            <div className="document-arrow">→</div>
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
        </div>
    );
};

export default BuildIntegrityForm;
