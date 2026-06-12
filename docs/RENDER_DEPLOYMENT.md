# 🚀 Render Deployment Guide - Single Service

This guide explains how to deploy your Chat App with React frontend + Flask backend as a **single service** on Render.

## ✨ Architecture

```
┌─────────────────────────────────────┐
│      Render Web Service             │
├─────────────────────────────────────┤
│  Frontend: React (Static Files)     │
│  Backend: Flask + Socket.IO         │
│  Port: 10000 (Render assigns)       │
└─────────────────────────────────────┘
```

Both frontend and backend run in **one container** on Render.

---

## 📋 Prerequisites

- GitHub account (to connect your repo)
- Render account (free tier available at [render.com](https://render.com))
- Your project pushed to GitHub

---

## 🔧 Setup Steps

### Step 1: Prepare Your Repository

Make sure your GitHub repo has:

```
Chat-Server/
├── app.py              ✅ Flask backend
├── requirements.txt    ✅ Python dependencies
├── build.sh            ✅ Build script
├── render.yaml         ✅ Render config
├── docs/               ✅ Documentation
└── chat-react/         ✅ React frontend
    ├── package.json
    ├── public/
    └── src/
```

### Step 2: Create Render Service

1. Go to [https://dashboard.render.com](https://dashboard.render.com)
2. Click **New +** → **Web Service**
3. Select **Connect a repository** (or use public repo URL)
4. Choose your GitHub repository
5. Fill in the configuration:

| Setting           | Value                                                                |
| ----------------- | -------------------------------------------------------------------- |
| **Name**          | `chat-server` (or your choice)                                       |
| **Environment**   | `Python 3`                                                           |
| **Build Command** | `bash build.sh`                                                      |
| **Start Command** | `gunicorn --worker-class eventlet -w 1 --bind 0.0.0.0:$PORT app:app` |
| **Plan**          | Free (or Starter)                                                    |

### Step 3: Set Environment Variables

In Render dashboard:

1. Go to **Environment** tab
2. Add these variables:

```
SECRET_KEY = your-super-secret-key-here-change-this
PYTHON_VERSION = 3.11.7
```

### Step 4: Deploy

Click **Create Web Service** and Render will:

1. ✅ Build your React app (bash build.sh)
2. ✅ Copy React files to Flask static folder
3. ✅ Install Python dependencies
4. ✅ Start Flask server with Socket.IO
5. ✅ Serve React frontend + API together

---

## 📊 Build Process Explained

When you deploy, Render runs:

```bash
# 1. Build script runs
bash build.sh
  └─ cd chat-react
  └─ npm install
  └─ npm run build         # Creates chat-react/build/
  └─ cp build/* to static/

# 2. Start command runs
gunicorn --worker-class eventlet -w 1 --bind 0.0.0.0:$PORT app:app
  └─ Flask serves static React files
  └─ Socket.IO handles real-time messages
```

---

## 🌐 Accessing Your App

After deployment, your app will be at:

```
https://chat-server.onrender.com
```

_(Replace "chat-server" with your service name)_

---

## 🔗 Socket.IO Connection

The React app automatically connects to the same server (no changes needed):

```javascript
// In src/hooks/useSocket.js
const newSocket = io(); // Connects to current domain
```

---

## 🛠️ Troubleshooting

### Build Fails

**Problem:** "bash: build.sh: No such file"

```bash
# Make sure build.sh exists in root and is executable
git add build.sh
git commit -m "Add build script"
git push
```

### React Build Not Found

**Problem:** "React build not found" error

- Check Render build logs
- Ensure npm install completes without errors
- Verify chat-react/package.json exists

### Socket.IO Not Connecting

**Problem:** Messages not sending/receiving

1. Check browser console for errors
2. Verify CORS is enabled in Flask (it is by default)
3. Check Render logs: **Logs** tab in Render dashboard

### Blank Page

**Problem:** See white blank page

1. Open browser DevTools (F12)
2. Check **Console** tab for errors
3. Check **Network** tab - should see index.html load
4. Check Render **Logs** for Flask errors

### Free Tier Limits

- Spins down after 15 minutes of inactivity
- First request after spin-down takes ~30 seconds
- Upgrade to **Paid** for always-on service

---

## 📈 Scaling Up

### Upgrade from Free to Paid:

1. In Render dashboard, go to your service
2. Click **Settings** → **Plan**
3. Select **Starter** or higher
4. Service stays running 24/7

### Use Render PostgreSQL for Persistent Data:

```python
# In app.py, add database for message history
import psycopg2
# Store messages in DB instead of just in-memory
```

---

## 🔄 Deployment Workflow

### Make Changes Locally

```bash
# Change React component
vim chat-react/src/components/ChatHeader.js

# Commit and push
git add .
git commit -m "Update chat header"
git push origin main
```

### Render Auto-Deploys

- Render watches your GitHub repo
- On every push, it automatically:
  1. Pulls latest code
  2. Runs build.sh
  3. Installs dependencies
  4. Restarts the service

### Monitor Deployment

1. Go to Render dashboard
2. Click your service name
3. Watch **Logs** tab for build progress
4. See "Deploy successful" message

---

## 🔐 Environment Variables

### Available in Render:

| Variable         | Where to Set     | Purpose              |
| ---------------- | ---------------- | -------------------- |
| `SECRET_KEY`     | Render dashboard | Flask session secret |
| `PORT`           | Auto (Render)    | Server port (10000)  |
| `PYTHON_VERSION` | Render dashboard | Python version       |

### Set in Render Dashboard:

1. Go to service **Settings**
2. Scroll to **Environment Variables**
3. Add key-value pairs
4. Deploy will use new values

---

## 📱 Use Custom Domain

### Add Custom Domain:

1. In Render dashboard, go **Settings**
2. Scroll to **Custom Domain**
3. Add your domain (e.g., chat.yourdomain.com)
4. Update DNS records (instructions provided)

---

## 💡 Pro Tips

✅ **Use environment variables** for secrets

```python
# In app.py
SECRET_KEY = os.getenv('SECRET_KEY', 'dev-key')
```

✅ **Monitor logs** frequently

```
Render Dashboard → Logs → Check for errors
```

✅ **Test locally first**

```bash
npm run build
# Test Flask serves React build locally
python app.py
```

✅ **Keep build.sh simple** - faster deployments

---

## 🎯 Summary

Your deployment:

- ✅ Single service on Render
- ✅ React frontend built and served by Flask
- ✅ Socket.IO WebSocket for real-time messaging
- ✅ Auto-deploys on GitHub push
- ✅ Free tier available
- ✅ HTTPS by default

---

## 📞 Support

**Render Docs:** https://render.com/docs
**Socket.IO Guide:** https://socket.io/docs/v4/
**Flask-SocketIO:** https://flask-socketio.readthedocs.io/

Happy deploying! 🚀
