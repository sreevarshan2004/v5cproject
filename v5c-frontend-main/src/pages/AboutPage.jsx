import React from 'react';
import { motion } from 'framer-motion';
import { 
  Shield, TrendingUp, Globe2, Home, Percent, Users, 
  GraduationCap, Heart, Building2, Landmark, Award, 
  CheckCircle, Briefcase, History, Star 
} from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const AboutPage = ({ lang, setLang, content, user, onLogout }) => {

  // -- MOCK DATA (Included to ensure the code runs successfully) --
  const timelineData = [
    { year: '2005', title: 'Inception', desc: 'V5C Properties was founded with a vision to bridge international markets.', icon: History },
    { year: '2010', title: 'Global Expansion', desc: 'Opened offices in India and the UK to serve a growing client base.', icon: Globe2 },
    { year: '2018', title: 'Digital Transformation', desc: 'Launched proprietary investment analysis tools for clients.', icon: TrendingUp },
    { year: '2023', title: 'Record Growth', desc: 'Achieved $500M+ in assets under management.', icon: Award }
  ];

  const achievements = [
    { number: '20+', label: 'Years Experience', desc: 'Navigating market cycles.' },
    { number: '$1B+', label: 'Property Sales', desc: 'Successful transactions.' },
    { number: '5000+', label: 'Happy Clients', desc: 'Worldwide investors.' },
    { number: '3', label: 'Global Offices', desc: 'Dubai, London, Mumbai.' }
  ];
  // -------------------------------------------------------------

  return (
    // Changed main background to white and text to dark gray
    <div className="min-h-screen bg-white text-gray-900 font-sans selection:bg-[#D4AF37] selection:text-white">
      <Navbar lang={lang} setLang={setLang} content={content} user={user} onLogout={onLogout} />

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6 md:px-24 bg-white relative overflow-hidden">
        {/* Subtle Background Pattern */}
        <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-gray-50 to-transparent pointer-events-none" />
        
        <div className="container mx-auto text-center max-w-5xl relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-block mb-4"
          >
            <span className="py-1 px-3 border border-[#D4AF37] text-[#D4AF37] rounded-full text-xs font-bold uppercase tracking-widest">
              Est. 2005
            </span>
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl font-black uppercase text-gray-900 tracking-tighter mb-6"
          >
            V5C Properties
          </motion.h1>
          
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-2xl md:text-3xl font-bold text-[#D4AF37] mb-8 font-serif italic"
          >
            Where Real Estate Becomes Prosperity & Legacy
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-gray-600 text-lg md:text-xl leading-relaxed max-w-4xl mx-auto"
          >
            At V5C Properties, we believe real estate is far more than a transaction—it is the foundation of legacy. For nearly two decades, we have guided investors, families, and global partners into the heart of Dubai's thriving property landscape with unwavering integrity and expertise.
          </motion.p>
        </div>
      </section>

      {/* Timeline Section - Light Gray Background */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6 md:px-24">
          <div className="text-center mb-20">
            <span className="text-[#D4AF37] text-xs font-black uppercase tracking-[0.3em] block mb-3">
              Our Evolution
            </span>
            <h2 className="text-4xl md:text-5xl font-black uppercase text-gray-900 tracking-tight">
              Company <span className="text-[#D4AF37]">Timeline</span>
            </h2>
          </div>

          <div className="relative max-w-5xl mx-auto">
            {/* Timeline Center Line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-gray-200" />

            {timelineData.map((item, i) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ delay: i * 0.2 }}
                  className={`relative flex items-center mb-16 ${i % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}
                >
                  {/* Text Content */}
                  <div className={`w-1/2 ${i % 2 === 0 ? 'text-right pr-12' : 'text-left pl-12'}`}>
                    <div className="bg-white p-8 rounded-2xl shadow-[0_10px_40px_-15px_rgba(0,0,0,0.1)] border border-gray-100 hover:border-[#D4AF37]/30 transition-colors duration-300">
                      <span className="text-[#D4AF37] text-3xl font-black block mb-2">{item.year}</span>
                      <h3 className="text-gray-900 text-xl font-bold mb-3 uppercase">{item.title}</h3>
                      <p className="text-gray-600 text-sm leading-relaxed font-sans">{item.desc}</p>
                    </div>
                  </div>

                  {/* Center Icon Node */}
                  <div className="absolute left-1/2 transform -translate-x-1/2 z-10">
                    <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center border-4 border-[#D4AF37] shadow-lg">
                      <Icon size={20} className="text-[#D4AF37]" />
                    </div>
                  </div>
                  
                  {/* Empty space for the other side */}
                  <div className="w-1/2"></div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Achievements Section - White Background with Cards */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6 md:px-24">
          <div className="text-center mb-16">
            <span className="text-[#D4AF37] text-xs font-black uppercase tracking-[0.3em] block mb-3">Our Impact</span>
            <h2 className="text-4xl md:text-5xl font-black uppercase text-gray-900 tracking-tight">
              Key <span className="text-[#D4AF37]">Achievements</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {achievements.map((achievement, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group relative"
              >
                <div className="absolute inset-0 bg-[#D4AF37] rounded-2xl transform translate-x-2 translate-y-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />
                <div className="bg-gray-50 rounded-2xl p-8 border border-gray-100 text-center hover:-translate-y-1 transition-transform duration-300 h-full">
                  <div className="text-4xl md:text-5xl font-black text-[#D4AF37] mb-3 font-serif">
                    {achievement.number}
                  </div>
                  <h3 className="text-gray-900 text-lg font-bold mb-2 uppercase tracking-wide">
                    {achievement.label}
                  </h3>
                  <p className="text-gray-500 text-sm font-sans">{achievement.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission & Vision - Light Gray Background */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6 md:px-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            
            {/* Mission */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-white p-10 rounded-3xl shadow-sm border border-gray-100"
            >
              <div className="flex items-start gap-6">
                <div className="w-16 h-16 bg-[#D4AF37]/10 rounded-2xl flex items-center justify-center shrink-0">
                  <Briefcase size={32} className="text-[#D4AF37]" />
                </div>
                <div>
                  <h3 className="text-2xl font-black uppercase text-gray-900 mb-4">Our Mission</h3>
                  <p className="text-gray-600 leading-relaxed font-sans">
                    To provide exceptional real estate consultancy services that bridge global markets,
                    ensuring our clients make informed investment decisions in Dubai's dynamic property landscape.
                    We are committed to transparency, expertise, and building lasting relationships.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Vision */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-white p-10 rounded-3xl shadow-sm border border-gray-100"
            >
              <div className="flex items-start gap-6">
                <div className="w-16 h-16 bg-[#D4AF37]/10 rounded-2xl flex items-center justify-center shrink-0">
                  <Award size={32} className="text-[#D4AF37]" />
                </div>
                <div>
                  <h3 className="text-2xl font-black uppercase text-gray-900 mb-4">Our Vision</h3>
                  <p className="text-gray-600 leading-relaxed font-sans">
                    To be the world's most trusted real estate consultancy, recognized for our innovative
                    approach, global reach, and unwavering commitment to client success. We envision a future
                    where property investment transcends borders seamlessly.
                  </p>
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      <Footer content={content} />
    </div>
  );
};

export default AboutPage;