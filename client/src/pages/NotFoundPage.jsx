import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h2>404 - Сторінку не знайдено</h2>
      <p>На жаль, такої сторінки не існує.</p>
      <Link to="/">
        <button style={{
          marginTop: '20px',
          padding: '10px 20px',
          border: 'none',
          backgroundColor: '#007bff',
          color: 'white',
          cursor: 'pointer'
        }}>
          Повернутися на головну
        </button>
      </Link>
    </div>
  );
};

export default NotFoundPage;
