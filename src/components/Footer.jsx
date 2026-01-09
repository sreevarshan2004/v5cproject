import React from "react";
import { Facebook, Instagram, Linkedin, Twitter, Phone, Mail, MapPin } from "lucide-react";
import V5CLogo from "./V5CLogo"; 

// Custom WhatsApp Icon Component (Since it's not in Lucide default set)
const WhatsAppIcon = ({ size = 24, className }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21" />
    <path d="M9 10a0.5 .5 0 0 0 1 1a0.5 .5 0 0 0 1 1a0.5 .5 0 0 0 1 1a0.5 .5 0 0 0 1 1" /> {/* Stylized visual */}
  </svg>
);

const Footer = ({ content }) => {
  return (
    <footer className="pt-24 pb-12 bg-[#050505] border-t border-white/5 relative overflow-hidden font-sans">
      
      {/* Background Glow */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#D4AF37]/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-6 md:px-24 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-16 mb-20 text-left">
        
        {/* COLUMN 1: BRAND & SOCIALS */}
        <div className="space-y-8">
            <V5CLogo /> 
            <p className="text-gray-500 text-sm font-medium uppercase leading-relaxed">
              {content.footer.about}
            </p>
            
            {/* --- SOCIAL MEDIA ICONS (Original Colors on Hover) --- */}
            <div className="flex gap-6">
              
              {/* WhatsApp (Green) */}
              <a 
                href="https://wa.me/971503854097" 
                target="_blank" 
                rel="noreferrer" 
                className="text-gray-400 hover:text-[#25D366] transition-colors transform hover:scale-110 duration-300"
                aria-label="WhatsApp"
              >
                <WhatsAppIcon size={20} />
              </a>

              {/* Instagram (Brand Pink/Purple) */}
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noreferrer" 
                className="text-gray-400 hover:text-[#E1306C] transition-colors transform hover:scale-110 duration-300"
                aria-label="Instagram"
              >
                <Instagram size={20} />
              </a>

              {/* LinkedIn (Brand Blue) */}
              <a 
                href="https://linkedin.com" 
                target="_blank" 
                rel="noreferrer" 
                className="text-gray-400 hover:text-[#0077B5] transition-colors transform hover:scale-110 duration-300"
                aria-label="LinkedIn"
              >
                <Linkedin size={20} />
              </a>

              {/* Twitter (Brand Light Blue) */}
              <a 
                href="https://twitter.com" 
                target="_blank" 
                rel="noreferrer" 
                className="text-gray-400 hover:text-[#1DA1F2] transition-colors transform hover:scale-110 duration-300"
                aria-label="Twitter"
              >
                <Twitter size={20} />
              </a>

            </div>
        </div>

        {/* COLUMN 2: QUICK LINKS & SERVICES */}
        <div className="space-y-8">
            <div>
              <h4 className="text-white text-xs font-black uppercase tracking-widest mb-4">Quick Links</h4>
              <ul className="space-y-3 text-gray-500 text-[10px] font-bold uppercase tracking-widest">
                {content.footer.quick.map(link => (
                  <li key={link}>
                    <a href={`#${link.toLowerCase().replace(/\s+/g, '')}`} className="hover:text-[#D4AF37] transition-colors cursor-pointer">{link}</a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-white text-xs font-black uppercase tracking-widest mb-4">Services</h4>
              <ul className="space-y-3 text-gray-500 text-[10px] font-bold uppercase tracking-widest">
                {content.footer.services.map(service => (
                  <li key={service} className="hover:text-[#D4AF37] transition-colors cursor-pointer">{service}</li>
                ))}
              </ul>
            </div>
        </div>

        {/* COLUMN 3: CONTACT (UAE & INDIA) */}
        <div className="space-y-8">
          
          {/* UAE */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <MapPin size={14} className="text-[#D4AF37]" />
              <h4 className="text-white text-xs font-black uppercase tracking-widest">United Arab Emirates</h4>
            </div>
            <ul className="space-y-2 text-gray-500 text-[10px] font-bold uppercase tracking-widest pl-6">
              <li className="flex items-center gap-2 hover:text-[#D4AF37] transition-colors">
                <Phone size={10} /> 
                <a href="tel:+971503854097">+971 (50) 385 4097</a>
              </li>
              <li className="flex items-center gap-2 hover:text-[#D4AF37] transition-colors">
                <Mail size={10} /> 
                <a href="mailto:contact@v5cproperties.com">contact@v5cproperties.com</a>
              </li>
            </ul>
          </div>

          {/* INDIA */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <MapPin size={14} className="text-[#D4AF37]" />
              <h4 className="text-white text-xs font-black uppercase tracking-widest">India</h4>
            </div>
            <ul className="space-y-2 text-gray-500 text-[10px] font-bold uppercase tracking-widest pl-6">
              <li className="flex flex-col gap-1 hover:text-[#D4AF37] transition-colors">
                <div className="flex items-center gap-2">
                  <Phone size={10} /> 
                  <a href="tel:+919176627139">+91 91766 27139</a>
                </div>
                <div className="flex items-center gap-2">
                  <Phone size={10} /> 
                  <a href="tel:+919384836698">+91 93848 36698</a>
                </div>
              </li>
              <li className="flex items-center gap-2 hover:text-[#D4AF37] transition-colors">
                <Mail size={10} /> 
                <a href="mailto:contact@v5cproperties.com">contact@v5cproperties.com</a>
              </li>
            </ul>
          </div>

        </div>

        {/* COLUMN 4: CONTACT (CANADA & USA) */}
        <div className="space-y-8">
           {/* Canada & USA */}
           <div>
            <div className="flex items-center gap-2 mb-3">
              <MapPin size={14} className="text-[#D4AF37]" />
              <h4 className="text-white text-xs font-black uppercase tracking-widest">Canada & USA</h4>
            </div>
            <ul className="space-y-2 text-gray-500 text-[10px] font-bold uppercase tracking-widest pl-6">
              <li className="flex items-center gap-2 hover:text-[#D4AF37] transition-colors">
                <Phone size={10} /> 
                <a href="tel:+19056166969">+1 (905) 616 6969</a>
              </li>
              <li className="flex items-center gap-2 hover:text-[#D4AF37] transition-colors">
                <Mail size={10} /> 
                <a href="mailto:kannan.kavesseri@v5cproperties.com" className="break-all">kannan.kavesseri@v5cproperties.com</a>
              </li>
            </ul>
          </div>
        </div>

      </div>

      {/* COPYRIGHT */}
      <div className="pt-10 border-t border-white/5 text-center">
        <span className="text-gray-700 text-[9px] tracking-[0.5em] font-bold uppercase">
          © 2026 V5C PROPERTIES LLC | Global Business Connect
        </span>
      </div>
    </footer>
  );
};

export default Footer;