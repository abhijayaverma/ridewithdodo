# Deployment

## Frontend: Vercel

Set project root to `apps/web` or use a monorepo-aware Vercel setup. Configure:

- `NEXT_PUBLIC_API_URL`
- `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY` if using Google Maps

## Backend: Railway Or Render

Build command:

```bash
npm install && npm run build --workspace @ridesharex/api
```

Start command:

```bash
npm run start --workspace @ridesharex/api
```

Configure all variables in `.env.example`, especially `DATABASE_URL` and JWT secrets.

## Database

Use managed PostgreSQL. Run migrations during release:

```bash
npm run db:migrate --workspace @ridesharex/api
```

## Production Checklist

- Rotate JWT secrets and provider keys.
- Configure CORS to the production frontend only.
- Configure webhook signature verification for Stripe and Razorpay.
- Move OTP from console provider to SMS provider.
- Add Redis-backed rate limiting and queues.
- Add observability: logs, traces, metrics, uptime checks.
- Add background workers for notification fan-out and refund processing.
