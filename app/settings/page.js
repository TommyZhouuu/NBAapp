'use client';
import { useEffect, useState } from 'react';
import Navbar from '@/components/navbar';

export default function SettingsPage() {
  const [userInfo, setUserInfo] = useState({ username: '', email: '' });
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const decoded = JSON.parse(atob(token.split('.')[1]));
      setUserInfo({
        username: decoded.username || '',
        email: decoded.email || '',
      });
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      name,
      email,
      message,
    };

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const result = await res.json();

      if (res.ok) {
        alert('Message sent successfully!');
        setName('');
        setEmail('');
        setMessage('');
      } else {
        alert(result.error || 'Failed to send message');
      }
    } catch (err) {
      console.error('Submit failed:', err);
      alert('An error occurred while sending your message.');
    }
  };

  return (
    <div className="min-h-screen bg-white text-black">
      <Navbar />
      <div className="flex flex-col items-center gap-10 py-20">

        {/* Account Info */}
        <div className="w-full max-w-lg bg-gray-100 p-8 rounded shadow">
          <h1 className="text-2xl font-bold mb-6 text-center">⚙️ Settings</h1>
          <h2 className="text-lg font-semibold mb-2">Account</h2>
          <p>Username: <span className="font-bold">{userInfo.username}</span></p>
          <p>Email: <span className="font-bold">{userInfo.email}</span></p>
          <button
            onClick={handleLogout}
            className="mt-6 bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded"
          >
            Log out
          </button>
        </div>

        {/* Developer Info */}
        <div className="w-full max-w-lg bg-gray-100 p-6 rounded shadow">
          <h2 className="text-lg font-semibold mb-2">Developer</h2>
          <p>Name: <span className="font-bold">Xuesong</span></p>
          <p>Email: <span className="font-bold">xzhou145@myseneca.ca</span></p>
        </div>

        {/* Contact Us */}
        <div className="w-full max-w-lg bg-gray-100 p-6 rounded shadow">
          <h2 className="text-lg font-semibold mb-4">Contact Us</h2>
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <div>
              <label className="block mb-1 font-medium" htmlFor="name">Name<span className="text-red-500">*</span></label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full border border-gray-300 px-3 py-2 rounded"
              />
            </div>
            <div>
              <label className="block mb-1 font-medium" htmlFor="email">Email<span className="text-red-500">*</span></label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full border border-gray-300 px-3 py-2 rounded"
              />
            </div>
            <div>
              <label className="block mb-1 font-medium" htmlFor="message">Message</label>
              <textarea
                id="message"
                rows="4"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full border border-gray-300 px-3 py-2 rounded"
              ></textarea>
            </div>
            <button
              type="submit"
              className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition"
            >
              Submit
            </button>
          </form>
        </div>


        <div className="w-full max-w-lg bg-gray-100 p-6 rounded shadow text-center">
            <h2 className="text-lg font-semibold mb-4">Thanks to Professor Shahdad Shariatmadari</h2>
              <img
                 src="/images/p.jpg"
                alt="Professor Shahdad Shariatmadari"
                className="mx-auto rounded-full w-24 h-24 object-cover mb-4"
              />
        </div>


      </div>
    </div>
  );
}
