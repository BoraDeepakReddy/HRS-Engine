# HRS Frontend — Scaffold

React + Vite frontend for the Hotel Reservation Engine. Updated to match the backend's
actual README: **Hotel and Room CRUD are real**, **Reservation/Payment are still "Planned"**
on the backend, so those stay mocked client-side until that module ships.

## Run it

```bash
npm install
npm run dev
```

Opens on `http://localhost:5173`. The Vite dev server proxies `/api/*` to
`http://localhost:8080` (your Spring Boot app).

## What's real vs. mock right now

| Feature | Status | Talks to |
|---|---|---|
| Hotel CRUD (admin dashboard) | **Real** | `GET/POST/PUT/DELETE /api/hotels` |
| Room CRUD (admin dashboard) | **Real** | `GET/POST/PUT/DELETE /api/rooms` |
| Room availability search (booking page) | **Real** (just filters real rooms by `available`) | `GET /api/rooms` |
| Holding a room | **Hybrid** — flips the real room's `available` flag via `PUT /api/rooms/{id}`, then tracks the booking as a mock reservation client-side | `PUT /api/rooms/{id}` + mock |
| Payment | **Mock** | none yet |
| Reservation history / cancellation | **Mock** | none yet |

## Structure

\```
src/
  App.jsx
  components/
    Layout.jsx
    StatusPill.jsx
  pages/
    BookingPage.jsx          # real room search + hold
    PaymentPage.jsx          # mock state machine
    BookingHistoryPage.jsx   # mock reservation list
    CancellationPage.jsx     # mock cancel, releases the real room
    AdminDashboardPage.jsx   # real Hotel/Room CRUD + mock reservation overview
  services/
    apiClient.js              # fetch wrapper
    hotelService.js           # REAL — /api/hotels
    roomService.js             # REAL — /api/rooms
    availabilityService.js     # REAL — filters /api/rooms by available
    bookingService.js          # HYBRID — real room update, mock reservation
    paymentService.js          # MOCK
    adminService.js            # combines real hotels/rooms + mock reservations
    mockDb.js                  # in-memory reservation store (delete once backend ships it)
\```

## When the backend adds Reservation/Payment

1. Add real endpoints to `bookingService.js` (`POST /api/bookings/hold`, `GET /api/reservations`,
   `POST /api/reservations/{id}/cancel`) and `paymentService.js` (`POST /api/payments`).
2. Delete `mockDb.js` and the `reservations` mock array from `adminService.js`.
3. No page (`BookingPage.jsx`, `PaymentPage.jsx`, etc.) needs to change — they only call the
   service functions, not the mock data directly.

Field names throughout (`hotelName`, `location`, `totalRooms`, `roomNumber`, `roomType`,
`pricePerNight`, `available`) match the backend readme's sample requests exactly — confirm
with whoever owns the Java entities if those drift.