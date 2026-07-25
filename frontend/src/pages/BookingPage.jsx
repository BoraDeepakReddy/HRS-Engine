import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { searchAvailability } from "../services/availabilityService";
import { createHold } from "../services/bookingService";

function todayPlus(days) {
  const d = new Date();
  d.setDate(d.getDate() + days);
  return d.toISOString().slice(0, 10);
}

export default function BookingPage() {
  const navigate = useNavigate();
  const [checkIn, setCheckIn] = useState(todayPlus(7));
  const [checkOut, setCheckOut] = useState(todayPlus(9));
  const [guestName, setGuestName] = useState("");
  const [roomTypeFilter, setRoomTypeFilter] = useState("");
  const [rooms, setRooms] = useState(null);
  const [loading, setLoading] = useState(false);
  const [holdingId, setHoldingId] = useState(null);
  const [error, setError] = useState("");

  async function handleSearch(e) {
    e.preventDefault();
    setError("");
    if (checkOut <= checkIn) {
      setError("Check-out date must be after check-in date.");
      return;
    }
    setLoading(true);
    try {
      const data = await searchAvailability({ roomType: roomTypeFilter || undefined });
      setRooms(data);
    } catch (err) {
      setError(err.message || "Could not load rooms from the backend.");
    } finally {
      setLoading(false);
    }
  }

  async function handleHold(roomId) {
    setError("");
    if (!guestName.trim()) {
      setError("Enter a guest name before holding a room.");
      return;
    }
    setHoldingId(roomId);
    try {
      const reservation = await createHold({ roomId, checkInDate: checkIn, checkOutDate: checkOut, guestName });
      navigate(`/payment/${reservation.id}`);
    } catch (err) {
      setError(err.message || "Could not hold this room — it may have just been taken.");
      // refresh the list since availability may have changed
      handleSearch({ preventDefault: () => {} });
    } finally {
      setHoldingId(null);
    }
  }

  return (
    <section className="page">
      <header className="page-head">
        <span className="eyebrow">Book a stay</span>
        <h1>Find your room</h1>
        <p className="lede">
          Rooms come straight from the backend's <code>/api/rooms</code> endpoint. Holding a
          room marks it unavailable immediately for every other guest.
        </p>
      </header>

      <form className="search-form" onSubmit={handleSearch}>
        <label>
          Check-in
          <input type="date" value={checkIn} onChange={(e) => setCheckIn(e.target.value)} required />
        </label>
        <label>
          Check-out
          <input type="date" value={checkOut} onChange={(e) => setCheckOut(e.target.value)} required />
        </label>
        <label>
          Room type (optional)
          <input
            type="text"
            placeholder="e.g. Deluxe"
            value={roomTypeFilter}
            onChange={(e) => setRoomTypeFilter(e.target.value)}
          />
        </label>
        <label>
          Guest name
          <input
            type="text"
            placeholder="Your name"
            value={guestName}
            onChange={(e) => setGuestName(e.target.value)}
            required
          />
        </label>
        <button type="submit" className="btn-primary" disabled={loading}>
          {loading ? "Searching…" : "Search availability"}
        </button>
      </form>

      {error && <p className="form-error">{error}</p>}

      {rooms && rooms.length === 0 && <p className="empty-state">No available rooms match that search.</p>}

      {rooms && rooms.length > 0 && (
        <div className="room-grid">
          {rooms.map((room) => (
            <article key={room.id} className="room-card">
              <div className="room-card-top">
                <h3>Room {room.roomNumber}</h3>
                <span className="price">
                  ${room.pricePerNight}
                  <span className="price-unit">/night</span>
                </span>
              </div>
              <p className="room-meta">{room.roomType}</p>
              <button
                className="btn-secondary"
                disabled={holdingId === room.id}
                onClick={() => handleHold(room.id)}
              >
                {holdingId === room.id ? "Holding…" : "Hold this room"}
              </button>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}