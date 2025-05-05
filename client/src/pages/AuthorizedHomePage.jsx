import { useState, useEffect } from 'react';
import axiosInstance from '../api/axiosInstance';
import SavedServiceCard from '../components/SavedServiceCard';
import ServiceCard from '../components/ServiceCard';
import './AuthorizedHomePage.css';

const AuthorizedHomePage = () => {
  const [recommendedServices, setRecommendedServices] = useState([]);
  const [savedServices, setSavedServices] = useState([]);

  useEffect(() => {
    fetchRecommended();
    fetchSaved();
  }, []);

  const fetchRecommended = async () => {
    try {
      const response = await axiosInstance.get('/services/recommended');
      setRecommendedServices(response.data);
    } catch (error) {
      console.error('Помилка при завантаженні рекомендацій:', error);
    }
  };

  const fetchSaved = async () => {
    try {
      const response = await axiosInstance.get('/user/saved');
      setSavedServices(response.data);
    } catch (error) {
      console.error('Помилка при завантаженні збережених сервісів:', error);
    }
  };

  return (
    <div className="authorized-home">
      <div className="content-container">
        <div className="column">
          <h2>Рекомендації</h2>
          {recommendedServices.length === 0 ? (
            <p>Немає рекомендацій. Додайте вподобання у профілі.</p>
          ) : (
            recommendedServices.map(service => (
              <ServiceCard key={service.id} service={service} />
            ))
          )}
        </div>

        <div className="column">
          <h2>Збережені сервіси</h2>
          {savedServices.length === 0 ? (
            <p>Немає збережених сервісів.</p>
          ) : (
            savedServices.map(service => (
              <SavedServiceCard key={service.id} service={service} onServiceDeleted={fetchSaved} />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthorizedHomePage;
