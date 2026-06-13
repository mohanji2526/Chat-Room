#!/bin/bash
# Build script for Render deployment
# This builds the React app and prepares it directly for Flask to serve

# Exit on error to prevent partial deployments
set -e

echo "🐍 Installing Python dependencies..."
# Upgrade pip just to be safe, then install from your requirements file
python -m pip install --upgrade pip
pip install -r requirements.txt

echo "📦 Building React application directly into Flask static folder..."

# Navigate to react app
cd chat-react

# Install dependencies
npm install

# Build React app and route output directly to the parent directory's 'static' folder
BUILD_PATH="../static" npm run build

# Navigate back to root
cd ..

echo "✅ Build complete! React files have been built directly into the static folder."