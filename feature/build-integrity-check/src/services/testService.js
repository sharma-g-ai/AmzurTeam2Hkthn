import { TEST_TYPES, TEST_STATUS } from '../utils/constants';

// Simulate API delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const testService = {
  // Execute smoke and sanity tests
  async runTests(testConfig) {
    const { environment, application, build, module } = testConfig;
    
    console.log('Starting tests for:', testConfig);
    
    // Simulate test execution time (3-5 seconds)
    const testDuration = Math.random() * 2000 + 3000;
    await delay(testDuration);
    
    // Simulate random test results (80% success rate)
    const isSuccess = Math.random() > 0.2;
    
    const smokeTestResult = {
      type: TEST_TYPES.SMOKE,
      status: isSuccess ? TEST_STATUS.SUCCESS : TEST_STATUS.FAILED,
      duration: Math.floor(testDuration / 2),
      details: isSuccess 
        ? 'All smoke tests passed successfully' 
        : 'Some smoke tests failed. Check logs for details.'
    };
    
    const sanityTestResult = {
      type: TEST_TYPES.SANITY,
      status: isSuccess ? TEST_STATUS.SUCCESS : TEST_STATUS.FAILED,
      duration: Math.floor(testDuration / 2),
      details: isSuccess 
        ? 'All sanity tests passed successfully' 
        : 'Some sanity tests failed. Check logs for details.'
    };
    
    const overallResult = {
      overall: isSuccess ? TEST_STATUS.SUCCESS : TEST_STATUS.FAILED,
      timestamp: new Date().toISOString(),
      environment,
      application,
      build,
      module,
      tests: [smokeTestResult, sanityTestResult],
      totalDuration: testDuration,
      documentsAvailable: isSuccess, // Documents only available on success
      canContinue: isSuccess // Can only continue on success
    };
    
    return overallResult;
  },

  // Get test documents (BIC-009)
  async getTestDocuments(testResultId) {
    await delay(1000);
    
    // Mock documents
    const documents = [
      {
        id: 1,
        name: 'Test Execution Report',
        type: 'PDF',
        size: '1.2 MB',
        url: '/documents/test-execution-report.pdf'
      },
      {
        id: 2,
        name: 'Code Coverage Report',
        type: 'HTML',
        size: '856 KB',
        url: '/documents/code-coverage-report.html'
      },
      {
        id: 3,
        name: 'Performance Metrics',
        type: 'JSON',
        size: '45 KB',
        url: '/documents/performance-metrics.json'
      }
    ];
    
    return documents;
  },

  // Proceed to recommended testing (BIC-010)
  async getRecommendedTests(testConfig) {
    await delay(800);
    
    // Mock recommended tests based on the current test results
    const recommendations = [
      {
        id: 1,
        name: 'Integration Tests',
        priority: 'High',
        estimatedDuration: '30 minutes',
        description: 'Test integration between modules'
      },
      {
        id: 2,
        name: 'Load Testing',
        priority: 'Medium',
        estimatedDuration: '45 minutes',
        description: 'Test application under load'
      },
      {
        id: 3,
        name: 'Security Testing',
        priority: 'High',
        estimatedDuration: '60 minutes',
        description: 'Validate security measures'
      }
    ];
    
    return recommendations;
  }
};
