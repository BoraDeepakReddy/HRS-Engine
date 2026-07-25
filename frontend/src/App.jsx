import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import BookingPage from "./pages/BookingPage";
import PaymentPage from "./pages/PaymentPage";
import BookingHistoryPage from "./pages/BookingHistoryPage";
import CancellationPage from "./pages/CancellationPage";
import AdminDashboardPage from "./pages/AdminDashboardPage";

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<BookingPage />} />
        <Route path="/payment/:reservationId" element={<PaymentPage />} />
        <Route path="/history" element={<BookingHistoryPage />} />
        <Route path="/cancel/:reservationId" element={<CancellationPage />} />
        <Route path="/admin" element={<AdminDashboardPage />} />
      </Route>
    </Routes>
  );
}