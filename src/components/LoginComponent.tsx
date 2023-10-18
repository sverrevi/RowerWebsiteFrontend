
import React, { useState } from 'react';
import { login } from './AuthService';
import { useNavigate } from 'react-router-dom';

const LoginComponent: React.FC = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleLogin = async () => {
    const trimmedUsername = username.trim();
    const trimmedPassword = password.trim();

    if (!trimmedUsername || !trimmedPassword) {
      alert('Please enter both username and password.');
      return;
    }

    const success = await login(trimmedUsername, trimmedPassword);

    if (success) {
      // Show a congratulatory message
      alert('Congratulations! Login successful.');
      console.log('Redirecting to home page...');
      
      // Redirect to the home page
      navigate('/');

      // Redirect to a protected page or do something else
    } else {
      // Handle login failure
      alert('Login failed. Please check your credentials.');
    }
  };

  return (
    <div>
      <form>
        <label>
          Username:
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter your username"
          />
        </label>
        <br />
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
          />
        </label>
        <br />
        <button type="button" onClick={handleLogin}>
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginComponent;
