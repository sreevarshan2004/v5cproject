// SEO Configuration for V5C Properties Website
// All keywords, meta descriptions, and structured data

export const seoConfig = {
  home: {
    title: 'V5C Properties | UAE Real Estate Broker & Dubai Property Investment Experts',
    description: 'Leading UAE real estate broker since 2005. Expert property consultants in Dubai offering off-plan projects, luxury properties, and high ROI investments. Golden Visa property investment specialists.',
    keywords: 'UAE real estate broker, real estate company in UAE, property consultants in UAE, real estate agency Dubai, Dubai real estate broker, buy property in UAE, invest in UAE real estate, Dubai property investment, off-plan properties Dubai, Golden Visa property investment UAE',
    canonical: 'https://v5cproperties.com',
    structuredData: {
      '@context': 'https://schema.org',
      '@type': 'RealEstateAgent',
      name: 'V5C Properties',
      description: 'Leading UAE real estate broker and property consultancy since 2005',
      url: 'https://v5cproperties.com',
      logo: 'https://v5cproperties.com/white-logo.png',
      address: {
        '@type': 'PostalAddress',
        addressCountry: 'AE',
        addressLocality: 'Dubai'
      },
      telephone: '+971503854097',
      email: 'contact@v5cproperties.com',
      areaServed: ['Dubai', 'UAE', 'India', 'Canada', 'USA', 'UK']
    }
  },
  
  about: {
    title: 'About V5C Properties | UAE Property Experts Since 2005',
    description: 'V5C Properties is a trusted UAE real estate company with 20 years of expertise. Licensed property consultants in Dubai offering investment advisory, off-plan projects, and Golden Visa solutions.',
    keywords: 'UAE property experts, real estate company in UAE, property consultants in UAE, Dubai real estate agency, UAE real estate developers, property investment UAE',
    canonical: 'https://v5cproperties.com/about'
  },
  
  services: {
    title: 'Real Estate Services Dubai | Property Consultants in UAE - V5C Properties',
    description: 'Comprehensive real estate services in Dubai: property buying, selling, investment advisory, off-plan projects, Golden Visa assistance, and property management by expert UAE consultants.',
    keywords: 'real estate services Dubai, property consultants in UAE, Dubai property management, real estate advisory UAE, property buying Dubai, Golden Visa property services',
    canonical: 'https://v5cproperties.com/services'
  },
  
  properties: {
    title: 'Properties for Sale in Dubai | Off-Plan Projects & Luxury Real Estate UAE',
    description: 'Explore premium properties for sale in Dubai. Off-plan projects, luxury apartments, villas, and high ROI investment properties from top UAE real estate developers.',
    keywords: 'property for sale in Dubai, off-plan projects in Dubai, new launch properties Dubai, Dubai off-plan investment, luxury properties in Dubai, buy apartment in Dubai, buy villa in Dubai, under construction properties Dubai',
    canonical: 'https://v5cproperties.com/properties'
  },
  
  whyDubai: {
    title: 'Why Invest in Dubai Real Estate | High ROI Properties & Tax-Free Investment',
    description: 'Discover why Dubai is the best property investment destination. High ROI properties, tax-free investment, Golden Visa eligibility, and rental yields up to 10%. Expert UAE real estate insights.',
    keywords: 'invest in Dubai real estate, high ROI properties in Dubai, rental yield Dubai, best property investment in UAE, tax free property investment Dubai, Golden Visa property investment UAE, passive income real estate UAE',
    canonical: 'https://v5cproperties.com/why-dubai'
  },
  
  emirates: {
    title: 'Dubai Real Estate by Location | Properties in Downtown, Marina & Business Bay',
    description: 'Find properties across Dubai\'s prime locations: Downtown Dubai, Dubai Marina, Business Bay, Palm Jumeirah, JVC, and Dubai Hills Estate. Expert UAE property consultants.',
    keywords: 'property in Downtown Dubai, property in Business Bay, property in Dubai Marina, property in Palm Jumeirah, property in JVC Dubai, property in Dubai Hills Estate, Dubai real estate locations',
    canonical: 'https://v5cproperties.com/emirates'
  },
  
  developers: {
    title: 'Top Dubai Real Estate Developers | Emaar, Sobha, Meraas & Azizi Properties',
    description: 'Partner with Dubai\'s leading real estate developers. Exclusive off-plan projects from Emaar, Sobha, Meraas, Azizi, and more. UAE property experts connecting you to branded residences.',
    keywords: 'UAE real estate developers, Dubai property developers, Emaar properties Dubai, Sobha Dubai, branded residences Dubai, off-plan projects Dubai, new launch properties Dubai',
    canonical: 'https://v5cproperties.com/developers'
  },
  
  contact: {
    title: 'Contact V5C Properties | Dubai Real Estate Consultants & Property Experts UAE',
    description: 'Get in touch with V5C Properties - your trusted UAE real estate broker. Expert property consultants in Dubai ready to help with investments, off-plan projects, and Golden Visa solutions.',
    keywords: 'contact Dubai real estate broker, UAE property consultants contact, real estate agency Dubai contact, property investment consultation UAE',
    canonical: 'https://v5cproperties.com/contact'
  },
  
  process: {
    title: 'Property Buying Process in Dubai | UAE Real Estate Investment Guide',
    description: 'Step-by-step guide to buying property in Dubai. Learn the UAE real estate investment process from expert property consultants. Golden Visa, financing, and legal procedures explained.',
    keywords: 'property buying process Dubai, buy property in UAE, Dubai real estate investment guide, UAE property purchase steps, Golden Visa property process',
    canonical: 'https://v5cproperties.com/process'
  },
  
  faq: {
    title: 'Dubai Real Estate FAQ | Property Investment Questions Answered by UAE Experts',
    description: 'Common questions about Dubai real estate investment answered by expert UAE property consultants. Learn about off-plan projects, Golden Visa, ROI, and property buying process.',
    keywords: 'Dubai real estate FAQ, UAE property investment questions, buy property in Dubai for foreigners, overseas property investment UAE, Dubai real estate for investors',
    canonical: 'https://v5cproperties.com/faq'
  },
  
  testimonials: {
    title: 'Client Testimonials | V5C Properties Dubai Real Estate Success Stories',
    description: 'Read success stories from satisfied clients of V5C Properties. Trusted UAE real estate broker with proven track record in Dubai property investment and consultancy.',
    keywords: 'Dubai real estate testimonials, UAE property consultant reviews, V5C Properties client reviews, Dubai property investment success stories',
    canonical: 'https://v5cproperties.com/testimonials'
  },
  
  presence: {
    title: 'Global Presence | V5C Properties in Dubai, India, Canada & UK',
    description: 'V5C Properties operates across Dubai, India, Canada, USA, and UK. International real estate consultancy connecting global investors to UAE property opportunities.',
    keywords: 'international real estate consultancy UAE, Dubai property for international investors, Indian investors Dubai property, Canadian investors Dubai real estate, buy property in Dubai for foreigners',
    canonical: 'https://v5cproperties.com/presence'
  }
};

