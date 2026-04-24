import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView, useMotionValue, useSpring, AnimatePresence } from 'framer-motion';
import { MapPin, Building2, Layers, Bed, Bath, Maximize2, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import LeadForm from '../components/LeadForm';

// Assets
import sobhaImage from '../assets/sobhaimage.webp';
import sobhaDisplay from '../assets/sobhadisplay.webp';
import sobhaConnect from '../assets/sobhaconnect.webp';
import sobhaLive from '../assets/sobhalive.webp';
import sobhaLive2 from '../assets/sobhalive2.webp';
import sobhaLive3 from '../assets/sobhalive3.webp';
import sobhaLogo from '../assets/sobha.png';
import sobhaCentralLogo from '../assets/sobhacentrallogo.svg';
import sobhaMaster from '../assets/sobhamaster.webp';
import hartlandBanner from '../assets/hartland_banner.webp';

// --- Helper Component: Animated Number Counter ---
const AnimatedCounter = ({ value, duration = 2 }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, { duration: duration * 1000 });

  useEffect(() => {
    if (isInView) {
      motionValue.set(value);
    }
  }, [isInView, value, motionValue]);

  useEffect(() => {
    return springValue.on("change", (latest) => {
      if (ref.current) {
        // Format with commas (e.g., 160,000)
        ref.current.textContent = Math.floor(latest).toLocaleString();
      }
    });
  }, [springValue]);

  return <span ref={ref} />;
};

// --- Animation Variants ---
const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
};

const slideInLeft = {
  hidden: { opacity: 0, x: -60 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: "easeOut" } }
};

const slideInRight = {
  hidden: { opacity: 0, x: 60 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: "easeOut" } }
};

const imageReveal = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1, transition: { duration: 1, ease: "easeOut" } }
};

