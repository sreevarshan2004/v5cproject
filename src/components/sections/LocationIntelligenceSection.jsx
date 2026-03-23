import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, TrendingUp, ArrowRight } from 'lucide-react';

const LocationIntelligenceSection = ({ content }) => {
  const [activeDistrict, setActiveDistrict] = useState(0);
  const mapRef = useRef(null);
  const markersRef = useRef([]);

  const districts = content?.districts || [
    {
      id: 0,
      name: "DUBAI MARINA",
      description: "Premium waterfront living and high-rises.",
      features: ["High Rental Yields", "Waterfront Living", "Global Connectivity", "Luxury Amenities"],
      stat: "8.5%",
      statLabel: "Avg. ROI",
      coordinates: { lat: 25.0805, lng: 55.1396 }
    },
    // ... other fallback districts if needed, but the API/Constants should handle this
  ];

  const [googleMapsLoaded, setGoogleMapsLoaded] = useState(false);
  const mapInstanceRef = useRef(null);

  useEffect(() => {
    const loadGoogleMaps = () => {
      if (window.google) {
        setGoogleMapsLoaded(true);
        return;
      }

      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8`;
      script.async = true;
      script.defer = true;
      script.onload = () => setGoogleMapsLoaded(true);
      document.head.appendChild(script);
    };

    loadGoogleMaps();
  }, []);

  // Initialize Map
  useEffect(() => {
    if (googleMapsLoaded && mapRef.current && !mapInstanceRef.current) {
      mapInstanceRef.current = new window.google.maps.Map(mapRef.current, {
        center: { lat: 25.1124, lng: 55.2003 },
        zoom: 11,
        styles: [
          { elementType: "geometry", stylers: [{ color: "#1a1a1a" }] },
          { elementType: "labels.text.stroke", stylers: [{ color: "#0d0d0d" }] },
          { elementType: "labels.text.fill", stylers: [{ color: "#746855" }] },
          { featureType: "administrative.locality", elementType: "labels.text.fill", stylers: [{ color: "#EDB634" }] },
          { featureType: "poi", elementType: "labels.text.fill", stylers: [{ color: "#d59563" }] },
          { featureType: "poi.park", elementType: "geometry", stylers: [{ color: "#263c3f" }] },
          { featureType: "poi.park", elementType: "labels.text.fill", stylers: [{ color: "#6b9a76" }] },
          { featureType: "road", elementType: "geometry", stylers: [{ color: "#2c2c2c" }] },
          { featureType: "road", elementType: "geometry.stroke", stylers: [{ color: "#212a37" }] },
          { featureType: "road", elementType: "labels.text.fill", stylers: [{ color: "#9ca5b3" }] },
          { featureType: "road.highway", elementType: "geometry", stylers: [{ color: "#3a3a3a" }] },
          { featureType: "road.highway", elementType: "geometry.stroke", stylers: [{ color: "#1f2835" }] },
          { featureType: "road.highway", elementType: "labels.text.fill", stylers: [{ color: "#f3d19c" }] },
          { featureType: "transit", elementType: "geometry", stylers: [{ color: "#2f3948" }] },
          { featureType: "transit.station", elementType: "labels.text.fill", stylers: [{ color: "#d59563" }] },
          { featureType: "water", elementType: "geometry", stylers: [{ color: "#0a1929" }] },
          { featureType: "water", elementType: "labels.text.fill", stylers: [{ color: "#515c6d" }] },
          { featureType: "water", elementType: "labels.text.stroke", stylers: [{ color: "#0a1929" }] },
        ],
      });
    }
  }, [googleMapsLoaded]);

  // Update Markers when districts or maps are ready
  useEffect(() => {
    if (!mapInstanceRef.current || !window.google) return;

    // Clear existing markers
    markersRef.current.forEach(marker => marker.setMap(null));
    markersRef.current = [];

    // Create new markers
    markersRef.current = districts.map((district, index) => {
      if (!district.coordinates) return null;

      const marker = new window.google.maps.Marker({
        position: district.coordinates,
        map: mapInstanceRef.current,
        title: district.name,
        icon: {
          path: window.google.maps.SymbolPath.CIRCLE,
          scale: index === activeDistrict ? 14 : 10,
          fillColor: index === activeDistrict ? "#EDB634" : "#ffffff",
          fillOpacity: 1,
          strokeColor: "#0B1A2E",
          strokeWeight: 3,
        },
        zIndex: index === activeDistrict ? 1000 : 1,
      });

      marker.addListener("click", () => {
        setActiveDistrict(index);
      });

      return marker;
    }).filter(m => m !== null);

    // Pan to active district if it changes
    if (districts[activeDistrict]?.coordinates) {
      mapInstanceRef.current.panTo(districts[activeDistrict].coordinates);
    }

  }, [districts, googleMapsLoaded]);

  // Update marker styles only when activeDistrict changes (efficiently)
  useEffect(() => {
    if (markersRef.current.length > 0 && window.google) {
      markersRef.current.forEach((marker, index) => {
        if (!marker) return;
        marker.setIcon({
          path: window.google.maps.SymbolPath.CIRCLE,
          scale: index === activeDistrict ? 14 : 10,
          fillColor: index === activeDistrict ? "#EDB634" : "#ffffff",
          fillOpacity: 1,
          strokeColor: "#0B1A2E",
          strokeWeight: 3,
        });
        marker.setZIndex(index === activeDistrict ? 1000 : 1);
      });

      if (districts[activeDistrict]?.coordinates && mapInstanceRef.current) {
        mapInstanceRef.current.panTo(districts[activeDistrict].coordinates);
      }
    }
  }, [activeDistrict]);

  return (
    <section className="section-bg-tertiary relative py-20 overflow-hidden">
      <div className="container mx-auto px-6 md:px-12 lg:px-24">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-black uppercase text-theme-primary leading-snug tracking-tighter mb-4">
            {content?.locationIntelTitle?.split(' ')[0]} <span className="text-theme-accent">{content?.locationIntelTitle?.split(' ')[1] || "Intelligence"}</span>
          </h2>
          <p className="text-theme-secondary text-lg max-w-2xl mx-auto font-sans">
            {content?.locationIntelDesc || "Explore Dubai's most sought-after districts and discover investment opportunities"}
          </p>
        </motion.div>

        {/* Main Content */}
        <div className="relative">
          {/* Full Width Map */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative w-full h-[600px] rounded-2xl overflow-hidden border border-[#EDB634]/20"
          >
            <div ref={mapRef} className="w-full h-full" />

            {/* Floating Info Card - Top Right */}
            <div className="absolute top-6 right-6 w-[420px] max-h-[calc(100%-3rem)] overflow-y-auto">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeDistrict}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3 }}
                  className="bg-gradient-to-br from-[#0D1F35] to-[#0B1A2E] rounded-xl p-8 border border-theme shadow-2xl backdrop-blur-sm"
                >
                  {/* District Name */}
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-[#EDB634]/10 rounded-lg flex items-center justify-center">
                      <MapPin className="w-6 h-6 text-[#EDB634]" />
                    </div>
                    <h3 className="text-2xl font-bold text-white">
                      {districts[activeDistrict].name}
                    </h3>
                  </div>

                  {/* Description */}
                  <p className="text-white/70 text-base mb-6 leading-relaxed font-sans">
                    {districts[activeDistrict].description}
                  </p>

                  {/* Features */}
                  <div className="mb-6">
                    <h4 className="text-sm font-semibold text-[#EDB634] mb-3 uppercase tracking-wider">
                      Key Features
                    </h4>
                    <div className="grid grid-cols-1 gap-3">
                      {districts[activeDistrict].features.map((feature, idx) => (
                        <div key={idx} className="flex items-center gap-3">
                          <div className="w-1.5 h-1.5 bg-[#EDB634] rounded-full"></div>
                          <span className="text-white/70 text-sm">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Stat Box */}
                  <div className="bg-black/30 rounded-lg p-5 border border-[#EDB634]/20">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-xs text-white/50 uppercase tracking-wider mb-2">
                          {districts[activeDistrict].statLabel}
                        </div>
                        <div className="text-3xl font-bold text-[#EDB634]">
                          {districts[activeDistrict].stat}
                        </div>
                      </div>
                      <div className="w-12 h-12 bg-[#EDB634]/10 rounded-full flex items-center justify-center">
                        <TrendingUp className="w-6 h-6 text-[#EDB634]" />
                      </div>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default LocationIntelligenceSection;
