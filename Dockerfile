# syntax=docker/dockerfile:1

# Production-ready Dockerfile for Next.js + Prisma application
# Optimized for Next.js 15+ with standalone output mode

ARG NODE_VERSION=22.14.0

################################################################################
# Base stage with common setup
FROM node:${NODE_VERSION}-alpine AS base

# Install OpenSSL for Prisma (required in Alpine Linux)
RUN apk add --no-cache libc6-compat openssl

# Set working directory
WORKDIR /app

################################################################################
# Dependencies stage - install production dependencies
FROM base AS deps

# Copy package files
COPY package.json package-lock.json ./
COPY prisma ./prisma/

# Install dependencies
RUN npm ci --only=production && \
    npm cache clean --force

# Generate Prisma Client
RUN npx prisma generate

################################################################################
# Build stage - install all dependencies and build application
FROM base AS builder

# Copy package files
COPY package.json package-lock.json ./
COPY prisma ./prisma/

# Install all dependencies (including devDependencies)
RUN npm ci && \
    npm cache clean --force

# Generate Prisma Client
RUN npx prisma generate

# Copy application source
COPY . .

# Set environment variables for build
# This setting disables the anonymous telemetry data collection that Next.js performs by default. 
#Telemetry data is completely anonymous and used for general usage statistics, but this environment variable provides a way to opt-out, often for privacy or compliance reasons.
ENV NEXT_TELEMETRY_DISABLED=1 
ENV NODE_ENV=production

# Build Next.js application
RUN npm run build

################################################################################
# Production stage - minimal runtime image
FROM base AS runner

# Set production environment
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# Create non-root user
RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nextjs

# Copy Prisma schema and generated client
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/node_modules/.prisma ./node_modules/.prisma

# Copy Next.js standalone build
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# Copy public folder for static assets
COPY --from=builder --chown=nextjs:nodejs /app/public ./public

# Switch to non-root user
USER nextjs

# Expose port
EXPOSE 3000

# Set hostname
ENV HOSTNAME="0.0.0.0"
ENV PORT=3000

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=40s --retries=3 \
  CMD node -e "require('http').get('http://localhost:3000/api/health', (r) => {process.exit(r.statusCode === 200 ? 0 : 1)})"

# Start application using standalone server
CMD ["node", "server.js"]
