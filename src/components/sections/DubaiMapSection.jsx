import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { MapContainer, TileLayer, Marker, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Adjust path to your data
import { mapDistricts } from "../../data/constants"; 
import { fadeInUp, buttonHover, buttonTap } from "../../utils/animations";

// --- CUSTOM MAP STYLES & ICONS ---

// 1. Helper to move the map when a pin is clicked
const ChangeView = ({ center, zoom }) => {
  const map = useMap();
  useEffect(() => {
    map.flyTo(center, zoom, { duration: 1.5 });
  }, [center, zoom, map]);
  return null;
};

// 2. Custom Gold Icon Function
const createCustomIcon = (isSelected) => {
  return L.divIcon({
    className: "custom-pin",
    html: `
      <div style="
        position: relative;
        width: ${isSelected ? '32px' : '24px'};
        height: ${isSelected ? '32px' : '24px'};
        display: flex;
        align-items: center;
        justify-content: center;
      ">
        ${isSelected ? '<div style="position:absolute; inset:0; border-radius:50%; background:#D4AF37; opacity:0.6; animation: ping 1.5s cubic-bezier(0, 0, 0.2, 1) infinite;"></div>' : ''}
        <div style="
          width: 100%;
          height: 100%;
          border-radius: 50%;
          border: 2px solid #fff;
          background-color: #D4AF37;
          box-shadow: 0 4px 10px rgba(0,0,0,0.5);
        "></div>
      </div>
    `,
    iconSize: [30, 30],
    iconAnchor: [15, 15],
  });
};

const DubaiMapSection = ({ content }) => {
  // SAFETY CHECK: Ensure data exists
  if (!mapDistricts || mapDistricts.length === 0 || !mapDistricts[0].lat) {
    return <div className="text-white text-center py-20">Map Data Loading...</div>;
  }

  const [selected, setSelected] = useState(mapDistricts[0]);

  return (
    <section id="map" className="py-24 md:py-40 bg-black border-t border-white/5 overflow-hidden font-sans">
      
      {/* HEADER */}
      <div className="container mx-auto px-6 md:px-24 text-center mb-16 md:mb-24">
          <motion.span variants={fadeInUp} initial="hidden" whileInView="show" viewport={{once:true}} className="text-[#D4AF37] text-[10px] font-black uppercase tracking-[0.8em] block mb-6">
            Location Intelligence
          </motion.span>
          <motion.h2 variants={fadeInUp} initial="hidden" whileInView="show" viewport={{once:true}} className="text-3xl md:text-5xl font-black uppercase text-white tracking-tighter">
            {content.mapTitle}
          </motion.h2>
          <motion.p variants={fadeInUp} initial="hidden" whileInView="show" viewport={{once:true}} className="text-gray-500 text-xs md:text-sm font-bold uppercase tracking-widest mt-6 max-w-xl mx-auto">
            {content.mapCaption}
          </motion.p>
      </div>

      <div className="container mx-auto px-6 md:px-24 grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch h-[600px] lg:h-[700px]">
          
          {/* --- LEFT SIDE: INFO CARD (Order 1 on Desktop) --- */}
          <div className="lg:col-span-4 lg:order-1 flex flex-col">
            <AnimatePresence mode="wait">
              <motion.div 
                key={selected.name} 
                initial={{opacity:0, x:-20}} 
                animate={{opacity:1, x:0}} 
                exit={{opacity:0, x:20}} 
                transition={{duration: 0.4}} 
                className="bg-[#0A0A0A] border border-white/5 p-8 md:p-10 rounded-[2.5rem] flex-grow relative overflow-hidden shadow-2xl flex flex-col justify-center"
              >
                {/* District Content */}
                <div className="flex items-center gap-4 mb-6">
                  <div className="h-[2px] w-6 bg-[#D4AF37]" />
                  <span className="text-[#D4AF37] text-[9px] font-black uppercase tracking-[0.4em]">District Highlight</span>
                </div>
                
                <h3 className="text-white text-3xl md:text-4xl font-black uppercase mb-6 leading-none tracking-tighter">
                  {selected.name}
                </h3>
                
                <p className="text-gray-400 text-xs md:text-sm leading-relaxed mb-10">
                  {selected.desc}
                </p>
                
                {/* Google Maps External Link */}
                <motion.a 
                  href={`https://www.google.com/maps/search/?api=1&query=${selected.lat},${selected.lng}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={buttonHover} 
                  whileTap={buttonTap} 
                  className="w-full py-4 bg-[#D4AF37] text-black text-[10px] font-black uppercase tracking-[0.25em] rounded-xl hover:bg-white transition-all shadow-xl flex items-center justify-center gap-3 cursor-pointer"
                >
                  Explore District <ArrowUpRight size={16}/>
                </motion.a>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* --- RIGHT SIDE: MAP CONTAINER (Order 2 on Desktop) --- */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }} 
            whileInView={{ opacity: 1, scale: 1 }} 
            transition={{ duration: 0.8 }} 
            viewport={{once:true}} 
            className="lg:col-span-8 lg:order-2 relative rounded-[3rem] border border-white/10 overflow-hidden shadow-2xl bg-[#0A0A0A] z-0"
          >
            <MapContainer 
              center={[selected.lat, selected.lng]} 
              zoom={13} 
              scrollWheelZoom={false}
              className="w-full h-full z-0"
              style={{ background: '#050505' }}
            >
              {/* SATELLITE TILE LAYER */}
              <TileLayer
                attribution='Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
                url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
              />
              
              {/* LOGIC TO FLY TO LOCATION */}
              <ChangeView center={[selected.lat, selected.lng]} zoom={14} />

              {/* MARKERS */}
              {mapDistricts.map((district, idx) => (
                <Marker 
                  key={idx} 
                  position={[district.lat, district.lng]}
                  icon={createCustomIcon(selected.name === district.name)}
                  eventHandlers={{
                    click: () => setSelected(district),
                  }}
                />
              ))}
            </MapContainer>

            {/* Gradient Overlay - Reduced opacity so the map colors show through */}
            <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black via-transparent to-transparent opacity-40 z-[400]" />
          </motion.div>

      </div>
    </section>
  );
};

export default DubaiMapSection;