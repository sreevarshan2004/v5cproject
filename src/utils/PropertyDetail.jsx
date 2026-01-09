import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useParams, Link, useNavigate, useLocation } from "react-router-dom";
import {
  MapPin, Building, Droplets, Waves, Baby,
  Dumbbell, PersonStanding, X, Check,
  ArrowLeft, Edit, FileText, Maximize, Star
} from "lucide-react";
import axios from 'axios';
import { initialPropertiesData } from '../data/constants';

// --- HELPER: VIDEO EMBED URL ---
const getEmbedUrl = (url) => {
  if (!url) return null;
  const youtubeRegExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const ytMatch = url.match(youtubeRegExp);
  if (ytMatch && ytMatch[2].length === 11) return `https://www.youtube.com/embed/${ytMatch[2]}`;
  
  const vimeoRegExp = /(?:www\.|player\.)?vimeo.com\/(?:channels\/(?:\w+\/)?|groups\/(?:[^\/]*)\/videos\/|album\/(?:\d+)\/video\/|video\/|)(\d+)(?:[a-zA-Z0-9_\-]+)?/i;
  const vimeoMatch = url.match(vimeoRegExp);
  if (vimeoMatch && vimeoMatch[1]) return `https://player.vimeo.com/video/${vimeoMatch[1]}`;

  return url; 
};

// --- HELPER: AMENITY ICONS ---
const getAmenityIcon = (name) => {
  const n = name.toLowerCase();
  if (n.includes("water") || n.includes("lake")) return <Droplets size={24} />;
  if (n.includes("pool") || n.includes("swim")) return <Waves size={24} />;
  if (n.includes("kid") || n.includes("child") || n.includes("play")) return <Baby size={24} />;
  if (n.includes("gym") || n.includes("fitness") || n.includes("sport")) return <Dumbbell size={24} />;
  if (n.includes("jog") || n.includes("walk") || n.includes("track")) return <PersonStanding size={24} />;
  return <Star size={24} />;
};

// --- ANIMATION VARIANTS ---
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

// --- BLACK & GOLD THEME COLORS ---
const THEME = {
    bgPrimary: "bg-black",           
    bgSecondary: "bg-[#0A0A0A]",     
    cardBg: "bg-[#111111]",          
    textDark: "text-white",          
    textLight: "text-gray-400",      
    border: "border-white/10",       
    gold: "text-[#D4AF37]",
    goldBg: "bg-[#D4AF37]",
    goldBorder: "border-[#D4AF37]"
};

