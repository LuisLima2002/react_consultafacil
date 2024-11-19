import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LoginPage from './pages/Login.page';
import HomePage from './pages/Home.page';
import ProtectedRoute from './shared/AuthProtetion';

const App = () => {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/home"  element={<ProtectedRoute><HomePage /></ProtectedRoute>}/>
      <Route path="/" element={<LoginPage />} />
    </Routes>
  );
};

export default App;
