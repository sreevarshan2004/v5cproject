import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ProcessSection from '../components/sections/ProcessSection';
import SEO from '../components/SEO';
import { seoConfig } from '../utils/seoConfig';

const ProcessPage = ({ lang, setLang, content, user, onLogout }) => {
  return (
    <div className="min-h-screen bg-white text-[#0B1A2E]">
      <SEO 
        title={seoConfig.process.title}
        description={seoConfig.process.description}
        keywords={seoConfig.process.keywords}
        canonical={seoConfig.process.canonical}
      />
      <Navbar lang={lang} setLang={setLang} content={content} user={user} onLogout={onLogout} />
      <div className="pt-24">
        <h1 className="sr-only">Property Buying Process in Dubai - UAE Real Estate Investment Guide</h1>
        <ProcessSection />
      </div>
      <Footer content={content} />
    </div>
  );
};

export default ProcessPage;