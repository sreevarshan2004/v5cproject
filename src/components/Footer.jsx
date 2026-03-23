import React from "react";
import { Facebook, Instagram, Linkedin, Phone, Mail, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import V5CLogo from "./V5CLogo";
import footerLogo from "../assets/footerlogo.png";

// Custom WhatsApp Icon Component (Since it's not in Lucide default set)
const WhatsAppIcon = ({ size = 24, className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
  >
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
  </svg>
);

// Custom X (formerly Twitter) Icon Component
const XIcon = ({ size = 24, className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
  >
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const Footer = ({ content }) => {
  const getPath = (label) => {
    const l = label.toLowerCase().trim();
    if (l.includes("home") || l.includes("الرئيسية") || l.includes("главная") || l.includes("inicio")) return "/";
    if (l.includes("about") || l.includes("من نحن") || l.includes("о нас") || l.includes("sobre")) return "/about";
    if (l.includes("properties") || l.includes("عقارات") || l.includes("недвижимость") || l.includes("propiedades")) return "/properties";
    if (l.includes("developers") || l.includes("مطور") || l.includes("застройщики") || l.includes("desarrolladores")) return "/developers";
    if (l.includes("dubai") || l.includes("دبي") || l.includes("дубай") || l.includes("dubái")) return "/why-dubai";
    if (l.includes("emirates") || l.includes("إمارات") || l.includes("эмираты") || l.includes("emiratos")) return "/emirates";
    if (l.includes("services") || l.includes("خدمات") || l.includes("услуги") || l.includes("servicios")) return "/services";
    if (l.includes("presence") || l.includes("تواجد") || l.includes("присутствие") || l.includes("presencia")) return "/presence";
    if (l.includes("process") || l.includes("عملية") || l.includes("процесс") || l.includes("proceso")) return "/process";
    if (l.includes("faq") || l.includes("الأسئلة")) return "/faq";
    if (l.includes("testimonials") || l.includes("توصيات") || l.includes("отзывы") || l.includes("testimonios")) return "/testimonials";
    if (l.includes("contact") || l.includes("اتصل") || l.includes("контакты") || l.includes("contacto")) return "/contact";
    if (l.includes("sobha") || l.includes("شوبا") || l.includes("собха")) return "/sobha-central";
    return "/";
  };

  return (
    <footer className="pt-24 pb-12 bg-[#D4AF37]/20 border-t border-gray-300 relative overflow-hidden font-sans">

      {/* Background Glow */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#0B1A2E]/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-6 md:px-24 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-16 mb-20 text-left">

        {/* COLUMN 1: BRAND & SOCIALS */}
        <div className="space-y-8">
          <Link to="/">
            <img src={footerLogo} alt="V5C Properties Logo" className="h-16 w-auto object-contain" />
          </Link>
          <p className="text-[#0B1A2E]/70 text-sm font-medium uppercase leading-relaxed font-sans">
            {content?.footer?.about || "V5C Properties LLC is a premier real estate consultancy hub."}
          </p>

          {/* --- SOCIAL MEDIA ICONS (Original Colors on Hover) --- */}
          <div className="flex gap-6">

            {/* WhatsApp (Green) */}
            <a
              href="https://wa.me/971503854097"
              target="_blank"
              rel="noreferrer"
              className="text-[#0B1A2E]/70 hover:text-[#25D366] transition-colors transform hover:scale-110 duration-300"
              aria-label="WhatsApp"
            >
              <WhatsAppIcon size={20} />
            </a>

            {/* Instagram (Brand Pink/Purple) */}
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              className="text-[#0B1A2E]/70 hover:text-[#E1306C] transition-colors transform hover:scale-110 duration-300"
              aria-label="Instagram"
            >
              <Instagram size={20} />
            </a>

            {/* LinkedIn (Brand Blue) */}
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noreferrer"
              className="text-[#0B1A2E]/70 hover:text-[#0077B5] transition-colors transform hover:scale-110 duration-300"
              aria-label="LinkedIn"
            >
              <Linkedin size={20} />
            </a>

            {/* X (formerly Twitter) */}
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noreferrer"
              className="text-[#0B1A2E]/70 hover:text-[#000000] transition-colors transform hover:scale-110 duration-300"
              aria-label="X"
            >
              <XIcon size={20} />
            </a>

          </div>
        </div>

        {/* COLUMN 2: QUICK LINKS & SERVICES */}
        <div className="space-y-8">
          <div>
            <h4 className="text-[#0B1A2E] text-xs font-black uppercase tracking-widest mb-4">{content?.footer?.quickHeading || "Quick Links"}</h4>
            <ul className="space-y-3 text-[#0B1A2E]/70 text-[10px] font-bold uppercase tracking-widest">
              {(content?.footer?.quick || []).map(link => (
                <li key={link}>
                  <Link to={getPath(link)} className="hover:text-[#0B1A2E] transition-colors cursor-pointer">{link}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-[#0B1A2E] text-xs font-black uppercase tracking-widest mb-4">{content?.footer?.companyHeading || "Company"}</h4>
            <ul className="space-y-3 text-[#0B1A2E]/70 text-[10px] font-bold uppercase tracking-widest">
              {(content?.footer?.services || []).map(service => (
                <li key={service}>
                  <Link to={getPath(service)} className="hover:text-[#0B1A2E] transition-colors cursor-pointer">{service}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* COLUMN 3: CONTACT (UAE & INDIA) */}
        <div className="space-y-8">

          {/* UAE */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <MapPin size={14} className="text-[#0B1A2E]" />
              <h4 className="text-[#0B1A2E] text-xs font-black uppercase tracking-widest">United Arab Emirates</h4>
            </div>
            <ul className="space-y-2 text-[#0B1A2E]/70 text-[10px] font-bold uppercase tracking-widest pl-6">
              <li className="flex items-center gap-2 hover:text-[#0B1A2E] transition-colors">
                <Phone size={10} />
                <a href="tel:+971503854097">+971 (50) 385 4097</a>
              </li>
              <li className="flex items-center gap-2 hover:text-[#0B1A2E] transition-colors">
                <Mail size={10} />
                <a href="mailto:contact@v5cproperties.com">contact@v5cproperties.com</a>
              </li>
            </ul>
          </div>

          {/* INDIA */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <MapPin size={14} className="text-[#0B1A2E]" />
              <h4 className="text-[#0B1A2E] text-xs font-black uppercase tracking-widest">India</h4>
            </div>
            <ul className="space-y-2 text-[#0B1A2E]/70 text-[10px] font-bold uppercase tracking-widest pl-6">
              <li className="flex flex-col gap-1 hover:text-[#0B1A2E] transition-colors">
                <div className="flex items-center gap-2">
                  <Phone size={10} />
                  <a href="tel:+919176627139">+91 91766 27139</a>
                </div>
                <div className="flex items-center gap-2">
                  <Phone size={10} />
                  <a href="tel:+919384836698">+91 93848 36698</a>
                </div>
              </li>
              <li className="flex items-center gap-2 hover:text-[#0B1A2E] transition-colors">
                <Mail size={10} />
                <a href="mailto:contact@v5cproperties.com">contact@v5cproperties.com</a>
              </li>
            </ul>
          </div>

        </div>

        {/* COLUMN 4: CONTACT (ISRAEL & CANADA & USA) */}
        <div className="space-y-8">
          {/* ISRAEL */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <MapPin size={14} className="text-[#0B1A2E]" />
              <h4 className="text-[#0B1A2E] text-xs font-black uppercase tracking-widest">Israel</h4>
            </div>
            <ul className="space-y-2 text-[#0B1A2E]/70 text-[10px] font-bold uppercase tracking-widest pl-6">
              <li className="flex items-center gap-2 hover:text-[#0B1A2E] transition-colors">
                <Phone size={10} />
                <a href="tel:+972546382626">+972 54-638-2626</a>
              </li>
              <li className="flex items-center gap-2 hover:text-[#0B1A2E] transition-colors">
                <Mail size={10} />
                <a href="mailto:contact@v5cproperties.com">contact@v5cproperties.com</a>
              </li>
            </ul>
          </div>

          {/* Canada & USA */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <MapPin size={14} className="text-[#0B1A2E]" />
              <h4 className="text-[#0B1A2E] text-xs font-black uppercase tracking-widest">Canada & USA</h4>
            </div>
            <ul className="space-y-2 text-[#0B1A2E]/70 text-[10px] font-bold uppercase tracking-widest pl-6">
              <li className="flex items-center gap-2 hover:text-[#0B1A2E] transition-colors">
                <Phone size={10} />
                <a href="tel:+971503854097">+971 (50) 385 4097</a>
              </li>
              <li className="flex items-center gap-2 hover:text-[#0B1A2E] transition-colors">
                <Mail size={10} />
                <a href="mailto:contact@v5cproperties.com">contact@v5cproperties.com</a>
              </li>
            </ul>
          </div>
        </div>

      </div>

      {/* COPYRIGHT */}
      <div className="pt-10 border-t border-gray-300 text-center space-y-3">
        <span className="text-[#0B1A2E] text-[9px] tracking-[0.5em] font-bold uppercase">
          © 2026 V5C PROPERTIES LLC | Global Business Connect
        </span>
        <div className="text-[#0B1A2E] text-[9px] tracking-[0.5em] font-bold uppercase">
          Powered by MACSGROUP
        </div>
      </div>
    </footer>
  );
};

export default Footer;
