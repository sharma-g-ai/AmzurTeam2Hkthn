import React, { useState, useEffect } from 'react';
import { useAppContext, ACTION_TYPES } from '../../context/AppContext';
import { buildService } from '../../services/buildService';
import LoadingSpinner from '../Common/LoadingSpinner';
import './DropdownStyles.css';

const ModuleDropdown = () => {
  const { state, dispatch, isDevelopmentEnvironment } = useAppContext();
  const [modules, setModules] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (state.selectedBuild) {
      loadModules();
    } else {
      setModules([]);
    }
  }, [state.selectedBuild]);

  const loadModules = async () => {
    setLoading(true);
    try {
      const moduleList = await buildService.getModules(state.selectedBuild);
      setModules(moduleList);
    } catch (error) {
      console.error('Error loading modules:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleModuleChange = (event) => {
    dispatch({
      type: ACTION_TYPES.SET_MODULE,
      payload: event.target.value
    });
  };

  const handleAddNew = () => {
    dispatch({ type: ACTION_TYPES.SET_CRUD_MODE, payload: 'create-module' });
  };

  if (!state.selectedBuild) {
    return (
      <div className="dropdown-container disabled">
        <h4>Select Module (BIC-005)</h4>
        <p className="disabled-message">Please select a build first</p>
      </div>
    );
  }

  return (
    <div className="dropdown-container">
      <div className="dropdown-header">
        <h4>Select Module (BIC-005)</h4>
        {isDevelopmentEnvironment() && (
          <button className="add-button" onClick={handleAddNew}>
            + Add New
          </button>
        )}
      </div>

      {loading ? (
        <LoadingSpinner size="small" message="Loading modules..." />
      ) : (
        <select
          className="dropdown-select"
          value={state.selectedModule}
          onChange={handleModuleChange}
          disabled={modules.length === 0}
        >
          <option value="">Choose a module...</option>
          {modules.map((module) => (
            <option key={module.id} value={module.id}>
              {module.name}
            </option>
          ))}
        </select>
      )}

      {modules.length === 0 && !loading && (
        <p className="no-data-message">No modules available for this build</p>
      )}

      {state.selectedModule && (
        <div className="selection-info">
          <p><strong>Selected:</strong> {
            modules.find(module => module.id.toString() === state.selectedModule)?.name
          }</p>
        </div>
      )}
    </div>
  );
};

export default ModuleDropdown;
