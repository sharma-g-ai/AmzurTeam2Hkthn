// Constants for Build Integrity Check application

export const ENVIRONMENTS = {
  DEVELOPMENT: 'Development',
  QA: 'Quality Assurance',
  UAT: 'User Acceptance Testing',
  PRODUCTION: 'Production'
};

export const ENVIRONMENT_OPTIONS = [
  { value: 'development', label: ENVIRONMENTS.DEVELOPMENT },
  { value: 'qa', label: ENVIRONMENTS.QA },
  { value: 'uat', label: ENVIRONMENTS.UAT },
  { value: 'production', label: ENVIRONMENTS.PRODUCTION }
];

export const MOCK_APPLICATIONS = [
  { id: 1, name: 'Web Portal', environment: 'development' },
  { id: 2, name: 'Mobile App', environment: 'development' },
  { id: 3, name: 'API Gateway', environment: 'qa' },
  { id: 4, name: 'Analytics Dashboard', environment: 'uat' },
  { id: 5, name: 'Payment Service', environment: 'production' }
];

export const MOCK_BUILDS = [
  { id: 1, name: 'Build 1.0.0', applicationId: 1, status: 'success' },
  { id: 2, name: 'Build 1.0.1', applicationId: 1, status: 'pending' },
  { id: 3, name: 'Build 2.0.0', applicationId: 2, status: 'success' },
  { id: 4, name: 'Build 1.5.0', applicationId: 3, status: 'failed' },
  { id: 5, name: 'Build 3.0.0', applicationId: 4, status: 'success' }
];

export const MOCK_MODULES = [
  { id: 1, name: 'Authentication Module', buildId: 1 },
  { id: 2, name: 'User Management', buildId: 1 },
  { id: 3, name: 'Payment Processing', buildId: 2 },
  { id: 4, name: 'Notification Service', buildId: 3 },
  { id: 5, name: 'Reporting Module', buildId: 4 }
];

export const TEST_TYPES = {
  SMOKE: 'smoke',
  SANITY: 'sanity'
};

export const TEST_STATUS = {
  PENDING: 'pending',
  RUNNING: 'running',
  SUCCESS: 'success',
  FAILED: 'failed'
};
