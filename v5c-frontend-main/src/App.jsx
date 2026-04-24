import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import axios from 'axios';

// Component Imports
import Home from './Home';
import AboutPageNew from './pages/AboutPageNew';
import WhyDubaiPage from './pages/WhyDubaiPage';
import EmiratesPage from './pages/EmiratesPage';
import ServicesPage from './pages/ServicesPage';
import PropertiesPage from './pages/PropertiesPage';
import PresencePage from './pages/PresencePage';
import DevelopersPage from './pages/DevelopersPage';
import ProcessPage from './pages/ProcessPage';
import FaqPage from './pages/FaqPage';
import TestimonialsPage from './pages/TestimonialsPage';
import ContactPage from './pages/ContactPage';
import PropertyDetail from './utils/PropertyDetail';
import SobhaCentralPage from './pages/SobhaCentralPage';
import SobhaHartland2Page from './pages/sobha-hartland-2';
import SobhaSiniyaIslandPage from './pages/sobha-siniya-island';


// Data imports
import {
  servicesData as staticServices,
  partnersData as staticPartners,
  whyDubaiData as staticWhyDubai,
  emiratesData as staticEmirates,
  testimonials as staticTestimonials,
  translations
} from './data/constants';

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

import { PROPERTIES_URL } from './data/constanturl';

function App() {
  const [lang, setLang] = useState(() => {
    return localStorage.getItem('v5c_lang') || "EN";
  });

  useEffect(() => {
    localStorage.setItem('v5c_lang', lang);
  }, [lang]);

  const content = translations[lang] || translations.EN;

  // 1. Fix Static Partners (Map 'logo' to 'image')
  const [partners, setPartners] = useState(() => {
    return staticPartners.map(p => ({ ...p, image: p.logo || p.image }));
  });

  // 🔴 CHANGE 1: Start with EMPTY list for Properties (No Static Data)
  const [propertiesData, setPropertiesData] = useState([]);

  // Keep others merged if you want
  const [services, setServices] = useState(staticServices);
  const [whyDubaiCards, setWhyDubaiCards] = useState(staticWhyDubai);
  const [emirates, setEmirates] = useState(staticEmirates);
  const [testimonials, setTestimonials] = useState(staticTestimonials);

  // --- FETCH DATA FROM BACKEND ---
  useEffect(() => {
    const fetchData = async () => {
      console.log("🔄 Fetching properties from:", PROPERTIES_URL);

      try {
        const propsRes = await axios.get(PROPERTIES_URL);
        console.log("📦 API Response:", propsRes.data);

        let propertiesArray = [];

        if (Array.isArray(propsRes.data)) {
          propertiesArray = propsRes.data;
        } else if (propsRes.data && propsRes.data.properties && Array.isArray(propsRes.data.properties)) {
          propertiesArray = propsRes.data.properties;
        }

        if (propertiesArray.length > 0) {
          console.log("✅ Properties Loaded:", propertiesArray.length);
          setPropertiesData(propertiesArray);
        } else {
          console.log("⚠️ No properties in database");
          setPropertiesData([]);
        }

      } catch (error) {
        console.error("❌ API Connection Error:", error.message);
        setPropertiesData([]);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <ScrollToTop />
      <AnimatePresence mode="wait">
        <Routes>
          <Route path="/" element={<Home propertiesData={propertiesData} whyDubaiCards={whyDubaiCards} services={services} partners={partners} emirates={emirates} testimonials={testimonials} lang={lang} setLang={setLang} content={content} />} />
          <Route path="/about" element={<AboutPageNew lang={lang} setLang={setLang} content={content} />} />
          <Route path="/about-detail" element={<AboutPageNew lang={lang} setLang={setLang} content={content} />} />
          <Route path="/why-dubai" element={<WhyDubaiPage lang={lang} setLang={setLang} content={content} whyDubaiCards={whyDubaiCards} />} />
          <Route path="/emirates" element={<EmiratesPage lang={lang} setLang={setLang} content={content} emirates={emirates} />} />
          <Route path="/services" element={<ServicesPage lang={lang} setLang={setLang} content={content} services={services} />} />
          <Route path="/properties" element={<PropertiesPage lang={lang} setLang={setLang} content={content} properties={propertiesData} />} />
          <Route path="/presence" element={<PresencePage lang={lang} setLang={setLang} content={content} />} />
          <Route path="/developers" element={<DevelopersPage lang={lang} setLang={setLang} content={content} partners={partners} />} />
          <Route path="/process" element={<ProcessPage lang={lang} setLang={setLang} content={content} />} />
          <Route path="/faq" element={<FaqPage lang={lang} setLang={setLang} content={content} />} />
          <Route path="/testimonials" element={<TestimonialsPage lang={lang} setLang={setLang} content={content} testimonials={testimonials} />} />
          <Route path="/contact" element={<ContactPage lang={lang} setLang={setLang} content={content} />} />
          <Route path="/property/:id" element={<PropertyDetail propertiesData={propertiesData} lang={lang} setLang={setLang} content={content} />} />
          <Route path="/sobha-central" element={<SobhaCentralPage lang={lang} setLang={setLang} content={content} />} />
          <Route path="/sobha-hartland-2" element={<SobhaHartland2Page lang={lang} setLang={setLang} content={content} />} />
          <Route path="/sobha-siniya-island" element={<SobhaSiniyaIslandPage lang={lang} setLang={setLang} content={content} />} />
        </Routes>
      </AnimatePresence>
    </>
  );
}

export default App;