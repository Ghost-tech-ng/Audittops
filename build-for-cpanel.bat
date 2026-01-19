@echo off
echo ========================================
echo Building Frontend for cPanel Upload
echo ========================================
echo.

REM Update environment to point to Render backend
echo Step 1: Updating environment configuration...
echo VITE_API_URL=https://audittops.onrender.com/api > client\.env.production
echo Environment updated!
echo.

REM Build the frontend
echo Step 2: Building frontend...
call npm run build
if %errorlevel% neq 0 (
    echo Build failed! Please check for errors.
    pause
    exit /b 1
)
echo.

echo ========================================
echo Build Complete!
echo ========================================
echo.
echo Files ready for upload are in: dist\public\
echo.
echo Next steps:
echo 1. Go to your cPanel File Manager
echo 2. Navigate to public_html (or your domain folder)
echo 3. Upload ALL files from dist\public\ folder
echo 4. Make sure to upload the 'assets' folder too
echo.
echo After upload, update CORS_ORIGIN in Render:
echo CORS_ORIGIN=https://yourdomain.com
echo.
pause
