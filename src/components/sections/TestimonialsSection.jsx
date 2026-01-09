import React from "react";
import { motion } from "framer-motion";
import { Quote, MessageSquarePlus } from "lucide-react";
import { useNavigate } from "react-router-dom";

const TestimonialsSection = ({ testimonials }) => {
  const navigate = useNavigate();

  // We limit to showing only the latest 3 testimonials so the layout stays perfect with the "Add" button
  const displayTestimonials = testimonials.slice(0, 3);

  return (
    <section id="testimonials" className="py-24 md:py-40 bg-[#050505] border-t border-white/5 overflow-hidden font-sans">
        
        {/* Ambient Background */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#D4AF37]/5 rounded-full blur-[120px] pointer-events-none" />

        <div className="container mx-auto px-6 md:px-24 text-center mb-20 relative z-10">
            <span className="text-[#D4AF37] text-[10px] font-black uppercase tracking-[0.6em] block mb-4">Client Stories</span>
            <h2 className="text-3xl md:text-5xl font-black uppercase text-white tracking-tighter">Trusted By <span className="text-[#D4AF37]">Investors</span></h2>
        </div>

        {/* UPDATED GRID: Changed to lg:grid-cols-4 to fit the Add Button in the same row */}
        <div className="container mx-auto px-6 md:px-24 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
            
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
                    <div className="absolute inset-[1.5px] bg-[#0A0A0A] rounded-[calc(2.5rem-1.5px)] p-8 flex flex-col justify-between z-10">
                        <Quote size={32} className="text-[#D4AF37]/20 absolute top-8 right-8" />
                        
                        <div className="relative z-10">
                             <p className="text-gray-300 text-xs md:text-sm font-medium leading-relaxed mb-6 italic">
                                "{t.text}"
                            </p>
                        </div>
                        
                        <div className="flex items-center gap-3">
                            <div className="h-10 w-10 rounded-full bg-gradient-to-br from-[#D4AF37] to-[#856404] flex items-center justify-center text-black font-black shadow-lg shadow-[#D4AF37]/20 flex-shrink-0">
                                {t.name ? t.name[0] : 'U'}
                            </div>
                            <div className="overflow-hidden">
                                <h4 className="text-white text-[10px] font-black uppercase tracking-wider truncate">{t.name}</h4>
                                <span className="text-[#D4AF37] text-[8px] font-bold uppercase tracking-widest block truncate">{t.country}</span>
                            </div>
                        </div>
                    </div>
                </motion.div>
            ))}

            {/* 2. THE "ADD REVIEW" CARD (Always the last item) */}
            <motion.button 
                onClick={() => navigate('/add-review')}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                whileHover={{ scale: 0.98 }}
                whileTap={{ scale: 0.95 }}
                className="relative group h-full min-h-[320px] rounded-[2.5rem] overflow-hidden w-full cursor-pointer"
            >
                {/* Dashed Border Effect using SVG or standard border */}
                <div className="absolute inset-0 border-2 border-dashed border-white/20 rounded-[2.5rem] group-hover:border-[#D4AF37] transition-colors duration-500 z-10" />
                
                <div className="absolute inset-0 bg-white/5 group-hover:bg-[#D4AF37]/10 transition-colors duration-500 z-0" />

                <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 z-20">
                    <div className="h-16 w-16 rounded-full bg-[#D4AF37]/10 flex items-center justify-center text-[#D4AF37] group-hover:bg-[#D4AF37] group-hover:text-black transition-all duration-500 shadow-[0_0_20px_rgba(212,175,55,0)] group-hover:shadow-[0_0_20px_rgba(212,175,55,0.4)]">
                        <MessageSquarePlus size={30} />
                    </div>
                    <span className="text-white text-xs font-black uppercase tracking-widest group-hover:text-[#D4AF37] transition-colors">
                        Add Your Story
                    </span>
                </div>
            </motion.button>

        </div>
    </section>
  );
};

export default TestimonialsSection;