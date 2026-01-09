import React, { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom"; 
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { 
  TrendingUp, UserCheck, ShieldCheck, MapPin, Plus, 
  ArrowRight, Handshake, Send, Phone, Mail, Trash2, Edit, 
  ChevronDown, Quote 
} from "lucide-react";
import emailjs from '@emailjs/browser'; 
import axios from 'axios'; 
import TestimonialsSection from './components/sections/TestimonialsSection';
import FinancePartnersSection from './components/sections/FinancePartnersSection';
import NewsletterSection from './components/sections/NewsletterSection';
import { 
  translations, 
  lifeInDubaiData, 
  locationsData,
  processSteps,  
  faqs,          
  testimonials   
} from "./data/constants";

import { staggerContainer, fadeInUp, scaleIn } from "./utils/animations";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import DubaiMapSection from "./components/sections/DubaiMapSection";
import aboutBusinessImg from './assets/aboutbusiness.jpg';


// --- HELPER: Admin Controls (Edit/Delete Buttons) ---
const AdminControls = ({ onDelete, onEdit }) => (
  <div className="absolute top-4 right-4 z-50 flex gap-2">
    <button 
      onClick={(e) => { e.preventDefault(); e.stopPropagation(); onEdit(); }}
      className="p-2 bg-blue-600/80 text-white rounded-full hover:bg-blue-500 backdrop-blur-md transition-all shadow-lg"
      title="Edit"
    >
      <Edit size={14} />
    </button>
    <button 
      onClick={(e) => { e.preventDefault(); e.stopPropagation(); onDelete(); }}
      className="p-2 bg-red-600/80 text-white rounded-full hover:bg-red-500 backdrop-blur-md transition-all shadow-lg"
      title="Delete"
    >
      <Trash2 size={14} />
    </button>
  </div>
);

// --- HELPER: Add Card ---
const AdminAddCard = ({ route, title }) => (
  <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} className="group h-full min-h-[200px] cursor-pointer">
    <Link to={route} className="block h-full">
      <div className="h-full relative overflow-hidden bg-[#0A0A0A] border-2 border-dashed border-white/10 flex flex-col items-center justify-center text-center group-hover:border-[#D4AF37] transition-colors duration-300 rounded-[2rem]">
        <div className="h-12 w-12 bg-[#D4AF37]/10 rounded-full flex items-center justify-center text-[#D4AF37] mb-4 group-hover:bg-[#D4AF37] group-hover:text-black transition-all">
          <Plus size={24} />
        </div>
        <span className="text-gray-500 text-[10px] font-bold uppercase tracking-widest group-hover:text-white transition-colors">{title}</span>
      </div>
    </Link>
  </motion.div>
);