// --- BROCHURE MODAL ---
const BrochureModal = ({ isOpen, onClose, property }) => {
  const [formData, setFormData] = useState({
    name: "", phone: "", reason: "Investment", isDealer: "No", 
    timeline: "3 months", interestedInLoan: false, interestedInSiteVisit: true, agreedToTerms: false
  });
  const [errors, setErrors] = useState({});

  if (!isOpen) return null;

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors(prev => ({ ...prev, [field]: null }));
  };

  const handleDownloadSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};
    if (!formData.name) newErrors.name = "Name is required";
    if (!formData.phone) newErrors.phone = "Phone is required";
    if (!formData.agreedToTerms) newErrors.agreedToTerms = "Required";

    if (Object.keys(newErrors).length > 0) { setErrors(newErrors); return; }

    const subject = `Brochure Request: ${property.title}`;
    const body = `Name: ${formData.name}\nPhone: ${formData.phone}\nReason: ${formData.reason}`;
    window.location.href = `mailto:contact@v5cproperties.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    setTimeout(() => {
        const downloadUrl = property.brochure || property.img; 
        const link = document.createElement('a');
        link.href = downloadUrl;
        link.download = `${property.title.replace(/\s+/g, '_')}_Brochure`; 
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        onClose(); 
        alert("Brochure download started!");
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }}
        className={`${THEME.bgPrimary} w-full max-w-4xl rounded-[2rem] overflow-hidden shadow-2xl border border-white/10 relative`}
      >
        <button onClick={onClose} className="absolute top-6 right-6 text-gray-400 hover:text-white transition-colors z-20"><X size={24} /></button>
        <div className="bg-[#0A0A0A] px-8 py-6 border-b border-white/10">
           <h3 className={`text-xl font-bold ${THEME.textDark} uppercase tracking-wide`}>Download Brochure</h3>
           <p className={`text-xs ${THEME.gold} uppercase tracking-widest mt-1`}>Please share your details</p>
        </div>
        <div className="p-8 md:p-10 max-h-[80vh] overflow-y-auto bg-[#111111]">
            <form onSubmit={handleDownloadSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div className="space-y-6">
                    <div className="space-y-2">
                        <label className="text-xs font-bold text-gray-500 uppercase">Reason to buy</label>
                        <div className="flex gap-4">
                            {['Investment', 'Self Use'].map(opt => (
                                <label key={opt} className="flex items-center gap-2 cursor-pointer">
                                    <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${formData.reason === opt ? THEME.goldBorder : 'border-gray-600'}`}>
                                        {formData.reason === opt && <div className={`w-2 h-2 rounded-full ${THEME.goldBg}`} />}
                                    </div>
                                    <input type="radio" className="hidden" onClick={() => handleChange('reason', opt)} />
                                    <span className="text-sm text-gray-300">{opt}</span>
                                </label>
                            ))}
                        </div>
                    </div>
                    <div className="space-y-2">
                        <label className="text-xs font-bold text-gray-500 uppercase">Name <span className="text-red-500">*</span></label>
                        <input type="text" className={`w-full bg-[#0A0A0A] border ${errors.name ? 'border-red-500' : 'border-white/10'} rounded-lg p-3 text-sm text-white focus:border-[#D4AF37] outline-none placeholder-gray-600`}
                            value={formData.name} onChange={(e) => handleChange('name', e.target.value)} />
                    </div>
                    <div className="space-y-2">
                        <label className="text-xs font-bold text-gray-500 uppercase">Phone <span className="text-red-500">*</span></label>
                        <input type="tel" className={`w-full bg-[#0A0A0A] border ${errors.phone ? 'border-red-500' : 'border-white/10'} rounded-lg p-3 text-sm text-white focus:border-[#D4AF37] outline-none placeholder-gray-600`}
                            value={formData.phone} onChange={(e) => handleChange('phone', e.target.value)} />
                    </div>
                </div>
                <div className="space-y-6">
                    <div className="space-y-4 pt-4">
                        <label className="flex items-center gap-3 cursor-pointer">
                             <div className={`w-5 h-5 rounded border flex items-center justify-center ${formData.interestedInSiteVisit ? `bg-[#D4AF37] border-[#D4AF37]` : 'border-gray-600'}`}>
                                 {formData.interestedInSiteVisit && <Check size={14} className="text-black" />}
                             </div>
                             <input type="checkbox" className="hidden" checked={formData.interestedInSiteVisit} onChange={(e) => handleChange('interestedInSiteVisit', e.target.checked)} />
                             <span className="text-sm text-gray-300">I am interested in Site Visits</span>
                        </label>
                        <label className="flex items-start gap-3 cursor-pointer">
                             <div className={`w-5 h-5 mt-0.5 rounded border flex items-center justify-center ${formData.agreedToTerms ? `bg-[#D4AF37] border-[#D4AF37]` : 'border-gray-600'}`}>
                                 {formData.agreedToTerms && <Check size={14} className="text-black" />}
                             </div>
                             <input type="checkbox" className="hidden" checked={formData.agreedToTerms} onChange={(e) => handleChange('agreedToTerms', e.target.checked)} />
                             <div className="text-xs text-gray-500">I agree to Terms & Conditions. {errors.agreedToTerms && <span className="text-red-500 block">Required</span>}</div>
                        </label>
                    </div>
                    <button type="submit" className={`w-full ${THEME.goldBg} text-black py-4 rounded-xl text-xs font-black uppercase tracking-[0.2em] hover:bg-white transition-all shadow-lg`}>Download Brochure</button>
                </div>
            </form>
        </div>
      </motion.div>
    </div>
  );
};

// --- COMPONENTS ---

const GallerySection = ({ images }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  if (!images || images.length === 0) return null;

  return (
    <motion.section id="gallery" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} className={`py-20 ${THEME.bgPrimary}`}>
      <div className="container mx-auto px-6 md:px-24">
        <div className="mb-10 text-center md:text-left">
            <span className={`${THEME.gold} text-[10px] font-black uppercase tracking-[0.2em]`}>Visuals</span>
            <h2 className={`text-2xl md:text-3xl font-normal mt-2 ${THEME.textDark}`}>Property <span className={`font-bold ${THEME.gold}`}>Gallery</span></h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {images.map((img, idx) => (
                <motion.div 
                    key={idx} whileHover={{ scale: 1.02 }} layoutId={`gallery-${idx}`} onClick={() => setSelectedImage(img)}
                    className={`relative cursor-pointer rounded-2xl overflow-hidden group shadow-md hover:shadow-xl transition-all border border-white/5 ${idx === 0 ? 'md:col-span-2 md:row-span-2 aspect-video' : 'aspect-square'}`}
                >
                    <img src={img} alt={`Gallery ${idx}`} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                    <div className="absolute inset-0 bg-black/40 group-hover:bg-transparent transition-colors" />
                    <div className="absolute bottom-4 right-4 bg-black/80 p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                        <Maximize size={16} className="text-[#D4AF37]" />
                    </div>
                </motion.div>
            ))}
        </div>
        <AnimatePresence>
            {selectedImage && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSelectedImage(null)} className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-xl flex items-center justify-center p-4">
                    <button className="absolute top-6 right-6 text-white/50 hover:text-white"><X size={40} /></button>
                    <motion.img src={selectedImage} layoutId={`gallery-${selectedImage}`} className="max-w-full max-h-[90vh] rounded-lg shadow-2xl border border-white/10" />
                </motion.div>
            )}
        </AnimatePresence>
      </div>
    </motion.section>
  );
};

