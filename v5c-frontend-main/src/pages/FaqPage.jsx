import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import FaqSection from '../components/sections/FaqSection';
import SEO from '../components/SEO';
import { seoConfig } from '../utils/seoConfig';

const FaqPage = ({ lang, setLang, content, user, onLogout }) => {
  return (
    <div className="min-h-screen bg-white text-[#0B1A2E]">
      <SEO 
        title={seoConfig.faq.title}
        description={seoConfig.faq.description}
        keywords={seoConfig.faq.keywords}
        canonical={seoConfig.faq.canonical}
      />
      <Navbar lang={lang} setLang={setLang} content={content} user={user} onLogout={onLogout} />
      <div className="pt-24">
        <h1 className="sr-only">Dubai Real Estate FAQ - Property Investment Questions Answered</h1>
        <FaqSection content={content} />
      </div>
      <Footer content={content} />
    </div>
  );
};

export default FaqPage;