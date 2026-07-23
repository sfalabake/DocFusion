# System Architecture - PDFLeader Pro

## 🏗️ High-Level Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                          CDN (Cloudflare)                       │
│                 Static Assets & PDF Distribution                │
└─────────────────────────────────────────────────────────────────┘
                              │
                ┌─────────────┼─────────────┐
                │             │             │
         ┌──────▼────┐  ┌─────▼──────┐  ┌──▼────────┐
         │  Vercel   │  │   S3/R2    │  │ Auth0     │
         │  Frontend │  │  Storage   │  │ Provider  │
         │  (CDN)    │  │            │  │           │
         └──────┬────┘  └─────▲──────┘  └──┬────────┘
                │             │            │
         ┌──────▼─────────────┼────────────▼──────┐
         │                                        │
         │   Next.js Frontend (React 19)          │
         │   ├─ Landing Page                      │
         │   ├─ Dashboard                         │
         │   ├─ PDF Editor (Real-time)            │
         │   ├─ Settings & Profile                │
         │   └─ Admin Panel                       │
         │                                        │
         └──────┬─────────────────────────────────┘
                │
         ┌──────▼──────────────────┐
         │   API Gateway / Load    │
         │   Balancer (Railway)    │
         └──────┬──────────────────┘
                │
    ┌───────────┼───────────┐
    │           │           │
    ▼           ▼           ▼
  Pod 1       Pod 2       Pod N
  ┌────────────────────────┐
  │    NestJS Backend      │
  │  (Horizontally Scaled) │
  │                        │
  │  ├─ Auth Module        │
  │  ├─ PDF Module         │
  │  ├─ Editor Module      │
  │  ├─ File Module        │
  │  ├─ Collaboration      │
  │  ├─ AI Module          │
  │  └─ Admin Module       │
  └────────┬───────────────┘
           │
    ┌──────┼──────┐
    │      │      │
    ▼      ▼      ▼
 ┌──────────────────┐  ┌──────────────┐  ┌──────────────┐
 │  PostgreSQL DB   │  │ Redis Cache  │  │ BullMQ Jobs  │
 │  (Primary DB)    │  │ (Session)    │  │ (Background) │
 └──────────────────┘  └──────────────┘  └──────────────┘
```

## 🎯 Architecture Principles

### 1. Monorepo with Workspaces
- **Single source of truth** for shared types
- **Easy code sharing** between frontend and backend
- **Unified CI/CD** pipeline
- **Consistent versioning** across apps

### 2. Separation of Concerns
- **Frontend**: UI, UX, client-side state
- **Backend**: Business logic, data persistence, security
- **Shared**: Types, DTOs, utilities

### 3. Stateless Backend
- **Horizontal scaling** enabled
- **Redis** for distributed sessions
- **Database** as single source of truth
- **Load balancer** handles request distribution

### 4. Real-time Capabilities
- **WebSockets** for live collaboration
- **Server-Sent Events** for notifications
- **Redis pub/sub** for message broadcasting
- **Optimistic UI** for instant feedback

### 5. File-First Architecture
- **PDF.js** for rendering
- **Fabric.js** for canvas editing
- **S3/R2** for reliable storage
- **Streaming uploads** for large files

## 📊 Data Flow

### User Upload Flow
```
User selects PDF
  │
  ├─ Frontend validates (size, type)
  │
  ├─ Chunk & upload to backend
  │
  ├─ Backend validates again
  │
  ├─ Upload to S3/R2
  │
  ├─ Extract metadata (pages, text)
  │
  ├─ Queue OCR job (if needed)
  │
  ├─ Store file record in PostgreSQL
  │
  ├─ Return file object to frontend
  │
  └─ Display in editor
```

### Real-time Editing Flow
```
User makes change in editor
  │
  ├─ Optimistic UI update immediately
  │
  ├─ Emit event to backend via WebSocket
  │
  ├─ Backend validates change
  │
  ├─ Update in-memory state
  │
  ├─ Persist to PostgreSQL
  │
  ├─ Broadcast to other collaborators
  │
  ├─ Confirm to original user
  │
  └─ All clients sync state
