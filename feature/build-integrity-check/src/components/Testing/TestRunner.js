import React, { useState } from 'react';
import { useAppContext, ACTION_TYPES } from '../../context/AppContext';
import { testService } from '../../services/testService';
import LoadingSpinner from '../Common/LoadingSpinner';
import './TestRunner.css';

const TestRunner = () => {
  const { state, dispatch, canRunTests } = useAppContext();
  const [isRunning, setIsRunning] = useState(false);

  const handleRunTests = async () => {
    if (!canRunTests()) return;

    setIsRunning(true);
    dispatch({ type: ACTION_TYPES.START_TEST });

    try {
      const testConfig = {
        environment: state.selectedEnvironment,
        application: state.selectedApplication,
        build: state.selectedBuild,
        module: state.selectedModule
      };

      const results = await testService.runTests(testConfig);
      
      dispatch({ type: ACTION_TYPES.SET_TEST_RESULTS, payload: results });
      dispatch({ type: ACTION_TYPES.SHOW_RESULTS_MODAL });
    } catch (error) {
      console.error('Error running tests:', error);
      // Handle error - could show error modal
    } finally {
      setIsRunning(false);
    }
  };

  const isDisabled = !canRunTests() || isRunning;

  return (
    <div className="test-runner">
      <h3>Build Integrity Testing (BIC-007)</h3>
      
      <div className="test-info">
        <p>This will execute both smoke and sanity tests on the selected build configuration.</p>
        
        {canRunTests() && (
          <div className="test-config-summary">
            <h4>Test Configuration:</h4>
            <ul>
              <li><strong>Environment:</strong> {state.selectedEnvironment}</li>
              <li><strong>Application:</strong> {state.selectedApplication}</li>
              <li><strong>Build:</strong> {state.selectedBuild}</li>
              <li><strong>Module:</strong> {state.selectedModule}</li>
            </ul>
          </div>
        )}
      </div>

      {isRunning && (
        <div className="test-progress">
          <LoadingSpinner size="medium" message="Running smoke and sanity tests..." />
          <p className="progress-text">This may take a few minutes...</p>
        </div>
      )}

      <div className="test-actions">
        <button
          className={`run-tests-button ${isDisabled ? 'disabled' : ''}`}
          onClick={handleRunTests}
          disabled={isDisabled}
        >
          {isRunning ? 'Running Tests...' : 'Run Smoke & Sanity Tests'}
        </button>
        
        {!canRunTests() && !isRunning && (
          <p className="requirement-message">
            Please complete all selections above to run tests
          </p>
        )}
      </div>
    </div>
  );
};

export default TestRunner;
