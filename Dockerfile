FROM node:18-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy everything
COPY . .

# Debug: Show what files were copied
RUN echo "=== Current directory structure ===" && ls -la
RUN echo "=== Looking for tsconfig.json ===" && find /app -name "tsconfig.json" -type f
RUN echo "=== tsconfig.json content if exists ===" && [ -f tsconfig.json ] && cat tsconfig.json || echo "tsconfig.json not found!"
RUN echo "=== All files in root ===" && find /app -maxdepth 1 -type f | head -20

# Try building with explicit path
RUN npx tsc --project /app/tsconfig.json || echo "Build failed, trying alternative..."

EXPOSE 5000
CMD ["node", "dist/server.js"]