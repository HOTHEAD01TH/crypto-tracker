import express from 'express';
import auth from '../middleware/auth.js';
import User from '../models/User.js';
import multer from 'multer';

const router = express.Router();

const upload = multer({ 
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + '-' + file.originalname);
    }
  })
});

// Add this new route for profile updates
router.put('/profile', auth, upload.single('profilePicture'), async (req, res) => {
  try {
    const user = await User.findById(req.user.userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Update name if provided
    if (req.body.name) {
      user.name = req.body.name;
    }

    // Update profile picture if provided
    if (req.file) {
      user.profilePicture = `http://localhost:5000/uploads/${req.file.filename}`;
    }

    await user.save();

    res.json({
      id: user._id,
      name: user.name,
      email: user.email,
      profilePicture: user.profilePicture
    });
  } catch (error) {
    console.error('Profile update error:', error);
    res.status(500).json({ message: 'Error updating profile' });
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