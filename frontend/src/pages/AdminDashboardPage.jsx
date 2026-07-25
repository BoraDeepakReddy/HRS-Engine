import { useEffect, useState } from "react";
import { createHotel, deleteHotel } from "../services/hotelService";
import { createRoom, deleteRoom } from "../services/roomService";
import { loadAdminOverview } from "../services/adminService";
import StatusPill from "../components/StatusPill";

const emptyHotelForm = { hotelName: "", location: "", totalRooms: "" };
const emptyRoomForm = { roomNumber: "", roomType: "", pricePerNight: "", available: true };

export default function AdminDashboardPage() {
  const [hotels, setHotels] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [hotelForm, setHotelForm] = useState(emptyHotelForm);
  const [roomForm, setRoomForm] = useState(emptyRoomForm);
  const [savingHotel, setSavingHotel] = useState(false);
  const [savingRoom, setSavingRoom] = useState(false);

  async function refresh() {
    setLoading(true);
    setError("");
    try {
      const data = await loadAdminOverview();
      setHotels(data.hotels);
      setRooms(data.rooms);
      setReservations(data.reservations);
    } catch (err) {
      setError(err.message || "Could not load dashboard data from the backend.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    refresh();
  }, []);

  async function handleAddHotel(e) {
    e.preventDefault();
    setSavingHotel(true);
    setError("");
    try {
      await createHotel({
        hotelName: hotelForm.hotelName,
        location: hotelForm.location,
        totalRooms: Number(hotelForm.totalRooms) || 0,
      });
      setHotelForm(emptyHotelForm);
      await refresh();
    } catch (err) {
      setError(err.message || "Could not create hotel.");
    } finally {
      setSavingHotel(false);
    }
  }

  async function handleDeleteHotel(id) {
    try {
      await deleteHotel(id);
      await refresh();
    } catch (err) {
      setError(err.message || "Could not delete hotel.");
    }
  }

  async function handleAddRoom(e) {
    e.preventDefault();
    setSavingRoom(true);
    setError("");
    try {
      await createRoom({
        roomNumber: roomForm.roomNumber,
        roomType: roomForm.roomType,
        pricePerNight: Number(roomForm.pricePerNight) || 0,
        available: roomForm.available,
      });
      setRoomForm(emptyRoomForm);
      await refresh();
    } catch (err) {
      setError(err.message || "Could not create room.");
    } finally {
      setSavingRoom(false);
    }
  }

  async function handleDeleteRoom(id) {
    try {
      await deleteRoom(id);
      await refresh();
    } catch (err) {
      setError(err.message || "Could not delete room.");
    }
  }

  return (
    <section className="page">
      <header className="page-head">
        <span className="eyebrow">Operations</span>
        <h1>Admin dashboard</h1>
        <p className="lede">
          Hotels and Rooms below are real — pulled live from <code>/api/hotels</code> and{" "}
          <code>/api/rooms</code>. Reservations stay mock until that module ships.
        </p>
      </header>

      {error && <p className="form-error">{error}</p>}
      {loading && <p>Loading dashboard…</p>}

      {!loading && (
        <>
          <h2 className="section-title">Hotels</h2>
          <form className="search-form" onSubmit={handleAddHotel}>
            <label>
              Hotel name
              <input
                type="text"
                value={hotelForm.hotelName}
                onChange={(e) => setHotelForm({ ...hotelForm, hotelName: e.target.value })}
                required
              />
            </label>
            <label>
              Location
              <input
                type="text"
                value={hotelForm.location}
                onChange={(e) => setHotelForm({ ...hotelForm, location: e.target.value })}
                required
              />
            </label>
            <label>
              Total rooms
              <input
                type="number"
                min="0"
                value={hotelForm.totalRooms}
                onChange={(e) => setHotelForm({ ...hotelForm, totalRooms: e.target.value })}
                required
              />
            </label>
            <button type="submit" className="btn-primary" disabled={savingHotel}>
              {savingHotel ? "Adding…" : "Add hotel"}
            </button>
          </form>

          <table className="res-table">
            <thead>
              <tr><th>Name</th><th>Location</th><th>Total rooms</th><th></th></tr>
            </thead>
            <tbody>
              {hotels.map((h) => (
                <tr key={h.id}>
                  <td>{h.hotelName}</td>
                  <td>{h.location}</td>
                  <td>{h.totalRooms}</td>
                  <td><button className="table-link" onClick={() => handleDeleteHotel(h.id)}>Delete</button></td>
                </tr>
              ))}
            </tbody>
          </table>

          <h2 className="section-title">Rooms</h2>
          <form className="search-form" onSubmit={handleAddRoom}>
            <label>
              Room number
              <input
                type="text"
                value={roomForm.roomNumber}
                onChange={(e) => setRoomForm({ ...roomForm, roomNumber: e.target.value })}
                required
              />
            </label>
            <label>
              Room type
              <input
                type="text"
                placeholder="Deluxe"
                value={roomForm.roomType}
                onChange={(e) => setRoomForm({ ...roomForm, roomType: e.target.value })}
                required
              />
            </label>
            <label>
              Price / night
              <input
                type="number"
                min="0"
                value={roomForm.pricePerNight}
                onChange={(e) => setRoomForm({ ...roomForm, pricePerNight: e.target.value })}
                required
              />
            </label>
            <label>
              Available
              <select
                value={roomForm.available ? "yes" : "no"}
                onChange={(e) => setRoomForm({ ...roomForm, available: e.target.value === "yes" })}
              >
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </select>
            </label>
            <button type="submit" className="btn-primary" disabled={savingRoom}>
              {savingRoom ? "Adding…" : "Add room"}
            </button>
          </form>

          <table className="res-table">
            <thead>
              <tr><th>Room #</th><th>Type</th><th>Price/night</th><th>Available</th><th></th></tr>
            </thead>
            <tbody>
              {rooms.map((r) => (
                <tr key={r.id}>
                  <td>{r.roomNumber}</td>
                  <td>{r.roomType}</td>
                  <td>${r.pricePerNight}</td>
                  <td>{r.available ? "Yes" : "No"}</td>
                  <td><button className="table-link" onClick={() => handleDeleteRoom(r.id)}>Delete</button></td>
                </tr>
              ))}
            </tbody>
          </table>

          <h2 className="section-title">Reservations (mock)</h2>
          <table className="res-table">
            <thead>
              <tr><th>Reservation</th><th>Guest</th><th>Room</th><th>Dates</th><th>Status</th></tr>
            </thead>
            <tbody>
              {reservations.map((r) => (
                <tr key={r.id}>
                  <td>{r.id}</td>
                  <td>{r.guestName}</td>
                  <td>Room {r.roomNumber} · {r.roomType}</td>
                  <td>{r.checkInDate} → {r.checkOutDate}</td>
                  <td><StatusPill status={r.status} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </section>
  );
}