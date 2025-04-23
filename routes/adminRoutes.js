// routes/managerRoutes.js
import express from 'express';
import admin from '../models/admin.js';

const router = express.Router();

// admin Login
router.post('/me', async (req, res) => {
  const { email, password } = req.body;

  try {
    const admin = await admin.findOne({ email });

    if (!admin || admin.password !== password) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    res.json({
      _id: admin._id,
      name: admin.name,
      email: admin.email,
      role: admin.role,
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// admin Profile (optional)
router.get('/me', (req, res) => {
  res.json({ message: 'admin profile endpoint working!' });
});

export default router;
