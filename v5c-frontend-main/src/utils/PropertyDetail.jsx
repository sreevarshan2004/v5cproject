import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { useParams, Link, useNavigate, useLocation } from "react-router-dom";
import {
  MapPin, Bed, Bath, Maximize2, ArrowLeft, Edit, Phone, Mail, User, Send, Car, Home, Shield, Wifi, Dumbbell, Waves, TreePine, Camera, Check, Play, Layout, Ruler, Download, FileText, DollarSign, TrendingUp, Heart, Share2, Video, Plane, Train, Bus, ShoppingBag, Hospital, School, Building2, Droplets, Trees, Baby, Flame, Activity, ChevronLeft, ChevronRight, Wind, Dog, Music, Palette, Sun, Umbrella, Coffee, Gamepad2, Utensils, Book, Star, Trophy, Clock, Sparkles
} from "lucide-react";
import axios from 'axios';
import { IMAGE_BASE_URL, VIDEO_UPLOAD_URL, GET_PROPERTY_DETAIL_URL, PROPERTIES_URL, UPDATE_PROPERTY_URL, STATUS_URL } from '../data/constanturl';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Pagination, Navigation, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import Footer from '../components/Footer';
import pinnacleLogo from '../assets/pinnacle1.svg';
import riversideLogo from '../assets/Riversidelogo.svg';
import { DubaiIcon, SharjahIcon, MarjanIslandIcon } from '../components/CityIcons';

