@echo off
REM Deployment Script for Split Hosting (Windows)
REM Frontend: cPanel | Backend: Vercel

echo.
echo ================================
echo AuditOps Split Deployment Script
echo ================================
echo.

REM Check if .env.production exists in client folder
if not exist "client\.env.production" (
    echo [ERROR] client\.env.production not found!
    echo.
    echo Please create it from .env.frontend.example
    echo.
    echo Example:
    echo   copy .env.frontend.example client\.env.production
    echo   Then edit client\.env.production with your backend URL
    echo.
    pause
    exit /b 1
)

echo [OK] Found client\.env.production
echo.

REM Build the project
echo [BUILD] Building project...
call npm run build

if errorlevel 1 (
    echo [ERROR] Build failed!
    pause
    exit /b 1
)

echo [OK] Build successful!
echo.

echo.
echo ================================
echo Next Steps
echo ================================
echo.
echo FRONTEND (cPanel):
echo 1. Go to cPanel File Manager
echo 2. Navigate to public_html/
echo 3. Upload all files from dist\public\ folder
echo 4. Make sure index.html is in public_html/
echo.
echo BACKEND (Vercel):
echo 1. Run: vercel --prod
echo 2. Set environment variables in Vercel dashboard
echo 3. Copy the deployment URL
echo.
echo IMPORTANT:
echo - If backend URL changes, update client\.env.production
echo - Rebuild and re-upload frontend
echo - Add your cPanel domain to CORS_ORIGIN in Vercel
echo.
echo [DONE] Frontend files are in: dist\public\
echo.
pause
