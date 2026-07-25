import { useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { cancelReservation } from "../services/bookingService";

export default function CancellationPage() {
  const { reservationId } = useParams();
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState("");

  async function handleConfirm() {
    setSubmitting(true);
    setError("");
    try {
      await cancelReservation(reservationId);
      setDone(true);
      setTimeout(() => navigate("/history"), 1200);
    } catch (err) {
      setError(err.message || "Could not cancel this reservation.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section className="page page-narrow">
      <header className="page-head">
        <span className="eyebrow">Reservation {reservationId}</span>
        <h1>Cancel this reservation?</h1>
        <p className="lede">
          Cancelling moves the reservation to <code>RELEASED</code> and returns the room to the
          public availability pool immediately.
        </p>
      </header>

      {done ? (
        <p className="confirm-banner">Reservation cancelled. Redirecting to your history…</p>
      ) : (
        <div className="confirm-actions">
          <button className="btn-danger" onClick={handleConfirm} disabled={submitting}>
            {submitting ? "Cancelling…" : "Yes, cancel reservation"}
          </button>
          <Link to="/history" className="btn-secondary-link">Keep reservation</Link>
        </div>
      )}

      {error && <p className="form-error">{error}</p>}
    </section>
  );
}