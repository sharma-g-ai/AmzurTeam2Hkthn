import React, { createContext, useContext, useReducer } from 'react';
import { ENVIRONMENTS } from '../utils/constants';

// Initial state
const initialState = {
  selectedEnvironment: '',
  selectedApplication: '',
  selectedBuild: '',
  selectedModule: '',
  testResults: null,
  isTestRunning: false,
  showResultsModal: false,
  crudMode: null, // 'create', 'edit', 'delete', null
  selectedItem: null
};

// Action types
export const ACTION_TYPES = {
  SET_ENVIRONMENT: 'SET_ENVIRONMENT',
  SET_APPLICATION: 'SET_APPLICATION',
  SET_BUILD: 'SET_BUILD',
  SET_MODULE: 'SET_MODULE',
  START_TEST: 'START_TEST',
  SET_TEST_RESULTS: 'SET_TEST_RESULTS',
  SHOW_RESULTS_MODAL: 'SHOW_RESULTS_MODAL',
  HIDE_RESULTS_MODAL: 'HIDE_RESULTS_MODAL',
  SET_CRUD_MODE: 'SET_CRUD_MODE',
  SET_SELECTED_ITEM: 'SET_SELECTED_ITEM',
  RESET_SELECTIONS: 'RESET_SELECTIONS'
};

// Reducer function
const appReducer = (state, action) => {
  switch (action.type) {
    case ACTION_TYPES.SET_ENVIRONMENT:
      return {
        ...state,
        selectedEnvironment: action.payload,
        selectedApplication: '', // Reset dependent selections
        selectedBuild: '',
        selectedModule: ''
      };
    case ACTION_TYPES.SET_APPLICATION:
      return {
        ...state,
        selectedApplication: action.payload,
        selectedBuild: '', // Reset dependent selections
        selectedModule: ''
      };
    case ACTION_TYPES.SET_BUILD:
      return {
        ...state,
        selectedBuild: action.payload,
        selectedModule: '' // Reset dependent selection
      };
    case ACTION_TYPES.SET_MODULE:
      return {
        ...state,
        selectedModule: action.payload
      };
    case ACTION_TYPES.START_TEST:
      return {
        ...state,
        isTestRunning: true,
        testResults: null
      };
    case ACTION_TYPES.SET_TEST_RESULTS:
      return {
        ...state,
        isTestRunning: false,
        testResults: action.payload
      };
    case ACTION_TYPES.SHOW_RESULTS_MODAL:
      return {
        ...state,
        showResultsModal: true
      };
    case ACTION_TYPES.HIDE_RESULTS_MODAL:
      return {
        ...state,
        showResultsModal: false
      };
    case ACTION_TYPES.SET_CRUD_MODE:
      return {
        ...state,
        crudMode: action.payload
      };
    case ACTION_TYPES.SET_SELECTED_ITEM:
      return {
        ...state,
        selectedItem: action.payload
      };
    case ACTION_TYPES.RESET_SELECTIONS:
      return {
        ...initialState
      };
    default:
      return state;
  }
};

// Create context
const AppContext = createContext();

// Provider component
export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  // Helper functions
  const isDevelopmentEnvironment = () => {
    return state.selectedEnvironment === 'development';
  };

  const canRunTests = () => {
    return state.selectedEnvironment && state.selectedApplication && 
           state.selectedBuild && state.selectedModule;
  };

  const value = {
    state,
    dispatch,
    isDevelopmentEnvironment,
    canRunTests
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};

// Custom hook to use the context
export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};
