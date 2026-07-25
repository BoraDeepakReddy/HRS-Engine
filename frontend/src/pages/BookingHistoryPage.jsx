import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { listReservations } from "../services/bookingService";
import StatusPill from "../components/StatusPill";

export default function BookingHistoryPage() {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;
    listReservations()
      .then((data) => active && setReservations(data))
      .catch((err) => active && setError(err.message))
      .finally(() => active && setLoading(false));
    return () => {
      active = false;
    };
  }, []);

  return (
    <section className="page">
      <header className="page-head">
        <span className="eyebrow">Your stays</span>
        <h1>Reservation history</h1>
        <p className="lede">Every hold, payment attempt, and confirmed stay tied to your name.</p>
      </header>

      {loading && <p>Loading reservations…</p>}
      {error && <p className="form-error">{error}</p>}

      {!loading && reservations.length === 0 && (
        <p className="empty-state">No reservations yet — <Link to="/">book your first room</Link>.</p>
      )}

      {reservations.length > 0 && (
        <table className="res-table">
          <thead>
            <tr>
              <th>Reservation</th>
              <th>Room</th>
              <th>Check-in</th>
              <th>Check-out</th>
              <th>Total</th>
              <th>Status</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {reservations.map((r) => (
              <tr key={r.id}>
                <td>{r.id}</td>
                <td>Room {r.roomNumber} · {r.roomType}</td>
                <td>{r.checkInDate}</td>
                <td>{r.checkOutDate}</td>
                <td>${r.totalAmount}</td>
                <td><StatusPill status={r.status} /></td>
                <td>
                  {["HELD", "CONFIRMED"].includes(r.status) && (
                    <Link to={`/cancel/${r.id}`} className="table-link">Cancel</Link>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </section>
  );
}