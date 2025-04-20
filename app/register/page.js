'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/navbar';

export default function RegisterPage() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleRegister = async () => {
    setError('');
    const res = await fetch('/api/register', {
      method: 'POST',
      body: JSON.stringify({ username, email, password }),
    });
    const data = await res.json();
    if (data.error) {
      setError(data.error);
    } else {
      router.push('/login');
    }
  };

  return (
    <div className="min-h-screen bg-white text-black">
      <Navbar />
      <div className="flex justify-center items-center py-24">
        <div className="w-full max-w-md bg-gray-100 p-8 rounded shadow">
          <h1 className="text-2xl font-bold mb-6 text-center">Register</h1>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full p-2 mb-4 border rounded"
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
            onClick={handleRegister}
            className="w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded"
          >
            Register
          </button>
          {error && <p className="text-red-600 mt-4 text-center">{error}</p>}
        </div>
      </div>
    </div>
  );
}
