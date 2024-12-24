
import { useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';

export default function Home() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleSignIn = async () => {
    try {
      const response = await axios.post('http://localhost:8080/signin', { email, password });
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        router.push('/workspace');
      }
    } catch (error) {
      alert('Sign-in failed');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-96">
        <h2 className="text-xl font-bold mb-4">Sign In</h2>
        <input
          type="email"
          className="w-full border p-2 mb-4"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          className="w-full border p-2 mb-4"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          onClick={handleSignIn}
          className="bg-blue-500 text-white px-4 py-2 rounded w-full"
        >
          Sign In
        </button>
      </div>
    </div>
  );
}
