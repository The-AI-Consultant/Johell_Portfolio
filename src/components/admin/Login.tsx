
import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';

const Login: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(username, password);
      window.location.hash = '';
    } catch (err) {
      setError('Identifiants invalides');
    }
  };

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
      <div className="bg-rock-dark p-8 rounded-lg border border-rock-gold shadow-glow-gold w-96">
        <h2 className="text-2xl font-cinzel text-rock-gold mb-6">Connexion Admin</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Nom d'utilisateur"
              className="w-full bg-rock-black border border-rock-gold p-2 rounded text-white"
            />
          </div>
          <div>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Mot de passe"
              className="w-full bg-rock-black border border-rock-gold p-2 rounded text-white"
            />
          </div>
          {error && <p className="text-red-500">{error}</p>}
          <button type="submit" className="w-full bg-rock-gold text-rock-black font-bold py-2 rounded hover:bg-rock-gold-warm transition-colors">
            Connexion
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
