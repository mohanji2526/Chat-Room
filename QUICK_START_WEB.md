# Quick Start - Web Chat

## 🚀 Local Setup (5 minutes)

### 1. Install dependencies

```bash
pip install -r web-requirements.txt
```

### 2. Run the web server

```bash
python app.py
```

### 3. Open in browser

```
http://localhost:5000
```

### 4. Start chatting!

- Enter username
- Open another browser tab/window
- Enter different username
- Chat in real-time!

---

## 🌐 Deploy to Internet (Choose One)

### Easiest: Render.com (Free)

1. Push to GitHub
2. Go to [render.com](https://render.com)
3. Create Web Service from GitHub repo
4. Set start command: `python app.py`
5. Done! Get your URL

See [WEB_DEPLOYMENT.md](WEB_DEPLOYMENT.md) for detailed guides.

---

## 📱 Access from Anywhere

Once deployed:

```
https://your-chat-app.onrender.com
```

Works on:

- ✅ Desktop browsers
- ✅ Mobile phones
- ✅ Tablets
- ✅ Any device with internet

---

## 📁 Project Structure

```
Chat-Server/
├── app.py                 # Flask web server
├── templates/
│   └── index.html         # Web UI
├── web-requirements.txt   # Web dependencies
├── Dockerfile.web         # Docker container
├── docker-compose.yml     # Docker Compose
├── README.md              # Main docs
└── WEB_DEPLOYMENT.md      # Deployment guide
```

---

## 🎨 Features

✨ Modern responsive UI
✨ Real-time WebSocket messaging
✨ Online users list
✨ Join/leave notifications
✨ Works on mobile
✨ Beautiful gradients & animations

---

## 💡 Tips

- Change `SECRET_KEY` in app.py for production
- Custom domain? Point DNS to deployment URL
- SSL certificate? Use Let's Encrypt (free)
- Want more users? Upgrade your plan

See [WEB_DEPLOYMENT.md](WEB_DEPLOYMENT.md) for complete deployment options.
