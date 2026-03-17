const verifyRoles = (...allowedRoles) => {
    return (req, res, next) => {
        if (!req?.roles) return res.sendStatus(401);

        const result = req.roles.some(role => allowedRoles.includes(role));
        if (!result) return res.status(403).json({ message: "You don't have permission to perform this action" });
        next();
    }
}

export default verifyRoles;