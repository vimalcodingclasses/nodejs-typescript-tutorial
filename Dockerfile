# --- STAGE 1: Build Phase ---
FROM node:22-alpine AS builder

WORKDIR /app

# Copy package management files
COPY package*.json tsconfig.json ./

# Install all dependencies (including devDependencies for compiling TS)
RUN npm ci

# Copy the rest of the application source code
COPY . .

# Compile TypeScript to JavaScript (usually outputs to a /dist or /build folder)
RUN npm run build

# Remove development dependencies to keep the image slim
RUN npm prune --production


# --- STAGE 2: Runtime Phase ---
FROM node:22-alpine AS runner

WORKDIR /app

# Set node environment to production
ENV NODE_ENV=production

# Create a non-root user for security purposes
USER node

# Copy only the compiled code and production node_modules from Stage 1
COPY --chown=node:node --from=builder /app/package*.json ./
COPY --chown=node:node --from=builder /app/node_modules ./node_modules
COPY --chown=node:node --from=builder /app/dist ./dist

# Expose your application port (change 3000 to whatever your app uses)
EXPOSE 3000

# Run the compiled JavaScript
CMD ["node", "dist/index.js"]