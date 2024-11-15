import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import Landing from './pages/Landing';
import Home from './pages/Home';
import Calculator from './pages/Calculator';
import NewsAnalytics from './pages/NewsAnalytics';
import { AuthProvider } from './context/AuthContext';

function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/dashboard" element={<Home />} />
            <Route path="/calculator" element={<Calculator />} />
            <Route path="/news" element={<NewsAnalytics />} />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;
