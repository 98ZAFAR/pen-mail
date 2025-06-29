const AuthorizeUser = (roles)=>{
    return (req, res, next) => {
        const userRole = req.user.role; // Assuming req.user is populated with the authenticated user's info

        if (!roles.includes(userRole)) {
            return res.status(403).json({ success: false, message: "Access denied" });
        }

        next();
    };
}

module.exports = AuthorizeUser;