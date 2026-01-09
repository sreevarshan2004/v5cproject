import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, LogOut, User, ChevronDown } from "lucide-react";

// Import the Logo Component
import V5CLogo from "./V5CLogo";
// Import animations
import { buttonHover, buttonTap } from "../utils/animations"; 

const Navbar = ({ lang, setLang, content, user, onLogout }) => { 
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false); // State for dropdown
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
      setLangDropdownOpen(false); // Close dropdown on scroll
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : 'unset';
  }, [menuOpen]);

  return (
    <>
      {/* HEADER BAR */}
      <motion.header 
        initial={{ y: -100 }} 
        animate={{ y: 0 }} 
        transition={{ duration: 0.8, type: "spring" }} 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 h-20 md:h-24 flex items-center ${
          scrolled || menuOpen 
            ? "bg-black/80 backdrop-blur-md shadow-[0_10px_30px_-10px_rgba(0,0,0,0.8)]" 
            : "bg-transparent"
        }`}
      >
        {/* --- MOVING GOLD LINE ANIMATION (Visible on Scroll) --- */}
        <div className={`absolute bottom-0 left-0 w-full h-[1px] overflow-hidden transition-opacity duration-500 ${scrolled ? 'opacity-100' : 'opacity-0'}`}>
            <div className="absolute inset-0 bg-white/10" />
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent animate-[shimmer_3s_infinite] opacity-80" />
        </div>

        {/* MAIN CONTAINER */}
        <div className="w-full max-w-[1500px] mx-auto px-6 lg:px-12 flex items-center justify-between">
          
          {/* --- LEFT: LOGO --- */}
          <div className="flex-shrink-0 relative z-50">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              whileHover={{ 
                scale: 1.05, 
                filter: "drop-shadow(0 0 10px rgba(212, 175, 55, 0.6))"
              }}
              className="cursor-pointer"
            >
              <V5CLogo />
            </motion.div>
          </div>
          
          {/* --- CENTER: DESKTOP NAVIGATION --- */}
          <div className="hidden xl:flex items-center gap-5.5 text-[9px] font-bold tracking-[0.15em] text-white uppercase ml-auto mr-16">
            {content.nav.map(item => (
              <motion.a 
                key={item} 
                href={`#${item.toLowerCase().replace(/\s+/g, '')}`} 
                className="relative group transition-colors hover:text-[#D4AF37] py-2" 
                whileHover={{ y: -2 }}
              >
                {item}
                <span className="absolute -bottom-1 left-1/2 w-1 h-1 bg-[#D4AF37] rounded-full opacity-0 group-hover:opacity-100 -translate-x-1/2 transition-all duration-300" />
              </motion.a>
            ))}
          </div>

          {/* --- RIGHT: ACTIONS --- */}
          <div className="flex items-center justify-end gap-5 relative z-50">
            
            {/* --- LANGUAGE DROPDOWN (UPDATED) --- */}
            <div className="hidden lg:relative lg:flex items-center text-[10px] font-bold border-r border-white/10 pr-6 h-6">
              
              {/* Dropdown Trigger */}
              <button 
                onClick={() => setLangDropdownOpen(!langDropdownOpen)}
                className="flex items-center gap-1.5 text-white hover:text-[#D4AF37] transition-colors uppercase tracking-widest"
              >
                <span className="text-[#D4AF37] border-b border-[#D4AF37] pb-0.5">{lang}</span>
                <ChevronDown size={12} className={`transition-transform duration-300 ${langDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {/* Dropdown Menu */}
              <AnimatePresence>
                {langDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-full left-[-10px] mt-4 w-24 bg-black/95 backdrop-blur-xl border border-white/10 shadow-2xl rounded-sm overflow-hidden py-1"
                  >
                    {['EN', 'AR', 'HI', 'HE'].filter(l => l !== lang).map((l) => (
                      <button
                        key={l}
                        onClick={() => { setLang(l); setLangDropdownOpen(false); }}
                        className="w-full text-left px-4 py-3 text-[10px] font-bold text-gray-400 hover:text-[#D4AF37] hover:bg-white/5 transition-colors uppercase tracking-widest flex items-center justify-between group"
                      >
                        {l}
                        <span className="w-1 h-1 rounded-full bg-[#D4AF37] opacity-0 group-hover:opacity-100 transition-opacity" />
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Consult Button - REDUCED SIZE */}
            <motion.button 
              whileHover={{ ...buttonHover, boxShadow: "0 0 15px rgba(212,175,55,0.4)" }}
              whileTap={buttonTap} 
              className="hidden sm:block bg-[#D4AF37] text-black px-5 py-2.5 text-[9px] font-bold uppercase hover:bg-white transition-all shadow-lg rounded-sm tracking-wider"
            >
              {content.consultBtn}
            </motion.button>

            {/* LOGIN / LOGOUT ICON */}
            <div className="hidden sm:flex items-center">
              {user ? (
                <motion.button 
                  onClick={onLogout} 
                  whileHover={{ scale: 1.1, color: "#EF4444", backgroundColor: "rgba(255,255,255,0.2)" }} 
                  className="text-white bg-white/10 p-2 rounded-full transition-all flex items-center justify-center" 
                  title="Logout"
                >
                  <LogOut size={16} />
                </motion.button>
              ) : (
                <motion.button 
                  onClick={() => navigate('/login')} 
                  whileHover={{ scale: 1.1, color: "#D4AF37", backgroundColor: "rgba(255,255,255,0.2)", boxShadow: "0 0 10px rgba(212,175,55,0.3)" }} 
                  className="text-white bg-white/10 p-2 rounded-full transition-all flex items-center justify-center" 
                  title="Login"
                >
                  <User size={16} />
                </motion.button>
              )}
            </div>

            {/* Hamburger Button (Mobile) */}
            <button 
              onClick={() => setMenuOpen(!menuOpen)} 
              className="xl:hidden text-white p-2 hover:text-[#D4AF37] transition-colors flex items-center justify-center"
            >
              {menuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </motion.header>

      {/* MOBILE MENU OVERLAY */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: "-100%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "-100%" }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="fixed inset-0 z-40 bg-black flex flex-col items-center justify-center space-y-8 xl:hidden overflow-hidden"
          >
            {/* Ambient Background Blob */}
            <div className="absolute top-[-20%] right-[-20%] w-[400px] h-[400px] bg-[#D4AF37]/10 rounded-full blur-[100px]" />
            <div className="absolute bottom-[-20%] left-[-20%] w-[300px] h-[300px] bg-[#D4AF37]/10 rounded-full blur-[100px]" />

            {/* Mobile Nav Links */}
            <div className="flex flex-col items-center gap-6">
                {content.nav.map((item, i) => (
                <motion.a 
                    key={item}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 * i }}
                    href={`#${item.toLowerCase().replace(/\s+/g, '')}`} 
                    onClick={() => setMenuOpen(false)}
                    className="relative z-10 text-xl font-bold uppercase text-white tracking-[0.2em] hover:text-[#D4AF37] transition-colors"
                >
                    {item}
                </motion.a>
                ))}
            </div>

            <div className="h-px w-20 bg-white/20 my-4 relative z-10" />

            {/* Mobile Language Switcher */}
            <div className="flex gap-6 relative z-10">
               {['EN', 'AR', 'HI', 'HE'].map(l => (
                <span 
                  key={l} 
                  onClick={() => { setLang(l); setMenuOpen(false); }} 
                  className={`text-sm font-bold cursor-pointer tracking-widest px-3 py-2 rounded border ${lang === l ? 'border-[#D4AF37] text-[#D4AF37] bg-[#D4AF37]/10' : 'border-transparent text-gray-500 hover:text-white'}`}
                >
                  {l}
                </span>
               ))}
            </div>

            {/* Mobile Actions */}
            <div className="flex items-center gap-6 relative z-10 mt-4">
                {user ? (
                <button 
                    onClick={() => { setMenuOpen(false); onLogout(); }}
                    className="flex items-center gap-2 text-red-500 uppercase font-bold tracking-widest text-xs border border-red-500/30 px-6 py-3 rounded-full hover:bg-red-500/10 transition-colors"
                >
                    <LogOut size={16} /> Logout
                </button>
                ) : (
                <button 
                    onClick={() => { setMenuOpen(false); navigate('/login'); }}
                    className="flex items-center gap-2 text-[#D4AF37] uppercase font-bold tracking-widest text-xs border border-[#D4AF37]/30 px-6 py-3 rounded-full hover:bg-[#D4AF37]/10 transition-colors"
                >
                    <User size={16} /> Login
                </button>
                )}
            </div>

          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;