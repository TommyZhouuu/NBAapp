'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/navbar';

export default function LoginPage() {
  const [usernameOrEmail, setUsernameOrEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = async () => {
    setError('');
    const res = await fetch('/api/login', {
      method: 'POST',
      body: JSON.stringify({ usernameOrEmail, password }),
    });
    const data = await res.json();
    if (data.error) {
      setError(data.error);
    } else {
      localStorage.setItem('token', data.token);
      router.push('/');
    }
  };

  return (
    <div className="min-h-screen bg-white text-black">
      <Navbar />
      <div className="flex justify-center items-center py-24">
        <div className="w-full max-w-md bg-gray-100 p-8 rounded shadow">
          <h1 className="text-2xl font-bold mb-6 text-center">Login</h1>
          <input
            type="text"
            placeholder="Username or Email"
            value={usernameOrEmail}
            onChange={(e) => setUsernameOrEmail(e.target.value)}
            className="w-full p-2 mb-4 border rounded"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 mb-6 border rounded"
          />
          <button
            onClick={handleLogin}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded"
          >
            Login
          </button>
          {error && <p className="text-red-600 mt-4 text-center">{error}</p>}
        </div>
      </div>
    </div>
  );
}