// Location-specific keywords for future landing pages
export const locationKeywords = {
  downtown: 'property in Downtown Dubai, Downtown Dubai real estate, apartments in Downtown Dubai, buy property Downtown Dubai',
  businessBay: 'property in Business Bay, Business Bay Dubai real estate, apartments in Business Bay, invest in Business Bay',
  marina: 'property in Dubai Marina, Dubai Marina real estate, apartments in Dubai Marina, buy property Dubai Marina',
  palmJumeirah: 'property in Palm Jumeirah, Palm Jumeirah real estate, villas in Palm Jumeirah, luxury property Palm Jumeirah',
  jvc: 'property in JVC Dubai, Jumeirah Village Circle real estate, apartments in JVC, affordable property JVC Dubai',
  dubaiHills: 'property in Dubai Hills Estate, Dubai Hills real estate, villas in Dubai Hills, luxury property Dubai Hills Estate'
};

// International buyer keywords for future landing pages
export const internationalBuyerKeywords = {
  indian: 'Indian investors Dubai property, buy property in Dubai from India, Dubai real estate for Indian investors, NRI property investment Dubai',
  canadian: 'Canadian investors Dubai real estate, buy property in Dubai from Canada, Dubai property for Canadians, invest in Dubai from Canada',
  british: 'UK investors Dubai property, buy property in Dubai from UK, Dubai real estate for British investors, invest in Dubai from Britain',
  american: 'US investors Dubai property, buy property in Dubai from USA, Dubai real estate for American investors, invest in Dubai from America'
};
