import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import "./AuthForm.css"   // 🌹 Love‑&‑Petal themed styles
import Navbar from '../components/Navbar/Navbar';

export default function AuthForm() {
  const [mode, setMode]           = useState('login');   // 'login' | 'register'
  const [name, setName]           = useState('');
  const [email, setEmail]         = useState('');
  const [password, setPass]       = useState('');
  const [confirmPass, setConf]    = useState('');
  const [role, setRole]           = useState('buyer');   // 'buyer' | 'vendor'
  const [error, setError]         = useState('');

  const nav = useNavigate();
  const { login, register } = useAuth();

  const submit = async (e) => {
    e.preventDefault();
    setError('');

    if (mode === 'register' && password !== confirmPass) {
      return setError('Passwords do not match');
    }

    try {
      const returnedRole =
        mode === 'login'
          ? await login(email, password)
          : await register(name, email, password, role); // pass role 👈

      nav(returnedRole === 'vendor' ? '/vendor' : '/buyer', { replace: true });
    } catch (err) {
      setError(
        err.response?.data?.message ||
          `${mode === 'login' ? 'Login' : 'Register'} failed`
      );
    }
  };

  return (
    <>
      <Navbar />
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-side">
          <h2>{mode === 'login' ? 'Welcome Back 🌸' : 'Join BazaarX 🌹'}</h2>
          <p>
            {mode === 'login'
              ? 'Glad to see you again!'
              : 'Let’s grow your journey with us.'}
          </p>
        </div>

        <form onSubmit={submit} className="auth-form">
          <h2>{mode === 'login' ? 'Login' : 'Register'}</h2>
          {error && <p className="error-text">{error}</p>}

          {mode === 'register' && (
            <input
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="auth-input"
            required
            />
          )}

          <input
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="auth-input"
            type="email"
            required
            />

          <input
            placeholder="Password"
            type="password"
            value={password}
            onChange={(e) => setPass(e.target.value)}
            className="auth-input"
            required
            />

          {mode === 'register' && (
            <>
              <input
                placeholder="Confirm Password"
                type="password"
                value={confirmPass}
                onChange={(e) => setConf(e.target.value)}
                className="auth-input"
                required
                />

              {/* 🔑 Role selector */}
              <div className="role-switch">
                <label>
                  <input
                    type="radio"
                    name="role"
                    value="buyer"
                    checked={role === 'buyer'}
                    onChange={() => setRole('buyer')}
                    />
                  Buyer
                </label>
                <label>
                  <input
                    type="radio"
                    name="role"
                    value="vendor"
                    checked={role === 'vendor'}
                    onChange={() => setRole('vendor')}
                    />
                  Vendor
                </label>
              </div>
            </>
          )}

          <button className="rose-btn">
            {mode === 'login' ? 'Sign In' : 'Register'}
          </button>

          <p className="toggle-text">
            {mode === 'login'
              ? "Don't have an account?"
              : 'Already have an account?'}
            <span
              className="toggle-btn"
              onClick={() => {
                setMode(mode === 'login' ? 'register' : 'login');
                setError('');
              }}
              >
              {mode === 'login' ? ' Register' : ' Login'}
            </span>
          </p>
        </form>
      </div>
    </div>
              </>
  );
}
