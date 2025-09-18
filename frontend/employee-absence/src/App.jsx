import { useState } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css'
import Login from './components/Login'
import Dashboard from './pages/Dashboard';
import Absen from './components/Absen';

function App() {
  const [count, setCount] = useState(0)

  return (
    <Router>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/dashboard/*' element={<Dashboard />} />
      </Routes>
    </Router>
  )
}

export default App
