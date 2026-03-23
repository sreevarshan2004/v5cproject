import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import PresenceSection from '../components/sections/PresenceSection';
import SEO from '../components/SEO';
import { seoConfig } from '../utils/seoConfig';

const PresencePage = ({ lang, setLang, content, user, onLogout }) => {
  return (
    <div className="min-h-screen bg-white text-[#0B1A2E]">
      <SEO 
        title={seoConfig.presence.title}
        description={seoConfig.presence.description}
        keywords={seoConfig.presence.keywords}
        canonical={seoConfig.presence.canonical}
      />
      <Navbar lang={lang} setLang={setLang} content={content} user={user} onLogout={onLogout} />
      <div className="pt-24">
        <h1 className="sr-only">Global Presence - V5C Properties in Dubai, India, Canada & UK</h1>
        <PresenceSection content={content} />
      </div>
      <Footer content={content} />
    </div>
  );
};

export default PresencePage;