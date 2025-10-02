const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

// Đăng ký
exports.register = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        const user = new User({ username, email, password });
        await user.save();

        res.status(201).json({ message: 'User registered successfully!' });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Đăng nhập
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: 'User not found' });

        const isMatch = await user.comparePassword(password);
        if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

        const token = jwt.sign(
            { id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        res.json({ token });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
