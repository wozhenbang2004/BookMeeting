@echo off
echo ========================================
echo    Debug Launcher - Find Problems
echo ========================================
echo.

cd /d "%~dp0"

echo Current Directory: %CD%
echo.

echo Checking Java Environment...
java -version
if %errorlevel% neq 0 (
    echo ERROR: Java not found or not configured in PATH
    pause
    exit /b 1
)
echo.

echo Checking Maven Environment...
mvn -version
if %errorlevel% neq 0 (
    echo ERROR: Maven not found or not configured in PATH
    pause
    exit /b 1
)
echo.

echo Checking pom.xml file...
if not exist pom.xml (
    echo ERROR: pom.xml file not found
    echo Please make sure to run this script in project root directory
    pause
    exit /b 1
)
echo pom.xml file exists
echo.

echo Environment check completed!
echo.
echo Now trying to compile...
mvn clean compile
echo.
echo Compile command completed, error level: %errorlevel%
echo.

if %errorlevel% neq 0 (
    echo Compilation failed! Please check error messages above
) else (
    echo Compilation successful! Now trying to start...
    echo.
    mvn spring-boot:run
)

echo.
echo Script execution completed
pause
