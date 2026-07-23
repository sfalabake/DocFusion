# Project Structure - PDFLeader Pro

## 🗂️ Monorepo Organization

```
DocFusion/
├── .github/
│   ├── workflows/
│   │   ├── ci.yml                      # Lint, test, type-check
│   │   ├── build.yml                   # Build Docker images
│   │   ├── deploy-staging.yml          # Deploy to staging
│   │   └── deploy-production.yml       # Deploy to production
│   └── CODEOWNERS                      # Code review rules
│
├── apps/
│   ├── frontend/                       # Next.js application
│   │   ├── public/
│   │   │   ├── images/
│   │   │   ├── icons/
│   │   │   └── fonts/
│   │   ├── src/
│   │   │   ├── app/                    # Next.js App Router
│   │   │   │   ├── (auth)/
│   │   │   │   │   ├── login/
│   │   │   │   │   ├── register/
│   │   │   │   │   ├── forgot-password/
│   │   │   │   │   └── reset-password/
│   │   │   │   ├── (app)/
│   │   │   │   │   ├── dashboard/      # File management dashboard
│   │   │   │   │   ├── editor/         # PDF editor (dynamic route)
│   │   │   │   │   ├── settings/
│   │   │   │   │   ├── profile/
│   │   │   │   │   └── admin/          # Admin panel
│   │   │   │   ├── api/                # Next.js API routes
│   │   │   │   │   ├── auth/
│   │   │   │   │   ├── files/
│   │   │   │   │   ├── upload/
│   │   │   │   │   └── webhooks/
│   │   │   │   ├── layout.tsx
│   │   │   │   ├── page.tsx            # Landing page
│   │   │   │   ├── pricing/
│   │   │   │   ├── contact/
│   │   │   │   └── error.tsx
│   │   │   │
│   │   │   ├── components/             # React components
│   │   │   │   ├── auth/
│   │   │   │   │   ├── LoginForm.tsx
│   │   │   │   │   ├── RegisterForm.tsx
│   │   │   │   │   └── AuthGuard.tsx
│   │   │   │   ├── dashboard/
│   │   │   │   │   ├── FileList.tsx
│   │   │   │   │   ├── FileCard.tsx
│   │   │   │   │   ├── FolderTree.tsx
│   │   │   │   │   ├── SearchBar.tsx
│   │   │   │   │   └── UploadZone.tsx
│   │   │   │   ├── editor/             # PDF Editor components
│   │   │   │   │   ├── Editor.tsx      # Main editor container
│   │   │   │   │   ├── Canvas.tsx      # PDF canvas rendering
│   │   │   │   │   ├── Toolbar.tsx     # Tool buttons
│   │   │   │   │   ├── Sidebar.tsx     # Pages & layers
│   │   │   │   │   ├── Properties.tsx  # Property panel
│   │   │   │   │   ├── ContextMenu.tsx
│   │   │   │   │   └── tools/
│   │   │   │   │       ├── TextTool.tsx
│   │   │   │   │       ├── ShapeTool.tsx
│   │   │   │   │       ├── DrawingTool.tsx
│   │   │   │   │       ├── SignatureTool.tsx
│   │   │   │   │       └── AnnotationTool.tsx
│   │   │   │   ├── common/
│   │   │   │   │   ├── Layout.tsx
│   │   │   │   │   ├── Navigation.tsx
│   │   │   │   │   ├── Topbar.tsx
│   │   │   │   │   ├── Sidebar.tsx
│   │   │   │   │   ├── UserMenu.tsx
│   │   │   │   │   ├── Notifications.tsx
│   │   │   │   │   └── Loading.tsx
│   │   │   │   ├── ui/                 # Reusable UI components
│   │   │   │   │   ├── Button.tsx
│   │   │   │   │   ├── Input.tsx
│   │   │   │   │   ├── Modal.tsx
│   │   │   │   │   ├── Dropdown.tsx
│   │   │   │   │   ├── Toast.tsx
│   │   │   │   │   ├── Checkbox.tsx
│   │   │   │   │   ├── RadioButton.tsx
│   │   │   │   │   ├── Slider.tsx
│   │   │   │   │   ├── ColorPicker.tsx
│   │   │   │   │   ├── Tabs.tsx
│   │   │   │   │   ├── Dialog.tsx
│   │   │   │   │   ├── Popover.tsx
│   │   │   │   │   └── Badge.tsx
│   │   │   │   └── landing/
│   │   │   │       ├── Hero.tsx
│   │   │   │       ├── Features.tsx
│   │   │   │       ├── Pricing.tsx
│   │   │   │       ├── Testimonials.tsx
│   │   │   │       ├── FAQ.tsx
│   │   │   │       └── CTA.tsx
│   │   │   │
│   │   │   ├── hooks/                  # Custom React hooks
│   │   │   │   ├── useAuth.ts
│   │   │   │   ├── useEditor.ts
│   │   │   │   ├── useCollaboration.ts
│   │   │   │   ├── useDebounce.ts
│   │   │   │   ├── useLocalStorage.ts
│   │   │   │   ├── usePDF.ts
│   │   │   │   └── useKeyboardShortcuts.ts
│   │   │   │
│   │   │   ├── lib/                    # Utilities and helpers
│   │   │   │   ├── api/
│   │   │   │   │   ├── client.ts       # API client config
│   │   │   │   │   └── endpoints.ts    # API routes
│   │   │   │   ├── pdf/
│   │   │   │   │   ├── pdfjs-setup.ts
│   │   │   │   │   ├── pdf-utils.ts
│   │   │   │   │   └── canvas-utils.ts
│   │   │   │   ├── editor/
│   │   │   │   │   ├── fabric-setup.ts
│   │   │   │   │   ├── editor-utils.ts
│   │   │   │   │   └── history.ts      # Undo/Redo
│   │   │   │   ├── storage/
│   │   │   │   │   └── indexeddb.ts
│   │   │   │   ├── validators.ts
│   │   │   │   └── constants.ts
│   │   │   │
│   │   │   ├── stores/                 # Zustand stores
│   │   │   │   ├── authStore.ts
│   │   │   │   ├── editorStore.ts
│   │   │   │   ├── collaborationStore.ts
│   │   │   │   ├── uiStore.ts
│   │   │   │   └── notificationStore.ts
│   │   │   │
│   │   │   ├── styles/
│   │   │   │   ├── globals.css
│   │   │   │   ├── editor.css
│   │   │   │   └── animations.css
│   │   │   │
│   │   │   ├── types/                  # TypeScript types
│   │   │   │   ├── index.ts
│   │   │   │   ├── api.ts
│   │   │   │   ├── editor.ts
│   │   │   │   └── common.ts
│   │   │   │
│   │   │   └── config/
│   │   │       ├── site.config.ts
│   │   │       └── feature-flags.ts
│   │   │
│   │   ├── __tests__/                  # Tests
│   │   │   ├── components/
│   │   │   ├── hooks/
│   │   │   ├── lib/
│   │   │   └── integration/
│   │   │
│   │   ├── .env.example
│   │   ├── .env.local                  # Local development
│   │   ├── .env.staging                # Staging
│   │   ├── .env.production             # Production
│   │   ├── next.config.js
│   │   ├── tailwind.config.js
│   │   ├── tsconfig.json
│   │   ├── jest.config.js
│   │   └── package.json
│   │
│   └── backend/                        # NestJS application
│       ├── src/
│       │   ├── main.ts                 # Entry point
│       │   │
│       │   ├── modules/                # Feature modules
│       │   │   ├── auth/
│       │   │   │   ├── auth.controller.ts
│       │   │   │   ├── auth.service.ts
│       │   │   │   ├── auth.module.ts
│       │   │   │   ├── strategies/
│       │   │   │   │   ├── jwt.strategy.ts
│       │   │   │   │   └── clerk.strategy.ts
│       │   │   │   ├── guards/
│       │   │   │   │   ├── jwt-auth.guard.ts
│       │   │   │   │   └── roles.guard.ts
│       │   │   │   ├── decorators/
│       │   │   │   │   ├── current-user.decorator.ts
│       │   │   │   │   └── roles.decorator.ts
│       │   │   │   └── dto/
│       │   │   │       ├── login.dto.ts
│       │   │   │       ├── register.dto.ts
│       │   │   │       └── refresh-token.dto.ts
│       │   │   │
│       │   │   ├── files/
│       │   │   │   ├── files.controller.ts
│       │   │   │   ├── files.service.ts
│       │   │   │   ├── files.module.ts
│       │   │   │   ├── storage.service.ts
│       │   │   │   ├── entities/
│       │   │   │   │   └── file.entity.ts
│       │   │   │   └── dto/
│       │   │   │       ├── create-file.dto.ts
│       │   │   │       └── update-file.dto.ts
│       │   │   │
│       │   │   ├── pdf/
│       │   │   │   ├── pdf.controller.ts
│       │   │   │   ├── pdf.service.ts
│       │   │   │   ├── pdf.module.ts
│       │   │   │   ├── pdf-processor.service.ts
│       │   │   │   ├── jobs/
│       │   │   │   │   ├── ocr.job.ts
│       │   │   │   │   └── conversion.job.ts
│       │   │   │   └── dto/
│       │   │   │
│       │   │   ├── editor/
│       │   │   │   ├── editor.gateway.ts   # WebSocket
│       │   │   │   ├── editor.service.ts
│       │   │   │   ├── editor.module.ts
│       │   │   │   ├── collaboration.service.ts
│       │   │   │   └── dto/
│       │   │   │       ├── annotation.dto.ts
│       │   │   │       ├── edit.dto.ts
│       │   │   │       └── collaboration.dto.ts
│       │   │   │
│       │   │   ├── users/
│       │   │   │   ├── users.controller.ts
│       │   │   │   ├── users.service.ts
│       │   │   │   ├── users.module.ts
│       │   │   │   ├── entities/
│       │   │   │   │   └── user.entity.ts
│       │   │   │   └── dto/
│       │   │   │       └── create-user.dto.ts
│       │   │   │
│       │   │   ├── workspaces/
│       │   │   │   ├── workspaces.controller.ts
│       │   │   │   ├── workspaces.service.ts
│       │   │   │   ├── workspaces.module.ts
│       │   │   │   ├── entities/
│       │   │   │   └── dto/
│       │   │   │
│       │   │   ├── payments/
│       │   │   │   ├── payments.controller.ts
│       │   │   │   ├── payments.service.ts
│       │   │   │   ├── payments.module.ts
│       │   │   │   ├── stripe.service.ts
│       │   │   │   └── webhook.controller.ts
│       │   │   │
│       │   │   ├── admin/
│       │   │   │   ├── admin.controller.ts
│       │   │   │   ├── admin.service.ts
│       │   │   │   ├── admin.module.ts
│       │   │   │   └── analytics/
│       │   │   │
│       │   │   └── notifications/
│       │   │       ├── notifications.gateway.ts
│       │   │       ├── notifications.service.ts
│       │   │       └── notifications.module.ts
│       │   │
│       │   ├── common/                 # Shared utilities
│       │   │   ├── decorators/
│       │   │   │   ├── rate-limit.decorator.ts
│       │   │   │   ├── cache.decorator.ts
│       │   │   │   └── public.decorator.ts
│       │   │   ├── filters/
│       │   │   │   ├── all-exceptions.filter.ts
│       │   │   │   └── validation.filter.ts
│       │   │   ├── interceptors/
│       │   │   │   ├── logging.interceptor.ts
│       │   │   │   ├── transform.interceptor.ts
│       │   │   │   └── timeout.interceptor.ts
│       │   │   ├── middleware/
│       │   │   │   ├── logger.middleware.ts
│       │   │   │   └── cors.middleware.ts
│       │   │   ├── pipes/
│       │   │   │   └── validation.pipe.ts
│       │   │   ├── guards/
│       │   │   │   ├── throttle.guard.ts
│       │   │   │   └── request-size.guard.ts
│       │   │   └── utils/
│       │   │       ├── hash.util.ts
│       │   │       ├── encryption.util.ts
│       │   │       └── validators.util.ts
│       │   │
│       │   ├── database/
│       │   │   ├── prisma.service.ts
│       │   │   ├── schema.prisma
│       │   │   ├── migrations/
│       │   │   ├── seeds/
│       │   │   │   ├── seed.ts
│       │   │   │   └── seeders/
│       │   │   └── factories/
│       │   │       └── user.factory.ts
│       │   │
│       │   ├── queue/
│       │   │   ├── jobs/
│       │   │   │   ├── ocr.job.ts
│       │   │   │   ├── conversion.job.ts
│       │   │   │   ├── email.job.ts
│       │   │   │   └── backup.job.ts
│       │   │   ├── queue.module.ts
│       │   │   └── queue.service.ts
│       │   │
│       │   ├── websocket/
│       │   │   ├── events/
│       │   │   ├── handlers/
│       │   │   └── socket.service.ts
│       │   │
│       │   ├── config/
│       │   │   ├── app.config.ts
│       │   │   ├── database.config.ts
│       │   │   ├── jwt.config.ts
│       │   │   ├── storage.config.ts
│       │   │   ├── stripe.config.ts
│       │   │   ├── redis.config.ts
│       │   │   ├── email.config.ts
│       │   │   ├── feature-flags.config.ts
│       │   │   └── environment.ts
│       │   │
│       │   ├── types/
│       │   │   └── index.ts
│       │   │
│       │   └── app.module.ts           # Root module
│       │
│       ├── __tests__/
│       │   ├── unit/
│       │   ├── integration/
│       │   └── e2e/
│       │
│       ├── .env.example
│       ├── .env.local
│       ├── .env.staging
│       ├── .env.production
│       ├── nest-cli.json
│       ├── tsconfig.json
│       ├── jest.config.js
│       ├── package.json
│       └── Dockerfile
│
├── packages/
│   └── shared/                         # Shared code
│       ├── src/
│       │   ├── types/
│       │   │   ├── api.ts              # API DTOs & responses
│       │   │   ├── models.ts           # Domain models
│       │   │   ├── editor.ts           # Editor-specific types
│       │   │   └── common.ts
│       │   ├── utils/
│       │   │   ├── validation.ts
│       │   │   ├── formatting.ts
│       │   │   ├── date.ts
│       │   │   └── number.ts
│       │   ├── constants/
│       │   │   ├── api.ts
│       │   │   ├── roles.ts
│       │   │   ├── status.ts
│       │   │   └── limits.ts
│       │   └── index.ts
│       ├── tsconfig.json
│       └── package.json
│
├── docs/
│   ├── ARCHITECTURE.md                 # System design (created)
│   ├── DATABASE_SCHEMA.md              # Database ERD (created)
│   ├── PROJECT_STRUCTURE.md            # This file
│   ├── DESIGN_SYSTEM.md                # UI components & theme
│   ├── TECH_DECISIONS.md               # Why each technology
│   ├── API_DESIGN.md                   # REST & GraphQL specs
│   ├── DEPLOYMENT_GUIDE.md             # Production deployment
│   ├── DEVELOPMENT_GUIDE.md            # Getting started
│   ├── SECURITY.md                     # Security architecture
│   ├── PERFORMANCE.md                  # Optimization guide
│   └── CONTRIBUTING.md                 # Developer guidelines
│
├── infra/
│   ├── docker-compose.yml              # Local development
│   ├── docker-compose.prod.yml         # Production
│   ├── Dockerfile.frontend             # Frontend image
│   ├── Dockerfile.backend              # Backend image
│   ├── nginx.conf                      # Reverse proxy
│   ├── kubernetes/
│   │   ├── frontend-deployment.yaml
│   │   ├── backend-deployment.yaml
│   │   ├── postgres-statefulset.yaml
│   │   ├── redis-statefulset.yaml
│   │   ├── ingress.yaml
│   │   └── service.yaml
│   └── terraform/                      # AWS/Cloud infrastructure
│       ├── main.tf
│       ├── variables.tf
│       ├── s3.tf
│       ├── rds.tf
│       ├── ecs.tf
│       └── outputs.tf
│
├── .github/
│   └── workflows/
│       ├── ci.yml
│       ├── build.yml
│       ├── deploy-staging.yml
│       └── deploy-production.yml
│
├── .gitignore
├── .prettierrc.json
├── .eslintrc.json
├── package.json                        # Root workspace
├── pnpm-workspace.yaml                 # Monorepo config
├── docker-compose.yml                  # Local dev stack
└── README.md                           # Project overview
```

