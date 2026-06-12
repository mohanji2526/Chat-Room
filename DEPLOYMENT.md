# Deployment Guide for Chat Room Application

## Production-Ready Changes

✅ Environment variables configuration  
✅ Logging to file and console  
✅ Connection limits  
✅ Error handling and recovery  
✅ Docker containerization

## Local Testing

```bash
pip install -r web-requirements.txt
python app.py
```

Open browser at `http://localhost:5000`

---

## Deployment Options

### **Option 1: Render.com (Recommended - Free & Easy)**

1. Sign up at [render.com](https://render.com)
2. Create Web Service from your GitHub repo
3. Set start command: `python app.py`
4. Access your chat app from the generated URL

---

### **Option 2: Docker on AWS/DigitalOcean/Heroku**

1. **Build and run locally:**

   ```bash
   docker build -t chat-server .
   docker run -p 12345:12345 chat-server
   ```

2. **Push to Docker Hub:**

   ```bash
   docker tag chat-server:latest yourusername/chat-server:latest
   docker push yourusername/chat-server:latest
   ```

3. **Deploy on DigitalOcean App Platform:**
   - Connect your Docker Hub account
   - Deploy the image from Docker Hub
   - Expose port 12345

---

### **Option 3: Using Docker Compose (Simple)**

```bash
docker-compose up -d
```

---

### **Option 4: AWS EC2**

1. Launch EC2 instance (Ubuntu, t2.micro free tier)
2. Security Group: Open port 12345 for TCP
3. SSH and clone project
4. Run server with systemd service:

Create `/etc/systemd/system/chat-server.service`:

```ini
[Unit]
Description=Chat Server
After=network.target

[Service]
Type=simple
User=ubuntu
WorkingDirectory=/home/ubuntu/Chat-Server
ExecStart=/usr/bin/python3 /home/ubuntu/Chat-Server/server.py
Restart=on-failure

[Install]
WantedBy=multi-user.target
```

Enable and start:

```bash
sudo systemctl enable chat-server
sudo systemctl start chat-server
sudo systemctl status chat-server
```

---

### **Option 5: Render (Free tier available)**

1. Connect your GitHub repo to Render
2. Create new Web Service
3. Runtime: Python
4. Build command: `pip install -r requirements.txt`
5. Start command: `python server.py`
6. Expose port 12345

---

## Configuration for Remote Server

### Server Side (.env)

```
SERVER_HOST=0.0.0.0
SERVER_PORT=12345
MAX_CONNECTIONS=100
```

### Client Side

```bash
export SERVER_HOST=your_server_ip
export SERVER_PORT=12345
export USERNAME=YourName
python client.py
```

---

## Monitoring

Check logs:

```bash
tail -f chat_server.log
```

Connected clients:

- Server console shows active connections
- Logs saved to `chat_server.log`

---

## Security Considerations (Future Enhancements)

1. **Add Authentication**: Username/password or token-based
2. **Encryption**: Use SSL/TLS for data transmission
3. **Rate Limiting**: Prevent spam
4. **Input Validation**: Sanitize messages
5. **Message Size Limits**: Prevent buffer overflow attacks

---

## Scaling

For many users (1000+), consider:

- Redis for message queue
- Multiple server instances with load balancer
- WebSocket protocol instead of raw sockets
- Async framework (asyncio, FastAPI)

---

## Troubleshooting

**Connection Refused?**

- Ensure server is running: `ps aux | grep python`
- Check port: `netstat -tuln | grep 12345`
- Firewall: Allow port 12345

**Can't connect from another computer?**

- Use server's IP, not `localhost`
- Check firewall settings
- Ensure server is listening on `0.0.0.0`

**Server crashes?**

- Check logs: `cat chat_server.log`
- Use systemd/docker for auto-restart
