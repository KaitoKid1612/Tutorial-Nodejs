const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

// Kết nối MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

// Routes
const todoRoutes = require('./routes/todoRoutes');
const authRoutes = require('./routes/authRoutes');
const authMiddleware = require('./middlewares/authMiddleware');

app.use('/api/auth', authRoutes);
app.use('/api/todos', authMiddleware, todoRoutes);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
