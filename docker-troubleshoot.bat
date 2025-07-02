@echo off
echo Docker Troubleshooting Script for AI Test Master
echo ==============================================
echo.

echo 1. Checking if running as Administrator...
net session >nul 2>&1
if %errorlevel% equ 0 (
    echo ✓ Running as Administrator
) else (
    echo ✗ Not running as Administrator
    echo   Solution: Right-click and "Run as Administrator"
)
echo.

echo 2. Checking Docker installation...
where docker >nul 2>&1
if %errorlevel% equ 0 (
    echo ✓ Docker CLI found
) else (
    echo ✗ Docker CLI not found
    echo   Solution: Install Docker Desktop from https://docker.com
)
echo.

echo 3. Checking Docker Desktop process...
tasklist /FI "IMAGENAME eq Docker Desktop.exe" 2>NUL | find /I /N "Docker Desktop.exe" >nul
if %errorlevel% equ 0 (
    echo ✓ Docker Desktop process is running
) else (
    echo ✗ Docker Desktop process not found
    echo   Solution: Start Docker Desktop from Start Menu
)
echo.

echo 4. Checking Docker daemon connection...
docker version >nul 2>&1
if %errorlevel% equ 0 (
    echo ✓ Docker daemon is accessible
    docker version --format "Docker version: {{.Client.Version}}"
) else (
    echo ✗ Cannot connect to Docker daemon
    echo   Solutions:
    echo   - Wait for Docker Desktop to fully start (can take 2-3 minutes)
    echo   - Restart Docker Desktop
    echo   - Run this script as Administrator
    echo   - Check Windows Services for "Docker Desktop Service"
)
echo.

echo 5. Checking Docker Compose...
docker-compose version >nul 2>&1
if %errorlevel% equ 0 (
    echo ✓ Docker Compose is available
    docker-compose version --short
) else (
    echo ✗ Docker Compose not available
    echo   Solution: Update Docker Desktop to latest version
)
echo.

echo 6. Checking port availability...
netstat -an | findstr ":3000 " >nul
if %errorlevel% equ 0 (
    echo ✗ Port 3000 is in use
    echo   Solution: Stop the process using port 3000 or use different port
) else (
    echo ✓ Port 3000 is available
)

netstat -an | findstr ":8000 " >nul
if %errorlevel% equ 0 (
    echo ✗ Port 8000 is in use
    echo   Solution: Stop the process using port 8000 or use different port
) else (
    echo ✓ Port 8000 is available
)
echo.

echo 7. Checking project files...
if exist "docker-compose.yml" (
    echo ✓ docker-compose.yml found
) else (
    echo ✗ docker-compose.yml not found
    echo   Solution: Run this script from the project root directory
)

if exist "frontend\Dockerfile" (
    echo ✓ Frontend Dockerfile found
) else (
    echo ✗ Frontend Dockerfile not found
)

if exist "backend\Dockerfile" (
    echo ✓ Backend Dockerfile found
) else (
    echo ✗ Backend Dockerfile not found
)
echo.

echo 8. Quick fixes you can try:
echo.
echo    # Clean up Docker resources
echo    docker system prune -f
echo.
echo    # Remove project containers
echo    docker-compose down --remove-orphans
echo.
echo    # Restart Docker Desktop
echo    # 1. Right-click Docker Desktop system tray icon
echo    # 2. Select "Restart Docker Desktop"
echo    # 3. Wait 2-3 minutes for complete restart
echo.
echo    # Reset Docker Desktop (if all else fails)
echo    # 1. Docker Desktop Settings → Reset → Reset to factory defaults
echo.

echo Troubleshooting complete!
echo If issues persist, copy this output when asking for help.
echo.
pause
