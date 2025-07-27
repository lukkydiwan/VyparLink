import User from '../models/user.model.js';
import { signToken } from '../utils/jwt.js';

export const register = async (req, res, next) => {
  try {
    const { name, email, password, role } = req.body;
    if (await User.findOne({ email })) throw new Error('Email already in use');
    const user = await User.create({ name, email, password, role });
    const token = signToken(user);
    res
      .cookie('token', token, { httpOnly: true, sameSite: 'lax' })
      .status(201)
      .json({ user: { id: user._id, name: user.name, role: user.role } });
  } catch (err) {
    next(err);
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !(await user.matchPassword(password)))
      throw new Error('Invalid credentials');
    const token = signToken(user);
    res
      .cookie('token', token, { httpOnly: true, sameSite: 'lax' })
      .json({ user: { id: user._id, name: user.name, role: user.role } });
  } catch (err) {
    next(err);
  }
};

export const logout = (_req, res) => {
  res.clearCookie('token').json({ message: 'Logged out' });
};
