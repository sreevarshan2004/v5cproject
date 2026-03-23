import React, { useState, useEffect } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

// Import the Logo Component
import V5CLogo from "./V5CLogo";
// Import animations
import { buttonHover, buttonTap } from "../utils/animations";

// Icons removed per user request

const Navbar = ({ lang, setLang, content, user, onLogout, transparentNav = false }) => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Check if we're on a page other than home
  const isNavyTheme = transparentNav ? false : location.pathname !== '/';

  // Navigation mapping function for routes
  const getNavRoute = (navItem) => {
    const mapping = {
      'About Us': '/about',
      'Properties': '/properties',
      'Services': '/services',
      'Developers': '/developers',
      'Why Dubai': '/why-dubai',
      'FAQ': '/faq',
      'Contact': '/contact'
    };
    return mapping[navItem] || '/';
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
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
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 h-20 md:h-24 flex items-center ${isNavyTheme || scrolled ? 'bg-white shadow-md' : 'bg-transparent'
          }`}
      >
        {/* --- MOVING GOLD LINE ANIMATION (Visible on Scroll) --- */}
        <div className={`absolute bottom-0 left-0 w-full h-[1px] overflow-hidden transition-opacity duration-500 ${isNavyTheme || scrolled ? 'opacity-100' : 'opacity-0'}`}>
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
              whileHover={{ scale: 1.05 }}
              className="cursor-pointer"
            >
              <V5CLogo transparentNav={transparentNav} />
            </motion.div>
          </div>

          {/* --- CENTER: DESKTOP NAVIGATION --- */}
          <div className="hidden xl:flex items-center gap-5.5 text-[11px] font-bold tracking-[0.15em] uppercase ml-auto mr-16 transition-colors duration-500 text-black font-sans">
            {(content?.nav || []).map(item => (
              <motion.div
                key={item}
                whileHover={{ y: -2 }}
              >
                <Link
                  to={getNavRoute(item)}
                  className="relative group transition-colors py-2 hover:text-black/60"
                >
                  {item}
                  <span className="absolute -bottom-1 left-1/2 w-1 h-1 bg-[#D4AF37] rounded-full opacity-0 group-hover:opacity-100 -translate-x-1/2 transition-all duration-300" />
                </Link>
              </motion.div>
            ))}
          </div>

          {/* --- RIGHT: ACTIONS --- */}
          <div className="flex items-center justify-end gap-5 relative z-50">

            {/* --- CONTACT OPTIONS --- */}
            {/* --- USER/ADMIN PROFILE --- */}
            {user && (
              <div className="hidden lg:flex items-center gap-3 border-r pr-6 h-6 transition-colors duration-500 border-white/30">
                <span className="text-[10px] font-bold uppercase tracking-widest transition-colors duration-500 text-black font-sans">
                  {user.role === 'admin' ? '👑 Admin' : '👤 User'}
                </span>
                <button
                  onClick={onLogout}
                  className="text-[10px] font-bold hover:text-red-500 transition-colors uppercase tracking-widest text-white/70 font-sans"
                >
                  Logout
                </button>
              </div>
            )}

            {/* --- TARGET: LANGUAGE SWITCHER --- */}
            <div className="hidden lg:flex items-center gap-4 text-[13px] font-bold h-6 border-r pr-6 border-white/30 transition-colors duration-500 font-sans">
              {['EN', 'RU', 'ES'].map((l) => (
                <button
                  key={l}
                  onClick={() => setLang(l)}
                  className={`relative uppercase tracking-widest transition-colors ${lang === l ? 'text-[#D4AF37]' : 'text-black/50 hover:text-black'
                    }`}
                >
                  {l}
                  {lang === l && (
                    <motion.div
                      layoutId="lang-underline"
                      className="absolute -bottom-1 left-0 right-0 h-[2px] bg-[#D4AF37]"
                      initial={false}
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                </button>
              ))}
            </div>

            {/* Consult Button - Navigate to Contact */}
            <motion.button
              onClick={() => navigate('/contact')}
              whileHover={{ ...buttonHover, boxShadow: "0 0 15px rgba(212,175,55,0.4)" }}
              whileTap={buttonTap}
              className="hidden sm:block bg-[#D4AF37] text-black px-5 py-2.5 text-[9px] font-bold uppercase hover:bg-[#C49B2E] transition-all shadow-lg rounded-sm tracking-wider font-sans"
            >
              {content.consultBtn}
            </motion.button>

            {/* Hamburger Button (Mobile) */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="xl:hidden p-2 transition-colors flex items-center justify-center text-black hover:text-black/70"
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
            className="fixed inset-0 z-60 bg-white flex flex-col items-center justify-center space-y-8 xl:hidden overflow-hidden"
          >
            {/* Ambient Background Blob */}
            <div className="absolute top-[-20%] right-[-20%] w-[400px] h-[400px] bg-[#D4AF37]/10 rounded-full blur-[100px]" />
            <div className="absolute bottom-[-20%] left-[-20%] w-[300px] h-[300px] bg-[#D4AF37]/10 rounded-full blur-[100px]" />

            {/* Mobile Nav Links */}
            <div className="flex flex-col items-center gap-6 w-full max-w-sm mx-auto">
              {(content?.nav || []).map((item, i) => (
                <motion.div
                  key={item}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * i }}
                  className="w-full text-center"
                >
                  <Link
                    to={getNavRoute(item)}
                    onClick={() => setMenuOpen(false)}
                    className="relative z-10 text-lg font-bold uppercase text-gray-900 tracking-[0.15em] hover:text-[#D4AF37] transition-colors py-3 block w-full font-sans"
                  >
                    {item}
                  </Link>
                </motion.div>
              ))}
            </div>

            <div className="h-px w-20 bg-black/10 my-4 relative z-10" />

            {/* Mobile User/Admin Profile */}
            {user && (
              <div className="flex flex-col items-center gap-3 relative z-10">
                <span className="text-sm font-bold text-[#D4AF37] uppercase tracking-widest font-sans">
                  {user.role === 'admin' ? '👑 Admin' : '👤 User'}
                </span>
                <button
                  onClick={() => { onLogout(); setMenuOpen(false); }}
                  className="text-sm font-bold text-gray-600 hover:text-red-500 transition-colors uppercase tracking-widest font-sans"
                >
                  Logout
                </button>
              </div>
            )}

            <div className="h-px w-20 bg-black/10 my-4 relative z-10" />

            {/* Mobile Language Switcher */}
            <div className="flex flex-wrap gap-3 justify-center relative z-10">
              {['EN', 'RU', 'ES'].map(l => (
                <span
                  key={l}
                  onClick={() => { setLang(l); setMenuOpen(false); }}
                  className={`text-sm font-bold cursor-pointer tracking-widest px-3 py-2 rounded border font-sans ${lang === l ? 'border-[#D4AF37] text-[#D4AF37] bg-[#D4AF37]/10' : 'border-transparent text-gray-600 hover:text-gray-900'}`}
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