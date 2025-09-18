import React, { useState } from "react";
import "./style/UpdateEmployee.css";

export default function UpdateEmployee() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [photo, setPhotoUrl] = useState("");
  const [phone, setPhoneNumber] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleUpdate = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (password !== confirmPassword) {
      setError("Password dan konfirmasi password tidak cocok");
      return;
    }

    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const apiUrl = import.meta.env.VITE_API_EMPLOYEE_BASE_URL;

      const res = await fetch(`${apiUrl}/users/v1/update-user`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          password,
          photo,
          phone,
        }),
      });

      if (!res.ok) {
        throw new Error("Gagal memperbarui data");
      }

      setSuccess("Data berhasil diperbarui!");
      setPassword("");
      setConfirmPassword("");
    } catch (err) {
      setError(err.message || "Terjadi kesalahan teknis!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="update-page">
      <div className="update-container">
        <h2>Update Data Pengguna</h2>
        <form onSubmit={handleUpdate}>
          <div className="form-group">
            <label htmlFor="password">Password Baru</label>
            <input
              type="password"
              id="password"
              placeholder="********"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="confirmPassword">Konfirmasi Password</label>
            <input
              type="password"
              id="confirmPassword"
              placeholder="********"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="photoUrl">URL Foto</label>
            <input
              type="url"
              id="photoUrl"
              placeholder="https://example.com/photo.jpg"
              value={photo}
              onChange={(e) => setPhotoUrl(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="phoneNumber">Nomor Telepon</label>
            <input
              type="tel"
              id="phoneNumber"
              placeholder="+62 812 3456 7890"
              value={phone}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
          </div>

          <button type="submit" className="btn-update" disabled={loading}>
            {loading ? "Menyimpan..." : "Update Data"}
          </button>

          {error && <p className="error-message">{error}</p>}
          {success && <p className="success-message">{success}</p>}
        </form>
      </div>
    </div>
  );
}
