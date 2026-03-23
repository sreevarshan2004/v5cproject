import React from "react";
import { motion } from "framer-motion";
import { Mail, ArrowRight } from "lucide-react";

const NewsletterSection = ({ content }) => {
    return (
        <section className="section-bg-secondary py-24 md:py-32 border-t border-theme relative overflow-hidden font-sans">

            {/* Decorative Background Blob */}
            <div className="absolute right-[-10%] bottom-[-50%] w-[600px] h-[600px] bg-[#D4AF37]/5 rounded-full blur-[150px] pointer-events-none" />

            <div className="container mx-auto px-6 md:px-12 lg:px-24">
                <div className="flex flex-col md:flex-row items-center justify-between gap-12 section-bg-primary p-12 md:p-20 rounded-[3rem] relative overflow-hidden shadow-xl">

                    {/* --- MOVING BORDER ANIMATION --- */}
                    <div className="absolute inset-0 pointer-events-none z-0">
                        <div className="absolute inset-[-100%] animate-[spin_6s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#0000_0%,#0000_50%,#D4AF37_100%)] opacity-30" />
                    </div>

                    {/* Mask to create the inner card look */}
                    <div className="absolute inset-[1.5px] section-bg-primary rounded-[3rem] z-0" />

                    {/* Left Text */}
                    <div className="relative z-10 text-center md:text-left max-w-lg">
                        <h3 className="text-3xl md:text-5xl font-black uppercase text-theme-primary mb-6 tracking-tighter leading-tight">
                            {content?.newsletterTitle1 || "Subscribe to our"} <br />
                            <span className="text-theme-accent">{content?.newsletterTitle2 || "Weekly Newsletter"}</span>
                        </h3>
                        <p className="text-theme-secondary text-xs font-bold uppercase tracking-widest font-sans">
                            {content?.newsletterDesc || "Get exclusive property insights and market updates delivered to your inbox."}
                        </p>
                    </div>

                    {/* Right Form */}
                    <div className="relative z-10 w-full max-w-md">
                        <form className="relative group" onSubmit={(e) => e.preventDefault()}>
                            {/* Glow behind input */}
                            <div className="absolute inset-0 bg-gradient-to-r from-[#D4AF37] to-[#FCEabb] rounded-xl blur opacity-10 group-hover:opacity-30 transition-opacity duration-500" />

                            <div className="relative flex items-center section-bg-tertiary border border-theme rounded-xl overflow-hidden p-2 focus-within:border-theme-accent transition-colors">
                                <Mail className="ml-4 text-theme-muted" size={20} />
                                <input
                                    type="email"
                                    placeholder={content?.newsletterPlaceholder || "Enter your email address"}
                                    className="w-full bg-transparent text-theme-primary text-sm px-4 py-3 outline-none placeholder-gray-400 font-medium"
                                />
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="btn-theme-primary px-6 py-3 rounded-lg text-[10px] tracking-widest flex items-center gap-2"
                                >
                                    {content?.newsletterBtn || "Subscribe"}
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