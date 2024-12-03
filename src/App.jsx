import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LoginPage from './pages/Login.page';
import Dashboard from './pages/Dashboard.page';
import ProtectedRoute from './shared/AuthProtetion';
import ProfessionalList from './pages/ProfessionalList.page';
import AppointmentsList from './pages/AppointmentsList';
import SettingsPage from './pages/Settings.page';

const App = () => {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/home"  element={<ProtectedRoute><Dashboard /></ProtectedRoute>}>
        <Route path='professional' element={<ProfessionalList />}/>
        <Route path='appointments' element={<AppointmentsList />}/>
        <Route path="settings" element={<SettingsPage />} />
      </Route>
      <Route path="/" element={<LoginPage />} />
    </Routes>
  );
};

export default App;
