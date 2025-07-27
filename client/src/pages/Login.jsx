// pages/Login.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPass] = useState('');
  const [error, setError] = useState('');
  const nav = useNavigate();
  const { login } = useAuth();

  const submit = async (e) => {
    e.preventDefault();
    try {
      const role = await login(email, password);
      nav(role === 'vendor' ? '/vendor' : '/buyer', { replace: true });
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <form onSubmit={submit} className="max-w-sm mx-auto py-20 flex flex-col gap-4">
      <h2 className="text-xl font-semibold">Login</h2>
      {error && <p className="text-red-600">{error}</p>}
      <input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="border p-2" />
      <input placeholder="Password" type="password" value={password} onChange={(e) => setPass(e.target.value)} className="border p-2" />
      <button className="bg-indigo-600 text-white py-2 rounded">Sign in</button>
    </form>
  );
}
