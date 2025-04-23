// routes/managerRoutes.js
import express from 'express';
import Player from '../models/player.js'; // Assuming Player is the model for managers

const router = express.Router();

// Manager Login
router.post('/me', async (req, res) => {
  const email = req.session?.user?.email;
  if (!email) return res.status(401).json({ message: 'Not authenticated' });

  try {
    const manager = await Player.findOne({ email });

    if (!manager || manager.password !== password) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    res.json({
      username: manager.username,
      email: manager.email,
      role: manager.role,
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Manager Profile (optional)
router.get('/me', (req, res) => {
  res.json({ message: 'Manager profile endpoint working!' });
});

export default router;
