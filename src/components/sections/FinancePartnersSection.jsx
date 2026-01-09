import React from "react";
import { motion } from "framer-motion";

const financePartners = [
  { 
    name: "Sundaram Home Finance", 
    // Using a clear SVG logo
    logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQgpG25DXG8DNbRBi8tYWnE4X-rUo6Oq2ROsA&s" 
  },
  { 
    name: "HDFC Home Loans", 
    // Using a clear PNG/SVG logo
    logo: "https://i.pinimg.com/736x/4d/36/80/4d3680df49d67fa9d800c7f072e9a33f.jpg" 
  }
];

const FinancePartnersSection = () => {
  return (
    <section className="py-24 bg-[#050505] border-t border-white/5 relative overflow-hidden font-sans">
        
        {/* Background Glow */}
        <div className="absolute left-[-10%] top-[20%] w-[400px] h-[400px] bg-[#D4AF37]/5 rounded-full blur-[100px] pointer-events-none" />

        {/* Header */}
        <div className="container mx-auto px-6 md:px-24 text-center mb-16 relative z-10">
            <span className="text-[#D4AF37] text-[10px] font-black uppercase tracking-[0.6em] block mb-4">
                Strategic Alliances
            </span>
            <h2 className="text-3xl md:text-5xl font-black uppercase text-white tracking-tighter">
                Housing Finance <span className="text-[#D4AF37]">Partners</span>
            </h2>
        </div>

        {/* Logos Grid */}
        <div className="container mx-auto px-6 md:px-24 flex flex-wrap justify-center gap-8 relative z-10">
            {financePartners.map((partner, i) => (
                <motion.div 
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.2 }}
                    whileHover={{ scale: 1.05 }}
                    className="group relative w-72 h-36 bg-white rounded-2xl flex items-center justify-center p-8 overflow-hidden shadow-2xl transition-all duration-300 hover:shadow-[0_0_40px_rgba(212,175,55,0.2)]"
                >
                    {/* Moving Gold Border Effect (Subtle on white) */}
                    <div className="absolute inset-0 border-2 border-transparent group-hover:border-[#D4AF37] rounded-2xl transition-colors duration-300 z-20 pointer-events-none" />
                    
                    {/* Logo Image */}
                    <img 
                        src={partner.logo} 
                        alt={partner.name} 
                        className="w-full h-full object-contain filter grayscale group-hover:grayscale-0 transition-all duration-500" 
                    />
                </motion.div>
            ))}
        </div>
    </section>
  );
};

export default FinancePartnersSection;