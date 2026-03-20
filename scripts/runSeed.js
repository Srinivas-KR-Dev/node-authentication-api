import dotenv from 'dotenv';
dotenv.config();

import mongoose from 'mongoose';
import connectDB from '../config/dbConn.js';
import seedEmployees from './seedEmployees.js';

const runSeed = async () => {
    try {
        await connectDB();
        await seedEmployees();
        console.log('Seed command completed');
    } catch (error) {
        console.error('Seed command failed:', error);
    } finally {
        await mongoose.connection.close();
    }
};

runSeed();
