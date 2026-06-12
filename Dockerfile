FROM python:3.11-slim

WORKDIR /app

# Copy application files
COPY server.py .
COPY requirements.txt .

# Install dependencies (none needed, but good for extensibility)
RUN pip install --no-cache-dir -r requirements.txt

# Expose port
EXPOSE 12345

# Set environment variables
ENV SERVER_HOST=0.0.0.0
ENV SERVER_PORT=12345

# Run the server
CMD ["python", "server.py"]
