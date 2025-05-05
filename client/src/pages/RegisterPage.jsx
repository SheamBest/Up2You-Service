import { useState } from 'react';
import { Link } from 'react-router-dom';
import axiosInstance from '../api/axiosInstance';
import './RegisterPage.css';

const RegisterPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setMessage('Паролі не збігаються!');
      return;
    }

    try {
      await axiosInstance.post('/auth/register', { name, email, password });
      window.location.href = '/login';
    } catch (error) {
      console.error('Помилка реєстрації:', error);
      setMessage('Помилка реєстрації');
    }
  };

  return (
    <div className="register-page">
      <header className="register-header">
        <Link to="/" className="back-link">На головну</Link>
      </header>

      <div className="register-container">
        <h1>Реєстрація</h1>

        <form onSubmit={handleRegister} className="register-form">
          <input
            type="text"
            placeholder="Імʼя"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
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
          <input
            type="password"
            placeholder="Повторити пароль"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />

          <button type="submit" className="register-button">
            Зареєструватися
          </button>

          {message && <p className="message">{message}</p>}
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
