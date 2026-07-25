import { NavLink, Outlet } from "react-router-dom";

const NAV_ITEMS = [
  { to: "/", label: "Book a room", end: true },
  { to: "/history", label: "My reservations" },
  { to: "/admin", label: "Admin dashboard" },
];

export default function Layout() {
  return (
    <div className="shell">
      <header className="shell-header">
        <div className="brand">
          <span className="brand-mark">MH</span>
          <div className="brand-text">
            <span className="brand-name">The Meridian House</span>
            <span className="brand-sub">Reservation Engine</span>
          </div>
        </div>
        <nav className="shell-nav">
          {NAV_ITEMS.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) => "shell-nav-link" + (isActive ? " active" : "")}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
      </header>
      <main className="shell-main">
        <Outlet />
      </main>
      <footer className="shell-footer">
        Hotel Reservation Engine — student project scaffold. Data shown is mock data.
      </footer>
    </div>
  );
}