import { 
  Sparkles, Globe, ShieldCheck, UserCheck, Zap, LayoutGrid, 
  Handshake, Map, Key, Palette, Users, ClipboardList, Scale, 
  Trophy, Baby, Dumbbell, TreePine, Flower2, Sofa, PersonStanding, 
  Droplets, Waves 
} from "lucide-react";

import emaarLogo from '../assets/emmar.png';
import meraasLogo from '../assets/merras.jpg';
import sobhaLogo from '../assets/sobha.jpg';
import aziziLogo from '../assets/azizi.jpg';

// 1. Translations
export const translations = {
  EN: {
    dir: "ltr",
    nav: ["Home", "About Us", "Emirates", "Services", "Properties", "Presence", "Developers", "Process", "FAQ", "Testimonials", "Contact"],
    topTag: "Trusted Property Consultants since 2002",
    headline: "Your Global Gateway to Dubai Real Estate Investments",
    subHeadline: "Dubai • India • UAE • Canada • Israel • USA",
    consultBtn: "Free Consultation",
    aboutTitle: "Our Strategic Evolution",
    aboutText: "Founded on the principles of trust and expertise, we guide global investors through the dynamic Dubai real estate landscape with over two decades of experience.",
    emiratesTitle: "The United Arab Emirates",
    emiratesHeading: "About Dubai & The Seven Emirates",
    emiratesMainContent: "Dubai stands as a premier global financial & lifestyle hub, serving as the ultimate gateway between East & West.",
    mapTitle: "Dubai Location Map",
    mapCaption: "Strategic locations driving value and lifestyle excellence.",
    whyTitle: "Why Dubai Properties",
    whyCards: [
      { title: "High ROI & Capital Growth", points: ["Strong rental yields", "Zero property tax", "Stable currency"] },
      { title: "Global Investor-Friendly", points: ["Golden Visa", "100% foreign ownership", "Transparent regulations"] },
      { title: "Safe & Stable Economy", points: ["Strong governance", "Global business hub", "World-class infrastructure"] }
    ],
    presenceTitle: "Our Global Presence",
    propTitle: "Featured Properties",
    propFilters: ["All", "Off-Plan", "Ready", "Luxury", "Investment"],
    devPartnerLine: "Officially associated with Dubai's most trusted developers.",
    addPropTitle: "List New Property",
    addPropSubtitle: "Proprietary Management Portal",
    footer: {
      about: "V5C Properties LLC is a premier real estate consultancy hub providing specialized developer-led solutions since 2002.",
      quick: ["Home", "About Us", "Developers", "FAQ"],
      services: ["Consultancy", "Turnkey Solutions", "B2B Connections"],
      properties: ["Luxury Villas", "Penthouses", "Off-Plan"]
    }
  },
  AR: {
    dir: "rtl",
    nav: ["الرئيسية", "من نحن", "الإمارات", "خدماتنا", "العقارات", "تواجدنا", "المطورون", "العملية", "الأسئلة", "الشهادات", "اتصل بنا"],
    topTag: "مستشارو عقارات موثوقون منذ عام 2002",
    headline: "بوابتك العالمية لاستثمارات العقارات في دبي",
    subHeadline: "دبي • الهند • الإمارات • كندا • إسرائيل • أمريكا",
    consultBtn: "استشارة مجانية",
    aboutTitle: "تطورنا الاستراتيجي",
    aboutText: "تأسست على مبادئ الثقة والخبرة، نوجه المستثمرين العالميين عبر مشهد العقارات الديناميكي في دبي مع أكثر من عقدين من الخبرة.",
    emiratesTitle: "الإمارات العربية المتحدة",
    emiratesHeading: "حول دبي والإمارات السبع",
    emiratesMainContent: "تقف دبي كمركز مالي ونمط حياة عالمي رائد، وتعمل كبوابة نهائية بين الشرق والغرب.",
    mapTitle: "خريطة مواقع دبي",
    mapCaption: "مواقع استراتيجية تدفع القيمة والتميز في نمط الحياة.",
    whyTitle: "لماذا عقارات دبي",
    whyCards: [
      { title: "عائد مرتفع ونمو رأسمالي", points: ["عائدات إيجار قوية", "لا توجد ضريبة عقارية", "عملة مستقرة"] },
      { title: "صديقة للمستثمر العالمي", points: ["التأشيرة الذهبية", "تملك أجنبي بنسبة 100%", "لوائح شفافة"] },
      { title: "اقتصاد آمن ومستقر", points: ["حوكمة قوية", "مركز أعمال عالمي", "بنية تحتية عالمية"] }
    ],
    presenceTitle: "تواجدنا العالمي",
    propTitle: "عقارات مميزة",
    propFilters: ["الكل", "قيد الإنشاء", "جاهز", "فاخر", "استثمار"],
    devPartnerLine: "مرتبطون رسمياً بأكثر مطوري دبي ثقة.",
    footer: {
      about: "V5C Properties LLC هي مركز رائد للاستشارات العقارية يقدم حلولاً متخصصة منذ عام 2002.",
      quick: ["الرئيسية", "من نحن", "المطورون", "الأسئلة"],
      services: ["استشارات", "حلول متكاملة", "اتصالات B2B"],
      properties: ["فيلات فاخرة", "بنتهاوس", "قيد الإنشاء"]
    }
  }
};

