import React from "react";
import { motion } from "framer-motion";
import { Quote, MessageSquarePlus } from "lucide-react";
import { useNavigate } from "react-router-dom";

const TestimonialsSection = ({ testimonials, content }) => {
    const navigate = useNavigate();

    // Debug logging
    console.log("📝 TestimonialsSection received:", testimonials);

    // Show the latest 3 testimonials (database ones first, then static)
    const displayTestimonials = testimonials.slice(-3);

    return (
        <section id="testimonials" className="section-bg-primary py-24 md:py-40 border-t border-theme overflow-hidden font-sans">

            {/* Ambient Background */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#D4AF37]/5 rounded-full blur-[120px] pointer-events-none" />

            <div className="container mx-auto px-6 md:px-24 text-center mb-20 relative z-10">
                <h2 className="text-4xl md:text-5xl font-black uppercase text-theme-primary leading-snug tracking-tighter">
                    {(() => {
                        const title = content?.testimonialsTitle || "Trusted By Investors";
                        const parts = title.split(/(Investors|المستثمرين|инвесторов|inversores)/i);
                        return parts.map((part, i) => (
                            <span key={i} className={/Investors|المستثمرين|инвесторов|inversores/i.test(part) ? "text-theme-accent" : ""}>
                                {part}
                            </span>
                        ));
                    })()}
                </h2>
            </div>

            {/* UPDATED GRID: Changed to lg:grid-cols-3 for testimonials only */}
            <div className="container mx-auto px-6 md:px-24 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10">

                {/* 1. Mapped Testimonials (Limit to 3) */}
                {displayTestimonials.map((t, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.1 }}
                        whileHover={{ y: -10 }}
                        className="relative group h-full min-h-[320px] rounded-[2.5rem]"
                    >
                        {/* --- MOVING BORDER LAYER --- */}
                        <div className="absolute inset-0 rounded-[2.5rem] overflow-hidden z-0">
                            <div className="absolute inset-[-100%] animate-[spin_4s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#0000_0%,#0000_50%,#D4AF37_100%)] opacity-100" />
                        </div>

                        {/* --- INNER CARD CONTENT --- */}
                        <div className="absolute inset-[1.5px] section-bg-primary rounded-[calc(2.5rem-1.5px)] p-8 flex flex-col justify-between z-10 shadow-lg">
                            <Quote size={32} className="text-[#D4AF37]/20 absolute top-8 right-8" />

                            <div className="relative z-10">
                                <p className="text-theme-secondary text-xs md:text-sm font-medium leading-relaxed mb-6 italic font-sans">
                                    "{t.feedback || t.text}"
                                </p>
                            </div>

                            <div className="flex items-center gap-3">
                                <div className="h-10 w-10 rounded-full bg-gradient-to-br from-[#D4AF37] to-[#856404] flex items-center justify-center text-black font-black shadow-lg shadow-[#D4AF37]/20 flex-shrink-0">
                                    {t.name ? t.name[0] : 'U'}
                                </div>
                                <div className="overflow-hidden">
                                    <h4 className="text-theme-primary text-[10px] font-black uppercase tracking-wider truncate">{t.name}</h4>
                                    <span className="text-theme-accent text-[8px] font-bold uppercase tracking-widest block truncate">{t.location || t.country}</span>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                ))}

            </div>
        </section>
    );
};

export default TestimonialsSection;