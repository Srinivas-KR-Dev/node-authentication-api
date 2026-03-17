import User from '../models/User.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const handleLogin = async (req, res, next) => {
    try {
        const cookies = req.cookies;

        const { user, password } = req.body;

        if (!user || !password) return res.status(400).json({ message: 'Username and password are required' });

        const username = user.trim().toLowerCase();

        const foundUser = await User.findOne({ username: username }).exec();
        if (!foundUser) return res.sendStatus(401);//Unauthorized

        //Evaluate password
        const match = await bcrypt.compare(password, foundUser.password);

        if (!match) return res.sendStatus(401);

        const roles = Object.values(foundUser.roles);
        //Create JWTs
        const accessToken = jwt.sign(
            {
                UserInfo: {
                    username: foundUser.username,
                    roles: roles
                }
            },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: '5m' }
        );
        const newRefreshToken = jwt.sign(
            { username: foundUser.username },
            process.env.REFRESH_TOKEN_SECRET,
            { expiresIn: '1d' }
        );

        let newRefreshTokenArray =
            !cookies?.jwt
                ? foundUser.refreshToken
                : foundUser.refreshToken.filter(rt => rt !== cookies.jwt);

        if (cookies?.jwt) {

            const refreshToken = cookies.jwt;
            const foundToken = await User.findOne({ refreshToken }).exec();

            //Detected refresh token reuse!
            if (!foundToken) {
                //clear out ALL previous refresh tokens
                newRefreshTokenArray = [];
            }

            res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true });
        }

        //Saving refresh token with current user
        foundUser.refreshToken = [...newRefreshTokenArray, newRefreshToken];
        await foundUser.save();

        //Create secure cookie with refresh token
        res.cookie('jwt', newRefreshToken, {
            httpOnly: true,
            sameSite: 'None',
            //secure: true,
            maxAge: 24 * 60 * 60 * 1000
        });

        res.status(200).json({ accessToken });

    } catch (error) {
        next(error);
    }

}

export default { handleLogin }

