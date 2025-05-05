import { useState, useEffect } from 'react';
import axiosInstance from '../api/axiosInstance';
import styles from './SavedServiceCard.module.css';

const SavedServiceCard = ({ service, onServiceDeleted }) => {
  const [message, setMessage] = useState('');
  const [userTags, setUserTags] = useState([]);
  const [selectedTagId, setSelectedTagId] = useState(service.userTagId || '');
  const [currentTagName, setCurrentTagName] = useState('');

  useEffect(() => {
    const fetchUserTags = async () => {
      try {
        const response = await axiosInstance.get('/user/tags');
        setUserTags(response.data);
  
        const tag = response.data.find(tag => tag.id === service.userTagId);
        if (tag) {
          setCurrentTagName(tag.name);
        }
      } catch (error) {
        console.error('Помилка при завантаженні тегів користувача:', error);
      }
    };
  
    fetchUserTags();
  }, [service.userTagId]);
  

  const handleDelete = async () => {
    try {
      await axiosInstance.delete(`/user/saved/${service.id}`);
      showMessage('Сервіс видалено!');
      if (onServiceDeleted) {
        onServiceDeleted(service.id);
      }
    } catch (error) {
      console.error('Помилка при видаленні сервісу:', error);
    }
  };

  const handleTagSave = async () => {
    try {
      await axiosInstance.post('/user/tags/attach', {
        serviceId: service.id,
        tagId: selectedTagId
      });
      showMessage('Тег збережено!');
      const selectedTag = userTags.find(tag => tag.id === Number(selectedTagId));
      if (selectedTag) {
        setCurrentTagName(selectedTag.name);
      }
    } catch (error) {
      console.error('Помилка при збереженні тегу:', error);
    }
  };

  const handleDetachTag = async () => {
    try {
      await axiosInstance.post('/user/tags/detach', {
        serviceId: service.id
      });
      setSelectedTagId('');
      setCurrentTagName('');
      showMessage('Тег відвʼязано!');
    } catch (error) {
      console.error('Помилка при відвʼязанні тегу:', error);
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
    <div className={styles['saved-service-card']}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h3 style={{ margin: 0 }}>{service.name}</h3>
        {service.is_verified && <div style={verifiedBadgeStyle}>⭐ Перевірено</div>}
      </div>

      {currentTagName && (
        <span className={styles['tag-badge']}>
          {currentTagName}
        </span>
      )}

      <p>{service.description}</p>
      <a href={service.url} target="_blank" rel="noopener noreferrer">
        Перейти на сайт
      </a>

      <select
        className={styles['select-tag']}
        value={selectedTagId}
        onChange={(e) => setSelectedTagId(e.target.value)}
      >
        <option value=""></option>
        {userTags.map(tag => (
          <option key={tag.id} value={tag.id}>
            {tag.name}
          </option>
        ))}
      </select>

      <button onClick={handleTagSave} className={`${styles.button} ${styles['save-button']}`}>
        Зберегти тег
      </button>

      <button onClick={handleDetachTag} className={`${styles.button} ${styles['detach-button']}`}>
        Відвʼязати тег
      </button>

      <button onClick={handleDelete} className={`${styles.button} ${styles['delete-button']}`}>
        Видалити сервіс
      </button>

      {message && <p className={styles.message}>{message}</p>}
    </div>
  );
};

export default SavedServiceCard;
