import socket
import threading
import os
import logging
from datetime import datetime

# Server configuration
SERVER_HOST = os.getenv('SERVER_HOST', '0.0.0.0')  # Listen on all interfaces
SERVER_PORT = int(os.getenv('SERVER_PORT', 12345))
BUFFER_SIZE = 1024
MAX_CONNECTIONS = int(os.getenv('MAX_CONNECTIONS', 50))

# Logging configuration
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(levelname)s - %(message)s',
    handlers=[
        logging.FileHandler('chat_server.log'),
        logging.StreamHandler()
    ]
)

# List to store all connected clients
clients = []
clients_lock = threading.Lock()

def broadcast_message(message, sender_socket=None):
    """Send message to all connected clients except the sender"""
    with clients_lock:
        for client in clients:
            if client != sender_socket:
                try:
                    client.send(message.encode())
                except Exception as e:
                    logging.error(f"Failed to send message: {e}")
                    if client in clients:
                        clients.remove(client)

def handle_client(client_socket, client_address):
    """Handle individual client connection"""
    logging.info(f"New client connected: {client_address}")
    
    # Add client to the list
    with clients_lock:
        if len(clients) >= MAX_CONNECTIONS:
            client_socket.send("Server is full. Connection rejected.".encode())
            client_socket.close()
            return
        clients.append(client_socket)
    
    # Notify other clients about the new connection
    broadcast_message(f"[{client_address[0]}:{client_address[1]}] joined the chat room\n")
    
    try:
        while True:
            # Receive message from client
            message = client_socket.recv(BUFFER_SIZE).decode()
            
            if not message:
                break
            
            # Display message on server
            logging.info(f"[{client_address}]: {message}")
            
            # Broadcast message to all other clients
            broadcast_message(f"[{client_address[0]}:{client_address[1]}]: {message}\n", client_socket)
    
    except Exception as e:
        logging.error(f"Error with client {client_address}: {e}")
    
    finally:
        # Remove client from list
        with clients_lock:
            if client_socket in clients:
                clients.remove(client_socket)
        
        # Notify others about disconnection
        broadcast_message(f"[{client_address[0]}:{client_address[1]}] left the chat room\n")
        
        client_socket.close()
        logging.info(f"Client disconnected: {client_address}")

def start_server():
    """Start the chat server"""
    server_socket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    server_socket.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEADDR, 1)
    
    try:
        server_socket.bind((SERVER_HOST, SERVER_PORT))
        server_socket.listen(MAX_CONNECTIONS)
        logging.info(f"Chat server started on {SERVER_HOST}:{SERVER_PORT}")
        logging.info("Waiting for connections...")
        
        while True:
            client_socket, client_address = server_socket.accept()
            
            # Create a new thread for each client
            client_thread = threading.Thread(
                target=handle_client,
                args=(client_socket, client_address),
                daemon=True
            )
            client_thread.start()
    
    except KeyboardInterrupt:
        logging.info("Server shutting down...")
    except Exception as e:
        logging.error(f"Server error: {e}")
    finally:
        server_socket.close()
        logging.info("Server closed")

if __name__ == "__main__":
    start_server()
