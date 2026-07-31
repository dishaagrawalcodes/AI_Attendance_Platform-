const jwt = require("jsonwebtoken");
const authenticateUser = (req, res, next) => {
    try {

        // Read Authorization header
        const authHeader = req.headers.authorization;

        // Check if header exists
        if (!authHeader) {
            return res.status(401).json({
                success: false,
                message: "Authorization header missing"
            });
        }

        // Check Bearer token format
        if (!authHeader.startsWith("Bearer ")) {
            return res.status(401).json({
                success: false,
                message: "Invalid token format"
            });
        }

        // Extract token
        const token = authHeader.split(" ")[1];

        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Save user info for later
        req.user = decoded;

        // Continue to next middleware/controller
        next();

    } catch (error) {

        return res.status(401).json({
            success: false,
            message: "Invalid or Expired Token"
        });

    }
};

module.exports = authenticateUser;