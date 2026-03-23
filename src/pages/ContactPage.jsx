import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ContactSection from '../components/sections/ContactSection';
import SEO from '../components/SEO';
import { seoConfig } from '../utils/seoConfig';

const ContactPage = ({ lang, setLang, content, user, onLogout }) => {
  return (
    <div className="min-h-screen bg-white text-[#0B1A2E]">
      <SEO 
        title={seoConfig.contact.title}
        description={seoConfig.contact.description}
        keywords={seoConfig.contact.keywords}
        canonical={seoConfig.contact.canonical}
      />
      <Navbar lang={lang} setLang={setLang} content={content} user={user} onLogout={onLogout} />
      <div className="pt-24">
        <h1 className="sr-only">Contact V5C Properties - Dubai Real Estate Consultants</h1>
        <ContactSection />
      </div>
      <Footer content={content} />
    </div>
  );
};

export default ContactPage;