// 2. Emirates Data
export const emiratesData = [
  { name: "Dubai", desc: "Global Commercial Hub" },
  { name: "Abu Dhabi", desc: "The Wealthy Capital" },
  { name: "Sharjah", desc: "Cultural & Academic Heart" },
  { name: "Ajman", desc: "The Industrial Spirit" },
  { name: "Ras Al Khaimah", desc: "Nature & Tourism Peak" },
  { name: "Fujairah", desc: "Eastern Coastal Gem" },
  { name: "Umm Al Quwain", desc: "The Ancient Port" }
];

// 3. Life in Dubai Data
export const lifeInDubaiData = [
  { title: "Luxury Living", desc: "Experience an unparalleled standard of opulence.", icon: Sparkles, img: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=800" },
  { title: "Multicultural Society", desc: "A harmonious global village.", icon: Globe, img: "https://images.unsplash.com/photo-1528702748617-c64d49f918af?q=80&w=800" },
  { title: "Education & Healthcare", desc: "Access to world-class international schools.", icon: ShieldCheck, img: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=800" },
  { title: "Safe Family Environment", desc: "Consistently ranked as one of the safest cities.", icon: UserCheck, img: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=800" },
  { title: "Global Connectivity", desc: "A strategic central hub connecting you to 2/3 of the world.", icon: Zap, img: "https://media.istockphoto.com/id/1488521147/photo/global-network-usa-united-states-of-america-north-america-global-business-flight-routes.jpg?s=612x612&w=0&k=20&c=GUHBDWeC4QNzfvpv1UHFWXMPvd2FZ-7rQD-OfG9zIsY=" },
  { title: "Nightlife & Leisure", desc: "From Michelin-star dining to vibrant beach clubs.", icon: LayoutGrid, img: "https://images.unsplash.com/photo-1518684079-3c830dcef090?q=80&w=800" }
];

// 4. Map Districts
export const mapDistricts = [
  { name: "Downtown Dubai", top: "35%", left: "42%", desc: "The heart of the city." },
  { name: "Dubai Marina", top: "52%", left: "18%", desc: "Premium waterfront living." },
  { name: "Palm Jumeirah", top: "45%", left: "12%", desc: "World-famous island luxury." },
  { name: "Business Bay", top: "38%", left: "45%", desc: "The corporate nerve center." },
  { name: "JVC", top: "60%", left: "28%", desc: "Vibrant family community." },
  { name: "Dubai Hills", top: "50%", left: "38%", desc: "The green heart of Dubai." },
  { name: "Expo City", top: "72%", left: "22%", desc: "Legacy of innovation." }
];

// 5. Services Data
export const servicesData = [
  { title: "Property Consultancy", icon: Handshake },
  { title: "Land Acquisition", icon: Map },
  { title: "Full Flat Consultancy", icon: Key },
  { title: "Design & Procurement", icon: Palette },
  { title: "Contractor & Consultant Hiring", icon: Users },
  { title: "Project Management", icon: ClipboardList },
  { title: "Legal & Documentation Support", icon: Scale },
];

// 6. Global Locations
export const locationsData = [
  { id: 1, name: "UAE", desc: "Corporate Headquarters", img: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=800" },
  { id: 2, name: "INDIA", desc: "Strategic Asian Hub", img: "https://images.unsplash.com/photo-1529253355930-ddbe423a2ac7?q=80&w=800" },
  { id: 3, name: "USA", desc: "North American Gateway", img: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?q=80&w=800" },
  { id: 4, name: "CANADA", desc: "Investment Link", img: "https://images.unsplash.com/photo-1517090504586-fde19ea6066f?q=80&w=800" },
  { id: 5, name: "ISRAEL", desc: "Global Relations", img: "https://cdn.passporthealthusa.com/wp-content/uploads/vaccines-advice-israel-img.jpg?x13202" },
];

// 7. Developer Partners (RENAMED TO MATCH APP.JSX IMPORT)
export const partnersData = [
  { name: "EMAAR", logo: emaarLogo },
  { name: "MERAAS", logo: meraasLogo },
  { name: "SOBHA", logo: sobhaLogo },
  { name: "AZIZI", logo: aziziLogo }
];
// Export as developerPartners too just in case other files use it
export const developerPartners = partnersData;

// 8. Why Dubai Data (ADDED TO FIX IMPORT ERROR)
export const whyDubaiData = [
  { title: "High ROI & Capital Growth", points: ["Strong rental yields", "Zero property tax", "Stable currency"] },
  { title: "Global Investor-Friendly", points: ["Golden Visa", "100% foreign ownership", "Transparent regulations"] },
  { title: "Safe & Stable Economy", points: ["Strong governance", "Global business hub", "World-class infrastructure"] }
];

// 9. Amenities List
export const DEFAULT_AMENITIES = [
  { id: 'water', label: 'Water Features', icon: Droplets },
  { id: 'pool', label: 'Swimming Pools', icon: Waves },
  { id: 'sport', label: 'Sport Courts', icon: Trophy },
  { id: 'kids', label: 'Kids’ play areas', icon: Baby },
  { id: 'fitness', label: 'Outdoor Fitness Stations', icon: Dumbbell },
  { id: 'community', label: 'Community Hubs', icon: Users },
  { id: 'events', label: 'Events Lawns', icon: TreePine },
  { id: 'yoga', label: 'Yoga and Exercise Lawns', icon: Flower2 },
  { id: 'seats', label: 'Sunken Seats', icon: Sofa },
  { id: 'jogging', label: 'Jogging Tracks', icon: PersonStanding },
];

// 10. Initial Property Data
export const initialPropertiesData = [
  { 
    id: 1, 
    category: "Luxury", 
    title: "City Walk Crystlane", 
    location: "Palm Jumeirah", 
    price: "AED 12.5M", 
    developer: "Kerzner", 
    img: "https://meraas.com/sites/default/files/2025-06/Top%20Gallery%201.jpg", 
    beds: 4, 
    baths: 5, 
    sqft: "4,500",
    ownerEmail: "owner1@example.com",
    dynamicOptions: {
      vision: "Luxury waterfront living with panoramic views",
      location: "Prime beachfront location with easy access to city center. 2 Mins from City Walk Mall, 10 Mins from Jumeirah Beach.",
      floorPlans: "Spacious layouts designed for modern living"
    }
  },
  { 
    id: 2, 
    category: "Off-Plan", 
    title: "Burj Binghatti", 
    location: "Business Bay", 
    price: "AED 8.2M", 
    developer: "Binghatti", 
    img: "https://images.unsplash.com/photo-1582407947304-fd86f028f716?q=80&w=1200", 
    beds: 3, 
    baths: 3, 
    sqft: "2,800",
    ownerEmail: "owner2@example.com",
    dynamicOptions: {
      vision: "Modern architectural excellence in the heart of Dubai",
      location: "Strategic business district with metro connectivity",
      floorPlans: "Optimized spaces for contemporary lifestyle"
    }
  }
];

// 11. Process Steps
export const processSteps = [
  { id: 1, title: "Understanding Goals", desc: "We analyze your investment targets and lifestyle preferences." },
  { id: 2, title: "Property Selection", desc: "Curating exclusive options that match your criteria perfectly." },
  { id: 3, title: "Secure & Handover", desc: "Managing documentation, payments, and key handover seamlessly." }
];

// 12. FAQs
export const faqs = [
  { q: "Why should I invest in Dubai real estate?", a: "Dubai offers high rental yields (5-8%), zero property tax, and a stable currency pegged to the USD." },
  { q: "Can foreigners buy property in Dubai?", a: "Yes, foreigners can buy freehold property in designated areas with 100% ownership." },
  { q: "What is the minimum investment?", a: "Prices start from as low as AED 400k for studios, but investment visas require AED 750k+." },
  { q: "What is Golden Visa eligibility?", a: "Invest AED 2M (approx $545k) in property to get a 10-year renewable Golden Visa." },
  { q: "Are off-plan properties safe?", a: "Yes, RERA regulations protect buyers by keeping funds in escrow accounts until milestones are met." },
  { q: "What ROI can I expect?", a: "Typically 5-8% net rental yield, plus potential capital appreciation of 10-20% upon completion." },
  { q: "Do you assist with documentation?", a: "Yes, we handle the entire process from SPA signing to Title Deed registration." }
];

// 13. Testimonials
export const testimonials = [
  { name: "Sarah Jenkins", country: "UK", text: "V5C made my first international investment seamless. Their market knowledge is unmatched." },
  { name: "Ahmed Al-Fayed", country: "Saudi Arabia", text: "Professional, transparent, and efficient. I secured a prime unit in Downtown thanks to them." },
  { name: "Michael Chen", country: "Singapore", text: "The Golden Visa process was handled perfectly. Highly recommend their turnkey service." }
];