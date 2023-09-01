const jwt = require('jsonwebtoken')

const authRequired = (req, res, next) => {
    const { token } = req.cookies
    if (!token) return res.status(401).json({ message: "Unauthorized" });
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) return res.status(401).json({ message: "Invalid token" })
        req.user = decoded
    })
    next();
}

module.exports = {
    authRequired
}
