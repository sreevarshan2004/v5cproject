import React from "react";
import { motion } from "framer-motion";
import { TrendingUp, UserCheck, ShieldCheck } from "lucide-react";

const WhyDubaiSection = ({ whyDubaiCards, user, content }) => {

    // Luxury Icons mapping
    const icons = [TrendingUp, UserCheck, ShieldCheck];

    return (
        <section id="whydubai" className="section-bg-secondary relative py-20 md:py-24 overflow-hidden border-t border-theme">
            {/* Background Decorative Glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-gradient-to-b from-[#D4AF37]/5 to-transparent pointer-events-none" />

            <div className="container mx-auto px-6 md:px-12 lg:px-24 relative z-10">
                <div className="text-center mb-8 md:mb-12 space-y-4 md:space-y-6">
                    <h2 className="text-4xl md:text-5xl font-black uppercase text-theme-primary leading-snug tracking-tighter font-sans">
                        {(() => {
                            const title = content.whyTitle || "Why Dubai Properties";
                            // Regex to match "Properties" and its translated equivalents
                            const parts = title.split(/(Properties|عقارات|недвижимость|propiedades)/i);
                            return parts.map((part, i) => (
                                <span key={i} className={/Properties|عقارات|недвижимость|propiedades/i.test(part) ? "text-theme-accent" : ""}>
                                    {part}
                                </span>
                            ));
                        })()}
                    </h2>
                    <div className="h-px w-20 bg-[#D4AF37] mx-auto opacity-50" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
                    {whyDubaiCards.map((card, i) => {
                        const Icon = icons[i % icons.length];
                        return (
                            <motion.div
                                key={card.id || i}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                whileHover={{ y: -10 }}
                                className="relative group w-full h-full min-h-[380px]"
                            >
                                {/* Animated Border Glow */}
                                <div className="absolute -inset-0.5 bg-gradient-to-r from-[#D4AF37] to-[#856404] rounded-[2.5rem] blur opacity-10 group-hover:opacity-40 transition duration-500" />

                                {/* Rotating Border Animation */}
                                <div className="absolute inset-0 rounded-[2.5rem] overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                                    <div className="absolute inset-[-100%] animate-[spin_4s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#0000_0%,#0000_50%,#D4AF37_100%)]" />
                                </div>

                                <div className="relative h-full card-theme rounded-[2.5rem] p-10 lg:p-12 flex flex-col z-10 overflow-hidden">
                                    {/* Icon Box */}
                                    <div className="h-16 w-16 border border-[#D4AF37]/20 rounded-2xl flex items-center justify-center text-[#D4AF37] mb-10 group-hover:bg-[#D4AF37] group-hover:text-black transition-all duration-500 shadow-xl">
                                        <Icon size={30} strokeWidth={1.5} />
                                    </div>

                                    {/* Text Content */}
                                    <h3 className="text-theme-primary text-2xl font-black uppercase mb-2 tracking-tighter group-hover:text-theme-accent transition-colors duration-300">
                                        {card.title}
                                    </h3>

                                    {card.text && (
                                        <p className="text-theme-secondary text-xs font-medium leading-relaxed mb-3 group-hover:text-theme-primary transition-colors font-sans">
                                            {card.text}
                                        </p>
                                    )}

                                    {/* Points List */}
                                    <ul className="space-y-3 mt-7">
                                        {Array.isArray(card.points) && card.points.map((point, idx) => (
                                            <li key={idx} className="flex items-start gap-4 text-theme-secondary text-[11px] font-bold uppercase tracking-widest group/item">
                                                <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[#D4AF37]/30 group-hover:bg-[#D4AF37] transition-all duration-300" />
                                                <span className="group-hover/item:text-theme-primary transition-colors duration-300">{point}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </motion.div>
                        )
                    })}
                </div>
            </div>
        </section>
    );
};

// --- CRITICAL LINE: THIS FIXES THE ERROR ---
export default WhyDubaiSection;