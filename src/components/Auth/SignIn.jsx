import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/auth/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      if (response.ok) {
        login(data);
        navigate('/dashboard');
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError('Failed to sign in');
    }
  };

  return (
    <div className="min-h-screen relative">
      <video 
        autoPlay 
        muted 
        loop 
        className="absolute top-0 left-0 min-w-full min-h-full object-cover z-0"
      >
        <source src="https://ik.imagekit.io/i3divn77k/Blockchain/video%20(1080p).mp4?updatedAt=1709418358040" type="video/mp4" />
      </video>

      <div className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-10">
        <div className="flex items-center justify-center min-h-screen p-6">
          <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-xl max-w-md w-full">
            <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Sign In</h2>
            {error && <p className="text-red-500 mb-4">{error}</p>}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-gray-700 dark:text-gray-300 mb-2">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-2 rounded border dark:bg-gray-700 dark:border-gray-600"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 dark:text-gray-300 mb-2">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-2 rounded border dark:bg-gray-700 dark:border-gray-600"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition-colors"
              >
                Sign In
              </button>
              <p className="text-center text-gray-600 dark:text-gray-400">
                Don't have an account?{' '}
                <Link to="/signup" className="text-blue-500 hover:text-blue-600">
                  Sign Up
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignIn;