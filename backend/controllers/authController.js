const User = require('../models/User');
const jwt = require('jsonwebtoken');

// ─── Generate JWT ─────────────────────────────────────────────────────────────
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE || '7d',
    });
};

// ─── POST /api/auth/register ──────────────────────────────────────────────────
const register = async (req, res) => {
    const { name, email, password, role } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({ success: false, message: 'Please provide name, email and password' });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
        return res.status(400).json({ success: false, message: 'Email already registered' });
    }

    const allowedRoles = ['student', 'teacher'];
    const userRole = allowedRoles.includes(role) ? role : 'student';

    const user = await User.create({ name, email, password, role: userRole });

    const token = generateToken(user._id);

    res.status(201).json({
        success: true,
        token,
        user: {
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            avatar: user.avatar,
        },
    });
};

// ─── POST /api/auth/login ─────────────────────────────────────────────────────
const login = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ success: false, message: 'Please provide email and password' });
    }

    const user = await User.findOne({ email }).select('+password');
    if (!user) {
        return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
        return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    // Update last login
    user.lastLogin = Date.now();
    await user.save({ validateBeforeSave: false });

    const token = generateToken(user._id);

    res.status(200).json({
        success: true,
        token,
        user: {
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            avatar: user.avatar,
            gradeLevel: user.gradeLevel,
            subject: user.subject,
            preferredSpeed: user.preferredSpeed,
        },
    });
};

// ─── GET /api/auth/me ─────────────────────────────────────────────────────────
const getMe = async (req, res) => {
    res.status(200).json({
        success: true,
        user: req.user,
    });
};

// ─── PUT /api/auth/profile ────────────────────────────────────────────────────
const updateProfile = async (req, res) => {
    const { name, gradeLevel, subject, preferredSpeed } = req.body;

    const updates = {};
    if (name) updates.name = name;
    if (gradeLevel !== undefined) updates.gradeLevel = gradeLevel;
    if (subject !== undefined) updates.subject = subject;
    if (preferredSpeed !== undefined) updates.preferredSpeed = preferredSpeed;

    const user = await User.findByIdAndUpdate(req.user._id, updates, {
        new: true,
        runValidators: true,
    });

    res.status(200).json({ success: true, user });
};

module.exports = { register, login, getMe, updateProfile };
