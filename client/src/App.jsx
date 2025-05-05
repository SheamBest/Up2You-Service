import { Routes, Route, Navigate } from 'react-router-dom';

import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import CatalogPage from './pages/CatalogPage';
import SavedPage from './pages/SavedPage';
import TagsPage from './pages/TagsPage';
import ProfilePage from './pages/ProfilePage';
import NotFoundPage from './pages/NotFoundPage';
import HomePage from './pages/HomePage';
import AuthorizedHomePage from './pages/AuthorizedHomePage';

import PrivateRoute from './components/PrivateRoute';
import Navbar from './components/Navbar';
function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        <Route path="/home" element={
          <PrivateRoute>
            <AuthorizedHomePage />
          </PrivateRoute>
        } />
        <Route path="/catalog" element={
          <PrivateRoute>
            <CatalogPage />
          </PrivateRoute>
        } />
        <Route path="/saved" element={
          <PrivateRoute>
            <SavedPage />
          </PrivateRoute>
        } />
        <Route path="/tags" element={
          <PrivateRoute>
            <TagsPage />
          </PrivateRoute>
        } />
        <Route path="/profile" element={
          <PrivateRoute>
            <ProfilePage />
          </PrivateRoute>
        } />


        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
}

export default App;
