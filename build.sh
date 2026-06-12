#!/bin/bash
# Build script for Render deployment
# This builds the React app and prepares it for Flask to serve

echo "📦 Building React application..."

# Navigate to react app
cd chat-react

# Install dependencies
npm install

# Build React app
npm run build

# Navigate back to root
cd ..

# Create static directory if it doesn't exist
mkdir -p static
mkdir -p templates

# Copy React build files to Flask static folder
# This allows Flask to serve the React app
cp -r chat-react/build/* static/

echo "✅ Build complete! React app is ready to be served by Flask."
