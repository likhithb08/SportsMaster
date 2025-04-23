import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import registerRoute from './routes/register.js';
import playerRoute from './routes/player.js';
import bodyParser from 'body-parser';
import Player from './models/player.js'; 
import managerRoutes from './routes/managerRoutes.js';
import adminRoutes from './routes/adminRoutes.js'; // 🔥 import adminRoutes
import session from 'express-session';




const app = express();
app.use(cors({ origin: 'http://localhost:5173', credentials: true }));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true })); 
app.use(session({
  secret: 'your-secret-key', // use a strong, secret string in prod
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: false,        // set to true in production with HTTPS
    httpOnly: true,
    sameSite: 'lax',
  },
}));
app.use('/api', registerRoute);
// or whatever the correct path is

app.post("/api/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await Player.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "No record found" });
    }
    if (user.password !== password) {
      return res.status(401).json({ message: "Incorrect password" });
    }
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }
    req.session.user = { email: user.email };
    res.status(200).json({ message: "Login successful", user });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});
app.use('/api/player', playerRoute);
app.use('/api/manager', managerRoutes)
app.use('/api/admin', adminRoutes) // 🔥 use adminRoutes


mongoose.connect('mongodb://localhost:27017/sports-management', {})
.then(() => {
  console.log("✅ Connected to MongoDB");
  app.listen(5000, () => console.log("Server running on port 5000"));
})
.catch(err => console.error(err));
