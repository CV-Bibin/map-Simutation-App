const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');  // Ensure User model points to correct schema

const router = express.Router();

// Login route
router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        // Check if the user exists (case-insensitive match)
        const user = await User.findOne({ username: new RegExp('^' + username + '$', 'i') });

        if (!user) {
            return res.status(400).json({ message: 'User not found' });
        }

        // Check if password matches
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid password' });
        }

        // Create JWT token
        const token = jwt.sign(
            { userId: user._id, username: user.username, role: user.role },
            'your_jwt_secret_key',  // Replace this with a secure secret
            { expiresIn: '1h' } // Token expires in 1 hour
        );

        // Send the token to the frontend
        res.json({ token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
