# Docker Setup & Troubleshooting Guide

## 🚨 Current Issues & Solutions

### Issue 1: Docker Compose Version Warning
**Fixed!** ✅ Removed obsolete `version: '3.8'` from docker-compose.yml

### Issue 2: Docker Daemon Connection Error
This error means Docker Desktop isn't running or accessible.

### Issue 3: Docker Build Getting Stuck 🔄
**Common Issue!** This happens during first build or when downloading dependencies.

#### Possible Reasons:
1. **Large downloads** - npm/pip installing packages (can take 5-15 minutes)
2. **Network issues** - Slow internet or proxy blocking downloads
3. **Resource constraints** - Docker needs more memory/CPU
4. **Base image downloads** - Python/Node images are large (500MB+)
5. **Antivirus interference** - Security software blocking Docker operations

#### Solutions:
```bash
# 1. WAIT - First builds can take 10-15 minutes!
# Look for these signs it's working:
# - "downloading" messages
# - "RUN npm install" or "RUN pip install"
# - Network activity in Task Manager

# 2. Check what's happening (in another terminal):
docker-compose logs
docker ps
docker images

# 3. If truly stuck (no output for 10+ minutes):
Ctrl+C
docker-compose down
docker system prune -f
docker-compose up --build --verbose

# 4. If still stuck, try one service at a time:
docker-compose up --build backend
# Wait for backend to finish, then:
docker-compose up --build frontend
```

### Issue 4: Docker Consistently Getting Stuck/Blocked 🚫
**Critical Issue!** When all Docker commands fail or hang.

#### Emergency Solutions:

**🚨 IMMEDIATE FIX - Skip Docker Entirely:**
```bash
# Stop all Docker processes
taskkill /f /im "Docker Desktop.exe" 2>nul
docker-compose down --remove-orphans 2>nul

# Run services individually (much faster and more reliable)
```

**Method A: Direct Backend Startup**
```bash
# Terminal 1 - Backend
cd "C:\Users\GeethaK.AMZURTECH\Desktop\ATM\AmzurTeam2Hkthn\backend"
python -m pip install --upgrade pip
pip install fastapi uvicorn pydantic python-multipart
uvicorn Main:app --host 127.0.0.1 --port 8000 --reload
```

**Method B: Direct Frontend Startup**
```bash
# Terminal 2 - Frontend (after backend is running)
cd "C:\Users\GeethaK.AMZURTECH\Desktop\ATM\AmzurTeam2Hkthn\frontend"
npm install
npm start
```

**🔧 Docker Reset Solutions:**
```bash
# 1. Nuclear option - Reset Docker completely
# Go to Docker Desktop → Settings → Reset → Reset to factory defaults

# 2. Clear all Docker data
docker system prune -a -f --volumes
docker builder prune -a -f

# 3. Restart Docker service
net stop com.docker.service
net start com.docker.service

# 4. Increase Docker resources
# Docker Desktop → Settings → Resources → Advanced
# RAM: 4GB+ | CPU: 4+ cores | Disk: 60GB+
```

## 🔧 Step-by-Step Solution

### Method 1: Quick Fix
1. **Open Docker Desktop** from Start Menu
2. **Wait 2-3 minutes** for complete startup (Docker logo should stop animating)
3. **Right-click Command Prompt** → "Run as Administrator"
4. **Navigate to project**: `cd "C:\Users\GeethaK.AMZURTECH\Desktop\ATM\AmzurTeam2Hkthn"`
5. **Run**: `docker-compose up --build`

### Method 2: Manual Startup (if scripts fail)

**Terminal Commands:**
```bash
# Navigate to project directory
cd "C:\Users\GeethaK.AMZURTECH\Desktop\ATM\AmzurTeam2Hkthn"

# Clean up any existing containers
docker-compose down --remove-orphans

# Build and start services
docker-compose up --build

# In another terminal, test the services:
# Frontend: http://localhost:3000
# Backend: http://localhost:8000
# API Docs: http://localhost:8000/docs
```

### Method 3: Alternative Development Setup

If Docker continues to cause issues, you can run the services individually:

**Backend (Terminal 1):**
```bash
cd backend
pip install -r requirements.txt
uvicorn Main:app --host 0.0.0.0 --port 8000 --reload
```

**Frontend (Terminal 2):**
```bash
cd frontend
npm install
npm start
```

## 🛠️ Troubleshooting Tools

1. **Run diagnostic script**: `docker-troubleshoot.bat`
2. **Check Docker status**: `docker version`
3. **Check running containers**: `docker ps`
4. **View logs**: `docker-compose logs`

## 🎯 Access Points After Startup

- **Frontend App**: http://localhost:3000
- **Backend API**: http://localhost:8000
- **API Documentation**: http://localhost:8000/docs
- **Health Check**: http://localhost:8000/health

## 🔍 Common Port Conflicts

If you get port errors:
```bash
# Check what's using the ports
netstat -an | findstr ":3000"
netstat -an | findstr ":8000"

# Kill processes if needed, or modify docker-compose.yml ports
```

## 📱 Quick Status Check

After starting, verify these URLs work:
- ✅ http://localhost:8000/health → Should return `{"status": "healthy"}`
- ✅ http://localhost:3000 → Should show React app
- ✅ http://localhost:8000/docs → Should show API documentation

## 🆘 If All Else Fails

1. **Restart Docker Desktop** completely
2. **Run the troubleshoot script**: `docker-troubleshoot.bat`
3. **Try individual component startup** (Method 3 above)
4. **Check Windows Services** for "Docker Desktop Service"

Your project is properly configured - it's just a Docker Desktop connectivity issue!