const VideoSection = ({ videoUrl }) => {
  if (!videoUrl) return null;
  const embedUrl = getEmbedUrl(videoUrl);

  return (
    <motion.section id="video" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} className={`py-20 ${THEME.bgSecondary}`}>
      <div className="container mx-auto px-6 md:px-24">
        <div className="mb-10 text-center">
            <span className={`${THEME.gold} text-[10px] font-black uppercase tracking-[0.2em]`}>Cinematic</span>
            <h2 className={`text-2xl md:text-3xl font-normal mt-2 ${THEME.textDark}`}>Property <span className={`font-bold ${THEME.gold}`}>Tour</span></h2>
        </div>
        <div className="relative w-full max-w-4xl mx-auto aspect-video rounded-[2rem] overflow-hidden shadow-2xl border-4 border-[#1A1A1A]">
            <iframe src={embedUrl} title="Property Video" className="w-full h-full" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen />
        </div>
      </div>
    </motion.section>
  );
};

const VisionSection = ({ property }) => (
  <motion.section id="vision" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} className={`py-20 ${THEME.bgPrimary}`}>
    <div className="container mx-auto px-6 md:px-24 flex flex-col lg:flex-row items-center gap-12">
        <div className="flex-1 space-y-5">
          <div className="inline-block px-4 py-1.5 bg-[#D4AF37]/10 rounded-full">
            <span className={`text-[10px] font-black uppercase tracking-[0.2em] ${THEME.gold}`}>Vision</span>
          </div>
          <h2 className={`text-3xl md:text-4xl font-normal ${THEME.textDark} tracking-tight`}>{property.title}</h2>
          <p className={`${THEME.textLight} text-base leading-relaxed`}>{property.visionDesc || "Experience an unparalleled standard of opulence."}</p>
        </div>
        <div className="flex-1 w-full">
            <div className="relative rounded-[2rem] overflow-hidden shadow-2xl aspect-[4/3] border border-white/5">
                <img src={property.img || property.heroImages?.[0]} alt="Vision" className="w-full h-full object-cover transform hover:scale-105 transition duration-1000" />
            </div>
        </div>
    </div>
  </motion.section>
);

