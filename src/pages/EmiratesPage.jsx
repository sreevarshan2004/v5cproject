import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import EmiratesSection from '../components/sections/EmiratesSection';
import SEO from '../components/SEO';
import { seoConfig } from '../utils/seoConfig';

const EmiratesPage = ({ lang, setLang, content, user, onLogout, emirates }) => {
  return (
    <div className="min-h-screen bg-white text-[#0B1A2E]">
      <SEO 
        title={seoConfig.emirates.title}
        description={seoConfig.emirates.description}
        keywords={seoConfig.emirates.keywords}
        canonical={seoConfig.emirates.canonical}
      />
      <Navbar lang={lang} setLang={setLang} content={content} user={user} onLogout={onLogout} />
      <div className="pt-24">
        <h1 className="sr-only">Dubai Real Estate by Location - Properties in Prime Areas</h1>
        <EmiratesSection emirates={emirates} user={user} content={content} />
      </div>
      <Footer content={content} />
    </div>
  );
};

export default EmiratesPage;