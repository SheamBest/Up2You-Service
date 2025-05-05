import { useState, useEffect } from 'react';
import axiosInstance from '../api/axiosInstance';

const TagsPage = () => {
  const [tags, setTags] = useState([]);
  const [newTagName, setNewTagName] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    fetchTags();
  }, []);

  const fetchTags = async () => {
    try {
      const response = await axiosInstance.get('/user/tags');
      setTags(response.data);
    } catch (error) {
      console.error('Помилка при завантаженні тегів:', error);
    }
  };

  const handleAddTag = async (e) => {
    e.preventDefault();

    if (!newTagName.trim()) {
      setError('Назва тегу не може бути порожньою');
      return;
    }

    try {
      await axiosInstance.post('/user/tags', { name: newTagName });
      setNewTagName('');
      setError('');
      fetchTags();
    } catch (error) {
      console.error('Помилка при створенні тегу:', error);
      setError('Не вдалося створити тег');
    }
  };

  const handleDeleteTag = async (tagId) => {
    try {
      await axiosInstance.delete(`/user/tags/${tagId}`);
      setTags(prev => prev.filter(tag => tag.id !== tagId));
    } catch (error) {
      console.error('Помилка при видаленні тегу:', error);
    }
  };

  return (
    <div>
      <h2>Мої теги</h2>

      <form onSubmit={handleAddTag}>
        <input
          type="text"
          placeholder="Назва нового тегу"
          value={newTagName}
          onChange={(e) => setNewTagName(e.target.value)}
        />
        <button type="submit">Додати тег</button>
      </form>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      <div style={{ marginTop: '20px' }}>
        {tags.length === 0 ? (
          <p>У вас ще немає тегів</p>
        ) : (
          tags.map(tag => (
            <div key={tag.id} style={{ marginBottom: '10px' }}>
              {tag.name}
              <button
                onClick={() => handleDeleteTag(tag.id)}
                style={{ marginLeft: '10px', backgroundColor: 'red', color: 'white' }}
              >
                Видалити
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default TagsPage;
