import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import PropertiesSection from '../components/sections/PropertiesSection';
import SEO from '../components/SEO';
import { seoConfig } from '../utils/seoConfig';

const PropertiesPage = ({ lang, setLang, content, user, onLogout, properties }) => {
  return (
    <div className="min-h-screen bg-white text-[#0B1A2E]">
      <SEO 
        title={seoConfig.properties.title}
        description={seoConfig.properties.description}
        keywords={seoConfig.properties.keywords}
        canonical={seoConfig.properties.canonical}
      />
      <Navbar lang={lang} setLang={setLang} content={content} user={user} onLogout={onLogout} />
      <div className="pt-24">
        <PropertiesSection properties={properties} user={user} content={content} layout="grid" />
      </div>
      <Footer content={content} />
    </div>
  );
};

export default PropertiesPage;