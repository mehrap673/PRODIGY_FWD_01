# Authentication System

## Overview

A full-stack MERN (MongoDB, Express, React, Node.js) authentication system with role-based access control. The application provides secure user registration, login, and protected routes with JWT-based authentication stored in HTTP-only cookies. Features include user and admin roles, profile management, and an admin dashboard for user oversight.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Technology Stack:**
- React 18+ with TypeScript support (though configured for JSX/TSX)
- Vite as build tool and development server
- Wouter for client-side routing
- TanStack Query (React Query) for server state management
- Tailwind CSS with shadcn/ui component library
- Material Design 3 principles with custom refinements

**Key Design Decisions:**
- **Component Library**: shadcn/ui (Radix UI primitives) chosen for accessibility, customization, and modern design patterns
- **Styling Approach**: Utility-first CSS with Tailwind, custom CSS variables for theming supporting light/dark modes
- **State Management**: 
  - React Context API for authentication state (AuthContext)
  - TanStack Query for API data fetching and caching
  - Local component state for form handling
- **Routing**: Wouter for lightweight client-side routing (avoiding react-router overhead)
- **Form Handling**: React Hook Form with Zod validation (@hookform/resolvers)

**Directory Structure:**
```
client/src/
├── components/ (UI components from shadcn)
├── contexts/ (AuthContext for global auth state)
├── hooks/ (Custom hooks like use-toast, use-mobile)
├── lib/ (Utilities, query client configuration)
├── pages/ (Route components: Home, Login, Register, Profile, Admin)
└── index.css (Global styles and CSS variables)
```

**Authentication Flow:**
- AuthContext wraps the entire app, providing user state and auth methods
- Protected routes check authentication status via useAuth hook
- Role-based access control enforced client-side (Profile requires login, Admin requires admin role)
- Server validates all protected requests via JWT tokens

### Backend Architecture

**Technology Stack:**
- Node.js with Express framework
- MongoDB with Mongoose ODM
- TypeScript-ready but currently using JavaScript modules (.js extensions)
- Session management with express-session and connect-pg-simple
- Drizzle ORM configured (for future PostgreSQL migration from MongoDB)

**Key Design Decisions:**
- **Database**: MongoDB selected for flexible schema and rapid development
  - User model: name, email, hashed password (bcrypt), role (user/admin)
  - Mongoose schemas with pre-save hooks for password hashing
  - Future migration path to PostgreSQL with Drizzle ORM (config already present)
- **Authentication Strategy**: JWT tokens stored in HTTP-only cookies for security
  - Tokens signed with JWT_SECRET, 7-day expiration
  - Cookie options: httpOnly, secure (production), sameSite strict
  - Fallback to Authorization Bearer header for API clients
- **Middleware Architecture**:
  - `authMiddleware`: Validates JWT from cookies or Authorization header, attaches user to request
  - `permit(...roles)`: Role-based access control middleware factory
  - Error handling middleware with standardized JSON responses
- **API Structure**:
  - `/api/auth/*`: Authentication endpoints (register, login, logout, me)
  - `/api/profile`: Protected user profile endpoint
  - `/api/admin`: Admin-only endpoint with user statistics

**Directory Structure:**
```
server/
├── config/ (Database connection setup)
├── middleware/ (auth.js, roles.js)
├── models/ (Mongoose User model)
├── routes/ (auth.js, protected.js)
├── index.ts (Express server setup)
├── routes.ts (Route registration)
└── storage.ts (In-memory storage interface for development)
```

**Security Measures:**
- Passwords hashed with bcrypt (10 salt rounds)
- JWT tokens with expiration
- HTTP-only cookies prevent XSS access
- Input validation on registration/login
- Environment variables for secrets (JWT_SECRET, MONGO_URI)

### Data Architecture

**Current Database**: MongoDB
- Single `users` collection with embedded user data
- No relations, simple document structure
- Indexed on email field (unique constraint)

**Planned Database**: PostgreSQL with Drizzle ORM
- Schema defined in `shared/schema.ts` using drizzle-orm/pg-core
- Neon serverless PostgreSQL adapter configured
- Migration scripts in `/migrations` directory
- User table schema matches MongoDB structure for smooth migration

**Data Validation**:
- Shared schema validation using Zod (drizzle-zod integration)
- `insertUserSchema` for user creation validation
- `loginSchema` for authentication validation
- Client and server use same validation schemas from `shared/schema.ts`

### External Dependencies

**Core Infrastructure:**
- **MongoDB Atlas** (or local MongoDB): Primary database for user data
- **PostgreSQL** (future): Neon serverless PostgreSQL for production migration
- **Drizzle Kit**: Database schema management and migrations

**Third-Party Libraries:**
- **Authentication**: `jsonwebtoken` (JWT creation/verification), `bcrypt` (password hashing)
- **Session Management**: `cookie-parser`, `connect-pg-simple` (PostgreSQL session store)
- **UI Components**: Radix UI primitives (@radix-ui/react-*)
- **Styling**: Tailwind CSS, class-variance-authority, clsx
- **Forms**: React Hook Form, Zod, @hookform/resolvers
- **Development**: Vite, tsx (TypeScript execution), esbuild
- **Replit Integration**: Custom Vite plugins for dev environment (@replit/vite-plugin-*)

**Environment Variables Required:**
- `MONGO_URI`: MongoDB connection string
- `DATABASE_URL`: PostgreSQL connection string (future)
- `JWT_SECRET`: Secret key for JWT signing
- `PORT`: Server port (optional, defaults available)
- `NODE_ENV`: Environment mode (development/production)

**API Endpoints:**
- POST `/api/auth/register`: User registration
- POST `/api/auth/login`: User authentication
- POST `/api/auth/logout`: Session termination
- GET `/api/auth/me`: Current user information
- GET `/api/profile`: Protected user profile
- GET `/api/admin`: Admin dashboard (admin role required)