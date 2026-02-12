// src/App.jsx
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './app/pages/Login.jsx';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}