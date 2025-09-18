import { useEffect, useState } from "react";
import "../style/AbsenceList.css";

export default function AbsenceList() {
  const [absences, setAbsences] = useState([]);

  useEffect(() => {
    const fetchAbsences = async () => {
      const token = localStorage.getItem("token");
      const apiUrl = import.meta.env.VITE_API_MONITORING_BASE_URL
      const res = await fetch(`${apiUrl}/monitoring/v1/absence-summary-all`, {
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
            <th>Posisi</th>
            <th>Tanggal & Waktu Masuk</th>
            <th>Status Masuk</th>
            <th>Tanggal & Waktu Pulang</th>
            <th>Status Pulang</th>
          </tr>
        </thead>
        <tbody>
          {absences.map(a => (
            <tr key={a.employee_id}>
              <td>{a.name}</td>
              <td>{a.position}</td>
              <td>{a?.absence_in ? formatDate(a.absence_in) : '-'}</td>
              <td>{a.work_type_in}</td>
              <td>{a?.absence_out ? formatDate(a.absence_out) : '-'}</td>
              <td>{a.work_type_out}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
