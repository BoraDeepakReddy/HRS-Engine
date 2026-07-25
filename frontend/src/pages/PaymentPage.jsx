import { useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { submitPayment } from "../services/paymentService";
import StatusPill from "../components/StatusPill";

export default function PaymentPage() {
  const { reservationId } = useParams();
  const navigate = useNavigate();
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const [status, setStatus] = useState("HELD");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setSubmitting(true);
    setStatus("PAYMENT_PROCESSING");
    try {
      const updated = await submitPayment({ reservationId, cardNumber });
      setStatus(updated.status);
      setTimeout(() => navigate(`/history`), 1200);
    } catch (err) {
      setStatus(err.body?.status || "FAILED");
      setError(err.message || "Payment failed. The room hold has been released.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section className="page page-narrow">
      <header className="page-head">
        <span className="eyebrow">Reservation {reservationId}</span>
        <h1>Complete payment</h1>
        <p className="lede">
          This is a mock gateway — the state machine below reflects what the real backend will
          drive: <code>HELD → PAYMENT_PROCESSING → CONFIRMED</code> (or <code>FAILED</code>).
        </p>
      </header>

      <div className="status-row">
        <StatusPill status={status} />
      </div>

      <form className="payment-form" onSubmit={handleSubmit}>
        <label>
          Card number
          <input
            type="text"
            inputMode="numeric"
            placeholder="4242 4242 4242 4242"
            value={cardNumber}
            onChange={(e) => setCardNumber(e.target.value)}
            required
          />
          <span className="hint">Mock rule: card ending in an even digit succeeds, odd fails.</span>
        </label>
        <div className="inline-fields">
          <label>
            Expiry
            <input type="text" placeholder="MM/YY" value={expiry} onChange={(e) => setExpiry(e.target.value)} required />
          </label>
          <label>
            CVV
            <input type="text" inputMode="numeric" placeholder="123" value={cvv} onChange={(e) => setCvv(e.target.value)} required />
          </label>
        </div>
        <button type="submit" className="btn-primary" disabled={submitting}>
          {submitting ? "Processing…" : "Pay and confirm"}
        </button>
      </form>

      {error && (
        <div className="form-error">
          {error} <Link to="/">Search for another room</Link>
        </div>
      )}
    </section>
  );
}