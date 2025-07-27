import jwt from 'jsonwebtoken';

export const signToken = (user) =>
  jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
    expiresIn: '7d',
  });

export const protect = (roles = []) => (req, res, next) => {
  try {
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];
    if (!token) throw new Error('Not authenticated');

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (roles.length && !roles.includes(decoded.role)) throw new Error('Forbidden');

    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ message: err.message || 'Auth error' });
  }
};
