const STYLES = {
  HELD: { label: "Held", tone: "amber" },
  PAYMENT_PROCESSING: { label: "Processing payment", tone: "blue" },
  CONFIRMED: { label: "Confirmed", tone: "green" },
  FAILED: { label: "Payment failed", tone: "red" },
  RELEASED: { label: "Cancelled", tone: "gray" },
};

export default function StatusPill({ status }) {
  const cfg = STYLES[status] || { label: status, tone: "gray" };
  return <span className={`status-pill tone-${cfg.tone}`}>{cfg.label}</span>;
}