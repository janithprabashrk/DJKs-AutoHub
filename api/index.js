import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRouter from './routes/user.route.js';
import authRouter from './routes/auth.route.js';
import listingRouter from './routes/listing.route.js';
import aiResponseRouter from './routes/ai-response.js'; // changed import path
import cookieParser from 'cookie-parser';
dotenv.config();

// Connect to MongoDB
mongoose.connect(process.env.MONGO).then(() => {
    console.log('MongoDB connected..!');
}).catch((err) => { 
    console.log(err);
});

const app = express();

// Middleware
app.use(express.json()); // Parse JSON request bodies
app.use(cookieParser()); // Parse cookies

// Routes
app.use('/api/user', userRouter); // User routes
app.use('/api/auth', authRouter); // Authentication routes
app.use('/api/listing', listingRouter); // Listing routes
app.use('/api/ai-response', aiResponseRouter); // AI Chatbot routes

// Error handling middleware
app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500; 
    const message = err.message || 'Internal Server Error';
    return res.status(statusCode).json({
        success : false,
        statusCode,
        message,    
    });
});

// Start the server
app.listen(3000, () => {
    console.log('Server is running on port 3000..!');
});