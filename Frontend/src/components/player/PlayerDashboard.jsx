import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

const PlayerDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("overview");
  const [userData, setUserData] = useState("");
  const [loading, setLoading] = useState(true);
  const [schedule, setSchedule] = useState([]);
  const [trainingSessions, setTrainingSessions] = useState([]);
  const [performanceData, setPerformanceData] = useState([]);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [currentUser, setCurrentUser] = useState(null);


    useEffect(() => {
      const fetchCurrentUser = async () => {
        try {
          const res = await fetch('http://localhost:5000/api/player/me', {
            credentials: 'include', // Assumes token is in HttpOnly cookie
          });
          const user = await res.json();
          setCurrentUser(user);
        } catch (err) {
          console.error('Error fetching user:', err);
        }
      };
  
      fetchCurrentUser();
    }, []);
    useEffect(() => {
        const fetchMessages = async () => {
          try {
            const response = await fetch('http://localhost:5000/api/chat');
            const data = await response.json();
            setMessages(data);
          } catch (error) {
            console.error('Error fetching messages:', error);
          }
        };
    
        fetchMessages();
      }, []);
      const handleSendMessage = async (e) => {
        e.preventDefault();
        if (!newMessage.trim() || !currentUser) return;
    
        const newMsg = {
          sender: currentUser.username,
          content: newMessage,
          role: currentUser.role,
        };
    
        try {
          const response = await fetch('http://localhost:5000/api/chat', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify(newMsg),
          });
    
          const savedMessage = await response.json();
          setMessages([...messages, savedMessage]);
          setNewMessage('');
        } catch (error) {
          console.error('Error sending message:', error);
        }
      };
    
      const getRoleColor = (role) => {
        switch (role) {
          case 'admin':
            return 'bg-red-100 text-red-800';
          case 'manager':
            return 'bg-blue-100 text-blue-800';
          case 'player':
            return 'bg-green-100 text-green-800';
          default:
            return 'bg-gray-100 text-gray-800';
        }
      };

  const performanceStats = [
    { title: "Matches Played", value: "12", change: "+2 this month" },
    { title: "Goals Scored", value: "8", change: "+1 last match" },
    { title: "Assists", value: "5", change: "+2 this season" },
    { title: "Fitness Level", value: "95%", change: "+3%" },
  ];

  useEffect(() => {
    const fetchPlayerData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/player/me",
          {
            withCredentials: true, // Send cookies for session authentication
          }
        );
        setUserData(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching player data:", error);
        setLoading(false);
      }
    };

    fetchPlayerData();
  }, []);

  useEffect(() => {
    const fetchSchedule = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/player/schedule",
          {
            withCredentials: true,
          }
        );
        setSchedule(response.data);
      } catch (error) {
        console.error("Error fetching schedule:", error);
      }
    };

    const fetchTraining = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/player/training",
          {
            withCredentials: true,
          }
        );
        setTrainingSessions(response.data);
      } catch (error) {
        console.error("Error fetching training sessions:", error);
      }
    };

    const fetchPerformance = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/player/performance",
          {
            withCredentials: true,
          }
        );
        setPerformanceData(response.data);
        console.log(response);
      } catch (error) {
        console.error("Error fetching performance data:", error);
      }
    };

    if (activeTab === "schedule") fetchSchedule();
    if (activeTab === "training") fetchTraining();
    if (activeTab === "performance") fetchPerformance();
  }, [activeTab]);

  const handleLogout = async () => {
    try {
      navigate("/login");
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  if (loading) return <div>Loading player dashboard...</div>;

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-lg fixed h-full">
        <div className="p-6">
          <h2 className="text-2xl font-bold text-gray-800">Player Portal</h2>
          <p className="text-gray-500">
            Welcome, {userData ? userData.username : "Player"}
          </p>
        </div>
        <nav className="mt-6 px-4 space-y-2">
          {["Overview", "Training", "Schedule", "Performance", "Chat"].map(
            (item) => (
              <button
                key={item}
                onClick={() => setActiveTab(item.toLowerCase())}
                className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${
                  activeTab === item.toLowerCase()
                    ? "bg-indigo-500 text-white"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                {item}
              </button>
            )
          )}
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
            <h1 className="text-3xl font-bold text-gray-800">
              Player Dashboard
            </h1>
            <p className="text-gray-500">Track your performance and schedule</p>
          </div>
          <Link
            to="/chat"
            className="px-4 py-2 bg-white rounded-lg shadow hover:shadow-md transition-shadow"
          >
            <span className="text-gray-600"> Chat</span>
          </Link>
        </div>

        {/* Overview Tab */}
        {activeTab === "overview" && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            {performanceStats.map((stat) => (
              <div
                key={stat.title}
                className="bg-white p-6 rounded-xl shadow-md"
              >
                <h3 className="text-lg font-semibold text-gray-800">
                  {stat.title}
                </h3>
                <p className="text-2xl font-bold text-indigo-600">
                  {stat.value}
                </p>
                <p className="text-sm text-gray-500">{stat.change}</p>
              </div>
            ))}
          </motion.div>
        )}

        {/* Schedule Tab */}
        {activeTab === "schedule" && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="bg-white rounded-xl shadow-md p-6 overflow-x-auto"
          >
            <h2 className="text-2xl font-bold mb-4 text-gray-800">
              Match Schedule
            </h2>
            <table className="min-w-full table-auto border border-gray-200 rounded-xl">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-4 py-2 text-left">Date</th>
                  <th className="px-4 py-2 text-left">Time</th>
                  <th className="px-4 py-2 text-left">Opponent</th>
                  <th className="px-4 py-2 text-left">Event</th>
                  <th className="px-4 py-2 text-left">Tournament</th>
                  <th className="px-4 py-2 text-left">Organiser</th>
                </tr>
              </thead>
              <tbody>
                {schedule.map((match, index) => (
                  <tr key={index} className="border-t hover:bg-gray-50">
                    <td className="px-4 py-2">{match.date}</td>
                    <td className="px-4 py-2">{match.time}</td>
                    <td className="px-4 py-2">{match.opponent}</td>
                    <td className="px-4 py-2">{match.event}</td>
                    <td className="px-4 py-2">{match.tournament}</td>
                    <td className="px-4 py-2">{match.organiser}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </motion.div>
        )}

        {/* Training Tab */}
        {activeTab === "training" && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="bg-white rounded-xl shadow-md p-6"
          >
            <h2 className="text-2xl font-bold mb-4 text-gray-800">
              Training Sessions
            </h2>
            <ul className="space-y-4">
              {trainingSessions.map((session, index) => (
                <li key={index} className="p-4 bg-gray-50 rounded-lg shadow-sm">
                  <div className="font-semibold">{session.activity}</div>
                  <div className="text-sm text-gray-600">
                    {session.date} at {session.time} 
                  </div>
                </li>
              ))}
            </ul>
          </motion.div>
        )}

        {/* Performance Tab */}
        {activeTab === "performance" && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="bg-white rounded-xl shadow-md p-6"
          >
            <h2 className="text-2xl font-bold mb-4 text-gray-800">
              Performance Overview
            </h2>
            <table className="min-w-full table-auto border border-gray-200 rounded-xl">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-4 py-2 text-left">Match</th>
                  <th className="px-4 py-2 text-left">Date</th>
                  <th className="px-4 py-2 text-left">Score</th>
                  <th className="px-4 py-2 text-left">Rating</th>
                </tr>
              </thead>
              <tbody>
                {performanceData.map((item, index) => (
                  <tr key={index} className="border-t hover:bg-gray-50">
                    <td className="px-4 py-2">{item.match}</td>
                    <td className="px-4 py-2">{item.date}</td>
                    <td className="px-4 py-2">{item.score}</td>
                    <td className="px-4 py-2">{item.rating}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </motion.div>
        )}

        {/* Chat Tab */}

        {activeTab === "chat" && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="bg-white rounded-xl shadow-md p-6"
          >
       <div className="">
      <nav className="">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <h1 className="text-xl font-bold">Team Chat</h1>
              </div>
            </div>
            <div className="flex items-center">
              <button
                onClick={handleLogout}
                className="ml-4 px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="bg-white shadow-md rounded-lg">
          {/* Messages Container */}
          <div className="h-[600px] overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex flex-col ${
                  message.sender === 'You' ? 'items-end' : 'items-start'
                }`}
              >
                <div className="flex items-center space-x-2 mb-1">
                  <span className="text-sm font-medium text-gray-900">
                    {message.sender}
                  </span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getRoleColor(message.role)}`}>
                    {message.role}
                  </span>
                </div>
                <div
                  className={`max-w-sm rounded-lg p-3 ${
                    message.sender === 'You'
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-100 text-gray-900'
                  }`}
                >
                  <p className="text-sm">{message.content}</p>
                  <p className="text-xs mt-1 opacity-75">{message.timestamp}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Message Input */}
          <div className="border-t p-4">
            <form onSubmit={handleSendMessage} className="flex space-x-4">
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Type your message..."
                className="flex-1 rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="submit"
                className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Send
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default PlayerDashboard;
