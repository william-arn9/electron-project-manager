import React, { useEffect } from 'react';
import { Route, Routes, useNavigate, HashRouter } from 'react-router-dom';
import HomePage from './pages/HomePage';
import Header from './components/Header';
import NewProjectPage from './pages/NewProjectPage';

const RedirectToHome = () => {
  const navigate = useNavigate();
  useEffect(() => {
    navigate('#/');
  }, [navigate]);
  return null;
};

const AppRoutes: React.FC = () => {
  return (
    <HashRouter>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/new-project" element={<NewProjectPage />} />
        <Route path="*" element={<RedirectToHome />} />
      </Routes>
    </HashRouter>
  );
};

export default AppRoutes;
