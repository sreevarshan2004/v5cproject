import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation, Navigate, useNavigate } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import axios from 'axios'; 

// Component Imports
import Home from './Home';
import PropertyDetail from './utils/PropertyDetail'; 
import AddPropertyPage from './pages/AddPropertyPage';
import LoginPage from './pages/LoginPage';

// Data imports (Static Data)
import { 
  initialPropertiesData, 
  servicesData as staticServices, 
  partnersData as staticPartners, 
  whyDubaiData as staticWhyDubai, 
  emiratesData as staticEmirates 
} from './data/constants';

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

function App() {
  const navigate = useNavigate();
  const API_BASE = "http://localhost:5000/api";

  // --- STATE MANAGEMENT ---
  const [propertiesData, setPropertiesData] = useState([]);
  const [services, setServices] = useState([]);
  const [partners, setPartners] = useState([]);
  const [whyDubaiCards, setWhyDubaiCards] = useState([]);
  const [emirates, setEmirates] = useState([]);

  // --- AUTH STATE ---
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('v5c_user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  // --- 1. FETCH DATA FROM BACKEND & MERGE WITH STATIC ---
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch all data from Database
        const [propsRes, servRes, partRes, whyRes, emirRes] = await Promise.all([
          axios.get(`${API_BASE}/properties`).catch(() => ({ data: [] })),
          axios.get(`${API_BASE}/services`).catch(() => ({ data: [] })),
          axios.get(`${API_BASE}/partners`).catch(() => ({ data: [] })),
          axios.get(`${API_BASE}/whydubai`).catch(() => ({ data: [] })),
          axios.get(`${API_BASE}/emirates`).catch(() => ({ data: [] })),
        ]);

        // ✅ FIX: MERGE Static Data + Database Data
        // If we just replaced it, the old hardcoded cards would disappear.
        
        setPropertiesData([...initialPropertiesData, ...propsRes.data]);
        setServices([...staticServices, ...servRes.data]);
        setPartners([...staticPartners, ...partRes.data]);
        setWhyDubaiCards([...staticWhyDubai, ...whyRes.data]);
        setEmirates([...staticEmirates, ...emirRes.data]);

      } catch (error) {
        console.error("Backend Error. Using static data only.", error);
        // Fallback to just static data if backend fails
        setPropertiesData(initialPropertiesData);
        setServices(staticServices);
        setPartners(staticPartners);
        setWhyDubaiCards(staticWhyDubai);
        setEmirates(staticEmirates);
      }
    };

    fetchData();
  }, []);

  const handleLogin = (userData) => {
    setUser(userData);
    localStorage.setItem('v5c_user', JSON.stringify(userData));
    navigate('/');
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('v5c_user');
    navigate('/');
  };

  // --- ADD HANDLERS (Update Local State Immediately) ---
  const handleAdd = (newItem, section) => {
    switch (section) {
      case 'property': setPropertiesData(prev => [newItem, ...prev]); break;
      case 'services': setServices(prev => [...prev, newItem]); break; // Appends to end
      case 'partners': setPartners(prev => [...prev, newItem]); break;
      case 'whydubai': setWhyDubaiCards(prev => [...prev, newItem]); break;
      case 'emirates': setEmirates(prev => [...prev, newItem]); break;
      default: break;
    }
  };

  // Protected Route Wrapper
  const ProtectedRoute = ({ children }) => {
    if (!user || user.role !== 'admin') {
      return <Navigate to="/login" replace />;
    }
    return children;
  };

  return (
    <>
      <ScrollToTop />
      <AnimatePresence mode="wait">
        <Routes>
          {/* HOME PAGE */}
          <Route 
            path="/" 
            element={
              <Home 
                propertiesData={propertiesData} 
                user={user} 
                onLogout={handleLogout}
                whyDubaiCards={whyDubaiCards}
                services={services}
                partners={partners}
                emirates={emirates}
              />
            } 
          />
          
          <Route 
            path="/v5cproject" 
            element={
              <Home 
                propertiesData={propertiesData} 
                user={user} 
                onLogout={handleLogout}
                whyDubaiCards={whyDubaiCards}
                services={services}
                partners={partners}
                emirates={emirates}
              />
            } 
          />

          {/* PROPERTY DETAIL PAGE */}
          <Route 
            path="/property/:id" 
            element={<PropertyDetail propertiesData={propertiesData} />} 
          />

          {/* LOGIN PAGE */}
          <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />

          {/* ADMIN ROUTES */}
          <Route path="/admin/add-property" element={<ProtectedRoute><AddPropertyPage section="property" onSubmit={(item) => handleAdd(item, 'property')} /></ProtectedRoute>} />
          <Route path="/admin/add-service" element={<ProtectedRoute><AddPropertyPage section="services" onSubmit={(item) => handleAdd(item, 'services')} /></ProtectedRoute>} />
          <Route path="/admin/add-partner" element={<ProtectedRoute><AddPropertyPage section="partners" onSubmit={(item) => handleAdd(item, 'partners')} /></ProtectedRoute>} />
          <Route path="/admin/add-whydubai" element={<ProtectedRoute><AddPropertyPage section="whydubai" onSubmit={(item) => handleAdd(item, 'whydubai')} /></ProtectedRoute>} />
          <Route path="/admin/add-emirate" element={<ProtectedRoute><AddPropertyPage section="emirates" onSubmit={(item) => handleAdd(item, 'emirates')} /></ProtectedRoute>} />
        </Routes>
      </AnimatePresence>
    </>
  );
}

export default App;