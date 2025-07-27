// src/context/AuthContext.jsx
import { createContext, useContext, useState, useEffect } from 'react';
import { api } from '../lib/api';

const AuthContext = createContext(null);
export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }) {
  const [user,    setUser]    = useState(null);
  const [loading, setLoading] = useState(true);

  /* ── check cookie on mount ─────────────────────────────── */
  useEffect(() => {
    api.get('/auth/me')
       .then(res => setUser(res.data.user))
       .catch(() => {})
       .finally(() => setLoading(false));
  }, []);

  /* ── LOGIN ─────────────────────────────────────────────── */
  const login = async (email, password) => {
    const res = await api.post('/auth/login', { email, password });
    setUser(res.data.user);                     // { id, name, role }
    return res.data.user.role;                  // for redirect
  };

  /* ── REGISTER (new) ────────────────────────────────────── */
  const register = async (name, email, password, role) => {
    const res = await api.post('/auth/register', {
      name,
      email,
      password,
      role                                    // buyer | vendor
    });
    setUser(res.data.user);
    return res.data.user.role;
  };

  /* ── LOGOUT ────────────────────────────────────────────── */
  const logout = async () => {
    await api.post('/auth/logout');
    setUser(null);
  };

  /* ── context value ─────────────────────────────────────── */
  const value = { user, loading, login, register, logout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
