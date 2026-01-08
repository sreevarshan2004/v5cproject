import React from "react";
import { Facebook, Instagram, Linkedin, Twitter } from "lucide-react";
import V5CLogo from "./V5CLogo"; // Import the logo

const Footer = ({ content }) => {
  return (
    <footer className="pt-24 pb-12 bg-[#050505] border-t border-white/5 relative overflow-hidden font-sans">
      <div className="container mx-auto px-6 md:px-24 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-20 text-left">
        <div className="space-y-8">
            <V5CLogo /> 
            <p className="text-gray-500 text-sm font-medium uppercase">{content.footer.about}</p>
            <div className="flex gap-5 text-gray-400"><Facebook size={18} /><Instagram size={18} /><Linkedin size={18} /><Twitter size={18} /></div>
        </div>
        <div className="space-y-8"><h4 className="text-white text-xs font-black uppercase tracking-widest">Quick Links</h4><ul className="space-y-4 text-gray-500 text-[10px] font-black uppercase tracking-widest">{content.footer.quick.map(link => <li key={link} className="hover:text-[#D4AF37] transition-colors">{link}</li>)}</ul></div>
        <div className="space-y-8"><h4 className="text-white text-xs font-black uppercase tracking-widest">Services</h4><ul className="space-y-4 text-gray-500 text-[10px] font-black uppercase tracking-widest">{content.footer.services.map(service => <li key={service} className="hover:text-[#D4AF37] transition-colors">{service}</li>)}</ul></div>
        <div className="space-y-8"><h4 className="text-white text-xs font-black uppercase tracking-widest">Properties</h4><ul className="space-y-4 text-gray-500 text-[10px] font-black uppercase tracking-widest">{content.footer.properties.map(prop => <li key={prop} className="hover:text-[#D4AF37] transition-colors">{prop}</li>)}</ul></div>
      </div>
      <div className="pt-10 border-t border-white/5 text-center"><span className="text-gray-700 text-[9px] tracking-[0.5em] font-bold uppercase">© 2026 V5C PROPERTIES LLC | Global Business Connect</span></div>
    </footer>
  );
};

export default Footer;