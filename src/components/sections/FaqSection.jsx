import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus, ArrowRight } from "lucide-react";
import { faqs } from "../../data/constants";
import { useNavigate } from "react-router-dom";

const FaqSection = ({ limit, content }) => {
    const [openFaq, setOpenFaq] = useState(null);
    const navigate = useNavigate();
    const faqsSource = content?.faqs || faqs;
    const displayFaqs = limit ? faqsSource.slice(0, limit) : faqsSource;

    return (
        <section id="faq" className="py-24 md:py-32 bg-white">
            <div className="container mx-auto px-6 md:px-12 lg:px-24 grid grid-cols-1 lg:grid-cols-12 gap-12">

                {/* Left Side: Header & Button */}
                <div className="lg:col-span-4 space-y-6">
                    <h2 className="text-4xl md:text-5xl font-black uppercase text-theme-primary leading-snug tracking-tighter font-sans">
                        {content?.faqTitle || "FREQUENTLY ASKED QUESTIONS"}
                    </h2>
                    <p className="text-gray-600 text-sm leading-relaxed font-sans">
                        {content?.faqDesc || "Everything you need to know about investing in Dubai real estate and the V5C turnkey methodology."}
                    </p>

                    {limit && (
                        <motion.button
                            onClick={() => navigate('/faq')}
                            whileHover={{ scale: 1.05, boxShadow: "0 10px 30px rgba(212,175,55,0.3)" }}
                            whileTap={{ scale: 0.95 }}
                            className="bg-[#D4AF37] text-black font-bold py-4 px-10 rounded-lg hover:bg-[#C49B2E] transition-all inline-flex items-center gap-2 uppercase tracking-wider text-sm shadow-lg font-sans"
                        >
                            {content?.viewAllBtn || "View All FAQ's"}
                            <ArrowRight size={18} />
                        </motion.button>
                    )}
                </div>

                {/* Right Side: FAQ Accordion */}
                <div className="lg:col-span-8 space-y-3">
                    {displayFaqs.map((faq, i) => (
                        <div
                            key={i}
                            className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                        >
                            <button
                                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                                className="w-full flex items-center justify-between p-5 md:p-6 text-left group"
                            >
                                <span className="text-sm md:text-base font-bold text-[#0B1A2E] pr-6 group-hover:text-[#D4AF37] transition-colors font-sans">
                                    {faq.q}
                                </span>
                                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#D4AF37]/10 flex items-center justify-center group-hover:bg-[#D4AF37] transition-colors">
                                    {openFaq === i ? (
                                        <Minus size={16} className="text-[#D4AF37] group-hover:text-black transition-colors" />
                                    ) : (
                                        <Plus size={16} className="text-[#D4AF37] group-hover:text-black transition-colors" />
                                    )}
                                </div>
                            </button>

                            <AnimatePresence>
                                {openFaq === i && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: "auto", opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.3 }}
                                        className="overflow-hidden"
                                    >
                                        <div className="px-5 md:px-6 pb-5 md:pb-6 text-gray-600 text-sm leading-relaxed border-t border-gray-100 pt-4 font-sans">
                                            {faq.a}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

// --- CRITICAL LINE: THIS FIXES THE ERROR ---
export default FaqSection;