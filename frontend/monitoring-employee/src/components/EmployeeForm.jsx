import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../style/EmployeeForm.css";

export default function EmployeeForm() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [employee, setEmployee] = useState(id ? {
    name: "",
    email: "",
    position: "",
    phone: "",
    photo: ""
  } : {
    name: "",
    email: "",
    position: "",
    phone: "",
    password: "",
    photo: ""
  });

  useEffect(() => {
    if (id) {
      // fetch existing employee
      const fetchEmployee = async () => {
        const token = localStorage.getItem("token");
        const apiUrl = import.meta.env.VITE_API_EMPLOYEE_BASE_URL;
        const res = await fetch(`${apiUrl}/profiles/v1/${id}`, {
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
      ? `${apiUrl}/employees/${id}` 
      : `${apiUrl}/users/v1/register`;
    const method = id ? "PUT" : "POST";

    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify(employee),
    });

    if (res.ok) navigate("/dashboard/employees");
  };

  let componentReturn = id ? (
    <div className="employee-form-page">
      <h2>Update Karyawan</h2>
      <form onSubmit={handleSubmit}>
        <label>Nama</label>
        <input name="name" value={employee.name} onChange={handleChange} required />

        <label>Email</label>
        <input name="email" value={employee.email} onChange={handleChange} type="email" required />

        <label>Posisi</label>
        <input name="position" value={employee.position} onChange={handleChange} required />

        <label>Photo</label>
        <input name="photo" value={employee.photo} placeholder="Masukkan url photo anda (http://example.com)" onChange={handleChange} />

        <label>No HP</label>
        <input name="phone" value={employee.phone} onChange={handleChange} type="tel" />

        <button type="submit">Update</button>
      </form>
    </div>
  ) : (
    <div className="employee-form-page">
      <h2>Tambah Karyawan</h2>
      <form onSubmit={handleSubmit}>
        <label>Nama</label>
        <input name="name" onChange={handleChange} required />

        <label>Email</label>
        <input name="email" onChange={handleChange} type="email" required />

        <label>Password</label>
        <input name="password" onChange={handleChange} type="password" required />

        <label>Posisi</label>
        <input name="position" onChange={handleChange} required />

        <label>Photo</label>
        <input name="photo" placeholder="Masukkan url photo anda (http://example.com)" onChange={handleChange} />

        <label>No HP</label>
        <input name="phone" onChange={handleChange} type="tel" />

        <button type="submit">Tambah</button>
      </form>
    </div>
  )

  return componentReturn;
}
