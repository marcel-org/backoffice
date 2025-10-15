# Use Bun as the base image
FROM oven/bun:1 AS base

# Define build arguments for environment variables
ARG API_URL
ARG MOCK_API

# Set working directory
WORKDIR /app

# Copy package files
COPY package.json bun.lock* ./

# Install dependencies
RUN bun install --frozen-lockfile

# Copy source code
COPY . .

# Build the application
RUN bun run build

# Production image
FROM oven/bun:1-slim AS production

# Define build arguments again for production stage
ARG API_URL
ARG MOCK_API

# Set environment variables from build args
ENV API_URL=${API_URL}
ENV MOCK_API=${MOCK_API}

WORKDIR /app

# Copy built application
COPY --from=base /app/.next ./.next
COPY --from=base /app/public ./public
COPY --from=base /app/package.json ./package.json
COPY --from=base /app/next.config.js ./next.config.js

# Install only production dependencies
COPY package.json bun.lock* ./
RUN bun install --production --frozen-lockfile

# Create non-root user
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Set correct permissions
RUN chown -R nextjs:nodejs /app
USER nextjs

# Railway will set PORT environment variable
# We don't need to EXPOSE a specific port since Railway handles this

# Start the application with port from environment
CMD ["sh", "-c", "bun run start"]