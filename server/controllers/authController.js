const asyncHandler = require('express-async-handler'); // Need to install this or use try-catch
const User = require('../models/User');
const generateToken = require('../utils/generateToken');
const bcrypt = require('bcryptjs');

// @desc    Auth user & get token
// @route   POST /api/users/login
// @access  Public
const authUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });

        if (user && (await bcrypt.compare(password, user.password))) {
            // Streak Logic
            const today = new Date();
            today.setHours(0, 0, 0, 0);

            let lastLogin = null;
            if (user.lastLoginDate) {
                lastLogin = new Date(user.lastLoginDate);
                lastLogin.setHours(0, 0, 0, 0);
            }

            if (!lastLogin) {
                // First login ever
                user.streakCount = 1;
            } else {
                const diffTime = Math.abs(today - lastLogin);
                const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

                if (diffDays === 1) {
                    // Logged in yesterday, increment streak
                    user.streakCount += 1;
                } else if (diffDays > 1) {
                    // Missed a day or more, reset streak
                    user.streakCount = 1;
                }
                // If diffDays === 0 (logged in today already), do nothing
            }

            user.lastLoginDate = new Date();
            await user.save();

            res.json({
                _id: user._id,
                name: user.name,
                email: user.email,
                isAdmin: user.isAdmin,
                streakCount: user.streakCount,
                token: generateToken(user._id),
            });
        } else {
            res.status(401).json({ message: 'Invalid email or password' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Register a new user
// @route   POST /api/users
// @access  Public
const registerUser = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        const userExists = await User.findOne({ email });

        if (userExists) {
            res.status(400).json({ message: 'User already exists' });
            return;
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            streakCount: 1,
            lastLoginDate: new Date()
        });

        if (user) {
            res.status(201).json({
                _id: user._id,
                name: user.name,
                email: user.email,
                isAdmin: user.isAdmin,
                streakCount: 1, // Start with 1 on register
                token: generateToken(user._id),
            });
        } else {
            res.status(400).json({ message: 'Invalid user data' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { authUser, registerUser };
