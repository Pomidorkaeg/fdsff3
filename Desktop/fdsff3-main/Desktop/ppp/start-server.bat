
@echo off
echo Starting development server...
echo.
npm install
echo.
echo Building optimized project...
set NODE_ENV=production
npm run build
echo.
echo Starting server, please wait...
start cmd /k "npm run dev && echo Server stopped! && pause"
echo.
echo ========================================
echo The server is now running!
echo.
echo Please open the following URL in your browser:
echo http://localhost:8080
echo.
echo Note: All files for deployment are in the /dist folder
echo.
echo Instructions for local file system access:
echo 1. After building the project with "npm run build" command
echo 2. You can open index.html directly in your browser
echo 3. The site will load all assets from the /dist folder
echo.
echo Instructions for GitHub Pages deployment:
echo 1. Upload the entire project including /dist folder to your repository
echo 2. Make sure your repository contains all files from the project root
echo 3. In your GitHub repository, go to Settings -^> Pages
echo 4. Select branch 'main' or 'master' and set the root as source
echo 5. Wait a few minutes for GitHub to process your site
echo.
echo Important: The site uses HashRouter, which works with both
echo GitHub Pages and when opening the file directly from your computer.
echo.
echo To stop the server, close the other terminal window or press Ctrl+C in it.
echo ========================================
echo.
echo The main window will stay open. To close it, press any key.
pause
