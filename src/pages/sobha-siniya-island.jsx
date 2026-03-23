import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView, useMotionValue, useSpring, AnimatePresence } from 'framer-motion';
import { MapPin, Building2, Layers, Bed, Bath, Maximize2, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import LeadForm from '../components/LeadForm';

// Assets
import hartlandsec2 from '../assets/hartlandsec2.webp';
import Dinehartland from '../assets/Dinehartland.webp';
import Entertainmenthartland from '../assets/Entertainmenthartland.webp';
import Livehartland from '../assets/Livehartland.webp';
import masterhartland from '../assets/masterhartland.webp';
import sobhaImage from '../assets/sobhaimage.webp';
import siniyabanner from '../assets/siniyabanner.webp';
import siniyasec from '../assets/siniyasec.webp';
import siniyalogo from '../assets/siniyalogo.svg'
import siniyamain from '../assets/siniyamain.webp'
import siniyalive from '../assets/siniyalive1.webp'
import siniyalive2 from '../assets/siniyalive2.webp'
import siniyalive3 from '../assets/siniyalive3.webp'
import siniyamaster from '../assets/siniyamaster.webp'
import { DubaiIcon, SharjahIcon, MarjanIslandIcon } from '../components/CityIcons';

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

const SobhaSiniyaIslandPage = ({ lang, setLang, content }) => {
    const [activeMenu, setActiveMenu] = useState('Marina Residences');
    const [sobhaProperties, setSobhaProperties] = useState([]);
    const [showForm, setShowForm] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowForm(true);
        }, 2000);
        return () => clearTimeout(timer);
    }, []);

    const menuItems = [
        'Marina Residences', 'Siniya Island Villas', 'beach residences',
    ];

    // Filter properties based on active menu
    const filteredProps = sobhaProperties.filter(prop => {
        const title = prop.title.toLowerCase();
        const menuKey = activeMenu.toLowerCase();

        if (menuKey === 'riverside-crescent') {
            return title.includes('riverside');
        }

        const menuSearch = menuKey.replace(/-/g, ' ');
        return title.includes(menuSearch);
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
        if (imagePath === sobhaImage || imagePath === siniyabanner) return imagePath;
        if (!imagePath || imagePath === 'undefined' || imagePath === 'null' || imagePath.trim() === '') {
            return "https://via.placeholder.com/400x300/1A1A1A/FFD000?text=No+Image";
        }
        if (imagePath.startsWith('http') || imagePath.startsWith('data:')) return imagePath;
        const cleanPath = imagePath.startsWith('/') ? imagePath.substring(1) : imagePath;
        return `${IMAGE_BASE_URL}${cleanPath}`;
    };

    const getPropertyImage = (property) => {
        if (property.isSobhaCentral) return sobhaImage;
        if (property.isSobhaSiniyaIsland) return siniyabanner;
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
                    src={siniyabanner}
                    alt="Sobha Siniya Island"
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
                            <img src={siniyalogo} alt="Sobha Central" className="w-full h-auto object-contain" />
                        </div>

                        {/* Divider */}
                        <div className="hidden xl:block w-px h-24 bg-gray-200"></div>

                        {/* Right: Stats */}
                        <div className="flex-1 flex flex-col w-full">
                            <div className="text-2xl sm:text-3xl md:text-4xl font-black uppercase text-theme-primary leading-tight md:leading-snug tracking-tighter mb-8 text-center xl:text-left">
                                Live the Good Life: <span className="text-theme-accent">Sobha Siniya Island – UAE’s Most Natural Pristine Island</span>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-4 w-full">
                                {/* Stat 1 */}
                                <div className="flex items-center xl:justify-start justify-center gap-5">
                                    <Maximize2 size={42} strokeWidth={1} className="text-gray-500" />
                                    <div className="flex flex-col text-left">
                                        <div className="flex items-baseline gap-1">
                                            <span className="text-2xl md:text-3xl font-medium text-gray-900"><AnimatedCounter value={23} /></span>
                                            <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">Million Sq. Ft.</span>
                                        </div>
                                        <span className="text-xs text-gray-500">Total Land Area</span>
                                    </div>
                                </div>
                                {/* Stat 2 */}
                                <div className="flex items-center xl:justify-start justify-center gap-5">
                                    <Building2 size={42} strokeWidth={1} className="text-gray-500" />
                                    <div className="flex flex-col text-left">
                                        <div className="flex items-baseline gap-1">
                                            <span className="text-2xl md:text-3xl font-medium text-gray-900"><AnimatedCounter value={2} /></span>
                                            <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wider ml-1"></span>
                                        </div>
                                        <span className="text-xs text-gray-500"> Upcoming Luxury Resorts</span>
                                    </div>
                                </div>
                                {/* Stat 3 */}
                                <div className="flex items-center xl:justify-start justify-center gap-5">
                                    <Layers size={42} strokeWidth={1} className="text-gray-500" />
                                    <div className="flex flex-col text-left">
                                        <div className="flex items-baseline gap-1">
                                            <span className="text-2xl md:text-3xl font-medium text-gray-900"><AnimatedCounter value={47} /></span>
                                            <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wider ml-1">%</span>
                                        </div>
                                        <span className="text-xs text-gray-500"> Open Green Spaces</span>
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
                                Sobha Siniya Island, situated 50 minutes from Dubai, beautifully harmonises luxury with nature, offering an exquisite collection of resorts, mansions, villas and residences. This island paradise captures the tranquillity of untouched natural beauty, preserving its pristine mangroves and wildlife such as rare turtles, gazelles, and flamingos. Experience the vibrant pulse of UAE’s cosmopolitan life while enjoying the peaceful seclusion of island living, connected by a 1.7 km bridge.
                            </p>
                        </motion.div>

                        {/* Right - Image */}
                        <motion.div
                            className="overflow-hidden rounded-lg "
                            initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }}
                            variants={imageReveal}
                        >
                            <motion.img
                                src={siniyasec}
                                alt="Sobha Siniya Island Description"
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
                        Welcome<span className="text-theme-accent"> to your </span>Island Lifestyle
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
                        src={siniyamain}
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
                                src={siniyalive}
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
                                    className="text-5xl md:text-[90px] font-normal uppercase text-theme-accent leading-none tracking-tighter opacity-20"
                                >
                                    LIVE
                                </motion.h3>
                                <h4 className="text-4xl md:text-5xl font-black uppercase text-theme-primary leading-snug tracking-tighter">Crafting a Lifestyle of Your <span className="text-theme-accent">Dreams</span></h4>
                            </div>
                            <p className="text-theme-secondary text-lg md:text-xl leading-relaxed font-sans">
                                Discover the epitome of island living with our luxurious mansions, villas and fully furnished Beach Residences. At Sobha Siniya Island each home and residence boast breathtaking infinite sea views and exceptional comfort.</p>
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
                                    className="text-5xl md:text-[90px] font-normal uppercase text-theme-accent leading-none tracking-tighter opacity-20"
                                >
                                    Entertainment
                                </motion.h3>
                                <h4 className="text-5xl md:text6xl font-black uppercase text-theme-primary leading-snug tracking-tighter">Leisure that Refreshes Your <span className="text-theme-accent">Soul</span></h4>
                            </div>
                            <p className="text-theme-secondary text-lg md:text-xl leading-relaxed font-sans">
                                Each day brings a chance to discover new adventures and endless excitement with our exceptional range of entertainment options. Enjoy the challenge of our golf course, unwind at the clubhouse, revel in the luxury of the yacht club, stroll along the scenic boardwalk, or dive into the thrill of exhilarating water sports.


                            </p>
                        </motion.div>

                        {/* Right - Image */}
                        <motion.div
                            className="overflow-hidden rounded-lg shadow-lg order-1 lg:order-2"
                            initial="hidden" whileInView="visible" viewport={{ once: true }}
                            variants={imageReveal}
                        >
                            <motion.img
                                src={siniyalive2}
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
                                src={siniyalive3}
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
                                    className="text-7xl md:text-[100px] font-normal uppercase text-theme-accent leading-none tracking-tighter opacity-20"
                                >
                                    DINE
                                </motion.h3>
                                <h4 className="text-4xl md:text-5xl font-black uppercase text-theme-primary leading-snug tracking-tighter">Indulge in Artisanal <span className="text-theme-accent">Delicacies</span></h4>
                            </div>
                            <p className="text-theme-secondary text-lg md:text-xl leading-relaxed font-sans">Clubhouse and Boardwalk: Indulge in exquisite cuisine at our Clubhouse and savour a delightful meal at the fine dining restaurants while enjoying the scenic boardwalk.

                            </p>
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
                                    src={siniyamaster}
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
                                { name: "MARJAN ISLAND", distance: "10 MINUTES AWAY" },
                                { name: "SHARJAH", distance: "30 MINUTES AWAY" },
                                { name: "DUBAI", distance: "50 MINUTES AWAY" },

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
                                {item.replace(/-/g, ' ')}
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
                                >
                                    <Link to={prop.isSobhaCentral ? '/sobha-central' : prop.isSobhaHartland2 ? '/sobha-hartland-2' : `/property/${prop.id}`}>
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
                                <p className="text-gray-600 text-lg font-sans">No properties available at the moment.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* 9. FAQ Section */}
            <div className="bg-gray-50 py-24 border-t border-gray-100">
                <div className="max-w-[1000px] mx-auto px-6 lg:px-12">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-4xl md:text-5xl font-black uppercase text-theme-primary leading-snug tracking-tighter font-sans mb-8 text-center"
                    >
                        Sobha Siniya Island <span className="text-theme-accent">FAQ</span>
                    </motion.h2>

                    <div className="space-y-4">
                        {[
                            {
                                q: "Is Sobha Siniya Island a good place to live?",
                                a: (
                                    <div className="space-y-4">
                                        <p>Sobha Siniya Island is an extraordinary destination for those seeking a tranquil yet luxurious lifestyle. This island offers a harmonious combination of unspoiled natural beauty and modern living. With meticulously designed villas, waterfront mansions, and apartments, Sobha Siniya Island stands as a testament to Sobha Realty’s commitment to exceptional quality and sustainability.</p>
                                        <p><strong>Key Advantages of Living on Sobha Siniya Island:</strong></p>
                                        <ul className="list-disc pl-5 space-y-2">
                                            <li><strong>Serene Natural Beauty:</strong> This pristine paradise is surrounded by lush mangroves, white sand beaches, and rich wildlife, including gazelles, oryx, flamingos, and rare turtles.</li>
                                            <li><strong>Luxurious Residences:</strong> Sobha Siniya Island offers exquisite villas, waterfront mansions, apartments and resorts. Each home is crafted to provide ultimate comfort and elegance.</li>
                                            <li><strong>Exclusive Amenities:</strong> Residents can enjoy pristine beaches, an 18-hole golf course, and resort-inspired facilities, including fine dining and a bustling retail boulevard.</li>
                                            <li><strong>Accessibility:</strong> Despite its secluded charm, the island is just 50 minutes from Dubai, 30 minutes from Sharjah, and 10 minutes from Al Marjan Island.</li>
                                            <li><strong>Cultural and Historical Significance:</strong> With roots tracing back to being the oldest pearl fishing town in the Persian Gulf, the island also holds archaeological treasures like an ancient monastery.</li>
                                        </ul>
                                        <p>In essence, Sobha Siniya Island offers an unmatched living experience, seamlessly merging luxurious modernity with untouched nature.</p>
                                    </div>
                                )
                            },
                            {
                                q: "What amenities does Sobha Siniya Island offer?",
                                a: (
                                    <div className="space-y-4">
                                        <p>Sobha Siniya Island in Umm Al Quwain offers an array of luxurious amenities that blend leisure, comfort, and nature, providing an unparalleled living experience. Here’s what residents can enjoy:</p>
                                        <ul className="list-disc pl-5 space-y-2">
                                            <li><strong>Exclusive Recreational Facilities:</strong> An 18-hole golf course surrounded by lush greenery and the soothing rhythm of the sea creates an ideal setting for golf enthusiasts.</li>
                                            <li><strong>Marina Lifestyle:</strong> A private marina offers boat docking and nautical adventures, complemented by a vibrant boardwalk featuring charming cafés, restaurants, and lively nightlife.</li>
                                            <li><strong>Luxurious Wellness and Leisure:</strong> The island’s clubhouse, resort facilities, and private beaches ensure that relaxation and recreation are always within reach.</li>
                                            <li><strong>Nature-Inspired Living:</strong> Immerse yourself in the island’s untouched natural beauty, with pristine beaches, serene mangroves, and thriving wildlife.</li>
                                            <li><strong>Retail and Dining:</strong> A dynamic retail boulevard invites residents to indulge in fine dining, boutique shopping, and leisurely strolls along breezy sidewalks.</li>
                                        </ul>
                                    </div>
                                )
                            },
                            {
                                q: "How does Sobha Siniya Island balance luxury and sustainability?",
                                a: (
                                    <div className="space-y-4">
                                        <p>Sobha Siniya Island masterfully intertwines luxury living with sustainable practices, creating an environment that respects nature while offering modern comforts.</p>
                                        <ul className="list-disc pl-5 space-y-2">
                                            <li><strong>Preservation of Natural Beauty:</strong> The island prioritises conservation by maintaining its pristine mangroves, white sand beaches, and diverse wildlife. This commitment ensures the natural habitat thrives alongside human habitation.</li>
                                            <li><strong>Thoughtful Community Design:</strong> With 46% of the island dedicated to open green spaces, residents enjoy a harmonious blend of luxurious living and a serene natural environment.</li>
                                            <li><strong>Eco-Friendly Living:</strong> The architecture and planning incorporate sustainable materials and practices, aligning with Sobha Realty’s reputation for excellence and environmental consciousness.</li>
                                            <li><strong>Exclusive yet Connected:</strong> While offering peaceful seclusion, the island maintains accessibility to key UAE cities, reducing the environmental impact of extended commutes.</li>
                                        </ul>
                                    </div>
                                )
                            },
                            {
                                q: "Is investing in Sobha Siniya Island a good idea?",
                                a: (
                                    <div className="space-y-4">
                                        <p>Investing in Sobha Siniya Island offers an exceptional opportunity for those seeking both capital appreciation and attractive rental yields. Here’s why it stands out as a prime investment choice:</p>
                                        <ul className="list-disc pl-5 space-y-2">
                                            <li><strong>High Demand for Luxury Living:</strong> With its unique blend of serene island life and proximity to UAE’s cosmopolitan hubs, the island appeals to high-net-worth individuals and expatriates.</li>
                                            <li><strong>Diverse Property Options:</strong> The island offers a range of villas, waterfront mansions, and apartments, catering to varying investor preferences.</li>
                                            <li><strong>Strong Rental Yields:</strong> The combination of luxurious amenities, unparalleled natural surroundings, and exclusivity positions it to deliver robust rental returns.</li>
                                            <li><strong>Sustainability Appeal:</strong> As eco-conscious living gains traction, properties that prioritise environmental harmony are increasingly valued by investors.</li>
                                        </ul>
                                    </div>
                                )
                            },
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

export default SobhaSiniyaIslandPage;