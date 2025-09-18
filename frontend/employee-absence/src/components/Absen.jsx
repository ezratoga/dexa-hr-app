import { useState } from "react";
import './style/Absen.css'

export default function Absen() {
  const [absence_for, setStatus] = useState(""); // masuk / pulang
  const [work_type, setWorkType] = useState("WFO"); // WFO / WFH
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleAbsen = async () => {
    if (!absence_for) {
      alert("Pilih status absen dulu (Masuk atau Pulang).");
      return;
    }

    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const apiUrl = import.meta.env.VITE_API_ATTENDANCE_BASE_URL;

      const response = await fetch(`${apiUrl}/attendance/v1/absence-employee`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          absence_for,      // masuk / pulang
          work_type,    // WFO / WFH
        }),
      });

      if (!response.ok) {
        throw new Error("Gagal melakukan absen.");
      }

      const data = await response.json();
      setMessage(data?.message);
    } catch (err) {
      setMessage(err.message || 'Terjadi kesalahan teknis');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card">
      <h2>Absen Karyawan</h2>

      <div className="absen-options">
        <label>
          Status:{" "}
          <select value={absence_for} onChange={(e) => setStatus(e.target.value)}>
            <option value="">-- Pilih --</option>
            <option value="in">Masuk</option>
            <option value="out">Pulang</option>
          </select>
        </label>
      </div>

      <div className="absen-options">
        <button
          className={work_type === "WFO" ? "active" : ""}
          onClick={() => setWorkType("WFO")}
        >
          WFO
        </button>
        <button
          className={work_type === "WFH" ? "active" : ""}
          onClick={() => setWorkType("WFH")}
        >
          WFH
        </button>
      </div>

      <div className="absen-action">
        <button className="submit-btn" onClick={handleAbsen}>Absen Sekarang</button>
      </div>

      {message && <p>{message}</p>}
    </div>
  );
}
