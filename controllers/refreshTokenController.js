import User from '../models/User.js';
import jwt from 'jsonwebtoken';
import { refreshCookieOptions, refreshCookieClearOptions } from '../config/refreshCookieOptions.js';

const handleRefreshToken = async (req, res, next) => {
    try {
        const cookies = req.cookies;

        if (!cookies?.jwt) return res.sendStatus(401);

        const refreshToken = cookies.jwt;

        res.clearCookie('jwt', refreshCookieClearOptions);

        const foundUser = await User.findOne({ refreshToken: refreshToken }).exec();

        // Detected refresh token reuse.
        if (!foundUser) {
            jwt.verify(
                refreshToken,
                process.env.REFRESH_TOKEN_SECRET,
                async (err, decoded) => {
                    if (err) return res.sendStatus(403); // Forbidden
                    const hackedUser = await User.findOne({ username: decoded.username }).exec();
                    if (!hackedUser) return;
                    hackedUser.refreshToken = [];
                    await hackedUser.save();
                }
            );

            return res.sendStatus(403); // Forbidden
        }

        const newRefreshTokenArray = foundUser.refreshToken.filter(rt => rt !== refreshToken);

        // Evaluate JWT.
        jwt.verify(
            refreshToken,
            process.env.REFRESH_TOKEN_SECRET,
            async (err, decoded) => {
                if (err) {
                    foundUser.refreshToken = [...newRefreshTokenArray];
                    await foundUser.save();
                }

                if (err || foundUser.username !== decoded.username) return res.sendStatus(403);

                // Refresh token was still valid.
                const roles = Object.values(foundUser.roles);
                const accessToken = jwt.sign(
                    {
                        UserInfo: {
                            username: decoded.username,
                            roles: roles
                        }
                    },
                    process.env.ACCESS_TOKEN_SECRET,
                    { expiresIn: '5m' }
                );

                const newRefreshToken = jwt.sign(
                    { username: decoded.username },
                    process.env.REFRESH_TOKEN_SECRET,
                    { expiresIn: '1d' }
                );
                // Save refresh token with current user.
                foundUser.refreshToken = [...newRefreshTokenArray, newRefreshToken];
                await foundUser.save();

                // Create refresh-token cookie.
                res.cookie('jwt', newRefreshToken, refreshCookieOptions);

                res.json({ accessToken });
            }
        );

    } catch (error) {
        next(error);
    }
};

export default { handleRefreshToken };
