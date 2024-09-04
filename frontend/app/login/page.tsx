'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { signIn } from 'next-auth/react';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/auth/login', { email, password });
      // Handle successful login (e.g., save token, redirect to dashboard)
      router.push('/dashboard');
    } catch (error) {
      setError('Invalid email or password');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow">
        <h2 className="text-2xl font-bold text-center">Login to Your Account</h2>
        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              className="mt-1 p-2 w-full border rounded-md"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              className="mt-1 p-2 w-full border rounded-md"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <button
            type="submit"
            className="w-full py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            Sign In
          </button>
        </form>
        <button
          onClick={() => signIn('github')}
          className="w-full py-2 bg-gray-800 text-white rounded-md hover:bg-gray-900 mt-4"
        >
          Sign In with GitHub
        </button>
        <p className="text-sm text-center">
        Don't have an account?{' '}
        <a href="/signup" className="text-blue-500 hover:underline">
          Sign Up
        </a>
      </p>

      </div>
      

    </div>
  );
};

export default LoginPage;
