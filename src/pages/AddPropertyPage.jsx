import React, { useState, useRef, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Upload, Plus, Save, Trash2, ArrowLeft, CheckCircle, 
  LayoutGrid, Handshake, FileText, Video, X, Image as ImageIcon 
} from "lucide-react";
import { DEFAULT_AMENITIES } from "../data/constants";

// --- 1. ANIMATION VARIANTS ---
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

// --- 3. ANIMATED INPUT COMPONENT (DARK THEME DEFAULT) ---
// This is used for the main black sections
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
      className={`w-full bg-[#0A0A0A] border border-white/10 rounded-xl p-4 text-sm text-white placeholder-gray-600 outline-none 
        focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37]/50 focus:shadow-[0_0_15px_rgba(212,175,55,0.2)] 
        hover:border-[#D4AF37]/50 transition-all duration-300 shadow-sm ${className}`} 
    />
  </motion.div>
);

// --- MAIN COMPONENT ---
const AddPropertyPage = ({ section, onSubmit }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const API_BASE = "http://localhost:5000/api";
  const editData = location.state?.data;
  const isEdit = !!editData;

  // --- STATE MANAGEMENT ---
  const [formData, setFormData] = useState(isEdit && section === "property" ? editData : {
    title: "", location: "", price: "", developer: "EMAAR", category: "Luxury",
    beds: "", baths: "", sqft: "", description: "",
    heroImages: [], masterPlanImages: [], nearbyPlaces: [],
    floorPlans: [], selectedAmenities: [], visionDesc: "",
    ownerName: "", ownerEmail: "", ownerPhone: "", ownerCountry: "United Arab Emirates",
    propertyValue: "", privacyConsent: false,
    brochure: "", 
    videoUrl: "" // Can be URL or Base64
  });

  // Other section states
  const [serviceCard, setServiceCard] = useState(isEdit && section === "services" ? editData : { title: "", image: "" });
  const [partnerCard, setPartnerCard] = useState(isEdit && section === "partners" ? editData : { name: "", logo: "" });
  const [emirateCard, setEmirateCard] = useState(isEdit && section === "emirates" ? editData : { name: "", desc: "" });
  const [whyCard, setWhyCard] = useState(isEdit && section === "whydubai" ? editData : { title: "", text: "", points: [], currentPoint: "" });

  const [availableAmenities, setAvailableAmenities] = useState(DEFAULT_AMENITIES);
  const [newPlace, setNewPlace] = useState({ name: "", time: "" });
  const [newFloorPlan, setNewFloorPlan] = useState({ type: "1 Bedroom", sqft: "", image: "" });
  
  // Refs to clear file inputs after selection
  const floorPlanInputRef = useRef(null);
  const videoInputRef = useRef(null);

  useEffect(() => { window.scrollTo(0, 0); }, []);

  // --- HANDLERS ---
  const handlePropChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  // Generic Single Image Upload
  const handleImageUpload = async (e, updateFunction) => {
    if (e.target.files && e.target.files[0]) {
      const base64 = await convertToBase64(e.target.files[0]);
      if (section === 'services') updateFunction(prev => ({...prev, image: base64}));
      else if (section === 'partners') updateFunction(prev => ({...prev, logo: base64}));
      else updateFunction(base64);
    }
  };

  // PDF Brochure Upload
  const handleBrochureUpload = async (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.type !== "application/pdf") {
        return alert("Please upload a valid PDF file.");
      }
      const base64 = await convertToBase64(file);
      setFormData(prev => ({ ...prev, brochure: base64 }));
    }
  };

  // Video Upload (Local File)
  const handleVideoFileUpload = async (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      // Warning for large files (Base64 bloats DB)
      if (file.size > 15 * 1024 * 1024) { 
        return alert("Video file is too large! Please use a YouTube URL or a file under 15MB.");
      }
      const base64 = await convertToBase64(file);
      setFormData(prev => ({ ...prev, videoUrl: base64 }));
    }
  };

  // Multi-Image Upload (Hero & Master Plan)
  const handleMultiImageUpload = async (e, fieldName) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      const base64Array = await Promise.all(files.map(file => convertToBase64(file)));
      setFormData(prev => ({ ...prev, [fieldName]: [...prev[fieldName], ...base64Array] }));
    }
  };

  // Add Floor Plan to List
  const addFloorPlan = () => {
    if (newFloorPlan.sqft && newFloorPlan.image) {
      setFormData(prev => ({ ...prev, floorPlans: [...prev.floorPlans, newFloorPlan] }));
      setNewFloorPlan({ type: "1 Bedroom", sqft: "", image: "" });
      if (floorPlanInputRef.current) floorPlanInputRef.current.value = "";
    } else {
        alert("Please enter Sq. Ft. and upload an image for the floor plan.");
    }
  };

  // Remove Items from Arrays
  const removeArrayItem = (field, index) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index)
    }));
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

  // Submit & Delete Handlers
  const handleDelete = async () => {
    if (window.confirm(`Are you sure you want to delete this ${section}?`)) {
      try {
        const endpointMap = { property: "/properties", services: "/services", partners: "/partners", emirates: "/emirates", whydubai: "/whydubai" };
        await fetch(`${API_BASE}${endpointMap[section]}/${editData._id}`, { method: 'DELETE' });
        alert("Deleted Successfully!");
        navigate("/");
        window.location.reload();
      } catch (error) { console.error("Delete failed", error); }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let finalObject = {};
    let endpoint = "";

    if (section === "property") {
      if (!formData.privacyConsent) return alert("Please accept privacy policy.");
      // Ensure img is set for card display
      finalObject = { ...formData, img: formData.heroImages[0] || "" };
      endpoint = "/properties";
    } 
    // ... (other sections logic remains same)
    else if (section === "services") { finalObject = { ...serviceCard }; endpoint = "/services"; } 
    else if (section === "partners") { finalObject = { ...partnerCard }; endpoint = "/partners"; } 
    else if (section === "emirates") { finalObject = { ...emirateCard }; endpoint = "/emirates"; } 
    else if (section === "whydubai") { finalObject = { ...whyCard }; endpoint = "/whydubai"; }

    try {
        const method = isEdit && editData._id ? 'PUT' : 'POST';
        const url = isEdit && editData._id ? `${API_BASE}${endpoint}/${editData._id}` : `${API_BASE}${endpoint}`;
        
        const response = await fetch(url, {
            method: method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(finalObject)
        });
        
        if(!response.ok) throw new Error("Failed to save");
        alert(isEdit ? "Updated Successfully!" : "Saved successfully!");
        navigate("/");
        window.location.reload();
    } catch (error) { alert("Error: " + error.message); }
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

  // --- RENDER FORM CONTENT ---
  const renderFormContent = () => {
    switch (section) {
      case "property":
        return (
          <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-12">
            
            {/* 1. DETAILS SECTION (BLACK) */}
            <motion.div variants={itemVariants} className="space-y-6">
              <div className="flex items-center gap-3 border-b border-white/10 pb-2 mb-4">
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
                <AnimatedInput name="developer" value={formData.developer} onChange={handlePropChange} placeholder="Developer Name" />
              </div>
              <motion.textarea 
                whileFocus={{ scale: 1.01, borderColor: "#D4AF37" }}
                name="description" rows="4" onChange={handlePropChange} value={formData.description} 
                className="w-full bg-[#0A0A0A] border border-white/10 rounded-xl p-4 text-sm text-white focus:border-[#D4AF37] focus:shadow-[0_0_15px_rgba(212,175,55,0.1)] outline-none transition-all placeholder-gray-600 hover:border-[#D4AF37]/50 shadow-sm" 
                placeholder="Property Description..." 
              />
            </motion.div>

            {/* 2. MEDIA ASSETS (BLACK) */}
            <motion.div variants={itemVariants} className="space-y-6">
              <div className="flex items-center gap-3 border-b border-white/10 pb-2 mb-4">
                  <div className="h-2 w-2 bg-[#D4AF37] rounded-full animate-pulse" />
                  <h3 className="text-xl font-bold uppercase tracking-widest text-white">Media Assets</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Brochure Upload */}
                  <div className={`relative group w-full h-32 bg-[#1A1A1A] border-2 border-dashed ${formData.brochure ? 'border-[#D4AF37] bg-[#D4AF37]/5' : 'border-white/10'} rounded-xl flex flex-col items-center justify-center cursor-pointer hover:border-[#D4AF37] transition-all overflow-hidden`}>
                    <input type="file" accept=".pdf" className="absolute inset-0 opacity-0 cursor-pointer z-10" onChange={handleBrochureUpload} />
                    <FileText className={`mb-2 transition-colors ${formData.brochure ? 'text-[#D4AF37]' : 'text-gray-500'}`} /> 
                    <span className="text-xs font-bold uppercase tracking-widest text-gray-500 group-hover:text-white text-center px-4">
                        {formData.brochure ? "PDF Uploaded (Click to replace)" : "Upload Brochure (PDF)"}
                    </span>
                    {formData.brochure && (
                        <button type="button" onClick={(e) => { e.preventDefault(); setFormData({...formData, brochure: ""}) }} className="absolute top-2 right-2 z-20 bg-white/10 text-white rounded-full p-1 shadow-md hover:bg-red-500">
                            <X size={14} />
                        </button>
                    )}
                  </div>

                  {/* Video URL or Upload */}
                  <div className="space-y-3">
                      <div className="relative">
                        <Video className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                        <input 
                            type="text"
                            name="videoUrl"
                            value={formData.videoUrl?.startsWith('data:') ? '' : formData.videoUrl}
                            onChange={handlePropChange}
                            placeholder="Paste YouTube/Vimeo Link"
                            className="w-full bg-[#0A0A0A] border border-white/10 rounded-xl py-4 pl-12 pr-4 text-sm text-white outline-none focus:border-[#D4AF37] shadow-sm placeholder-gray-600"
                        />
                      </div>
                      <div className="text-center text-[10px] text-gray-600 uppercase font-bold">- OR -</div>
                      <div className="relative group w-full py-3 bg-[#1A1A1A] border border-white/10 rounded-xl flex items-center justify-center cursor-pointer hover:border-[#D4AF37]">
                          <input type="file" ref={videoInputRef} accept="video/mp4,video/webm" className="absolute inset-0 opacity-0 cursor-pointer" onChange={handleVideoFileUpload} />
                          <span className="text-xs font-bold text-gray-500 group-hover:text-[#D4AF37]">
                             {formData.videoUrl?.startsWith('data:') ? "Video File Uploaded" : "Upload Video File (Max 15MB)"}
                          </span>
                      </div>
                  </div>
              </div>
            </motion.div>

            {/* 3. HERO GALLERY (BLACK) */}
            <motion.div variants={itemVariants} className="space-y-6">
              <div className="flex items-center gap-3 border-b border-white/10 pb-2 mb-4">
                  <div className="h-2 w-2 bg-[#D4AF37] rounded-full animate-pulse" />
                  <h3 className="text-xl font-bold uppercase tracking-widest text-white">Gallery (Renders)</h3>
              </div>
              <div className="relative group w-full h-32 bg-[#1A1A1A] border-2 border-dashed border-white/10 rounded-xl flex flex-col items-center justify-center cursor-pointer hover:border-[#D4AF37] hover:bg-[#D4AF37]/5 transition-all overflow-hidden">
                <input type="file" multiple accept="image/*" className="absolute inset-0 opacity-0 cursor-pointer z-10" onChange={(e) => handleMultiImageUpload(e, 'heroImages')} />
                <div className="flex flex-col items-center">
                    <ImageIcon className="mb-2 text-gray-500 group-hover:text-[#D4AF37]" />
                    <span className="text-xs font-bold uppercase tracking-widest text-gray-500 group-hover:text-white">Upload Hero Images</span>
                </div>
              </div>
              
              {/* Preview Hero Images */}
              {formData.heroImages.length > 0 && (
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4">
                      <AnimatePresence>
                      {formData.heroImages.map((img, i) => (
                        <motion.div 
                            key={i} initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0 }}
                            className="relative aspect-video rounded-lg overflow-hidden border border-white/10 group shadow-sm"
                        >
                          <img src={img} alt={`Hero ${i}`} className="w-full h-full object-cover" />
                          <button type="button" onClick={() => removeArrayItem('heroImages', i)} className="absolute top-1 right-1 bg-red-600 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                              <Trash2 size={12} />
                          </button>
                        </motion.div>
                      ))}
                      </AnimatePresence>
                  </div>
              )}
            </motion.div>

            {/* 4. MASTER PLAN & CONNECTIVITY (WHITE THEME) */}
            <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Master Plan Upload & Preview */}
                <div className="bg-white p-6 rounded-2xl border border-gray-200 relative">
                    <h3 className="text-sm font-bold uppercase tracking-widest text-[#D4AF37] mb-4">Master Plan Images</h3>
                    <div className="relative h-24 border-2 border-dashed border-gray-300 rounded-xl flex items-center justify-center cursor-pointer hover:border-[#D4AF37] bg-gray-50 transition-all mb-4">
                        <input type="file" multiple accept="image/*" className="absolute inset-0 opacity-0 cursor-pointer z-10" onChange={(e) => handleMultiImageUpload(e, 'masterPlanImages')} />
                        <Upload size={20} className="text-gray-400 group-hover:text-[#D4AF37]" />
                    </div>
                    {/* Master Plan Preview Grid */}
                    {formData.masterPlanImages.length > 0 && (
                        <div className="grid grid-cols-3 gap-2">
                             {formData.masterPlanImages.map((img, i) => (
                                <div key={i} className="relative aspect-square rounded overflow-hidden border border-gray-200 group">
                                    <img src={img} className="w-full h-full object-cover" alt="Master" />
                                    <button type="button" onClick={() => removeArrayItem('masterPlanImages', i)} className="absolute inset-0 bg-black/50 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                        <Trash2 size={14} />
                                    </button>
                                </div>
                             ))}
                        </div>
                    )}
                </div>

                {/* Connectivity */}
                <div className="bg-white p-6 rounded-2xl border border-gray-200">
                    <h3 className="text-sm font-bold uppercase tracking-widest text-[#D4AF37] mb-4">Connectivity</h3>
                    <div className="flex gap-2 mb-4">
                        <input type="text" placeholder="Place Name" className="flex-1 bg-gray-50 border border-gray-200 rounded-lg p-2 text-xs text-black outline-none focus:border-[#D4AF37]" value={newPlace.name} onChange={(e) => setNewPlace({ ...newPlace, name: e.target.value })} />
                        <input type="number" placeholder="Mins" className="w-16 bg-gray-50 border border-gray-200 rounded-lg p-2 text-xs text-black outline-none focus:border-[#D4AF37]" value={newPlace.time} onChange={(e) => setNewPlace({ ...newPlace, time: e.target.value })} />
                        <button type="button" onClick={addNearbyPlace} className="bg-[#D4AF37] text-black px-3 rounded-lg hover:bg-black hover:text-white transition-colors font-bold shadow-md"><Plus size={16} /></button>
                    </div>
                    <div className="space-y-2 max-h-40 overflow-y-auto">
                        {formData.nearbyPlaces.map((p, i) => (
                            <motion.div key={i} className="flex justify-between items-center text-xs bg-gray-50 p-2 rounded border border-gray-100 shadow-sm group">
                                <span className="text-gray-700 font-medium">{p.name}</span>
                                <div className="flex items-center gap-2">
                                    <span className="text-[#D4AF37] font-bold">{p.time} MIN</span>
                                    <button type="button" onClick={() => removeArrayItem('nearbyPlaces', i)} className="text-gray-400 hover:text-red-500"><Trash2 size={12}/></button>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </motion.div>

            {/* 5. FLOOR PLANS (WHITE THEME) */}
            <motion.div variants={itemVariants} className="space-y-6">
                <div className="flex items-center gap-3 border-b border-white/10 pb-2 mb-4">
                    <div className="h-2 w-2 bg-[#D4AF37] rounded-full animate-pulse" />
                    <h3 className="text-xl font-bold uppercase tracking-widest text-white">Floor Plans</h3>
                </div>
                
                {/* Input Area (White) */}
                <div className="flex flex-col md:flex-row gap-4 bg-white p-6 rounded-2xl border border-gray-200">
                    <div className="flex-1 space-y-4">
                        <select className="w-full bg-gray-50 border border-gray-200 rounded-xl p-4 text-sm text-black focus:border-[#D4AF37] outline-none transition-all" onChange={(e) => setNewFloorPlan({...newFloorPlan, type: e.target.value})} value={newFloorPlan.type}>
                            {[1, 2, 3, 4, 5].map(num => <option key={num} value={`${num} Bedroom`}>{num} Bedroom</option>)}
                            <option value="Studio">Studio</option>
                            <option value="Penthouse">Penthouse</option>
                        </select>
                        <AnimatedInput name="sqft" className="!bg-gray-50 !border-gray-200 !text-black placeholder-gray-400" value={newFloorPlan.sqft} onChange={(e) => setNewFloorPlan({...newFloorPlan, sqft: e.target.value})} placeholder="Size (e.g. 1,200 SQFT)" />
                    </div>
                    <div className="flex-1 flex flex-col gap-4">
                        <div className="relative h-full min-h-[100px] bg-gray-50 border-2 border-dashed border-gray-300 rounded-xl flex items-center justify-center cursor-pointer hover:border-[#D4AF37] transition-all">
                            <input type="file" accept="image/*" ref={floorPlanInputRef} className="absolute inset-0 opacity-0 cursor-pointer z-10" onChange={(e) => handleImageUpload(e, (url) => setNewFloorPlan(prev => ({ ...prev, image: url })))} />
                            {newFloorPlan.image ? (
                                <img src={newFloorPlan.image} alt="Preview" className="h-24 w-full object-contain p-2" />
                            ) : (
                                <div className="flex flex-col items-center text-gray-400">
                                    <Upload size={20} />
                                    <span className="text-[10px] uppercase font-bold mt-2">Upload Plan Image</span>
                                </div>
                            )}
                        </div>
                        <button type="button" onClick={addFloorPlan} className="w-full py-3 bg-[#D4AF37] text-black font-bold uppercase text-xs rounded-xl hover:bg-black hover:text-white transition-colors shadow-lg">Add to List</button>
                    </div>
                </div>

                {/* Display List of Added Floor Plans (White Cards) */}
                {formData.floorPlans.length > 0 && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {formData.floorPlans.map((plan, index) => (
                            <div key={index} className="flex items-center gap-4 bg-white p-3 rounded-xl border border-gray-200 shadow-sm">
                                <img src={plan.image} className="w-16 h-16 object-contain rounded bg-gray-50" alt="Plan" />
                                <div className="flex-1">
                                    <h4 className="text-sm font-bold text-black">{plan.type}</h4>
                                    <span className="text-xs text-[#D4AF37] font-semibold">{plan.sqft} SQFT</span>
                                </div>
                                <button type="button" onClick={() => removeArrayItem('floorPlans', index)} className="p-2 text-gray-400 hover:text-red-500 transition-colors">
                                    <Trash2 size={16} />
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </motion.div>

            {/* 6. AMENITIES (BLACK) */}
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
                        className={`flex flex-col items-center gap-3 p-4 rounded-xl border cursor-pointer transition-all duration-300 relative overflow-hidden group shadow-sm 
                        ${isSelected 
                            ? 'bg-[#D4AF37] border-[#D4AF37] text-black shadow-lg shadow-[#D4AF37]/30' 
                            : 'bg-[#0A0A0A] border-white/10 text-gray-500 hover:border-[#D4AF37]/50 hover:text-white'}`}
                    >
                      <amenity.icon size={24} className="relative z-10" />
                      <span className="text-[10px] font-black uppercase text-center relative z-10">{amenity.label}</span>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
            
             {/* 7. OWNER & CONSENT (BLACK) */}
             <motion.div variants={itemVariants} className="bg-gradient-to-br from-[#D4AF37] to-[#8E793E] p-[1px] rounded-[2rem] mt-12 shadow-2xl shadow-black">
               <div className="bg-[#111111] p-8 rounded-[2rem]">
                   <h2 className="text-2xl font-black uppercase mb-6 text-white tracking-tighter">Ownership <span className="text-[#D4AF37]">Profile</span></h2>
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                       <AnimatedInput name="ownerName" value={formData.ownerName} onChange={handlePropChange} placeholder="Owner Name" />
                       <AnimatedInput name="ownerEmail" value={formData.ownerEmail} onChange={handlePropChange} placeholder="Email" />
                       <AnimatedInput name="ownerPhone" value={formData.ownerPhone} onChange={handlePropChange} placeholder="Phone" />
                       <AnimatedInput name="propertyValue" value={formData.propertyValue} onChange={handlePropChange} placeholder="Estimated Value (AED)" />
                   </div>
                   <label className="flex items-center gap-3 mt-6 cursor-pointer group">
                      <div className={`w-5 h-5 border rounded flex items-center justify-center transition-colors ${formData.privacyConsent ? 'bg-[#D4AF37] border-[#D4AF37]' : 'border-gray-500 bg-[#0A0A0A]'}`}>
                          {formData.privacyConsent && <CheckCircle size={14} className="text-black" />}
                      </div>
                      <input type="checkbox" checked={formData.privacyConsent} onChange={(e) => setFormData({ ...formData, privacyConsent: e.target.checked })} className="hidden" />
                      <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400 group-hover:text-white transition-colors">I accept the Terms & Privacy Policy.</span>
                   </label>
               </div>
            </motion.div>
          </motion.div>
        );

      case "services":
        return (
          <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-6 max-w-xl mx-auto">
            <div className="relative h-64 bg-[#1A1A1A] border-2 border-dashed border-white/10 rounded-2xl flex items-center justify-center overflow-hidden group hover:border-[#D4AF37] transition-all cursor-pointer">
              <input type="file" accept="image/*" className="absolute inset-0 opacity-0 cursor-pointer z-10" onChange={(e) => handleImageUpload(e, setServiceCard)} />
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
            <div className="relative h-48 bg-[#1A1A1A] border-2 border-dashed border-white/10 rounded-2xl flex items-center justify-center overflow-hidden group hover:border-[#D4AF37] transition-all cursor-pointer">
              <input type="file" accept="image/*" className="absolute inset-0 opacity-0 cursor-pointer z-10" onChange={(e) => handleImageUpload(e, setPartnerCard)} />
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
              <motion.textarea rows="3" placeholder="Description" className="w-full bg-[#0A0A0A] border border-white/10 rounded-xl p-4 text-sm text-white outline-none focus:border-[#D4AF37] placeholder-gray-600" value={whyCard.text} onChange={e => setWhyCard({...whyCard, text: e.target.value})} />
              <div className="flex gap-2">
                  <input type="text" placeholder="Add Benefit Point" className="flex-1 bg-[#0A0A0A] border border-white/10 rounded-xl p-3 text-white outline-none focus:border-[#D4AF37] placeholder-gray-600" value={whyCard.currentPoint} onChange={e => setWhyCard({...whyCard, currentPoint: e.target.value})} />
                  <button type="button" onClick={() => { if(whyCard.currentPoint) setWhyCard({...whyCard, points: [...whyCard.points, whyCard.currentPoint], currentPoint: ""}) }} className="bg-[#D4AF37] text-black px-4 rounded-xl hover:bg-white transition-all"><Plus /></button>
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
                  <motion.textarea rows="3" placeholder="Description" className="w-full bg-[#0A0A0A] border border-white/10 rounded-xl p-4 text-sm text-white outline-none focus:border-[#D4AF37] placeholder-gray-600" value={emirateCard.desc} onChange={e => setEmirateCard({...emirateCard, desc: e.target.value})} />
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
          <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-gray-400 hover:text-[#D4AF37] transition-colors uppercase text-xs font-bold tracking-widest">
            <ArrowLeft size={16} /> Dashboard
          </button>
          {isEdit && <motion.button whileHover={{ scale: 1.05, color: "#EF4444" }} onClick={handleDelete} className="flex items-center gap-2 text-red-500 font-bold uppercase text-xs tracking-widest bg-red-900/10 px-4 py-2 rounded-full hover:bg-red-900/30 border border-red-900/20 transition-all"><Trash2 size={14}/> Delete Entry</motion.button>}
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
            className="bg-[#111111] p-6 md:p-16 rounded-[2rem] md:rounded-[3rem] border border-white/5 shadow-2xl relative overflow-hidden"
        >
          <div className="absolute inset-0 opacity-[0.05] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#FFF 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
          
          {renderFormContent()}
          
          <motion.button whileHover={{ scale: 1.02, boxShadow: "0 10px 30px -10px rgba(212, 175, 55, 0.2)" }} whileTap={{ scale: 0.98 }} type="submit" className="w-full py-6 mt-16 bg-gradient-to-r from-[#D4AF37] to-[#8E793E] text-black font-black uppercase text-sm rounded-2xl flex items-center justify-center gap-3 relative overflow-hidden group shadow-lg">
            <span className="relative z-10 flex items-center gap-2"><Save size={18} /> {isEdit ? "Update System" : "Publish to Live"}</span>
            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
          </motion.button>
        </motion.form>
      </div>
    </div>
  );
};

export default AddPropertyPage;