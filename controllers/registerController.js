import User from '../models/User.js';
import bcrypt from 'bcrypt';

const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d]).{8,}$/;

const handleNewUser = async (req, res, next) => {
    try {
        const { user, password } = req.body;

        if (!user || !password) return res.status(400).json({ message: 'Username and password are required' });
        if (!PASSWORD_REGEX.test(password)) {
            return res.status(400).json({
                message: 'Password must be at least 8 characters and include uppercase, lowercase, number, and special character'
            });
        }

        const username = user.trim().toLowerCase();

        //check for duplicate usernames in the db.
        const duplicate = await User.findOne({ username: username }).exec();
        if (duplicate) return res.status(409).json({
            message: 'Username already exists'
        }); //Conflict

        //encrypt the password
        const hashedPassword = await bcrypt.hash(password, 10);
        //store the new user in DB
        await User.create({
            username: username,
            password: hashedPassword
        });

        res.status(201).json({ message: `New user ${username} created!` });
    } catch (error) {
        next(error);//send error to global handler
    }

}

export default { handleNewUser }
