import eventlet
eventlet.monkey_patch()

from flask import Flask, render_template, request, send_from_directory,jsonify
from flask_socketio import SocketIO, emit, join_room, leave_room
import os
import logging
from datetime import datetime,timezone


# Configuration
# For Render deployment with React build
build_dir = os.path.join(os.path.dirname(__file__), 'static')
app = Flask(__name__, static_folder=build_dir, static_url_path='')
app.config['SECRET_KEY'] = os.getenv('SECRET_KEY', 'your-secret-key-change-in-production')

socketio = SocketIO(
    app,
    cors_allowed_origins="*" 
)

# Logging configuration
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(levelname)s - %(message)s',
    handlers=[
        logging.FileHandler('chat_web.log'),
        logging.StreamHandler()
    ]
)

# Store connected clients
connected_users = {}
chat_room = 'general'

@app.route('/')
def index():
    """Serve the React app"""
    try:
        return send_from_directory(build_dir, 'index.html')
    except FileNotFoundError:
        return "React build not found. Run: npm run build in chat-react folder", 404
    
@app.route('/Hello')
def hello():
    return "Hello, World!"

@app.route('/api/test', methods=['GET'])
def test_api():
    """Simple endpoint to test React to Flask connection"""
    return jsonify({
        "status": "success",
        "message": "Hello from Flask! The API connection is working."
    })

@app.route('/<path:path>')
def serve_static(path):
    """Serve static files and handle SPA routing"""
    file_path = os.path.join(build_dir, path)
    if os.path.isfile(file_path):
        return send_from_directory(build_dir, path)
    else:
        # For SPA routing, return index.html for any non-file routes
        return send_from_directory(build_dir, 'index.html')

@socketio.on('connect')
def handle_connect():
    """Handle client connection"""
    user_id = request.sid
    logging.info(f"Client connected: {user_id}")
    emit('response', {'data': 'Connected to chat server'})

@socketio.on('join')
def on_join(data):
    """Handle user joining the chat"""
    username = data.get('username', 'Anonymous')
    user_id = request.sid
    
    # Store user
    connected_users[user_id] = {
        'username': username,
        'joined_at': datetime.now(timezone.utc).isoformat() # Added timezone and isoformat()
    }
    
    join_room(chat_room)
    
    logging.info(f"User joined: {username} ({user_id})")
    
    # Notify all users
    emit('message', {
        'username': 'System',
        'message': f'{username} joined the chat room',
        'type': 'system',
        'timestamp': datetime.now(timezone.utc).isoformat()
    }, room=chat_room)
    
    # Send user list
    emit('user_list', {
        'users': list(connected_users.values()),
        'count': len(connected_users)
    }, room=chat_room)

@socketio.on('send_message')
def handle_message(data):
    """Handle incoming message"""
    user_id = request.sid
    
    if user_id not in connected_users:
        emit('error', {'message': 'User not found'})
        return
    
    username = connected_users[user_id]['username']
    message = data.get('message', '')
    
    if not message.strip():
        return
    
    logging.info(f"[{username}]: {message}")
    
    # Broadcast message to all users in room
    emit('message', {
        'username': username,
        'message': message,
        'type': 'user',
        'timestamp': datetime.now(timezone.utc).isoformat()
    }, room=chat_room)

@socketio.on('disconnect')
def handle_disconnect():
    """Handle user disconnection"""
    user_id = request.sid
    
    if user_id in connected_users:
        user_data = connected_users.pop(user_id)
        username = user_data['username']
        
        logging.info(f"User disconnected: {username} ({user_id})")
        
        # Notify others
        emit('message', {
            'username': 'System',
            'message': f'{username} left the chat room',
            'type': 'system',
            'timestamp': datetime.now(timezone.utc).isoformat()
        }, room=chat_room)
        
        # Update user list
        emit('user_list', {
            'users': list(connected_users.values()),
            'count': len(connected_users)
        }, room=chat_room)

@socketio.on('error')
def handle_error(e):
    """Handle errors"""
    logging.error(f"Socket error: {e}")

if __name__ == '__main__':
    port = int(os.getenv('WEB_PORT', 5000))
    socketio.run(
        app,
        host='0.0.0.0',
        port=port,
        debug=os.getenv('DEBUG', False),
        allow_unsafe_werkzeug=True
    )
