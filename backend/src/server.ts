import express from 'express';
const cors = require('cors');
const cookieParser = require('cookie-parser');
const authRoutes = require('./api/authRoutes'); // Adjust path to where you put the file
import dotenv from 'dotenv';
dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;
// --- Middleware ---
app.use(express.json());
app.use(cookieParser()); // <--- CRITICAL: Needed to read/write the auth cookie

app.use(cors({
    origin: 'http://localhost:3000', // Your Frontend URL
    credentials: true // <--- CRITICAL: Allows cookies to be sent back and forth
}));

// --- Routes ---
app.use('/api/auth', authRoutes);
console.log('DATABASE_URL:', process.env.DATABASE_URL ? '✅ Set' : '❌ Missing');
console.log('PORT:', process.env.PORT ? '✅ Set' : '❌ Missing');
// --- Start Server ---
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`http://localhost:${PORT}`);

});