## 📦 Frontend Structure Details

### Components Hierarchy
```
App (Root)
├─ AuthProvider
├─ ThemeProvider (Dark/Light)
├─ NotificationProvider
├─ Routes
│  ├─ LandingPage
│  ├─ AuthLayout
│  │  ├─ LoginPage
│  │  ├─ RegisterPage
│  │  └─ ResetPasswordPage
│  └─ AppLayout (Protected)
│     ├─ DashboardPage
│     ├─ EditorPage
│     ├─ SettingsPage
│     └─ AdminPage
```

### State Management (Zustand)
```
authStore
├─ user
├─ isAuthenticated
├─ login()
├─ logout()
└─ refreshToken()

editorStore
├─ currentFile
├─ pages
├─ annotations
├─ currentPage
├─ zoom
├─ selection
├─ history
├─ addAnnotation()
├─ updateAnnotation()
├─ deleteAnnotation()
├─ undo()
└─ redo()

collaborationStore
├─ activeUsers
├─ userCursors
├─ updateCursor()
├─ broadcastChange()
└─ syncState()

uiStore
├─ isDarkMode
├─ sidebarOpen
├─ showProperties
├─ toggleDarkMode()
├─ toggleSidebar()
└─ toggleProperties()

notificationStore
├─ notifications
├─ addNotification()
├─ removeNotification()
└─ clearAll()
```