const SobhaFaqItem = ({ faq, index }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all"
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-6 text-left group"
      >
        <span className={`text-base md:text-lg font-bold transition-colors font-sans ${isOpen ? 'text-[#D4AF37]' : 'text-[#0B1A2E] group-hover:text-[#D4AF37]'}`}>
          {faq.q}
        </span>
        <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all ${isOpen ? 'bg-[#D4AF37] text-white rotate-180' : 'bg-gray-100 text-gray-500 group-hover:bg-[#D4AF37] group-hover:text-white'}`}>
          {isOpen ? (
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line></svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
          )}
        </div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <div className="px-6 pb-6 text-gray-600 leading-relaxed border-t border-gray-50 pt-4 text-sm md:text-base font-sans">
              {faq.a}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

import { PROPERTIES_URL, IMAGE_BASE_URL } from '../data/constanturl';

const SobhaCentralPage = ({ lang, setLang, content }) => {
  const [activeMenu, setActiveMenu] = useState('The Pinnacle');
  const [sobhaProperties, setSobhaProperties] = useState([]);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowForm(true);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const menuItems = [
    'The Pinnacle', 'The Eden', 'The Mirage',
    'The Tranquil', 'The Serene', 'The Horizon'
  ];

  // Filter properties based on active menu
  const filteredProps = sobhaProperties.filter(prop => {
    const title = (prop.title || '').toLowerCase();
    const menuKey = activeMenu.toLowerCase();

    // Check for explicit menu_title field or match within title
    if (prop.menu_title === activeMenu) return true;
    return title.includes(menuKey);
  });

  useEffect(() => {
    const fetchSobhaProperties = async () => {
      try {
        const res = await axios.get(PROPERTIES_URL);
        console.log('API Response:', res.data);
        const properties = Array.isArray(res.data) ? res.data : res.data.properties || [];
        console.log('All properties:', properties);

        // Filter out non-Sobha properties (Emaar, Meraas, Azizi, etc.) and handle status-based visibility
        const filteredProperties = properties.filter(prop => {
          // 1. Check for status 0 (Hidden)
          if (prop.status !== undefined && prop.status !== null && String(prop.status) === '0') {
            return false;
          }

          try {
            const companyData = typeof prop.company === 'string' ? JSON.parse(prop.company) : prop.company;
            const companyName = (Array.isArray(companyData) && companyData[0]?.name) ? companyData[0].name.toLowerCase() : '';

            // Exclude these specific brands, or only include if it's Sobha 
            // Since it's SobhaCentralPage, filtering for 'sobha' is the most accurate approach.
            if (companyName.includes('emaar') || companyName.includes('meraas') || companyName.includes('azizi')) {
              return false;
            }
            // Optional: return companyName.includes('sobha'); 
            // Falling back to just returning true if it's not the excluded ones, as requested.
            return true;
          } catch (e) {
            return true;
          }
        });

        setSobhaProperties(filteredProperties);
      } catch (error) {
        console.error('Error fetching Sobha properties:', error);
      }
    };
    fetchSobhaProperties();
  }, []);

  const getImageUrl = (imagePath) => {
    if (imagePath === sobhaImage || imagePath === hartlandBanner) return imagePath;
    if (!imagePath || imagePath === 'undefined' || imagePath === 'null' || imagePath.trim() === '') {
      return "https://via.placeholder.com/400x300/1A1A1A/FFD000?text=No+Image";
    }
    if (imagePath.startsWith('http') || imagePath.startsWith('data:')) return imagePath;
    const cleanPath = imagePath.startsWith('/') ? imagePath.substring(1) : imagePath;
    return `${IMAGE_BASE_URL}${cleanPath}`;
  };

  const getPropertyImage = (property) => {
    if (property.isSobhaHartland2) return hartlandBanner;
    const images = property?.images || property?.image || [];
    let parsedImages = images;
    if (typeof images === 'string') {
      try {
        parsedImages = JSON.parse(images);
      } catch (e) {
        parsedImages = [images];
      }
    }
    const imageArray = Array.isArray(parsedImages) ? parsedImages : [];
    return imageArray.find(img => img && img !== 'undefined' && img !== 'null' && img.trim() !== '') || null;
  };

  return (
    <div className="min-h-screen bg-white overflow-x-hidden font-sans">
      <Navbar lang={lang} setLang={setLang} content={content} transparentNav={true} />

      {/* 1. Full Screen Hero Image - Slow Zoom Effect */}
      <div className="relative w-full h-screen overflow-hidden">
        <motion.img
          src={sobhaImage}
          alt="Sobha Central"
          className="w-full h-full object-cover"
          initial={{ scale: 1.15 }}
          animate={{ scale: 1 }}
          transition={{ duration: 2.5, ease: "easeOut" }}
        />
        {/* Optional Overlay Gradient */}
        <div className="absolute inset-0 bg-black/10" />

        {/* --- Lead Form Overlay (Desktop) --- */}
        <div className="absolute right-6 md:right-24 top-1/2 -translate-y-1/2 z-30 hidden lg:block">
          <AnimatePresence>
            {showForm && (
              <LeadForm onClose={() => setShowForm(false)} content={content} />
            )}
          </AnimatePresence>
        </div>

        {/* --- Lead Form Overlay (Mobile) --- */}
        <div className="lg:hidden absolute bottom-12 left-6 right-6 z-40">
          <AnimatePresence>
            {showForm && (
              <div className="max-w-sm mx-auto">
                <LeadForm onClose={() => setShowForm(false)} content={content} />
              </div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* 1.5 Stats & Logo Banner - Overlapping Hero */}
      <div className="relative z-20 w-full -mt-24 md:-mt-32">
        <div className="bg-gradient-to-b from-white to-gray-50 rounded-t-[2rem] md:rounded-t-[3rem] shadow-[0_-10px_40px_rgba(0,0,0,0.1)] pt-12 md:pt-16 pb-12 px-6 lg:px-12">
          <div className="max-w-[1600px] mx-auto flex flex-col xl:flex-row items-center justify-between gap-12">

            {/* Left: Logo */}
            <div className="flex-shrink-0 flex items-center justify-center w-56 md:w-72">
              <img src={sobhaCentralLogo} alt="Sobha Central" className="w-full h-auto object-contain" />
            </div>

            {/* Divider */}
            <div className="hidden xl:block w-px h-24 bg-gray-200"></div>

            {/* Right: Stats */}
            <div className="flex-1 flex flex-col w-full">
              <div className="text-2xl sm:text-3xl md:text-4xl font-black uppercase text-theme-primary leading-tight md:leading-snug tracking-tighter mb-8 text-center xl:text-left">
                WHERE IT ALL CONNECTS: <span className="text-theme-accent">Sobha Central</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-4 w-full">
                {/* Stat 1 */}
                <div className="flex items-center xl:justify-start justify-center gap-5">
                  <MapPin size={42} strokeWidth={1} className="text-gray-500" />
                  <div className="flex flex-col text-left">
                    <div className="flex items-baseline gap-1">
                      <span className="text-2xl md:text-3xl font-medium text-gray-900"><AnimatedCounter value={160000} /></span>
                      <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">Sq. Ft.</span>
                    </div>
                    <span className="text-xs text-gray-500">of retail</span>
                  </div>
                </div>
                {/* Stat 2 */}
                <div className="flex items-center xl:justify-start justify-center gap-5">
                  <Building2 size={42} strokeWidth={1} className="text-gray-500" />
                  <div className="flex flex-col text-left">
                    <div className="flex items-baseline gap-1">
                      <span className="text-2xl md:text-3xl font-medium text-gray-900"><AnimatedCounter value={6} /></span>
                      <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wider ml-1">Premium</span>
                    </div>
                    <span className="text-xs text-gray-500">Residential Towers</span>
                  </div>
                </div>
                {/* Stat 3 */}
                <div className="flex items-center xl:justify-start justify-center gap-5">
                  <Layers size={42} strokeWidth={1} className="text-gray-500" />
                  <div className="flex flex-col text-left">
                    <div className="flex items-baseline gap-1">
                      <span className="text-2xl md:text-3xl font-medium text-gray-900"><AnimatedCounter value={94} /></span>
                      <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wider ml-1">Floors</span>
                    </div>
                    <span className="text-xs text-gray-500">Tallest Tower in Sobha Central</span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* 2. Description Section */}
      <div className="bg-gray-50 pb-16 pt-8 relative z-10 border-b border-gray-100">
        <div className="max-w-[1500px] mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left - Description */}
            <motion.div
              className="space-y-6"
              initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }}
              variants={slideInLeft}
            >
              <p className="text-theme-secondary text-lg md:text-xl leading-relaxed font-sans">
                Sobha Central is a landmark residential community rising on Sheikh Zayed Road, Dubai’s most iconic corridor. This architectural giant unites six sleek and elegant towers around lush, elevated parks, a tech-powered retail mall, along with dedicated office space, and curated lifestyle amenities. Designed as a vibrant neighborhood, it off­ers panoramic views, seamless connectivity, and a complete living experience —bringing together everything residents need at their doorstep, in one place. This is where it all connects.              </p>
            </motion.div>

            {/* Right - Image */}
            <motion.div
              className="overflow-hidden rounded-lg "
              initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }}
              variants={imageReveal}
            >
              <motion.img
                src={sobhaDisplay}
                alt="Sobha Central Display"
                className="w-full h-full object-cover"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.5 }}
              />
            </motion.div>
          </div>
        </div>
      </div>

      {/* 4. Full Screen Connect Image - Parallax feel */}
      <div className="bg-white py-8">
        <div className="max-w-[1500px] mx-auto px-6 lg:px-12">
          <motion.h2
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-black uppercase text-theme-primary leading-snug tracking-tighter font-sans mb-8 text-center"
          >
            BEYOND A <span className="text-theme-accent">RESIDENCE</span> -WHERE IT ALL CONNECTS
          </motion.h2>
        </div>
      </div>
      <div className="relative w-full h-screen overflow-hidden">
        <motion.div
          initial={{ scale: 1.1 }}
          whileInView={{ scale: 1 }}
          transition={{ duration: 1.5 }}
          className="w-full h-full"
        >
          <img
            src={sobhaConnect}
            alt="Sobha Connect"
            className="w-full h-full object-cover"
          />

          {/* Overlay Text */}
          <div className="absolute inset-0 flex flex-col items-center justify-center z-10 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.3 }}
              className="text-center"
            >
              <span className="text-white text-base md:text-3xl font-light tracking-[0.4em] uppercase block mb-0 md:mb-2 drop-shadow-lg">
                In the heart of
              </span>
              <h2 className="text-white text-6xl md:text-[12rem] font-serif italic leading-none drop-shadow-2xl">
                Luxury
              </h2>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* 5. LIVE Section */}
      <div className="bg-white py-16 overflow-hidden">
        <div className="max-w-[1500px] mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left - Image */}
            <motion.div
              className="overflow-hidden rounded-lg shadow-lg"
              initial="hidden" whileInView="visible" viewport={{ once: true }}
              variants={imageReveal}
            >
              <motion.img
                src={sobhaLive}
                alt="Sobha Live"
                className="w-full h-full object-cover"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.6 }}
              />
            </motion.div>

            {/* Right - Description */}
            <motion.div
              className="space-y-6"
              initial="hidden" whileInView="visible" viewport={{ once: true }}
              variants={slideInRight}
            >
              <div className="space-y-1">
                <motion.h3
                  variants={fadeInUp}
                  className="text-5xl md:text-[120px] font-normal uppercase text-theme-accent leading-none tracking-tighter opacity-20"
                >
                  LIVE
                </motion.h3>
                <h4 className="text-4xl md:text-5xl font-black uppercase text-theme-primary leading-snug tracking-tighter">Central Living, <span className="text-theme-accent">Redefined</span></h4>
              </div>
              <p className="text-theme-secondary text-lg md:text-xl leading-relaxed font-sans">
                Discover the epitome of connected living at Sobha Central, where luxurious residences offer unparalleled comfort and panoramic vistas. Every residence is designed to capture the essence of the city while delivering an elevated lifestyle infused with sophistication and serenity.              </p>
            </motion.div>
          </div>
        </div>
      </div>

      {/* 6. EXPERIENCE Section */}
      <div className="bg-gray-50 py-16 overflow-hidden">
        <div className="max-w-[1500px] mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left - Description */}
            <motion.div
              className="space-y-6 order-2 lg:order-1"
              initial="hidden" whileInView="visible" viewport={{ once: true }}
              variants={slideInLeft}
            >
              <div className="space-y-1">
                <motion.h3
                  variants={fadeInUp}
                  className="text-5xl md:text-[120px] font-normal uppercase text-theme-accent leading-none tracking-tighter opacity-20"
                >
                  EXPERIENCE
                </motion.h3>
                <h4 className="text-4xl md:text-5xl font-black uppercase text-theme-primary leading-snug tracking-tighter">Urban Living <span className="text-theme-accent">Reimagined</span></h4>
              </div>
              <p className="text-theme-secondary text-lg md:text-xl leading-relaxed font-sans">
                From premium office spaces, modern co-working areas & a business centre to fitness spaces and shaded green zones, everyday essentials flow seamlessly into one another  creating a community that feels alive, balanced, and built for the way people live and work. Every corner is purposefully placed  from the Grand Prayer Hall to the commercial gym, from boutique retail to the supermarket.              </p>
            </motion.div>

            {/* Right - Image */}
            <motion.div
              className="overflow-hidden rounded-lg shadow-lg order-1 lg:order-2"
              initial="hidden" whileInView="visible" viewport={{ once: true }}
              variants={imageReveal}
            >
              <motion.img
                src={sobhaLive2}
                alt="Sobha Experience"
                className="w-full h-full object-cover"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.6 }}
              />
            </motion.div>
          </div>
        </div>
      </div>

      {/* 7. DINE Section */}
      <div className="bg-white py-16 overflow-hidden">
        <div className="max-w-[1500px] mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left - Image */}
            <motion.div
              className="overflow-hidden rounded-lg shadow-lg"
              initial="hidden" whileInView="visible" viewport={{ once: true }}
              variants={imageReveal}
            >
              <motion.img
                src={sobhaLive3}
                alt="Sobha Dine"
                className="w-full h-full object-cover"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.6 }}
              />
            </motion.div>

            {/* Right - Description */}
            <motion.div
              className="space-y-6"
              initial="hidden" whileInView="visible" viewport={{ once: true }}
              variants={slideInRight}
            >
              <div className="space-y-1">
                <motion.h3
                  variants={fadeInUp}
                  className="text-7xl md:text-[120px] font-normal uppercase text-theme-accent leading-none tracking-tighter opacity-20"
                >
                  DINE
                </motion.h3>
                <h4 className="text-4xl md:text-5xl font-black uppercase text-theme-primary leading-snug tracking-tighter">Dining at Your <span className="text-theme-accent">Doorstep</span></h4>
              </div>
              <p className="text-theme-secondary text-lg md:text-xl leading-relaxed font-sans">
                Sobha Central offers a plethora of vibrant dining options, from upscale restaurants to artisanal markets and boutique cafes blending international cuisine with local flavors all minutes away, just downstairs at the podium level and mall.              </p>
            </motion.div>
          </div>
        </div>
      </div>

      {/* 7.5 CONNECTIVITY Section */}
      <div className="bg-gray-50 py-24 overflow-hidden border-t border-black/5">
        <div className="max-w-[1500px] mx-auto px-6 lg:px-12">
          {/* Header */}
          <div className="mb-16">

            <h2 className="text-4xl md:text-5xl font-black uppercase text-theme-primary leading-snug tracking-tighter font-sans mb-8 text-center">
              RIGHT IN the <span className="text-theme-accent">Centre</span> of Dubai
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            {/* Left - Map Area */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative w-full rounded-[2rem] overflow-hidden border border-[#D4AF37]/20 p-2 bg-gradient-to-br from-[#D4AF37]/10 to-transparent shadow-xl"
            >
              <div className="relative rounded-[1.5rem] overflow-hidden h-[400px] md:h-[500px] bg-white">
                <img
                  src={sobhaMaster}
                  alt="Location Map"
                  className="w-full h-full object-cover "
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-white/60 via-transparent to-white/60 pointer-events-none" />

              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-10 md:gap-y-14 py-4"
            >
              {[
                { name: "BUSINESS BAY", distance: "10 MINUTES AWAY - 8.4 KM" },
                { name: "DOWNTOWN DUBAI", distance: "10 MINUTES AWAY - 8.7 KM" },
                { name: "DUBAI MARINA", distance: "12 MINUTES AWAY - 11.5 KM" },
                { name: "JUMEIRAH LAKE TOWERS (JLT)", distance: "12 MINUTES AWAY - 10 KM" },
                { name: "DIFC", distance: "14 MINUTES AWAY - 9.2 KM" },
                { name: "SHEIKH ZAYED ROAD", distance: "IMMEDIATE ACCESS" }
              ].map((loc, idx) => (
                <div key={idx} className="flex items-start gap-4 md:gap-5">
                  <MapPin size={28} className="text-[#0B1A2E] shrink-0 mt-0.5" strokeWidth={1.5} />
                  <div className="flex flex-col">
                    <h3 className="text-xl md:text-2xl font-bold text-[#D4AF37] uppercase tracking-widest leading-none">
                      {loc.name}
                    </h3>
                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-[0.15em] mt-3 font-sans">
                      {loc.distance}
                    </p>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>

      {/* 8. Apartments Section - Animated Tabs */}
      <div className="bg-white py-24">
        <div className="max-w-[1500px] mx-auto px-6 lg:px-12">
          {/* Heading */}
          <motion.h2
            initial="hidden" whileInView="visible" viewport={{ once: true }}
            variants={fadeInUp}
            className="text-4xl md:text-5xl font-black uppercase text-theme-primary leading-snug tracking-tighter font-sans mb-8 text-center"
          >
            APARTMENTS
          </motion.h2>

          {/* Menu Navigation */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="flex flex-wrap justify-center gap-4 mb-16"
          >
            {menuItems.map((item) => (
              <motion.button
                key={item}
                onClick={() => setActiveMenu(item)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`px-6 py-3 text-sm font-bold uppercase tracking-wider transition-all rounded-md ${activeMenu === item
                  ? 'bg-[#D4AF37] text-white shadow-lg'
                  : 'bg-white text-[#0B1A2E] border border-[#0B1A2E] hover:bg-[#0B1A2E] hover:text-white'
                  }`}
              >
                {item}
              </motion.button>
            ))}
          </motion.div>

          {/* Property Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProps.length > 0 ? (
              filteredProps.map((prop) => (
                <motion.div
                  key={prop.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -8 }}
                  transition={{ duration: 0.4 }}
                >
                  <Link to={prop.isSobhaHartland2 ? '/sobha-hartland-2' : `/property/${prop.id}`}>
                    <div className="bg-[#0B1A2E] rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all">
                      <div className="relative h-[380px] overflow-hidden">
                        <motion.img
                          whileHover={{ scale: 1.1 }}
                          transition={{ duration: 0.4 }}
                          src={getImageUrl(getPropertyImage(prop))}
                          className="w-full h-full object-cover"
                          alt={prop.title}
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = "https://via.placeholder.com/400x300/1A1A1A/FFD000?text=Property";
                          }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

                        {/* Status Badges */}
                        {String(prop.status) === '2' && (
                          <div className="absolute top-4 right-4 z-10">
                            <motion.div
                              initial={{ opacity: 0, scale: 0.8 }}
                              animate={{ opacity: 1, scale: 1 }}
                              className="bg-red-600 text-white px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-tighter shadow-xl border border-red-500/50 flex items-center gap-1.5"
                            >
                              <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
                              Sold Out
                            </motion.div>
                          </div>
                        )}
                      </div>
                      <div className="p-6 flex flex-col flex-1 justify-between">
                        <div>
                          {/* 1. Developer - Small, Gold */}
                          <p className="text-[#D4AF37] text-[10px] font-bold tracking-[0.2em] uppercase mb-1">
                            {(() => {
                              try {
                                const companyData = typeof prop.company === 'string' ? JSON.parse(prop.company) : prop.company;
                                const dev = ((Array.isArray(companyData) && companyData[0]?.name) || "SOBHA REALTY").toUpperCase();
                                if (dev === 'SOBHA' || dev === 'SOBHA REALTY') return "Sobha Realty";
                                return dev;
                              } catch (e) {
                                return "Sobha Realty";
                              }
                            })()}
                          </p>
                          
                          {/* 2. Project/Building Name - Professional Typography & Fixed Height */}
                          <div className="flex items-center justify-between gap-4 mb-2 h-14">
                            <h3 className="text-lg font-black text-white leading-[1.2] uppercase line-clamp-2 flex-1 flex items-center">
                              {prop.title}
                            </h3>
                            <div className="flex-shrink-0 text-[#D4AF37] text-[10px] font-black uppercase tracking-wider">
                              VIEW DETAILS
                            </div>
                          </div>
                        </div>

                        {/* 3. Community - Subtitle for properties inside community */}
                        <div className="text-white/60 text-[11px] font-medium tracking-wide mt-auto capitalize">
                          {prop.location}
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <p className="text-gray-600 text-lg font-sans">No properties available for {activeMenu} at the moment.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 9. Sobha Central FAQ Section */}
      <div className="bg-gray-50 py-24 border-t border-gray-100">
        <div className="max-w-[1000px] mx-auto px-6 lg:px-12">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-black uppercase text-theme-primary leading-snug tracking-tighter font-sans mb-8 text-center"
          >
            Sobha Central <span className="text-theme-accent">FAQ</span>
          </motion.h2>

          <div className="space-y-4">
            {[
              {
                q: "What is Sobha Central?",
                a: "Sobha Central is a new, mixed-use development by Sobha Realty, featuring six premium residential towers located on Sheikh Zayed Road in Dubai. It blends luxury living with commercial spaces, open parks, and retail facilities."
              },
              {
                q: "What makes Sobha Central unique compared to other developments in Dubai?",
                a: "Sobha Central stands out with its iconic location on Sheikh Zayed Road, six premium residential towers, lush, elevated parks, and a tech-powered retail mall, offering a fully integrated lifestyle experience."
              },
              {
                q: "What types of residences are available at Sobha Central?",
                a: "Sobha Central offers a range of luxury apartments for sale in Dubai, designed with spacious layouts, modern interiors, and panoramic city views. The towers will offer 1- and 2-bedroom residential units, designed for luxury and comfort, with breathtaking views."
              },
              {
                q: "What makes Sobha Central unique?",
                a: "One of the standout features is a 360-metre-tall tower with 95 floors, making it the tallest residential tower in the JLT area and one of the tallest on Sheikh Zayed Road."
              },
              {
                q: "What amenities are available at Sobha Central?",
                a: "Sobha Central features elevated parks, a tech-powered retail mall, premium office spaces, modern co-working areas, fitness centres, shaded green zones, and curated lifestyle amenities."
              },
              {
                q: "What sustainability features are included in Sobha Central?",
                a: "The development is designed with eco-friendly materials, energy-efficient systems, and landscaped green zones to promote sustainability."
              }
            ].map((faq, index) => (
              <SobhaFaqItem key={index} faq={faq} index={index} />
            ))}
          </div>
        </div>
      </div >

      <Footer content={content} />
    </div >
  );
};

export default SobhaCentralPage;