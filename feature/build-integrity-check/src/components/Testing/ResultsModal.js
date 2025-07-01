import React, { useState } from 'react';
import { useAppContext, ACTION_TYPES } from '../../context/AppContext';
import { testService } from '../../services/testService';
import Modal from '../Common/Modal';
import LoadingSpinner from '../Common/LoadingSpinner';
import './ResultsModal.css';

const ResultsModal = () => {
  const { state, dispatch } = useAppContext();
  const [documents, setDocuments] = useState([]);
  const [loadingDocs, setLoadingDocs] = useState(false);
  const [recommendations, setRecommendations] = useState([]);
  const [loadingRecommendations, setLoadingRecommendations] = useState(false);

  const handleClose = () => {
    dispatch({ type: ACTION_TYPES.HIDE_RESULTS_MODAL });
  };

  const handleViewDocuments = async () => {
    setLoadingDocs(true);
    try {
      const docs = await testService.getTestDocuments(state.testResults?.id);
      setDocuments(docs);
    } catch (error) {
      console.error('Error loading documents:', error);
    } finally {
      setLoadingDocs(false);
    }
  };

  const handleContinue = async () => {
    setLoadingRecommendations(true);
    try {
      const testConfig = {
        environment: state.selectedEnvironment,
        application: state.selectedApplication,
        build: state.selectedBuild,
        module: state.selectedModule
      };
      const recs = await testService.getRecommendedTests(testConfig);
      setRecommendations(recs);
    } catch (error) {
      console.error('Error loading recommendations:', error);
    } finally {
      setLoadingRecommendations(false);
    }
  };

  const formatDuration = (ms) => {
    const seconds = Math.floor(ms / 1000);
    return `${seconds}s`;
  };

  const getStatusIcon = (status) => {
    return status === 'success' ? '✅' : '❌';
  };

  const getStatusClass = (status) => {
    return status === 'success' ? 'success' : 'failed';
  };

  if (!state.testResults) return null;

  const { testResults } = state;

  return (
    <Modal 
      isOpen={state.showResultsModal} 
      onClose={handleClose}
      title="Build Integrity Test Results (BIC-008)"
      size="large"
    >
      <div className="results-content">
        {/* Overall Status */}
        <div className={`overall-status ${getStatusClass(testResults.overall)}`}>
          <h3>
            {getStatusIcon(testResults.overall)} 
            Overall Status: {testResults.overall.toUpperCase()}
          </h3>
          <p>Total Duration: {formatDuration(testResults.totalDuration)}</p>
          <p>Completed: {new Date(testResults.timestamp).toLocaleString()}</p>
        </div>

        {/* Test Details */}
        <div className="test-details">
          <h4>Test Results:</h4>
          {testResults.tests.map((test, index) => (
            <div key={index} className={`test-result ${getStatusClass(test.status)}`}>
              <div className="test-header">
                <span className="test-name">
                  {getStatusIcon(test.status)} {test.type.toUpperCase()} Test
                </span>
                <span className="test-duration">
                  {formatDuration(test.duration)}
                </span>
              </div>
              <p className="test-details-text">{test.details}</p>
            </div>
          ))}
        </div>

        {/* Success Actions */}
        {testResults.overall === 'success' && (
          <div className="success-actions">
            <div className="action-buttons">
              <button 
                className="view-docs-button"
                onClick={handleViewDocuments}
                disabled={loadingDocs}
              >
                {loadingDocs ? 'Loading...' : 'View Documents (BIC-009)'}
              </button>
              
              <button 
                className="continue-button"
                onClick={handleContinue}
                disabled={loadingRecommendations}
              >
                {loadingRecommendations ? 'Loading...' : 'Continue to Recommended Testing (BIC-010)'}
              </button>
            </div>
          </div>
        )}

        {/* Documents Section */}
        {documents.length > 0 && (
          <div className="documents-section">
            <h4>Available Documents:</h4>
            <div className="documents-list">
              {documents.map((doc) => (
                <div key={doc.id} className="document-item">
                  <div className="doc-info">
                    <span className="doc-name">{doc.name}</span>
                    <span className="doc-details">{doc.type} • {doc.size}</span>
                  </div>
                  <button className="download-button">Download</button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Recommendations Section */}
        {recommendations.length > 0 && (
          <div className="recommendations-section">
            <h4>Recommended Tests:</h4>
            <div className="recommendations-list">
              {recommendations.map((rec) => (
                <div key={rec.id} className="recommendation-item">
                  <div className="rec-header">
                    <span className="rec-name">{rec.name}</span>
                    <span className={`rec-priority priority-${rec.priority.toLowerCase()}`}>
                      {rec.priority} Priority
                    </span>
                  </div>
                  <p className="rec-description">{rec.description}</p>
                  <p className="rec-duration">Estimated Duration: {rec.estimatedDuration}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Loading States */}
        {loadingDocs && (
          <div className="loading-section">
            <LoadingSpinner size="small" message="Loading documents..." />
          </div>
        )}

        {loadingRecommendations && (
          <div className="loading-section">
            <LoadingSpinner size="small" message="Loading recommendations..." />
          </div>
        )}
      </div>
    </Modal>
  );
};

export default ResultsModal;
