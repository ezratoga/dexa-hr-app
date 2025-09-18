import { NavLink, Routes, Route } from "react-router-dom";
import EmployeeList from "./EmployeeList";
import EmployeeForm from "../components/EmployeeForm";
import AbsenceList from "../components/AbsenceList";
import '../style/Dashboard.css';

export default function Dashboard() {
  return (
    <div className="dashboard">
      <aside className="sidebar">
        <h3>Admin Absensi</h3>
        <nav>
          <NavLink to="/dashboard/employees">Karyawan</NavLink>
          <NavLink to="/dashboard/absences">Absensi</NavLink>
        </nav>
      </aside>

      <main className="content">
        <Routes>
          <Route path="employees" element={<EmployeeList />} />
          <Route path="employees/add" element={<EmployeeForm />} />
          <Route path="employees/edit/:id" element={<EmployeeForm />} />
          <Route path="absences" element={<AbsenceList />} />
          <Route index element={<EmployeeList />} />
        </Routes>
      </main>
    </div>
  );
}
