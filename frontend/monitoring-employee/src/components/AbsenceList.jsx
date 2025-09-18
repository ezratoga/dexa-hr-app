import { useEffect, useState } from "react";
import "../style/AbsenceList.css";

export default function AbsenceList() {
  const [absences, setAbsences] = useState([]);

  useEffect(() => {
    const fetchAbsences = async () => {
      const token = localStorage.getItem("token");
      const res = await fetch("http://localhost:3000/absences", {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      setAbsences(data);
    };
    fetchAbsences();
  }, []);

  const formatDate = (iso) => {
    const d = new Date(iso);
    return d.toLocaleString("id-ID", { dateStyle: "short", timeStyle: "short" });
  };

  return (
    <div className="absence-list-page">
      <h2>Absensi Karyawan</h2>
      <table>
        <thead>
          <tr>
            <th>Nama</th>
            <th>Tanggal & Waktu Masuk</th>
            <th>Tanggal & Waktu Pulang</th>
            <th>Tipe Kerja</th>
          </tr>
        </thead>
        <tbody>
          {absences.map(a => (
            <tr key={a.id}>
              <td>{a.name}</td>
              <td>{formatDate(a.checkIn)}</td>
              <td>{formatDate(a.checkOut)}</td>
              <td>{a.workType}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
