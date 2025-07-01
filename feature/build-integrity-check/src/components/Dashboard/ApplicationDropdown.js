import React, { useState, useEffect } from 'react';
import { useAppContext, ACTION_TYPES } from '../../context/AppContext';
import { buildService } from '../../services/buildService';
import LoadingSpinner from '../Common/LoadingSpinner';
import './DropdownStyles.css';

const ApplicationDropdown = () => {
  const { state, dispatch, isDevelopmentEnvironment } = useAppContext();
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (state.selectedEnvironment) {
      loadApplications();
    } else {
      setApplications([]);
    }
  }, [state.selectedEnvironment]);

  const loadApplications = async () => {
    setLoading(true);
    try {
      const apps = await buildService.getApplications(state.selectedEnvironment);
      setApplications(apps);
    } catch (error) {
      console.error('Error loading applications:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleApplicationChange = (event) => {
    dispatch({
      type: ACTION_TYPES.SET_APPLICATION,
      payload: event.target.value
    });
  };

  const handleAddNew = () => {
    dispatch({ type: ACTION_TYPES.SET_CRUD_MODE, payload: 'create-application' });
  };

  if (!state.selectedEnvironment) {
    return (
      <div className="dropdown-container disabled">
        <h4>Select Application (BIC-003)</h4>
        <p className="disabled-message">Please select an environment first</p>
      </div>
    );
  }

  return (
    <div className="dropdown-container">
      <div className="dropdown-header">
        <h4>Select Application (BIC-003)</h4>
        {isDevelopmentEnvironment() && (
          <button className="add-button" onClick={handleAddNew}>
            + Add New
          </button>
        )}
      </div>

      {loading ? (
        <LoadingSpinner size="small" message="Loading applications..." />
      ) : (
        <select
          className="dropdown-select"
          value={state.selectedApplication}
          onChange={handleApplicationChange}
          disabled={applications.length === 0}
        >
          <option value="">Choose an application...</option>
          {applications.map((app) => (
            <option key={app.id} value={app.id}>
              {app.name}
            </option>
          ))}
        </select>
      )}

      {applications.length === 0 && !loading && (
        <p className="no-data-message">No applications available for this environment</p>
      )}

      {state.selectedApplication && (
        <div className="selection-info">
          <p><strong>Selected:</strong> {
            applications.find(app => app.id.toString() === state.selectedApplication)?.name
          }</p>
        </div>
      )}
    </div>
  );
};

export default ApplicationDropdown;
