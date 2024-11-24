import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from '@mui/material';
import AnimatedLayout from './components/Layout/AnimatedLayout';
import Dashboard from './pages/Dashboard';
import Products from './pages/Products';
import Categories from './pages/Categories';
import Orders from './pages/Orders';
import Sync from './pages/Sync';
import PlatformSettings from './pages/PlatformSettings';
import butcherTheme from './theme/butcherTheme';

const App: React.FC = () => {
  return (
    <ThemeProvider theme={butcherTheme}>
      <Router>
        <AnimatedLayout>
          <Routes>
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/products" element={<Products />} />
            <Route path="/categories" element={<Categories />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/sync" element={<Sync />} />
            <Route path="/platform-settings/:platformId" element={<PlatformSettings />} />
          </Routes>
        </AnimatedLayout>
      </Router>
    </ThemeProvider>
  );
};

export default App;
