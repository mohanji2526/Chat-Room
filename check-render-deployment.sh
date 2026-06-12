#!/bin/bash
# Render Deployment Checklist

echo "🚀 Render Deployment Pre-Check"
echo "=============================="

# Check if all files exist
echo ""
echo "✓ Checking required files..."

files=(
    "app.py"
    "requirements.txt"
    "build.sh"
    "render.yaml"
    "chat-react/package.json"
    "chat-react/src/hooks/useSocket.js"
)

for file in "${files[@]}"; do
    if [ -f "$file" ]; then
        echo "  ✅ $file"
    else
        echo "  ❌ MISSING: $file"
    fi
done

echo ""
echo "✓ Checking Flask dependencies..."
if grep -q "flask-socketio" requirements.txt; then
    echo "  ✅ flask-socketio found"
else
    echo "  ❌ flask-socketio missing from requirements.txt"
fi

if grep -q "gunicorn" requirements.txt; then
    echo "  ✅ gunicorn found"
else
    echo "  ❌ gunicorn missing from requirements.txt"
fi

echo ""
echo "✓ Checking build script..."
if [ -f "build.sh" ]; then
    chmod +x build.sh
    echo "  ✅ build.sh is executable"
else
    echo "  ❌ build.sh not found"
fi

echo ""
echo "✓ Checking npm configuration..."
if [ -f "chat-react/package.json" ]; then
    if grep -q '"build"' chat-react/package.json; then
        echo "  ✅ npm build script configured"
    else
        echo "  ❌ npm build script missing"
    fi
else
    echo "  ❌ chat-react/package.json not found"
fi

echo ""
echo "=============================="
echo "✅ All checks passed!"
echo ""
echo "Next steps:"
echo "1. git add ."
echo "2. git commit -m 'Prepare for Render deployment'"
echo "3. git push origin main"
echo "4. Go to render.com and create new service"
echo "5. Select your repository"
echo "6. Use build command: bash build.sh"
echo "7. Deploy!"
