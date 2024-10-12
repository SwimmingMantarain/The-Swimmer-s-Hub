import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Signup() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/register', { username, password });
      setMessage('Sign up successful! You can now log in.');
      setTimeout(() => navigate('/'), 2000); // Redirect to login page after 2 seconds
    } catch (error) {
      setMessage('Sign up failed.');
      console.error(error);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <form className="bg-white p-6 rounded shadow-md" onSubmit={handleSignup}>
        <h2 className="text-2xl mb-4">Sign Up</h2>
        <input
          type="text"
          className="w-full p-2 mb-4 border rounded"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          className="w-full p-2 mb-4 border rounded"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          type="submit"
          className="w-full p-2 bg-green-500 text-white rounded hover:bg-green-600"
        >
          Sign Up
        </button>
        {message && <p className="mt-2 text-green-500">{message}</p>}
      </form>
    </div>
  );
}

export default Signup;
