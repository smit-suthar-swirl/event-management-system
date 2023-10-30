const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const eventRoutes = require("./routes/eventRoutes")
const paymentRoutes = require("./routes/paymentRoutes")

const app = express();

app.use(express.json());
app.use(cors());

// Connect to MongoDB using mongoose

app.use('/api/auth', authRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/payment', paymentRoutes);
// Add other API routes

module.exports = app;
