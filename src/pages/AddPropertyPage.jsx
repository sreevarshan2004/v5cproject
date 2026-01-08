import React, { useState, useRef, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Upload, X, Plus, Save, Star, Trash2, ArrowLeft, CheckCircle, LayoutGrid, Handshake, Map } from "lucide-react";
import { DEFAULT_AMENITIES } from "../data/constants";

// --- 1. ANIMATION VARIANTS (Must be outside component) ---
const containerVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1, 
    transition: { staggerChildren: 0.1, duration: 0.5 } 
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 100 } }
};

// --- 2. HELPER FUNCTIONS ---
const convertToBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = () => resolve(fileReader.result);
    fileReader.onerror = (error) => reject(error);
  });
};

// --- 3. ANIMATED INPUT COMPONENT (Must be outside component) ---
const AnimatedInput = ({ type = "text", placeholder, value, onChange, name, className = "" }) => (
  <motion.div 
    whileFocus={{ scale: 1.01 }} 
    className="relative group w-full"
  >
    <input 
      type={type} 
      name={name}
      placeholder={placeholder} 
      value={value} 
      onChange={onChange}
      className={`w-full bg-[#111] border border-white/20 rounded-xl p-4 text-sm text-white placeholder-gray-500 outline-none 
        focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37]/50 focus:shadow-[0_0_20px_rgba(212,175,55,0.2)] 
        hover:border-[#D4AF37]/50 transition-all duration-300 ${className}`} 
    />
  </motion.div>
);

