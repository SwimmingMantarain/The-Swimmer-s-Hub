import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/login', { username, password });
      console.log(response.data);
      if (response.data.message === 'Login successful!') {
        navigate('/main'); // Redirect to Main page on successful login
      }
    } catch (error) {
      setError('Invalid credentials');
      console.error(error);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <form className="bg-white p-6 rounded shadow-md" onSubmit={handleLogin}>
        <h2 className="text-2xl mb-4">Login</h2>
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
          className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Login
        </button>
        {error && <p className="text-red-500 mt-2">{error}</p>}
        <p className="mt-4">
          Don't have an account? <a href="/signup" className="text-blue-500">Sign Up</a>
        </p>
      </form>
    </div>
  );
}

export default Login;
