# RideShareX API

Base URL: `/api/v1`

## Auth

- `POST /auth/register` creates a passenger or driver account.
- `POST /auth/login` returns JWT access and refresh tokens.
- `POST /auth/otp/request` requests phone verification.
- `POST /auth/otp/verify` verifies the OTP. Development code is `123456`.
- `GET /auth/google` is a placeholder for OAuth configuration.

## Rides

- `GET /rides/search` supports source, destination, date, seats, verified-only, max-price, vehicle type, and sorting filters.
- `POST /rides` lets approved drivers publish rides with stops, seat count, price, luggage allowance, and departure details.
- `PATCH /rides/:id` updates a driver-owned ride.
- `POST /rides/:id/cancel` cancels a ride and audit-logs the reason.

## Bookings

- `POST /bookings` reserves passenger seats transactionally.
- `POST /bookings/:id/decision` lets a driver accept or reject a passenger.
- `POST /bookings/:id/cancel` cancels a booking and restores seats.

## Payments

- `POST /payments/intent` creates a payment record for Stripe or Razorpay.
- `POST /payments/webhook/:provider` receives provider events. Add signature verification before production.

## Chat And Notifications

- `GET /chats/:rideId/messages`
- `POST /chats/:rideId/messages`
- `GET /notifications`
- `PATCH /notifications/:id/read`

Socket.io events:

- `ride:join`
- `chat:typing`
- `location:update`

## Reviews

- `POST /reviews`
- `GET /reviews/driver/:driverId`

## Admin

- `GET /admin/analytics`
- `PATCH /admin/drivers/:driverId/verification`
- `PATCH /admin/users/:userId/suspend`

## Safety

- `POST /safety/sos`
- `POST /safety/reports`
- `POST /safety/blocks`
