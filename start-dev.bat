@echo off
echo Starting AI Test Master Development Environment...
echo.

REM Check if running as administrator
net session >nul 2>&1
if %errorlevel% neq 0 (
    echo Warning: Not running as administrator. This may cause Docker connection issues.
    echo If you encounter problems, try running as administrator.
    echo.
)

REM Check if Docker Desktop is running
echo Checking Docker Desktop status...
docker version >nul 2>&1
if %errorlevel% neq 0 (
    echo Error: Docker is not running or not accessible.
    echo.
    echo Troubleshooting steps:
    echo 1. Make sure Docker Desktop is installed and running
    echo 2. Try running this script as Administrator
    echo 3. Restart Docker Desktop if it's already running
    echo 4. Check if Docker Desktop is starting up (may take a few minutes)
    echo.
    echo Attempting to start Docker Desktop...
    start "" "C:\Program Files\Docker\Docker\Docker Desktop.exe" 2>nul
    if %errorlevel% neq 0 (
        echo Could not start Docker Desktop automatically.
        echo Please start Docker Desktop manually and try again.
    ) else (
        echo Docker Desktop launch initiated. Waiting for startup...
        timeout /t 30 /nobreak >nul
        docker version >nul 2>&1
        if %errorlevel% neq 0 (
            echo Docker still not ready. Please wait for Docker Desktop to fully start.
        )
    )
    pause
    exit /b 1
)

echo Docker is running successfully!
echo.

REM Clean up any existing containers
echo Cleaning up existing containers...
docker-compose down >nul 2>&1

echo Building and starting containers...
echo This may take a few minutes on first run...
echo.

REM Build and start containers with better error handling
docker-compose up --build
if %errorlevel% neq 0 (
    echo.
    echo Error occurred during container startup.
    echo Check the error messages above for details.
    echo.
    echo Common solutions:
    echo 1. Ensure ports 3000 and 8000 are not in use
    echo 2. Try: docker-compose down --remove-orphans
    echo 3. Try: docker system prune (removes unused containers/images)
    echo.
    pause
    exit /b 1
)

echo.
echo Services stopped. Cleaning up...
docker-compose down

echo.
echo Development session completed successfully!
pause
