import React, { useState } from "react";
import './style/Login.css';

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const loginProcees = async(event) => {
    event.preventDefault();
    setError('');
    setLoading(true);

    try {
      const logining = await fetch('http://localhost:3000/users/v1/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({email, password})
      });

      if (!logining?.ok) {
        alert('Periksa email dan password');
      }

      const data = await logining.json();
      localStorage.setItem('token', data?.token);

      window.location.href = '/dashboard';
    } catch (error) {
      alert('Terjadi kesalahan teknis!')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="login-page">
      <div className="login-container">
        <h2>Login Absensi</h2>
        <form>
          <div className="form-group">
            <label htmlFor="email">Email Perusahaan</label>
            <input
              type="email"
              id="email"
              placeholder="nama@perusahaan.com"
              required
              onChange={(event) => setEmail(event.target.value)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Kata Sandi</label>
            <input
              type="password"
              id="password"
              placeholder="********"
              required
              onChange={(event) => setPassword(event.target.value)}
            />
          </div>

          <button 
            type="submit" 
            className="btn-login"
            onClick={(event) => loginProcees(event)}
          >
            Login
          </button>

          {error && <p style={{ color: "red", marginTop: "10px" }}>{error}</p>}

          <div className="extra-links">
            <p>
              <a href="#">Lupa password?</a>
            </p>

            <p>
              <a href="#">Daftar dengan email perusahaan?</a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
