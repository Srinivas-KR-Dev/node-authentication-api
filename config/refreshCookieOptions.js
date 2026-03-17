const isProduction = process.env.NODE_ENV === 'production';

const refreshCookieOptions = {
    httpOnly: true,
    sameSite: isProduction ? 'None' : 'Lax',
    secure: isProduction,
    maxAge: 24 * 60 * 60 * 1000
};

const refreshCookieClearOptions = {
    httpOnly: true,
    sameSite: refreshCookieOptions.sameSite,
    secure: refreshCookieOptions.secure
};

export { refreshCookieOptions, refreshCookieClearOptions };
