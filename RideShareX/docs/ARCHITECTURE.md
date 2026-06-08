# Architecture

RideShareX uses a modular monorepo:

- `apps/web`: Next.js mobile-first frontend
- `apps/api`: Express API, Socket.io realtime channels, Prisma database access
- `packages/shared`: shared TypeScript domain types

## Scalability

- Stateless API instances behind a load balancer
- PostgreSQL primary with read replicas for search-heavy traffic
- Redis for sessions, rate limits, queues, OTP cache, and websocket fan-out
- Cloudinary for verification documents and vehicle photos
- Idempotent payment webhooks
- Async notification workers for email, SMS, and push

## Security

- JWT access and refresh token split
- Passwords hashed with bcrypt
- Helmet, CORS allowlist, rate limiting, and Zod validation
- Prisma parameterized queries for SQL injection protection
- Role guards for passenger, driver, and admin actions
- Verification gate prevents unapproved drivers from publishing rides
- Admin audit logging for sensitive mutations
- Payment data delegated to PCI-compliant providers

## AI Feature Hooks

- Smart fare suggestions can use distance, demand, historical fill rate, and user price sensitivity.
- Fraud detection can score account age, payment failures, cancellation patterns, device/IP reputation, and booking graph anomalies.
- Ride recommendations can rank route similarity, saved places, rating, price, and booking history.
