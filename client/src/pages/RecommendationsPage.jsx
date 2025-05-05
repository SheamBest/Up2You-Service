import { useState, useEffect } from 'react';
import axiosInstance from '../api/axiosInstance';
import ServiceCard from '../components/ServiceCard';

const RecommendationsPage = () => {
  const [recommendedServices, setRecommendedServices] = useState([]);
  const [userPreferences, setUserPreferences] = useState([]);
  const [allTags, setAllTags] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchRecommendedServices();
    fetchUserPreferences();
    fetchAllTags();
  }, []);

  const fetchRecommendedServices = async () => {
    try {
      const response = await axiosInstance.get('/services/recommendations');
      setRecommendedServices(response.data);
    } catch (error) {
      console.error('Помилка при завантаженні рекомендацій:', error);
    }
  };

  const fetchUserPreferences = async () => {
    try {
      const response = await axiosInstance.get('/preferences');
      setUserPreferences(response.data);
    } catch (error) {
      console.error('Помилка при завантаженні вподобань:', error);
    }
  };

  const fetchAllTags = async () => {
    try {
      const response = await axiosInstance.get('/tags');
      setAllTags(response.data);
    } catch (error) {
      console.error('Помилка при завантаженні тегів:', error);
    }
  };

  const openModal = () => {
    setSelectedTags(userPreferences.map(tag => tag.id)); // Вибираємо поточні теги
    setShowModal(true);
  };

  const toggleTag = (tagId) => {
    setSelectedTags(prevSelected =>
      prevSelected.includes(tagId)
        ? prevSelected.filter(id => id !== tagId)
        : [...prevSelected, tagId]
    );
  };

  const savePreferences = async () => {
    try {
      // Спочатку можна видалити всі старі вподобання (якщо потрібно),
      // але зараз просто додаємо нові теги
      for (const tagId of selectedTags) {
        await axiosInstance.post('/preferences/create', { tagId });
      }
      setShowModal(false);
      fetchUserPreferences(); // Оновити дані
    } catch (error) {
      console.error('Помилка при збереженні вподобань:', error);
    }
  };

  return (
    <div>
      <h2>Рекомендовані сервіси для вас</h2>

      {userPreferences.length === 0 ? (
        <button onClick={openModal} style={{ marginBottom: '20px' }}>
          Створити рекомендації
        </button>
      ) : (
        <button onClick={openModal} style={{ marginBottom: '20px' }}>
          Змінити рекомендації
        </button>
      )}

      {recommendedServices.length === 0 ? (
        <p>Наразі немає рекомендацій</p>
      ) : (
        recommendedServices.map(service => (
          <ServiceCard key={service.id} service={service} />
        ))
      )}

      {showModal && (
        <div style={modalStyles.overlay}>
          <div style={modalStyles.modal}>
            <h3>Оберіть ваші вподобання</h3>
            <div style={{ maxHeight: '300px', overflowY: 'auto' }}>
              {allTags.map(tag => (
                <div key={tag.id}>
                  <label>
                    <input
                      type="checkbox"
                      checked={selectedTags.includes(tag.id)}
                      onChange={() => toggleTag(tag.id)}
                    />
                    {tag.name}
                  </label>
                </div>
              ))}
            </div>
            <button onClick={savePreferences} style={{ marginTop: '20px' }}>
              Зберегти вподобання
            </button>
            <button onClick={() => setShowModal(false)} style={{ marginTop: '10px' }}>
              Скасувати
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

const modalStyles = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  modal: {
    background: 'white',
    padding: '30px',
    borderRadius: '8px',
    width: '400px',
    maxHeight: '80%',
    overflowY: 'auto'
  }
};

export default RecommendationsPage;
