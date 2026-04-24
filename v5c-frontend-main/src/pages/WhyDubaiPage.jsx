import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import WhyDubaiSection from '../components/sections/WhyDubaiSection';
import SEO from '../components/SEO';
import { seoConfig } from '../utils/seoConfig';

const WhyDubaiPage = ({ lang, setLang, content, user, onLogout, whyDubaiCards }) => {
  return (
    <div className="min-h-screen bg-white text-[#0B1A2E]">
      <SEO 
        title={seoConfig.whyDubai.title}
        description={seoConfig.whyDubai.description}
        keywords={seoConfig.whyDubai.keywords}
        canonical={seoConfig.whyDubai.canonical}
      />
      <Navbar lang={lang} setLang={setLang} content={content} user={user} onLogout={onLogout} />
      <div className="pt-24">
        <h1 className="sr-only">Why Invest in Dubai Real Estate - High ROI Properties UAE</h1>
        <WhyDubaiSection whyDubaiCards={whyDubaiCards} user={user} content={content} />
      </div>
      <Footer content={content} />
    </div>
  );
};

export default WhyDubaiPage;