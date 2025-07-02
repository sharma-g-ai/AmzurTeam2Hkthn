import React, { useState } from 'react';
import './BuildIntegrityForm.css';

const SDLC_MODELS = ['Waterfall', 'Agile', 'V-Model', 'Spiral'];
const DOCUMENT_TYPES = ['Release Notes', 'Test Plan', 'Requirements', 'Other'];
const TRACKING_SYSTEMS = ['Jira', 'Azure DevOps', 'Trello', 'Other'];
const ENVIRONMENTS = ['Development', 'QA', 'Staging', 'Production'];

function ValidationModal({ open, onClose, onViewDocs }) {
    if (!open) return null;
    return (
        <div className="bic-modal-overlay">
            <div className="bic-modal">
                <button className="bic-modal-close" onClick={onClose}>&times;</button>
                <div className="bic-modal-icon-success">
                    <svg width="48" height="48" viewBox="0 0 48 48"><circle cx="24" cy="24" r="24" fill="#e8f5e9" /><path d="M16 24l6 6 10-12" stroke="#43a047" strokeWidth="3" fill="none" strokeLinecap="round" /></svg>
                </div>
                <div className="bic-modal-title">Validation Successful</div>
                <div className="bic-modal-desc">Build integrity check has been completed successfully.</div>
                <div className="bic-modal-actions">
                    <button className="primary" onClick={onViewDocs}>View Documents</button>
                    <button className="secondary" onClick={onClose}>Continue</button>
                </div>
            </div>
        </div>
    );
}

function TestingDocumentsModal({ open, onClose, onFileClick }) {
    if (!open) return null;
    return (
        <div className="bic-modal-overlay">
            <div className="testing-docs-modal">
                <button className="bic-modal-close" onClick={onClose}>&times;</button>
                <div className="testing-docs-header">Testing Documents</div>
                <div className="testing-docs-desc">Select a document to view details.</div>
                <div className="testing-docs-list">
                    <div className="testing-docs-item" onClick={onFileClick} style={{ cursor: 'pointer' }}>
                        <span className="testing-docs-icon">📄</span>
                        <div className="testing-docs-info">
                            <div className="testing-docs-title">Test Plan Document</div>
                            <div className="testing-docs-sub">Comprehensive testing guidelines and procedures</div>
                        </div>
                        <span className="testing-docs-arrow">&gt;</span>
                    </div>
                    <div className="testing-docs-item" onClick={onFileClick} style={{ cursor: 'pointer' }}>
                        <span className="testing-docs-icon">📄</span>
                        <div className="testing-docs-info">
                            <div className="testing-docs-title">Test Strategy Document</div>
                            <div className="testing-docs-sub">High level approach and testing methodology</div>
                        </div>
                        <span className="testing-docs-arrow">&gt;</span>
                    </div>
                    <div className="testing-docs-item" onClick={onFileClick} style={{ cursor: 'pointer' }}>
                        <span className="testing-docs-icon">📄</span>
                        <div className="testing-docs-info">
                            <div className="testing-docs-title">Requirement Traceability Matrix</div>
                            <div className="testing-docs-sub">Mapping between requirements and test cases</div>
                        </div>
                        <span className="testing-docs-arrow">&gt;</span>
                    </div>
                </div>
                <div className="testing-docs-actions">
                    <button className="secondary" onClick={onClose}>Back</button>
                </div>
            </div>
        </div>
    );
}

function TestingDocumentDetailsModal({ open, onClose, onContinueTesting }) {
    if (!open) return null;
    return (
        <div className="bic-modal-overlay">
            <div className="testing-docs-details-modal">
                <button className="bic-modal-close" onClick={onClose}>&times;</button>
                <div className="testing-docs-header">Testing Documents</div>
                <div className="testing-docs-details-title">Project_TestPlan_v2.1.pdf</div>
                <div className="testing-docs-details-size">2.4 MB</div>
                <div className="testing-docs-details-meta">
                    <div className="testing-docs-details-meta-col">
                        <div className="testing-docs-details-meta-label">Last updated</div>
                        <div className="testing-docs-details-meta-value">March 28, 2025</div>
                    </div>
                    <div className="testing-docs-details-meta-col">
                        <div className="testing-docs-details-meta-label">Created by</div>
                        <div className="testing-docs-details-meta-value">Quality Assurance Team</div>
                    </div>
                    <div className="testing-docs-details-meta-col">
                        <div className="testing-docs-details-meta-label">Version</div>
                        <div className="testing-docs-details-meta-value">2.1</div>
                    </div>
                </div>
                <div className="testing-docs-details-actions">
                    <button className="secondary"><span role="img" aria-label="View">👁️</span> View Document</button>
                    <button className="primary"><span role="img" aria-label="Download">⬇️</span> Download</button>
                </div>
                <div className="testing-docs-details-footer">
                    <button className="link" onClick={onClose}>&lt; Back to document list</button>
                    <button className="primary" onClick={onContinueTesting}>Continue to Testing Types</button>
                </div>
            </div>
        </div>
    );
}

