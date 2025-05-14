import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import PlayerDashboard from './components/player/PlayerDashboard';
import AdminDashboard from './components/admin/AdminDashboard';
import ManagerDashboard from './components/manager/ManagerDashboard';
import Chat from './components/Chat';
import EventPage from './components/eventForm/EventPage'
import EventsPage from './components/eventForm/EventsPage'
import  EventForm from './components/eventForm/EventForm'


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="player/dashboard" element={<PlayerDashboard />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/manager/dashboard" element={<ManagerDashboard />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/admin/events" element={<EventPage />} />
        <Route path="/admin/events/new" element={<EventForm />} />
        <Route path="/events" element={<EventsPage />} />
      </Routes>
    </Router>
  );
}

export default App;
