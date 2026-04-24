import React, { useState } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import SEO from "./components/SEO";
import { seoConfig } from "./utils/seoConfig";

// 1. PLACE IMPORTS AT THE TOP
import HeroSection from "./components/sections/HeroSection";
import AboutSection from "./components/sections/AboutSection";
import EmiratesSection from "./components/sections/EmiratesSection";
import WhyDubaiSection from "./components/sections/WhyDubaiSection";
import LifeInDubaiSection from "./components/sections/LifeInDubaiSection";
import ServicesSection from "./components/sections/ServicesSection";
import PropertiesSection from "./components/sections/PropertiesSection";
import DevelopersSection from "./components/sections/DevelopersSection";
// import PresenceSection from "./components/sections/PresenceSection";
import LocationIntelligenceSection from "./components/sections/LocationIntelligenceSection";
import ProcessSection from "./components/sections/ProcessSection";
import FaqSection from "./components/sections/FaqSection";
import TestimonialsSection from "./components/sections/TestimonialsSection";
import NewsletterSection from "./components/sections/NewsletterSection";

import { translations } from "./data/constants";

const Home = ({ propertiesData, whyDubaiCards, services, partners, emirates, testimonials, lang, setLang, content }) => {

  return (
    <div dir={content.dir} className="min-h-screen bg-white text-black font-sans scroll-smooth">
      {/* SEO Meta Tags */}
      <SEO
        title={seoConfig.home.title}
        description={seoConfig.home.description}
        keywords={seoConfig.home.keywords}
        canonical={seoConfig.home.canonical}
        structuredData={seoConfig.home.structuredData}
      />

      {/* GLOBAL NAVBAR */}
      <Navbar lang={lang} setLang={setLang} content={content} />

      {/* 2. PLACE THE SECTIONS IN ORDER INSIDE THE RETURN */}
      <HeroSection content={content} />

      <AboutSection content={content} />

      <EmiratesSection
        emirates={emirates}
        content={content}
      />

      <WhyDubaiSection
        whyDubaiCards={content.whyCards || whyDubaiCards}
        content={content}
      />

      <LifeInDubaiSection content={content} />

      <ServicesSection
        content={content}
      />

      <PropertiesSection
        properties={propertiesData}
        content={content}
        isFeatured={true}
      />

      <DevelopersSection
        partners={partners}
        content={content}
      />

      {/* <PresenceSection content={content} /> */}
      <LocationIntelligenceSection content={content} />

      <ProcessSection content={content} />


      <TestimonialsSection testimonials={content.testimonials || testimonials} content={content} />
      <FaqSection limit={5} content={content} />


      <NewsletterSection content={content} />

      {/* GLOBAL FOOTER */}
      <Footer content={content} />
    </div>
  );
}

export default Home;