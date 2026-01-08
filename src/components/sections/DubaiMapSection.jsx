import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

// Adjust path: components/sections/ -> go up two levels to data
import { mapDistricts } from "../../data/constants"; 
import { fadeInUp, buttonHover, buttonTap } from "../../utils/animations";

const DubaiMapSection = ({ content }) => {
  const [selected, setSelected] = useState(mapDistricts[1]);

  return (
    <section id="map" className="py-24 md:py-40 bg-black border-t border-white/5 overflow-hidden font-sans">
      <div className="container mx-auto px-6 md:px-24 text-center mb-16 md:mb-24">
          <motion.span variants={fadeInUp} initial="hidden" whileInView="show" viewport={{once:true}} className="text-[#D4AF37] text-[10px] font-black uppercase tracking-[0.8em] block mb-6">Location Intelligence</motion.span>
          <motion.h2 variants={fadeInUp} initial="hidden" whileInView="show" viewport={{once:true}} className="text-3xl md:text-5xl font-black uppercase text-white tracking-tighter">{content.mapTitle}</motion.h2>
          <motion.p variants={fadeInUp} initial="hidden" whileInView="show" viewport={{once:true}} className="text-gray-500 text-xs md:text-sm font-bold uppercase tracking-widest mt-6 max-w-xl mx-auto">{content.mapCaption}</motion.p>
      </div>
      <div className="container mx-auto px-6 md:px-24 grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8 }} viewport={{once:true}} className="lg:col-span-8 relative aspect-[16/10] bg-[#0A0A0A] rounded-[3rem] border border-white/10 overflow-hidden shadow-2xl">
            <div className="absolute inset-0 z-0 opacity-40"><img src="https://images.unsplash.com/photo-1582407947304-fd86f028f716?auto=format&fit=crop&w=1200" alt="Dubai Aerial" className="w-full h-full object-cover grayscale brightness-50" /></div>
            {mapDistricts.map((district, idx) => (
              <motion.button key={idx} style={{ top: district.top, left: district.left }} onClick={() => setSelected(district)} className="absolute z-20 -translate-x-1/2 -translate-y-1/2 group" whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.9 }}>
                <AnimatePresence>{selected.name === district.name && (<motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="absolute bottom-full left-1/2 -translate-x-1/2 mb-4 bg-black border border-[#D4AF37]/50 px-4 py-2 rounded-lg backdrop-blur-md"><span className="text-white text-[9px] font-black uppercase tracking-tighter whitespace-nowrap">{district.name}</span></motion.div>)}</AnimatePresence>
                <div className={`relative h-5 w-5 md:h-7 md:w-7 rounded-full border-2 transition-all duration-500 flex items-center justify-center ${selected.name === district.name ? 'bg-[#D4AF37] border-white shadow-[0_0_25px_#D4AF37]' : 'bg-white/10 border-[#D4AF37]/40 hover:border-[#D4AF37]'}`}>
                   {selected.name === district.name && (<motion.div initial={{ scale: 0.5 }} animate={{ scale: 3, opacity: 0 }} transition={{ repeat: Infinity, duration: 2 }} className="absolute inset-0 bg-[#D4AF37] rounded-full" />)}
                </div>
              </motion.button>
            ))}
          </motion.div>
          <div className="lg:col-span-4 flex flex-col gap-6">
            <AnimatePresence mode="wait">
              <motion.div key={selected.name} initial={{opacity:0, x:50}} animate={{opacity:1, x:0}} exit={{opacity:0, x:-50}} transition={{duration:0.6}} className="bg-[#0A0A0A] border border-white/5 p-10 md:p-12 rounded-[2.5rem] flex-grow relative overflow-hidden shadow-2xl">
                <div className="flex items-center gap-4 mb-8"><div className="h-[2px] w-8 bg-[#D4AF37]" /><span className="text-[#D4AF37] text-[10px] font-black uppercase tracking-[0.5em]">District Highlight</span></div>
                <h3 className="text-white text-4xl md:text-5xl font-black uppercase mb-6 leading-none tracking-tighter">{selected.name}</h3>
                <p className="text-gray-400 text-sm leading-relaxed mb-12">{selected.desc}</p>
                <motion.button whileHover={buttonHover} whileTap={buttonTap} className="w-full py-5 bg-[#D4AF37] text-black text-[11px] font-black uppercase tracking-[0.3em] rounded-2xl hover:bg-white transition-all shadow-xl flex items-center justify-center gap-3">Explore District <ArrowUpRight size={18}/></motion.button>
              </motion.div>
            </AnimatePresence>
          </div>
      </div>
    </section>
  );
};

export default DubaiMapSection; // <--- THIS LINE IS CRITICAL