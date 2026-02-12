# Docker Setup for Issue Tracker

This document describes how to build and run the Issue Tracker application using Docker.

## 🐳 Quick Start

### Prerequisites
- Docker Desktop (Windows/Mac) or Docker Engine (Linux)
- Docker Compose V2

### Running with Docker Compose (Recommended)

1. **Set up environment variables:**
   ```bash
   cp .env.example .env
   ```
   
2. **Generate a secure NextAuth secret:**
   ```bash
   # On Linux/Mac/WSL
   openssl rand -base64 32
   
   # On Windows PowerShell
   [Convert]::ToBase64String((1..32 | ForEach-Object { Get-Random -Maximum 256 }))
   ```
   
3. **Update `.env` with your configuration:**
   - Set `NEXTAUTH_SECRET` with the generated value
   - Configure `REDIS_URL` (see Redis Setup below)
   - Configure other environment variables as needed

### Redis Setup Options

You can use either **local Redis** (via Docker) or **cloud Redis** (Redis Labs/Upstash):

#### **Option A: Cloud Redis (Recommended for Production)**

1. Set your Redis Cloud URL in `.env`:
   ```env
   REDIS_URL="redis://default:password@host:port"
   ```

2. Comment out the Redis service in `compose.yaml`:
   ```yaml
   depends_on:
     db:
       condition: service_healthy
     # redis:  # Comment out if using cloud Redis
     #   condition: service_healthy
   
   # Comment out the entire redis service section
   # redis:
   #   image: redis:7-alpine
   #   ...
   ```

#### **Option B: Local Redis (Docker Compose)**

1. Keep default settings in `.env`:
   ```env
   REDIS_URL="redis://localhost:6379"
   ```

2. Use the local Redis service (already configured in `compose.yaml`)


4. **Start the application:**
   ```bash
   docker compose up --build
   ```

5. **Run database migrations (first time only):**
   ```bash
   docker compose exec app npx prisma migrate deploy
   ```

6. **Seed the database (optional):**
   ```bash
   docker compose exec app npx prisma db seed
   ```

Your application will be available at **http://localhost:3000**

### Services Included
- **app**: Next.js application (port 3000)
- **db**: PostgreSQL database (port 5432)
- **redis**: Redis cache for rate limiting (port 6379)

## 🔨 Building and Running Standalone

### Build the Docker Image

```bash
# Standard build
docker build -t issue-tracker .

# Multi-platform build (for cloud deployment)
docker build --platform=linux/amd64 -t issue-tracker .
```

### Run the Container

```bash
docker run -d \
  --name issue-tracker \
  -p 3000:3000 \
  -e DATABASE_URL="your-database-url" \
  -e REDIS_URL="your-redis-url" \
  -e NEXTAUTH_URL="http://localhost:3000" \
  -e NEXTAUTH_SECRET="your-secret" \
  issue-tracker
```

## 🚀 Deploying to the Cloud

### 1. Build for Production

```bash
# Build for the target platform
docker build --platform=linux/amd64 -t myregistry.com/issue-tracker:latest .
```

### 2. Push to Registry

```bash
# Docker Hub
docker push myregistry.com/issue-tracker:latest

# AWS ECR
aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin 123456789012.dkr.ecr.us-east-1.amazonaws.com
docker tag issue-tracker:latest 123456789012.dkr.ecr.us-east-1.amazonaws.com/issue-tracker:latest
docker push 123456789012.dkr.ecr.us-east-1.amazonaws.com/issue-tracker:latest

# Azure Container Registry
az acr login --name myregistry
docker tag issue-tracker:latest myregistry.azurecr.io/issue-tracker:latest
docker push myregistry.azurecr.io/issue-tracker:latest
```

### 3. Required Environment Variables

Make sure to set these environment variables in your cloud platform:

```env
DATABASE_URL=postgresql://user:password@host:5432/dbname?schema=public
REDIS_URL=redis://host:6379
NEXTAUTH_URL=https://yourdomain.com
NEXTAUTH_SECRET=your-production-secret
SENTRY_DSN=your-sentry-dsn (optional)
```

## 🛠️ Development Commands

### View Logs
```bash
# All services
docker compose logs -f

# Specific service
docker compose logs -f app
```

### Access Container Shell
```bash
docker compose exec app sh
```

### Stop Services
```bash
docker compose down
```

### Stop and Remove Volumes
```bash
docker compose down -v
```

### Rebuild Application
```bash
docker compose up --build app
```

## 🔍 Troubleshooting

### Container exits immediately
- Check logs: `docker compose logs app`
- Verify environment variables are set correctly
- Ensure database is accessible

### Database connection errors
- Verify `DATABASE_URL` format
- Check if database service is healthy: `docker compose ps`
- Ensure migrations have been run

### Port already in use
```bash
# Change ports in compose.yaml
ports:
  - "8080:3000"  # Use different host port
```

## 📊 Health Checks

The application includes health check endpoints:

- **Application**: `http://localhost:3000/api/health`
- **Database**: Automatically monitored by Docker
- **Redis**: Automatically monitored by Docker

## 🏗️ Architecture

The Dockerfile uses a multi-stage build optimized for Next.js:

1. **Base**: Sets up Alpine Linux with OpenSSL for Prisma
2. **Dependencies**: Installs production dependencies
3. **Builder**: Builds the Next.js application with standalone output
4. **Runner**: Minimal production image with only necessary files

### Image Size Optimization
- Uses Alpine Linux (~5MB base)
- Multi-stage build removes build dependencies
- Next.js standalone output (~100MB smaller)
- Only production dependencies included

## 📚 References

- [Docker's Node.js guide](https://docs.docker.com/language/nodejs/)
- [Next.js Docker documentation](https://nextjs.org/docs/deployment#docker-image)
- [Prisma Docker guide](https://www.prisma.io/docs/guides/deployment/deploy-to-docker)
- [Docker Compose documentation](https://docs.docker.com/compose/)