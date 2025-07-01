import React, { useState, useEffect } from 'react';
import { useAppContext, ACTION_TYPES } from '../../context/AppContext';
import { buildService } from '../../services/buildService';
import LoadingSpinner from '../Common/LoadingSpinner';
import './DropdownStyles.css';

const BuildDropdown = () => {
  const { state, dispatch, isDevelopmentEnvironment } = useAppContext();
  const [builds, setBuilds] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (state.selectedApplication) {
      loadBuilds();
    } else {
      setBuilds([]);
    }
  }, [state.selectedApplication]);

  const loadBuilds = async () => {
    setLoading(true);
    try {
      const buildList = await buildService.getBuilds(state.selectedApplication);
      setBuilds(buildList);
    } catch (error) {
      console.error('Error loading builds:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleBuildChange = (event) => {
    dispatch({
      type: ACTION_TYPES.SET_BUILD,
      payload: event.target.value
    });
  };

  const handleAddNew = () => {
    dispatch({ type: ACTION_TYPES.SET_CRUD_MODE, payload: 'create-build' });
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'success': return '✅';
      case 'failed': return '❌';
      case 'pending': return '⏳';
      default: return '⚪';
    }
  };

  if (!state.selectedApplication) {
    return (
      <div className="dropdown-container disabled">
        <h4>Select Build (BIC-004)</h4>
        <p className="disabled-message">Please select an application first</p>
      </div>
    );
  }

  return (
    <div className="dropdown-container">
      <div className="dropdown-header">
        <h4>Select Build (BIC-004)</h4>
        {isDevelopmentEnvironment() && (
          <button className="add-button" onClick={handleAddNew}>
            + Add New
          </button>
        )}
      </div>

      {loading ? (
        <LoadingSpinner size="small" message="Loading builds..." />
      ) : (
        <select
          className="dropdown-select"
          value={state.selectedBuild}
          onChange={handleBuildChange}
          disabled={builds.length === 0}
        >
          <option value="">Choose a build...</option>
          {builds.map((build) => (
            <option key={build.id} value={build.id}>
              {getStatusIcon(build.status)} {build.name} ({build.status})
            </option>
          ))}
        </select>
      )}

      {builds.length === 0 && !loading && (
        <p className="no-data-message">No builds available for this application</p>
      )}

      {state.selectedBuild && (
        <div className="selection-info">
          <p><strong>Selected:</strong> {
            builds.find(build => build.id.toString() === state.selectedBuild)?.name
          }</p>
          <p><strong>Status:</strong> {
            builds.find(build => build.id.toString() === state.selectedBuild)?.status
          }</p>
        </div>
      )}
    </div>
  );
};

export default BuildDropdown;
