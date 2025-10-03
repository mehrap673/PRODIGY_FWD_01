import express from 'express';
import User from '../models/User.js';
import { authMiddleware } from '../middleware/auth.js';
import { permit } from '../middleware/roles.js';

const router = express.Router();

router.get('/profile', authMiddleware, async (req, res) => {
  try {
    res.json({
      success: true,
      user: req.user
    });
  } catch (error) {
    console.error('Profile error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error fetching profile' 
    });
  }
});

router.get('/admin', authMiddleware, permit('admin'), async (req, res) => {
  try {
    const users = await User.find().select('-password');
    
    res.json({
      success: true,
      users,
      stats: {
        totalUsers: users.length,
        adminUsers: users.filter(u => u.role === 'admin').length,
        regularUsers: users.filter(u => u.role === 'user').length
      }
    });
  } catch (error) {
    console.error('Admin error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error fetching admin data' 
    });
  }
});

export default router;
