import React, { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Building2, Search, Bed, Bath, Maximize2, Filter, ChevronDown, Calendar, ArrowRight, X } from "lucide-react";
import { handleDelete } from "../../utils/adminHelpers";
import { getCompanyLogo } from "../../utils/companyLogos";
import { IMAGE_BASE_URL } from "../../data/constanturl";
import sobhaImage from '../../assets/sobhaimage.webp';
import sobhaLogo from '../../assets/sobha.png';
import hartlandBanner from '../../assets/hartland_banner.webp';
import siniyaBanner from '../../assets/siniyabanner.webp';

const PropertiesSection = ({ properties, user, content, layout = 'horizontal', isFeatured = false }) => {
  const navigate = useNavigate();

  // Developer filter state
  const [selectedDeveloper, setSelectedDeveloper] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  // Debug: Log properties to console
  console.log("Properties received:", properties);

  const getImageUrl = (imagePath) => {
    // Special handling for Sobha imported images
    if (typeof imagePath === 'object' || imagePath === sobhaImage || imagePath === hartlandBanner || imagePath === siniyaBanner) {
      return imagePath;
    }

    if (!imagePath || imagePath === 'undefined' || imagePath === 'null' || imagePath.trim() === '') {
      return "https://via.placeholder.com/400x300/1A1A1A/FFD000?text=No+Image";
    }
    if (imagePath.startsWith('http')) return imagePath;
    if (imagePath.startsWith('data:')) return imagePath;

    const cleanPath = imagePath.startsWith('/') ? imagePath.substring(1) : imagePath;
    const fullUrl = `${IMAGE_BASE_URL}${cleanPath}`;
    return fullUrl;
  };

  const getPropertyImage = (property) => {
    // Special handling for Sobha Central
    if (property.isSobhaCentral) {
      return sobhaImage;
    }

    // Special handling for Sobha Hartland 2
    if (property.isSobhaHartland2) {
      return hartlandBanner;
    }

    // Special handling for Sobha Siniya Island
    if (property.isSobhaSiniyaIsland) {
      return siniyaBanner;
    }

    const images = property?.images || property?.image || property?.img || property?.heroImages || [];

    // Parse if it's a JSON string
    let parsedImages = images;
    if (typeof images === 'string') {
      try {
        parsedImages = JSON.parse(images);
      } catch (e) {
        parsedImages = [images];
      }
    }

    const imageArray = Array.isArray(parsedImages) ? parsedImages : [];
    const firstImage = imageArray.find(img => img && img !== 'undefined' && img !== 'null' && img.trim() !== '');
    return firstImage || null;
  };

  // Filter properties from API based on status
  // 0: Hidden, 1: Visible, 2: Sold Out
  const filteredProperties = (properties || []).filter(p => {
    // If status is not provided, assume 1 (visible)
    if (p.status === undefined || p.status === null) return true;
    // Status 0 (or "0") means not visible
    return String(p.status) !== '0';
  });

  // Add Sobha Central as a static property card to link to the dedicated page
  const sobhaCentralCard = {
    id: 'sobha-central',
    title: 'Sobha Central',
    location: 'Jebal Ali Village',
    category: 'Luxury',
    developer: 'Sobha',
    company: 'Sobha Realty',
    price: 'Contact for Price',
    no_of_beds: 0,
    no_of_bath: 0,
    sq_ft: 0,
    status: 1,
    isSobhaCentral: true
  };
  const sobhaHartland2Card = {
    id: 'sobha-hartland-2',
    title: 'SOBHA HARTLAND 2',
    location: 'Nad Al Sheba 1',
    category: 'Luxury',
    developer: 'Sobha',
    company: 'Sobha Realty',
    price: 'Contact for Price',
    no_of_beds: 0,
    no_of_bath: 0,
    sq_ft: 0,
    status: 1,
    isSobhaHartland2: true
  };

  const sobhaSiniyaIslandCard = {
    id: 'sobha-siniya-island',
    title: 'SOBHA SINIYA ISLAND',
    location: 'Al Siniya Island',
    category: 'Luxury Island',
    developer: 'Sobha',
    company: 'Sobha Realty',
    price: 'Contact for Price',
    no_of_beds: 0,
    no_of_bath: 0,
    sq_ft: 0,
    status: 1,
    isSobhaSiniyaIsland: true
  };

  const sortedProps = [sobhaCentralCard, sobhaHartland2Card, sobhaSiniyaIslandCard, ...filteredProperties.sort((a, b) => {
    const dateA = new Date(a.created_at || 0);
    const dateB = new Date(b.created_at || 0);
    return dateB - dateA;
  })];

  // ─── Get unique developers from all sorted props ───────────────────────────
  const uniqueDevelopers = ['All', ...new Set(
    sortedProps
      .map(p => {
        // Normalise company/developer label the same way as the card display
        if (Array.isArray(p.company) && p.company.length > 0) {
          return p.company[0]?.name || p.company[0];
        }
        return p.company || p.developer;
      })
      .filter(Boolean)
  )];

  // ─── Apply developer + search filter ──────────────────────────────────────
  const applyFilters = (list) => {
    return list.filter(prop => {
      // Developer filter
      const devLabel = Array.isArray(prop.company) && prop.company.length > 0
        ? (prop.company[0]?.name || prop.company[0])
        : (prop.company || prop.developer);

      const matchesDev = selectedDeveloper === 'All' || devLabel === selectedDeveloper;

      // Search filter (title / location)
      const query = searchQuery.trim().toLowerCase();
      const matchesSearch = !query ||
        (prop.title || '').toLowerCase().includes(query) ||
        (prop.location || '').toLowerCase().includes(query) ||
        (devLabel || '').toLowerCase().includes(query);

      return matchesDev && matchesSearch;
    });
  };

  const baseProps = isFeatured ? sortedProps.slice(0, 6) : sortedProps;
  const displayedProps = applyFilters(baseProps);

  return (
    <section className="section-bg-secondary min-h-screen py-16">
      <div className="container mx-auto px-6 max-w-7xl">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-4xl md:text-5xl font-black uppercase text-theme-primary leading-snug tracking-tighter font-sans">
              FEATURED <span className="text-theme-accent">PROJECTS</span>
            </h2>
          </div>
          <p className="text-theme-secondary text-sm mt-4 max-w-2xl mx-auto">Discover your dream property from our exclusive collection</p>
        </motion.div>

        {/* ─── Developer Filter Bar ──────────────────────────────────────────── */}
        {!isFeatured && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="mb-10"
          >
            {/* Search input */}
            <div className="relative max-w-md mx-auto mb-6">
              <Search
                size={16}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-[#D4AF37] pointer-events-none"
              />
              <input
                id="property-search"
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Search by name, location or developer…"
                className="w-full pl-10 pr-10 py-3 rounded-xl bg-white/5 border border-white/10 text-theme-primary placeholder-theme-secondary text-sm focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-theme-secondary hover:text-[#D4AF37] transition-colors"
                  aria-label="Clear search"
                >
                  <X size={14} />
                </button>
              )}
            </div>

            {/* Developer pill buttons */}
            <div className="flex flex-wrap justify-center gap-3">
              {uniqueDevelopers.map(dev => {
                const isActive = selectedDeveloper === dev;
                return (
                  <motion.button
                    key={dev}
                    id={`filter-${dev.replace(/\s+/g, '-').toLowerCase()}`}
                    onClick={() => setSelectedDeveloper(dev)}
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.97 }}
                    className={`relative px-5 py-2 rounded-full text-xs font-black uppercase tracking-widest transition-all duration-300 border ${isActive
                      ? 'bg-[#D4AF37] text-white border-[#D4AF37] shadow-[0_0_20px_rgba(212,175,55,0.4)]'
                      : 'bg-transparent text-theme-secondary border-white/20 hover:border-[#D4AF37]/60 hover:text-[#D4AF37]'
                      }`}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="active-filter-pill"
                        className="absolute inset-0 rounded-full bg-[#D4AF37]"
                        style={{ zIndex: -1 }}
                      />
                    )}
                    <Filter size={10} className="inline-block mr-1.5 mb-0.5" />
                    {dev}
                  </motion.button>
                );
              })}
            </div>

            {/* Result count */}
            <p className="text-center text-theme-secondary text-xs mt-4">
              {displayedProps.length === 0
                ? 'No properties match the selected filters.'
                : `Showing ${displayedProps.length} propert${displayedProps.length === 1 ? 'y' : 'ies'}${selectedDeveloper !== 'All' ? ` by ${selectedDeveloper}` : ''}`}
            </p>
          </motion.div>
        )}
        {/* ─── End Filter Bar ────────────────────────────────────────────────── */}

        {/* Properties Grid */}
        {displayedProps.length === 0 && !user?.role ? (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">🏠</div>
            <h3 className="text-2xl font-bold text-theme-primary mb-2">No Properties Found</h3>
            <p className="text-theme-secondary">Check back soon for new listings or adjust your search filters.</p>
            {(selectedDeveloper !== 'All' || searchQuery) && (
              <button
                onClick={() => { setSelectedDeveloper('All'); setSearchQuery(''); }}
                className="mt-6 inline-flex items-center gap-2 text-[#D4AF37] text-sm font-bold uppercase tracking-widest hover:underline"
              >
                <X size={14} /> Clear Filters
              </button>
            )}
          </div>
        ) : (
          <div className={`grid grid-cols-1 md:grid-cols-2 ${layout === 'grid' ? 'lg:grid-cols-4' : 'lg:grid-cols-3'} gap-8`}>
            <AnimatePresence mode="popLayout">
              {displayedProps.map((prop) => (
                <motion.div
                  key={prop.id || prop._id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  whileHover={{ y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="flex flex-col h-full"
                >
                  <Link to={prop.isSobhaCentral ? '/sobha-central' : prop.isSobhaHartland2 ? '/sobha-hartland-2' : prop.isSobhaSiniyaIsland ? '/sobha-siniya-island' : `/property/${prop.id || prop._id}`} className="flex flex-col h-full">
                    <div className="card-theme rounded-2xl overflow-hidden hover:border-theme-accent transition-all duration-300 flex flex-col h-full">
                      {/* Image */}
                      <div className="relative h-[380px] overflow-hidden flex-shrink-0">
                        <motion.img
                          whileHover={{ scale: 1.05 }}
                          transition={{ duration: 0.4 }}
                          src={getImageUrl(getPropertyImage(prop))}
                          className="w-full h-full object-cover"
                          alt={prop.title}
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = "https://via.placeholder.com/400x300/1A1A1A/FFD000?text=Property+Image";
                          }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                        {/* Status Badges */}
                        {String(prop.status) === '2' && (
                          <div className="absolute top-4 right-4 z-10">
                            <motion.div
                              initial={{ opacity: 0, scale: 0.8 }}
                              animate={{ opacity: 1, scale: 1 }}
                              className="bg-red-600 text-white px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-tighter shadow-xl border border-red-500/50 flex items-center gap-1.5"
                            >
                              <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
                              Sold Out
                            </motion.div>
                          </div>
                        )}
                      </div>


                      {/* Content */}
                      <div className="p-6 flex flex-col flex-1 justify-between">
                        <div>
                          {/* 1. Developer - Small, Gold */}
                          <p className="text-[#D4AF37] text-[10px] font-bold tracking-[0.2em] mb-1">
                            {(() => {
                              const dev = (Array.isArray(prop.company) && prop.company.length > 0
                                ? (prop.company[0]?.name || prop.company[0])
                                : (prop.company || prop.developer || "SOBHA REALTY"));

                              if (dev.toUpperCase() === 'SOBHA' || dev.toUpperCase() === 'SOBHA REALTY') return "Sobha Realty";
                              return dev;
                            })()}
                          </p>

                          {/* 2. Project/Building Name - Professional Typography & Fixed Height */}
                          <div className="flex items-center justify-between gap-4 mb-2 h-14">
                            <h3 className="text-l font-black text-white leading-[1.2] uppercase line-clamp-2 flex-1 flex items-center">
                              {prop.title}
                            </h3>
                            <div className="flex-shrink-0 text-[#D4AF37] text-[10px] font-black uppercase tracking-wider">
                              VIEW DETAILS
                            </div>
                          </div>
                        </div>

                        {/* 3. Community/Location - Smaller, Muted White */}
                        <div className="text-white/60 text-[11px] font-medium tracking-wide mt-auto capitalize">
                          {(() => {
                            const title = (prop.title || "").toLowerCase();
                            const locationStr = (prop.location || "").toLowerCase();

                            // 0. If it's the main community card itself, use its assigned location
                            if (prop.isSobhaCentral || prop.isSobhaHartland2 || prop.isSobhaSiniyaIsland) {
                              return prop.location;
                            }

                            // 1. Group projects under "Sobha Hartland 2"
                            const isHartland2Project =
                              title.includes("skyvue") ||
                              title.includes("skyscape") ||
                              title.includes("riverside") ||
                              title.includes("sobha estates") ||
                              locationStr.includes("nad al sheba");
                            if (isHartland2Project) return "Sobha Hartland 2";

                            // 2. Group projects under "Sobha Siniya Island"
                            const isSiniyaProject =
                              title.includes("siniya") ||
                              locationStr.includes("siniya");
                            if (isSiniyaProject) return "Sobha Siniya Island";

                            // 3. Group projects under "Sobha Central"
                            const isCentralProject =
                              title.includes("pinnacle") && !title.includes("riverside") ||
                              locationStr.includes("jebal ali");
                            if (isCentralProject) return "Sobha Central";

                            return prop.community_name || prop.community || prop.location;
                          })()}
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}

        {/* View All Properties Button - ONLY SHOW IF isFeatured IS TRUE */}
        {isFeatured && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mt-16 text-center"
          >
            <Link
              to="/properties"
              className="inline-flex items-center gap-2 bg-[#D4AF37] hover:bg-[#C2A032] text-white px-10 py-4 rounded-xl font-bold uppercase tracking-widest transition-all shadow-xl hover:shadow-[0_0_30px_rgba(212,175,55,0.3)]"
            >
              View All Properties
              <ArrowRight size={20} />
            </Link>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default PropertiesSection;