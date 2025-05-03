
import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';

interface User {
  username: string;
  role: 'admin' | 'dev' | 'user';
}

const UserManagement: React.FC = () => {
  const { users, addUser, removeUser, updateUserRole } = useAuth();
  const [newUsername, setNewUsername] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [newRole, setNewRole] = useState<'admin' | 'dev' | 'user'>('user');

  const handleAddUser = (e: React.FormEvent) => {
    e.preventDefault();
    if (newUsername && newPassword) {
      addUser(newUsername, newPassword, newRole);
      setNewUsername('');
      setNewPassword('');
    }
  };

  return (
    <div className="space-y-6">
      <form onSubmit={handleAddUser} className="space-y-4">
        <input
          type="text"
          value={newUsername}
          onChange={(e) => setNewUsername(e.target.value)}
          placeholder="Username"
          className="w-full bg-rock-black text-white p-2 rounded"
        />
        <input
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          placeholder="Password"
          className="w-full bg-rock-black text-white p-2 rounded"
        />
        <select
          value={newRole}
          onChange={(e) => setNewRole(e.target.value as 'admin' | 'dev' | 'user')}
          className="w-full bg-rock-black text-white p-2 rounded"
        >
          <option value="user">User</option>
          <option value="dev">Developer</option>
          <option value="admin">Admin</option>
        </select>
        <button type="submit" className="w-full bg-rock-gold text-rock-black p-2 rounded">
          Add User
        </button>
      </form>

      <div className="space-y-2">
        {Object.entries(users).map(([username, user]) => (
          <div key={username} className="flex items-center justify-between bg-rock-black p-2 rounded">
            <span className="text-white">{username} ({user.role})</span>
            <div className="space-x-2">
              <select
                value={user.role}
                onChange={(e) => updateUserRole(username, e.target.value as 'admin' | 'dev' | 'user')}
                className="bg-rock-black text-white p-1 rounded"
              >
                <option value="user">User</option>
                <option value="dev">Developer</option>
                <option value="admin">Admin</option>
              </select>
              <button
                onClick={() => removeUser(username)}
                className="bg-rock-red text-white px-2 py-1 rounded"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserManagement;