// --- MAIN COMPONENT ---
const AddPropertyPage = ({ section, onSubmit }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const API_BASE = "http://localhost:5000/api"; // Ensure this matches your backend URL
  
  const editData = location.state?.data;
  const isEdit = !!editData;

  // --- STATE MANAGEMENT ---
  // 1. Property
  const [formData, setFormData] = useState(isEdit && section === "property" ? editData : {
    title: "", location: "", price: "", developer: "EMAAR", category: "Luxury",
    beds: "", baths: "", sqft: "", description: "",
    heroImages: [], masterPlanImages: [], nearbyPlaces: [],
    floorPlans: [], selectedAmenities: [], visionDesc: "",
    ownerName: "", ownerEmail: "", ownerPhone: "", ownerCountry: "United Arab Emirates",
    propertyValue: "", privacyConsent: false
  });

  // 2. Other Sections
  const [serviceCard, setServiceCard] = useState(isEdit && section === "services" ? editData : { title: "", image: "" });
  const [partnerCard, setPartnerCard] = useState(isEdit && section === "partners" ? editData : { name: "", logo: "" });
  const [emirateCard, setEmirateCard] = useState(isEdit && section === "emirates" ? editData : { name: "", desc: "" });
  const [whyCard, setWhyCard] = useState(isEdit && section === "whydubai" ? editData : { title: "", text: "", points: [], currentPoint: "" });

  // 3. Helpers
  const [availableAmenities, setAvailableAmenities] = useState(DEFAULT_AMENITIES);
  const [customAmenityName, setCustomAmenityName] = useState("");
  const [newPlace, setNewPlace] = useState({ name: "", time: "" });
  const [newFloorPlan, setNewFloorPlan] = useState({ type: "1 Bedroom", sqft: "", image: "" });
  const floorPlanInputRef = useRef(null);

  useEffect(() => { window.scrollTo(0, 0); }, []);

  // --- HANDLERS ---
  const handlePropChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleImageUpload = async (e, updateFunction) => {
    if (e.target.files && e.target.files[0]) {
      const base64 = await convertToBase64(e.target.files[0]);
      // Smart setter to handle different key names
      if (section === 'services') updateFunction(prev => ({...prev, image: base64}));
      else if (section === 'partners') updateFunction(prev => ({...prev, logo: base64}));
      else updateFunction(base64);
    }
  };

  const handleMultiImageUpload = async (e, fieldName) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      const base64Array = await Promise.all(files.map(file => convertToBase64(file)));
      setFormData(prev => ({ ...prev, [fieldName]: [...prev[fieldName], ...base64Array] }));
    }
  };

  const addFloorPlan = () => {
    if (newFloorPlan.sqft && newFloorPlan.image) {
      setFormData(prev => ({ ...prev, floorPlans: [...prev.floorPlans, newFloorPlan] }));
      setNewFloorPlan({ type: "1 Bedroom", sqft: "", image: "" });
      if (floorPlanInputRef.current) floorPlanInputRef.current.value = "";
    } else {
        alert("Please enter Sq. Ft. and upload an image.");
    }
  };

  const addNearbyPlace = () => {
    if (newPlace.name && newPlace.time) {
      setFormData(prev => ({ ...prev, nearbyPlaces: [...prev.nearbyPlaces, newPlace] }));
      setNewPlace({ name: "", time: "" });
    }
  };

  const toggleAmenity = (id) => {
    setFormData(prev => {
      const exists = prev.selectedAmenities.includes(id);
      return { ...prev, selectedAmenities: exists ? prev.selectedAmenities.filter(a => a !== id) : [...prev.selectedAmenities, id] };
    });
  };

  const addCustomAmenity = () => {
    if (customAmenityName.trim()) {
      const newId = customAmenityName.toLowerCase().replace(/\s+/g, '-');
      if (!availableAmenities.find(a => a.id === newId)) {
        const newAmenity = { id: newId, label: customAmenityName, icon: Star };
        setAvailableAmenities(prev => [...prev, newAmenity]);
        setFormData(prev => ({ ...prev, selectedAmenities: [...prev.selectedAmenities, newId] }));
        setCustomAmenityName("");
      }
    }
  };

  const handleDelete = async () => {
    if (window.confirm(`Are you sure you want to delete this ${section}?`)) {
      try {
        const endpointMap = {
          property: "/properties",
          services: "/services",
          partners: "/partners",
          emirates: "/emirates",
          whydubai: "/whydubai"
        };
        await fetch(`${API_BASE}${endpointMap[section]}/${editData._id}`, { method: 'DELETE' });
        alert("Deleted Successfully!");
        navigate("/");
        window.location.reload();
      } catch (error) {
        console.error("Delete failed", error);
      }
    }
  };

  // --- SUBMIT LOGIC ---
  const handleSubmit = async (e) => {
    e.preventDefault();
    let finalObject = {};
    let endpoint = "";

    // 1. Prepare Data based on Section
    if (section === "property") {
      if (!formData.privacyConsent) return alert("Please accept privacy policy.");
      finalObject = { ...formData, img: formData.heroImages[0] || "" };
      endpoint = "/properties";
    } 
    else if (section === "services") {
      if (!serviceCard.title) return alert("Title required");
      finalObject = { ...serviceCard };
      endpoint = "/services";
    } 
    else if (section === "partners") {
      if (!partnerCard.name) return alert("Name required");
      finalObject = { ...partnerCard };
      endpoint = "/partners";
    } 
    else if (section === "emirates") {
      if (!emirateCard.name) return alert("Name required");
      finalObject = { ...emirateCard };
      endpoint = "/emirates";
    } 
    else if (section === "whydubai") {
      if (!whyCard.title) return alert("Title required");
      finalObject = { ...whyCard };
      endpoint = "/whydubai";
    }

    // 2. Send to Backend
    try {
        let response;
        if (isEdit && editData._id) {
            // Edit Existing
            response = await fetch(`${API_BASE}${endpoint}/${editData._id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(finalObject)
            });
        } else {
            // Create New
            response = await fetch(`${API_BASE}${endpoint}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(finalObject)
            });
        }
        
        if(!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || "Failed to save");
        }

        alert(isEdit ? "Updated Successfully!" : "Saved successfully!");
        navigate("/");
        window.location.reload();
    } catch (error) {
        console.error("Error saving:", error);
        alert("Error: " + error.message);
    }
  };
 
  const getHeader = () => {
    const prefix = isEdit ? "Edit" : "Add";
    switch (section) {
      case 'services': return `${prefix} Service`;
      case 'partners': return `${prefix} Partner`;
      case 'whydubai': return `${prefix} Why Dubai Info`;
      case 'emirates': return `${prefix} Emirate`;
      default: return isEdit ? 'Edit Property' : 'List New Asset';
    }
  };

  // --- 4. RENDER FORMS ---
  const renderFormContent = () => {
    switch (section) {
      case "property":
        return (
          <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-12">
            {/* ... (Property Form Code - same as before) ... */}
            <motion.div variants={itemVariants} className="space-y-6">
              <div className="flex items-center gap-3 border-b border-white/20 pb-2 mb-4">
                  <div className="h-2 w-2 bg-[#D4AF37] rounded-full animate-pulse" />
                  <h3 className="text-xl font-bold uppercase tracking-widest text-white">Details</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <AnimatedInput name="title" value={formData.title} onChange={handlePropChange} placeholder="Property Title" />
                <AnimatedInput name="location" value={formData.location} onChange={handlePropChange} placeholder="Location" />
                <AnimatedInput name="price" value={formData.price} onChange={handlePropChange} placeholder="Price (AED)" />
                <div className="grid grid-cols-2 gap-4">
                  <AnimatedInput type="number" name="beds" value={formData.beds} onChange={handlePropChange} placeholder="Beds" />
                  <AnimatedInput type="number" name="baths" value={formData.baths} onChange={handlePropChange} placeholder="Baths" />
                </div>
                <AnimatedInput name="sqft" value={formData.sqft} onChange={handlePropChange} placeholder="Sq. Ft." />
              </div>
              <motion.textarea 
                whileFocus={{ scale: 1.01, borderColor: "#D4AF37" }}
                name="description" rows="4" onChange={handlePropChange} value={formData.description} 
                className="w-full bg-[#111] border border-white/20 rounded-xl p-4 text-sm focus:border-[#D4AF37] focus:shadow-[0_0_15px_rgba(212,175,55,0.2)] outline-none text-white transition-all placeholder-gray-500 hover:border-[#D4AF37]/50" 
                placeholder="Property Description..." 
              />
            </motion.div>

            {/* IMAGES */}
            <motion.div variants={itemVariants} className="space-y-6">
              <div className="flex items-center gap-3 border-b border-white/20 pb-2 mb-4">
                  <div className="h-2 w-2 bg-[#D4AF37] rounded-full animate-pulse" />
                  <h3 className="text-xl font-bold uppercase tracking-widest text-white">Gallery</h3>
              </div>
              <div className="relative group w-full h-40 bg-[#111] border-2 border-dashed border-white/20 rounded-xl flex flex-col items-center justify-center cursor-pointer hover:border-[#D4AF37] hover:bg-[#D4AF37]/5 transition-all overflow-hidden">
                <input type="file" multiple className="absolute inset-0 opacity-0 cursor-pointer z-10" onChange={(e) => handleMultiImageUpload(e, 'heroImages')} />
                <Upload className="mb-2 text-gray-500 group-hover:text-[#D4AF37] transition-colors" /> 
                <span className="text-xs font-bold uppercase tracking-widest text-gray-500 group-hover:text-white">Upload Renders</span>
              </div>
              
              <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
                  <AnimatePresence>
                  {formData.heroImages.map((img, i) => (
                    <motion.div 
                        key={i} 
                        initial={{ opacity: 0, scale: 0.8 }} 
                        animate={{ opacity: 1, scale: 1 }} 
                        exit={{ opacity: 0, scale: 0 }}
                        className="flex-shrink-0 w-32 h-20 rounded-lg overflow-hidden border border-white/20 relative group"
                    >
                      <img src={img} alt={`Hero ${i}`} className="w-full h-full object-cover" />
                      <button type="button" onClick={() => setFormData(prev => ({ ...prev, heroImages: prev.heroImages.filter((_, idx) => idx !== i) }))} className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                          <Trash2 size={16} className="text-red-500" />
                      </button>
                    </motion.div>
                  ))}
                  </AnimatePresence>
              </div>
            </motion.div>

            {/* MASTER PLAN & CONNECTIVITY */}
            <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Master Plan */}
                <div className="bg-[#111] p-6 rounded-2xl border border-white/20 relative overflow-hidden group hover:border-[#D4AF37]/50 transition-colors">
                    <h3 className="text-sm font-bold uppercase tracking-widest text-[#D4AF37] mb-4">Master Plan</h3>
                    <div className="relative h-24 border-2 border-dashed border-white/20 rounded-xl flex items-center justify-center cursor-pointer hover:border-[#D4AF37] transition-all">
                        <input type="file" multiple className="absolute inset-0 opacity-0 cursor-pointer z-10" onChange={(e) => handleMultiImageUpload(e, 'masterPlanImages')} />
                        <Upload size={20} className="text-gray-500 group-hover:text-[#D4AF37]" />
                    </div>
                </div>

                {/* Connectivity */}
                <div className="bg-[#111] p-6 rounded-2xl border border-white/20 relative overflow-hidden group hover:border-[#D4AF37]/50 transition-colors">
                    <h3 className="text-sm font-bold uppercase tracking-widest text-[#D4AF37] mb-4">Connectivity</h3>
                    <div className="flex gap-2 mb-4">
                        <input type="text" placeholder="Place" className="flex-1 bg-black border border-white/20 rounded-lg p-2 text-xs text-white outline-none focus:border-[#D4AF37]" value={newPlace.name} onChange={(e) => setNewPlace({ ...newPlace, name: e.target.value })} />
                        <input type="number" placeholder="Mins" className="w-16 bg-black border border-white/20 rounded-lg p-2 text-xs text-white outline-none focus:border-[#D4AF37]" value={newPlace.time} onChange={(e) => setNewPlace({ ...newPlace, time: e.target.value })} />
                        <button type="button" onClick={addNearbyPlace} className="bg-[#D4AF37] text-black px-3 rounded-lg hover:bg-white transition-colors font-bold"><Plus size={16} /></button>
                    </div>
                    <div className="space-y-2">
                        {formData.nearbyPlaces.map((p, i) => (
                            <motion.div key={i} className="flex justify-between items-center text-xs bg-white/5 p-2 rounded">
                                <span className="text-gray-300">{p.name}</span>
                                <span className="text-[#D4AF37] font-bold">{p.time} MIN</span>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </motion.div>

            {/* FLOOR PLANS */}
            <motion.div variants={itemVariants} className="space-y-6">
                <div className="flex items-center gap-3 border-b border-white/20 pb-2 mb-4">
                    <div className="h-2 w-2 bg-[#D4AF37] rounded-full animate-pulse" />
                    <h3 className="text-xl font-bold uppercase tracking-widest text-white">Floor Plans</h3>
                </div>

                <div className="flex flex-col md:flex-row gap-4 bg-[#111] p-6 rounded-2xl border border-white/20 group hover:border-[#D4AF37]/50 transition-all">
                    <div className="flex-1 space-y-4">
                        <select className="w-full bg-[#111] border border-white/20 rounded-xl p-4 text-sm text-white focus:border-[#D4AF37] outline-none transition-all" onChange={(e) => setNewFloorPlan({...newFloorPlan, type: e.target.value})} value={newFloorPlan.type}>
                            {[1, 2, 3, 4, 5].map(num => <option key={num} value={`${num} Bedroom`}>{num} Bedroom</option>)}
                            <option value="Penthouse">Penthouse</option>
                        </select>
                        <AnimatedInput name="sqft" value={newFloorPlan.sqft} onChange={(e) => setNewFloorPlan({...newFloorPlan, sqft: e.target.value})} placeholder="Size (e.g. 1,200 SQFT)" />
                    </div>
                    <div className="flex-1 flex flex-col gap-4">
                        <div className="relative h-full min-h-[100px] bg-black border-2 border-dashed border-white/20 rounded-xl flex items-center justify-center cursor-pointer hover:border-[#D4AF37] transition-all">
                            <input type="file" ref={floorPlanInputRef} className="absolute inset-0 opacity-0 cursor-pointer z-10" onChange={(e) => handleImageUpload(e, (url) => setNewFloorPlan(prev => ({ ...prev, image: url })))} />
                            {newFloorPlan.image ? (
                                <img src={newFloorPlan.image} alt="Preview" className="h-24 w-full object-contain p-2" />
                            ) : (
                                <div className="flex flex-col items-center text-gray-500">
                                    <Upload size={20} />
                                    <span className="text-[10px] uppercase font-bold mt-2">Upload Plan</span>
                                </div>
                            )}
                        </div>
                        <button type="button" onClick={addFloorPlan} className="w-full py-3 bg-[#D4AF37] text-black font-bold uppercase text-xs rounded-xl hover:bg-white transition-colors">Add Plan</button>
                    </div>
                </div>
            </motion.div>

            {/* AMENITIES & FINAL SUBMIT (omitted for brevity, assume same structure) */}
            <motion.div variants={itemVariants}>
               <h3 className="text-xl font-bold uppercase tracking-widest text-white mb-6">Lifestyle</h3>
               <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                {availableAmenities.map((amenity) => {
                  const isSelected = formData.selectedAmenities.includes(amenity.id);
                  return (
                    <motion.div 
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        key={amenity.id} 
                        onClick={() => toggleAmenity(amenity.id)} 
                        className={`flex flex-col items-center gap-3 p-4 rounded-xl border cursor-pointer transition-all duration-300 relative overflow-hidden group ${isSelected ? 'bg-[#D4AF37] border-[#D4AF37] text-black' : 'bg-[#111] border-white/20 text-gray-500 hover:border-white/50'}`}
                    >
                      <amenity.icon size={24} className="relative z-10" />
                      <span className="text-[10px] font-black uppercase text-center relative z-10">{amenity.label}</span>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
            
             {/* OWNER */}
             <motion.div variants={itemVariants} className="bg-gradient-to-br from-[#D4AF37] to-[#FCEabb] p-[1px] rounded-[2rem] mt-12">
               <div className="bg-[#050505] p-8 rounded-[2rem]">
                   <h2 className="text-2xl font-black uppercase mb-6 text-white tracking-tighter">Ownership <span className="text-[#D4AF37]">Profile</span></h2>
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                       <AnimatedInput name="ownerName" value={formData.ownerName} onChange={handlePropChange} placeholder="Owner Name" />
                       <AnimatedInput name="ownerEmail" value={formData.ownerEmail} onChange={handlePropChange} placeholder="Email" />
                       <AnimatedInput name="ownerPhone" value={formData.ownerPhone} onChange={handlePropChange} placeholder="Phone" />
                       <AnimatedInput name="propertyValue" value={formData.propertyValue} onChange={handlePropChange} placeholder="Value (AED)" />
                   </div>
                   <label className="flex items-center gap-3 mt-6 cursor-pointer group">
                      <div className={`w-5 h-5 border rounded flex items-center justify-center transition-colors ${formData.privacyConsent ? 'bg-[#D4AF37] border-[#D4AF37]' : 'border-gray-500'}`}>
                          {formData.privacyConsent && <CheckCircle size={14} className="text-black" />}
                      </div>
                      <input type="checkbox" checked={formData.privacyConsent} onChange={(e) => setFormData({ ...formData, privacyConsent: e.target.checked })} className="hidden" />
                      <span className="text-[10px] font-bold uppercase tracking-widest text-gray-500 group-hover:text-white transition-colors">I accept the Terms & Privacy Policy.</span>
                   </label>
               </div>
            </motion.div>
          </motion.div>
        );

      case "services":
        return (
          <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-6 max-w-xl mx-auto">
            <div className="relative h-64 bg-[#111] border-2 border-dashed border-white/20 rounded-2xl flex items-center justify-center overflow-hidden group hover:border-[#D4AF37] transition-all">
              <input type="file" className="absolute inset-0 opacity-0 cursor-pointer z-10" onChange={(e) => handleImageUpload(e, setServiceCard)} />
              {serviceCard.image ? <img src={serviceCard.image} className="w-full h-full object-cover" /> : (
                  <div className="flex flex-col items-center text-gray-500 group-hover:text-[#D4AF37] transition-colors">
                      <LayoutGrid size={48} strokeWidth={1} className="mb-4" />
                      <span className="text-xs font-bold uppercase tracking-widest">Upload Service Visual</span>
                  </div>
              )}
            </div>
            <AnimatedInput value={serviceCard.title} onChange={e => setServiceCard({...serviceCard, title: e.target.value})} placeholder="Service Title" />
          </motion.div>
        );

      case "partners":
        return (
          <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-6 max-w-xl mx-auto">
            <div className="relative h-48 bg-[#111] border-2 border-dashed border-white/20 rounded-2xl flex items-center justify-center overflow-hidden group hover:border-[#D4AF37] transition-all">
              <input type="file" className="absolute inset-0 opacity-0 cursor-pointer z-10" onChange={(e) => handleImageUpload(e, setPartnerCard)} />
              {partnerCard.logo ? <img src={partnerCard.logo} className="h-32 object-contain" /> : (
                  <div className="flex flex-col items-center text-gray-500 group-hover:text-[#D4AF37] transition-colors">
                      <Handshake size={48} strokeWidth={1} className="mb-4" />
                      <span className="text-xs font-bold uppercase tracking-widest">Upload Partner Logo</span>
                  </div>
              )}
            </div>
            <AnimatedInput value={partnerCard.name} onChange={e => setPartnerCard({...partnerCard, name: e.target.value})} placeholder="Partner Name" />
          </motion.div>
        );

      case "whydubai":
        return (
          <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-6 max-w-xl mx-auto">
            <AnimatedInput value={whyCard.title} onChange={e => setWhyCard({...whyCard, title: e.target.value})} placeholder="Title (e.g. High ROI)" />
            <motion.textarea 
                rows="3" 
                placeholder="Description" 
                className={`w-full bg-[#111] border border-white/20 rounded-xl p-4 text-sm text-white focus:border-[#D4AF37] focus:shadow-[0_0_15px_rgba(212,175,55,0.2)] outline-none hover:border-[#D4AF37]/40 transition-all`} 
                value={whyCard.text} 
                onChange={e => setWhyCard({...whyCard, text: e.target.value})} 
            />
            <div className="flex gap-2">
                <input 
                    type="text" 
                    placeholder="Add Benefit Point" 
                    className="flex-1 bg-[#111] border border-white/20 rounded-xl p-3 text-white outline-none focus:border-[#D4AF37] focus:shadow-[0_0_10px_rgba(212,175,55,0.2)] transition-all"
                    value={whyCard.currentPoint} 
                    onChange={e => setWhyCard({...whyCard, currentPoint: e.target.value})} 
                />
                <button type="button" onClick={() => { if(whyCard.currentPoint) setWhyCard({...whyCard, points: [...whyCard.points, whyCard.currentPoint], currentPoint: ""}) }} className="bg-[#D4AF37] text-black px-4 rounded-xl hover:bg-white"><Plus /></button>
            </div>
            <ul className="pl-4 list-disc text-gray-400">
                {whyCard.points.map((p, i) => <li key={i}>{p}</li>)}
            </ul>
          </motion.div>
        );

      case "emirates":
        return (
            <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-6 max-w-xl mx-auto">
                <AnimatedInput value={emirateCard.name} onChange={e => setEmirateCard({...emirateCard, name: e.target.value})} placeholder="Emirate Name" />
                <motion.textarea 
                    rows="3" 
                    placeholder="Description" 
                    className={`w-full bg-[#111] border border-white/20 rounded-xl p-4 text-sm text-white focus:border-[#D4AF37] focus:shadow-[0_0_15px_rgba(212,175,55,0.2)] outline-none hover:border-[#D4AF37]/40 transition-all`} 
                    value={emirateCard.desc} 
                    onChange={e => setEmirateCard({...emirateCard, desc: e.target.value})} 
                />
            </motion.div>
        );

      default: return <div>Unknown Section</div>;
    }
  };

  return (
    <div className="min-h-screen bg-black text-white pt-24 md:pt-32 pb-24 font-sans selection:bg-[#D4AF37] selection:text-black overflow-x-hidden relative">
      <div className="absolute inset-0 pointer-events-none">
          <motion.div animate={{ opacity: [0.1, 0.3, 0.1], scale: [1, 1.1, 1] }} transition={{ duration: 10, repeat: Infinity }} className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-[#D4AF37]/10 blur-[150px] rounded-full" />
      </div>

      <div className="container mx-auto px-4 md:px-6 max-w-6xl relative z-10">
        <div className="flex justify-between items-center mb-12">
          <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-gray-500 hover:text-[#D4AF37] transition-colors uppercase text-xs font-bold tracking-widest">
            <ArrowLeft size={16} /> Dashboard
          </button>
          {isEdit && <motion.button whileHover={{ scale: 1.05, color: "#EF4444" }} onClick={handleDelete} className="flex items-center gap-2 text-red-500/80 font-bold uppercase text-xs tracking-widest bg-red-500/10 px-4 py-2 rounded-full hover:bg-red-500/20 transition-all"><Trash2 size={14}/> Delete Entry</motion.button>}
        </div>

        <motion.header 
            initial={{ opacity: 0, y: -20 }} 
            animate={{ opacity: 1, y: 0 }} 
            className="mb-16 text-center"
        >
          <span className="text-[#D4AF37] text-[10px] font-black uppercase tracking-[0.6em] block mb-4">V5C Management Console</span>
          <h1 className="text-3xl md:text-6xl font-black uppercase tracking-tighter text-white">{getHeader()}</h1>
        </motion.header>

        <motion.form 
            initial={{ opacity: 0, y: 30 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.6 }}
            onSubmit={handleSubmit} 
            className="bg-[#0A0A0A]/90 backdrop-blur-xl p-8 md:p-16 rounded-[3rem] border border-[#D4AF37]/20 shadow-[0_0_40px_-10px_rgba(212,175,55,0.1)] relative overflow-hidden"
        >
          <div className="absolute inset-0 opacity-5 pointer-events-none" style={{ backgroundImage: 'radial-gradient(#fff 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
          {renderFormContent()}
          <motion.button whileHover={{ scale: 1.02, boxShadow: "0 0 30px rgba(204, 168, 48, 0.4)" }} whileTap={{ scale: 0.98 }} type="submit" className="w-full py-6 mt-16 bg-gradient-to-r from-[#D4AF37] to-[#FCEabb] text-black font-black uppercase text-sm rounded-2xl flex items-center justify-center gap-3 relative overflow-hidden group">
            <span className="relative z-10 flex items-center gap-2"><Save size={18} /> {isEdit ? "Update System" : "Publish to Live"}</span>
            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
          </motion.button>
        </motion.form>
      </div>
    </div>
  );
};

export default AddPropertyPage;