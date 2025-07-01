import { MOCK_APPLICATIONS, MOCK_BUILDS, MOCK_MODULES } from '../utils/constants';

// Simulate API delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const buildService = {
  // Get applications based on environment
  async getApplications(environment) {
    await delay(500);
    // In real implementation, this would filter by environment
    return MOCK_APPLICATIONS;
  },

  // Get builds for a specific application
  async getBuilds(applicationId) {
    await delay(500);
    return MOCK_BUILDS.filter(build => build.applicationId === parseInt(applicationId));
  },

  // Get modules for a specific build
  async getModules(buildId) {
    await delay(500);
    return MOCK_MODULES.filter(module => module.buildId === parseInt(buildId));
  },

  // CRUD operations for Development environment
  async createApplication(applicationData) {
    await delay(800);
    const newApp = {
      id: Date.now(),
      ...applicationData,
      environment: 'development'
    };
    // In real implementation, this would make an API call
    console.log('Created application:', newApp);
    return newApp;
  },

  async updateApplication(id, applicationData) {
    await delay(800);
    // In real implementation, this would make an API call
    console.log('Updated application:', id, applicationData);
    return { id, ...applicationData };
  },

  async deleteApplication(id) {
    await delay(800);
    // In real implementation, this would make an API call
    console.log('Deleted application:', id);
    return { success: true };
  },

  async createBuild(buildData) {
    await delay(800);
    const newBuild = {
      id: Date.now(),
      ...buildData,
      status: 'pending'
    };
    console.log('Created build:', newBuild);
    return newBuild;
  },

  async updateBuild(id, buildData) {
    await delay(800);
    console.log('Updated build:', id, buildData);
    return { id, ...buildData };
  },

  async deleteBuild(id) {
    await delay(800);
    console.log('Deleted build:', id);
    return { success: true };
  },

  async createModule(moduleData) {
    await delay(800);
    const newModule = {
      id: Date.now(),
      ...moduleData
    };
    console.log('Created module:', newModule);
    return newModule;
  },

  async updateModule(id, moduleData) {
    await delay(800);
    console.log('Updated module:', id, moduleData);
    return { id, ...moduleData };
  },

  async deleteModule(id) {
    await delay(800);
    console.log('Deleted module:', id);
    return { success: true };
  }
};
