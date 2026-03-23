import React from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { locationsData } from "../../data/constants";
import { fadeInUp } from "../../utils/animations";

const PresenceSection = ({ content }) => {
  return (
    <section id="presence" className="relative py-28 md:py-48 bg-black overflow-hidden border-t border-white/5">

      {/* 1. SECTION HEADER */}
      <div className="container mx-auto px-6 md:px-24 text-center mb-24 relative z-10">
        <motion.h2
          variants={fadeInUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-black uppercase text-white leading-snug tracking-tighter"
        >
          Global <span className="text-[#D4AF37]">Jurisdictions</span>
        </motion.h2>
      </div>

      {/* 2. LOCATIONS GRID (5 Columns) */}
      <div className="container mx-auto px-6 md:px-24 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 relative z-10">
        {locationsData.map((loc, i) => (
          <motion.div
            key={i}
            variants={fadeInUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            whileHover={{ y: -15 }}
            className="relative group h-[500px] rounded-[2.5rem] overflow-hidden cursor-pointer"
          >
            {/* Moving Border Animation */}
            <div className="absolute inset-0 z-0">
              <div className="absolute inset-[-100%] animate-[spin_5s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#0000_0%,#0000_50%,#D4AF37_100%)] opacity-100" />
            </div>

            {/* Inner Content Container */}
            <div className="absolute inset-[1.5px] bg-[#080808] rounded-[calc(2.5rem-1.5px)] overflow-hidden z-10">

              {/* Background Image with Parallax Hover */}
              <img
                src={loc.img}
                alt={loc.name}
                className="absolute inset-0 w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-1000 ease-in-out opacity-60"
              />

              {/* Dark Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent flex flex-col justify-end p-10 z-10">

                {/* Text content */}
                <h3 className="text-white text-2xl font-black uppercase tracking-tighter mb-2 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                  {loc.name}
                </h3>
                <p className="text-[#D4AF37] text-[10px] font-black uppercase tracking-widest translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-75 font-sans">
                  {loc.desc}
                </p>

                {/* Button Reveal on Hover */}
                <div className="h-0 group-hover:h-8 overflow-hidden transition-all duration-500 opacity-0 group-hover:opacity-100 mt-6">
                  <button className="flex items-center gap-2 text-white text-[9px] font-black uppercase tracking-[0.2em] hover:text-[#D4AF37] transition-colors">
                    Discover Regional Insights <ArrowRight size={12} />
                  </button>
                </div>

              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Background Decorative Glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-1/2 bg-gradient-to-t from-[#D4AF37]/10 to-transparent blur-[120px] pointer-events-none" />

    </section>
  );
};

export default PresenceSection;