import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ServicesSection from '../components/sections/ServicesSection';
import SEO from '../components/SEO';
import { seoConfig } from '../utils/seoConfig';

const ServicesPage = ({ lang, setLang, content, user, onLogout, services }) => {
  return (
    <div className="min-h-screen bg-white text-[#0B1A2E]">
      <SEO 
        title={seoConfig.services.title}
        description={seoConfig.services.description}
        keywords={seoConfig.services.keywords}
        canonical={seoConfig.services.canonical}
      />
      <Navbar lang={lang} setLang={setLang} content={content} user={user} onLogout={onLogout} />
      <div className="pt-24">
        <h1 className="sr-only">Real Estate Services Dubai - Property Consultants in UAE</h1>
        <ServicesSection content={content} services={services} user={user} />
      </div>
      <Footer content={content} />
    </div>
  );
};

export default ServicesPage;