## 🔧 Backend Structure Details

### Module Organization
```
AuthModule
├─ AuthController
├─ AuthService
├─ JwtStrategy
├─ ClerkStrategy
├─ JwtGuard
├─ RolesGuard
└─ Decorators

FileModule
├─ FilesController
├─ FilesService
├─ StorageService
├─ FileEntity
└─ FileFactory

EditorModule
├─ EditorGateway (WebSocket)
├─ EditorService
├─ CollaborationService
└─ DTOs

PaymentModule
├─ PaymentsController
├─ PaymentsService
├─ StripeService
├─ StripeWebhookController
└─ Entities
```

### Request Lifecycle
```
HTTP Request
  ↓
Guard (Auth, Roles)
  ↓
Interceptor (Logging, Timing)
  ↓
Controller Route Handler
  ↓
Service (Business Logic)
  ↓
Database/External Service
  ↓
Transformer Interceptor
  ↓
HTTP Response
```

## 🎨 Shared Package

All shared types and utilities go here, imported by both frontend and backend:

```typescript
// Types
export type User = { ... }
export type File = { ... }
export type Annotation = { ... }
export type ApiResponse<T> = { ... }

// Constants
export const ROLES = { OWNER, EDITOR, VIEWER, COMMENTER }
export const FILE_STATUS = { ACTIVE, ARCHIVED, DELETED }
export const SUBSCRIPTION_PLANS = { FREE, STARTER, PRO, BUSINESS }

// Utilities
export const validateEmail = (email: string) => { ... }
export const formatFileSize = (bytes: number) => { ... }
export const parseJwt = (token: string) => { ... }
```

