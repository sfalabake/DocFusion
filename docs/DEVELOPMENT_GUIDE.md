# Development Guide - PDFLeader Pro

## 🚀 Quick Start

### Prerequisites
- **Node.js 20+** - [Download](https://nodejs.org/)
- **npm 10+** or **pnpm 8+** (recommended)
- **Docker & Docker Compose** - [Download](https://www.docker.com/products/docker-desktop)
- **PostgreSQL 15+** - (or use Docker)
- **Redis 7+** - (or use Docker)
- **Git** - [Download](https://git-scm.com/)

### Setup in 5 Minutes

```bash
# 1. Clone repository
git clone <repository-url>
cd DocFusion

# 2. Install dependencies
pnpm install

# 3. Start dev environment (PostgreSQL, Redis)
docker-compose up -d

# 4. Setup environment files
cp apps/backend/.env.example apps/backend/.env.local
cp apps/frontend/.env.example apps/frontend/.env.local

# 5. Setup database
cd apps/backend
pnpm run db:migrate
pnpm run db:seed

# 6. Start development servers
cd ../..
pnpm run dev
```

Access:
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:3001
- **Database UI**: http://localhost:5555 (Prisma Studio)

---

## 📦 Package Manager: pnpm

We use **pnpm** for better monorepo management.

### Install pnpm
```bash
npm install -g pnpm

# Verify installation
pnpm -v
```

### Common Commands
```bash
# Install all dependencies
pnpm install

# Add dependency to workspace
pnpm add lodash -w

# Add to specific package
pnpm add lodash --filter @docfusion/frontend

# Run script in all packages
pnpm -r run build

# Run script in specific package
pnpm -F @docfusion/backend run dev

# Remove dependency
pnpm remove lodash
```

---

## 🐳 Docker Setup

### docker-compose.yml Overview

```yaml
version: '3.8'

services:
  postgres:
    image: postgres:15-alpine
    environment:
      POSTGRES_DB: docfusion
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: postgres
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data

  redis:
    image: redis:7-alpine
    ports:
      - "6379:6379"

  # Add more services as needed
```

### Common Docker Commands

```bash
# Start all services
docker-compose up -d

# Stop all services
docker-compose down

# View logs
docker-compose logs -f [service-name]

# Access PostgreSQL CLI
docker-compose exec postgres psql -U postgres -d docfusion

# Access Redis CLI
docker-compose exec redis redis-cli
```

---

## 🔧 Environment Configuration

### Backend (.env.local)

```env
# Server
NODE_ENV=development
PORT=3001
LOG_LEVEL=debug

# Database
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/docfusion

# Redis
REDIS_URL=redis://localhost:6379

# JWT
JWT_SECRET=your-super-secret-key-change-in-production
JWT_EXPIRY=15m
JWT_REFRESH_SECRET=your-refresh-secret
JWT_REFRESH_EXPIRY=7d

# Authentication
AUTH0_DOMAIN=your-auth0-domain.auth0.com
AUTH0_CLIENT_ID=your-auth0-client-id
AUTH0_CLIENT_SECRET=your-auth0-secret

# AWS S3
AWS_REGION=us-east-1
AWS_S3_BUCKET=docfusion-dev-files
AWS_ACCESS_KEY_ID=your-access-key
AWS_SECRET_ACCESS_KEY=your-secret-key

# Stripe
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_test_...

# Email (for development, use test credentials)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASSWORD=your-app-password

# Feature Flags
FEATURE_AI_ENABLED=false
FEATURE_COLLABORATION_ENABLED=true
FEATURE_OCR_ENABLED=false
```

### Frontend (.env.local)

```env
# API
NEXT_PUBLIC_API_URL=http://localhost:3001

# App Config
NEXT_PUBLIC_APP_NAME=PDFLeader Pro
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Authentication
NEXT_PUBLIC_AUTH_DOMAIN=your-auth0-domain.auth0.com
NEXT_PUBLIC_AUTH_CLIENT_ID=your-auth0-client-id

# Stripe
NEXT_PUBLIC_STRIPE_KEY=pk_test_...

# Analytics
NEXT_PUBLIC_SENTRY_DSN=https://...@sentry.io/...

# Feature Flags
NEXT_PUBLIC_FEATURE_AI_ENABLED=false
NEXT_PUBLIC_FEATURE_COLLABORATION_ENABLED=true
```

---

## 📁 Working with Workspaces

### Add New Package
```bash
# Create folder
mkdir packages/utils

# Create package.json
{
  "name": "@docfusion/utils",
  "version": "1.0.0",
  "private": true
}

# Install
pnpm install
```

### Import from Shared Package
```typescript
// In frontend or backend
import { User, File } from '@docfusion/shared'
import { validateEmail } from '@docfusion/shared/utils'
```

---

## 🛠️ Running Development Servers

### All-in-One

```bash
pnpm run dev
```

This runs all development servers in parallel:
- Frontend (Next.js) on :3000
- Backend (NestJS) on :3001
- (Watches for changes and hot-reloads)

### Individual Services

```bash
# Frontend only
pnpm -F @docfusion/frontend run dev

# Backend only
pnpm -F @docfusion/backend run dev

# Run in specific directory
cd apps/backend
pnpm run dev
```

---

## 📊 Database Management

### Create Database

```bash
# Using docker-compose
docker-compose exec postgres psql -U postgres

# In PostgreSQL CLI
CREATE DATABASE docfusion;
\q
```

### Prisma Commands

```bash
# Generate Prisma Client
pnpm -F @docfusion/backend run prisma generate

# Create/update schema migration
pnpm -F @docfusion/backend run prisma migrate dev --name feature_name

# View database in UI
pnpm -F @docfusion/backend run prisma studio

# Apply pending migrations
pnpm -F @docfusion/backend run prisma migrate deploy

# Seed database
pnpm -F @docfusion/backend run db:seed

# Reset database (CAREFUL!)
pnpm -F @docfusion/backend run prisma migrate reset
```

### Database Connections

```bash
# PostgreSQL
psql -h localhost -U postgres -d docfusion

# Redis
redis-cli

# Prisma Studio (Web UI)
pnpm -F @docfusion/backend run prisma studio
```

---

## 🧪 Testing

### Run Tests
```bash
# All tests
pnpm run test

# Frontend tests only
pnpm -F @docfusion/frontend run test

# Backend tests only
pnpm -F @docfusion/backend run test

# Watch mode
pnpm run test:watch

# Coverage report
pnpm run test:coverage
```

### Testing Tools
- **Unit**: Vitest (frontend), Jest (backend)
- **E2E**: Playwright
- **API**: Postman, Insomnia, or curl

---

## 🔍 Code Quality

### Linting
```bash
# Lint all packages
pnpm run lint

# Fix linting issues
pnpm run lint:fix
```

### Type Checking
```bash
# Check types in all packages
pnpm run type-check

# TypeScript strict mode enforced
```

### Code Formatting
```bash
# Format code
pnpm run format

# Check formatting
pnpm run format:check
```

### Pre-commit Hooks
```bash
# Husky automatically runs on git commit
# Checks: lint, type-check, tests

# Skip hooks (not recommended)
git commit --no-verify
```

---

## 🚀 Building for Production

### Frontend Build
```bash
pnpm -F @docfusion/frontend run build

# Output: .next/ directory
# Production size ~200KB gzipped
```

### Backend Build
```bash
pnpm -F @docfusion/backend run build

# Output: dist/ directory
```

### Docker Build
```bash
# Build frontend image
docker build -f infra/Dockerfile.frontend -t docfusion-frontend:latest .

# Build backend image
docker build -f infra/Dockerfile.backend -t docfusion-backend:latest .

# Run with Docker Compose
docker-compose -f docker-compose.prod.yml up -d
```

---

## 🐛 Debugging

### Backend Debugging

#### VS Code Debug Configuration
```json
{
  "type": "node",
  "request": "launch",
  "name": "NestJS Backend",
  "program": "${workspaceFolder}/apps/backend/node_modules/.bin/nest",
  "args": ["start", "--debug", "--watch"],
  "console": "integratedTerminal",
  "internalConsoleOptions": "neverOpen"
}
```

#### Inspector Protocol
```bash
# Start backend with inspector
node --inspect-brk ./node_modules/.bin/nest start

# Open chrome://inspect in Chrome
```

### Frontend Debugging

#### React Developer Tools
- Install React DevTools extension in Chrome
- Inspect component hierarchy
- View and modify state/props

#### Next.js Debug
```bash
# Enable debug logging
DEBUG=* pnpm -F @docfusion/frontend run dev

# Chrome DevTools at chrome://inspect
```

---

## 📝 Git Workflow

### Branch Naming
```
feature/description       - New features
bugfix/description       - Bug fixes
chore/description        - Maintenance
docs/description         - Documentation
refactor/description     - Code refactoring
```

### Commit Convention
```
feat: Add PDF annotation tools
fix: Resolve WebSocket connection issue
docs: Update database schema
refactor: Extract editor logic to service
chore: Update dependencies
style: Format code
test: Add editor tests
```

### Pull Request Process
1. Create feature branch from `develop`
2. Make changes with meaningful commits
3. Push to remote
4. Create PR with description
5. Pass CI checks (lint, type-check, tests)
6. Request review
7. Merge to `develop`
8. Delete feature branch

---

## 🚨 Troubleshooting

### Port Already in Use
```bash
# Kill process using port
# macOS/Linux
lsof -i :3000
kill -9 <PID>

# Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F
```

### Database Connection Error
```bash
# Check if PostgreSQL is running
docker-compose ps

# Restart PostgreSQL
docker-compose restart postgres

# Check connection string
echo $DATABASE_URL
```

### Module Not Found
```bash
# Clear caches
pnpm run clean

# Reinstall dependencies
pnpm install

# Regenerate Prisma Client
pnpm -F @docfusion/backend run prisma generate
```

### Hot Reload Not Working
```bash
# The issue is usually file watching limits

# macOS - Increase limit
echo 'kern.maxfiles=5242880' | sudo tee -a /etc/sysctl.conf
echo 'kern.maxfilesperproc=524288' | sudo tee -a /etc/sysctl.conf
sudo sysctl -p

# Linux
echo 'fs.inotify.max_user_watches=524288' | sudo tee -a /etc/sysctl.conf
sudo sysctl -p
```

### WebSocket Connection Failed
```bash
# Check if backend is running
curl http://localhost:3001/health

# Check firewall rules
# Ensure port 3001 is accessible

# Browser console should show connection error
```

---

## 📚 Learning Resources

### Documentation
- [Next.js Docs](https://nextjs.org/docs)
- [React Docs](https://react.dev)
- [NestJS Docs](https://docs.nestjs.com)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Prisma Docs](https://www.prisma.io/docs)

### Video Tutorials
- NestJS Course - Udemy
- Next.js 14 Course - freeCodeCamp
- TypeScript Fundamentals - Official Docs

### Community
- GitHub Discussions
- Stack Overflow
- Reddit: r/nextjs, r/node
- Discord Communities

---

## ✅ Development Checklist

- [ ] Node.js 20+ installed
- [ ] pnpm installed and working
- [ ] Repository cloned
- [ ] `pnpm install` completed
- [ ] Docker running
- [ ] `docker-compose up -d` started
- [ ] Database migrations applied
- [ ] Environment files configured
- [ ] `pnpm run dev` working
- [ ] Frontend accessible at localhost:3000
- [ ] Backend accessible at localhost:3001
- [ ] VS Code extensions installed (ESLint, Prettier, Rest Client)
- [ ] Git hooks configured
- [ ] First test run passing

---

## 🤝 Contributing

Before making changes:
1. Read [CONTRIBUTING.md](./CONTRIBUTING.md)
2. Follow code style guidelines
3. Write tests for new features
4. Update documentation
5. Request review from maintainers

---

**Status**: Phase 1 ✅ - Setup guide complete  
**Next**: Begin Phase 2 - Authentication & Dashboard implementation
