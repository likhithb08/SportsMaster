import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Login from './components/auth/Login'
import Register from './components/auth/Register'
// import ProtectedRoute from './components/auth/ProtectedRoute'
import AdminDashboard from './components/admin/AdminDashboard'
import ManagerDashboard from './components/manager/ManagerDashboard'
import PlayerDashboard from './components/player/PlayerDashboard'
import LandingPage from './components/LandingPage'

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/" element={<Navigate to="/landingpage" replace />} />

        {/* Public routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Navigate to="/login" replace />} />

        {/* Protected routes */}
        <Route
          path="/admin/dashboard"
          element={
            
              <AdminDashboard />
            
          }
        />
        <Route
          path="/manager/dashboard"
          element={
            
              <ManagerDashboard />
            
          }
        />
        <Route
          path="/player/dashboard"
          element={
            
              <PlayerDashboard />
           
          }
        />

        {/* Catch all route - redirect to login */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  )
}

export default App