## 🚀 Configuration Files

### Root package.json
```json
{
  "name": "docfusion",
  "version": "1.0.0",
  "private": true,
  "workspaces": [
    "apps/frontend",
    "apps/backend",
    "packages/shared"
  ],
  "scripts": {
    "dev": "pnpm -r --parallel run dev",
    "build": "pnpm -r run build",
    "test": "pnpm -r run test",
    "lint": "pnpm -r run lint",
    "format": "pnpm -r run format",
    "type-check": "pnpm -r run type-check",
    "db:migrate": "cd apps/backend && npm run db:migrate",
    "db:seed": "cd apps/backend && npm run db:seed",
    "docker:up": "docker-compose up -d",
    "docker:down": "docker-compose down"
  }
}
```

### pnpm-workspace.yaml
```yaml
packages:
  - 'apps/*'
  - 'packages/*'

postinstall-commands:
  - husky install
```

## 📝 Git Structure

```
main (production)
  └─ staging (staging environment)
      └─ develop (development)
          ├─ feature/auth
          ├─ feature/editor
          ├─ feature/payments
          └─ bugfix/issue-123
```

## 🔐 Environment Files

### Frontend (.env.example)
```env
NEXT_PUBLIC_API_URL=http://localhost:3001
NEXT_PUBLIC_APP_NAME=PDFLeader Pro
NEXT_PUBLIC_CLERK_KEY=pk_...
NEXT_PUBLIC_STRIPE_KEY=pk_...
NEXT_PUBLIC_SENTRY_DSN=...
```

### Backend (.env.example)
```env
NODE_ENV=development
PORT=3001
DATABASE_URL=postgresql://user:pass@localhost:5432/docfusion
REDIS_URL=redis://localhost:6379
JWT_SECRET=your-secret
CLERK_API_KEY=sk_...
STRIPE_SECRET=sk_...
AWS_S3_BUCKET=docfusion-files
AWS_REGION=us-east-1
SMTP_HOST=smtp.gmail.com
```

---

**Status**: Phase 1 ✅ - Project structure and file organization complete.  
**Next**: Design system, technology decisions documentation, and configuration.
