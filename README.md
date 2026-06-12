# 💬 Chat Room - React + Flask Full-Stack Application

A modern, real-time chat application built with **React** (frontend) and **Flask** (backend) with Socket.IO for real-time messaging.

## ✨ Features

✅ **React Component-Based UI** - Clean, modular frontend architecture  
✅ **Real-Time Messaging** - Instant message delivery with Socket.IO  
✅ **Online User List** - See who's connected  
✅ **Connection Status** - Live connection indicator  
✅ **Auto-Scroll Messages** - Latest messages always visible  
✅ **Beautiful Gradient UI** - Modern, responsive design  
✅ **Single Render Deployment** - Frontend + Backend in one service  
✅ **HTTPS by Default** - Secure connections

---

## 🚀 Quick Start

### Prerequisites

- Node.js 14+
- Python 3.8+
- npm or yarn

### Local Development

**1. Install dependencies:**

```bash
# Backend dependencies
pip install -r requirements.txt

# Frontend dependencies
cd chat-react
npm install
cd ..
```

**2. Build React:**

```bash
cd chat-react
npm run build
cd ..
```

**3. Start Flask server:**

```bash
python app.py
```

Visit `http://localhost:5000` in your browser.

---

## 📁 Project Structure

```
Chat-Server/
├── 📁 chat-react/              # React Frontend
│   ├── src/
│   │   ├── components/         # React components
│   │   ├── hooks/              # Custom hooks
│   │   ├── styles/             # CSS styling
│   │   ├── App.js
│   │   └── index.js
│   ├── package.json
│   └── public/
│
├── 📁 docs/                    # Documentation
│   ├── DEPLOYMENT_INDEX.md
│   ├── STEP_BY_STEP_RENDER.md
│   ├── RENDER_QUICK_DEPLOY.md
│   ├── RENDER_DEPLOYMENT.md
│   ├── DEPLOYMENT_SUMMARY.md
│   └── DEPLOYMENT_FILES_REFERENCE.md
│
├── app.py                      # Flask Backend
├── requirements.txt            # Python dependencies
├── build.sh                    # Build script
├── render.yaml                 # Render configuration
├── .renderignore              # Render ignore file
├── .env.example               # Environment template
└── README.md                  # This file
```

---

## 🔧 Technologies Used

**Frontend:**

- React 18
- Socket.IO Client
- CSS3 (Gradients, Animations)
- Font Awesome Icons

**Backend:**

- Flask 3.0
- Flask-SocketIO 5.3
- Python 3.8+
- Gunicorn (Production)

---

## 🚀 Deployment to Render

### Quick Deploy (5 minutes)

**See documentation:** [`docs/DEPLOYMENT_INDEX.md`](./docs/DEPLOYMENT_INDEX.md)

**Steps:**

1. Push code to GitHub
2. Go to [render.com/dashboard](https://render.com/dashboard)
3. Click **New +** → **Web Service**
4. Select your repository
5. Click **Create Web Service**

**Your app will be live at:** `https://chat-server.onrender.com`

---

## 📚 Documentation

All guides are in the `docs/` folder:

| Document                          | Purpose               |
| --------------------------------- | --------------------- |
| **DEPLOYMENT_INDEX.md**           | Navigation guide      |
| **STEP_BY_STEP_RENDER.md**        | Detailed instructions |
| **RENDER_QUICK_DEPLOY.md**        | Quick reference       |
| **RENDER_DEPLOYMENT.md**          | Complete guide        |
| **DEPLOYMENT_SUMMARY.md**         | Overview              |
| **DEPLOYMENT_FILES_REFERENCE.md** | File explanations     |

---

## 🎯 Architecture

```
┌─────────────────────────────────┐
│   React Frontend (Browser)      │
│  - Login Form                   │
│  - Chat Interface               │
│  - Messages & User List         │
└──────────────┬──────────────────┘
               │ Socket.IO (WebSocket)
               │
┌──────────────▼──────────────────┐
│   Flask Backend (Server)        │
│  - Socket.IO Server             │
│  - Message Broadcasting         │
│  - User Management              │
└─────────────────────────────────┘
```

---

## 🧪 Local Testing

### Build and Run

```bash
# Build React
cd chat-react && npm run build && cd ..

# Run Flask
python app.py

# Visit http://localhost:5000
```

### Test with Multiple Tabs

- Open 2-3 browser tabs
- Join with different usernames
- Messages sync in real-time

---

## 🔐 Security

✅ **HTML Escaping** - XSS prevention  
✅ **Environment Variables** - Secrets protected  
✅ **CORS Support** - Controlled requests  
✅ **HTTPS** - Render provides SSL/TLS

---

## 📋 Environment Variables

| Variable     | Purpose                      |
| ------------ | ---------------------------- |
| `SECRET_KEY` | Flask session secret         |
| `PORT`       | Server port (auto on Render) |

---

## 🐛 Troubleshooting

### Blank Page

```bash
# Verify React build exists
ls -la chat-react/build/index.html
```

### Messages Not Sending

- Check connection status (green dot)
- Open browser console (F12)
- Check Flask console for errors

### Build Failed

```bash
# Reinstall and rebuild
cd chat-react && npm install && npm run build && cd ..
```

---

## 📈 Next Steps

1. ✅ Install dependencies
2. ✅ Build React: `cd chat-react && npm run build && cd ..`
3. ✅ Test locally: `python app.py`
4. ✅ Deploy to Render (see docs/)
5. ✅ Share your URL!

---

## 💡 Tips

- **Getting Started?** Read [`docs/DEPLOYMENT_INDEX.md`](./docs/DEPLOYMENT_INDEX.md)
- **Quick Deploy?** Read [`docs/RENDER_QUICK_DEPLOY.md`](./docs/RENDER_QUICK_DEPLOY.md)
- **Need Help?** Check [`docs/RENDER_DEPLOYMENT.md`](./docs/RENDER_DEPLOYMENT.md)

---

## 📞 Support

- **Render:** https://render.com/docs
- **Socket.IO:** https://socket.io/docs/v4/
- **Flask-SocketIO:** https://flask-socketio.readthedocs.io/
- **React:** https://react.dev

---

## 📄 License

Open source - MIT License

**Happy chatting! 💬**
