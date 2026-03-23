import React, { useState } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import heroVideo from "../../assets/herovedio.mp4";
import LeadForm from "../LeadForm";

const HeroSection = ({ content }) => {
  const [showForm, setShowForm] = useState(false);

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setShowForm(true);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  // Parallax Effect Logic
  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 500], [0, 150]);
  const opacityFade = useTransform(scrollY, [0, 300], [1, 0]);

  return (
    <section
      id="home"
      className="relative h-screen flex items-end px-8 md:px-26 pb-8 md:pb-28 pt-20 overflow-hidden"
    >
      {/* 1. BACKGROUND VIDEO LAYER */}
      <div className="absolute inset-0 z-0">
        {/* Reduced Dark Overlay for brighter look while maintaining text readability */}
        <div className="absolute inset-0 bg-black/15 z-10" />

        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
        >
          <source src={heroVideo} type="video/mp4" />
        </video>
      </div>

      {/* 2. TEXT CONTENT LAYER (Animated with Parallax) */}
      <motion.div
        style={{ y: heroY, opacity: opacityFade }}
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1 }}
        className="relative z-20 max-w-4xl"
      >
        {/* Top Tagline */}
        <div className="flex items-center gap-6 mb-2">
          <span className="text-[10px] md:text-[13px] font-bold tracking-[0.4em] text-white uppercase opacity-90">
            {content.topTag}
          </span>
        </div>

        {/* Main Headline - H1 for SEO */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="text-3xl md:text-4xl font-extrabold leading-tight mb-4 uppercase tracking-normal text-[#f39223] whitespace-nowrap drop-shadow-lg"
        >
          {content.headline}
        </motion.h1>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="text-l md:text-xl font-bold text-white mb-20 tracking-tight uppercase"
        >
          {content.subHeadline}
        </motion.h2>

        {/* Categories / Bottom Text */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 1 }}
          className="mt-20 md:mt-40"
        >
          <span className="text-[12px] md:text-[24px] font-black text-white tracking-[0.2em] uppercase">
            {content.categories}
          </span>
        </motion.div>
      </motion.div>

      {/* 3. POPUP FORM LAYER (Absolute positioned on right) */}
      <div className="absolute right-6 md:right-24 top-1/2 -translate-y-1/2 z-30 hidden lg:block">
        <AnimatePresence>
          {showForm && (
            <LeadForm onClose={() => setShowForm(false)} content={content} />
          )}
        </AnimatePresence>
      </div>

      {/* Mobile Form Toggle/Display */}
      <div className="lg:hidden absolute bottom-20 left-6 right-6 z-40">
        <AnimatePresence>
          {showForm && (
            <div className="max-w-sm mx-auto">
              <LeadForm onClose={() => setShowForm(false)} content={content} />
            </div>
          )}
        </AnimatePresence>
      </div>

      {/* Bottom Vignette Overlay */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-black/40 to-transparent z-10" />

    </section>
  );
};

export default HeroSection;