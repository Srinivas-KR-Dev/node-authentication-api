import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import path from 'path';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import mongoose from 'mongoose';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

import root from './routes/root.js';
import registerRoute from './routes/register.js';
import authRoute from './routes/auth.js';
import refreshRoute from './routes/refresh.js';
import logoutRoute from './routes/logout.js';
import employeesRoutes from './routes/api/employees.js';
import usersRoutes from './routes/api/users.js';

import corsOptions from './config/corsOptions.js';
import { logger } from './middleware/logEvents.js';
import errorHandler from './middleware/errorHandler.js';
import verifyJWT from './middleware/verifyJWT.js';
import credentials from './middleware/credentials.js';
import connectDB from './config/dbConn.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3500;

// Connect to MongoDB.
connectDB();

// Custom middleware logger.
app.use(logger);

// Handle options credentials check before CORS
// and fetch cookies credentials requirement.
app.use(credentials);

// Cross-Origin Resource Sharing.
app.use(cors(corsOptions));

// Built-in middleware to handle urlencoded form data.
app.use(express.urlencoded({ extended: false }));

// Built-in middleware for JSON.
app.use(express.json());

// Middleware for cookies.
app.use(cookieParser());

// Serve static files.
app.use(express.static(path.join(__dirname, '/public')));

// Routes.
app.use('/', root);
app.use('/register', registerRoute);
app.use('/auth', authRoute);
app.use('/refresh', refreshRoute);
app.use('/logout', logoutRoute);

app.use(verifyJWT);
app.use('/api/users', usersRoutes);
app.use('/api/employees', employeesRoutes);

app.all(/.*/, (req, res) => {
    res.status(404);
    console.warn(`[${new Date().toISOString()}] 404: ${req.method} ${req.originalUrl}`);
    if (req.accepts('html')) {
        res.sendFile(path.join(__dirname, 'views', '404.html'));
    } else if (req.accepts('json')) {
        res.json({ error: '404 not found' });
    } else {
        res.type('txt').send('404 not found');
    }
});

// Custom error handling.
app.use(errorHandler);

mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
});
