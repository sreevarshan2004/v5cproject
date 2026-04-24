import React from "react";
import { LayoutGrid } from "lucide-react";
import { motion } from "framer-motion";
import { servicesData } from "../../data/constants";

const ServicesSection = ({ content }) => {
    // Merge translated content with static data (icons)
    const displayServices = (content?.services || []).map((service, i) => ({
        ...service,
        icon: servicesData[i]?.icon
    }));

    return (
        <section id="services" className="section-bg-tertiary py-20 md:py-24 border-t border-theme relative overflow-hidden">
            {/* Background Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#D4AF37]/5 rounded-full blur-[120px] pointer-events-none" />

            <div className="container mx-auto px-6 md:px-12 lg:px-24 relative z-10">
                <div className="text-center mb-8 md:mb-12">
                    <h2 className="text-4xl md:text-5xl font-black uppercase text-theme-primary leading-snug tracking-tighter font-sans">
                        {(() => {
                            const title = content?.servicesTitle || "OUR SERVICES";
                            const parts = title.split(' ');
                            if (parts.length > 1) {
                                return (
                                    <>
                                        {parts[0]} <span className="text-theme-accent">{parts.slice(1).join(' ')}</span>
                                    </>
                                );
                            }
                            // Fallback for single word titles (e.g., Arabic)
                            return <span className="text-theme-accent">{title}</span>;
                        })()}
                    </h2>
                </div>

                <div className="flex flex-wrap justify-center gap-8">
                    {displayServices.map((service, i) => (
                        <motion.div
                            key={i}
                            whileHover={{ y: -10 }}
                            className="w-full sm:w-[calc(50%-1rem)] lg:w-[calc(25%-1.5rem)] group relative h-[200px] rounded-[1.5rem] card-theme p-6 flex flex-col items-center text-center justify-center overflow-hidden"
                        >
                            {/* Animated Border - Always Visible */}
                            <div className="absolute inset-0 rounded-[1.5rem] overflow-hidden z-0">
                                <div className="absolute inset-[-100%] animate-[spin_4s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#0000_0%,#856404_50%,#D4AF37_100%)] opacity-100" />
                            </div>

                            {/* Content Box */}
                            <div className="absolute inset-[1.5px] bg-[#0B1A2E] rounded-[calc(1.5rem-1.5px)] flex flex-col items-center justify-center p-5 z-10">
                                <div className="h-12 w-12 rounded-xl bg-[#D4AF37]/20 flex items-center justify-center text-[#D4AF37] mb-4 border border-[#D4AF37]/30 group-hover:bg-[#D4AF37] group-hover:text-black group-hover:scale-110 transition-all duration-500 shadow-xl">
                                    {service.icon ? (
                                        <service.icon size={20} strokeWidth={1.5} />
                                    ) : (
                                        <LayoutGrid size={20} strokeWidth={1.5} />
                                    )}
                                </div>

                                <h3 className="text-white text-[10px] md:text-xs font-black uppercase tracking-widest leading-relaxed transition-colors duration-300 group-hover:text-[#D4AF37] font-sans">
                                    {service.title}
                                </h3>

                                <div className="mt-3 h-[2px] w-4 bg-[#D4AF37]/20 rounded-full group-hover:w-12 group-hover:bg-[#D4AF37] transition-all duration-500" />
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

// --- CRITICAL LINE: THIS FIXES THE ERROR ---
export default ServicesSection;