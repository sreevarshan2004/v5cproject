import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { useParams, Link, useNavigate, useLocation } from "react-router-dom";
import emailjs from '@emailjs/browser';
import {
  MapPin, Building, Droplets, Waves, Baby,
  Dumbbell, PersonStanding, ChevronDown, 
  ArrowLeft, Bed, Bath, Maximize, Eye, Layers, User, Edit
} from "lucide-react";
import axios from 'axios';
import { initialPropertiesData } from '../data/constants';

// --- BACKGROUND ANIMATION ---
const HeroAnimation = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    <motion.div 
      animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
      transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
      className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-[#D4AF37]/10 blur-[120px] rounded-full"
    />
    <motion.div 
      animate={{ scale: [1, 1.3, 1], opacity: [0.2, 0.4, 0.2] }}
      transition={{ duration: 10, repeat: Infinity, ease: "linear", delay: 2 }}
      className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-[#D4AF37]/5 blur-[150px] rounded-full"
    />
  </div>
);

// --- 1. VISION SECTION ---
const VisionSection = ({ property }) => (
  <section id="vision" className="py-24 bg-black text-white overflow-hidden border-t border-white/5">
    <div className="container mx-auto px-6 md:px-24">
      <div className="flex flex-col lg:flex-row items-center gap-16">
        <div className="flex-1 space-y-6">
          <div className="inline-block px-3 py-1 bg-[#D4AF37]/10 border border-[#D4AF37]/20 rounded-md">
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#D4AF37]">Vision</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-light tracking-tight">{property.title}</h2>
          <p className="text-gray-400 text-sm md:text-base leading-relaxed max-w-lg">
            {property.visionDesc || property.dynamicOptions?.vision || "Experience an unparalleled standard of opulence in this masterpiece."}
          </p>
        </div>
        <div className="flex-1 relative group w-full">
          <div className="relative rounded-2xl overflow-hidden border border-white/10 aspect-[4/3]">
            {/* Logic: 1. Main Img -> 2. First Hero Img -> 3. Fallback */}
            <img 
              src={property.img || (property.heroImages && property.heroImages[0]) || "https://via.placeholder.com/800x600?text=No+Vision+Image"} 
              alt={property.title} 
              className="w-full h-full object-cover transform group-hover:scale-105 transition duration-700"
            />
          </div>
        </div>
      </div>
    </div>
  </section>
);

// --- 2. LOCATION SECTION ---
const LocationSection = ({ property }) => {
  const highlights = property.nearbyPlaces && property.nearbyPlaces.length > 0 
    ? property.nearbyPlaces.map(p => ({ time: p.time, label: `Minutes to ${p.name}` }))
    : [
        { time: "2", label: "Minutes Walk from City Center" },
        { time: "15", label: "Minutes from Airport" },
        { time: "10", label: "Minutes from Beach" },
        { time: "5", label: "Minutes from Metro" },
      ];

  return (
    <section id="location" className="py-24 bg-black text-white border-t border-white/5">
      <div className="container mx-auto px-6 md:px-24">
        <div className="mb-16">
          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#D4AF37]">Location</span>
          <h2 className="text-2xl md:text-3xl font-light mt-2 tracking-tight">Convenience on Your Doorstep</h2>
          <p className="text-gray-400 text-sm mt-4 max-w-2xl">
            {property.location || "Strategic location with excellent connectivity."}
          </p>
        </div>
        <div className="flex flex-col lg:flex-row gap-16 items-center">
          <div className="w-full lg:w-1/2 aspect-video bg-[#111] rounded-[2rem] overflow-hidden border border-white/10 relative">
            <img src="https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=800" className="w-full h-full object-cover opacity-40 grayscale" alt="Map" />
            <div className="absolute inset-0 flex items-center justify-center">
               <div className="bg-black/80 border border-[#D4AF37] p-5 rounded-2xl backdrop-blur-md text-center">
                  <MapPin className="text-[#D4AF37] mx-auto mb-2" size={28} />
                  <span className="text-[9px] font-bold uppercase tracking-widest block">{property.location}</span>
               </div>
            </div>
          </div>
          <div className="w-full lg:w-1/2 grid grid-cols-2 gap-x-12 gap-y-12">
            {highlights.map((item, index) => (
              <div key={index}>
                <div className="flex items-baseline gap-2">
                  <span className="text-5xl font-light text-[#D4AF37]">{item.time}</span>
                  <span className="text-[10px] font-bold text-[#D4AF37]/60 uppercase">Mins</span>
                </div>
                <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mt-2">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

// --- 3. AMENITIES SECTION ---
const StarIcon = ({size}) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>;

const AmenitiesSection = ({ property }) => {
  const defaultAmenities = [
    { name: "Water Features", icon: <Droplets size={20} /> },
    { name: "Swimming Pools", icon: <Waves size={20} /> },
    { name: "Kids' play areas", icon: <Baby size={20} /> },
    { name: "Outdoor Fitness", icon: <Dumbbell size={20} /> },
    { name: "Jogging Tracks", icon: <PersonStanding size={20} /> },
  ];

  const displayAmenities = property.selectedAmenities && property.selectedAmenities.length > 0
    ? property.selectedAmenities.map(amenityId => ({
        name: amenityId.replace(/-/g, ' '),
        icon: <StarIcon size={20} /> 
      }))
    : defaultAmenities;

  return (
    <section id="amenities" className="py-24 bg-black text-white border-t border-white/5">
      <div className="container mx-auto px-6 md:px-24">
        <h2 className="text-2xl font-light mb-12">Discover <span className="font-bold text-[#D4AF37]">Features</span></h2>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-y-16">
          {displayAmenities.map((item, index) => (
            <div key={index} className="flex flex-col items-center gap-4 group">
              <div className="w-14 h-14 rounded-full bg-[#111] border border-white/10 flex items-center justify-center text-[#D4AF37] group-hover:border-[#D4AF37] transition-all">
                {item.icon}
              </div>
              <span className="text-[9px] font-bold uppercase tracking-widest text-gray-400">{item.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// --- 4. MASTER PLAN SECTION (UPDATED LOGIC) ---
const MasterplanSection = ({ property }) => {
  const points = ["Main Entrance", "Community Park", "Retail Center", "Luxury Villas", "Parking Facility", "Main Highway Access"];
  
  // FIX: Check if array exists AND has items, otherwise use fallback
  const masterImage = (property.masterPlanImages && property.masterPlanImages.length > 0) 
    ? property.masterPlanImages[0] 
    : "https://via.placeholder.com/800x600?text=Master+Plan+Available+Soon";

  return (
    <section id="masterplan" className="py-20 bg-black text-white border-t border-white/5">
      <div className="container mx-auto px-6 md:px-24">
        <h2 className="text-2xl font-light mb-10">Explore the <span className="font-bold text-[#D4AF37]">Blueprint</span></h2>
        <div className="flex flex-col lg:flex-row bg-[#111] rounded-[2rem] overflow-hidden border border-white/5">
          <div className="flex-[2] relative min-h-[400px]">
            <img 
                src={masterImage} 
                alt="Masterplan" 
                className="w-full h-full object-cover opacity-80 hover:opacity-100 transition-opacity duration-500" 
            />
          </div>
          <div className="flex-1 bg-[#1a1a1a] p-10">
            {points.map((item, index) => (
              <div key={index} className="flex items-center gap-4 py-3 border-b border-white/5">
                <span className="w-6 h-6 rounded-full border border-[#D4AF37]/30 flex items-center justify-center text-[10px] text-[#D4AF37]">{index + 1}</span>
                <span className="text-[11px] font-bold uppercase tracking-widest opacity-70">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

// --- 5. FLOOR PLAN SECTION (UPDATED LOGIC) ---
const FloorPlanSection = ({ property }) => {
  // Logic: Use DB plans if they exist, otherwise use placeholders
  const hasPlans = property.floorPlans && property.floorPlans.length > 0;
  
  const defaultPlans = [
    { type: "1 Bedroom", sqft: "850 SQFT", image: "https://via.placeholder.com/600x400?text=Floor+Plan+Sample" },
    { type: "2 Bedroom", sqft: "1200 SQFT", image: "https://via.placeholder.com/600x400?text=Floor+Plan+Sample" }
  ];

  const plansData = hasPlans ? property.floorPlans : defaultPlans;

  // State to track which button is clicked
  const [selectedType, setSelectedType] = useState(plansData[0]?.type || "1 Bedroom");

  // Update if property changes (e.g. navigation)
  useEffect(() => {
    if (hasPlans) {
        setSelectedType(property.floorPlans[0].type);
    }
  }, [property, hasPlans]);

  // Find the selected plan object
  const currentPlan = plansData.find(p => p.type === selectedType) || plansData[0];

  return (
    <section id="floorplan" className="py-20 bg-[#F9F9F9] text-black">
      <div className="container mx-auto px-6 md:px-24">
        <div className="mb-12">
          <h2 className="text-2xl font-light italic">Floor <span className="font-bold">Plans</span></h2>
          <p className="text-gray-600 text-sm mt-4 max-w-2xl">
            Thoughtfully designed layouts optimized for modern living.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* LEFT: LIST OF BUTTONS */}
          <div className="lg:col-span-3 space-y-3">
            {plansData.map((plan, idx) => (
              <button 
                key={idx} 
                onClick={() => setSelectedType(plan.type)} 
                className={`w-full text-left px-6 py-4 rounded-r-full text-[11px] font-bold uppercase transition-all border-l-4 
                  ${selectedType === plan.type 
                    ? "bg-black text-[#D4AF37] border-[#D4AF37] shadow-lg scale-105" 
                    : "bg-white text-gray-500 border-transparent hover:bg-gray-100"}`}
              >
                {plan.type}
              </button>
            ))}
          </div>

          {/* RIGHT: IMAGE DISPLAY */}
          <div className="lg:col-span-9 bg-white p-8 rounded-[2rem] border border-gray-200 text-center flex flex-col items-center justify-center min-h-[400px] shadow-sm">
            {currentPlan ? (
                <motion.div 
                    key={currentPlan.type} // Forces re-render animation when type changes
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3 }}
                    className="w-full flex flex-col items-center"
                >
                    <img 
                        src={currentPlan.image} 
                        alt={currentPlan.type} 
                        className="max-h-[450px] w-auto object-contain mb-8 hover:scale-105 transition-transform duration-500" 
                        onError={(e) => { e.target.src = "https://via.placeholder.com/800x600?text=No+Plan+Image"; }}
                    />
                    <div className="flex items-center gap-4">
                        <span className="text-xs font-black uppercase text-black border border-black/10 px-4 py-2 rounded-lg">
                            {currentPlan.type}
                        </span>
                        <span className="text-xs font-bold bg-[#D4AF37] text-black px-6 py-2 rounded-full shadow-md">
                            {currentPlan.sqft} {(!currentPlan.sqft?.toLowerCase().includes('sqft')) ? 'SQFT' : ''}
                        </span>
                    </div>
                </motion.div>
            ) : (
                <p className="text-gray-400">No floor plan details available.</p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

// --- MAIN COMPONENT ---

const PropertyDetail = ({ propertiesData }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation(); 
  const form = useRef();
  
  // Try to find property in passed data first, then state
  const foundInProps = propertiesData?.find(p => p.id?.toString() === id || p._id === id);
  const [property, setProperty] = useState(location.state?.data || foundInProps || null);
  const [loading, setLoading] = useState(!property); 
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState("");
  const [activeTab, setActiveTab] = useState("vision");

  // 1. FETCH LOGIC
 // 1. FETCH LOGIC
  useEffect(() => {
    if (property) {
        setLoading(false);
        return;
    }

    const fetchProperty = async () => {
      try {
        // 👇 UPDATE THIS LINE 👇
const response = await axios.get(`http://localhost:5000/api/properties/${id}`);
        
        setProperty(response.data);
      } catch (error) {
        console.warn("Backend Error: Loading fallback data.");
        const fallback = initialPropertiesData.find(p => p.id.toString() === id);
        if(fallback) setProperty(fallback);
      } finally {
        setLoading(false);
      }
    };

    fetchProperty();
  }, [id, property]);

  const handleEdit = () => {
    navigate("/admin/add-property", { state: { data: property } });
  };

  const sendEmail = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus(""); 
    
    // REPLACE WITH YOUR KEYS
    const SERVICE_ID = "service_htgzahr"; 
    const TEMPLATE_ID = "template_qs8u3py"; 
    const PUBLIC_KEY = "ME4ye46DOZ8wxCuNj";

    emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, form.current, PUBLIC_KEY)
    .then((result) => {
        setStatus(`Success! Details sent.`);
        form.current.reset();
    })
    .catch((error) => {
        setStatus("Submission failed.");
    })
    .finally(() => setIsSubmitting(false));
  };

  const scrollToSection = (id) => {
    setActiveTab(id);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  if (loading) return <div className="min-h-screen bg-black text-white flex items-center justify-center font-bold tracking-widest uppercase">Loading Luxury...</div>;

  if (!property) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Property Not Found</h1>
          <Link to="/" className="text-[#D4AF37] hover:underline">← Back to Home</Link>
        </div>
      </div>
    );
  }

  // Determine Main Display Image
  const displayImage = property.img || (property.heroImages && property.heroImages[0]) || "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=800";

  const user = JSON.parse(localStorage.getItem('v5c_user'));

  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-[#D4AF37] selection:text-black">
      
      {/* Sticky Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-md py-4 border-b border-white/5">
        <div className="container mx-auto px-6 md:px-24 flex items-center justify-between text-[10px] font-bold tracking-[0.2em]">
          <div className="flex gap-4">
            <Link to="/" className="flex items-center gap-2 text-[#D4AF37] hover:text-white transition-colors">
                <ArrowLeft size={16} />
                <span className="hidden sm:inline">Back</span>
            </Link>
            {user && user.role === 'admin' && (
                <button onClick={handleEdit} className="flex items-center gap-2 text-white bg-[#D4AF37]/20 px-3 rounded hover:bg-[#D4AF37] hover:text-black transition-all">
                    <Edit size={14} /> <span className="hidden sm:inline">Edit</span>
                </button>
            )}
          </div>

          <div className="hidden md:flex gap-8 uppercase">
            {['vision', 'location', 'amenities', 'floorplan', 'register'].map(item => (
              <button 
                key={item} 
                onClick={() => scrollToSection(item)} 
                className={`hover:text-[#D4AF37] transition-colors ${activeTab === item ? 'text-[#D4AF37]' : ''}`}
              >
                {item}
              </button>
            ))}
          </div>
          <div className="text-[#D4AF37] border border-[#D4AF37]/30 px-3 py-1 rounded">{property.developer}</div>
        </div>
      </header>

      {/* Hero / Main Info */}
      <div className="relative pt-40 pb-20 bg-black min-h-[90vh] flex items-center overflow-hidden">
        <HeroAnimation />
        <div className="container mx-auto px-6 md:px-24 relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-start gap-12">
             <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
               <h1 className="text-4xl md:text-6xl font-light mb-6 tracking-tight">{property.title}</h1>
               <div className="flex flex-wrap gap-8 text-[11px] text-[#D4AF37] font-bold uppercase">
                  <span className="flex items-center gap-2"><MapPin size={14} /> {property.location}</span>
                  <span className="flex items-center gap-2"><Building size={14} /> {property.category}</span>
                  <span className="text-white bg-[#D4AF37]/10 px-4 py-1.5 rounded-full border border-[#D4AF37]/20">{property.price}</span>
               </div>
             </motion.div>
             
             <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="max-w-md w-full">
               <p className="text-gray-400 text-sm leading-relaxed mb-6">
                 {property.description || "An exclusive collection of apartments blending city pace with waterfront calm."}
               </p>
               <div className="grid grid-cols-3 gap-4 text-center">
                 <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                   <Bed className="text-[#D4AF37] mx-auto mb-2" size={20} />
                   <span className="text-white font-bold block">{property.beds}</span>
                   <span className="text-[8px] text-gray-500 uppercase">Beds</span>
                 </div>
                 <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                   <Bath className="text-[#D4AF37] mx-auto mb-2" size={20} />
                   <span className="text-white font-bold block">{property.baths}</span>
                   <span className="text-[8px] text-gray-500 uppercase">Baths</span>
                 </div>
                 <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                   <Maximize className="text-[#D4AF37] mx-auto mb-2" size={20} />
                   <span className="text-white font-bold block">{property.sqft}</span>
                   <span className="text-[8px] text-gray-500 uppercase">Sq Ft</span>
                 </div>
               </div>
             </motion.div>
          </div>
        </div>
        
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-gray-500 animate-bounce cursor-pointer" onClick={() => scrollToSection('vision')}>
            <span className="text-[8px] font-bold uppercase tracking-[0.3em]">Explore</span>
            <ChevronDown size={20} />
        </div>
      </div>

      <section className="py-0 bg-black">
        <div className="container mx-auto px-6 md:px-24">
          <div className="relative rounded-[2rem] overflow-hidden border border-white/10 aspect-[21/9] group">
            <img 
                src={displayImage} 
                alt={property.title} 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" 
                onError={(e) => { e.target.src = "https://via.placeholder.com/1200x600?text=No+Main+Image"; }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
            <div className="absolute bottom-8 left-8 right-8 flex justify-between items-end">
              <div>
                <span className="text-[#D4AF37] text-xs font-bold uppercase tracking-widest block mb-2">{property.developer}</span>
                <h3 className="text-white text-2xl font-bold">{property.title}</h3>
              </div>
            </div>
          </div>
        </div>
      </section>

      <VisionSection property={property} />
      <LocationSection property={property} />
      <AmenitiesSection property={property} />
      <MasterplanSection property={property} />
      <FloorPlanSection property={property} />

      <section id="register" className="py-24 bg-black text-white border-t border-white/5 relative overflow-hidden">
        <div className="container mx-auto px-6 md:px-24 relative z-10">
          <div className="text-center mb-16">
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#D4AF37]">Registration</span>
            <h2 className="text-4xl font-light mt-4 tracking-tight">Register Your <span className="font-bold text-[#D4AF37]">Interest</span></h2>
          </div>

          <div className="max-w-4xl mx-auto bg-[#0A0A0A] border border-white/10 p-8 md:p-16 rounded-[3rem] shadow-2xl">
            <form ref={form} onSubmit={sendEmail} className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <input type="hidden" name="property_title" value={property.title} />
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase text-gray-500 ml-1">First Name</label>
                <input type="text" name="user_name" placeholder="John Doe" className="w-full bg-white/5 border border-white/10 rounded-xl py-4 px-6 text-sm outline-none focus:border-[#D4AF37] text-white" required />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase text-gray-500 ml-1">Last Name</label>
                <input type="text" name="lastName" placeholder="Doe" className="w-full bg-white/5 border border-white/10 rounded-xl py-4 px-6 text-sm outline-none focus:border-[#D4AF37] text-white" required />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase text-gray-500 ml-1">Email Address</label>
                <input type="email" name="user_email" placeholder="john@example.com" className="w-full bg-white/5 border border-white/10 rounded-xl py-4 px-6 text-sm outline-none focus:border-[#D4AF37] text-white" required />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase text-gray-500 ml-1">Phone Number</label>
                <input type="tel" name="user_phone" placeholder="+971 00 000 0000" className="w-full bg-white/5 border border-white/10 rounded-xl py-4 px-6 text-sm outline-none focus:border-[#D4AF37] text-white" required />
              </div>
              
              <div className="md:col-span-2 pt-4">
                <button type="submit" disabled={isSubmitting} className="w-full bg-[#D4AF37] text-black py-5 rounded-2xl text-[11px] font-bold uppercase tracking-[0.3em] hover:bg-white transition-all disabled:opacity-50">
                  {isSubmitting ? "Sending..." : "Submit Interest"}
                </button>
                {status && (
                    <p className={`text-center mt-4 text-xs ${status.includes('Success') ? 'text-green-500' : 'text-[#D4AF37]'}`}>
                        {status}
                    </p>
                )}
              </div>
            </form>
          </div>
        </div>
      </section>

      <footer className="bg-black text-white py-10 border-t border-white/10 text-center">
        <div className="text-[10px] text-gray-500 uppercase tracking-widest">
          © 2025 V5C Properties LLC | {property.title}
        </div>
      </footer>
    </div>
  );
};

export default PropertyDetail;