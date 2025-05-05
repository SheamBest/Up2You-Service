import { useState, useEffect } from 'react';
import axiosInstance from '../api/axiosInstance';
import SavedServiceCard from '../components/SavedServiceCard'; // Імпортуємо правильний компонент

const SavedPage = () => {
  const [savedServices, setSavedServices] = useState([]);

  useEffect(() => {
    fetchSavedServices();
  }, []);

  const fetchSavedServices = async () => {
    try {
      const response = await axiosInstance.get('/user/saved');
      setSavedServices(response.data);
    } catch (error) {
      console.error('Помилка при завантаженні збережених сервісів:', error);
    }
  };

  const handleServiceDeleted = (deletedServiceId) => {
    setSavedServices(prevServices => prevServices.filter(service => service.id !== deletedServiceId));
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Ваші збережені сервіси</h2>
      {savedServices.length === 0 ? (
        <p>У вас ще немає збережених сервісів</p>
      ) : (
        savedServices.map(service => (
          <SavedServiceCard
            key={service.id}
            service={service}
            onServiceDeleted={handleServiceDeleted}
          />
        ))
      )}
    </div>
  );
};

export default SavedPage;
