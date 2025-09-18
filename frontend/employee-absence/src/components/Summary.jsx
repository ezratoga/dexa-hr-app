import { useEffect, useState } from "react";
import { formatDateTime } from "../helper/date";
import './style/Summary.css';

export default function Summary() {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await fetch("http://localhost:3001/attendance/v1/absence-summary", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Gagal mengambil data summary");
        }

        const data = await response.json();
        setRecords(data);
      } catch (err) {
        setError(err.message || "Terjadi kesalahan teknis");
      } finally {
        setLoading(false);
      }
    };

    fetchSummary();
  }, []);

  if (loading) return <p>Loading data...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div className="card">
      <h2>Summary Absensi</h2>
      <div className="table-container">
      {records.length === 0 ? (
        <p>Tidak ada data absensi</p>
      ) : (
        <table border="1" cellPadding="8" style={{ borderCollapse: "collapse", width: "100%" }}>
          <thead>
            <tr>
              <th>Waktu Masuk</th>
              <th>Absen Masuk</th>
              <th>Waktu Pulang</th>
              <th>Absen Pulang</th>
            </tr>
          </thead>
          <tbody>
            {records.map((item, idx) => (
              <tr key={idx}>
                <td>{formatDateTime(item.absence_in) || '-'}</td>
                <td>{item.work_type_in || "-"}</td>
                <td>{formatDateTime(item.absence_out) || "-"}</td>
                <td>{item.work_type_out || "-"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      </div>
    </div>
  );
}
