import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate , Link } from 'react-router-dom';
import axios from 'axios';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [userData, setUserData] = useState(null);
  const [stats, setStats] = useState([]);
  const [recentActivities, setRecentActivities] = useState([]);

  useEffect(() => {
    const verifyAdmin = async () => {
      try {
        const res = await axios.get('/api/admin/me', { withCredentials: true });
        if (res.data.role == 'admin') {
          navigate('/admin/dashboard');
        } else {
          setUserData(res.data);
          fetchDashboardData();
        }
      } catch (err) {
        console.error('Unauthorized or error fetching user:', err);
        navigate('/login');
      }
    };

    
const handleAddNew = () => {
  switch (activeTab) {
    case 'events':
      navigate('/admin/events/new');
      break;

  }
};

    verifyAdmin();
  }, [navigate]);

  const fetchDashboardData = async () => {
    try {
      const res = await axios.get('/api/admin/dashboard', { withCredentials: true });
      setStats(res.data.stats);
      setRecentActivities(res.data.activities);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    }
  };

  const handleLogout = async () => {
    try {
      navigate('/login');
    } catch (err) {
      console.error('Logout failed:', err);
    }
  };

  const handleAddNew = () => {
    switch (activeTab) {
      case 'users':
        navigate('/admin/users/new');
        break;
      case 'teams':
        navigate('/admin/teams/new');
        break;
      default:
        console.log('Add new clicked for tab:', activeTab);
    }
  };

  if (!userData) return <div>Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="fixed left-0 top-0 h-full w-64 bg-white shadow-lg">
        <div className="p-6">
          <h2 className="text-2xl font-bold text-gray-800">Admin Portal</h2>
          <p className="text-gray-500">Welcome, {userData.name}</p>
        </div>
        <nav className="mt-6">
          <div className="px-4 space-y-2">
            {['Overview', 'Users', 'Settings', 'Reports'].map((item) => (
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
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Dashboard Overview</h1>
            <p className="text-gray-500">Monitor and manage your sports organization</p>
          </div>
          <div className="space-x-4">
            <button className="px-4 py-2 bg-white rounded-lg shadow hover:shadow-md transition-shadow">
              <span className="text-gray-600">Notifications</span>
            </button>
            <Link to="/chat" className="px-4 py-2 bg-white rounded-lg shadow hover:shadow-md transition-shadow">
                <span className="text-gray-600"> Chat</span>
            </Link>
            <button
              onClick={handleAddNew}
              className="px-4 py-2 bg-indigo-500 text-white rounded-lg shadow hover:shadow-md transition-shadow"
            >
              + Add New
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
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
                <span className="ml-2 text-sm text-green-500">{stat.change}</span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Recent Activities */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Recent Activities</h2>
          <div className="space-y-4">
            {recentActivities.map((activity, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
              >
                <div>
                  <h3 className="font-medium text-gray-800">{activity.type}</h3>
                  <p className="text-gray-500 text-sm">{activity.message}</p>
                </div>
                <span className="text-sm text-gray-400">{activity.time}</span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <button
            onClick={() => navigate('/admin/athletes/new')}
            className="p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow"
          >
            <h3 className="font-medium text-gray-800">Add New Athlete</h3>
            <p className="text-gray-500 text-sm mt-1">Register new athletes to the system</p>
          </button>
          <button
            onClick={() => navigate('/admin/events/new')}
            className="p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow"
          >
            <h3 className="font-medium text-gray-800">Schedule Event</h3>
            <p className="text-gray-500 text-sm mt-1">Create and manage sports events</p>
          </button>
          <button
            onClick={() => navigate('/admin/reports')}
            className="p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow"
          >
            <h3 className="font-medium text-gray-800">Generate Reports</h3>
            <p className="text-gray-500 text-sm mt-1">View and export performance reports</p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
