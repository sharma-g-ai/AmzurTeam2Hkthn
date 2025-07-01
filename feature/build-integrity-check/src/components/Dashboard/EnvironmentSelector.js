import React from 'react';
import { useAppContext, ACTION_TYPES } from '../../context/AppContext';
import { ENVIRONMENT_OPTIONS } from '../../utils/constants';
import './EnvironmentSelector.css';

const EnvironmentSelector = () => {
  const { state, dispatch } = useAppContext();

  const handleEnvironmentChange = (event) => {
    dispatch({
      type: ACTION_TYPES.SET_ENVIRONMENT,
      payload: event.target.value
    });
  };

  return (
    <div className="environment-selector">
      <h3>Select Environment (BIC-002)</h3>
      <div className="environment-options">
        {ENVIRONMENT_OPTIONS.map((option) => (
          <label key={option.value} className="environment-option">
            <input
              type="radio"
              name="environment"
              value={option.value}
              checked={state.selectedEnvironment === option.value}
              onChange={handleEnvironmentChange}
            />
            <span className="environment-label">{option.label}</span>
          </label>
        ))}
      </div>
      
      {state.selectedEnvironment && (
        <div className="selected-environment">
          <p><strong>Selected:</strong> {
            ENVIRONMENT_OPTIONS.find(opt => opt.value === state.selectedEnvironment)?.label
          }</p>
          {state.selectedEnvironment === 'development' && (
            <p className="development-notice">
              🔧 <strong>Development Environment:</strong> CRUD operations are enabled
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default EnvironmentSelector;
