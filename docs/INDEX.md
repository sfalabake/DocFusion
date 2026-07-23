# Quick Reference Index - PDFLeader Pro

## 📖 Documentation Map

### Getting Started
1. [README.md](README.md) - Start here! Overview and quick links
2. [DEVELOPMENT_GUIDE.md](docs/DEVELOPMENT_GUIDE.md) - 5-min setup guide
3. [PHASE_1_SUMMARY.md](docs/PHASE_1_SUMMARY.md) - What's been completed

### Architecture & Design
- [ARCHITECTURE.md](docs/ARCHITECTURE.md) - System design, data flows
- [DATABASE_SCHEMA.md](docs/DATABASE_SCHEMA.md) - Database ERD and schema
- [PROJECT_STRUCTURE.md](docs/PROJECT_STRUCTURE.md) - Folder organization
- [DESIGN_SYSTEM.md](docs/DESIGN_SYSTEM.md) - UI/UX specifications

### Technical Decisions
- [TECH_DECISIONS.md](docs/TECH_DECISIONS.md) - Why each technology?

### Configuration
- [docker-compose.yml](docker-compose.yml) - Local dev environment
- [package.json](package.json) - Monorepo setup
- [pnpm-workspace.yaml](pnpm-workspace.yaml) - Workspace config

---

## 🚀 Quick Commands

```bash
# Setup
pnpm install
docker-compose up -d
pnpm run db:migrate
pnpm run dev

# Development
pnpm run dev          # Start all services
pnpm run lint         # Check code style
pnpm run test         # Run tests
pnpm run type-check   # TypeScript check

# Database
pnpm run db:studio    # Prisma Studio UI
pnpm run db:seed      # Populate test data
pnpm run db:migrate   # Run migrations

# Docker
docker-compose up -d      # Start services
docker-compose down       # Stop services
docker-compose logs -f    # View logs
```

---

## 🏗️ Project Structure Quick Reference

```
DocFusion/
├── apps/
│   ├── frontend/          → Next.js app (port 3000)
│   └── backend/           → NestJS API (port 3001)
├── packages/
│   └── shared/            → TypeScript types & utils
├── docs/                  → All documentation
├── infra/                 → Docker & deployment
└── Configuration files    → package.json, docker-compose.yml, etc.
```

---

## 📚 Documentation by Topic

### For Developers
- **Setup**: [DEVELOPMENT_GUIDE.md](docs/DEVELOPMENT_GUIDE.md)
- **Architecture**: [ARCHITECTURE.md](docs/ARCHITECTURE.md)
- **Project Structure**: [PROJECT_STRUCTURE.md](docs/PROJECT_STRUCTURE.md)
- **Database**: [DATABASE_SCHEMA.md](docs/DATABASE_SCHEMA.md)

### For Designers
- **Design System**: [DESIGN_SYSTEM.md](docs/DESIGN_SYSTEM.md)
- **Components**: See DESIGN_SYSTEM.md > Component Specifications
- **Colors**: See DESIGN_SYSTEM.md > Color Palette
- **Accessibility**: See DESIGN_SYSTEM.md > Accessibility

### For Architects
- **Architecture**: [ARCHITECTURE.md](docs/ARCHITECTURE.md)
- **Tech Decisions**: [TECH_DECISIONS.md](docs/TECH_DECISIONS.md)
- **Database Design**: [DATABASE_SCHEMA.md](docs/DATABASE_SCHEMA.md)
- **Security**: See ARCHITECTURE.md > Security Architecture

### For DevOps
- **Deployment**: [ARCHITECTURE.md](docs/ARCHITECTURE.md#-deployment-pipeline)
- **Docker**: [docker-compose.yml](docker-compose.yml)
- **Infrastructure**: See infra/ folder

---

## 🔑 Key Files

| File | Purpose |
|------|---------|
| [README.md](README.md) | Project overview |
| [package.json](package.json) | Monorepo definition & scripts |
| [docker-compose.yml](docker-compose.yml) | Local dev environment |
| [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) | System design |
| [docs/DATABASE_SCHEMA.md](docs/DATABASE_SCHEMA.md) | Database ERD |
| [docs/DESIGN_SYSTEM.md](docs/DESIGN_SYSTEM.md) | UI/UX specs |
| [docs/DEVELOPMENT_GUIDE.md](docs/DEVELOPMENT_GUIDE.md) | Setup guide |

---

## 📊 Tech Stack at a Glance

### Frontend
```
Next.js 14 + React 19 + TypeScript
Tailwind CSS + Zustand + React Query
PDF.js + Fabric.js + Framer Motion
```

### Backend
```
NestJS + PostgreSQL + Prisma
Redis + BullMQ
AWS S3 / Cloudflare R2
```

### Infrastructure
```
Vercel (Frontend) + Railway (Backend)
Docker + GitHub Actions
PostgreSQL + Redis
```

---

## 🎯 Development Workflow

### 1. Setup (Once)
```bash
git clone <repo>
cd DocFusion
pnpm install
docker-compose up -d
pnpm run db:migrate
pnpm run db:seed
```

### 2. Development
```bash
pnpm run dev              # Terminal 1: Start all servers
# Then in another terminal:
pnpm run db:studio       # Terminal 2: View database
```

### 3. Before Committing
```bash
pnpm run lint:fix        # Fix linting issues
pnpm run format          # Format code
pnpm run type-check      # Check TypeScript
pnpm run test            # Run tests
git add .
git commit -m "feat: description"
```

### 4. Deploy
```bash
git push                  # Triggers GitHub Actions
# CI runs: lint, type-check, test, build
# Deploy to staging, run E2E tests
# Manual approval
# Deploy to production
```

---

## 🐛 Troubleshooting

See [DEVELOPMENT_GUIDE.md](docs/DEVELOPMENT_GUIDE.md#-troubleshooting) for common issues:
- Port already in use
- Database connection errors
- Module not found
- Hot reload not working
- WebSocket connection failed

---

## 📞 Support

### Documentation
- All docs in `/docs` folder
- Architecture decisions in TECH_DECISIONS.md
- Database design in DATABASE_SCHEMA.md
- UI specs in DESIGN_SYSTEM.md

### Code Examples
- Frontend: `apps/frontend/src/components/` (to be created Phase 2)
- Backend: `apps/backend/src/modules/` (to be created Phase 2)

### External Resources
- [Next.js Docs](https://nextjs.org/docs)
- [NestJS Docs](https://docs.nestjs.com)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Prisma Docs](https://www.prisma.io/docs)

---

## ✅ Phase 1 Checklist

- [x] Project structure created
- [x] Documentation written (7 files)
- [x] Configuration files ready
- [x] Database schema designed
- [x] Design system defined
- [x] Tech decisions documented
- [x] Development environment setup
- [x] Ready for Phase 2

---

## 🚀 Phase 2 Preview

Starting Phase 2 with:
1. **Authentication** - Auth.js integration
2. **Dashboard** - File management UI
3. **File Upload** - PDF upload handling
4. **PDF Rendering** - PDF.js rendering
5. **API Endpoints** - NestJS backend services

---

**Status**: Phase 1 ✅ Complete  
**Next**: Phase 2 Implementation  
**Last Updated**: January 2026
