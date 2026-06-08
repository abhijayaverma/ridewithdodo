# RideShareX

RideShareX is a production-oriented scheduled shared-ride platform inspired by Uber, Ola, Rapido Pool, BlaBlaCar, and InDrive. Drivers publish verified planned rides, passengers search and book seats, and admins manage trust, payments, disputes, and verification.

## Stack

- Frontend: Next.js 15, React, TypeScript, Tailwind CSS, ShadCN-style UI, Framer Motion, React Hook Form, Zod
- Backend: Node.js, Express, TypeScript, Socket.io
- Database: PostgreSQL with Prisma
- Auth: JWT, OTP-ready abstraction, Google login placeholder
- Storage: Cloudinary-ready document and image references
- Payments: Stripe and Razorpay provider boundaries
- Deployment: Docker Compose locally, Vercel frontend, Railway/Render backend

## Quick Start

```bash
cp .env.example .env
docker compose up -d postgres redis
npm install
npm run db:migrate
npm run dev
```

Frontend: `http://localhost:3000`
API health: `http://localhost:4000/api/v1/health`

## Included

- Monorepo structure for web, API, and shared types
- PostgreSQL schema covering users, drivers, verification, rides, stops, bookings, payments, reviews, ratings, notifications, chat, wallet, referrals, reports, emergency contacts, coupons, and admin logs
- REST API modules for auth, rides, bookings, payments, chat, notifications, reviews, admin, and safety
- Driver verification gate: unapproved drivers cannot publish rides
- Seat reservation flow with transactional seat decrement
- Responsive landing, search, passenger, driver, and admin pages
- Security middleware: Helmet, CORS, rate limiting, JWT guards, role guards, Zod validation
- Socket.io realtime channels for ride chat, typing, and location updates
- Docker and deployment documentation

Payment capture, OTP sending, Google Maps, SMS, email, push notifications, and Cloudinary require real provider credentials. The scaffold keeps those integrations isolated so credentials can be added without rewriting route logic.