```

### Export/Download Flow
```
User requests export
  │
  ├─ Frontend specifies format (PDF, PNG, etc)
  │
  ├─ Backend queues conversion job
  │
  ├─ BullMQ processes job
  │
  ├─ Generate output file
  │
  ├─ Upload to S3/R2
  │
  ├─ Create signed URL
  │
  ├─ Return download link to user
  │
  └─ Frontend triggers download
```

## 🧩 Component Architecture

### Frontend Layer

#### Pages
```
app/
├─ (auth)/
│  ├─ login
│  ├─ register
│  └─ forgot-password
├─ (app)/
│  ├─ dashboard
│  ├─ editor/[id]
│  ├─ settings
│  ├─ profile
│  └─ admin
├─ pricing
├─ contact
└─ layout.tsx
```

#### Components Hierarchy
```
App
├─ AuthLayout
├─ MainLayout
│  ├─ Sidebar
│  ├─ Topbar
│  │  ├─ Search
│  │  ├─ Notifications
│  │  └─ UserMenu
│  └─ Content
├─ Editor
│  ├─ Toolbar (Tools & Options)
│  ├─ Canvas (PDF Rendering + Editing)
│  ├─ Sidebar (Pages, Layers, Properties)
│  └─ ContextMenu
```

#### State Management (Zustand)
```
Stores:
├─ authStore (user, session, permissions)
├─ editorStore (current file, changes, history)
├─ collaborationStore (active users, cursors, selections)
├─ uiStore (dark mode, sidebar state, zoom level)
└─ notificationStore (toasts, alerts, errors)
```

### Backend Layer (NestJS)

#### Module Structure
```
src/
├─ modules/
│  ├─ auth/
│  │  ├─ auth.controller.ts
│  │  ├─ auth.service.ts
│  │  ├─ auth.module.ts
│  │  ├─ strategies/ (JWT, Clerk)
│  │  └─ guards/ (Auth guard, roles)
│  ├─ files/
│  │  ├─ files.controller.ts
│  │  ├─ files.service.ts
│  │  ├─ storage.service.ts
│  │  ├─ file.entity.ts
│  │  └─ dto/
│  ├─ pdf/
│  │  ├─ pdf.controller.ts
│  │  ├─ pdf.service.ts
│  │  ├─ pdf-processor.service.ts
│  │  └─ jobs/ (OCR, conversion)
│  ├─ editor/
│  │  ├─ editor.gateway.ts (WebSocket)
│  │  ├─ editor.service.ts
│  │  ├─ collaboration.service.ts
│  │  └─ dto/
│  ├─ users/
│  │  ├─ users.controller.ts
│  │  ├─ users.service.ts
│  │  ├─ user.entity.ts
│  │  └─ dto/
│  ├─ admin/
│  │  ├─ admin.controller.ts
│  │  ├─ admin.service.ts
│  │  └─ analytics/
│  └─ payments/
│      ├─ payments.controller.ts
│      ├─ payments.service.ts
│      ├─ stripe.service.ts
│      └─ webhook.controller.ts
├─ common/
│  ├─ decorators/ (Auth, Roles, RateLimit)
│  ├─ filters/ (Global exception handler)
│  ├─ interceptors/ (Logging, transform)
│  ├─ middleware/ (Auth, CORS)
│  └─ pipes/ (Validation)
├─ database/
│  ├─ entities/ (Prisma schema)
│  ├─ migrations/
│  └─ seeds/
├─ queue/
│  ├─ jobs/
│  │  ├─ ocr.job.ts
│  │  ├─ conversion.job.ts
│  │  └─ backup.job.ts
│  └─ processors/
├─ websocket/
│  ├─ events/
│  ├─ handlers/
│  └─ socket.service.ts
└─ app.module.ts
```

#### Request Pipeline
```
Incoming Request
  │
  ├─ CORS Middleware
  │
  ├─ Body Parser Middleware
  │
  ├─ Global Guard (Auth)
  │
  ├─ Route-specific Guards (Roles)
  │
  ├─ Controller (Route handler)
  │
  ├─ Service (Business logic)
  │
  ├─ Database (Persistence)
  │
  ├─ Transform Interceptor (DTO)
  │
  └─ HTTP Response
