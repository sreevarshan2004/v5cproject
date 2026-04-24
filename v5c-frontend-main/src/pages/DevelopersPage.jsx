import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { motion } from 'framer-motion';
import SEO from '../components/SEO';
import { seoConfig } from '../utils/seoConfig';
import { MapPin } from 'lucide-react';

// Developer logos
import emaarLogo from '../assets/EMAAR.jpg';
import sobhaLogo from '../assets/sobha.png';
import aziziLogo from '../assets/azizi.png';
import meraasLogo from '../assets/merras.jpg';
import { DubaiIcon, SharjahIcon } from '../components/CityIcons';

const DevelopersPage = ({ lang, setLang, content, user, onLogout }) => {
  const getWhyText = () => {
    if (lang === 'RU') return 'Почему';
    if (lang === 'ES') return 'Por qué';
    return 'Why';
  };

  // Map locations to icons
  const getLocationIcon = (location) => {
    if (location.toLowerCase().includes('dubai')) return <DubaiIcon size={14} className="text-[#D4AF37]" />;
    if (location.toLowerCase().includes('sharjah')) return <SharjahIcon size={14} className="text-[#D4AF37]" />;
    return <MapPin size={14} className="text-[#D4AF37]" />;
  };

  return (
    <div className="min-h-screen bg-white text-[#0B1A2E]">
      <SEO
        title={seoConfig.developers.title}
        description={seoConfig.developers.description}
        keywords={seoConfig.developers.keywords}
        canonical={seoConfig.developers.canonical}
      />
      <Navbar lang={lang} setLang={setLang} content={content} user={user} onLogout={onLogout} />

      {/* Page Header */}
      <div className="pt-32 pb-12 px-6 md:px-12 lg:px-24 text-center border-b border-white/5">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase text-theme-primary leading-tight md:leading-snug tracking-tighter mb-8 font-sans">
          TOP {content?.nav?.[3] || "DUBAI"} <span className="text-[#D4AF37]">REAL ESTATE DEVELOPERS</span>
        </h1>
        <p className="text-gray-400 text-sm mt-4 max-w-2xl mx-auto font-sans">
          Partnering with UAE's most prestigious real estate developers to deliver off-plan projects and exceptional value
        </p>
      </div>

      {/* Developer Sections */}
      <section className="py-16 md:py-24 px-6 md:px-12 lg:px-24 bg-white relative overflow-hidden">
        {/* Subtle grid background */}
        <div className="absolute inset-0 opacity-[0.02]">
          <div className="absolute inset-0" style={{ backgroundImage: 'linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
        </div>

        <div className="container mx-auto max-w-5xl flex flex-col gap-12 md:gap-16 relative z-10">
          {[
            {
              name: 'Emaar',
              location: 'Dubai',
              logo: emaarLogo,
              title: 'Emaar',
              content: `Emaar Properties is one of the world's most respected real estate developers, known for shaping Dubai's skyline and setting global benchmarks in master-planned communities. Investing in Emaar means investing in long-term value, lifestyle excellence, and a globally trusted brand.

Through landmark destinations such as Downtown Dubai, Dubai Marina, Dubai Hills Estate, Arabian Ranches, and Emaar Beachfront, Emaar offers a diverse portfolio of luxury apartments, villas, and townhouses designed for both end-users and investors. With a strong focus on sustainability, community living, and future-ready urban planning, Emaar developments consistently deliver strong demand, rental performance, and capital appreciation.

At V5C Properties, we work closely with Emaar to provide our clients access to some of Dubai's most iconic and investment-secure developments.`
            },
            {
              name: 'Sobha',
              location: 'Dubai',
              logo: sobhaLogo,
              title: 'Sobha',
              content: `Sobha Realty is synonymous with uncompromising quality, precision engineering, and luxury craftsmanship. What sets Sobha apart is its fully integrated, in-house development model — controlling everything from design and construction to finishing and quality assurance.

Every Sobha home is built to international standards and inspected through a dedicated quality control system that reports directly to top leadership. Their developments are known for superior construction, refined interiors, and long-term durability, making them highly attractive to discerning end-users and serious investors alike.

V5C Properties proudly represents Sobha projects for clients seeking premium residences with strong build quality, consistent rental demand, and lasting value in Dubai's luxury segment.`
            },
            {
              name: 'Azizi',
              location: 'Dubai',
              logo: aziziLogo,
              title: 'Azizi',
              content: `Azizi Developments is one of Dubai's most dynamic private developers, with a strong track record of delivering large-scale residential, mixed-use, and hospitality projects across prime locations. With tens of thousands of homes delivered and many more under development, Azizi offers accessibility, scale, and value-driven opportunities.

From master-planned communities like Azizi Riviera and Azizi Venice to high-profile projects such as Burj Azizi, the developer focuses on strategic locations, modern amenities, and competitive pricing. Azizi's expansion into hospitality and global markets further reinforces its long-term vision and growth potential.

Through V5C Properties, clients gain access to Azizi's wide range of off-plan and ready projects, ideal for both entry-level investors and portfolio expansion.`
            },
            {
              name: 'Meraas',
              location: 'Dubai',
              logo: meraasLogo,
              title: 'Meraas',
              content: `Meraas is known for creating some of Dubai's most vibrant lifestyle destinations, blending residential living with retail, leisure, and entertainment. As part of Dubai Holding Real Estate, and following its integration with Nakheel, Meraas plays a key role in shaping Dubai's urban future.

Developments such as City Walk, Bluewaters Island, La Mer, and Central Park reflect Meraas' focus on design-led communities, waterfront living, and experiential environments. These projects are highly sought after by both residents and investors due to their uniqueness, location appeal, and lifestyle value.

V5C Properties works with Meraas to offer clients access to distinctive developments that combine strong lifestyle demand with long-term investment potential.`
            }
          ].map((dev, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group"
            >
              {/* Developer Card - Vertical Stack */}
              <div className="relative bg-[#0B1A2E] rounded-3xl p-8 md:p-14 border border-white/5 shadow-2xl flex flex-col items-start transition-all duration-500 hover:shadow-[0_20px_40px_rgba(0,0,0,0.4)] group-hover:border-[#D4AF37]/30 overflow-hidden">
                
                {/* Background Accent */}
                <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[#D4AF37]/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2 pointer-events-none group-hover:bg-[#D4AF37]/10 transition-colors duration-700" />

                <div className="w-full flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10 relative z-10">
                  {/* Logo Area */}
                  <div className="h-16 md:h-20">
                    <img
                      src={dev.logo}
                      alt={dev.name}
                      className="h-full w-auto max-w-[200px] object-contain grayscale group-hover:grayscale-0 transition-all duration-700 brightness-[3] group-hover:brightness-100"
                    />
                  </div>

                  {/* Location Badge */}
                  <div className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-full border border-white/10 group-hover:border-[#D4AF37]/30 transition-colors">
                    {getLocationIcon(dev.location)}
                    <span className="text-white text-xs font-black uppercase tracking-widest">{dev.location}</span>
                  </div>
                </div>

                {/* Section Title */}
                <motion.h3
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 + 0.4 }}
                  className="text-2xl md:text-3xl font-black uppercase tracking-tighter text-white mb-6 font-sans group-hover:text-[#D4AF37] transition-colors"
                >
                  {getWhyText()} {dev.title}?
                </motion.h3>

                {/* Brand Line */}
                <div className="w-16 h-1 bg-[#D4AF37] mb-8 rounded-full group-hover:w-32 transition-all duration-500" />

                {/* Content */}
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 + 0.5 }}
                  className="space-y-6 max-w-4xl"
                >
                  {dev.content.split('\n\n').map((paragraph, pIndex) => (
                    <p key={pIndex} className="text-gray-300 text-base md:text-lg leading-relaxed font-sans group-hover:text-white/90 transition-colors">
                      {paragraph}
                    </p>
                  ))}
                </motion.div>

                {/* Corner Decoration */}
                <div className="absolute -bottom-10 -right-10 w-60 h-60 bg-[#D4AF37]/5 rounded-full blur-[100px] pointer-events-none" />
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <Footer content={content} />
    </div>
  );
};

export default DevelopersPage;