import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const ManagerDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [userData, setUserData] = useState(null);
  const [teamStats, setTeamStats] = useState([
    { title: 'Team Members', value: '25', change: '+2 this month' },
    { title: 'Average Performance', value: '87%', change: '+5%' },
    { title: 'Upcoming Matches', value: '3', change: 'This week' },
    { title: 'Training Sessions', value: '12', change: 'Scheduled' },
  ]);

  const [teamMembers, setTeamMembers] = useState([
    { name: 'John Doe', position: 'Forward', status: 'Active', performance: '92%' },
    { name: 'Jane Smith', position: 'Midfielder', status: 'Injured', performance: '85%' },
    { name: 'Mike Johnson', position: 'Defender', status: 'Active', performance: '88%' },
    { name: 'Sarah Wilson', position: 'Goalkeeper', status: 'Active', performance: '90%' },
  ]);

  useEffect(() => {
    // Check if user is logged in and has manager role
    const storedUserData = localStorage.getItem('userData');
    const userRole = localStorage.getItem('userRole');
    
    if (!storedUserData || userRole !== 'manager') {
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
      // In a real app, this would be an API call to get latest stats and team data
      // For now, we'll use mock data
      // const response = await axios.get('/api/manager/dashboard');
      // setTeamStats(response.data.stats);
      // setTeamMembers(response.data.teamMembers);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  const handleViewMember = (memberName) => {
    // Navigate to member details page
    navigate(`/manager/team/member/${encodeURIComponent(memberName)}`);
  };

  const handleEditMember = (memberName) => {
    // Navigate to member edit page
    navigate(`/manager/team/member/${encodeURIComponent(memberName)}/edit`);
  };

  const handleScheduleTraining = () => {
    // Navigate to training scheduling page
    navigate('/manager/schedule/training');
  };

  if (!userData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="fixed left-0 top-0 h-full w-64 bg-white shadow-lg">
        <div className="p-6">
          <h2 className="text-2xl font-bold text-gray-800">Manager Portal</h2>
          <p className="text-gray-500">Welcome, {userData.name}</p>
        </div>
        <nav className="mt-6">
          <div className="px-4 space-y-2">
            {['Overview', 'Teams', 'Schedule', 'Performance'].map((item) => (
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
            <h1 className="text-3xl font-bold text-gray-800">Team Overview</h1>
            <p className="text-gray-500">Manage your team's performance and schedule</p>
          </div>
          <div className="space-x-4">
            <button className="px-4 py-2 bg-white rounded-lg shadow hover:shadow-md transition-shadow">
              <span className="text-gray-600">Team Chat</span>
            </button>
            <button 
              onClick={handleScheduleTraining}
              className="px-4 py-2 bg-indigo-500 text-white rounded-lg shadow hover:shadow-md transition-shadow"
            >
              Schedule Training
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {teamStats.map((stat, index) => (
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

        {/* Team Members Table */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-gray-800">Team Members</h2>
            <button 
              onClick={() => navigate('/manager/team/members')}
              className="px-4 py-2 text-indigo-500 hover:text-indigo-600 transition-colors"
            >
              View All Members
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-4 px-4 text-gray-600">Name</th>
                  <th className="text-left py-4 px-4 text-gray-600">Position</th>
                  <th className="text-left py-4 px-4 text-gray-600">Status</th>
                  <th className="text-left py-4 px-4 text-gray-600">Performance</th>
                  <th className="text-left py-4 px-4 text-gray-600">Actions</th>
                </tr>
              </thead>
              <tbody>
                {teamMembers.map((member, index) => (
                  <motion.tr
                    key={index}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: index * 0.1 }}
                    className="border-b last:border-b-0"
                  >
                    <td className="py-4 px-4">{member.name}</td>
                    <td className="py-4 px-4">{member.position}</td>
                    <td className="py-4 px-4">
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        member.status === 'Active' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
                      }`}>
                        {member.status}
                      </span>
                    </td>
                    <td className="py-4 px-4">{member.performance}</td>
                    <td className="py-4 px-4">
                      <button 
                        onClick={() => handleViewMember(member.name)}
                        className="text-blue-500 hover:text-blue-600 mr-3"
                      >
                        View
                      </button>
                      <button 
                        onClick={() => handleEditMember(member.name)}
                        className="text-gray-500 hover:text-gray-600"
                      >
                        Edit
                      </button>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <button 
            onClick={() => navigate('/manager/schedule/match')}
            className="p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow"
          >
            <h3 className="font-medium text-gray-800">Schedule Match</h3>
            <p className="text-gray-500 text-sm mt-1">Plan upcoming games</p>
          </button>
          <button 
            onClick={() => navigate('/manager/training/plan')}
            className="p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow"
          >
            <h3 className="font-medium text-gray-800">Training Plan</h3>
            <p className="text-gray-500 text-sm mt-1">Create training schedules</p>
          </button>
          <button 
            onClick={() => navigate('/manager/performance/review')}
            className="p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow"
          >
            <h3 className="font-medium text-gray-800">Performance Review</h3>
            <p className="text-gray-500 text-sm mt-1">Evaluate team performance</p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ManagerDashboard; 