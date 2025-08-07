const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User');

const router = express.Router();  // Define router here (this line was likely missing)

router.post('/login', async (req, res) => {
  const { username, password, role } = req.body;
  console.log('Login attempt:', { username, role });  // Debugging log
  try {
    const user = await User.findOne({ username, role });
    console.log('Found user:', user ? 'Yes' : 'No');
    if (!user) {
      console.log('No user found');
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    const passwordMatch = await bcrypt.compare(password, user.password);
    console.log('Password match:', passwordMatch);
    if (!passwordMatch) {
      console.log('Password mismatch');
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
  } catch (err) {
    console.error('Auth error:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;  // Export the router