// --- WHITE THEMED LOCATION SECTION ---
const LocationSection = ({ property }) => {
  const mapSrc = property.mapUrl || `https://maps.google.com/maps?q=${encodeURIComponent(property.location)}&t=&z=13&ie=UTF8&iwloc=&output=embed`;

  return (
    <motion.section id="location" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} className="py-24 bg-white">
      <div className="container mx-auto px-6 md:px-24">
        <div className="flex flex-col lg:flex-row gap-12 items-center">
          <div className="w-full lg:w-1/2">
              <span className="text-[#D4AF37] text-[10px] font-black uppercase tracking-[0.2em]">Location</span>
              <h2 className="text-2xl md:text-3xl font-normal mt-2 text-black mb-6">Convenience on Your Doorstep</h2>
              <div className="bg-gray-50 p-8 rounded-[2rem] shadow-xl border border-gray-200">
                  <div className="flex items-center gap-4 mb-4">
                      <div className="w-12 h-12 rounded-full bg-[#D4AF37]/10 flex items-center justify-center text-[#D4AF37]"><MapPin size={24}/></div>
                      <div>
                          <h4 className="text-lg font-bold text-black">Prime Location</h4>
                          <p className="text-sm text-gray-500">{property.location}</p>
                      </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4 mt-6">
                      {property.nearbyPlaces?.map((p,i) => (
                          <div key={i} className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
                              <span className="block text-xl font-normal text-[#D4AF37]">{p.time} <span className="text-xs font-bold text-gray-400">MIN</span></span>
                              <span className="text-[10px] font-bold uppercase text-gray-600 tracking-wider">{p.name}</span>
                          </div>
                      ))}
                  </div>
              </div>
          </div>
          
          <div className="w-full lg:w-1/2 aspect-video bg-gray-100 rounded-[2rem] overflow-hidden shadow-xl border-4 border-white relative">
             <iframe 
                width="100%" 
                height="100%" 
                frameBorder="0" 
                scrolling="no" 
                marginHeight="0" 
                marginWidth="0" 
                src={mapSrc}
                title="Location Map"
                className="w-full h-full"
             ></iframe>
          </div>
        </div>
      </div>
    </motion.section>
  );
};

