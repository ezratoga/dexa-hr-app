import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../style/EmployeeList.css";

export default function EmployeeForm() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [employee, setEmployee] = useState({
    name: "",
    email: "",
    position: "",
    phone: "",
  });

  useEffect(() => {
    if (id) {
      // fetch existing employee
      const fetchEmployee = async () => {
        const token = localStorage.getItem("token");
        const res = await fetch(`http://localhost:3000/employees/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        const data = await res.json();
        setEmployee(data);
      };
      fetchEmployee();
    }
  }, [id]);

  const handleChange = (e) => setEmployee({ ...employee, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    const url = id 
      ? `http://localhost:3000/employees/${id}` 
      : "http://localhost:3000/employees";
    const method = id ? "PUT" : "POST";

    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify(employee),
    });

    if (res.ok) navigate("/dashboard/employees");
  };

  return (
    <div className="employee-form-page">
      <h2>{id ? "Update Karyawan" : "Tambah Karyawan"}</h2>
      <form onSubmit={handleSubmit}>
        <label>Nama</label>
        <input name="name" value={employee.name} onChange={handleChange} required />

        <label>Email</label>
        <input name="email" value={employee.email} onChange={handleChange} type="email" required />

        <label>Posisi</label>
        <input name="position" value={employee.position} onChange={handleChange} required />

        <label>No HP</label>
        <input name="phone" value={employee.phone} onChange={handleChange} type="tel" />

        <button type="submit">{id ? "Update" : "Tambah"}</button>
      </form>
    </div>
  );
}
