#!/usr/bin/env pwsh

Write-Host "Starting AI Test Master Development Environment..." -ForegroundColor Green
Write-Host ""

# Check if running as admin (Windows only)
if ($IsWindows -or $env:OS -eq "Windows_NT") {
    $currentUser = [Security.Principal.WindowsIdentity]::GetCurrent()
    $principal = New-Object Security.Principal.WindowsPrincipal($currentUser)
    $isAdmin = $principal.IsInRole([Security.Principal.WindowsBuiltInRole]::Administrator)
    
    if (-not $isAdmin) {
        Write-Host "Warning: Not running as administrator. This may cause Docker connection issues." -ForegroundColor Yellow
        Write-Host "If you encounter problems, try running PowerShell as administrator." -ForegroundColor Yellow
        Write-Host ""
    }
}

# Check if Docker is running
Write-Host "Checking Docker Desktop status..." -ForegroundColor Yellow
try {
    docker version | Out-Null
    Write-Host "Docker is running successfully!" -ForegroundColor Green
} catch {
    Write-Host "Error: Docker is not running or not accessible." -ForegroundColor Red
    Write-Host ""
    Write-Host "Troubleshooting steps:" -ForegroundColor Yellow
    Write-Host "1. Make sure Docker Desktop is installed and running" -ForegroundColor White
    Write-Host "2. Try running PowerShell as Administrator" -ForegroundColor White
    Write-Host "3. Restart Docker Desktop if it's already running" -ForegroundColor White
    Write-Host "4. Check if Docker Desktop is starting up (may take a few minutes)" -ForegroundColor White
    Write-Host ""
    
    # Try to start Docker Desktop on Windows
    if ($IsWindows -or $env:OS -eq "Windows_NT") {
        Write-Host "Attempting to start Docker Desktop..." -ForegroundColor Yellow
        try {
            Start-Process "C:\Program Files\Docker\Docker\Docker Desktop.exe" -ErrorAction SilentlyContinue
            Write-Host "Docker Desktop launch initiated. Waiting for startup..." -ForegroundColor Yellow
            Start-Sleep -Seconds 30
            docker version | Out-Null
            Write-Host "Docker started successfully!" -ForegroundColor Green
        } catch {
            Write-Host "Could not start Docker Desktop automatically." -ForegroundColor Red
            Write-Host "Please start Docker Desktop manually and try again." -ForegroundColor Red
        }
    }
    
    Read-Host "Press Enter to exit"
    exit 1
}

Write-Host ""

# Clean up any existing containers
Write-Host "Cleaning up existing containers..." -ForegroundColor Yellow
try {
    docker-compose down | Out-Null
} catch {
    # Ignore errors during cleanup
}

# Build and start containers
Write-Host "Building and starting containers..." -ForegroundColor Yellow
Write-Host "This may take a few minutes on first run..." -ForegroundColor Yellow
Write-Host ""

try {
    docker-compose up --build
} catch {
    Write-Host ""
    Write-Host "Error occurred during container startup." -ForegroundColor Red
    Write-Host "Check the error messages above for details." -ForegroundColor Red
    Write-Host ""
    Write-Host "Common solutions:" -ForegroundColor Yellow
    Write-Host "1. Ensure ports 3000 and 8000 are not in use" -ForegroundColor White
    Write-Host "2. Try: docker-compose down --remove-orphans" -ForegroundColor White
    Write-Host "3. Try: docker system prune (removes unused containers/images)" -ForegroundColor White
    Write-Host ""
    Read-Host "Press Enter to exit"
    exit 1
}

Write-Host ""
Write-Host "Services stopped. Cleaning up..." -ForegroundColor Yellow
docker-compose down

Write-Host ""
Write-Host "Development session completed successfully!" -ForegroundColor Green
Read-Host "Press Enter to exit"
