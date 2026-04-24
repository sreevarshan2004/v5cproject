import React from "react";
import { motion } from "framer-motion";
import { staggerContainer } from "../../utils/animations";

const DevelopersSection = ({ partners, user, content }) => {

    // Fallback data if partners is empty
    const safePartners = partners && partners.length > 0 ? partners : [
        { name: "EMAAR", logo: null },
        { name: "MERAAS", logo: null },
        { name: "SOBHA", logo: null },
        { name: "AZIZI", logo: null }
    ];

    return (
        <section id="developers" className="section-bg-secondary py-20 md:py-24 border-t border-theme relative overflow-hidden">
            <div className="container mx-auto px-6 md:px-12 lg:px-24 relative z-10 text-center mb-8 md:mb-12 space-y-4 md:space-y-6">
                <h2 className="text-4xl md:text-5xl font-black uppercase text-theme-primary leading-snug tracking-tighter">
                    {(() => {
                        const line = content?.devPartnerLine || "TRUST IS EXCELLENCE";
                        const parts = line.split(' ');
                        return parts.map((word, i) => (
                            <span key={i} className={word === "EXCELLENCE" || word === "التميز" || word === "التفوق" || word === "СОВЕРШЕНСТВО" || word === "EXCELENCIA" ? "text-theme-accent" : ""}>
                                {word}{i < parts.length - 1 ? " " : ""}
                            </span>
                        ));
                    })()}
                </h2>
            </div>

            <motion.div
                variants={staggerContainer}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                className="container mx-auto px-6 md:px-12 lg:px-24 grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 relative z-10"
            >
                {safePartners.map((dev, i) => (
                    <motion.div
                        key={dev.id || i}
                        variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}
                        whileHover={{ y: -10 }}
                        className="relative group h-64 rounded-[2.5rem] overflow-hidden card-theme"
                    >
                        <div className="flex items-center justify-center h-full p-6 relative">
                            {dev.logo && (
                                <img
                                    src={dev.logo}
                                    alt={dev.name}
                                    className="max-h-16 md:max-h-24 w-auto object-contain grayscale brightness-[3] opacity-60 group-hover:grayscale-0 group-hover:brightness-100 group-hover:opacity-100 transition-all duration-700"
                                />
                            )}
                            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 h-[1px] w-4 bg-theme-muted group-hover:w-12 group-hover:bg-theme-accent transition-all duration-500" />
                        </div>
                    </motion.div>
                ))}
            </motion.div>
        </section>
    );
};

// CRITICAL: This line must be here!
export default DevelopersSection;