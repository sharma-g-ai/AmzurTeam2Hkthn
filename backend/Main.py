from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional
import asyncio
import random

app = FastAPI(title="AI Test Master Backend API", version="1.0.0")

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://frontend:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Pydantic models
class TestConfig(BaseModel):
    environment: str
    application: str
    build: str
    module: str
    test_type: str

class TestResult(BaseModel):
    test_id: str
    status: str
    duration: int
    details: str
    timestamp: str

@app.get("/")
async def root():
    return {"message": "AI Test Master Backend API is running!", "version": "1.0.0"}

@app.get("/health")
async def health_check():
    return {"status": "healthy", "service": "ai-test-master-backend"}

@app.post("/api/tests/run")
async def run_tests(test_config: TestConfig):
    """
    Execute tests based on configuration
    """
    # Simulate test execution time
    await asyncio.sleep(random.uniform(2, 5))
    
    # Simulate test results
    success_rate = 0.8  # 80% success rate
    is_success = random.random() < success_rate
    
    result = {
        "test_id": f"test_{random.randint(1000, 9999)}",
        "status": "success" if is_success else "failed",
        "duration": random.randint(1000, 5000),
        "details": "All tests passed successfully" if is_success else "Some tests failed",
        "config": test_config.dict(),
        "smoke_test": {
            "status": "success" if is_success else "failed",
            "duration": random.randint(500, 2000)
        },
        "sanity_test": {
            "status": "success" if is_success else "failed", 
            "duration": random.randint(500, 2000)
        }
    }
    
    return result

@app.get("/api/environments")
async def get_environments():
    """
    Get available environments
    """
    return [
        {"value": "development", "label": "Development"},
        {"value": "qa", "label": "Quality Assurance"}, 
        {"value": "uat", "label": "User Acceptance Testing"},
        {"value": "production", "label": "Production"}
    ]

@app.get("/api/applications")
async def get_applications(environment: Optional[str] = None):
    """
    Get applications for specific environment
    """
    apps = [
        {"id": 1, "name": "Web Portal", "environment": "development"},
        {"id": 2, "name": "Mobile App", "environment": "development"},
        {"id": 3, "name": "API Gateway", "environment": "qa"},
        {"id": 4, "name": "Analytics Dashboard", "environment": "uat"},
        {"id": 5, "name": "Payment Service", "environment": "production"}
    ]
    
    if environment:
        apps = [app for app in apps if app["environment"] == environment]
    
    return apps

@app.get("/api/builds")
async def get_builds(application_id: Optional[int] = None):
    """
    Get builds for specific application
    """
    builds = [
        {"id": 1, "name": "Build 1.0.0", "applicationId": 1, "status": "success"},
        {"id": 2, "name": "Build 1.0.1", "applicationId": 1, "status": "pending"},
        {"id": 3, "name": "Build 2.0.0", "applicationId": 2, "status": "success"},
        {"id": 4, "name": "Build 1.5.0", "applicationId": 3, "status": "failed"},
        {"id": 5, "name": "Build 3.0.0", "applicationId": 4, "status": "success"}
    ]
    
    if application_id:
        builds = [build for build in builds if build["applicationId"] == application_id]
    
    return builds

@app.get("/api/modules")
async def get_modules(build_id: Optional[int] = None):
    """
    Get modules for specific build
    """
    modules = [
        {"id": 1, "name": "Authentication Module", "buildId": 1},
        {"id": 2, "name": "User Management", "buildId": 1},
        {"id": 3, "name": "Payment Processing", "buildId": 2},
        {"id": 4, "name": "Notification Service", "buildId": 3},
        {"id": 5, "name": "Reporting Module", "buildId": 4}
    ]
    
    if build_id:
        modules = [module for module in modules if module["buildId"] == build_id]
    
    return modules
