import User from '../models/User.js';
import mongoose from 'mongoose';


const getAllUsers = async (req, res, next) => {
    try {
        const users = await User.find().select('-password -refreshToken').lean();// Exclude sensitive fields from response

        res.status(200).json(users);

    } catch (error) {
        next(error);
    }
};

const getUser = async (req, res, next) => {
    try {
        const id = req.params.id;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: 'Invalid ID' });
        }

        const user = await User.findById(id).select('-password -refreshToken').lean();// Exclude sensitive fields from response

        if (!user) {
            return res.status(404).json({ message: `User ID ${id} not found` });
        }

        res.status(200).json(user);

    } catch (error) {
        next(error);
    }
};

const deleteUser = async (req, res, next) => {
    try {
        const id = req.params.id;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: 'Invalid ID' });
        }

        const deltedUser = await User.findByIdAndDelete(id);

        if (!deltedUser) {
            return res.status(404).json({ message: `User ID ${id} not found` });
        }

        res.sendStatus(204);

    } catch (error) {
        next(error);
    }
};

export default { getAllUsers, getUser, deleteUser }
