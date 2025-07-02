#!/usr/bin/env pwsh

Write-Host "🧪 AI Test Master - Setup Validation Script" -ForegroundColor Cyan
Write-Host "=" * 50 -ForegroundColor Cyan
Write-Host ""

# Test 1: Check Docker
Write-Host "📦 Checking Docker..." -ForegroundColor Yellow
try {
    $dockerVersion = docker --version
    Write-Host "✅ Docker found: $dockerVersion" -ForegroundColor Green
} catch {
    Write-Host "❌ Docker not found or not running" -ForegroundColor Red
    exit 1
}

# Test 2: Check Docker Compose
Write-Host "🐳 Checking Docker Compose..." -ForegroundColor Yellow
try {
    $composeVersion = docker-compose --version
    Write-Host "✅ Docker Compose found: $composeVersion" -ForegroundColor Green
} catch {
    Write-Host "❌ Docker Compose not found" -ForegroundColor Red
    exit 1
}

# Test 3: Validate Project Structure
Write-Host "📁 Checking project structure..." -ForegroundColor Yellow
$requiredFiles = @(
    "docker-compose.yml",
    "frontend/Dockerfile",
    "frontend/package.json",
    "backend/Dockerfile", 
    "backend/Main.py",
    "backend/requirements.txt"
)

foreach ($file in $requiredFiles) {
    if (Test-Path $file) {
        Write-Host "✅ Found: $file" -ForegroundColor Green
    } else {
        Write-Host "❌ Missing: $file" -ForegroundColor Red
        exit 1
    }
}

# Test 4: Validate package.json dependencies
Write-Host "📦 Checking frontend dependencies..." -ForegroundColor Yellow
$packageJson = Get-Content "frontend/package.json" | ConvertFrom-Json
$requiredDeps = @("react", "react-dom", "react-router-dom", "react-scripts")

foreach ($dep in $requiredDeps) {
    if ($packageJson.dependencies.PSObject.Properties.Name -contains $dep) {
        Write-Host "✅ Found dependency: $dep" -ForegroundColor Green
    } else {
        Write-Host "❌ Missing dependency: $dep" -ForegroundColor Red
    }
}

# Test 5: Validate backend requirements
Write-Host "🐍 Checking backend dependencies..." -ForegroundColor Yellow
$requirements = Get-Content "backend/requirements.txt"
$requiredPkgs = @("fastapi", "uvicorn", "pydantic")

foreach ($pkg in $requiredPkgs) {
    $found = $requirements | Where-Object { $_ -like "*$pkg*" }
    if ($found) {
        Write-Host "✅ Found package: $pkg" -ForegroundColor Green
    } else {
        Write-Host "❌ Missing package: $pkg" -ForegroundColor Red
    }
}

Write-Host ""
Write-Host "🎉 Setup validation complete!" -ForegroundColor Cyan
Write-Host ""
Write-Host "📋 Next Steps:" -ForegroundColor Yellow
Write-Host "1. Run: docker-compose up --build" -ForegroundColor White
Write-Host "2. Open: http://localhost:3000 (Frontend)" -ForegroundColor White
Write-Host "3. Open: http://localhost:8000/docs (API Docs)" -ForegroundColor White
Write-Host ""
Write-Host "🚀 Or use the startup scripts:" -ForegroundColor Yellow
Write-Host "   - start-dev.bat (Windows)" -ForegroundColor White
Write-Host "   - start-dev.ps1 (PowerShell)" -ForegroundColor White

Read-Host "Press Enter to exit"
