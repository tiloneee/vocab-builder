import jwt from 'jsonwebtoken';

export const verifyToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) return res.status(403).json({ message: 'No token provided' });

    try {
        jwt.verify(token, process.env.JWT_SECRET);

        next();
    } catch (error) {
        console.error(error);
        return res.status(403).json({ message: 'Unauthorized' });
    }
}