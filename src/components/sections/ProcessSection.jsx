import React from "react";
import { motion } from "framer-motion";
import { processSteps } from "../../data/constants";

const ProcessSection = ({ content }) => {
  const steps = content?.processSteps || [
    { id: 1, title: "Understanding Goals", desc: "We analyze your investment targets and lifestyle preferences." },
    { id: 2, title: "Property Selection", desc: "Curating exclusive options that match your criteria perfectly." },
    { id: 3, title: "Secure & Handover", desc: "Managing documentation, payments, and key handover seamlessly." }
  ];
  return (
    <section id="process" className="section-bg-secondary py-24 md:py-40 border-t border-theme relative overflow-hidden font-sans">

      {/* 1. SECTION HEADER */}
      <div className="container mx-auto px-6 md:px-24 text-center mb-20 relative z-10">
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-4xl md:text-5xl font-black uppercase text-theme-primary leading-snug tracking-tighter"
        >
          {(() => {
            const title = content?.processTitle || "Working Process";
            const parts = title.split(/(Process|عملية|Рабочий|Proceso)/i);
            return parts.map((part, i) => (
              <span key={i} className={/Process|عملية|Рабочий|Proceso/i.test(part) ? "text-theme-accent" : ""}>
                {part}
              </span>
            ));
          })()}
        </motion.h2>
      </div>

      {/* 2. PROCESS GRID */}
      <div className="container mx-auto px-6 md:px-24 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">

          {/* ANIMATED CONNECTING LINE (Visible only on Desktop) */}
          <div className="hidden md:block absolute top-12 left-10 right-10 h-[2px] bg-white/10 z-0">
            <motion.div
              initial={{ width: "0%" }}
              whileInView={{ width: "100%" }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, ease: "easeInOut", delay: 0.5 }}
              className="h-full bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent shadow-[0_0_20px_#D4AF37]"
            />
          </div>

          {/* MAPPING STEPS */}
          {steps.map((step, i) => (
            <motion.div
              key={step.id || i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.3 }}
              className="relative z-10 flex flex-col items-center text-center group"
            >
              {/* STEP NUMBER CIRCLE */}
              <div className="relative h-24 w-24 mb-8">
                {/* Rotating Border Effect */}
                <div className="absolute inset-0 rounded-full overflow-hidden z-0">
                  <div className="absolute inset-[-100%] animate-[spin_3s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#0000_0%,#0000_50%,#D4AF37_100%)] opacity-100" />
                </div>

                {/* Inner Circle */}
                <div className="absolute inset-[2px] section-bg-primary rounded-full flex items-center justify-center z-10 transition-colors duration-500 group-hover:bg-[#D4AF37] shadow-lg">
                  <span className="text-3xl font-black text-[#0B1A2E] group-hover:text-black transition-colors duration-500">
                    {i + 1}
                  </span>
                </div>

                {/* Outer Glow */}
                <div className="absolute inset-0 rounded-full bg-[#D4AF37] blur-md opacity-0 group-hover:opacity-40 transition-opacity duration-500 z-[-1]" />
              </div>

              {/* TEXT CONTENT */}
              <h3 className="text-xl font-black uppercase text-theme-primary mb-4 tracking-wide group-hover:text-theme-accent transition-colors duration-300">
                {step.title}
              </h3>
              <p className="text-theme-secondary text-xs font-medium uppercase tracking-widest leading-relaxed max-w-xs group-hover:text-theme-primary transition-colors duration-300 font-sans">
                {step.desc}
              </p>

            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// --- CRITICAL LINE: THIS FIXES THE ERROR ---
export default ProcessSection;