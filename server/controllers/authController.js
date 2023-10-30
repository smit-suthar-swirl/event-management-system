const authService = require('../services/authService');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

async function register(req, res) {
  const { username, password, role } = req.body;

  try {
    const user = await authService.findUserByUsername(username);
    if (user) {
      return res.status(400).json({ message: 'Username already taken', success: false });
    }

    const newUser = await authService.registerUser(username, password, role);
    return res.status(201).json({ user: newUser, success: true, message: "Registration successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Registration failed', success: false });

  }
}

async function login(req, res) {
  const { username, password } = req.body;

  try {
    const user = await authService.findUserByUsername(username);

    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials', success: false });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ message: 'Invalid credentials', success: false });
    }

    // Create a JWT token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: '1h', // Token expires in 1 hour, adjust as needed
    });

    res.status(200).json({ user, token, success: true, message: "Login successfully" });
  } catch (error) {
    return res.status(500).json({ message: 'Login failed', success: false });
  }
}

module.exports = {
  register,
  login
};