function Home({ propertiesData, user, onLogout, whyDubaiCards, services, partners, emirates }) {
  const [lang, setLang] = useState("EN");
  const [activeFilter, setActiveFilter] = useState("All");
  const navigate = useNavigate(); 
  const content = translations[lang] || translations.EN;
  
  // Contact Form State
  const formRef = useRef();
  const [contactStatus, setContactStatus] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);

  // --- DELETE HANDLER ---
  const handleDelete = async (item, section) => {
    if (!window.confirm("Are you sure you want to delete this?")) return;

    if (item._id) {
        try {
            await axios.delete(`http://localhost:5000/api/${section}/${item._id}`);
            alert("Deleted successfully. Page will refresh.");
            window.location.reload(); 
        } catch (error) {
            console.error("Delete Error:", error);
            alert("Failed to delete from server.");
        }
    } else {
        alert("This is a static demo item. You cannot delete it permanently.");
    }
  };

  const handleEdit = (item, route) => {
    navigate(route, { state: { data: item } });
  };

  // Data assignment
  const displayProperties = propertiesData || [];
  const displayServices = services || [];
  const displayPartners = partners || [];
  const displayEmirates = emirates || [];
  const displayWhyDubai = whyDubaiCards || [];

  const whyIcons = [TrendingUp, UserCheck, ShieldCheck]; 
  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 500], [0, 150]);
  
  const filteredProps = activeFilter === "All" || activeFilter === "الكل" 
    ? displayProperties 
    : displayProperties.filter(p => p.category === activeFilter);

  // --- EMAILJS CONTACT SUBMIT ---
  const handleContactSubmit = (e) => {
    e.preventDefault();
    setIsSending(true);
    setContactStatus("");

    // YOUR EMAILJS KEYS
    const SERVICE_ID = "service_4rzw4x2"; 
    const TEMPLATE_ID = "template_bhoabnf"; 
    const PUBLIC_KEY = "qnYtJgjRobMH-m7lu";

    emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, formRef.current, PUBLIC_KEY)
      .then((result) => {
        console.log("Success:", result.text);
        setContactStatus("Message Sent Successfully!");
        formRef.current.reset();
      }, (error) => {
        console.error("Error:", error.text);
        setContactStatus("Failed to send. Please try again.");
      })
      .finally(() => setIsSending(false));
  };

  return (
    <div dir={content.dir} className="min-h-screen bg-black text-white selection:bg-[#D4AF37] selection:text-black font-sans scroll-smooth">
      <Navbar lang={lang} setLang={setLang} content={content} user={user} onLogout={onLogout} />

      {/* Hero */}
      <section id="home" className="relative h-screen flex items-center px-6 md:px-24 pt-20 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-black/60 z-10" />
          <motion.img initial={{ scale: 1.2 }} animate={{ scale: 1 }} transition={{ duration: 2, ease: "easeOut" }} src="https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1920" alt="Dubai Night" className="w-full h-full object-cover" />
        </div>
        <motion.div style={{ y: heroY }} initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 1 }} className="relative z-20 max-w-4xl">
          <div className="flex items-center gap-4 mb-6"><div className="h-[1px] w-12 bg-[#D4AF37]" /><span className="text-[13px] font-bold tracking-[0.4em] text-[#D4AF37] uppercase">{content.topTag}</span></div>
          {/* SMALLER HEADLINE AS REQUESTED */}
          <motion.h1 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ delay: 0.3, duration: 0.8 }} 
            className="text-3xl md:text-5xl lg:text-4xl font-bold leading-tight mb-6 uppercase tracking-tight max-w-2xl"
          >
            {content.headline}
          </motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }} className="text-[10px] md:text-sm text-white mb-10 font-bold tracking-[0.1em] uppercase border-l-2 border-[#D4AF37] pl-6 max-w-2xl">{content.subHeadline}</motion.p>
        </motion.div>
      </section>

      {/* About */}
      <section id="aboutus" className="relative py-24 md:py-40 bg-black border-t border-white/5 overflow-hidden">
        <div className="container mx-auto px-6 md:px-24 grid grid-cols-1 lg:grid-cols-2 gap-16 md:gap-32 items-start">
            <motion.div variants={staggerContainer} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }} className="space-y-12">
              <motion.div variants={fadeInUp} className="space-y-4">
                <span className="text-[#D4AF37] text-[12px] font-black uppercase tracking-[0.5em] block">{content.aboutTitle}</span>
                <h2 className="text-3xl md:text-5xl font-bold uppercase tracking-tight leading-none text-white">About <span className="text-[#D4AF37]">V5C Properties</span></h2>
              </motion.div>
              <motion.p variants={fadeInUp} className="text-gray-400 text-sm md:text-lg leading-relaxed max-w-xl font-medium">{content.aboutText}</motion.p>
              <div className="relative pl-8 space-y-10">
                <motion.div initial={{ height: 0 }} whileInView={{ height: "100%" }} transition={{ duration: 1.5, delay: 0.5 }} className="absolute left-0 top-2 bottom-2 w-[2px] bg-gradient-to-b from-[#D4AF37] to-white/10" viewport={{ once: true }}/>
                {[ { year: "2002", title: "MAC Real Estate Founded", desc: "Elite roots in UAE market." }, { year: "2025", title: "V5C Global Relaunch", desc: "Developer-led turnkey innovation." } ].map((item, i) => (
                  <motion.div key={i} variants={fadeInUp} whileHover={{ x: 10, color: "#D4AF37" }} className="relative group transition-colors duration-300">
                    <div className="absolute -left-[38px] top-1 h-[20px] w-[20px] rounded-full bg-black border-2 border-[#D4AF37] z-10" />
                    <span className="text-[#D4AF37] text-sm font-black tracking-widest block mb-1">{item.year}</span>
                    <h4 className="text-white text-sm font-black uppercase tracking-wider mb-2 group-hover:text-white transition-colors">{item.title}</h4>
                    <p className="text-gray-500 text-[11px] uppercase tracking-wide font-bold">{item.desc}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
            <div className="flex flex-col space-y-8">
              <motion.div initial={{ opacity: 0, rotateY: 90, scale: 0.8 }} whileInView={{ opacity: 1, rotateY: 0, scale: 1 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 1.2, ease: "easeOut" }} whileHover={{ scale: 1.05, rotateZ: 2 }} className="relative rounded-2xl overflow-hidden border border-white/20 shadow-2xl group z-10">
                <img src={aboutBusinessImg} alt="Dubai Real Estate Business" className="w-full h-[300px] md:h-[450px] object-cover grayscale hover:grayscale-0 transition-all duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </motion.div>
              <motion.div initial={{ opacity: 0, scale: 0.5 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true, amount: 0.5 }} transition={{ delay: 0.4, duration: 0.8, type: "spring" }} className="bg-black border border-[#D4AF37]/40 p-8 rounded-2xl flex flex-col items-center text-center backdrop-blur-sm">
                <ShieldCheck size={28} className="text-[#D4AF37] mb-4"/><span className="text-white text-4xl font-black block tracking-tighter">23+</span><span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#D4AF37] mt-2">Years Industry Expertise</span>
              </motion.div>
            </div>
        </div>
      </section>

      {/* Emirates Section */}
      <section id="emirates" className="relative py-24 md:py-48 bg-[#050505] overflow-hidden">
    {/* Ambient Background Animation */}
    <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
        <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-[#D4AF37]/5 rounded-full blur-[100px] animate-pulse" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[400px] h-[400px] bg-[#D4AF37]/5 rounded-full blur-[100px] animate-pulse delay-700" />
    </div>

    <div className="container mx-auto px-6 md:px-24 grid grid-cols-1 lg:grid-cols-2 gap-16 md:gap-32 items-center relative z-10">
        
        {/* Left Content */}
        <motion.div variants={staggerContainer} initial="hidden" whileInView="show" viewport={{once:true}} className="space-y-10">
            <div className="space-y-6">
                <div className="flex items-center gap-4">
                    <motion.div initial={{ width: 0 }} whileInView={{ width: 48 }} transition={{ duration: 0.8 }} className="h-px bg-[#D4AF37]" />
                    <span className="text-[#D4AF37] text-[10px] font-black uppercase tracking-[0.8em]">{content.emiratesTitle}</span>
                </div>
                <h2 className="text-2xl md:text-3xl font-black uppercase text-white leading-snug tracking-tighter">
                    About Dubai & <br /> 
                    <span className="text-transparent" style={{ WebkitTextStroke: '1px #D4AF37' }}>The Seven Emirates</span>
                </h2>
            </div>
            <motion.p variants={fadeInUp} className="text-gray-300 text-base md:text-lg leading-relaxed font-medium">
                {content.emiratesMainContent}
            </motion.p>
        </motion.div>

        {/* Right Grid (Cards) */}
        <motion.div variants={staggerContainer} initial="hidden" whileInView="show" viewport={{once:true}} className="grid grid-cols-2 sm:grid-cols-3 gap-4 md:gap-6">
            {displayEmirates.map((emirate, i) => (
            <motion.div 
                key={i} 
                variants={scaleIn}
                whileHover={{ scale: 1.02 }} 
                className="group relative rounded-[2rem] h-[190px] w-full overflow-hidden cursor-pointer"
            >
                {/* 1. MOVING BORDER ANIMATION LAYER */}
                {/* The spinning gradient container */}
                <div className="absolute inset-0 z-0">
                    <div className="absolute inset-[-50%] animate-[spin_3s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#0000_0%,#D4AF37_50%,#0000_100%)] opacity-30 group-hover:opacity-100 transition-opacity duration-500" />
                </div>

                {/* 2. INNER CONTENT CARD (Black background sitting on top of the spinner) */}
                <div className="absolute inset-[1.5px] bg-[#0A0A0A] rounded-[calc(2rem-1px)] z-10 p-6 flex flex-col justify-between transition-colors duration-300 group-hover:bg-[#0f0f0f]">
                    
                    {/* ADMIN CONTROLS (Kept z-index high) */}
                    {user && user.role === 'admin' && emirate._id && (
                        <div className="relative z-50">
                             <AdminControls 
                                onDelete={() => handleDelete(emirate, 'emirates')} 
                                onEdit={() => handleEdit(emirate, '/admin/add-emirate')} 
                            />
                        </div>
                    )}

                    {/* Card Text Content */}
                    <div className="relative z-20 space-y-2">
                        <h3 className="text-white text-sm font-black uppercase group-hover:text-[#D4AF37] transition-colors duration-300">
                            {emirate.name}
                        </h3>
                    </div>
                    <p className="relative z-20 text-gray-500 text-[9px] font-bold uppercase tracking-wider group-hover:text-gray-300 transition-colors duration-300">
                        {emirate.desc}
                    </p>
                </div>
            </motion.div>
            ))}
            
            {user && user.role === 'admin' && <AdminAddCard route="/admin/add-emirate" title="Add Emirate" />}
        </motion.div>
    </div>
</section>

      <DubaiMapSection content={content} />

      {/* Why Dubai */}
      <section id="whydubai" className="relative py-24 md:py-48 bg-black overflow-hidden">
    
    {/* Ambient Background (Subtle Gold Fog) */}
    <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
        <div className="absolute top-[20%] right-[-10%] w-[600px] h-[600px] bg-[#D4AF37]/5 rounded-full blur-[120px] animate-pulse duration-[4000ms]" />
        <div className="absolute bottom-[10%] left-[-5%] w-[500px] h-[500px] bg-[#D4AF37]/5 rounded-full blur-[100px] animate-pulse delay-1000" />
    </div>

    <div className="container mx-auto px-6 md:px-24 relative z-10 text-center mb-24 space-y-6">
        <motion.span initial={{ opacity: 0 }} whileInView={{ opacity: 0.6 }} viewport={{once:true}} className="text-[#D4AF37] text-[10px] font-black uppercase tracking-[0.8em] block">
            Investment Rationale
        </motion.span>
        <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{once:true}} className="text-4xl md:text-6xl font-black uppercase text-white tracking-tighter">
            {content.whyTitle}
        </motion.h2>
        <div className="h-px w-20 bg-[#D4AF37] mx-auto" />
    </div>

    <div className="container mx-auto px-6 md:px-24 grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 relative z-10">
        {displayWhyDubai.map((card, i) => { 
        const Icon = whyIcons[i % whyIcons.length]; 
        return (
            <motion.div 
                key={i} 
                variants={fadeInUp} 
                initial="hidden" 
                whileInView="show" 
                viewport={{once:true}} 
                whileHover={{ y: -10 }} 
                className="relative group w-full h-full min-h-[450px]"
            >
                {/* --- 1. THE GLOWING BLUR LAYER (Behind) --- */}
                {/* This creates the outer "Glow" effect */}
                <div className="absolute -inset-0.5 bg-gradient-to-r from-[#D4AF37] to-[#856404] rounded-[2.5rem] blur opacity-20 group-hover:opacity-60 transition duration-1000 group-hover:duration-200" />

                {/* --- 2. THE MOVING BORDER LAYER --- */}
                <div className="absolute inset-0 rounded-[2.5rem] overflow-hidden">
                     {/* The Spinning Snake Border */}
                    <div className="absolute inset-[-100%] animate-[spin_4s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#0000_0%,#856404_50%,#D4AF37_100%)] opacity-100" />
                </div>

                {/* --- 3. THE CARD CONTENT (Masking the center) --- */}
                {/* inset-[2px] defines the thickness of the moving border */}
                <div className="relative h-full bg-[#080808] rounded-[calc(2.5rem-2px)] m-[2px] p-10 lg:p-12 flex flex-col z-10 overflow-hidden">
                    
                    {/* ADMIN CONTROLS */}
                    {user && user.role === 'admin' && card._id && (
                        <div className="absolute top-6 right-6 z-50">
                            <AdminControls 
                                onDelete={() => handleDelete(card, 'whydubai')} 
                                onEdit={() => handleEdit(card, '/admin/add-whydubai')} 
                            />
                        </div>
                    )}

                    {/* Icon */}
                    <div className="h-16 w-16 border border-white/10 rounded-2xl flex items-center justify-center text-[#D4AF37] mb-10 group-hover:bg-[#D4AF37] group-hover:text-black transition-all duration-300 group-hover:shadow-[0_0_20px_rgba(212,175,55,0.6)]">
                        <Icon size={30} strokeWidth={1.5} />
                    </div>

                    {/* Title */}
                    <h3 className="text-white text-2xl font-black uppercase mb-4 tracking-tighter group-hover:text-[#D4AF37] transition-colors duration-300">
                        {card.title}
                    </h3>

                    {/* Description */}
                    {card.text && (
                        <p className="text-gray-400 text-xs font-medium leading-relaxed mb-8 group-hover:text-gray-300">
                            {card.text}
                        </p>
                    )}

                    {/* List Items */}
                    <ul className="space-y-4 mt-auto">
                        {Array.isArray(card.points) && card.points.map((point, idx) => (
                            <li key={idx} className="flex items-start gap-4 text-gray-400 text-[11px] font-bold uppercase tracking-widest group/item">
                                {/* Dot glows on hover */}
                                <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[#D4AF37]/30 group-hover:bg-[#D4AF37] group-hover:shadow-[0_0_8px_#D4AF37] transition-all duration-300" />
                                <span className="group-hover/item:text-white transition-colors duration-300">{point}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </motion.div>
        )})}
        
        {user && user.role === 'admin' && <AdminAddCard route="/admin/add-whydubai" title="Add Card" />}
    </div>
</section>

      {/* Life in Dubai */}
      <section id="life" className="py-24 md:py-40 bg-[#050505] border-t border-white/5 relative overflow-hidden">
    
    {/* Ambient Background Glow */}
    <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#D4AF37]/5 rounded-full blur-[120px] pointer-events-none" />

    {/* Section Header */}
    <div className="container mx-auto px-6 md:px-24 text-center mb-16 relative z-10">
        <motion.span initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} className="text-[#D4AF37] text-[12px] font-black uppercase tracking-[0.5em] block mb-4">
            Lifestyle Excellence
        </motion.span>
        <h2 className="text-3xl md:text-6xl font-bold uppercase text-white tracking-tighter">
            Life in <span className="text-[#D4AF37]">Dubai</span>
        </h2>
    </div>

    {/* MOVING ANIMATION CONTAINER (Infinite Marquee) */}
    <div className="relative w-full overflow-hidden z-10">
        {/* We duplicate the data array to create a seamless loop */}
        <motion.div 
            className="flex gap-8 w-max"
            animate={{ x: ["0%", "-50%"] }}
            transition={{ 
                ease: "linear", 
                duration: 40, // Adjust speed here (higher number = slower)
                repeat: Infinity 
            }}
            whileHover={{ animationPlayState: "paused" }} // Optional: Pause on hover if you use CSS animation, for Framer we usually rely on user interaction to stop or just let it flow.
        >
            {[...lifeInDubaiData, ...lifeInDubaiData].map((item, i) => (
                <div 
                    key={i} 
                    className="group relative h-[500px] w-[350px] md:w-[400px] flex-shrink-0 rounded-[2.5rem]"
                >
                    {/* 1. GLOWING BLUR BEHIND (The Outer Glow) */}
                    <div className="absolute -inset-1 bg-gradient-to-br from-[#D4AF37]/20 to-transparent rounded-[2.5rem] blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                    {/* 2. MOVING BORDER ANIMATION LAYER */}
                    <div className="absolute inset-0 rounded-[2.5rem] overflow-hidden z-0">
                        {/* The Spinning Conic Gradient */}
                        <div className="absolute inset-[-100%] animate-[spin_4s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#0000_0%,#856404_50%,#D4AF37_100%)] opacity-100" />
                    </div>

                    {/* 3. INNER CARD CONTENT (Masks the border) */}
                    {/* inset-[2px] creates the 2px border thickness */}
                    <div className="absolute inset-[2px] bg-black rounded-[calc(2.5rem-2px)] overflow-hidden z-10">
                        
                        {/* Image with Zoom Effect */}
                        <img 
                            src={item.img} 
                            alt={item.title} 
                            className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-50 group-hover:scale-110 transition-transform duration-1000 ease-in-out" 
                        />
                        
                        {/* Dark Gradient Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />

                        {/* Content */}
                        <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-10">
                            
                            {/* Icon Box */}
                            <div className="mb-6 h-14 w-14 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md flex items-center justify-center text-white group-hover:bg-[#D4AF37] group-hover:text-black transition-all duration-300 shadow-[0_0_15px_rgba(0,0,0,0)] group-hover:shadow-[0_0_20px_rgba(212,175,55,0.5)]">
                                <item.icon size={26} strokeWidth={1.5} />
                            </div>

                            {/* Title */}
                            <h3 className="text-white text-2xl md:text-3xl font-black uppercase tracking-tighter mb-2 group-hover:text-[#D4AF37] transition-colors duration-300">
                                {item.title}
                            </h3>

                            {/* Sliding Description */}
                            <div className="h-0 group-hover:h-auto overflow-hidden transition-all duration-500">
                                <p className="text-gray-300 text-xs font-bold uppercase tracking-widest leading-relaxed pt-2 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500 delay-100">
                                    {item.desc}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </motion.div>
    </div>
</section>

      {/* Services */}
      <section id="services" className="py-20 md:py-32 bg-[#050505] border-t border-white/5 relative overflow-hidden">
    
    {/* 1. Ambient Background Glow */}
    <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
        <div className="absolute top-[20%] right-[10%] w-[400px] h-[400px] bg-[#D4AF37]/5 rounded-full blur-[100px] animate-pulse" />
        <div className="absolute bottom-[10%] left-[10%] w-[300px] h-[300px] bg-[#D4AF37]/5 rounded-full blur-[80px] animate-pulse delay-1000" />
    </div>

    <div className="container mx-auto px-6 md:px-24 text-center relative z-10">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
            <h2 className="text-2xl md:text-4xl font-black uppercase text-white mb-16 tracking-tighter">
                Our <span className="text-[#D4AF37]">Services</span>
            </h2>
        </motion.div>

        <motion.div variants={staggerContainer} initial="hidden" whileInView="show" viewport={{ once: true }} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {displayServices.map((service, i) => (
                <motion.div 
                    key={i} 
                    variants={{ hidden: { opacity: 0, y: 30 }, show: { opacity: 1, y: 0, transition: { type: "spring", bounce: 0.4, duration: 1 } } }} 
                    whileHover={{ y: -10 }} 
                    className="group relative h-[300px] w-full rounded-[2rem] overflow-hidden" 
                >
                    {/* --- 2. MOVING BORDER ANIMATION (Always Visible) --- */}
                    {/* We put a large spinning box behind the content. 
                        inset-[-200%] ensures the spinning gradient covers the corners as it rotates. 
                    */}
                    <div className="absolute inset-[-200%] z-0 flex items-center justify-center">
                        <div className="w-full h-full animate-[spin_4s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#0000_0%,#0000_50%,#D4AF37_100%)] opacity-100" />
                    </div>

                    {/* --- 3. INNER CARD MASK (The Black Card) --- */}
                    {/* inset-[1.5px] creates a crisp 1.5px border line where the background shows through */}
                    <div className="absolute inset-[1.5px] bg-[#050505] rounded-[2rem] flex flex-col items-center justify-center p-6 text-center z-10">
                        
                        {/* ADMIN CONTROLS */}
                        {user && user.role === 'admin' && service._id && (
                            <div className="absolute top-4 right-4 z-50">
                                <AdminControls 
                                    onDelete={() => handleDelete(service, 'services')} 
                                    onEdit={() => handleEdit(service, '/admin/add-service')} 
                                />
                            </div>
                        )}

                        {/* Icon / Image Section */}
                        <div className="relative z-10 mb-8">
                            <div className="h-16 w-16 rounded-2xl bg-[#D4AF37]/5 flex items-center justify-center text-[#D4AF37] border border-[#D4AF37]/20 transition-all duration-500 group-hover:bg-[#D4AF37] group-hover:text-black group-hover:scale-110 group-hover:shadow-[0_0_20px_rgba(212,175,55,0.4)]">
                                {service.image || service.customImage ? (
                                    <img src={service.image || service.customImage} alt="" className="w-full h-full object-cover rounded-2xl" />
                                ) : (
                                    service.icon ? <service.icon size={28} strokeWidth={1.5} /> : <Handshake size={28} />
                                )}
                            </div>
                        </div>

                        {/* Text Title */}
                        <h3 className="relative z-10 text-white text-[11px] md:text-xs font-black uppercase tracking-[0.2em] leading-relaxed group-hover:text-[#D4AF37] transition-colors duration-300">
                            {service.title}
                        </h3>

                        {/* Decorative Line */}
                        <div className="relative z-10 mt-6 h-[2px] w-6 bg-[#D4AF37]/30 rounded-full transition-all duration-500 group-hover:w-16 group-hover:bg-[#D4AF37]" />
                    </div>
                </motion.div>
            ))}
            
            {/* Admin Add Card Button */}
            {user && user.role === 'admin' && <AdminAddCard route="/admin/add-service" title="Add Service" />}
        </motion.div>
    </div>
</section>

      {/* Featured Properties */}
      <section id="properties" className="py-24 md:py-48 bg-[#030303] relative font-sans overflow-hidden">
    
    {/* Ambient Background */}
    <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#D4AF37]/5 rounded-full blur-[120px] pointer-events-none" />

    <div className="container mx-auto px-6 md:px-24 relative z-10">
      
      {/* 1. HEADER & FILTERS */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16 border-b border-white/10 pb-8">
        
        {/* Headline */}
        <motion.div 
            initial="hidden" 
            whileInView="visible" 
            viewport={{ once: true }}
            variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
            }}
            className="space-y-4"
        >
            <div className="flex items-center gap-4">
                <span className="h-[2px] w-8 bg-[#D4AF37]"></span>
                <span className="text-[#D4AF37] text-[10px] font-black uppercase tracking-[0.6em]">Exclusive Portfolio</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-black uppercase text-white tracking-tighter leading-none">
                Featured <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] to-[#FCEabb]">Assets</span>
            </h2>
        </motion.div>

        {/* 2. NEW CLEAN FILTER MENU (Pure White & Neat Borders) */}
        <div className="flex flex-wrap gap-3">
            {content.propFilters.map((filter, i) => (
                <motion.button 
                    key={filter} 
                    initial={{ opacity: 0, x: 20 }} 
                    whileInView={{ opacity: 1, x: 0 }} 
                    transition={{ delay: i * 0.1 }} 
                    onClick={() => setActiveFilter(filter)} 
                    className={`relative px-6 py-2.5 rounded-full text-[10px] font-bold uppercase tracking-[0.2em] border transition-all duration-300
                    ${activeFilter === filter 
                        ? 'border-[#D4AF37] bg-[#D4AF37] text-black shadow-[0_0_15px_rgba(212,175,55,0.4)]' // Active State
                        : 'border-white/20 bg-transparent text-white hover:border-white hover:bg-white/5' // Inactive State (Pure White)
                    }`}
                >
                    {filter}
                </motion.button>
            ))}
        </div>
      </div>

      {/* 3. PROPERTIES GRID WITH ALWAYS MOVING BORDERS */}
      <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 items-stretch">
        <AnimatePresence mode="popLayout">
          {filteredProps.map((prop) => (
            <motion.div 
                key={prop._id || prop.id} 
                layout 
                initial={{ opacity: 0, scale: 0.95 }} 
                whileInView={{ opacity: 1, scale: 1 }} 
                viewport={{ once: true }} 
                transition={{ duration: 0.5 }} 
                className="group relative h-full min-h-[450px]"
            >
                {/* ADMIN CONTROLS */}
                {user && user.role === 'admin' && prop._id && (
                    <div className="absolute top-4 right-4 z-50">
                        <AdminControls 
                            onDelete={() => handleDelete(prop, 'properties')} 
                            onEdit={() => handleEdit(prop, '/admin/add-property')} 
                        />
                    </div>
                )}

                <Link to={`/property/${prop._id || prop.id}`} state={{ data: prop }} className="block h-full w-full">
                    
                    {/* --- A. ALWAYS MOVING BORDER LAYER --- */}
                    {/* inset-[-100%] ensures the rotating square covers the corners of the rectangle */}
                    <div className="absolute inset-0 rounded-[2rem] overflow-hidden z-0">
                        <div className="absolute inset-[-100%] animate-[spin_4s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#0000_0%,#0000_50%,#D4AF37_100%)] opacity-100" />
                    </div>

                    {/* --- B. INNER CARD CONTENT (Masks the center) --- */}
                    {/* inset-[1.5px] creates the thin neat border line */}
                    <div className="absolute inset-[1.5px] bg-[#080808] rounded-[calc(2rem-1.5px)] overflow-hidden flex flex-col z-10">
                        
                        {/* Image Section */}
                        <div className="relative h-2/3 overflow-hidden">
                            <motion.img 
                                whileHover={{ scale: 1.1 }} 
                                transition={{ duration: 1.2, ease: [0.33, 1, 0.68, 1] }} 
                                src={prop.img || (prop.heroImages && prop.heroImages[0])} 
                                className="w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 transition-all duration-700" 
                                alt={prop.title} 
                            />
                            {/* Dark Gradient Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-transparent to-transparent opacity-90" />
                            
                            {/* Price Tag */}
                            <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md border border-white/10 px-4 py-2 rounded-xl">
                                <span className="text-[#D4AF37] text-[8px] font-black uppercase tracking-widest block">Starting From</span>
                                <span className="text-white text-sm font-black tracking-tighter">{prop.price}</span>
                            </div>
                        </div>

                        {/* Content Section */}
                        <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                            
                            {/* Category & Title */}
                            <div className="mb-4">
                                <span className="inline-block px-2 py-1 rounded bg-[#D4AF37]/20 text-[#D4AF37] text-[8px] font-black uppercase tracking-widest mb-2 border border-[#D4AF37]/20">
                                    {prop.category}
                                </span>
                                <h3 className="text-xl font-black uppercase tracking-tighter text-white leading-none mb-2 truncate">
                                    {prop.title}
                                </h3>
                                <div className="flex items-center gap-2 text-gray-400 text-[9px] font-bold uppercase tracking-widest">
                                    <MapPin size={10} className="text-[#D4AF37]" /> {prop.location}
                                </div>
                            </div>

                            {/* Details Grid (Reveals on Hover) */}
                            <div className="grid grid-cols-3 gap-2 border-t border-white/10 pt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                                <div className="text-center">
                                    <span className="block text-white font-black text-xs">{prop.beds}</span>
                                    <span className="text-[7px] text-gray-500 font-bold uppercase">Beds</span>
                                </div>
                                <div className="text-center border-l border-white/10">
                                    <span className="block text-white font-black text-xs">{prop.baths}</span>
                                    <span className="text-[7px] text-gray-500 font-bold uppercase">Baths</span>
                                </div>
                                <div className="text-center border-l border-white/10">
                                    <span className="block text-white font-black text-xs">{prop.sqft}</span>
                                    <span className="text-[7px] text-gray-500 font-bold uppercase">Sq Ft</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </Link>
            </motion.div>
          ))}
          
          {user && user.role === 'admin' && <AdminAddCard route="/admin/add-property" title="Index Asset" />}
        </AnimatePresence>
      </motion.div>
    </div>
</section>

      {/* Developer Partners */}
      <section id="developers" className="py-24 md:py-48 bg-[#050505] border-t border-white/5 relative overflow-hidden font-sans">
    
    {/* Ambient Background (Subtle Gold Glow) */}
    <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
        <div className="absolute top-[20%] left-[10%] w-[400px] h-[400px] bg-[#D4AF37]/5 rounded-full blur-[100px] animate-pulse" />
        <div className="absolute bottom-[10%] right-[10%] w-[300px] h-[300px] bg-[#D4AF37]/5 rounded-full blur-[80px] animate-pulse delay-1000" />
    </div>

    {/* Header */}
    <div className="container mx-auto px-6 md:px-24 relative z-10 text-center mb-20 space-y-6">
        <span className="text-[#D4AF37] text-[10px] font-black uppercase tracking-[0.6em] block mb-2">
            Institutional Network
        </span>
        <h2 className="text-3xl md:text-5xl font-black uppercase text-white tracking-tighter">
            Trust In <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] to-[#FCEabb]">Excellence</span>
        </h2>
    </div>

    {/* Partners Grid */}
    <motion.div variants={staggerContainer} initial="hidden" whileInView="show" viewport={{ once: true }} className="container mx-auto px-6 md:px-24 grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 relative z-10">
        {displayPartners.map((dev, i) => (
        <motion.div 
            key={i} 
            variants={{ hidden: { opacity: 0, y: 30 }, show: { opacity: 1, y: 0, transition: { type: "spring", bounce: 0.3, duration: 1 } } }} 
            whileHover={{ y: -10, transition: { duration: 0.3 } }} 
            className="relative group h-64 rounded-[2.5rem] overflow-hidden"
        >
            {/* --- 1. MOVING BORDER LAYER (Always Visible) --- */}
            {/* inset-[-100%] ensures the spinning gradient covers corners during rotation */}
            <div className="absolute inset-0 rounded-[2.5rem] overflow-hidden z-0">
                <div className="absolute inset-[-100%] animate-[spin_4s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#0000_0%,#0000_50%,#D4AF37_100%)] opacity-100" />
            </div>

            {/* --- 2. INNER CONTENT MASK --- */}
            {/* inset-[1.5px] creates the thin border line */}
            <div className="absolute inset-[1.5px] bg-[#050505] rounded-[calc(2.5rem-1.5px)] flex flex-col items-center justify-center p-6 z-10">
                
                {/* ADMIN CONTROLS */}
                {user && user.role === 'admin' && dev._id && (
                    <div className="absolute top-4 right-4 z-50">
                        <AdminControls 
                            onDelete={() => handleDelete(dev, 'partners')} 
                            onEdit={() => handleEdit(dev, '/admin/add-partner')} 
                        />
                    </div>
                )}

                {/* Content Container */}
                <div className="relative z-10 flex flex-col items-center w-full">
                    
                    {/* Logo Area */}
                    <motion.div 
                        className="mb-6 h-20 w-full flex items-center justify-center rounded-xl bg-white/5 group-hover:bg-transparent transition-colors duration-500" 
                        whileHover={{ scale: 1.1 }}
                    >
                        {dev.logo && (
                            <img 
                                src={dev.logo} 
                                alt={dev.name} 
                                className="max-h-12 md:max-h-16 w-auto object-contain grayscale brightness-[3] opacity-60 group-hover:grayscale-0 group-hover:brightness-100 group-hover:opacity-100 transition-all duration-700 ease-out drop-shadow-2xl" 
                            />
                        )}
                    </motion.div>

                    {/* Name */}
                    <span className="text-gray-500 text-[9px] font-black uppercase tracking-[0.3em] group-hover:text-[#D4AF37] group-hover:tracking-[0.4em] transition-all duration-500 text-center">
                        {dev.name}
                    </span>

                    {/* Decorative Line */}
                    <div className="mt-4 h-1 w-1 bg-white/20 rounded-full group-hover:w-12 group-hover:bg-[#D4AF37] transition-all duration-500" />
                </div>
            </div>
        </motion.div>
        ))}
        
        {/* Admin Add Card */}
        {user && user.role === 'admin' && <AdminAddCard route="/admin/add-partner" title="Add Partner" />}
    </motion.div>
</section>

      {/* Presence */}
     <section id="presence" className="relative py-28 md:py-48 bg-black overflow-hidden border-t border-white/5">
    
    {/* 1. Ambient Background (Subtle Gold Glow) */}
    <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
        <div className="absolute top-[30%] left-[20%] w-[500px] h-[500px] bg-[#D4AF37]/5 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-[10%] right-[10%] w-[400px] h-[400px] bg-[#D4AF37]/5 rounded-full blur-[100px] animate-pulse delay-1000" />
    </div>

    {/* Header */}
    <div className="container mx-auto px-6 md:px-24 text-center mb-24 relative z-10">
        <motion.span variants={fadeInUp} initial="hidden" whileInView="show" viewport={{once:true}} className="text-[#D4AF37] text-[10px] font-black uppercase tracking-[0.6em] block mb-4">
            {content.presenceTitle}
        </motion.span>
        <motion.h2 variants={fadeInUp} initial="hidden" whileInView="show" viewport={{once:true}} className="text-4xl md:text-6xl font-black uppercase text-white leading-tight">
            Global <span className="text-[#D4AF37]">Jurisdictions</span>
        </motion.h2>
    </div>

    {/* Cards Grid */}
    <div className="container mx-auto px-6 md:px-24 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 relative z-10">
        {locationsData.map((loc, i) => (
        <motion.div 
            key={i} 
            variants={fadeInUp} 
            initial="hidden" 
            whileInView="show" 
            viewport={{once:true}} 
            whileHover={{ y: -15 }} 
            className="relative group h-[500px] rounded-[2.5rem] overflow-hidden"
        >
            {/* --- 2. ALWAYS MOVING BORDER LAYER --- */}
            {/* The spinning gradient background */}
            <div className="absolute inset-0 z-0">
                <div className="absolute inset-[-100%] animate-[spin_4s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#0000_0%,#0000_50%,#D4AF37_100%)] opacity-100" />
            </div>

            {/* --- 3. INNER CARD CONTENT (Mask) --- */}
            {/* inset-[1.5px] creates the thin neat border line */}
            <div className="absolute inset-[1.5px] bg-[#080808] rounded-[calc(2.5rem-1.5px)] overflow-hidden z-10">
                
                {/* Background Image */}
                <img 
                    src={loc.img} 
                    alt={loc.name} 
                    className="absolute inset-0 w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-1000 ease-in-out" 
                />
                
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent flex flex-col justify-end p-10 z-10">
                    
                    {/* Text Content */}
                    <h3 className="text-white text-2xl font-black uppercase tracking-tighter mb-2 translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                        {loc.name}
                    </h3>
                    <p className="text-[#D4AF37] text-[10px] font-black uppercase tracking-widest translate-y-2 group-hover:translate-y-0 transition-transform duration-500 delay-75">
                        {loc.desc}
                    </p>
                    
                    {/* View Details Button (Reveals on Hover) */}
                    <div className="h-0 group-hover:h-8 overflow-hidden transition-all duration-500 opacity-0 group-hover:opacity-100 mt-4">
                        <button className="flex items-center gap-2 text-white text-[9px] font-black uppercase tracking-widest hover:text-[#D4AF37] transition-colors">
                            View Details <ArrowRight size={12} />
                        </button>
                    </div>
                </div>
            </div>
        </motion.div>
        ))}
    </div>
</section>

      {/* --- NEW SECTION 12: PROCESS --- */}
      <section id="process" className="py-24 md:py-40 bg-[#050505] border-t border-white/5 relative overflow-hidden font-sans">
    
    {/* 1. Ambient Background Glow */}
    <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
        <div className="absolute top-[20%] left-[30%] w-[500px] h-[500px] bg-[#D4AF37]/5 rounded-full blur-[120px] animate-pulse" />
    </div>

    {/* Header */}
    <div className="container mx-auto px-6 md:px-24 text-center mb-20 relative z-10">
        <motion.span 
            initial={{ opacity: 0, y: 10 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            viewport={{ once: true }} 
            className="text-[#D4AF37] text-[10px] font-black uppercase tracking-[0.6em] block mb-4"
        >
            Our Methodology
        </motion.span>
        <motion.h2 
            initial={{ opacity: 0, y: 10 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            viewport={{ once: true }} 
            transition={{ delay: 0.2 }}
            className="text-3xl md:text-5xl font-black uppercase text-white tracking-tighter"
        >
            How We <span className="text-[#D4AF37]">Work</span>
        </motion.h2>
    </div>

    <div className="container mx-auto px-6 md:px-24 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
            
            {/* 2. ANIMATED CONNECTING LINE (Desktop Only) */}
            <div className="hidden md:block absolute top-12 left-10 right-10 h-[2px] bg-white/5 z-0">
                {/* The filling gold beam */}
                <motion.div 
                    initial={{ width: "0%" }} 
                    whileInView={{ width: "100%" }} 
                    viewport={{ once: true }} 
                    transition={{ duration: 1.5, ease: "easeInOut", delay: 0.5 }}
                    className="h-full bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent shadow-[0_0_20px_#D4AF37]"
                />
            </div>
            
            {processSteps.map((step, i) => (
                <motion.div 
                    key={step.id} 
                    initial={{ opacity: 0, y: 30 }} 
                    whileInView={{ opacity: 1, y: 0 }} 
                    viewport={{ once: true }} 
                    transition={{ delay: i * 0.3 }} 
                    className="relative z-10 flex flex-col items-center text-center group"
                >
                    {/* 3. CIRCULAR CARD WITH MOVING BORDER */}
                    <div className="relative h-24 w-24 mb-8">
                        {/* A. Spinning Gradient Layer */}
                        <div className="absolute inset-0 rounded-full overflow-hidden z-0">
                            <div className="absolute inset-[-100%] animate-[spin_3s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#0000_0%,#0000_50%,#D4AF37_100%)] opacity-100" />
                        </div>

                        {/* B. Inner Mask (The Black Circle) */}
                        <div className="absolute inset-[2px] bg-[#0A0A0A] rounded-full flex items-center justify-center z-10 transition-colors duration-500 group-hover:bg-[#D4AF37]">
                            {/* The Number */}
                            <span className="text-3xl font-black text-white group-hover:text-black transition-colors duration-500">
                                {step.id}
                            </span>
                        </div>

                        {/* C. Outer Glow (On Hover) */}
                        <div className="absolute inset-0 rounded-full bg-[#D4AF37] blur-md opacity-0 group-hover:opacity-40 transition-opacity duration-500 z-[-1]" />
                    </div>

                    {/* Text Content */}
                    <h3 className="text-xl font-black uppercase text-white mb-4 tracking-wide group-hover:text-[#D4AF37] transition-colors duration-300">
                        {step.title}
                    </h3>
                    <p className="text-gray-400 text-xs font-medium uppercase tracking-widest leading-relaxed max-w-xs group-hover:text-gray-200 transition-colors duration-300">
                        {step.desc}
                    </p>
                </motion.div>
            ))}
        </div>
    </div>
</section>
      {/* --- NEW SECTION 13: FAQ --- */}
      <section id="faq" className="py-24 md:py-40 bg-black border-t border-white/5">
    <div className="container mx-auto px-6 md:px-24 grid grid-cols-1 lg:grid-cols-12 gap-16">
        
        {/* Left Column: Text Only (Button Removed) */}
        <div className="lg:col-span-4 space-y-6">
            <span className="text-[#D4AF37] text-[10px] font-black uppercase tracking-[0.6em]">
                Support Center
            </span>
            <h2 className="text-4xl md:text-5xl font-black uppercase text-white tracking-tighter leading-tight">
                Frequently Asked <br /> Questions
            </h2>
            <p className="text-gray-400 text-sm leading-relaxed">
                Everything you need to know about investing in Dubai real estate.
            </p>
        </div>

        {/* Right Column: Accordion Items */}
        <div className="lg:col-span-8 space-y-4">
            {faqs.map((faq, i) => (
                <div key={i} className="border border-white/10 rounded-2xl overflow-hidden bg-[#0A0A0A]">
                    <button 
                        onClick={() => setOpenFaq(openFaq === i ? null : i)}
                        className="w-full flex items-center justify-between p-6 text-left hover:bg-white/5 transition-colors"
                    >
                        <span className="text-sm font-bold uppercase text-white tracking-wider pr-8">
                            {faq.q}
                        </span>
                        <ChevronDown 
                            className={`text-[#D4AF37] flex-shrink-0 transition-transform duration-300 ${openFaq === i ? 'rotate-180' : ''}`} 
                        />
                    </button>
                    <AnimatePresence>
                        {openFaq === i && (
                            <motion.div 
                                initial={{ height: 0, opacity: 0 }} 
                                animate={{ height: "auto", opacity: 1 }} 
                                exit={{ height: 0, opacity: 0 }} 
                                className="overflow-hidden"
                            >
                                <div className="p-6 pt-0 text-gray-400 text-sm leading-relaxed border-t border-white/5">
                                    {faq.a}
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            ))}
        </div>
    </div>
</section>

      {/* --- NEW SECTION 14: TESTIMONIALS --- */}
     {/* Pass the testimonials props here */}
<TestimonialsSection testimonials={testimonials} />

      {/* Contact Section */}
      <section id="contact" className="py-24 md:py-48 bg-black border-t border-white/5 relative overflow-hidden">
        <div className="container mx-auto px-6 md:px-24 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 md:gap-24 items-center">
            
            <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="space-y-8">
              <div className="flex items-center gap-4">
                <div className="h-px w-12 bg-[#D4AF37]" />
                <span className="text-[#D4AF37] text-[10px] font-black uppercase tracking-[0.6em]">Contact Us</span>
              </div>
              <h2 className="text-4xl md:text-6xl font-black uppercase text-white tracking-tighter leading-tight">
                Let's Discuss Your <br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] to-white">Next Investment.</span>
              </h2>
              <p className="text-gray-400 text-sm leading-relaxed max-w-md">
                Our team of expert consultants is ready to guide you through Dubai's most exclusive real estate opportunities.
              </p>
              
              <div className="space-y-6 pt-4">
                <div className="flex items-center gap-6 group">
                  <div className="h-12 w-12 rounded-full border border-white/10 flex items-center justify-center text-[#D4AF37] group-hover:bg-[#D4AF37] group-hover:text-black transition-all duration-300">
                    <Phone size={20} />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-gray-500 block mb-1">Call Us</span>
                    <span className="text-xl font-bold text-white">+91 91766 27139 / +91 93848 36698</span>
                  </div>
                </div>
                
                <div className="flex items-center gap-6 group">
                  <div className="h-12 w-12 rounded-full border border-white/10 flex items-center justify-center text-[#D4AF37] group-hover:bg-[#D4AF37] group-hover:text-black transition-all duration-300">
                    <Mail size={20} />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-gray-500 block mb-1">Email Us</span>
                    <span className="text-xl font-bold text-white">contact@v5cproperties.com</span>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.2 }} className="bg-[#080808] border border-white/5 p-8 md:p-12 rounded-[2.5rem] shadow-2xl relative">
              <form ref={formRef} onSubmit={handleContactSubmit} className="space-y-6">
                
                <input type="hidden" name="property_title" value="General Home Inquiry" />

                <div>
                  <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500 ml-2 mb-2 block">Full Name</label>
                  <input type="text" name="user_name" placeholder="John Doe" required className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-sm text-white focus:outline-none focus:border-[#D4AF37] focus:bg-white/10 transition-all placeholder:text-gray-600" />
                </div>
                <div>
                  <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500 ml-2 mb-2 block">Email Address</label>
                  <input type="email" name="user_email" placeholder="john@example.com" required className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-sm text-white focus:outline-none focus:border-[#D4AF37] focus:bg-white/10 transition-all placeholder:text-gray-600" />
                </div>
                <div>
                  <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500 ml-2 mb-2 block">Phone Number</label>
                  <input type="tel" name="user_phone" placeholder="+971 50 000 0000" required className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-sm text-white focus:outline-none focus:border-[#D4AF37] focus:bg-white/10 transition-all placeholder:text-gray-600" />
                </div>
                <div className="pt-4">
                  <button type="submit" disabled={isSending} className="w-full bg-[#D4AF37] text-black font-black uppercase tracking-[0.2em] py-5 rounded-2xl hover:bg-white transition-all duration-300 flex items-center justify-center gap-3 group">
                    {isSending ? 'Sending...' : 'Send Message'}
                    {!isSending && <Send size={16} className="group-hover:translate-x-1 transition-transform" />}
                  </button>
                  {contactStatus && <p className="text-center text-[#D4AF37] text-xs mt-4 font-bold uppercase tracking-widest">{contactStatus}</p>}
                </div>
              </form>
            </motion.div>

          </div>
        </div>
      </section>
 <FinancePartnersSection />
       
       <NewsletterSection />
      <Footer content={content} />
    </div>
  );
}

export default Home;