const PropertyDetail = ({ propertiesData, lang, setLang, content }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxImage, setLightboxImage] = useState(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneCode: "+971",
    phone: "",
    purpose: "",
    timeline: "",
    bedrooms: "",
    assistedByBroker: ""
  });
  const [isFavorite, setIsFavorite] = useState(false);
  const [similarProperties, setSimilarProperties] = useState([]);
  const [currentFloorPlan, setCurrentFloorPlan] = useState(0);

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const fetchProperty = async () => {
      try {
        const res = await axios.get(`${GET_PROPERTY_DETAIL_URL}?id=${id}`, {
          signal: controller.signal
        });

        if (isMounted) {
          const propertyData = res.data.status ? res.data.property : res.data;

          // Check for status 0 (Hidden)
          if (propertyData && String(propertyData.status) === '0') {
            setProperty(null);
          } else if (propertyData) {
            setProperty(propertyData);
            fetchSimilarProperties(propertyData.category);
          } else {
            setProperty(null);
          }
        }
      } catch (e) {
        if (e.name !== 'CanceledError') {
          console.error('Error fetching property:', e);
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    const fetchSimilarProperties = async (category) => {
      try {
        const res = await axios.get(PROPERTIES_URL);
        const allProps = res.data.properties || res.data || [];
        const similar = allProps.filter(p => p.category === category && p.id != id).slice(0, 3);
        if (similar.length > 0) setSimilarProperties(similar);
      } catch (e) {
        console.error('Error fetching similar properties:', e);
      }
    };

    if (id) fetchProperty();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, [id]);

  const handleEdit = () => navigate("/admin/add-property", { state: { data: property } });

  const handleStatusUpdate = async (newStatus) => {
    try {
      await axios.post(STATUS_URL, { id: property.id, status: newStatus });
      setProperty({ ...property, status: newStatus });
      alert(`Property marked as ${newStatus.toUpperCase()}`);
      window.location.reload();
    } catch (error) {
      console.error('Update error:', error);
      alert('Failed to update status');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const subject = `Property Inquiry: ${property.title}`;
    const body = `Property: ${property.title}\nLocation: ${property.location}\nPrice: ${property.price}\n\n--- Customer Details ---\nFirst Name: ${formData.firstName}\nLast Name: ${formData.lastName}\nEmail: ${formData.email}\nPhone: ${formData.phoneCode} ${formData.phone}\nPurpose of Buying: ${formData.purpose}\nBuying Timeline: ${formData.timeline}\nBedrooms Interested: ${formData.bedrooms}\nAssisted by Broker: ${formData.assistedByBroker}`;
    const emailTo = property.email || 'contact@v5cproperties.com';
    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${emailTo}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.open(gmailUrl, '_blank');
  };

  const openLightbox = (img) => {
    setLightboxImage(img);
    setLightboxOpen(true);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
    setLightboxImage(null);
  };

  const getImageUrl = (imagePath) => {
    if (!imagePath) return null;
    if (Array.isArray(imagePath) && imagePath.length > 0) return getImageUrl(imagePath[0]);
    if (typeof imagePath === 'string') {
      if (imagePath === 'undefined' || imagePath === 'null' || imagePath.trim() === '') return null;
      if (imagePath.startsWith('http') || imagePath.startsWith('data:')) return imagePath;
      return `${IMAGE_BASE_URL}${imagePath}`.replace(/([^:])(\/{2,})/g, '$1/');
    }
    return null;
  };

  const getVideoUrl = (videoPath) => {
    if (!videoPath) return null;
    if (typeof videoPath === 'string') {
      if (videoPath === 'undefined' || videoPath === 'null' || videoPath.trim() === '') return null;
      if (videoPath.startsWith('http')) return videoPath;
      // Handle both 'video' and 'vedio' folder names
      const cleanPath = videoPath.replace(/^(uploads\/)?(video|vedio)\//, '');
      return `${IMAGE_BASE_URL}uploads/video/${cleanPath}`.replace(/([^:])(\/{2,})/g, '$1/');
    }
    return null;
  };

  // Parse gallery images robustly
  const rawImages = property?.gallery || property?.images || property?.image || [];
  let parsedImages = [];
  if (typeof rawImages === 'string') {
    try {
      parsedImages = JSON.parse(rawImages);
    } catch (e) {
      parsedImages = rawImages.includes(',') ? rawImages.split(',').map(i => i.trim()) : [rawImages];
    }
  } else if (Array.isArray(rawImages)) {
    parsedImages = rawImages;
  }
  const propertyImages = parsedImages.filter(img => img && img !== 'undefined' && img !== 'null' && img.trim() !== '');

  // Parse blueprints (Master Plan)
  const rawBlueprints = property?.blueprints || [];
  let parsedBlueprints = [];
  if (typeof rawBlueprints === 'string') {
    try {
      parsedBlueprints = JSON.parse(rawBlueprints);
    } catch (e) {
      parsedBlueprints = [rawBlueprints];
    }
  } else if (Array.isArray(rawBlueprints)) {
    parsedBlueprints = rawBlueprints;
  }
  const propertyBlueprints = parsedBlueprints.filter(img => img && img !== 'undefined' && img !== 'null' && img.trim() !== '');

  // Parse floor images (Floor Plans)
  const rawFloorPlans = property?.floor_plans || property?.floorImage || [];
  let parsedFloorPlans = [];
  if (typeof rawFloorPlans === 'string') {
    try {
      parsedFloorPlans = JSON.parse(rawFloorPlans);
    } catch (e) {
      parsedFloorPlans = [];
    }
  } else if (Array.isArray(rawFloorPlans)) {
    parsedFloorPlans = rawFloorPlans;
  }

  // Normalize: handle both 'floor_image' and 'image_url' keys
  const normalizedFloorPlans = parsedFloorPlans.map(plan => {
    if (typeof plan === 'string') return { floor_image: plan };
    if (plan && plan.image_url && !plan.floor_image) return { ...plan, floor_image: plan.image_url };
    return plan;
  }).filter(plan =>
    plan?.floor_image &&
    plan.floor_image !== 'undefined' &&
    plan.floor_image !== 'null' &&
    plan.floor_image.trim() !== ''
  );

  // Grouping logic for 1BR, 1.5BR, 2BR, 2.5BR, etc.
  const floorPlanGroups = [];
  const hasBedrooms = normalizedFloorPlans.some(p => p.floor_bedroom || (p.unit && p.unit.toLowerCase().includes('bedroom')));

  if (hasBedrooms) {
    const groups = {};
    normalizedFloorPlans.forEach(plan => {
      let br = plan.floor_bedroom || 1;

      // Try to extract more precise bedroom count from 'unit' string if available
      // This handles cases like "1.5 BEDROOM" where floor_bedroom might be returned as 1
      if (plan.unit && typeof plan.unit === 'string') {
        const match = plan.unit.match(/(\d+(\.\d+)?)\s*BEDROOM/i);
        if (match && match[1]) {
          br = match[1];
        }
      }

      const title = `${br} BR`;
      if (!groups[title]) groups[title] = [];
      groups[title].push(plan);
    });

    // Ensure numerical 1BR, 1.5BR, 2BR order
    Object.keys(groups).sort((a, b) => parseFloat(a) - parseFloat(b)).forEach(key => {
      floorPlanGroups.push({ title: key, plans: groups[key] });
    });
  } else if (normalizedFloorPlans.length === 6) {
    floorPlanGroups.push({ title: "1 BR", plans: normalizedFloorPlans.slice(0, 4) });
    floorPlanGroups.push({ title: "2 BR", plans: normalizedFloorPlans.slice(4) });
  } else if (normalizedFloorPlans.length === 5) {
    floorPlanGroups.push({ title: "1 BR", plans: normalizedFloorPlans.slice(0, 3) });
    floorPlanGroups.push({ title: "2 BR", plans: normalizedFloorPlans.slice(3) });
  } else {
    // Default grouping (one per plan)
    normalizedFloorPlans.forEach((plan, i) => {
      floorPlanGroups.push({
        title: plan.bedrooms || plan.title || (normalizedFloorPlans.length > 1 ? `${i + 1} BR` : "Unit"),
        plans: [plan]
      });
    });
  }

  const [activeSubPlan, setActiveSubPlan] = useState(0);
  // Reset activeSubPlan when switching main groups
  useEffect(() => {
    setActiveSubPlan(0);
  }, [currentFloorPlan]);

  const handleNextSubPlan = () => {
    const group = floorPlanGroups[currentFloorPlan];
    if (group && group.plans.length > 1) {
      setActiveSubPlan((prev) => (prev + 1) % group.plans.length);
    }
  };

  const handlePrevSubPlan = () => {
    const group = floorPlanGroups[currentFloorPlan];
    if (group && group.plans.length > 1) {
      setActiveSubPlan((prev) => (prev - 1 + group.plans.length) % group.plans.length);
    }
  };

  // Parse lifestyle/amenities (supports: lifestyle, amenities, selectedAmenities)
  let parsedLifestyle = property?.lifestyle || property?.amenities || property?.selectedAmenities || [];
  if (typeof parsedLifestyle === 'string' && parsedLifestyle.trim()) {
    try {
      parsedLifestyle = JSON.parse(parsedLifestyle);
    } catch (e) {
      parsedLifestyle = parsedLifestyle.split(',').map(item => item.trim()).filter(Boolean);
    }
  }
  parsedLifestyle = Array.isArray(parsedLifestyle) ? parsedLifestyle.filter(Boolean) : [];

  // Parse connectivity
  let parsedConnectivity = property?.connectivity || [];
  if (typeof parsedConnectivity === 'string' && parsedConnectivity.trim()) {
    try {
      parsedConnectivity = JSON.parse(parsedConnectivity);
    } catch (e) {
      parsedConnectivity = parsedConnectivity.split(',').map(item => item.trim()).filter(Boolean);
    }
  }
  parsedConnectivity = Array.isArray(parsedConnectivity) ? parsedConnectivity.filter(Boolean) : [];

  // Log complete property structure
  console.log('=== PROPERTY JSON STRUCTURE ===');
  console.log(JSON.stringify(property, null, 2));
  console.log('=== END PROPERTY STRUCTURE ===');

  const user = JSON.parse(localStorage.getItem('v5c_user'));

  const CustomMarinaIcon = ({ size = 24, className = "", strokeWidth = 1 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={className}>
      {/* Yacht Body */}
      <path d="M2 12.5h16l4-2.5-3.5-1.5h-2.5L13.5 5H8L5.5 8.5H2v1.5l1 1v1.5z" />
      {/* Cabin Window */}
      <path d="M9 8.5h4" />
      {/* Radar / Top Deck */}
      <path d="M10.5 5V3h2v2" />
      {/* Hull Details */}
      <path d="M7 11h1" />
      <path d="M10 11h1" />
      <path d="M13 11h1" />
      {/* 3 Waves */}
      <path d="M2 15.5c2-1 4-1 6 0s4 1 6 0 4-1 6 0" />
      <path d="M2 18.5c2-1 4-1 6 0s4 1 6 0 4-1 6 0" />
      <path d="M2 21.5c2-1 4-1 6 0s4 1 6 0 4-1 6 0" />
    </svg>
  );

  // Icon mapping for amenities and connectivity
  const getAmenityIcon = (name) => {
    const key = name?.toLowerCase().trim() || "";

    // Connectivity
    // Connectivity & Location Names
    if (key.includes('ras al khor') || key.includes('sanctuary') || key.includes('wildlife')) return Trees;
    if (key.includes('meydan') || key.includes('racecourse')) return Car;
    if (key.includes('dubai frame') || key.includes('frame')) return Camera;
    if (key.includes('opera')) return Music;
    if (key.includes('palm') || key.includes('jumeirah') || key.includes('island')) return Waves;
    if (key.includes('dubai marina') || key.includes('marina') || key.includes('yacht')) return CustomMarinaIcon;
    if (key.includes('airport') || key.includes('flight')) return Plane;
    if (key.includes('metro') || key.includes('train')) return Train;
    if (key.includes('bus')) return Bus;
    if (key.includes('mall') || key.includes('shopping') || key.includes('retail')) return ShoppingBag;
    if (key.includes('hospital') || key.includes('clinic') || key.includes('health')) return Hospital;
    if (key.includes('school') || key.includes('education') || key.includes('university')) return School;
    if (key.includes('beach') || key.includes('sea')) return Waves;
    if (key.includes('city center') || key.includes('downtown') || key.includes('business bay') || key.includes('burj khalifa')) return Building2;
    if (key.includes('highway') || key.includes('road')) return Car;

    // City names mapping
    if (key.includes('dubai')) return DubaiIcon;
    if (key.includes('sharjah')) return SharjahIcon;
    if (key.includes('marjan')) return MarjanIslandIcon;
    if (key.includes('ajman') || key.includes('uae') || key.includes('fujairah') || key.includes('ras al khaimah')) return MapPin;
    if (key.includes('min') || key.includes('minute')) return Clock;

    // Amenities
    if (key.includes('golf')) return Trophy;
    if (key.includes('cabana') || key.includes('lounger') || key.includes('deck') || key.includes('sun') || key.includes('bed')) return Sun;
    if (key.includes('pool') || key.includes('swimming') || key.includes('wet')) return Droplets;
    if (key.includes('water') || key.includes('aquatic') || key.includes('lagoon') || key.includes('waves')) return Waves;
    if (key.includes('jacuzzi')) return Bath;
    if (key.includes('yoga') || key.includes('zen') || key.includes('meditation')) return Activity;
    if (key.includes('music') || key.includes('art') || key.includes('theatre') || key.includes('gallery')) return Music;
    if (key.includes('steam') || key.includes('sauna')) return Wind;
    if (key.includes('gym') || key.includes('fitness') || key.includes('health') || key.includes('workout')) return Dumbbell;
    if (key.includes('dog') || key.includes('pet')) return Dog;
    if (key.includes('park') || key.includes('lawn') || key.includes('garden') || key.includes('tree') || key.includes('greenery')) return Trees;
    if (key.includes('bbq') || key.includes('barbecue') || key.includes('fire')) return Flame;
    if (key.includes('tennis') || key.includes('basketball') || key.includes('sport') || key.includes('jogging') || key.includes('track') || key.includes('obstacle') || key.includes('activity')) return Activity;
    if (key.includes('kids') || key.includes('play') || key.includes('baby') || key.includes('children') || key.includes('toddler')) return Baby;
    if (key.includes('security') || key.includes('cctv') || key.includes('guard')) return Shield;
    if (key.includes('parking') || key.includes('garage')) return Car;
    if (key.includes('elevator') || key.includes('lift')) return Building2;
    if (key.includes('clubhouse') || key === 'lounge') return Home;
    if (key.includes('wifi') || key.includes('internet')) return Wifi;
    if (key.includes('power') || key.includes('generator')) return Check;
    if (key.includes('movie') || key.includes('cinema') || key.includes('theatre')) return Video;
    if (key.includes('library') || key.includes('book') || key.includes('study') || key.includes('reading')) return Book;
    if (key.includes('game') || key.includes('playroom') || key.includes('fun')) return Gamepad2;
    if (key.includes('cafe') || key.includes('dining') || key.includes('restaurant') || key.includes('food')) return Utensils;
    if (key.includes('nightlife') || key.includes('vibrant')) return Sparkles;

    return MapPin;
  };



  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }} className="w-16 h-16 border-4 border-[#D4AF37] border-t-transparent rounded-full" />
      </div>
    );
  }

  if (!property) {
    console.log('Property is null or undefined');
    return <div className="min-h-screen bg-white flex items-center justify-center text-[#0B1A2E] text-2xl">Property Not Found</div>;
  }

  console.log('Property loaded:', property);

  return (
    <div className="min-h-screen bg-white font-sans">

      {/* NAVBAR */}
      <nav className="bg-white/80 backdrop-blur-md border-b border-gray-200 fixed top-0 left-0 right-0 z-40 shadow-sm">
        <div className="container mx-auto px-6 max-w-[1300px] flex items-center justify-between py-4">
          <Link to="/properties" className="flex items-center gap-2 text-gray-700 hover:text-[#D4AF37] transition-all">
            <ArrowLeft size={20} />
          </Link>

          <div className="flex items-center gap-4 md:gap-6 overflow-x-auto pb-2 -mb-2 scrollbar-none" style={{ fontFamily: "'Cinzel', serif" }}>
            <a href="#overview" onClick={(e) => { e.preventDefault(); document.getElementById('overview')?.scrollIntoView({ behavior: 'smooth', block: 'start' }); }} className="relative px-1 md:px-2 py-1 text-gray-900 transition-colors duration-300 group hover:text-[#D4AF37] text-[10px] md:text-sm whitespace-nowrap cursor-pointer">
              Overview
              <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[#D4AF37] origin-left scale-x-0 transition-transform duration-300 group-hover:scale-x-100" />
            </a>
            <a href="#gallery" onClick={(e) => { e.preventDefault(); document.getElementById('gallery')?.scrollIntoView({ behavior: 'smooth', block: 'start' }); }} className="relative px-1 md:px-2 py-1 text-gray-900 transition-colors duration-300 group hover:text-[#D4AF37] text-[10px] md:text-sm whitespace-nowrap cursor-pointer">
              Gallery
              <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[#D4AF37] origin-left scale-x-0 transition-transform duration-300 group-hover:scale-x-100" />
            </a>
            <a href="#amenities" onClick={(e) => { e.preventDefault(); document.getElementById('amenities')?.scrollIntoView({ behavior: 'smooth', block: 'start' }); }} className="relative px-1 md:px-2 py-1 text-gray-900 transition-colors duration-300 group hover:text-[#D4AF37] text-[10px] md:text-sm whitespace-nowrap cursor-pointer">
              Amenities
              <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[#D4AF37] origin-left scale-x-0 transition-transform duration-300 group-hover:scale-x-100" />
            </a>
            <a href="#masterplan" onClick={(e) => { e.preventDefault(); document.getElementById('masterplan')?.scrollIntoView({ behavior: 'smooth', block: 'start' }); }} className="relative px-1 md:px-2 py-1 text-gray-900 transition-colors duration-300 group hover:text-[#D4AF37] text-[10px] md:text-sm whitespace-nowrap cursor-pointer">
              Master Plan
              <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[#D4AF37] origin-left scale-x-0 transition-transform duration-300 group-hover:scale-x-100" />
            </a>
            <a href="#floorplans" onClick={(e) => { e.preventDefault(); document.getElementById('floorplans')?.scrollIntoView({ behavior: 'smooth', block: 'start' }); }} className="relative px-1 md:px-2 py-1 text-gray-900 transition-colors duration-300 group hover:text-[#D4AF37] text-[10px] md:text-sm whitespace-nowrap cursor-pointer">
              Floor Plans
              <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[#D4AF37] origin-left scale-x-0 transition-transform duration-300 group-hover:scale-x-100" />
            </a>
            <a href="#location" onClick={(e) => { e.preventDefault(); document.getElementById('location')?.scrollIntoView({ behavior: 'smooth', block: 'start' }); }} className="relative px-1 md:px-2 py-1 text-gray-900 transition-colors duration-300 group hover:text-[#D4AF37] text-[10px] md:text-sm whitespace-nowrap cursor-pointer">
              Location
              <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[#D4AF37] origin-left scale-x-0 transition-transform duration-300 group-hover:scale-x-100" />
            </a>
            <a href="#contact" onClick={(e) => { e.preventDefault(); document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth', block: 'start' }); }} className="relative px-1 md:px-2 py-1 text-gray-900 transition-colors duration-300 group hover:text-[#D4AF37] text-[10px] md:text-sm whitespace-nowrap cursor-pointer">
              Contact
              <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[#D4AF37] origin-left scale-x-0 transition-transform duration-300 group-hover:scale-x-100" />
            </a>
          </div>
        </div>
      </nav>



      {/* HERO IMAGE - Full Screen First Image */}
      {propertyImages.length > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="relative w-full h-[80vh] md:h-screen overflow-visible"
        >
          <img
            src={getImageUrl(propertyImages[0])}
            alt={property.title}
            className="w-full h-full object-cover"
            onError={(e) => e.target.style.display = 'none'}
          />
          <div className="absolute inset-0 bg-black/5" />

          {/* Sold Out Badge */}
          {String(property.status) === '2' && (
            <div className="absolute top-32 left-1/2 -translate-x-1/2 z-30">
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-red-600/90 backdrop-blur-md text-white px-8 py-3 rounded-full text-lg md:text-xl font-black uppercase tracking-widest shadow-2xl border-2 border-white/20 flex items-center gap-3"
              >
                <div className="w-2.5 h-2.5 bg-white rounded-full animate-pulse" />
                Sold Out
              </motion.div>
            </div>
          )}

          {/* Removed centered content to focus on the left-aligned box below */}
          <div className="absolute inset-0 bg-black/5" />

          {/* Left-Aligned Project Logo/Price Box */}
          <div className="absolute left-1/2 -translate-x-1/2 md:left-16 md:translate-x-0 -bottom-24 md:-bottom-48 z-10">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="bg-white p-4 md:p-6 rounded-xl shadow-2xl flex flex-col items-center justify-center w-[160px] h-[160px] md:w-[260px] md:h-[260px] transition-all hover:shadow-[0_20px_50px_rgba(0,0,0,0.15)]"
              >
                {/* Logo / Title Area */}
                <div className="flex flex-col items-center justify-center w-full">
                  {property.logo || property.title.toLowerCase().includes('pinnacle') || property.title.toLowerCase().includes('riverside') ? (
                    <img
                      src={property.logo ? getImageUrl(property.logo) : (property.title.toLowerCase().includes('pinnacle') ? pinnacleLogo : riversideLogo)}
                      alt={property.title}
                      className="w-full h-auto max-h-[60px] md:max-h-[110px] object-contain mb-1"
                    />
                  ) : (
                    <h3 className="text-lg md:text-2xl font-black text-[#0B1A2E] text-center uppercase tracking-tight mb-1">
                      {property.title}
                    </h3>
                  )}
                </div>

                {/* Price Area */}
                <div className="mt-1 text-center">
                  <div className="text-gray-400 text-xs md:text-xl font-medium tracking-wide" style={{ fontFamily: "'Oswald', sans-serif" }}>
                    FROM {property.price}
                  </div>
                </div>
              </motion.div>
          </div>
        </motion.div>
      )}

      {/* Spacer to account for the overlapping box (Always shown now that the box is always shown) */}
      {property && (
        <div className="h-32 md:h-56 bg-white" />
      )}

      <div className="container mx-auto px-6 md:px-12 lg:px-20 max-w-[1450px] pt-0">

        {/* 2️⃣ PROPERTY NAME & DESCRIPTION SECTION */}
        <motion.div
          id="overview"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="py-16 md:py-24 mb-12 scroll-mt-32 border-b border-gray-100"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            {/* Left Side - Blueprint Image */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
              className="flex justify-center items-center w-full"
            >
              {propertyBlueprints && propertyBlueprints.length > 0 ? (
                <div className="w-full rounded-2xl overflow-hidden" onClick={() => openLightbox(propertyBlueprints[0])}>
                  <img
                    src={getImageUrl(propertyBlueprints[0])}
                    alt="Property Blueprint / Master Plan"
                    className="w-full h-auto object-cover hover:scale-105 transition-transform duration-500 cursor-pointer"
                  />
                </div>
              ) : (
                <div className="w-full min-h-[400px] rounded-2xl bg-gray-100 flex items-center justify-center shadow-inner">
                  <span className="text-gray-400 font-bold tracking-widest uppercase">Master Plan Unavailable</span>
                </div>
              )}
            </motion.div>

            {/* Right Side - Description */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
              className="flex flex-col justify-center lg:pl-12"
            >
              <h2 className="text-2xl md:text-4xl font-black uppercase text-theme-primary leading-tight md:leading-snug tracking-tighter mb-8 md:mb-10">
                {(() => {
                  const text = property.short_description || "Where Elevation Defines Living";
                  const words = text.split(' ');
                  if (words.length <= 1) return text;
                  const lastWord = words.pop();
                  const remaining = words.join(' ');
                  return (
                    <>
                      {remaining} <span className="text-theme-accent">{lastWord}</span>
                    </>
                  );
                })()}
              </h2>
              <div className="space-y-6 text-theme-secondary text-base md:text-lg leading-relaxed font-sans opacity-90">
                {(property?.description || "Experience luxury living at its finest in this exceptional property. Featuring world-class amenities, stunning architectural design, and prime location. This residence offers an unparalleled lifestyle with spacious interiors, modern finishes, and breathtaking views.")
                  .split('\n')
                  .filter(para => para.trim() !== '')
                  .map((para, i) => (
                    <p key={i}>{para.trim()}</p>
                  ))}
              </div>
            </motion.div>
          </div>
        </motion.div>



        {/* 4️⃣ MAIN CONTENT AREA */}
        <div className="space-y-16 mb-16">

          {/* Image Gallery Section - Premium Carousel */}
          {propertyImages.length > 0 && (
            <motion.div
              id="gallery"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="scroll-mt-32 py-8 bg-white overflow-hidden"
            >
              <div className="text-center mb-12">
                <h2 className="text-4xl md:text-5xl font-black uppercase text-theme-primary leading-snug tracking-tighter font-sans mb-8">
                  Designed for Living in <span className="text-theme-accent">Motion</span>
                </h2>
                <p className="text-gray-500 uppercase tracking-widest text-xs font-sans">
                </p>
              </div>

              <div className="relative">
                <Swiper
                  effect={'coverflow'}
                  grabCursor={true}
                  centeredSlides={true}
                  loop={true}
                  slidesPerView={'auto'}
                  coverflowEffect={{
                    rotate: 0,
                    stretch: 0,
                    depth: 100,
                    modifier: 2.5,
                  }}
                  autoplay={{
                    delay: 3000,
                    disableOnInteraction: false,
                  }}
                  pagination={{ clickable: true }}
                  navigation={{
                    nextEl: '.swiper-button-next-custom',
                    prevEl: '.swiper-button-prev-custom',
                  }}
                  modules={[EffectCoverflow, Pagination, Navigation, Autoplay]}
                  className="!pb-12"
                >
                  {propertyImages.map((img, index) => (
                    <SwiperSlide key={index} className="!w-[400px] md:!w-[800px]">
                      <div className="relative group rounded-2xl overflow-hidden shadow-lg">
                        <img
                          src={getImageUrl(img)}
                          alt={`Gallery ${index + 1}`}
                          className="w-full h-[500px] md:h-[600px] object-cover"
                          onError={(e) => e.target.style.display = 'none'}
                        />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300 flex items-center justify-center cursor-pointer"
                          onClick={() => openLightbox(img)}>
                          <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white/20 backdrop-blur-sm p-4 rounded-full">
                            <Maximize2 className="text-white w-8 h-8" />
                          </div>
                        </div>
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>

                {/* Custom Navigation */}
                <button className="swiper-button-prev-custom absolute left-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg hover:bg-gray-50 transition-all">
                  <ChevronLeft className="text-[#D4AF37] w-6 h-6" />
                </button>
                <button className="swiper-button-next-custom absolute right-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg hover:bg-gray-50 transition-all">
                  <ChevronRight className="text-[#D4AF37] w-6 h-6" />
                </button>
              </div>
            </motion.div>
          )}

          {/* Floor Plans Section */}
          {(floorPlanGroups.length > 0) && (
            <div id="floorplans" className="scroll-mt-32 py-8 bg-white font-sans">
              <div className="max-w-[1400px] mx-auto px-6">

                {/* Section Heading */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                  className="mb-10 text-center"
                >
                  <h2 className="text-4xl md:text-5xl font-black uppercase text-theme-primary leading-snug tracking-tighter mb-8">
                    FLOOR <span className="text-theme-accent">PLANS</span>
                  </h2>

                  {/* Main Group Tabs (1 BR, 2 BR, etc.) */}
                  <div className="flex items-center justify-center gap-8 border-b border-gray-200" style={{ marginBottom: '40px' }}>
                    {floorPlanGroups.map((group, i) => {
                      const isActive = i === currentFloorPlan;
                      return (
                        <button
                          key={i}
                          onClick={() => setCurrentFloorPlan(i)}
                          className={`pb-3 text-sm tracking-widest uppercase font-bold transition-all relative ${isActive ? 'text-[#D4AF37]' : 'text-gray-300 hover:text-gray-500'}`}
                        >
                          {group.title}
                          {isActive && (
                            <motion.div
                              layoutId="floorplan-underline"
                              className="absolute bottom-[-1px] left-0 w-full h-[2px] bg-[#D4AF37]"
                            />
                          )}
                        </button>
                      );
                    })}
                  </div>


                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

                  {/* Left Side - Details */}
                  <div className="lg:col-span-4 relative flex items-center gap-4">
                    {/* Navigation Arrows */}
                    {floorPlanGroups[currentFloorPlan]?.plans.length > 1 && (
                      <button
                        onClick={handlePrevSubPlan}
                        className="p-2 -ml-8 hover:bg-gray-100 rounded-full transition-all text-gray-400 hover:text-[#D4AF37]"
                      >
                        <ChevronLeft size={32} strokeWidth={1} />
                      </button>
                    )}

                    <div className="flex-1 pl-4 md:pl-10">
                      {(() => {
                        const group = floorPlanGroups[currentFloorPlan];
                        const plan = group?.plans[activeSubPlan];
                        if (!plan) return null;

                        const title = plan.floor_title || plan.title || `${group.title.replace('BR', 'Bedroom')} Apartment (Type ${String.fromCharCode(65 + activeSubPlan)})`;
                        // Use API data directly — no hardcoded overrides
                        const unit = plan.unit || `${group.title.replace('BR', 'Bedroom')} + 1 Balcony`;
                        const suite = plan.suite || (property?.sq_ft ? `${property.sq_ft} SQ.FT.` : "—");
                        const balcony = plan.balcony || "—";
                        const total = plan.total || (property?.size ? `${property.size} SQ.FT.` : "—");

                        return (
                          <motion.div
                            key={`details-${currentFloorPlan}-${activeSubPlan}`}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5 }}
                            className="flex flex-col items-start"
                          >
                            <h3 className="text-xl md:text-2xl font-black uppercase text-[#0B1A2E] leading-snug tracking-tighter mb-10">
                              {title}
                            </h3>

                            <div className="space-y-8 w-full mb-12">
                              {[
                                { label: "UNIT", value: unit },
                                { label: "SUITE AREA", value: suite },
                                { label: "BALCONY AREA", value: balcony },
                                { label: "TOTAL AREA", value: total }
                              ].filter(item => 
                                item.value && 
                                item.value !== '-' && 
                                item.value !== '—' && 
                                String(item.value).trim() !== ''
                              ).map((item, idx) => (
                                <div key={idx} className="flex flex-col border-b border-gray-100 pb-4">
                                  <span className="text-[11px] tracking-[0.2em] font-black text-[#D4AF37] uppercase mb-1">
                                    {item.label}
                                  </span>
                                  <span className="text-gray-700 text-sm font-semibold tracking-wide uppercase">
                                    {item.value || "—"}
                                  </span>
                                </div>
                              ))}
                            </div>

                            <a
                              href={getImageUrl(plan.floor_image)}
                              download
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-block border border-gray-900 text-gray-900 px-10 py-3 rounded-full text-[11px] font-bold uppercase tracking-[0.15em] hover:bg-gray-900 hover:text-white transition-all duration-300"
                            >
                              DOWNLOAD FLOOR PLAN
                            </a>
                          </motion.div>
                        );
                      })()}
                    </div>

                    {/* Right Arrow - Navigation */}
                    {floorPlanGroups[currentFloorPlan]?.plans.length > 1 && (
                      <button
                        onClick={handleNextSubPlan}
                        className="p-2 -mr-8 hover:bg-gray-100 rounded-full transition-all text-gray-400 hover:text-[#D4AF37]"
                      >
                        <ChevronRight size={32} strokeWidth={1} />
                      </button>
                    )}
                  </div>

                  {/* Right Side - Image */}
                  <div className="lg:col-span-8 flex justify-center items-center">
                    {(() => {
                      const group = floorPlanGroups[currentFloorPlan];
                      const plan = group?.plans[activeSubPlan];
                      if (!plan) return null;
                      const imageUrl = getImageUrl(plan.floor_image);
                      return (
                        <motion.div
                          key={`img-${currentFloorPlan}-${activeSubPlan}`}
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.5 }}
                          className="relative cursor-pointer group"
                          onClick={() => openLightbox(plan.floor_image)}
                        >
                          <img
                            src={imageUrl}
                            alt={`Floor Plan ${group.title}`}
                            className="w-full max-w-[600px] h-auto object-contain mx-auto transition-transform duration-700 group-hover:scale-[1.02]"
                          />
                          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300 rounded-xl flex items-center justify-center">
                            <Maximize2 className="text-[#D4AF37] opacity-0 group-hover:opacity-100 transition-opacity scale-150" />
                          </div>
                        </motion.div>
                      );
                    })()}
                  </div>

                </div>
              </div>
            </div>
          )}



          {/* Lifestyle Section */}
          {/* Lifestyle Section - Matches Uploaded Image Style */}
          {parsedLifestyle.length > 0 && (
            <div id="amenities" className="scroll-mt-32 py-8 bg-white">
              {/* Section Heading */}
              <motion.h2
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="text-4xl md:text-5xl font-black uppercase text-theme-primary leading-snug tracking-tighter font-sans mb-16 text-center"
              >
                Designed for Every <span className="text-theme-accent">Passion</span>
              </motion.h2>

              {/* Staggered Grid Container */}
              <motion.div
                className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 max-w-[1600px] mx-auto px-6"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                variants={{
                  hidden: { opacity: 0 },
                  visible: {
                    opacity: 1,
                    transition: {
                      staggerChildren: 0.1, // Fast ripple effect
                    },
                  },
                }}
              >
                {parsedLifestyle.map((item, i) => {
                  const itemName = typeof item === "string" ? item : item?.name || "Amenity";
                  const IconComponent = getAmenityIcon(itemName);

                  return (
                    <motion.div
                      key={i}
                      variants={{
                        hidden: { opacity: 0, y: 30, scale: 0.95 },
                        visible: {
                          opacity: 1,
                          y: 0,
                          scale: 1,
                          transition: { type: "spring", stiffness: 80, damping: 15 }
                        },
                      }}
                      whileHover="hover"
                      className="group relative flex flex-col items-center justify-center p-6 bg-[#F9F9F9] rounded-lg cursor-pointer aspect-square transition-colors duration-500 hover:bg-white"
                    >
                      {/* Hover Shadow Effect (Absolute to not affect layout) */}
                      <motion.div
                        className="absolute inset-0 rounded-lg shadow-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                        style={{ boxShadow: "0px 20px 40px -10px rgba(0,0,0,0.1)" }}
                      />

                      {/* Icon - Scales gently on hover */}
                      <motion.div
                        variants={{
                          hover: { scale: 1.1, y: -5 }
                        }}
                        transition={{ duration: 0.4, ease: "easeOut" }}
                        className="z-10 mb-6"
                      >
                        <IconComponent
                          size={48}
                          className="text-[#D4AF37] opacity-80 group-hover:opacity-100"
                          strokeWidth={1} // Thin stroke matches the image
                        />
                      </motion.div>

                      {/* Text Label */}
                      <div className="z-10 h-10 flex items-start justify-center">
                        <span className="text-theme-secondary font-medium tracking-widest uppercase text-[11px] md:text-xs text-center leading-relaxed group-hover:text-[#0B1A2E] transition-colors duration-300">
                          {itemName?.replace(/-/g, " ")}
                        </span>
                      </div>
                    </motion.div>
                  );
                })}
              </motion.div>
            </div>
          )}

          {/* Master Plan Section */}
          {(parsedConnectivity.length > 0 || propertyBlueprints.length > 0) && (
            <div id="masterplan" className="scroll-mt-32 py-8 bg-white">
              <div className="max-w-[1600px] mx-auto px-6">

                {/* Section Heading */}
                <motion.h2
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                  className="text-4xl md:text-5xl font-black uppercase text-theme-primary leading-snug tracking-tighter font-sans mb-16 text-center"
                >
                  The Best Of The City, All Within <span className="text-theme-accent">Minutes</span>
                </motion.h2>

                <div className="grid grid-cols-1 gap-12 items-start">
                  {/* Master plan images have been removed as per request */}
                </div>

                {/* Connectivity Grid - Full Width */}
                {parsedConnectivity.length > 0 && (
                  <motion.div
                    className={`max-w-[1200px] mx-auto gap-6 ${parsedConnectivity.length <= 4
                      ? 'flex flex-wrap justify-center'
                      : 'grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6'
                      }`}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-50px" }}
                    variants={{
                      hidden: { opacity: 0 },
                      visible: {
                        opacity: 1,
                        transition: { staggerChildren: 0.1 }, // Staggered ripple effect
                      },
                    }}
                  >
                    {parsedConnectivity.map((item, i) => {
                      const connectivityName = typeof item === "string" ? item : item?.name || item?.location || "Location";
                      const connectivityValue = typeof item === "object" && item?.value ? item.value : null;
                      const IconComponent = getAmenityIcon(connectivityName);

                      return (
                        <motion.div
                          key={i}
                          variants={{
                            hidden: { opacity: 0, y: 30, scale: 0.95 },
                            visible: {
                              opacity: 1, y: 0, scale: 1,
                              transition: { type: "spring", stiffness: 80, damping: 15 }
                            },
                          }}
                          whileHover="hover"
                          className="group relative flex flex-col items-center justify-center p-6 bg-[#F9F9F9] rounded-lg cursor-pointer aspect-square w-[150px] md:w-[180px] transition-colors duration-500 hover:bg-white"
                        >
                          {/* Hover Shadow */}
                          <motion.div
                            className="absolute inset-0 rounded-lg shadow-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                            style={{ boxShadow: "0px 20px 40px -10px rgba(0,0,0,0.1)" }}
                          />

                          {/* Icon */}
                          <motion.div
                            variants={{ hover: { scale: 1.1, y: -5 } }}
                            transition={{ duration: 0.4 }}
                            className="z-10 mb-4"
                          >
                            <IconComponent
                              size={40}
                              className="text-[#D4AF37] opacity-80 group-hover:opacity-100"
                              strokeWidth={1}
                            />
                          </motion.div>

                          {/* Text Details */}
                          <div className="z-10 text-center space-y-2">
                            <span className="block text-[#0B1A2E] font-medium tracking-wider uppercase text-[10px] md:text-xs">
                              {connectivityName}
                            </span>
                            {connectivityValue && (
                              <span className="block text-[#D4AF37] font-semibold text-xs md:text-sm">
                                {connectivityValue}
                              </span>
                            )}
                          </div>
                        </motion.div>
                      );
                    })}
                  </motion.div>
                )}
              </div>
            </div>
          )}



          {/* Brochure Download Section */}
          {property.brochure_url && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-[#D4AF37] rounded-xl flex items-center justify-center">
                    <FileText size={32} className="text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-[#0B1A2E] mb-1">Property Brochure</h3>
                    <p className="text-theme-secondary text-sm font-sans">Download complete property details and specifications</p>
                  </div>
                </div>
                <a
                  href={getImageUrl(property.brochure_url)}
                  download
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 bg-[#D4AF37] text-white px-6 py-3 rounded-lg font-bold hover:bg-[#C19A2E] transition-all whitespace-nowrap"
                >
                  <Download size={20} />
                  Download Brochure
                </a>
              </div>
            </motion.div>
          )}

          {/* Property Features - ONLY SHOW IF DATA EXISTS */}
          {property.features && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-4xl md:text-5xl font-black uppercase text-theme-primary leading-snug tracking-tighter font-sans mb-8 text-center">
                Property <span className="text-theme-accent">Features</span>
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {property.features.split(',').map((feature, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <Check size={18} className="text-[#D4AF37] flex-shrink-0" />
                    <span className="text-theme-secondary">{feature.trim()}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Virtual Tour Section */}
          {property.virtual_tour_url && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center gap-3 mb-5 justify-center">
                <div className="w-12 h-12 bg-[#D4AF37]/10 rounded-xl flex items-center justify-center">
                  <Video size={24} className="text-[#D4AF37]" />
                </div>
                <h2 className="text-4xl md:text-5xl font-black uppercase text-theme-primary leading-snug tracking-tighter font-sans text-center">
                  360° Virtual <span className="text-theme-accent">Tour</span>
                </h2>
              </div>
              <div className="aspect-video rounded-xl overflow-hidden">
                <iframe
                  src={property.virtual_tour_url}
                  className="w-full h-full"
                  frameBorder="0"
                  allowFullScreen
                />
              </div>
            </motion.div>
          )}

          {/* Similar Properties
          {similarProperties.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-2xl font-bold text-[#0B1A2E] mb-5 text-center" style={{ fontFamily: "'Cinzel', serif" }}>Similar Properties</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {similarProperties.map((prop) => {
                  const propImages = typeof prop.gallery === 'string' ? JSON.parse(prop.gallery || '[]') : (prop.images || prop.image || prop.gallery || []);
                  const imageArray = Array.isArray(propImages) ? propImages : [];
                  const firstImage = imageArray[0];
                  return (
                    <Link key={prop.id} to={`/property/${prop.id}`}>
                      <motion.div
                        whileHover={{ y: -5 }}
                        className="rounded-xl overflow-hidden hover:border-[#D4AF37] transition-all bg-white shadow-lg"
                      >
                        <div className="h-48 bg-gray-900">
                          {firstImage && (
                            <img
                              src={getImageUrl(firstImage)}
                              alt={prop.title}
                              className="w-full h-full object-cover"
                              onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = "https://via.placeholder.com/400x200/1A1A1A/FFD000?text=Property";
                              }}
                            />
                          )}
                        </div>
                        <div className="p-4">
                          <h3 className="text-[#0B1A2E] font-bold mb-2 truncate">{prop.title}</h3>
                          <div className="flex items-center gap-2 text-gray-600 text-sm mb-2">
                            <MapPin size={14} />
                            <span className="truncate">{prop.location}</span>
                          </div>
                          <div className="text-[#D4AF37] font-bold text-lg">{prop.price}</div>
                        </div>
                      </motion.div>
                    </Link>
                  );
                })}
              </div>
            </motion.div>
          )} */}

          {/* Location Map */}
          <motion.div
            id="location"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="scroll-mt-32 py-8"
          >
            <h2 className="text-4xl md:text-5xl font-black uppercase text-theme-primary leading-snug tracking-tighter font-sans mb-16 text-center">
              Property <span className="text-theme-accent">Location</span>
            </h2>
            <div className="h-[500px] rounded-xl overflow-hidden bg-gray-900">
              <iframe
                src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&q=${encodeURIComponent(property.location)}`}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
              />
            </div>
          </motion.div>

          {/* REGISTRATION FORM */}
          <motion.div
            id="contact"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="scroll-mt-32 bg-white p-8 md:p-12 rounded-3xl shadow-[0_0_40px_rgba(0,0,0,0.08)] border border-gray-100 max-w-4xl mx-auto"
          >
            {/* Header */}
            <div className="text-center mb-10">
              <div className="text-[#D4AF37] text-xs font-bold tracking-[0.2em] mb-3 uppercase">Registration</div>
              <h2 className="text-4xl md:text-5xl font-black uppercase text-theme-primary leading-snug tracking-tighter font-sans mb-10">
                Register Your <span className="text-theme-accent">Interest</span>
              </h2>
              <p className="text-gray-500 text-sm max-w-lg mx-auto leading-relaxed font-sans">
                Complete the form below and our property consultants will contact you shortly with exclusive details.
              </p>
            </div>

            {/* Inquiry Form */}
            <form onSubmit={handleSubmit} className="text-left">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">First Name *</label>
                  <input
                    type="text"
                    placeholder="As per passport"
                    required
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-800 text-sm focus:outline-none focus:border-[#D4AF37] transition-all"
                    value={formData.firstName}
                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Last Name *</label>
                  <input
                    type="text"
                    placeholder="As per passport"
                    required
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-800 text-sm focus:outline-none focus:border-[#D4AF37] transition-all"
                    value={formData.lastName}
                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Email Address *</label>
                  <input
                    type="email"
                    placeholder="example@mail.com"
                    required
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-800 text-sm focus:outline-none focus:border-[#D4AF37] transition-all"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Phone Number *</label>
                  <PhoneInput
                    country={'ae'}
                    value={formData.phone}
                    onChange={(phone, countryData) => {
                      setFormData({ 
                        ...formData, 
                        phone: phone,
                        phoneCode: `+${countryData.dialCode}` 
                      });
                    }}
                    containerClass="w-full"
                    inputClass="!w-full !h-12 !px-4 !py-3 !bg-gray-50 !border !border-gray-200 !rounded-lg !text-gray-800 !text-sm focus:!outline-none focus:!border-[#D4AF37] !transition-all !pl-12"
                    buttonClass="!bg-gray-50 !border-gray-200 !rounded-l-lg"
                    dropdownClass="!font-sans !text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Purpose of Buying</label>
                  <select
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-800 text-sm focus:outline-none focus:border-[#D4AF37] transition-all cursor-pointer"
                    value={formData.purpose}
                    onChange={(e) => setFormData({ ...formData, purpose: e.target.value })}
                  >
                    <option value="" disabled>Select Purpose</option>
                    <option value="Investment">Investment</option>
                    <option value="End Use">End Use</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Buying Timeline</label>
                  <select
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-800 text-sm focus:outline-none focus:border-[#D4AF37] transition-all cursor-pointer"
                    value={formData.timeline}
                    onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
                  >
                    <option value="" disabled>Select Timeline</option>
                    <option value="Immediately">Immediately</option>
                    <option value="1 to 3 months">1 to 3 months</option>
                    <option value="3 to 6 months">3 to 6 months</option>
                    <option value="6+ months">6+ months</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Bedrooms Interested</label>
                  <select
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-800 text-sm focus:outline-none focus:border-[#D4AF37] transition-all cursor-pointer"
                    value={formData.bedrooms}
                    onChange={(e) => setFormData({ ...formData, bedrooms: e.target.value })}
                  >
                    <option value="" disabled>Select Bedrooms</option>
                    <option value="Studio">Studio</option>
                    <option value="1 Bedroom">1 Bedroom</option>
                    <option value="2 Bedrooms">2 Bedrooms</option>
                    <option value="3 Bedrooms">3 Bedrooms</option>
                    <option value="4+ Bedrooms">4+ Bedrooms</option>
                  </select>
                </div>

                <div className="flex flex-col justify-center">
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-4 mt-2">Assisted by Broker?</label>
                  <div className="flex gap-8 items-center h-full pb-4">
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="radio"
                        name="assistedByBroker"
                        value="Yes"
                        checked={formData.assistedByBroker === "Yes"}
                        onChange={(e) => setFormData({ ...formData, assistedByBroker: e.target.value })}
                        className="w-4 h-4 text-[#D4AF37] border-gray-300 focus:ring-[#D4AF37] accent-[#D4AF37]"
                      />
                      <span className="text-sm text-gray-800 font-medium">Yes</span>
                    </label>
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="radio"
                        name="assistedByBroker"
                        value="No"
                        checked={formData.assistedByBroker === "No"}
                        onChange={(e) => setFormData({ ...formData, assistedByBroker: e.target.value })}
                        className="w-4 h-4 text-[#D4AF37] border-gray-300 focus:ring-[#D4AF37] accent-[#D4AF37]"
                      />
                      <span className="text-sm text-gray-800 font-medium">No</span>
                    </label>
                  </div>
                </div>
              </div>

              <div className="mt-10">
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-[#D4AF37] hover:bg-[#C19A2E] text-white py-4 rounded-lg font-bold tracking-[0.1em] shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 uppercase text-sm"
                >
                  Register Interest
                </motion.button>
                <p className="text-center text-[10px] text-gray-400 mt-4 uppercase tracking-wider font-sans">
                  By clicking submit, you agree to our privacy policy and terms.
                </p>
              </div>
            </form>
          </motion.div>

        </div>

      </div>

      {/* LIGHTBOX */}
      {lightboxOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={closeLightbox}
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3 }}
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-6xl max-h-[90vh] w-full"
          >
            <img
              src={getImageUrl(lightboxImage)}
              alt="Property"
              className="w-full h-full object-contain rounded-xl"
            />
            <button
              onClick={closeLightbox}
              className="absolute top-4 right-4 w-10 h-10 bg-white/10 backdrop-blur-sm hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-all"
            >
              ✕
            </button>
          </motion.div>
        </motion.div>
      )}

      {/* Floating Action Buttons */}
      <div className="fixed bottom-8 right-8 flex flex-col gap-3 z-40">
        {/* Favorite Button */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsFavorite(!isFavorite)}
          className={`w-14 h-14 rounded-full shadow-lg flex items-center justify-center transition-all ${isFavorite ? 'bg-red-500' : 'bg-white border border-gray-300'
            }`}
        >
          <Heart size={24} className={isFavorite ? 'text-white fill-white' : 'text-gray-700'} />
        </motion.button>

        {/* Share Button */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => {
            if (navigator.share) {
              navigator.share({
                title: property.title,
                text: `Check out this property: ${property.title}`,
                url: window.location.href
              });
            } else {
              navigator.clipboard.writeText(window.location.href);
              alert('Link copied to clipboard!');
            }
          }}
          className="w-14 h-14 bg-white border border-gray-300 rounded-full shadow-lg flex items-center justify-center"
        >
          <Share2 size={24} className="text-gray-700" />
        </motion.button>
      </div>

      {/* Footer Section */}
      <Footer content={content} />
    </div>
  );
};

export default PropertyDetail;
