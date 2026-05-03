FROM node:18-alpine

WORKDIR /app

# Copy package files first for better caching
COPY server/package*.json ./server/

# Install dependencies
RUN cd server && npm install

# Copy the server directory
COPY server/ ./server/

# Copy the manifestation data from the root folder 
# (server.js expects it at '../MANIFESTATION.json')
COPY MANIFESTATION.json ./

# Set working directory to the server for execution
WORKDIR /app/server

# Expose API port
EXPOSE 5000

# Start the server
CMD ["npm", "start"]
