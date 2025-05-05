import axiosInstance from '../api/axiosInstance';
import { useState } from 'react';
import styles from './ServiceCard.module.css';

const ServiceCard = ({ service }) => {
  const [message, setMessage] = useState('');

  const handleSave = async () => {
    try {
      await axiosInstance.post('/user/saved', { serviceId: service.id });
      showMessage('Сервіс збережено!');
    } catch (error) {
      console.error('Помилка при збереженні сервісу:', error);
    }
  };

  const showMessage = (text) => {
    setMessage(text);
    setTimeout(() => {
      setMessage('');
    }, 2000);
  };

  const verifiedBadgeStyle = {
    backgroundColor: '#28a745',
    color: 'white',
    padding: '4px 10px',
    borderRadius: '20px',
    fontSize: '12px',
    display: 'inline-block',
    fontWeight: 'bold',
  };

  return (
    <div className={styles['service-card']}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h3 style={{ margin: 0 }}>{service.name}</h3>
        {service.is_verified && <div style={verifiedBadgeStyle}>⭐ Перевірено</div>}
      </div>

      {service.tags && service.tags.length > 0 && (
        <div className={styles['tags-container']}>
          {service.tags.map(tag => (
            <span key={tag.id} className={styles['tag-badge']}>
              {tag.name}
            </span>
          ))}
        </div>
      )}

      <p>{service.description}</p>

      <a href={service.url} target="_blank" rel="noopener noreferrer">
        Перейти на сайт
      </a>

      <button className={styles['save-button']} onClick={handleSave}>
        Зберегти
      </button>

      {message && <p className={styles['message']}>{message}</p>}
    </div>
  );
};

export default ServiceCard;
