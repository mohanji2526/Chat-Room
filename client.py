import socket
import threading
import os
import sys

# Server configuration
SERVER_HOST = os.getenv('SERVER_HOST', 'localhost')
SERVER_PORT = int(os.getenv('SERVER_PORT', 12345))
BUFFER_SIZE = 1024
USERNAME = os.getenv('USERNAME', 'Anonymous')

def receive_messages(client_socket):
    """Receive messages from server in a separate thread"""
    while True:
        try:
            message = client_socket.recv(BUFFER_SIZE).decode()
            if message:
                print(f"\n{message}", end='')
                print(f"{USERNAME}: ", end='', flush=True)
            else:
                break
        except:
            break

def send_messages(client_socket):
    """Send messages to server"""
    while True:
        try:
            message = input(f"{USERNAME}: ")
            if message.lower() == 'quit':
                print("Disconnecting...")
                client_socket.close()
                break
            if message.strip():  # Only send non-empty messages
                client_socket.send(message.encode())
        except:
            break

def main():
    client_socket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    
    try:
        print(f"Connecting to chat server at {SERVER_HOST}:{SERVER_PORT}...")
        client_socket.connect((SERVER_HOST, SERVER_PORT))
        print(f"✓ Connected to chat server")
        print(f"Username: {USERNAME}")
        print("Type 'quit' to exit\n")
        
        # Create threads for receiving and sending
        receive_thread = threading.Thread(
            target=receive_messages,
            args=(client_socket,),
            daemon=True
        )
        receive_thread.start()
        
        send_messages(client_socket)
    
    except ConnectionRefusedError:
        print(f"✗ Could not connect to server at {SERVER_HOST}:{SERVER_PORT}")
        print("Make sure the server is running.")
        sys.exit(1)
    except Exception as e:
        print(f"✗ Error: {e}")
        sys.exit(1)
    finally:
        client_socket.close()

if __name__ == "__main__":
    main()