import { useEffect, useState } from "react";
import './style/Profile.css';
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const [profile, setProfile] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const navigate = useNavigate()

  useEffect(() => {

    const fetchProfile = async() =>  {
      try {
        const token = localStorage.getItem('token');
        const getProfile = await fetch('http://localhost:3000/profiles/v1/get-profile', {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        });

        if (!getProfile.ok) {
          alert('Gagal mendapatkan profile')
        }

        const responseProfile = await getProfile.json();
        console.log('profile', responseProfile);
        setProfile(responseProfile);
      } catch (error) {
        alert('Terjadi kesalahan teknis!')
      }  finally {
        setLoading(false)
      }
    }

    fetchProfile();
  }, [])

  if (loading) return <p>Loading profil...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;
    if (!profile || Object.keys(profile).length === 0) return <p>No profile found</p>;

  return (
    <div className="card">
      <h2>Profil Karyawan</h2>
      {profile && (
        <div className="profile-details">
          <img
            src={profile.photo || "https://via.placeholder.com/100"}
            alt="Foto Karyawan"
            className="profile-pic"
          />
          <p><strong>Nama:</strong> {profile.name}</p>
          <p><strong>Email:</strong> {profile.email}</p>
          <p><strong>Posisi:</strong> {profile.position}</p>
          <p><strong>Phone:</strong> {profile.phone}</p>

          <button onClick={() => navigate("/dashboard/update-profile")}>Ubah Profile</button>
        </div>
      )}
    </div>
  );
}