const AmenitiesSection = ({ property }) => {
  const defaultAmenities = ["Water Features", "Swimming Pools", "Kids Play Area", "Gymnasium", "Jogging Tracks"];
  const displayAmenities = property.selectedAmenities?.length > 0 ? property.selectedAmenities.map(id => id.replace(/-/g, ' ')) : defaultAmenities;

  // Stagger Container
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  // Item Pop-up
  const itemVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.8 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1, 
      transition: { type: "spring", stiffness: 100, damping: 12 } 
    }
  };

  return (
    <motion.section 
        id="amenities" 
        className={`py-24 ${THEME.bgPrimary} relative overflow-hidden`}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
    >
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#D4AF37]/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-6 md:px-24 relative z-10">
        <div className="text-center mb-16">
            <motion.span variants={fadeInUp} className={`${THEME.gold} text-[10px] font-black uppercase tracking-[0.2em] block mb-2`}>Lifestyle</motion.span>
            <motion.h2 variants={fadeInUp} className={`text-3xl md:text-4xl font-normal ${THEME.textDark}`}>
                World-Class <span className={`font-bold ${THEME.gold}`}>Amenities</span>
            </motion.h2>
        </div>

        <motion.div 
            className="grid grid-cols-2 md:grid-cols-5 gap-6"
            variants={containerVariants}
        >
          {displayAmenities.map((name, index) => (
            <motion.div 
                key={index} 
                variants={itemVariants}
                whileHover={{ 
                    y: -10, 
                    boxShadow: "0 20px 40px -10px rgba(212, 175, 55, 0.15)",
                    borderColor: "rgba(212, 175, 55, 0.4)"
                }}
                className={`flex flex-col items-center justify-center gap-6 p-8 rounded-[2rem] ${THEME.cardBg} border border-white/5 cursor-pointer group transition-colors duration-500`}
            >
              <div className={`w-20 h-20 rounded-2xl bg-[#0A0A0A] border border-white/5 flex items-center justify-center text-gray-500 group-hover:bg-[#D4AF37] group-hover:text-black group-hover:scale-110 transition-all duration-500 shadow-inner`}>
                <motion.div whileHover={{ rotate: [0, -10, 10, 0] }} transition={{ duration: 0.5 }}>
                    {getAmenityIcon(name)}
                </motion.div>
              </div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-gray-500 group-hover:text-white transition-colors text-center">{name}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
};

// --- WHITE THEMED FLOOR PLANS SECTION ---
const FloorPlanSection = ({ property }) => (
    <motion.section id="floorplan" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} className="py-24 bg-[#F9F9F9]">
      <div className="container mx-auto px-6 md:px-24">
        <div className="mb-10">
          <h2 className="text-2xl font-normal text-black">Floor <span className="font-bold">Plans</span></h2>
        </div>
        <div className="bg-white p-8 rounded-[2rem] border border-gray-200 shadow-xl flex flex-col items-center min-h-[400px] justify-center">
            {property.floorPlans?.[0] ? (
                <>
                    {/* Removed 'invert' class so black lines show on white bg */}
                    <img src={property.floorPlans[0].image} className="max-h-[400px] w-auto object-contain mb-6" alt="Floor Plan" />
                    <div className="flex gap-4">
                        <span className="px-4 py-1 bg-gray-100 rounded-lg text-xs font-bold uppercase text-gray-700">{property.floorPlans[0].type}</span>
                        <span className="px-4 py-1 bg-[#D4AF37]/20 text-[#D4AF37] rounded-lg text-xs font-bold uppercase">{property.floorPlans[0].sqft} SQFT</span>
                    </div>
                </>
            ) : <p className="text-gray-400">Floor plans available upon request.</p>}
        </div>
      </div>
    </motion.section>
);

// --- MAIN PAGE COMPONENT ---
const PropertyDetail = ({ propertiesData }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [isBrochureOpen, setIsBrochureOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("vision");
  
  // Data Loading
  const foundInProps = propertiesData?.find(p => p.id?.toString() === id || p._id === id);
  const [property, setProperty] = useState(location.state?.data || foundInProps || null);
  const [loading, setLoading] = useState(!property);

  useEffect(() => {
    if (property) { setLoading(false); return; }
    const fetch = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/properties/${id}`);
        setProperty(res.data);
      } catch (e) {
        const fallback = initialPropertiesData.find(p => p.id.toString() === id);
        if(fallback) setProperty(fallback);
      } finally { setLoading(false); }
    };
    fetch();
  }, [id, property]);

  const handleEdit = () => navigate("/admin/add-property", { state: { data: property } });
  const scrollToSection = (id) => { setActiveTab(id); document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }); };
  const user = JSON.parse(localStorage.getItem('v5c_user'));

  if (loading) return <div className={`min-h-screen ${THEME.bgPrimary} flex items-center justify-center ${THEME.gold} font-bold tracking-widest uppercase`}>Loading...</div>;
  if (!property) return <div className={`min-h-screen ${THEME.bgPrimary} flex items-center justify-center text-white`}>Property Not Found</div>;

  const displayImage = property.img || property.heroImages?.[0] || "";

  return (
    <div className={`min-h-screen ${THEME.bgPrimary} ${THEME.textDark} font-sans`}>
      <AnimatePresence>{isBrochureOpen && <BrochureModal isOpen={isBrochureOpen} onClose={() => setIsBrochureOpen(false)} property={property} />}</AnimatePresence>

      {/* NAVBAR (DARK THEME) */}
      <header className={`fixed top-0 left-0 right-0 z-50 ${THEME.bgPrimary}/95 backdrop-blur-md py-4 border-b border-white/5 shadow-sm`}>
        <div className="container mx-auto px-6 md:px-24 flex items-center justify-between text-[10px] font-bold tracking-[0.2em]">
          <div className="flex gap-4">
            <Link to="/" className="flex items-center gap-2 text-gray-500 hover:text-[#D4AF37] transition-colors">
                <ArrowLeft size={16} /> <span className="hidden sm:inline">Back</span>
            </Link>
            {user && user.role === 'admin' && <button onClick={handleEdit} className="flex gap-2 text-white bg-[#D4AF37] px-3 py-1 rounded hover:bg-white hover:text-black transition-colors"><Edit size={12}/> Edit</button>}
          </div>
          <div className="hidden md:flex gap-8 uppercase text-gray-500">
            {['vision', 'gallery', 'video', 'location', 'amenities'].map(item => (
              <button key={item} onClick={() => scrollToSection(item)} className={`hover:text-[#D4AF37] transition-colors ${activeTab === item ? 'text-[#D4AF37] font-black' : ''}`}>{item}</button>
            ))}
          </div>
          <button onClick={() => setIsBrochureOpen(true)} className="flex items-center gap-2 bg-[#D4AF37] text-black px-5 py-2.5 rounded-full font-bold hover:bg-white transition-all shadow-lg hover:shadow-xl">
             <FileText size={14} /> Brochure
          </button>
        </div>
      </header>

      {/* HERO SECTION (DARK THEME) */}
      <div className={`relative pt-32 pb-20 ${THEME.bgPrimary} min-h-[85vh] flex items-center`}>
        {/* Background Shape */}
        <div className="absolute top-0 right-0 w-1/2 h-full bg-[#111111] -z-10 rounded-l-[5rem] border-l border-white/5" /> 
        <div className="container mx-auto px-6 md:px-24 relative z-10">
             <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
               <span className={`${THEME.gold} font-bold tracking-widest text-xs uppercase mb-4 block`}>{property.developer}</span>
               
               <h1 className={`text-3xl md:text-5xl font-normal ${THEME.textDark} mb-8 leading-[1.2] max-w-2xl`}>{property.title}</h1>
               
               <div className="flex flex-wrap gap-4 mb-10">
                  <span className="flex items-center gap-2 px-4 py-2 bg-[#1A1A1A] border border-white/10 rounded-full text-xs font-bold uppercase text-gray-300 shadow-sm"><MapPin size={14} className="text-[#D4AF37]"/> {property.location}</span>
                  <span className="flex items-center gap-2 px-4 py-2 bg-[#1A1A1A] border border-white/10 rounded-full text-xs font-bold uppercase text-gray-300 shadow-sm"><Building size={14} className="text-[#D4AF37]"/> {property.category}</span>
                  <span className={`flex items-center gap-2 px-4 py-2 ${THEME.goldBg} text-black rounded-full text-xs font-bold uppercase shadow-md shadow-[#D4AF37]/20`}>{property.price}</span>
               </div>

               <div className="grid grid-cols-3 gap-4 max-w-sm">
                 <div className="text-center p-4 bg-[#111111] rounded-2xl shadow-lg border border-white/5"><span className={`block text-xl font-normal ${THEME.textDark}`}>{property.beds}</span><span className="text-[9px] font-bold text-gray-500 uppercase tracking-widest">Beds</span></div>
                 <div className="text-center p-4 bg-[#111111] rounded-2xl shadow-lg border border-white/5"><span className={`block text-xl font-normal ${THEME.textDark}`}>{property.baths}</span><span className="text-[9px] font-bold text-gray-500 uppercase tracking-widest">Baths</span></div>
                 <div className="text-center p-4 bg-[#111111] rounded-2xl shadow-lg border border-white/5"><span className={`block text-xl font-normal ${THEME.textDark}`}>{property.sqft}</span><span className="text-[9px] font-bold text-gray-500 uppercase tracking-widest">Sq Ft</span></div>
               </div>
             </motion.div>
        </div>
        
        <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 1, delay: 0.2 }} className="hidden lg:block absolute right-0 top-1/2 -translate-y-1/2 w-[45%] h-[70%] bg-[#1A1A1A] rounded-l-[3rem] overflow-hidden shadow-2xl z-20 border-l border-y border-white/5">
            <img src={displayImage} className="w-full h-full object-cover" alt="Hero" />
        </motion.div>
      </div>

      <div className="lg:hidden container mx-auto px-6 mb-12">
        <div className="aspect-video rounded-3xl overflow-hidden shadow-xl border border-white/10">
            <img src={displayImage} className="w-full h-full object-cover" alt="Hero Mobile" />
        </div>
      </div>

      <VisionSection property={property} />
      <GallerySection images={property.heroImages} />
      <VideoSection videoUrl={property.videoUrl} />
      <LocationSection property={property} />
      
      {/* Updated Amenities Section */}
      <AmenitiesSection property={property} />
      
      <FloorPlanSection property={property} />

      {/* REGISTER SECTION (DARK THEME) */}
      <section id="register" className={`py-20 ${THEME.bgPrimary} relative overflow-hidden`}>
        <div className={`absolute left-0 bottom-0 w-full h-1/2 ${THEME.bgSecondary} -z-10`} />
        <div className="container mx-auto px-6 md:px-24">
          <div className="max-w-4xl mx-auto bg-[#111111] border border-white/5 p-8 md:p-14 rounded-[3rem] shadow-[0_20px_50px_rgba(0,0,0,0.4)]">
            <div className="text-center mb-10">
                <h2 className={`text-2xl md:text-3xl font-normal ${THEME.textDark}`}>Register Your <span className={`font-bold ${THEME.gold}`}>Interest</span></h2>
                <p className={`${THEME.textLight} mt-2 text-sm`}>Get exclusive updates and offers directly from the developer.</p>
            </div>
            <form onSubmit={(e) => { e.preventDefault(); window.location.href = `mailto:contact@v5cproperties.com?subject=Interest in ${property.title}`; }} className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <input type="text" placeholder="First Name" className="bg-[#0A0A0A] border border-white/10 rounded-xl p-4 text-sm text-white outline-none focus:border-[#D4AF37] placeholder-gray-600" required />
              <input type="text" placeholder="Last Name" className="bg-[#0A0A0A] border border-white/10 rounded-xl p-4 text-sm text-white outline-none focus:border-[#D4AF37] placeholder-gray-600" required />
              <input type="email" placeholder="Email Address" className="bg-[#0A0A0A] border border-white/10 rounded-xl p-4 text-sm text-white outline-none focus:border-[#D4AF37] placeholder-gray-600" required />
              <input type="tel" placeholder="Phone Number" className="bg-[#0A0A0A] border border-white/10 rounded-xl p-4 text-sm text-white outline-none focus:border-[#D4AF37] placeholder-gray-600" required />
              <button className={`md:col-span-2 w-full ${THEME.goldBg} text-black py-4 rounded-xl font-bold uppercase tracking-widest shadow-lg hover:bg-white transition-all`}>Submit Interest</button>
            </form>
          </div>
        </div>
      </section>

      <footer className={`${THEME.bgPrimary} py-10 border-t border-white/10 text-center text-gray-600 text-[10px] uppercase tracking-widest`}>
        © 2025 V5C Properties LLC
      </footer>
    </div>
  );
};

export default PropertyDetail;