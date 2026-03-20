import User from '../models/User.js';
import bcrypt from 'bcrypt';

const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d]).{8,}$/;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const handleNewUser = async (req, res, next) => {
    try {
        const { user, password, fullname, email } = req.body;

        if (!user || !password || !fullname || !email) {
            return res.status(400).json({ message: 'Username, password, fullname, and email are required' });
        }
        if (!PASSWORD_REGEX.test(password)) {
            return res.status(400).json({
                message: 'Password must be at least 8 characters and include uppercase, lowercase, number, and special character'
            });
        }
        if (!EMAIL_REGEX.test(email)) {
            return res.status(400).json({ message: 'Please enter a valid email address' });
        }

        const username = user.trim().toLowerCase();
        const userEmail = email.trim().toLowerCase();

        // Check for duplicate usernames in the database.
        const duplicate = await User.findOne({ username: username }).exec();
        if (duplicate) return res.status(409).json({
            message: 'Username already exists'
        }); // Conflict
        const duplicateEmail = await User.findOne({ email: userEmail }).exec();
        if (duplicateEmail) return res.status(409).json({
            message: 'Email already exists'
        }); // Conflict

        // Encrypt the password before storing it.
        const hashedPassword = await bcrypt.hash(password, 10);
        // Store the new user in the database.
        await User.create({
            username: username,
            fullname: fullname.trim(),
            email: userEmail,
            password: hashedPassword
        });

        res.status(201).json({ message: `New user ${username} created!` });
    } catch (error) {
        next(error); // Send error to global handler.
    }
};

export default { handleNewUser };
