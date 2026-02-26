# Issue Tracker

A full-stack issue tracking application built with Next.js 15, Prisma, and PostgreSQL. Designed for teams to create, manage, assign, and resolve issues with a clean, modern interface.

Live features include role-based access, real-time status updates, commenting, a dashboard with visual charts, markdown-powered descriptions, and more.

---

## Table of Contents

- [Tech Stack](#tech-stack)
- [Features](#features)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Database](#database)
- [Authentication](#authentication)
- [Docker](#docker)
- [API Routes](#api-routes)

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 15 (App Router, Turbopack) |
| Language | TypeScript |
| UI Library | React 19 |
| Styling | Tailwind CSS v4, Radix Themes, shadcn/ui |
| Database | PostgreSQL |
| ORM | Prisma 7 |
| Authentication | NextAuth.js v5 (Auth.js) |
| Auth Providers | Google OAuth 2.0, Resend (magic link email) |
| State Management | TanStack React Query |
| Forms | React Hook Form + Zod validation |
| Charts | Recharts (Treemap visualization) |
| Markdown | SimpleMDE editor + React Markdown renderer |
| Caching | Redis (Upstash) |
| Rate Limiting | Upstash Ratelimit + Redis |
| Error Monitoring | Sentry |
| Containerization | Docker + Docker Compose |
| Fonts | Geist Sans and Geist Mono |

---

## Features

### Issue Management
- Create issues with a title and markdown-formatted description using a rich SimpleMDE editor.
- Edit issues through a dedicated edit form pre-filled with existing data.
- Delete issues with a confirmation dialog.
- View issue details with rendered markdown, status badges, timestamps, and linked comments.

### Status Tracking
- Three statuses: `OPEN`, `IN_PROGRESS`, `CLOSED`.
- Inline status updates via a dropdown on the issue detail page, persisted immediately.
- Color-coded status badges throughout the app.

### Assignment
- Assign issues to users from a dropdown populated with registered users.
- Unassign by selecting the unassigned option.
- Assignments update via API calls without page reload.

### Comments
- Authenticated users can post comments on any issue.
- Comments display the author's avatar, name, and timestamp.
- Comments are ordered chronologically and cascade-deleted with the parent issue.

### Dashboard (Admin Only)
- Issue summary cards showing counts for Open, In Progress, and Closed issues.
- Treemap chart visualizing the distribution of issue statuses.
- Latest issues panel showing recently created or updated issues.
- Dashboard stats are cached in Redis for 10 minutes to reduce database load.
- Access restricted to users with the `ADMIN` role.

### Filtering, Sorting, and Pagination
- Filter issues by status using a dropdown on the issues list page.
- Sort by column (title, status, created date) by clicking column headers.
- Pagination with first/prev/next/last navigation.
- Configurable page size selector.

### Authentication and Authorization
- Google OAuth 2.0 with automatic token refresh for long-lived sessions.
- Magic link sign-in via Resend email provider.
- JWT-based sessions with a 30-day expiry.
- Role-based access control with `USER` and `ADMIN` roles.
- Protected routes enforced via Next.js middleware — dashboard, issue creation, and edit pages require authentication.
- User role is refreshed from the database on every token rotation.

### Theming
- Dark and light mode toggle using next-themes.
- System preference detection with manual override.
- Consistent theming via Radix Themes with violet accent color.

### Performance and Reliability
- Redis caching for dashboard statistics.
- Rate limiting on API endpoints using Upstash Redis (10 requests per 60-second window).
- React Query for client-side data caching, deduplication, and background refetching.
- Loading skeletons on every page transition.
- Turbopack enabled for fast development builds.

### Error Handling
- Sentry integration for server-side, client-side, and edge runtime error tracking.
- Source map uploads for readable production stack traces.
- Global error boundary.
- Health check endpoint at `/api/health`.

### SEO
- Dynamic metadata generation per page (issue titles, dashboard, etc.).
- Referrer policy headers configured in next.config.ts.

---

## Project Structure

```
app/
  layout.tsx              # Root layout with providers (Auth, Theme, QueryClient, Toaster)
  navbar.tsx              # Navigation bar with auth status and theme toggle
  page.tsx                # Landing page with hero section and feature cards
  validationSchema.tsx    # Zod schemas for issue creation and patching
  api/
    issue/                # Issue CRUD endpoints (POST, PATCH, DELETE)
    users/                # User listing endpoint
    health/               # Health check
    auth/[...nextauth]/   # NextAuth route handler
  dashboard/              # Admin dashboard (summary, chart, latest issues)
  issues/
    page.tsx              # Issues list with filtering, sorting, pagination
    IssueTable.tsx        # Server component rendering the sortable issue table
    IssueStatusFilter.tsx # Status filter dropdown
    PageSizeSelector.tsx  # Page size config dropdown
    _components/
      IssueForm.tsx       # Shared form for create and edit with SimpleMDE
      DeleteButton.tsx    # Delete with confirmation dialog
    [id]/
      page.tsx            # Issue detail page
      IssueDetail.tsx     # Markdown-rendered issue content
      StatusSelect.tsx    # Inline status update
      AsigneeSelect.tsx   # Inline user assignment
      Comments.tsx        # Comments section
      CommentForm.tsx     # Comment input form
      edit/               # Edit page (reuses IssueForm)
    new/                  # New issue page
  components/             # Shared components (Pagination, StatusBadge, Skeleton, etc.)
prisma/
  schema.prisma           # Database schema (Issue, User, Comment, Account, Session)
  client.ts               # Prisma client singleton
  seed.ts                 # Database seeder
lib/
  redis.ts                # Upstash Redis client
  rate-limit.ts           # Rate limiting utility
```

---

## Getting Started

### Prerequisites

- Node.js 22+
- PostgreSQL 16+
- Redis instance (Upstash recommended, or local)
- Google OAuth credentials
- Resend API key (for magic link emails)

### Installation

```bash
git clone <repository-url>
cd issue-tracker
npm install
```

### Set up the database

```bash
npx prisma migrate dev
npx prisma db seed
```

### Run the development server

```bash
npm run dev
```

The app will be available at `http://localhost:3000`.

---

## Environment Variables

Create a `.env` file in the root directory:

```env
# Database
DATABASE_URL=postgresql://user:password@localhost:5432/issuetracker?schema=public

# NextAuth
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-here

# Google OAuth
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret

# Resend (magic link email)
AUTH_RESEND_KEY=your-resend-api-key

# Redis (Upstash)
REDIS_URL=your-redis-url

# Sentry (optional)
SENTRY_DSN=your-sentry-dsn
```

---

## Database

The Prisma schema defines the following models:

| Model | Purpose |
|---|---|
| Issue | Core entity with title, description (markdown), status enum, timestamps |
| User | Authenticated user with name, email, image, role (USER or ADMIN) |
| Comment | User comments on issues, cascade-deleted with parent issue |
| Account | OAuth account linking (Google, etc.) |
| Session | Active user sessions |
| VerificationToken | Email verification tokens |
| Authenticator | WebAuthn support (optional) |

Issue statuses: `OPEN`, `IN_PROGRESS`, `CLOSED`.

---

## Authentication

Authentication is handled by NextAuth.js v5 with two providers:

1. **Google OAuth 2.0** — Primary sign-in method. Configured with offline access for refresh tokens. Tokens are automatically refreshed when expired.
2. **Resend** — Magic link email authentication as a fallback.

Sessions use JWT strategy with a 30-day expiry. User roles are stored in the database and synced to the JWT on every refresh. The middleware protects `/dashboard`, `/issues/new`, and `/issues/:id/edit` routes.

---

## Docker

The project includes a production-ready Dockerfile (multi-stage, Alpine-based) and a `compose.yaml` for running the full stack:

```bash
docker compose up --build
```

This starts:
- Next.js app on port 3000
- PostgreSQL 16 with persistent volume
- Redis (optional, can use cloud Upstash instead)

Health checks are configured for all services.

---

## API Routes

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/issue` | Create a new issue |
| PATCH | `/api/issue/[id]` | Update issue (title, description, status, assignee) |
| DELETE | `/api/issue/[id]` | Delete an issue |
| GET | `/api/users` | List all registered users |
| GET | `/api/health` | Health check |
| GET/POST | `/api/auth/*` | NextAuth.js authentication routes |

All mutation endpoints validate input with Zod schemas before processing.

---

## License

This project is for personal and educational use.
