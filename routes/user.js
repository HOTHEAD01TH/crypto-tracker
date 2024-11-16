import express from 'express';
import auth from '../middleware/auth.js';
import User from '../models/User.js';

const router = express.Router();

router.put('/profile', auth, async (req, res) => {
  try {
    console.log('Received update request:', req.body);

    const user = await User.findById(req.user.userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Update name if provided
    if (req.body.name) {
      user.name = req.body.name;
    }

    // Update profile picture if provided
    if (req.body.profilePicture && req.body.profilePicture.data) {
      user.profilePicture = {
        data: req.body.profilePicture.data,
        contentType: req.body.profilePicture.contentType
      };
    }

    console.log('Saving user...');
    await user.save();
    console.log('User saved successfully');

    res.json({
      id: user._id,
      name: user.name,
      email: user.email,
      profilePicture: {
        data: user.profilePicture?.data,
        contentType: user.profilePicture?.contentType
      }
    });
  } catch (error) {
    console.error('Profile update error details:', error);
    res.status(500).json({ 
      message: 'Error updating profile',
      error: error.message 
    });
  }
});

// Get user's watchlist
router.get('/coins', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId);
    res.json({ watchlist: user.watchlist });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching watchlist' });
  }
});

// Add coin to watchlist
router.post('/coins', auth, async (req, res) => {
  try {
    const { symbol, name, logo } = req.body;
    const user = await User.findById(req.user.userId);
    
    // Check if coin already exists
    if (user.watchlist.some(coin => coin.symbol === symbol)) {
      return res.status(400).json({ message: 'Coin already in watchlist' });
    }

    user.watchlist.push({ symbol, name, logo });
    await user.save();
    
    res.json({ watchlist: user.watchlist });
  } catch (error) {
    res.status(500).json({ message: 'Error adding coin' });
  }
});

export default router;