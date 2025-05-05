import { useState } from 'react';
import axiosInstance from '../api/axiosInstance';
import { useAuth } from '../hooks/useAuth';
import { Link } from 'react-router-dom';
import './LoginPage.css'; // Підключаємо окремий css

const LoginPage = () => {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axiosInstance.post('/auth/login', { email, password });
      const { token } = response.data;

      login(token);
    } catch (err) {
      console.error(err);
      setError('Невірна електронна пошта або пароль');
    }
  };

  return (
    <div className="login-page">
      <header className="login-header">
        <Link to="/" className="back-link">На головну</Link>
      </header>

      <div className="login-container">
        <h1>Вхід</h1>

        <form onSubmit={handleSubmit} className="login-form">
          <input
            type="email"
            placeholder="Електронна пошта"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Пароль"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit" className="login-button">
            Увійти
          </button>

          {error && <p className="error-message">{error}</p>}
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
