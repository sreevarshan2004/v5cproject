import React from "react";
import { motion } from "framer-motion";
import { lifeInDubaiData } from "../../data/constants";

const LifeInDubaiSection = ({ content }) => {
  // Merge translated content with static data (icons/images)
  const displayData = (content?.lifeInDubai || []).map((item, i) => ({
    ...item,
    icon: lifeInDubaiData[i]?.icon,
    img: lifeInDubaiData[i]?.img
  }));

  return (
    <section id="life" className="section-bg-tertiary py-24 md:py-40 border-t border-theme relative overflow-hidden font-sans">

      {/* 1. SECTION HEADER */}
      <div className="container mx-auto px-6 md:px-24 text-center mb-16 relative z-10">
        <h2 className="text-4xl md:text-5xl font-black uppercase text-theme-primary leading-snug tracking-tighter">
          {(() => {
            const title = content?.lifeInDubaiTitle || "Life in Dubai";
            const parts = title.split(/(Dubai|دبي|Дубае|Dubái)/i);
            return parts.map((part, i) => (
              <span key={i} className={/Dubai|دبي|Дубае|Dubái/i.test(part) ? "text-theme-accent" : ""}>
                {part}
              </span>
            ));
          })()}
        </h2>
      </div>

      {/* 2. INFINITE SCROLLING CAROUSEL */}
      <div className="relative w-full overflow-hidden z-10">
        <motion.div
          className="flex gap-8 w-max px-4"
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            ease: "linear",
            duration: 40,
            repeat: Infinity
          }}
          whileHover={{ animationPlayState: "paused" }}
        >
          {/* We duplicate the array to ensure the loop is seamless */}
          {[...displayData, ...displayData].map((item, i) => (
            <div key={i} className="group relative h-[400px] w-[280px] md:w-[320px] flex-shrink-0 rounded-[2rem]">

              {/* Rotating Border Effect */}
              <div className="absolute inset-0 rounded-[2rem] overflow-hidden z-0">
                <div className="absolute inset-[-100%] animate-[spin_4s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#0000_0%,#856404_50%,#D4AF37_100%)] opacity-100" />
              </div>

              {/* Inner Card Container */}
              <div className="absolute inset-[2px] section-bg-primary rounded-[calc(2rem-2px)] overflow-hidden z-10 shadow-lg">

                {/* Lifestyle Image */}
                <img
                  src={item.img}
                  alt={item.title}
                  className="absolute inset-0 w-full h-full object-cover opacity-90 group-hover:opacity-70 group-hover:scale-110 transition-transform duration-1000 ease-in-out"
                />

                {/* Dark Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />

                {/* Content Overlay */}
                <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-8">

                  {/* Floating Icon */}
                  <div className="mb-4 h-12 w-12 rounded-xl border border-[#D4AF37]/20 flex items-center justify-center text-[#D4AF37] group-hover:bg-[#D4AF37] group-hover:text-black transition-all duration-500 shadow-xl">
                    <item.icon size={22} strokeWidth={1.5} />
                  </div>

                  {/* Title */}
                  <h3 className="text-white text-xl md:text-2xl font-black uppercase tracking-tighter mb-2 group-hover:text-theme-accent transition-colors duration-300">
                    {item.title}
                  </h3>

                  {/* Description (Reveals on Hover) */}
                  <div className="h-0 group-hover:h-auto overflow-hidden transition-all duration-500">
                    <p className="text-white text-xs font-bold uppercase tracking-widest leading-relaxed pt-2 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500 delay-100 font-sans">
                      {item.desc}
                    </p>
                  </div>

                </div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Decorative Blur Backgrounds */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute top-1/4 -left-20 w-96 h-96 bg-[#D4AF37]/5 blur-[100px] rounded-full" />
        <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-[#D4AF37]/5 blur-[100px] rounded-full" />
      </div>

    </section>
  );
};

export default LifeInDubaiSection;