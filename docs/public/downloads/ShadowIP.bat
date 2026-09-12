@echo off
title Reset Windows Network
echo ========================================
echo       NETWORK RESET
echo ========================================
echo.

echo [1/5] Resetting Winsock...
netsh winsock reset
echo.

echo [2/5] Resetting TCP/IP...
netsh int ip reset
echo.

echo [3/5] Releasing IP address...
ipconfig /release
echo.

echo [4/5] Renewing IP address...
ipconfig /renew
echo.

echo [5/5] Clearing DNS cache...
ipconfig /flushdns
echo.

echo ========================================
echo          OPERATION COMPLETED
echo ========================================
echo.
echo Restart your PC before launching Game again.
echo.
pause