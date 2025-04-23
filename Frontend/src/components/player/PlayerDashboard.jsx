import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const PlayerDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [userData, setUserData] = useState('');
  const [loading, setLoading] = useState(true);

  const performanceStats = [
    { title: 'Matches Played', value: '12', change: '+2 this month' },
    { title: 'Goals Scored', value: '8', change: '+1 last match' },
    { title: 'Assists', value: '5', change: '+2 this season' },
    { title: 'Fitness Level', value: '95%', change: '+3%' },
  ];

  const upcomingEvents = [
    { type: 'Training', date: '2024-03-25', time: '09:00 AM', location: 'Main Ground' },
    { type: 'Match', date: '2024-03-28', time: '03:00 PM', location: 'City Stadium' },
    { type: 'Team Meeting', date: '2024-03-30', time: '10:00 AM', location: 'Team Room' },
  ];

  const recentPerformance = [
    { match: 'vs Eagles', date: '2024-03-15', score: '2-1', performance: '8.5/10' },
    { match: 'vs Lions', date: '2024-03-10', score: '3-0', performance: '9.0/10' },
    { match: 'vs Tigers', date: '2024-03-05', score: '1-1', performance: '7.5/10' },
  ];

  useEffect(() => {
    const fetchPlayerData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/player/me`,
          { withCredentials: true }
        );
        
        setUserData(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching player data:', error);
        setLoading(false);
      }
    };
  
    fetchPlayerData();
  }, []);

  const handleLogout = async () => {
    try {
      navigate('/login');
    } catch (err) {
      console.error('Logout failed:', err);
    }
  };

  const handleViewEventDetails = (event) => {
    navigate(`/player/events/${event.type.toLowerCase()}/${event.date}`);
  };

  const handleViewTrainingVideos = () => {
    navigate('/player/training/videos');
  };

  const handleReportInjury = () => {
    navigate('/player/health/report-injury');
  };

  const handleRequestMeeting = () => {
    navigate('/player/meetings/request');
  };

  if (loading) return <div>Loading player dashboard...</div>;

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-lg fixed h-full">
        <div className="p-6">
          <h2 className="text-2xl font-bold text-gray-800">Player Portal</h2>
          <p className="text-gray-500">Welcome, {userData ? userData.username : 'Player'}</p>
        </div>
        <nav className="mt-6 px-4 space-y-2">
          {['Overview', 'Training', 'Schedule', 'Performance'].map((item) => (
            <button
              key={item}
              onClick={() => setActiveTab(item.toLowerCase())}
              className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${
                activeTab === item.toLowerCase()
                  ? 'bg-indigo-500 text-white'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              {item}
            </button>
          ))}
          <button
            onClick={handleLogout}
            className="w-full text-left px-4 py-3 text-red-600 hover:bg-red-50 mt-4 rounded-lg"
          >
            Logout
          </button>
        </nav>
      </div>

      {/* Main Content */}
      <div className="ml-64 p-8 w-full">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Player Dashboard</h1>
            <p className="text-gray-500">Track your performance and schedule</p>
          </div>
        </div>

        {/* Display tab content here (just example for "overview") */}
        {activeTab === 'overview' && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            {performanceStats.map((stat) => (
              <div key={stat.title} className="bg-white p-6 rounded-xl shadow-md">
                <h3 className="text-lg font-semibold text-gray-800">{stat.title}</h3>
                <p className="text-2xl font-bold text-indigo-600">{stat.value}</p>
                <p className="text-sm text-gray-500">{stat.change}</p>
              </div>
            ))}
          </motion.div>
        )}

        {/* Add other tab contents like 'training', 'schedule', etc. similarly */}
      </div>
    </div>
  );
};

export default PlayerDashboard;
