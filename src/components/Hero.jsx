import React from "react";
import { motion } from "framer-motion";

const Hero = ({ content }) => (
  <section id="home" className="relative h-screen flex items-center px-8 md:px-24 pt-20 overflow-hidden">
    {/* Full-width Background - Changed to Palm Jumeirah */}
    <div className="absolute inset-0 z-0">
      <div className="absolute inset-0 bg-black/60 z-10" />
      <img 
        src="https://images.unsplash.com/photo-1578949605784-c27a90afb31c?q=80&w=1920&auto=format&fit=crop" 
        alt="Dubai Palm Jumeirah" 
        className="w-full h-full object-cover" 
      />
    </div>

    <motion.div 
      initial={{ opacity: 0, x: -50 }} 
      animate={{ opacity: 1, x: 0 }} 
      transition={{ duration: 1 }} 
      className="relative z-20 max-w-4xl"
    >
      <div className="flex items-center gap-4 mb-6">
        <div className="h-[1px] w-12 bg-[#D4AF37]" />
        <span className="text-[10px] font-bold tracking-[0.4em] text-[#D4AF37] uppercase">
          {content.topTag}
        </span>
      </div>
      <h1 className="text-3xl md:text-5xl lg:text-7xl font-bold leading-[1.1] mb-6 uppercase tracking-tight">
        {content.headline}
      </h1>
      <p className="text-xs md:text-sm text-gray-400 mb-10 font-bold tracking-[0.1em] uppercase border-l-2 border-[#D4AF37] pl-6 max-w-3xl leading-relaxed">
        {content.subHeadline}
      </p>
      <div className="flex flex-wrap gap-5">
        <button className="bg-white text-black px-10 py-4 text-[11px] font-bold uppercase hover:bg-[#D4AF37] transition-all transform hover:-translate-y-1">
          {content.btnPrimary}
        </button>
        <button className="border border-white/20 px-10 py-4 text-[11px] font-bold uppercase hover:border-[#D4AF37] transition-all">
          {content.btnSecondary}
        </button>
      </div>
    </motion.div>
  </section>
);

export default Hero;