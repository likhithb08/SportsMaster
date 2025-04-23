import express from 'express';
import Player from '../models/player.js';

const router = express.Router();

router.get('/me', async (req, res) => {
  const email = req.session?.user?.email;

  if (!email) return res.status(401).json({ message: 'Not authenticated' });

  try {
    const user = await Player.findOne({ email });

    if (!user) return res.status(404).json({ message: 'User not found' });

    res.json({
      username: user.username,
      email: user.email,
      role: user.role,
      // any other fields you want to expose
    });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});


export default router;
