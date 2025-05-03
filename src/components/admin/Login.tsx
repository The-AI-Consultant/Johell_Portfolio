
import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';

const Login: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (login(username, password)) {
      setError('');
    } else {
      setError('Invalid credentials');
    }
  };

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
      <div className="bg-rock-dark p-8 rounded-lg border border-rock-gold shadow-glow-gold w-96">
        <h2 className="text-2xl font-cinzel text-rock-gold mb-6">Admin Login</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Username"
              className="w-full bg-rock-black border border-rock-gold p-2 rounded"
            />
          </div>
          <div>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="w-full bg-rock-black border border-rock-gold p-2 rounded"
            />
          </div>
          {error && <p className="text-rock-red">{error}</p>}
          <button type="submit" className="w-full bg-rock-gold text-rock-black font-bold py-2 rounded hover:bg-rock-gold-warm transition-colors">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
