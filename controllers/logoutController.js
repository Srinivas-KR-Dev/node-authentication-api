import User from '../models/User.js';
import { refreshCookieClearOptions } from '../config/refreshCookieOptions.js';

const handleLogout = async (req, res, next) => {
    try {
        // On the client, also delete the access token.

        const cookies = req.cookies;
        if (!cookies?.jwt) return res.sendStatus(204); // No content

        const refreshToken = cookies.jwt;

        // Check whether refresh token exists in database.
        const foundUser = await User.findOne({ refreshToken: refreshToken }).exec();
        if (!foundUser) {
            res.clearCookie('jwt', refreshCookieClearOptions);
            return res.sendStatus(204);
        }

        // Delete refresh token from database.
        foundUser.refreshToken = foundUser.refreshToken.filter(rt => rt !== refreshToken);
        await foundUser.save();

        res.clearCookie('jwt', refreshCookieClearOptions);
        res.sendStatus(204);

    } catch (error) {
        next(error);
    }
};

export default { handleLogout };
