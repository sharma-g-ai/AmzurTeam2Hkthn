import React from 'react';
import { useAppContext, ACTION_TYPES } from '../../context/AppContext';
import Modal from '../Common/Modal';
import { buildService } from '../../services/buildService';
import './CRUDModal.css';

const CRUDModal = () => {
  const { state, dispatch } = useAppContext();
  const [formData, setFormData] = React.useState({});
  const [loading, setLoading] = React.useState(false);

  const isOpen = Boolean(state.crudMode);
  
  const handleClose = () => {
    dispatch({ type: ACTION_TYPES.SET_CRUD_MODE, payload: null });
    setFormData({});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      switch (state.crudMode) {
        case 'create-application':
          await buildService.createApplication(formData);
          break;
        case 'create-build':
          await buildService.createBuild({ ...formData, applicationId: state.selectedApplication });
          break;
        case 'create-module':
          await buildService.createModule({ ...formData, buildId: state.selectedBuild });
          break;
        default:
          break;
      }
      
      handleClose();
      // Refresh data would happen here in real app
      
    } catch (error) {
      console.error('CRUD operation failed:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const getTitle = () => {
    switch (state.crudMode) {
      case 'create-application': return 'Create New Application';
      case 'create-build': return 'Create New Build';
      case 'create-module': return 'Create New Module';
      default: return 'Create Item';
    }
  };

  const renderForm = () => {
    switch (state.crudMode) {
      case 'create-application':
        return (
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Application Name:</label>
              <input
                type="text"
                name="name"
                value={formData.name || ''}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-actions">
              <button type="button" onClick={handleClose}>Cancel</button>
              <button type="submit" disabled={loading}>
                {loading ? 'Creating...' : 'Create Application'}
              </button>
            </div>
          </form>
        );
      
      case 'create-build':
        return (
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Build Name:</label>
              <input
                type="text"
                name="name"
                value={formData.name || ''}
                onChange={handleInputChange}
                placeholder="e.g., Build 1.0.2"
                required
              />
            </div>
            <div className="form-actions">
              <button type="button" onClick={handleClose}>Cancel</button>
              <button type="submit" disabled={loading}>
                {loading ? 'Creating...' : 'Create Build'}
              </button>
            </div>
          </form>
        );
      
      case 'create-module':
        return (
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Module Name:</label>
              <input
                type="text"
                name="name"
                value={formData.name || ''}
                onChange={handleInputChange}
                placeholder="e.g., User Authentication"
                required
              />
            </div>
            <div className="form-actions">
              <button type="button" onClick={handleClose}>Cancel</button>
              <button type="submit" disabled={loading}>
                {loading ? 'Creating...' : 'Create Module'}
              </button>
            </div>
          </form>
        );
      
      default:
        return <p>Unknown CRUD operation</p>;
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title={getTitle()} size="small">
      <div className="crud-content">
        <p className="crud-info">
          This form is available because you're in <strong>Development</strong> environment (BIC-006)
        </p>
        {renderForm()}
      </div>
    </Modal>
  );
};

export default CRUDModal;
