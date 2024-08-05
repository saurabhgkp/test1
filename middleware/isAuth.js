import jwt from 'jsonwebtoken';

export const isAuth = (req, res, next) => {
    try {
        const token = req.headers['authorization']?.split(' ')[1];
        if (!token) throw new Error('No token provided');

        const decoded = jwt.verify(token, "saurabh");

        if (!req.user) req.user = {};
        req.user.userId = decoded.userId;
        req.user.role = decoded.role;

        return next();

    } catch (error) {
        console.log(error.message);
        res.status(401).json({ message: 'Unauthorized', error: error.message });
    }
}
