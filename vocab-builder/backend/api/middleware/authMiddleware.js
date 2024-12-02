import jwt from 'jsonwebtoken';

export const verifyToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = {
            _id: decoded.id,
            email: decoded.email,
        };
        next();
    } catch (error) {
       return res.status(403).json({ message: 'Token is invalid or expired' });
    }
}