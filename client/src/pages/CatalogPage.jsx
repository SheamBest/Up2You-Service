import { useEffect, useState } from 'react';
import axiosInstance from '../api/axiosInstance';
import ServiceCard from '../components/ServiceCard';
import './CatalogPage.css';

const CatalogPage = () => {
  const [services, setServices] = useState([]);
  const [tags, setTags] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);

  const [showModal, setShowModal] = useState(false);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [url, setUrl] = useState('');
  const [selectedTagId, setSelectedTagId] = useState('');
  const [addedTagIds, setAddedTagIds] = useState([]);

  useEffect(() => {
    fetchTags();
    fetchServices();
  }, []);

  const fetchTags = async () => {
    const response = await axiosInstance.get('/tags');
    setTags(response.data);
  };

  const fetchServices = async (tagIds = []) => {
    if (tagIds.length > 0) {
      const response = await axiosInstance.post('/services/search-by-tags', { tagIds });
      setServices(response.data);
    } else {
      const response = await axiosInstance.get('/services');
      setServices(response.data);
    }
  };

  const toggleTag = (tagId) => {
    const updatedTags = selectedTags.includes(tagId)
      ? selectedTags.filter(id => id !== tagId)
      : [...selectedTags, tagId];

    setSelectedTags(updatedTags);
    fetchServices(updatedTags);
  };

  const openModal = () => {
    setName('');
    setDescription('');
    setUrl('');
    setSelectedTagId('');
    setAddedTagIds([]);
    setShowModal(true);
  };

  const handleAddTag = () => {
    if (selectedTagId && !addedTagIds.includes(parseInt(selectedTagId))) {
      setAddedTagIds([...addedTagIds, parseInt(selectedTagId)]);
      setSelectedTagId('');
    }
  };

  const handleAddService = async () => {
    try {
      await axiosInstance.post('/services', {
        name,
        description,
        url,
        tagIds: addedTagIds
      });
      alert('Сервіс додано!');
      setShowModal(false);
      fetchServices(selectedTags);
    } catch (error) {
      console.error('Помилка при додаванні сервісу:', error);
      alert('Помилка при додаванні сервісу');
    }
  };

  return (
    <div className="catalog-page">
      <h1>Каталог сервісів</h1>

      <button className="add-service-button" onClick={openModal}>
        Додати сервіс
      </button>

      <div className="catalog-container">
        <div className="services-list">
          {services.length === 0 ? (
            <p>Немає сервісів для обраних тегів.</p>
          ) : (
            services.map(service => (
              <ServiceCard key={service.id} service={service} />
            ))
          )}
        </div>

        <div className="tags-list">
          <h2>Фільтрація за тегами</h2>
          {tags.map(tag => (
            <button
              key={tag.id}
              className={`tag-button ${selectedTags.includes(tag.id) ? 'selected' : ''}`}
              onClick={() => toggleTag(tag.id)}
            >
              {tag.name}
            </button>
          ))}
        </div>
      </div>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Додати новий сервіс</h3>
            <input
              type="text"
              placeholder="Назва"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="modal-input"
            />
            <input
              type="text"
              placeholder="Опис"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="modal-input"
            />
            <input
              type="text"
              placeholder="URL"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="modal-input"
            />

            <select
              value={selectedTagId}
              onChange={(e) => setSelectedTagId(e.target.value)}
              className="modal-select"
            >
              <option value="">Оберіть тег</option>
              {tags.map(tag => (
                <option key={tag.id} value={tag.id}>
                  {tag.name}
                </option>
              ))}
            </select>
            <button className="add-tag-button" onClick={handleAddTag}>
              Додати тег
            </button>

            <div className="added-tags-list">
              {addedTagIds.map(tagId => {
                const tag = tags.find(t => t.id === tagId);
                return (
                  <span key={tagId} className="added-tag">
                    {tag?.name}
                  </span>
                );
              })}
            </div>

            <div className="modal-actions">
              <button className="save-button" onClick={handleAddService}>
                Зберегти
              </button>
              <button className="close-button" onClick={() => setShowModal(false)}>
                Закрити
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CatalogPage;
