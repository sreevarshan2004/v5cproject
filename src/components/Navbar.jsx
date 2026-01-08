import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Added for navigation
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, LogOut, User } from "lucide-react"; // Added User & LogOut icons

// Import the Logo Component
import V5CLogo from "./V5CLogo";
// Import only animations
import { buttonHover, buttonTap } from "../utils/animations"; 

const Navbar = ({ lang, setLang, content, user, onLogout }) => { // Added user & onLogout props
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate(); // Hook for navigation

  // Handle Scroll to change background
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Prevent body scrolling when mobile menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [menuOpen]);

  return (
    <>
      {/* HEADER BAR */}
      <motion.header 
        initial={{ y: -100 }} 
        animate={{ y: 0 }} 
        transition={{ duration: 0.8, type: "spring" }} 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled || menuOpen ? "bg-black/95 border-b border-white/10 py-2 shadow-2xl" : "bg-transparent py-4 md:py-6"}`}
      >
        <div className="container mx-auto px-6 md:px-1 flex items-center justify-between">
          {/* Logo */}
          <div className="relative z-50">
            <V5CLogo />
          </div>
          
          {/* DESKTOP NAVIGATION (Hidden on Mobile) */}
          <div className="hidden xl:flex items-center gap-5 text-[9px] font-bold tracking-[0.15em] text-gray-300 uppercase">
            {content.nav.map(item => (
              <motion.a 
                key={item} 
                href={`#${item.toLowerCase().replace(/\s+/g, '')}`} 
                className="hover:text-[#D4AF37] transition-all" 
                whileHover={{ y: -2, color: "#D4AF37" }}
              >
                {item}
              </motion.a>
            ))}
          </div>

          {/* RIGHT SIDE ACTIONS */}
          <div className="flex items-center gap-4 md:gap-6 relative z-50">
            
            {/* Language Switcher */}
            <div className="hidden lg:flex gap-4 text-[10px] font-bold border-r border-white/10 pr-6">
              {['EN', 'AR'].map(l => (
                <motion.span 
                  key={l} 
                  onClick={() => setLang(l)} 
                  className={`cursor-pointer uppercase transition-colors ${lang === l ? 'text-[#D4AF37] underline underline-offset-8 font-black' : 'text-white/40 hover:text-white'}`} 
                  whileHover={{ scale: 1.2 }} 
                  whileTap={{ scale: 0.9 }}
                >
                  {l}
                </motion.span>
              ))}
            </div>

            {/* Consult Button */}
            <motion.button 
              whileHover={buttonHover} 
              whileTap={buttonTap} 
              className="hidden sm:block bg-[#D4AF37] text-black px-6 py-3 text-[10px] font-bold uppercase hover:bg-white transition-all shadow-xl"
            >
              {content.consultBtn}
            </motion.button>

            {/* --- DESKTOP LOGIN / LOGOUT ICON --- */}
            <div className="hidden sm:block">
              {user ? (
                // If Logged In: Show Logout Icon
                <motion.button 
                  onClick={onLogout} 
                  whileHover={{ scale: 1.1, color: "#EF4444" }} 
                  className="text-white bg-white/10 p-2 rounded-full hover:bg-white/20 transition-all" 
                  title="Logout"
                >
                  <LogOut size={18} />
                </motion.button>
              ) : (
                // If Logged Out: Show Login User Icon
                <motion.button 
                  onClick={() => navigate('/login')} 
                  whileHover={{ scale: 1.1, color: "#D4AF37" }} 
                  className="text-white bg-white/10 p-2 rounded-full hover:bg-white/20 transition-all" 
                  title="Login"
                >
                  <User size={18} />
                </motion.button>
              )}
            </div>

            {/* Hamburger Button */}
            <button 
              onClick={() => setMenuOpen(!menuOpen)} 
              className="xl:hidden text-white p-2 hover:text-[#D4AF37] transition-colors"
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
            className="fixed inset-0 z-40 bg-black flex flex-col items-center justify-center space-y-8 xl:hidden"
          >
            {/* Mobile Nav Links */}
            {content.nav.map((item, i) => (
              <motion.a 
                key={item}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * i }}
                href={`#${item.toLowerCase().replace(/\s+/g, '')}`} 
                onClick={() => setMenuOpen(false)}
                className="text-2xl font-black uppercase text-white tracking-[0.15em] hover:text-[#D4AF37] transition-colors"
              >
                {item}
              </motion.a>
            ))}

            {/* --- MOBILE LOGIN / LOGOUT LINK --- */}
            {user ? (
               <motion.a 
                 onClick={() => { setMenuOpen(false); onLogout(); }}
                 initial={{ opacity: 0, y: 20 }}
                 animate={{ opacity: 1, y: 0 }}
                 className="text-2xl font-black uppercase text-red-500 tracking-[0.15em] cursor-pointer hover:text-white transition-colors"
               >
                 Logout
               </motion.a>
            ) : (
               <motion.a 
                 onClick={() => { setMenuOpen(false); navigate('/login'); }}
                 initial={{ opacity: 0, y: 20 }}
                 animate={{ opacity: 1, y: 0 }}
                 className="text-2xl font-black uppercase text-[#D4AF37] tracking-[0.15em] cursor-pointer hover:text-white transition-colors"
               >
                 Login / Admin
               </motion.a>
            )}

            {/* Divider */}
            <div className="h-px w-20 bg-white/20 my-8" />

            {/* Mobile Language Switcher */}
            <div className="flex gap-8">
               {['EN', 'AR'].map(l => (
                <span 
                  key={l} 
                  onClick={() => { setLang(l); setMenuOpen(false); }} 
                  className={`text-sm font-bold cursor-pointer tracking-widest ${lang === l ? 'text-[#D4AF37] underline underline-offset-8' : 'text-gray-500'}`}
                >
                  {l}
                </span>
               ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar; 