import React, { useState } from 'react';
import { login } from './AuthService';
import { useNavigate } from 'react-router-dom';

interface LoginComponentProps {
  onLogin: (response: any) => void;
}

const LoginComponent: React.FC<LoginComponentProps> = ({ onLogin }) => {
  const navigate = useNavigate();
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleLogin = async () => {
    const trimmedUsername = username.trimEnd();
    const trimmedPassword = password.trim();

    if (!trimmedUsername || !trimmedPassword || password !== trimmedPassword) {
      alert('Please enter both username and password without spaces at the end.');
      return;
    }

    try {
      const response = await login(trimmedUsername, trimmedPassword);

      if (response.success) {
        alert('Congratulations! Login successful.');
        console.log('Redirecting to the home page...');
        onLogin(response);
        navigate('/');
      } else {
        alert('Login failed. Please check your credentials.');
      }
    } catch (error) {
      console.error('An error occurred during login:', error);
      alert('An error occurred during login. Please try again.');
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
