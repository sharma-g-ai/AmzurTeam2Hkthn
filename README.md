# AI Test Master - AmzurTeam2Hkthn
Team2 Code for Amzur Hackathon - AI-powered Test Automation Platform

## 🚀 Project Overview

AI Test Master is a comprehensive test automation platform that provides build integrity checking, test execution, and AI-powered test recommendations. The platform consists of a React frontend and FastAPI backend, fully containerized with Docker.

### ✨ Key Features
- **Environment-based Testing**: Support for Development, QA, UAT, and Production environments
- **Build Integrity Checks**: Automated smoke and sanity testing
- **AI Test Recommendations**: Intelligent test suggestions based on build analysis
- **Real-time Test Execution**: Live test execution with detailed reporting
- **Document Generation**: Automated test reports and coverage analysis
- **Modern UI**: Professional dashboard with responsive design

## 🏗️ Architecture

```
┌─────────────────┐    ┌─────────────────┐
│   React Frontend │────│  FastAPI Backend │
│   (Port 3000)    │    │   (Port 8000)    │
└─────────────────┘    └─────────────────┘
        │                       │
        └───────────────────────┘
                   │
            ┌──────────────┐
            │    Docker    │
            │  Compose     │
            └──────────────┘
```

## 🛠️ Technology Stack

### Frontend
- **React 18.2** - Component-based UI framework
- **React Router DOM** - Client-side routing
- **Context API** - State management
- **Modern CSS** - Grid, Flexbox, and custom styling

### Backend
- **FastAPI** - High-performance Python web framework
- **Pydantic** - Data validation and serialization
- **Uvicorn** - ASGI server
- **CORS Middleware** - Cross-origin resource sharing

### DevOps
- **Docker** - Containerization
- **Docker Compose** - Multi-container orchestration
- **Hot Reload** - Development-friendly setup

## 🚀 Quick Start

### Prerequisites
- Docker Desktop installed and running
- Git (for cloning)

### 1. Clone and Setup
```bash
git clone <repository-url>
cd AmzurTeam2Hkthn
```

### 2. Start with Docker (Recommended)
```bash
# Build and start all services
docker-compose up --build

# Or run in background
docker-compose up --build -d
```

### 3. Access Applications
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:8000
- **API Documentation**: http://localhost:8000/docs

### 4. Stop Services
```bash
docker-compose down
```

## 🧪 Development Setup

### Frontend Development
```bash
cd frontend
npm install
npm start
```

### Backend Development
```bash
cd backend
pip install -r requirements.txt
uvicorn Main:app --host 0.0.0.0 --port 8000 --reload
```

## 📁 Project Structure

```
AmzurTeam2Hkthn/
├── docker-compose.yml          # Container orchestration
├── README.md                   # Project documentation
├── backend/                    # FastAPI backend
│   ├── Dockerfile             # Backend container config
│   ├── Main.py                # Main FastAPI application
│   └── requirements.txt       # Python dependencies
└── frontend/                  # React frontend
    ├── Dockerfile             # Frontend container config
    ├── package.json           # Node.js dependencies
    ├── public/                # Static assets
    └── src/                   # Source code
        ├── components/        # React components
        │   ├── Common/        # Reusable components
        │   ├── CRUD/          # CRUD operations
        │   ├── Dashboard/     # Dashboard components
        │   └── Testing/       # Test execution components
        ├── context/           # React Context for state
        ├── services/          # API service layer
        └── utils/             # Utilities and constants
```

## 🔧 Configuration

### Environment Variables
- **Backend**: `PYTHONPATH=/app`
- **Frontend**: Proxy configured to backend

### Port Configuration
- Frontend: `3000`
- Backend: `8000`

### Docker Networks
- Network: `app-network` (bridge driver)
- Services can communicate using service names

## 🎯 Usage Guide

### 1. Environment Selection
- Choose from Development, QA, UAT, or Production
- Each environment has different applications and builds

### 2. Application Configuration
- Select Application → Build → Module hierarchy
- Each selection filters the next level options

### 3. Test Execution
- Run Smoke and Sanity tests
- View real-time progress and results
- Download generated test documents

### 4. AI Recommendations
- Get intelligent test suggestions
- Based on build analysis and historical data
- Prioritized recommendations with time estimates

## 🛠️ API Endpoints

### Core Endpoints
- `GET /` - API status
- `GET /health` - Health check
- `POST /api/tests/run` - Execute tests
- `GET /api/environments` - Get environments
- `GET /api/applications` - Get applications
- `GET /api/builds` - Get builds
- `GET /api/modules` - Get modules

### Test Execution
```json
POST /api/tests/run
{
  "environment": "development",
  "application": "Web Portal",
  "build": "Build 1.0.0",
  "module": "Authentication Module",
  "test_type": "both"
}
```

## 🔍 Troubleshooting

### Common Issues

1. **Docker not starting**
   - Ensure Docker Desktop is running
   - Check Docker daemon status

2. **Port conflicts**
   - Ensure ports 3000 and 8000 are available
   - Stop other services using these ports

3. **Build failures**
   - Clear Docker cache: `docker system prune`
   - Rebuild: `docker-compose up --build --force-recreate`

4. **Backend connection issues**
   - Check if backend is healthy: http://localhost:8000/health
   - Review docker-compose logs: `docker-compose logs backend`

### Development Tips

1. **Hot Reload**: Both frontend and backend support hot reload
2. **Volume Mounts**: Code changes reflect immediately
3. **Debugging**: Use browser dev tools and backend logs
4. **API Testing**: Use http://localhost:8000/docs for interactive API testing

## 📊 Features in Detail

### Dashboard Components
- **AITestDashboard**: Main overview with statistics
- **BuildIntegrityDashboard**: Core testing interface
- **QAEngineerDashboard**: Specialized QA view

### State Management
- Context API with reducer pattern
- Centralized state for test configuration
- Real-time updates during test execution

### Test Services
- Backend integration with fallback to mock data
- Realistic test execution simulation
- Document generation and retrieval

## 🚀 Deployment

### Production Considerations
1. Update CORS origins for production domains
2. Use production-grade database
3. Implement proper authentication
4. Add monitoring and logging
5. Use environment-specific configurations

### Scaling
- Frontend can be served from CDN
- Backend can be horizontally scaled
- Add Redis for session management
- Implement load balancing

## 🤝 Contributing

1. Fork the repository
2. Create feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📝 License

This project is part of the Amzur Hackathon and is developed by Team2.

---

**Happy Testing! 🧪✨**
