import express from 'express';
import auth from '../middleware/auth.js';
import User from '../models/User.js';

const router = express.Router();

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