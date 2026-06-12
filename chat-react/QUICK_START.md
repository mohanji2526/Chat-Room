# Quick Start - React Chat App

## 🚀 Get Started in 3 Steps

### 1️⃣ Install Dependencies

```bash
cd chat-react
npm install
```

### 2️⃣ Start React Server

```bash
npm start
```

Opens at `http://localhost:3000`

### 3️⃣ Connect to Your Backend

The app automatically connects to your Flask/Node backend at `http://localhost`

If your backend is on a different port, edit `src/hooks/useSocket.js`:

```javascript
const newSocket = io("http://localhost:5000"); // or your port
```

---

## 📁 Key Component Files

| Component          | Purpose                          |
| ------------------ | -------------------------------- |
| `App.js`           | Main app logic, state management |
| `LoginForm.js`     | Username input & join            |
| `ChatContainer.js` | Chat UI wrapper                  |
| `MessagesList.js`  | Messages display                 |
| `MessageInput.js`  | Message compose & send           |
| `UserList.js`      | Online users list                |
| `ChatHeader.js`    | Header with status               |
| `useSocket.js`     | Socket.IO connection hook        |

---

## 🎨 Understanding the Structure

```
User enters username
    ↓
LoginForm component renders
    ↓
User clicks "Join Chat"
    ↓
App.js switches to ChatContainer
    ↓
Socket connects in useSocket hook
    ↓
Messages & user list update in real-time
```

---

## 🔧 Customization Tips

### Change colors:

Edit `src/styles/App.css` - look for hex colors like `#667eea`

### Modify component behavior:

Each component has clear comments explaining its purpose

### Add new features:

Create new components in `src/components/` and import them

---

## 📚 Component Communication Flow

```
App.js (state)
  ├─→ LoginForm (receives onJoinChat callback)
  └─→ ChatContainer (receives socket, isConnected, currentUsername)
      ├─→ ChatHeader (receives isConnected)
      ├─→ MessagesList (receives messages, currentUsername)
      │   └─→ Message (receives message data)
      ├─→ MessageInput (receives onSendMessage callback)
      └─→ Sidebar/UserList (receives users, userCount)
```

---

## 🐛 Troubleshooting

**"Cannot find module 'socket.io-client'"**

```bash
npm install socket.io-client
```

**Port already in use (3000)**

```bash
# Use different port
PORT=3001 npm start
```

**Connection refuses to connect**

- Ensure backend server is running
- Check backend URL in `useSocket.js`
- Check CORS settings in backend

---

Enjoy your React chat app! 💬
