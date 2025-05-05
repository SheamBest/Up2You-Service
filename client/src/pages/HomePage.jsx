import { Link, Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import './HomePage.css';

const HomePage = () => {
  const { user } = useAuth();

  if (user) {
    return <Navigate to="/home" />;
  }

  return (
    <div className="home-page">
      <header className="home-header">
        <Link to="/login">
          <button className="login-button">Увійти</button>
        </Link>
      </header>

      <div className="home-content">
        <h1>Ласкаво просимо до <span className="brand-name">Up2You-Service</span>!</h1>

        <p className="description">
          Платформа допомагає вам швидко знаходити, зберігати та впорядковувати інтернет-сервіси за вашими інтересами.
          Використовуйте особисті теги, щоб ще краще організувати свої обрані сервіси!
        </p>

        <ul className="advantages">
          <li>Швидкий пошук сервісів за тегами</li>
          <li>Збереження улюблених сервісів</li>
          <li>Створення власних тегів для впорядкування</li>
          <li>Простий та зручний інтерфейс</li>
        </ul>

        <Link to="/register">
          <button className="register-button">Зареєструватися</button>
        </Link>
      </div>
    </div>
  );
};

export default HomePage;
