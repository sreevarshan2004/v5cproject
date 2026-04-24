import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import TestimonialsSection from '../components/sections/TestimonialsSection';
import SEO from '../components/SEO';
import { seoConfig } from '../utils/seoConfig';

const TestimonialsPage = ({ lang, setLang, content, user, onLogout, testimonials }) => {
  return (
    <div className="min-h-screen bg-white text-[#0B1A2E]">
      <SEO 
        title={seoConfig.testimonials.title}
        description={seoConfig.testimonials.description}
        keywords={seoConfig.testimonials.keywords}
        canonical={seoConfig.testimonials.canonical}
      />
      <Navbar lang={lang} setLang={setLang} content={content} user={user} onLogout={onLogout} />
      <div className="pt-24">
        <h1 className="sr-only">Client Testimonials - V5C Properties Dubai Real Estate Success Stories</h1>
        <TestimonialsSection testimonials={testimonials} />
      </div>
      <Footer content={content} />
    </div>
  );
};

export default TestimonialsPage;