@echo off
echo Building extension...
call npm run build
if %errorlevel% neq 0 (
    echo Build failed! Aborting release.
    exit /b %errorlevel%
)

echo Creating release package...
if exist "release" rd "release" /s /q
if exist "release.zip" del "release.zip"

mkdir "release"

REM Copy only necessary files for the extension
xcopy built release\built\ /e /y
xcopy icons release\icons\ /e /y
xcopy resources release\resources\ /e /y
xcopy src\browser_action\*.html release\src\browser_action\ /y
echo f | xcopy manifest.json release\manifest.json /y

REM Clean up source maps and unnecessary files
cd release
del /s /q "*.map" >nul 2>&1

echo.
echo Release package created in 'release' folder
echo Ready to zip and upload to Chrome Web Store!
cd ..