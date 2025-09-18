import { NavLink, Routes, Route } from "react-router-dom";
import Profile from "../components/Profile";
import Absen from "../components/Absen";
import Summary from "../components/Summary";
import UpdateEmployee from "../components/UpdateEmployee";
// import "./Dashboard.css";

export default function Dashboard() {
  return (
    <div className="dashboard">
      <aside className="sidebar">
        <h3>Absensi App</h3>
        <nav>
          <NavLink to="/dashboard" end>Profil</NavLink>
          <NavLink to="/dashboard/absen">Absen</NavLink>
          <NavLink to="/dashboard/summary">Summary</NavLink>
        </nav>
      </aside>

      <main className="content">
        <Routes>
          <Route index element={<Profile />} /> {/* default */}
          <Route path="absen" element={<Absen />} />
          <Route path="summary" element={<Summary />} />
          <Route path="update-profile" element={<UpdateEmployee />} />
        </Routes>
      </main>
    </div>
  );
}