function TestingTypesModal({ open, onClose }) {
    const [sanity, setSanity] = useState(false);
    const [unit, setUnit] = useState(false);
    if (!open) return null;
    return (
        <div className="bic-modal-overlay">
            <div className="testing-types-modal">
                <button className="bic-modal-close" onClick={onClose}>&times;</button>
                <div className="testing-docs-header">Select Testing Types</div>
                <div className="testing-types-checkboxes" style={{ padding: '24px 32px', display: 'flex', flexDirection: 'column', gap: '18px' }}>
                    <label style={{ fontSize: '1.08rem' }}><input type="checkbox" checked={sanity} onChange={() => setSanity(v => !v)} /> Sanity Testing</label>
                    <label style={{ fontSize: '1.08rem' }}><input type="checkbox" checked={unit} onChange={() => setUnit(v => !v)} /> Unit Testing</label>
                </div>
                <div className="testing-types-actions" style={{ display: 'flex', justifyContent: 'flex-end', padding: '0 32px 18px 32px' }}>
                    <button className="primary" onClick={onClose}>Done</button>
                </div>
            </div>
        </div>
    );
}

export default function BuildIntegrityForm() {
    const [sdlcModel, setSdlcModel] = useState('');
    const [documentType, setDocumentType] = useState('');
    const [documentFile, setDocumentFile] = useState(null);
    const [documentContent, setDocumentContent] = useState('');
    const [buildVersion, setBuildVersion] = useState('');
    const [gitVersion, setGitVersion] = useState('');
    const [trackingSystem, setTrackingSystem] = useState('');
    const [environment, setEnvironment] = useState('');
    const [appUrl, setAppUrl] = useState('');
    const [testObjective, setTestObjective] = useState('');
    const [formData, setFormData] = useState(null);
    const [submitStatus, setSubmitStatus] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [showDocsModal, setShowDocsModal] = useState(false);
    const [showDocDetails, setShowDocDetails] = useState(false);
    const [showTestingTypes, setShowTestingTypes] = useState(false);

    // Helper to reset all fields
    const resetForm = () => {
        setSdlcModel('');
        setDocumentType('');
        setDocumentFile(null);
        setDocumentContent('');
        setBuildVersion('');
        setGitVersion('');
        setTrackingSystem('');
        setEnvironment('');
        setAppUrl('');
        setTestObjective('');
        setFormData(null);
        setSubmitStatus('');
        setShowModal(false);
        // Also reset file input value if needed
        const fileInput = document.getElementById('documentFile');
        if (fileInput) fileInput.value = '';
    };

    const buildFormData = () => ({
        'SDLC Model': sdlcModel,
        'SDLC Documents': documentType,
        'Build Version No': buildVersion,
        'GIT Version No': gitVersion,
        'Project Management System': trackingSystem,
        'Environment': environment,
        'Application URL': appUrl,
        'Test Objective': testObjective,
        ...(documentFile ? { 'SDLC Document File': documentFile.name } : {}),
        ...(documentContent ? { 'SDLC Document Content': documentContent } : {})
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = buildFormData();
        console.log('Form Data:', data);
        setSubmitStatus('Saving...');
        setShowModal(true); // Show modal immediately
        try {
            const formPayload = new FormData();
            Object.entries(data).forEach(([key, value]) => {
                formPayload.append(key, value);
            });
            if (documentFile) {
                formPayload.append('SDLC Document File', documentFile);
            }
            await fetch('/api/build-integrity', {
                method: 'POST',
                body: formPayload
            });
            setSubmitStatus('Saved successfully!');
        } catch (err) {
            setSubmitStatus('Error saving data.');
        }
    };

    // Restrict file type and read content
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            if (file.type !== 'application/msword' && file.type !== 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
                alert('Please upload a .doc or .docx file only.');
                e.target.value = '';
                setDocumentFile(null);
                setDocumentContent('');
                return;
            }
            setDocumentFile(file);
            // Read file content as text (for .docx, this will be base64 or binary, backend should handle)
            const reader = new FileReader();
            reader.onload = (event) => {
                setDocumentContent(event.target.result);
            };
            reader.readAsDataURL(file);
        } else {
            setDocumentFile(null);
            setDocumentContent('');
        }
    };

    return (
        <>
            <form className="bic-form-container" onSubmit={handleSubmit}>
                <div className="bic-form-header">Build Integrity Check</div>
                <div className="bic-form-body">
                    {/* ...existing code... */}
                    <div className="bic-form-group">
                        <label htmlFor="sdlcModel">SDLC Model</label>
                        <select id="sdlcModel" value={sdlcModel} onChange={e => setSdlcModel(e.target.value)}>
                            <option value="">Select SDLC Model</option>
                            {SDLC_MODELS.map(model => <option key={model} value={model}>{model}</option>)}
                        </select>
                    </div>
                    <div className="bic-form-group bic-form-docs" style={{ display: 'flex' }}>
                        <div style={{ flex: 1 }}>
                            <label htmlFor="documentType">SDLC Documents</label>
                            <select id="documentType" value={documentType} onChange={e => setDocumentType(e.target.value)}>
                                <option value="">Select Document Type</option>
                                {DOCUMENT_TYPES.map(doc => <option key={doc} value={doc}>{doc}</option>)}
                            </select>
                        </div>
                        <input
                            type="file"
                            id="documentFile"
                            accept=".doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                            style={{ display: 'none' }}
                            onChange={handleFileChange}
                        />
                        <label htmlFor="documentFile" className="upload-btn">Upload</label>
                        {documentFile && <span style={{ fontSize: '0.95rem', marginLeft: 8 }}>{documentFile.name}</span>}
                    </div>
                    <div className="bic-form-group">
                        <label htmlFor="buildVersion">Build Version No <span className="required">*</span></label>
                        <input id="buildVersion" value={buildVersion} onChange={e => setBuildVersion(e.target.value)} required />
                    </div>
                    <div className="bic-form-group">
                        <label htmlFor="gitVersion">GIT Version No <span className="required">*</span></label>
                        <input id="gitVersion" value={gitVersion} onChange={e => setGitVersion(e.target.value)} required />
                    </div>
                    <div className="bic-form-group">
                        <label htmlFor="trackingSystem">Project Management System</label>
                        <select id="trackingSystem" value={trackingSystem} onChange={e => setTrackingSystem(e.target.value)}>
                            <option value="">Select Tracking System</option>
                            {TRACKING_SYSTEMS.map(sys => <option key={sys} value={sys}>{sys}</option>)}
                        </select>
                    </div>
                    <div className="bic-form-group">
                        <label htmlFor="environment">Environment</label>
                        <select id="environment" value={environment} onChange={e => setEnvironment(e.target.value)}>
                            <option value="">Select Environment</option>
                            {ENVIRONMENTS.map(env => <option key={env} value={env}>{env}</option>)}
                        </select>
                    </div>
                    <div className="bic-form-group">
                        <label htmlFor="appUrl">Application URL</label>
                        <input id="appUrl" value={appUrl} onChange={e => setAppUrl(e.target.value)} />
                    </div>
                    <div className="bic-form-group">
                        <label htmlFor="testObjective">Test Objective</label>
                        <textarea
                            id="testObjective"
                            value={testObjective}
                            onChange={e => setTestObjective(e.target.value)}
                            maxLength={5000}
                        />
                        <div className="char-count">{testObjective.length}/5000 characters</div>
                    </div>
                    <div className="bic-form-note">
                        <b>Note:</b> Build integrity check validates build stability and high level features mentioned in release notes or respective document.
                    </div>
                    <div className="bic-form-actions">
                        <button type="submit" className="primary">Perform Validity Check</button>
                        <button type="button" className="secondary" onClick={resetForm}>Reset</button>
                        <button type="button" className="secondary">Proceed to testing</button>
                    </div>
                    {submitStatus && <div style={{ color: submitStatus.includes('Error') ? 'red' : 'green', marginTop: 8 }}>{submitStatus}</div>}
                </div>
            </form>
            <ValidationModal
                open={showModal}
                onClose={() => setShowModal(false)}
                onViewDocs={() => { setShowModal(false); setShowDocsModal(true); }}
            />
            <TestingDocumentsModal
                open={showDocsModal}
                onClose={() => setShowDocsModal(false)}
                onFileClick={() => { setShowDocsModal(false); setShowDocDetails(true); }}
            />
            <TestingDocumentDetailsModal
                open={showDocDetails}
                onClose={() => { setShowDocDetails(false); setShowDocsModal(true); }}
                onContinueTesting={() => { setShowDocDetails(false); setShowTestingTypes(true); }}
            />
            <TestingTypesModal
                open={showTestingTypes}
                onClose={() => setShowTestingTypes(false)}
            />
        </>
    );
}
