import React from "react";
import { motion } from "framer-motion";
import logo from '../assets/white-logo.png'; // Make sure this path is correct relative to this file

const V5CLogo = () => (
  <motion.a 
    href="#home" 
    className="flex items-center gap-3 group cursor-pointer" 
    aria-label="V5C Home" 
    whileHover={{ scale: 1.05 }}
  >
    <img src={logo} alt="V5C Logo" className="w-auto h-12" />
    <div className="flex flex-col leading-none justify-center">
      <span className="text-white font-bold text-lg md:text-xl tracking-wider uppercase">V5C</span>
      <span className="text-[#D4AF37] text-[9px] md:text-[10px] font-bold uppercase tracking-[0.2em]">Properties LLC</span>
    </div>
  </motion.a>
);

export default V5CLogo;