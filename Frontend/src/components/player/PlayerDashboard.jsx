import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const PlayerDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [userData, setUserData] = useState(null);
  const [performanceStats, setPerformanceStats] = useState([
    { title: 'Matches Played', value: '12', change: '+2 this month' },
    { title: 'Goals Scored', value: '8', change: '+1 last match' },
    { title: 'Assists', value: '5', change: '+2 this season' },
    { title: 'Fitness Level', value: '95%', change: '+3%' },
  ]);

  const [upcomingEvents, setUpcomingEvents] = useState([
    { type: 'Training', date: '2024-03-25', time: '09:00 AM', location: 'Main Ground' },
    { type: 'Match', date: '2024-03-28', time: '03:00 PM', location: 'City Stadium' },
    { type: 'Team Meeting', date: '2024-03-30', time: '10:00 AM', location: 'Team Room' },
  ]);

  const [recentPerformance, setRecentPerformance] = useState([
    { match: 'vs Eagles', date: '2024-03-15', score: '2-1', performance: '8.5/10' },
    { match: 'vs Lions', date: '2024-03-10', score: '3-0', performance: '9.0/10' },
    { match: 'vs Tigers', date: '2024-03-05', score: '1-1', performance: '7.5/10' },
  ]);

  useEffect(() => {
    // Check if user is logged in and has player/athlete role
    const storedUserData = localStorage.getItem('userData');
    const userRole = localStorage.getItem('userRole');
    
    if (!storedUserData || !['player', 'athlete'].includes(userRole)) {
      navigate('/login');
      return;
    }

    try {
      const parsedUserData = JSON.parse(storedUserData);
      setUserData(parsedUserData);
      // In a real app, you would fetch dashboard data here
      fetchDashboardData();
    } catch (error) {
      console.error('Error parsing user data:', error);
      navigate('/login');
    }
  }, [navigate]);

  const fetchDashboardData = async () => {
    try {
      // In a real app, this would be an API call to get latest stats and performance data
      // For now, we'll use mock data
      // const response = await axios.get('/api/player/dashboard');
      // setPerformanceStats(response.data.stats);
      // setUpcomingEvents(response.data.events);
      // setRecentPerformance(response.data.performance);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  const handleViewEventDetails = (event) => {
    // Navigate to event details page
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

  if (!userData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="fixed left-0 top-0 h-full w-64 bg-white shadow-lg">
        <div className="p-6">
          <h2 className="text-2xl font-bold text-gray-800">Player Portal</h2>
          <p className="text-gray-500">Welcome, {userData.name}</p>
        </div>
        <nav className="mt-6">
          <div className="px-4 space-y-2">
            {['Overview', 'Training', 'Schedule', 'Performance'].map((item) => (
              <button
                key={item}
                onClick={() => setActiveTab(item.toLowerCase())}
                className={`w-full px-4 py-3 text-left rounded-lg transition-colors ${
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
              className="w-full px-4 py-3 text-left rounded-lg transition-colors text-red-600 hover:bg-red-50 mt-4"
            >
              Logout
            </button>
          </div>
        </nav>
      </div>

      {/* Main Content */}
      <div className="ml-64 p-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Player Dashboard</h1>
            <p className="text-gray-500">Track your performance and schedule</p>
          </div>
          <div className="space-x-4">
            <button 
              onClick={() => navigate('/player/messages')}
              className="px-4 py-2 bg-white rounded-lg shadow hover:shadow-md transition-shadow"
            >
              <span className="text-gray-600">Messages</span>
            </button>
            <button 
              onClick={() => navigate('/player/schedule')}
              className="px-4 py-2 bg-indigo-500 text-white rounded-lg shadow hover:shadow-md transition-shadow"
            >
              View Schedule
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {performanceStats.map((stat, index) => (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white p-6 rounded-xl shadow-sm"
            >
              <h3 className="text-gray-500 text-sm">{stat.title}</h3>
              <div className="flex items-baseline mt-2">
                <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
                <span className="ml-2 text-sm text-indigo-500">{stat.change}</span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Upcoming Events and Recent Performance */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Upcoming Events */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Upcoming Events</h2>
            <div className="space-y-4">
              {upcomingEvents.map((event, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                >
                  <div>
                    <h3 className="font-medium text-gray-800">{event.type}</h3>
                    <p className="text-gray-500 text-sm">{event.date} at {event.time}</p>
                    <p className="text-indigo-500 text-sm">{event.location}</p>
                  </div>
                  <button 
                    onClick={() => handleViewEventDetails(event)}
                    className="text-indigo-500 hover:text-indigo-600"
                  >
                    View Details
                  </button>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Recent Performance */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Recent Performance</h2>
            <div className="space-y-4">
              {recentPerformance.map((match, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                >
                  <div>
                    <h3 className="font-medium text-gray-800">{match.match}</h3>
                    <p className="text-gray-500 text-sm">{match.date}</p>
                    <p className="text-indigo-500 text-sm">Score: {match.score}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-gray-800">{match.performance}</p>
                    <p className="text-gray-500 text-sm">Performance</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <button 
            onClick={handleViewTrainingVideos}
            className="p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow"
          >
            <h3 className="font-medium text-gray-800">Training Videos</h3>
            <p className="text-gray-500 text-sm mt-1">Access training materials</p>
          </button>
          <button 
            onClick={handleReportInjury}
            className="p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow"
          >
            <h3 className="font-medium text-gray-800">Report Injury</h3>
            <p className="text-gray-500 text-sm mt-1">Update health status</p>
          </button>
          <button 
            onClick={handleRequestMeeting}
            className="p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow"
          >
            <h3 className="font-medium text-gray-800">Request Meeting</h3>
            <p className="text-gray-500 text-sm mt-1">Schedule with coach</p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default PlayerDashboard; 