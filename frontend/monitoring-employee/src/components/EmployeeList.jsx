import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../style/EmployeeList.css";

export default function EmployeeList() {
  const [employees, setEmployees] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEmployees = async () => {
      const token = localStorage.getItem("token");
      const apiUrl = import.meta.env.VITE_API_EMPLOYEE_BASE_URL;
      const res = await fetch(`${apiUrl}/users/v1/all-users`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      setEmployees(data);
    };
    fetchEmployees();
  }, []);

  return (
    <div className="employee-list-page">
      <h2>Data Karyawan</h2>
      <button onClick={() => navigate("/dashboard/employees/add")}>Tambah Karyawan</button>
      <table>
        <thead>
          <tr>
            <th>ID Pegawai</th>
            <th>Nama</th>
            <th>Posisi</th>
            <th>Email</th>
            <th>No HP</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>
          {employees.map(emp => (
            <tr key={emp.employee_id}>
              <td>{emp.employee_id}</td>
              <td>{emp.profile.name}</td>
              <td>{emp.profile.position}</td>
              <td>{emp.email}</td>
              <td>{emp.phone}</td>
              <td>
                <button onClick={() => navigate(`/dashboard/employees/edit/${emp.employee_id}`)}>Edit</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
