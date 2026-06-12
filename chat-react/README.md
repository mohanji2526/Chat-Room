# Chat App - React.js Version

A modern, component-based React.js chat application with real-time messaging using Socket.IO.

## Project Structure

```
chat-react/
├── public/
│   └── index.html              # Main HTML entry point
├── src/
│   ├── components/             # Reusable React components
│   │   ├── ChatContainer.js    # Main chat wrapper component
│   │   ├── ChatHeader.js       # Header with connection status
│   │   ├── LoginForm.js        # Login/Join form component
│   │   ├── Message.js          # Individual message component
│   │   ├── MessageInput.js     # Message input & send button
│   │   ├── MessagesList.js     # Messages container with auto-scroll
│   │   ├── Sidebar.js          # Sidebar wrapper
│   │   └── UserList.js         # Online users list component
│   ├── hooks/
│   │   └── useSocket.js        # Custom hook for Socket.IO logic
│   ├── styles/
│   │   └── App.css             # All styling (matches original UI)
│   ├── App.js                  # Root component
│   └── index.js                # React DOM entry point
├── package.json                # Dependencies and scripts
└── README.md                   # This file
```

## Component Breakdown

### **App.js** (Root Component)

- Manages login state and current username
- Switches between LoginForm and ChatContainer
- Initializes Socket.IO connection

### **LoginForm.js**

- Handles user login with username input
- Form validation
- Calls `onJoinChat` callback to transition to chat

### **ChatContainer.js**

- Main chat interface wrapper
- Manages messages and user list state
- Coordinates child components
- Emits 'send_message' events to server

### **ChatHeader.js**

- Displays room title
- Shows connection status (connected/disconnected)

### **MessagesList.js**

- Container for all messages
- Auto-scrolls to latest message on new message
- Maps messages to Message components

### **Message.js**

- Renders individual messages
- Differentiates between user/other/system messages
- Formats timestamps
- HTML escaping for security

### **MessageInput.js**

- Text input field for composing messages
- Send button with icon
- Enter key to send
- Clears input after sending

### **UserList.js**

- Displays online users count
- Lists all active users
- Online status indicator (green dot)

### **useSocket.js** (Custom Hook)

- Initializes Socket.IO connection
- Manages connection state
- Handles connect/disconnect/error events
- Returns socket instance and connection status

## Setup & Installation

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Step 1: Navigate to the project

```bash
cd chat-react
```

### Step 2: Install dependencies

```bash
npm install
```

### Step 3: Start the React development server

```bash
npm start
```

The app will open at `http://localhost:3000`

## How It Works

1. **Login Phase**: User enters username and clicks "Join Chat"
2. **Socket Connection**: `useSocket` hook connects to the backend server
3. **Join Event**: Emits 'join' event with username to server
4. **Listen for Messages**: Listens on 'message' event for incoming messages
5. **User List Updates**: Listens on 'user_list' event to update online users
6. **Send Messages**: User types in MessageInput, presses Enter or clicks Send
7. **Message Broadcast**: Server broadcasts message to all connected clients

## Features

✅ Real-time messaging with Socket.IO  
✅ Component-based architecture  
✅ Online user list  
✅ Connection status indicator  
✅ Auto-scroll to latest messages  
✅ Beautiful gradient UI (matches original)  
✅ Responsive design (mobile/tablet/desktop)  
✅ Message time stamps  
✅ System message support  
✅ HTML escaping for security

## Connecting to Backend

By default, the React app connects to `http://localhost` (where your Flask server is running).

To connect to a different server, modify the Socket.IO initialization in `src/hooks/useSocket.js`:

```javascript
const newSocket = io("http://your-server-url:port");
```

## Build for Production

```bash
npm run build
```

This creates an optimized production build in the `build/` folder.

## Styling

All CSS is in `src/styles/App.css` and maintains the exact styling from the original HTML version.

- Gradient backgrounds
- Smooth animations
- Shadow effects
- Custom scrollbar styling
- Responsive breakpoints (768px, 480px)

## Technologies Used

- **React 18** - UI library
- **Socket.IO Client** - Real-time communication
- **CSS3** - Styling with gradients and animations
- **Font Awesome** - Icons

## Advantages of Component-Based Approach

✨ **Reusability** - Components can be easily reused across the app  
✨ **Maintainability** - Each component has a single responsibility  
✨ **Readability** - Clear component structure makes code easier to understand  
✨ **Scalability** - Easy to add new features and components  
✨ **Testing** - Components can be tested independently  
✨ **State Management** - Cleaner prop flow between components

---

Happy chatting! 💬
