@echo off
chcp 65001 >nul
echo ================================================================================
echo 🎬 АУДИТОР ПРОЕКТОВ ПО INSTAGRAM REELS (1, 2, 3)
echo ================================================================================
if "%~1"=="" (
    echo [INFO] Запуск аудита текущего проекта...
    python "%~dp0scripts\reels_auditor.py"
) else (
    echo [INFO] Запуск аудита для: %~1
    python "%~dp0scripts\reels_auditor.py" --target "%~1"
)
echo.
pause
