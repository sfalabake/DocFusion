# PDFLeader Pro - Backend API

Advanced PDF editing backend service built with NestJS, PostgreSQL, and Prisma.

## Quick Start

### Prerequisites
- Node.js 18+
- PostgreSQL 15+
- Redis 7+
- npm or pnpm

### Installation

1. **Install dependencies**
```bash
pnpm install
```

2. **Set up environment variables**
```bash
cp .env.example .env
```

3. **Run database migrations**
```bash
pnpm run db:migrate
```

4. **Seed database with sample data (optional)**
```bash
pnpm run db:seed
```

5. **Start development server**
```bash
pnpm run start:dev
```

The API will be available at `http://localhost:3001`

## API Documentation

Swagger documentation is available at `http://localhost:3001/api` in development mode.

## Project Structure

```
src/
├── main.ts                 # Application entry point
├── app.module.ts          # Root module
├── modules/
│   ├── auth/              # Authentication module
│   ├── users/             # User management
│   ├── files/             # File upload & management
│   ├── comments/          # Comments on PDFs
│   ├── annotations/       # PDF annotations
│   ├── collaborations/    # File sharing
│   ├── subscriptions/     # Subscription management
│   └── notifications/     # User notifications
└── prisma/                # Database layer
```

## Available Scripts

- `pnpm run start:dev` - Start development server with hot reload
- `pnpm run build` - Build for production
- `pnpm run start:prod` - Start production server
- `pnpm run lint` - Run ESLint
- `pnpm run test` - Run unit tests
- `pnpm run test:cov` - Generate test coverage

## Authentication

The API uses JWT (JSON Web Tokens) for authentication:

- **Access Token**: Valid for 15 minutes, used for API requests
- **Refresh Token**: Valid for 7 days, used to get new access tokens

### Endpoints

- `POST /auth/register` - Register new user
- `POST /auth/login` - Login user
- `POST /auth/refresh` - Refresh access token
- `POST /auth/logout` - Logout user
- `GET /auth/me` - Get current user info

## File Upload

Files are uploaded to MinIO (S3-compatible) and stored as configured.

Maximum file size: 100MB
Supported formats: PDF

## Environment Variables

See `.env.example` for all available configuration options.

Key variables:
- `DATABASE_URL` - PostgreSQL connection string
- `JWT_SECRET` - Secret key for JWT signing
- `API_PORT` - Port to run API on (default: 3001)

## Development

### Database Management

```bash
# Create new migration
pnpm run db:migrate:create

# Run migrations
pnpm run db:migrate

# Reset database
pnpm run db:reset

# Open Prisma Studio
pnpm run db:studio
```

### Code Quality

```bash
# Format code
pnpm run format

# Lint code
pnpm run lint

# Type check
pnpm run type-check
```

## Troubleshooting

### Database Connection Error
- Ensure PostgreSQL is running
- Check DATABASE_URL in .env file
- Verify database exists

### JWT Errors
- Ensure JWT_SECRET is set in .env
- Check token expiration times
- Verify Authorization header format: `Bearer <token>`

### File Upload Issues
- Ensure MinIO is running
- Check AWS_S3_ENDPOINT configuration
- Verify file size is under 100MB

## Contributing

1. Create a feature branch
2. Commit changes
3. Push to branch
4. Create a Pull Request

## License

MIT
