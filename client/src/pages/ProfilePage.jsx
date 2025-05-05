import { useState, useEffect } from 'react';
import axiosInstance from '../api/axiosInstance';
import { useAuth } from '../hooks/useAuth';
import './ProfilePage.css';

const ProfilePage = () => {
  const { logout } = useAuth();
  const [preferences, setPreferences] = useState([]);
  const [allTags, setAllTags] = useState([]);
  const [selectedTagId, setSelectedTagId] = useState('');
  const [userTags, setUserTags] = useState([]);
  const [newTagName, setNewTagName] = useState('');

  useEffect(() => {
    fetchPreferences();
    fetchAllTags();
    fetchUserTags();
  }, []);

  const fetchPreferences = async () => {
    const response = await axiosInstance.get('/user/preferences');
    setPreferences(response.data);
  };

  const fetchAllTags = async () => {
    const response = await axiosInstance.get('/tags');
    setAllTags(response.data);
  };

  const fetchUserTags = async () => {
    const response = await axiosInstance.get('/user/tags');
    setUserTags(response.data);
  };

  const handleAddUserTag = async () => {
    if (!newTagName.trim()) return;
    await axiosInstance.post('/user/tags', { name: newTagName });
    setNewTagName('');
    fetchUserTags();
  };

  const handleDeleteUserTag = async (tagId) => {
    await axiosInstance.delete(`/user/tags/${tagId}`);
    fetchUserTags();
  };

  const handleDeletePreference = async (tagId) => {
    await axiosInstance.delete(`/user/preferences/${tagId}`);
    fetchPreferences();
  };

  const handleAddPreference = async () => {
    if (!selectedTagId) return;
    await axiosInstance.post('/user/preferences/create', { tagId: selectedTagId });
    setSelectedTagId('');
    fetchPreferences();
  };

  return (
    <div className="profile-page">
      <div className="container">
        <h2>Мої вподобання</h2>
        {preferences.length === 0 ? (
          <p>Ви ще не обрали жодного тегу.</p>
        ) : (
          preferences.map(pref => (
            <div key={pref.id} className="preference-item">
              {pref.name}
              <button className="delete-button" onClick={() => handleDeletePreference(pref.id)}>
                Видалити
              </button>
            </div>
          ))
        )}
      </div>

      <div className="container">
        <h2>Додати вподобання</h2>
        <select
          className="select-tag"
          value={selectedTagId}
          onChange={(e) => setSelectedTagId(e.target.value)}
        >
          <option value="">Оберіть тег</option>
          {allTags
            .filter(tag => !preferences.some(pref => pref.id === tag.id))
            .map(tag => (
              <option key={tag.id} value={tag.id}>
                {tag.name}
              </option>
            ))}
        </select>

        <button className="add-button" onClick={handleAddPreference}>
          Додати тег до вподобань
        </button>
      </div>

      <div className="container">
        <h2>Користувацькі теги</h2>
        
        <div className="user-tags-list">
          {userTags.length === 0 ? (
            <p>У вас ще немає власних тегів.</p>
          ) : (
            userTags.map(tag => (
              <div key={tag.id} className="preference-item">
                {tag.name}
                <button className="delete-button" onClick={() => handleDeleteUserTag(tag.id)}>
                  Видалити
                </button>
              </div>
            ))
          )}
        </div>

        <div className="add-user-tag">
          <input
            type="text"
            placeholder="Новий тег"
            value={newTagName}
            onChange={(e) => setNewTagName(e.target.value)}
            className="input-tag"
          />
          <button onClick={handleAddUserTag} className="add-button">
            Створити тег
          </button>
        </div>
      </div>

      <div className="logout-container">
        <button className="logout-button" onClick={logout}>
          Вийти
        </button>
      </div>
    </div>
  );
};

export default ProfilePage;