```

## 🗄️ Database Layer

### Connection Pool
- **Min connections**: 5
- **Max connections**: 20 per service instance
- **Max idle time**: 30 seconds
- **Connection timeout**: 10 seconds

### Query Optimization
- **Indexes** on frequently queried fields
- **Foreign key constraints**
- **Denormalization** where appropriate
- **Pagination** for large result sets
- **Caching** with Redis

### Transaction Management
- **ACID compliance** for data integrity
- **Pessimistic locking** for critical operations
- **Optimistic concurrency** for collaboration

## 🔄 Caching Strategy

### Frontend (Browser)
- **Service Worker** for offline support
- **IndexedDB** for large datasets
- **SessionStorage** for temporary state
- **LocalStorage** for user preferences

### Backend (Redis)
- **Session store** (user sessions, permissions)
- **Cache layer** (user data, file metadata)
- **Rate limiting** (token bucket algorithm)
- **Pub/Sub** for real-time features

### Invalidation
- **Time-based** (TTL) - Default 1 hour
- **Event-based** - On data mutations
- **Manual** - Admin cache clear
- **Smart** - Only invalidate affected keys

## 🔐 Security Architecture

### Authentication & Authorization
- **Clerk/Auth.js** for user management
- **JWT tokens** with 15-min expiry
- **Refresh tokens** for session continuity
- **Role-based access** (Owner, Editor, Viewer)
- **API keys** for service-to-service

### Data Protection
- **AES-256** encryption at rest (S3)
- **TLS 1.3** for transit
- **Field-level encryption** for sensitive data
- **Password hashing** (Bcrypt + salt)
- **Digital signatures** for files

### API Security
- **CORS** - Whitelist allowed origins
- **CSRF protection** - Token validation
- **Rate limiting** - 1000 req/min per IP
- **Input validation** - Zod schemas
- **Output sanitization** - XSS prevention

## 📈 Performance Optimization

### Frontend
- **Code splitting** - Route-based chunks
- **Image optimization** - Next.js Image
- **Virtual scrolling** - For large lists
- **Memoization** - Prevent re-renders
- **Lazy loading** - On-demand resources

### Backend
- **Query optimization** - SELECT only needed fields
- **Indexing** - Fast lookups
- **Pagination** - Limit result sets
- **Compression** - gzip responses
- **Caching** - Reduce database hits

### Infrastructure
- **CDN** - Edge caching
- **Load balancing** - Distribute traffic
- **Database replication** - Read replicas
- **Auto-scaling** - Handle spikes
- **Resource monitoring** - Alert on issues

## 🚀 Deployment Pipeline

### Development → Staging → Production
```
git push
  │
  ├─ GitHub Actions triggered
  │
  ├─ Lint & Type check
  │
  ├─ Run tests
  │
  ├─ Build Docker images
  │
  ├─ Push to registry
  │
  ├─ Deploy to staging
  │
  ├─ Run E2E tests
  │
  ├─ Manual approval
  │
  └─ Deploy to production
```

### Blue-Green Deployment
- **Two production environments** (Blue & Green)
- **Route traffic** to current version
- **Deploy to inactive** version
- **Switch traffic** after validation
- **Quick rollback** if needed

### Health Checks
- **Readiness probe** - Startup verification
- **Liveness probe** - Process health
- **Startup probe** - Slow startup handling
- **Custom metrics** - Business-level health

---

**Next Steps**: Database schema design, project structure, and design system documentation.
