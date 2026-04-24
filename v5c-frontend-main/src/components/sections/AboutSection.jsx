import React from "react";
import { motion } from "framer-motion";
import { ShieldCheck, ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import aboutBusinessImg from '../../assets/aboutbusiness.jpg';
import { fadeInUp, staggerContainer } from "../../utils/animations";

const AboutSection = ({ content }) => {
  return (
    <section id="aboutus" className="section-bg-primary relative py-20 md:py-24 border-t border-theme">
      <div className="container mx-auto px-6 md:px-12 lg:px-24 grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-start">
        <motion.div variants={staggerContainer} initial="hidden" whileInView="show" viewport={{ once: true }}>
          <h2 className="text-4xl md:text-5xl font-black uppercase text-theme-primary leading-snug tracking-tighter mb-10">
            {(() => {
              const title = content.aboutTitle || "About V5C Properties";
              const parts = title.split(/(V5C Properties)/i);
              return parts.map((part, i) => (
                <span key={i} className={part.toLowerCase() === "v5c properties" ? "text-theme-accent" : ""}>
                  {part}
                </span>
              ));
            })()}
          </h2>
          <p className="text-theme-secondary text-sm md:text-lg mb-10 font-sans">{content.aboutText}</p>

          {/* THE NEW TAB BUTTON AND EXPERTISE BOX */}
          <div className="flex items-center gap-8">
            <Link
              to="/about-detail"
              target="_blank"
              className="inline-flex items-center gap-2 text-theme-accent font-bold uppercase text-xs tracking-widest border-b border-theme-medium pb-2 hover:text-theme-primary transition-all"
            >
              Explore Full Story <ArrowUpRight size={14} />
            </Link>

            {/* Expertise Box */}
            <div className="section-bg-primary text-theme-accent px-8 py-6 rounded-xl border border-theme shadow-lg">
              <div className="text-3xl font-black leading-none mb-1">23+</div>
              <div className="text-[9px] font-bold uppercase tracking-widest leading-tight">Years Industry<br />Expertise</div>
            </div>
          </div>
        </motion.div>

        <div className="relative">
          <img src={aboutBusinessImg} className="rounded-2xl" alt="About" />
        </div>
      </div>
    </section>
  );
};

export default AboutSection;