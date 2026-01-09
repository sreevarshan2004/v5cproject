import React from "react";
import { motion } from "framer-motion";
import { Mail, ArrowRight } from "lucide-react";

const NewsletterSection = () => {
  return (
    <section className="py-24 bg-[#080808] border-t border-white/5 relative overflow-hidden font-sans">
        
        {/* Decorative Background Blob */}
        <div className="absolute right-[-10%] bottom-[-50%] w-[600px] h-[600px] bg-[#D4AF37]/5 rounded-full blur-[150px] pointer-events-none" />

        <div className="container mx-auto px-6 md:px-24">
            <div className="flex flex-col md:flex-row items-center justify-between gap-12 bg-[#030303] p-10 md:p-16 rounded-[3rem] relative overflow-hidden shadow-2xl">
                
                {/* --- MOVING BORDER ANIMATION --- */}
                <div className="absolute inset-0 pointer-events-none z-0">
                    <div className="absolute inset-[-100%] animate-[spin_6s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#0000_0%,#0000_50%,#D4AF37_100%)] opacity-30" />
                </div>
                
                {/* Mask to create the inner card look */}
                <div className="absolute inset-[1.5px] bg-[#030303] rounded-[3rem] z-0" />

                {/* Left Text */}
                <div className="relative z-10 text-center md:text-left max-w-lg">
                    <h3 className="text-2xl md:text-4xl font-black uppercase text-white mb-4 tracking-tighter">
                        Subscribe to our <br />
                        <span className="text-[#D4AF37]">Weekly Newsletter.</span>
                    </h3>
                    <p className="text-gray-400 text-xs font-bold uppercase tracking-widest">
                        Get exclusive property insights and market updates delivered to your inbox.
                    </p>
                </div>

                {/* Right Form */}
                <div className="relative z-10 w-full max-w-md">
                    <form className="relative group" onSubmit={(e) => e.preventDefault()}>
                        {/* Glow behind input */}
                        <div className="absolute inset-0 bg-gradient-to-r from-[#D4AF37] to-[#FCEabb] rounded-xl blur opacity-10 group-hover:opacity-30 transition-opacity duration-500" />
                        
                        <div className="relative flex items-center bg-[#111] border border-white/10 rounded-xl overflow-hidden p-2 focus-within:border-[#D4AF37] transition-colors">
                            <Mail className="ml-4 text-gray-500" size={20} />
                            <input 
                                type="email" 
                                placeholder="Enter your email address" 
                                className="w-full bg-transparent text-white text-sm px-4 py-3 outline-none placeholder-gray-600 font-medium"
                            />
                            <motion.button 
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="bg-[#D4AF37] text-black px-6 py-3 rounded-lg text-[10px] font-black uppercase tracking-widest hover:bg-white transition-colors flex items-center gap-2"
                            >
                                Subscribe
                            </motion.button>
                        </div>
                    </form>
                </div>

            </div>
        </div>
    </section>
  );
};

export default NewsletterSection;