import React from 'react';
import { motion } from 'framer-motion';
import { Shield, TrendingUp, Globe2, Percent, Users, GraduationCap, Building2, CheckCircle } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import SEO from '../components/SEO';
import { seoConfig } from '../utils/seoConfig';

const AboutPageNew = ({ lang, setLang, content, user, onLogout }) => {
  const whyDubaiHighlights = [
    { icon: Percent, title: 'Tax-Free Economy', desc: 'Enjoy 0% income tax, 0% capital gains tax, and no property tax—maximizing your investment returns.' },
    { icon: Globe2, title: 'Global Connectivity', desc: 'Dubai sits at the crossroads of East and West, offering unmatched access to international markets.' },
    { icon: Building2, title: 'Ease of Doing Business', desc: 'One of the most business-friendly cities in the world, supported by transparent regulatory frameworks and advanced digital services.' },
    { icon: TrendingUp, title: 'High Rental Yields', desc: 'Average annual returns of 7–10%, among the highest in major global cities.' },
    { icon: Users, title: 'Tourism Powerhouse', desc: 'A record-breaking destination for global travelers, driving strong demand for short-term rentals and hospitality assets.' },
    { icon: Shield, title: 'Safety & Security', desc: 'Consistently ranked among the safest cities in the world, offering unmatched peace of mind.' },
    { icon: GraduationCap, title: 'Premium Education & Healthcare', desc: 'Home to international schools, elite universities, and world-class medical facilities.' }
  ];

  const whyChooseV5C = [
    { title: 'Two Decades of Expertise', desc: 'Established in 2005, we bring nearly 20 years of real estate mastery.' },
    { title: 'Trusted Across Three Continents', desc: 'Operations in Dubai, India, and the UK ensure international knowledge and accessibility.' },
    { title: 'End-to-End Investment & JV Consultancy', desc: 'We guide investors from selection and due diligence to structuring and acquisition.' },
    { title: 'A Global Network of Investors & Developers', desc: 'Connecting you to premium opportunities and strategic partnerships.' },
    { title: 'Transparency, Ethics & Personalized Service', desc: 'Our clients trust us because we prioritize clarity, integrity, and long-term value in everything we do.' }
  ];

  const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };

  return (
    <div className="min-h-screen bg-white text-[#0B1A2E]">
      <SEO
        title={seoConfig.about.title}
        description={seoConfig.about.description}
        keywords={seoConfig.about.keywords}
        canonical={seoConfig.about.canonical}
      />
      <Navbar lang={lang} setLang={setLang} content={content} user={user} onLogout={onLogout} />

      <section className="pt-32 pb-16 px-6 md:px-24 bg-gradient-to-b from-gray-50 via-white to-gray-50 relative overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-10 w-72 h-72 bg-[#D4AF37]/10 rounded-full blur-[100px] animate-pulse" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#D4AF37]/10 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '1s' }} />
        </div>

        <div className="container mx-auto text-center max-w-5xl relative z-10">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, type: "spring" }}
            className="mb-6"
          >
            <div className="inline-block relative">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 bg-gradient-to-r from-[#D4AF37] to-transparent rounded-full blur-xl opacity-20"
              />
              <h1 className="text-4xl md:text-5xl font-black uppercase text-theme-primary leading-snug tracking-tighter font-sans relative">
                V5C PROPERTIES - Unlocking High-Value UAE Investments
              </h1>
            </div>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-2xl md:text-3xl font-bold text-[#D4AF37] mb-8 relative font-sans"
          >
            <motion.span
              animate={{ backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] }}
              transition={{ duration: 5, repeat: Infinity }}
              className="bg-gradient-to-r from-[#D4AF37] via-[#FCEabb] to-[#D4AF37] bg-clip-text text-transparent"
              style={{ backgroundSize: '200% auto' }}
            >
              Where Real Estate Becomes Prosperity, Legacy, and Global Opportunity
            </motion.span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="text-gray-600 text-base md:text-lg leading-relaxed max-w-4xl mx-auto font-sans"
          >
            At V5C Properties, we believe real estate is far more than a transaction—it is the foundation of legacy, the gateway to prosperity, and the starting point of a lifestyle defined by confidence and growth. For nearly two decades, we have guided investors, families, and global partners into the heart of Dubai's thriving property landscape. Every recommendation, every investment, and every milestone is powered by one promise: to unlock the limitless potential of one of the world's most dynamic real estate markets.
          </motion.p>

          {/* Decorative Line */}
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: '100%' }}
            transition={{ delay: 0.8, duration: 1 }}
            className="h-px bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent mt-12 mx-auto max-w-md"
          />
        </div>
      </section>

      <section className="py-16 md:py-24 px-6 md:px-24 bg-white relative overflow-hidden">
        {/* Animated Grid Background */}
        <div className="absolute inset-0 opacity-[0.03]">
          <div className="absolute inset-0" style={{ backgroundImage: 'linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)', backgroundSize: '50px 50px' }} />
        </div>

        <div className="container mx-auto max-w-6xl relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, type: "spring" }}
              className="inline-block mb-6"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-[#D4AF37] to-[#FCEabb] rounded-full flex items-center justify-center mx-auto shadow-lg shadow-[#D4AF37]/20">
                <CheckCircle size={32} className="text-white" />
              </div>
            </motion.div>
            <h2 className="text-4xl md:text-5xl font-black uppercase text-theme-primary leading-snug tracking-tighter mb-10 text-center font-sans">
              A LEGACY BUILT ON VISION, CONFIDENCE & <span className="text-[#D4AF37]">INTERNATIONAL STRENGTH</span>
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            {/* Animated Border */}
            <div className="absolute inset-0 rounded-3xl overflow-hidden">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                className="absolute inset-[-100%] bg-[conic-gradient(from_90deg_at_50%_50%,#0000_0%,#D4AF37_50%,#0000_100%)] opacity-20"
              />
            </div>

            <div className="relative bg-[#0B1A2E] border border-white/5 rounded-3xl p-8 md:p-16 space-y-10 shadow-2xl overflow-hidden group">
              {/* Subtle animated background glow */}
              <div className="absolute top-0 right-0 w-96 h-96 bg-[#D4AF37]/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2 group-hover:bg-[#D4AF37]/10 transition-colors duration-700" />
              
              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
                className="text-gray-300 text-lg md:text-xl leading-relaxed font-sans relative z-10"
              >
                Founded in 2005, V5C Properties carries a distinguished legacy in the real estate sector. Fully licensed to buy, sell, mortgage, and manage properties across Dubai, we specialize in:
              </motion.p>

              <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6 relative z-10">
                {['Residential & Commercial Properties', 'Luxury Villas & Townhouses', 'Hotels & Hospitality Assets', 'Land Investment & Development Opportunities'].map((item, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 + i * 0.1 }}
                    whileHover={{ x: 10 }}
                    className="flex items-center gap-4 group/item cursor-pointer"
                  >
                    <div className="w-6 h-6 rounded-full bg-[#D4AF37]/10 flex items-center justify-center group-hover/item:bg-[#D4AF37] transition-colors duration-300">
                        <CheckCircle size={14} className="text-[#D4AF37] group-hover/item:text-[#0B1A2E]" />
                    </div>
                    <span className="text-gray-200 group-hover/item:text-white transition-colors font-sans text-base md:text-lg">{item}</span>
                  </motion.li>
                ))}
              </ul>

              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.9 }}
                className="text-gray-400 text-base md:text-lg leading-relaxed relative z-10 font-sans"
              >
                With a presence in Dubai, India, and the United Kingdom, we offer an international perspective that empowers investors to make informed, strategic decisions. Our expertise extends far beyond transactions—we are trusted advisors for joint venture structuring, connecting global investors with premium partners, landowners, consultants, and developers.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 1.1 }}
                className="pt-10 border-t border-white/10 relative z-10"
              >
                <div className="inline-block relative">
                   <div className="absolute -inset-1 bg-gradient-to-r from-[#D4AF37] to-transparent blur opacity-20" />
                   <p className="relative text-[#D4AF37] text-xl md:text-2xl font-bold text-center font-sans tracking-tight">
                    Our mission is simple yet profound: to deliver unmatched opportunities, transparency, and long-term value to investors worldwide.
                  </p>
                </div>
              </motion.div>
              
              {/* Corner Accent */}
              <Building2 size={200} className="absolute -bottom-20 -right-20 text-[#D4AF37] opacity-[0.03] rotate-12" />
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-16 md:py-24 px-6 md:px-24 bg-gray-50 relative overflow-hidden">
        {/* Floating Particles */}
        <div className="absolute inset-0">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-[#D4AF37] rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -30, 0],
                opacity: [0.2, 0.6, 0.2],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>

        <div className="container mx-auto max-w-6xl relative z-10 text-center">
          <h2 className="text-4xl md:text-5xl font-black uppercase text-theme-primary leading-snug tracking-tighter mb-10 font-sans">
            WHY INVEST IN <span className="text-[#D4AF37]">DUBAI REAL ESTATE</span>
          </h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="text-gray-600 font-medium text-lg max-w-3xl mx-auto mb-6 font-sans"
          >
            Dubai — The Global Capital of Ambition, Lifestyle & Wealth
          </motion.p>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="text-gray-600 text-base max-w-4xl mx-auto leading-relaxed mb-16 font-sans"
          >
            Dubai is more than a city—it is a global success story. A place where innovation meets luxury, opportunity meets security, and people from across the world come together to live, work, and prosper. With a future-driven government, an open economy, world-class infrastructure, and an unmatched quality of life, Dubai attracts millions of residents, investors, and visitors each year.
          </motion.p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 text-left">
            {whyDubaiHighlights.map((item, i) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, type: "spring" }}
                  whileHover={{ y: -10 }}
                  className="relative group"
                >
                  <div className="relative bg-[#0B1A2E] rounded-3xl p-8 border border-white/5 shadow-2xl h-full flex flex-col items-start transition-all duration-500 hover:shadow-[0_20px_40px_rgba(0,0,0,0.4)]">
                    {/* Icon Container with subtle glow */}
                    <div className="mb-8 relative">
                      <div className="absolute inset-0 bg-[#D4AF37]/20 blur-xl rounded-full scale-150 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      <div className="relative w-14 h-14 bg-gradient-to-br from-[#D4AF37] to-[#FCEabb] rounded-2xl flex items-center justify-center shadow-lg shadow-[#D4AF37]/20 transform group-hover:rotate-12 transition-transform duration-500">
                        <Icon size={28} className="text-[#0B1A2E]" />
                      </div>
                    </div>

                    <h3 className="text-white text-xl md:text-2xl font-bold mb-4 uppercase tracking-tighter leading-tight font-sans group-hover:text-[#D4AF37] transition-colors">
                      {item.title}
                    </h3>
                    
                    {/* Content / Points Divider */}
                    <div className="w-12 h-1 bg-[#D4AF37] mb-6 rounded-full group-hover:w-20 transition-all duration-500" />

                    <p className="text-gray-400 text-sm md:text-base leading-relaxed font-sans group-hover:text-white/90 transition-colors">
                      {item.desc}
                    </p>

                    {/* Subtle Corner Decoration */}
                    <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-20 transition-opacity">
                        <Icon size={80} className="text-[#D4AF37]" />
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <Footer content={content} />
    </div>
  );
};

export default AboutPageNew;
