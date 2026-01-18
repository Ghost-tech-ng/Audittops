# Use Node.js LTS
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production

# Copy built files
COPY dist ./dist
COPY server ./server
COPY shared ./shared

# Expose port
EXPOSE 5000

# Set environment
ENV NODE_ENV=production

# Start the app
CMD ["node", "dist/index.cjs"]
