\
@echo off
REM Windows helper to install deps and run dev server
IF NOT EXIST node_modules (
  echo Installing dependencies...
  npm install
)
echo Starting dev server...
npm run dev
pause
