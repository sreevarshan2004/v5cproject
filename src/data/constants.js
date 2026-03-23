import {
  Sparkles, Globe, ShieldCheck, UserCheck, Zap, LayoutGrid,
  Handshake, Map, Key, Palette, Users, ClipboardList, Scale,
  Trophy, Baby, Dumbbell, TreePine, Flower2, Sofa, PersonStanding,
  Droplets, Waves
} from "lucide-react";

import emaarLogo from '../assets/EMAAR.jpg';
import meraasLogo from '../assets/merras.jpg';
import sobhaLogo from '../assets/sobha.png';
import aziziLogo from '../assets/azizi.png';

// 1. Translations
export const translations = {
  EN: {
    dir: "ltr",
    nav: ["About Us", "Properties", "Services", "Developers", "Why Dubai", "FAQ", "Contact"],
    topTag: "TRUSTED PROPERTY CONSULTANTS SINCE 2002",
    headline: "INVEST WHERE LIFESTYLE MEETS RETURN.",
    subHeadline: "FROM GOLF COURSE VIEWS TO SEA BREEZE.",
    categories: "VILLA'S | APARTMENTS | TOWNHOUSES",
    consultBtn: "Free Consultation",
    aboutTitle: "About V5C Properties",
    aboutText: "Founded on the principles of trust and expertise, we guide global investors through the dynamic Dubai Real Estate Landscape with over two decades of experience.",
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
    lifeInDubaiTitle: "Life in Dubai",
    lifeInDubai: [
      { title: "Luxury Living", desc: "Experience an unparalleled standard of opulence." },
      { title: "Multicultural Society", desc: "A harmonious global village." },
      { title: "Education & Healthcare", desc: "Access to world-class international schools." },
      { title: "Safe Family Environment", desc: "Consistently ranked as one of the safest cities." },
      { title: "Global Connectivity", desc: "A strategic central hub connecting you to 2/3 of the world." },
      { title: "Nightlife & Leisure", desc: "From Michelin-star dining to vibrant beach clubs." }
    ],
    servicesTitle: "OUR SERVICES",
    services: [
      { title: "Property Consultancy" },
      { title: "Land Acquisition" },
      { title: "Full Flat Consultancy" },
      { title: "Design & Procurement" },
      { title: "Contractor & Consultant Hiring" },
      { title: "Project Management" },
      { title: "Legal & Documentation Support" }
    ],
    emirates: [
      { name: "Dubai", desc: "Global Commercial Hub" },
      { name: "Abu Dhabi", desc: "The Wealthy Capital" },
      { name: "Sharjah", desc: "Cultural & Academic Heart" },
      { name: "Ajman", desc: "The Industrial Spirit" },
      { name: "Ras Al Khaimah", desc: "Nature & Tourism Peak" },
      { name: "Fujairah", desc: "Eastern Coastal Gem" },
      { name: "Umm Al Quwain", desc: "The Ancient Port" }
    ],
    presenceTitle: "Our Global Presence",
    propTitle: "Featured Properties",
    propFilters: ["All", "Off-Plan", "Ready", "Luxury", "Investment"],
    devPartnerLine: "TRUST IS EXCELLENCE",
    addPropTitle: "List New Property",
    addPropSubtitle: "Proprietary Management Portal",
    form: {
      title: "Register Your Interest",
      subtitle: "Get expert advice on Dubai Real Estate opportunities.",
      firstName: "First Name *",
      lastName: "Last Name *",
      city: "City *",
      country: "Country *",
      mobile: "Mobile *",
      email: "Email Address *",
      reference: "Reference Name (Optional)",
      message: "Message (Max 100 words) *",
      source: "How did you hear about us? *",
      send: "Send Registration",
      sources: ["Friend", "Family", "Social Media", "Others"]
    },
    footer: {
      about: "V5C Properties LLC is a premier real estate consultancy hub providing specialized developer-led solutions since 2002.",
      quickHeading: "Quick Links",
      quick: ["Home", "About Us", "Properties", "Developers", "Why Dubai", "Emirates", "Sobha Central"],
      companyHeading: "Company",
      services: ["Our Services", "Working Process", "FAQ", "Testimonials", "Contact"],
      properties: ["Luxury Villas", "Penthouses", "Off-Plan"]
    },
    testimonialsTitle: "Trusted By Investors",
    testimonials: [
      { name: "Sarah Jenkins", country: "UK", text: "V5C made my first international investment seamless. Their market knowledge is unmatched." },
      { name: "Ahmed Al-Fayed", country: "Saudi Arabia", text: "Professional, transparent, and efficient. I secured a prime unit in Downtown thanks to them." },
      { name: "Michael Chen", country: "Singapore", text: "The Golden Visa process was handled perfectly. Highly recommend their turnkey service." }
    ],
    processTitle: "Working Process",
    processSteps: [
      { title: "Understanding Goals", desc: "We analyze your investment targets and lifestyle preferences." },
      { title: "Property Selection", desc: "Curating exclusive options that match your criteria perfectly." },
      { title: "Secure & Handover", desc: "Managing documentation, payments, and key handover seamlessly." }
    ],
    newsletterTitle1: "Subscribe to our",
    newsletterTitle2: "Weekly Newsletter",
    newsletterDesc: "Get exclusive property insights and market updates delivered to your inbox.",
    newsletterBtn: "Subscribe",
    newsletterPlaceholder: "Enter your email address",
    faqTitle: "FREQUENTLY ASKED QUESTIONS",
    faqDesc: "Everything you need to know about investing in Dubai real estate and the V5C turnkey methodology.",
    viewAllBtn: "View All FAQ's",
    faqs: [
      { q: "What makes V5C Properties different from other real estate agencies in Dubai?", a: "V5C Properties combines deep local market knowledge with a personalised, research-driven approach. Whether you're buying, selling, renting, or investing, we focus on delivering the best possible outcome through transparent advice, strong negotiation, and end-to-end support." },
      { q: "How experienced is the V5C Properties team?", a: "V5C Properties has been part of Dubai's real estate journey since 2005, witnessing the city's skyline evolve while actively dealing in both commercial and residential properties across key developments." },
      { q: "What real estate services does V5C Properties offer?", a: "We offer end-to-end real estate and project solutions, including:\n• Property consultancy\n• Land acquisition\n• Full flat consultancy\n• Design and procurement\n• Contractor and consultant hiring\n• Project management\n• Legal and documentation support" },
      { q: "How does V5C Properties support investors?", a: "We help investors identify high-yield rental assets, off-plan opportunities, and capital-growth-driven properties." },
      { q: "What kind of client experience can I expect?", a: "A seamless and well-managed journey. From your first consultation to final handover, we guide you through every step with clarity and precision, offering transparent advisory on selecting the right property in strategic locations to ensure true value for your investment—while safeguarding your interests throughout." },
      { q: "Why should I invest in Dubai real estate?", a: "Dubai combines transparent governance, strong rental returns, and consistent capital appreciation within one of the safest investment environments in the world. Backed by world-class infrastructure, sustained population growth, and strong global investor confidence, the city continues to stand out as a resilient and compelling long-term real estate market." },
      { q: "Can foreigners buy property in Dubai?", a: "Yes. Foreign nationals can purchase freehold properties with 100% ownership in designated areas across Dubai, with full rights to rent and sell." },
      { q: "What is the minimum investment required?", a: "Property investments in Dubai start from approximately USD 115,000, making it an accessible entry point for investors seeking exposure to one of the world's most dynamic real estate markets." },
      { q: "What is Golden Visa eligibility through property investment?", a: "An investment of AED 2 million or more offers key benefits, including no property tax, no income tax, and long-term UAE Golden Visa residency for you and your family." },
      { q: "Are off-plan properties safe in Dubai?", a: "Yes. All off-plan projects are regulated by RERA (Real Estate Regulatory Agency), and buyer funds are secured in government-regulated escrow accounts. Payments are released to developers only upon completion of approved construction milestones." },
      { q: "What return on investment (ROI) can I expect?", a: "Dubai offers rental yields averaging between 7% and 10%, significantly outperforming global cities such as London, New York, and Singapore, where yields typically range between 2% and 4%." },
      { q: "Which Dubai communities does V5C Properties cover?", a: "We operate across Dubai's prime and emerging communities, including Downtown Dubai, Dubai Marina, Business Bay, Palm Jumeirah, Dubai Hills Estate, JVC, Emaar master developments, and key growth corridors." },
      { q: "Do you provide market insights and investment guidance?", a: "Yes. We regularly share market updates, pricing trends, ROI data, and strategic insights to help clients make informed, data-backed real estate decisions." },
      { q: "Do you offer free consultations?", a: "Yes. All consultations are handled exclusively via email at contact@v5cproperties.com, and our team will get back to you within 24–48 hours to assist you further." },
      { q: "Do you assist with off-plan properties and new developments?", a: "Absolutely. We work closely with leading UAE developers to provide early access to new launches, competitive pricing, flexible payment plans, and expert off-plan guidance." },
      { q: "Do you assist with documentation procedures?", a: "Yes. We provide end-to-end support throughout the transaction journey, assisting you at every stage—from SPA coordination and regulatory formalities to Dubai Land Department processes and final handover—ensuring a smooth, compliant, and hassle-free experience." }
    ],
    locationIntelTitle: "Location Intelligence",
    locationIntelDesc: "Explore Dubai's most sought-after districts and discover investment opportunities",
    districts: [
      { id: 0, name: "DUBAI MARINA", description: "Premium waterfront living and high-rises.", features: ["High Rental Yields", "Waterfront Living", "Global Connectivity", "Luxury Amenities"], stat: "8.5%", statLabel: "Avg. ROI", coordinates: { lat: 25.0805, lng: 55.1403 } },
      { id: 1, name: "PALM JUMEIRAH", description: "World-famous island luxury destination.", features: ["Iconic Location", "Beach Access", "5-Star Hotels", "Exclusive Villas"], stat: "7.8%", statLabel: "Avg. ROI", coordinates: { lat: 25.1124, lng: 55.1390 } },
      { id: 2, name: "EXPO CITY", description: "Legacy of innovation and future development hub.", features: ["Future Growth", "Innovation Hub", "Smart City", "Investment Hotspot"], stat: "9.2%", statLabel: "Avg. ROI", coordinates: { lat: 24.9622, lng: 55.1542 } },
      { id: 3, name: "JVC", description: "Vibrant family community with high yields.", features: ["Family Friendly", "Affordable Luxury", "High Yields", "Growing Community"], stat: "8.9%", statLabel: "Avg. ROI", coordinates: { lat: 25.0450, lng: 55.2062 } },
      { id: 4, name: "DUBAI HILLS", description: "The green heart of Dubai with elite estates.", features: ["Golf Course", "Green Spaces", "Elite Estates", "Premium Living"], stat: "7.5%", statLabel: "Avg. ROI", coordinates: { lat: 25.1118, lng: 55.2536 } },
      { id: 5, name: "DOWNTOWN DUBAI", description: "The heart of the city, home to Burj Khalifa.", features: ["Burj Khalifa", "Dubai Mall", "Prime Location", "Luxury Living"], stat: "7.2%", statLabel: "Avg. ROI", coordinates: { lat: 25.1972, lng: 55.2744 } },
      { id: 6, name: "BUSINESS BAY", description: "The corporate and professional nerve center.", features: ["Business Hub", "High Demand", "Canal Views", "Modern Towers"], stat: "8.1%", statLabel: "Avg. ROI", coordinates: { lat: 25.1837, lng: 55.2666 } }
    ]
  },
  AR: {
    dir: "rtl",
    nav: ["من نحن", "العقارات", "خدماتنا", "المطورون", "لماذا دبي", "الأسئلة", "اتصل بنا"],
    topTag: "مستشارو عقارات موثوقون منذ عام 2002",
    headline: "بوابتك العالمية لاستثمارات العقارات في دبي",
    subHeadline: "الإمارات • الهند • كندا • إسرائيل • أمريكا",
    categories: "VILLA'S | APARTMENTS | TOWNHOUSES",
    consultBtn: "استشارة مجانية",
    aboutTitle: "حول V5C Properties",
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
    lifeInDubaiTitle: "الحياة في دبي",
    lifeInDubai: [
      { title: "حياة فاخرة", desc: "تجربة معيار لا مثيل له من الفخامة." },
      { title: "مجتمع متعدد الثقافات", desc: "قرية عالمية متناغمة." },
      { title: "التعليم والرعاية الصحية", desc: "الوصول إلى مدارس دولية عالمية المستوى." },
      { title: "بيئة عائلية آمنة", desc: "تُصنف باستمرار كواحدة من أكثر المدن أماناً." },
      { title: "ترابط عالمي", desc: "مركز استراتيجي يربطك بثلثي العالم." },
      { title: "الحياة الليلية والترفيه", desc: "من المطاعم الحائزة على نجمة ميشلان إلى النوادي الشاطئية النابضة بالحياة." }
    ],
    servicesTitle: "خدماتنا",
    services: [
      { title: "الاستشارات العقارية" },
      { title: "الاستحواذ على الأراضي" },
      { title: "استشارات الشقق كاملة" },
      { title: "التصميم والمشتريات" },
      { title: "توظيف المقاولين والاستشاريين" },
      { title: "إدارة المشاريع" },
      { title: "الدعم القانوني والتوثيق" }
    ],
    emirates: [
      { name: "دبي", desc: "مركز تجاري عالمي" },
      { name: "أبوظبي", desc: "العاصمة الغنية" },
      { name: "الشارقة", desc: "القلب الثقافي والأكاديمي" },
      { name: "عجمان", desc: "الروح الصناعية" },
      { name: "رأس الخيمة", desc: "قمة الطبيعة والسياحة" },
      { name: "الفجيرة", desc: "جوهرة الساحل الشرقي" },
      { name: "أم القيوين", desc: "الميناء القديم" }
    ],
    presenceTitle: "تواجدنا العالمي",
    propTitle: "عقارات مميزة",
    propFilters: ["الكل", "قيد الإنشاء", "جاهز", "فاخر", "استثمار"],
    devPartnerLine: "الثقة هي التميز",
    form: {
      title: "سجل اهتمامك",
      subtitle: "احصل على مشورة الخبراء بشأن الفرص العقارية في دبي.",
      firstName: "الاسم الأول *",
      lastName: "اسم العائلة *",
      city: "المدينة *",
      country: "البلد *",
      mobile: "رقم الهاتف *",
      email: "البريد الإلكتروني *",
      reference: "اسم المرجع (اختياري)",
      message: "الرسالة (بحد أقصى 100 كلمة) *",
      source: "كيف سمعت عنا؟ *",
      send: "إرسال التسجيل",
      sources: ["صديق", "عائلة", "وسائل التواصل الاجتماعي", "آخرون"]
    },
    footer: {
      about: "V5C Properties LLC هي مركز رائد للاستشارات العقارية يقدم حلولاً متخصصة منذ عام 2002.",
      quickHeading: "روابط سريعة",
      quick: ["الرئيسية", "من نحن", "العقارات", "المطورون", "لماذا دبي", "الإمارات", "شوبا سنترال"],
      companyHeading: "الشركة",
      services: ["خدماتنا", "عملية العمل", "الأسئلة", "التوصيات", "اتصل بنا"],
      properties: ["فيلات فاخرة", "بنتهاوس", "قيد الإنشاء"]
    },
    testimonialsTitle: "موثوق بنا من قبل المستثمرين",
    testimonials: [
      { name: "سارة جينكينز", country: "المملكة المتحدة", text: "جعلت V5C أول استثمار دولي لي أمراً سهلاً. معرفتهم بالسوق لا مثيل لها." },
      { name: "أحمد الفايد", country: "المملكة العربية السعودية", text: "محترفون وشفافون وفعالون. حصلت على وحدة مميزة في داون تاون بفضلهم." },
      { name: "مايكل تشن", country: "سنغافورة", text: "تمت معالجة عملية التأشيرة الذهبية بشكل مثالي. أوصي بشدة بخدماتهم المتكاملة." }
    ],
    processTitle: "عملية العمل",
    processSteps: [
      { title: "فهم الأهداف", desc: "نحلل أهدافك الاستثمارية وتفضيلات نمط الحياة." },
      { title: "اختيار العقار", desc: "تنسيق خيارات حصرية تتناسب مع معاييرك تماماً." },
      { title: "التأمين والتسليم", desc: "إدارة الوثائق والمدفوعات وتسليم المفاتيح بسلاسة." }
    ],
    newsletterTitle1: "اشترك في",
    newsletterTitle2: "نشرتنا الأسبوعية",
    newsletterDesc: "احصل على رؤى حصرية للعقارات وتحديثات السوق التي يتم تسليمها إلى صندوق الوارد الخاص بك.",
    newsletterBtn: "اشتراك",
    newsletterPlaceholder: "أدخل عنوان بريدك الإلكتروني",
    faqTitle: "الأسئلة الشائعة",
    faqDesc: "كل ما تحتاج إلى معرفته حول الاستثمار في العقارات بمشروع دبي ومنهجية V5C المتكاملة.",
    viewAllBtn: "عرض كل الأسئلة",
    faqs: [
      { q: "ما الذي يميز V5C Properties؟", a: "تجمع V5C Properties بين المعرفة العميقة بالسوق المحلية والنهج الشخصي القائم على الأبحاث. سواء كنت تشتري أو تبيع أو تستأجر أو تستثمر، فإننا نركز على تحقيق أفضل نتيجة ممكنة من خلال نصيحة شفافة وتفاوض قوي ودعم شامل." },
      { q: "ما مدى خبرة فريق V5C Properties؟", a: "كانت V5C Properties جزءاً من رحلة العقارات في دبي منذ عام 2005، حيث شهدت تطور أفق المدينة أثناء التعامل بنشاط في العقارات التجارية والسكنية عبر المشاريع الرئيسية." },
      { q: "ما هي الخدمات العقارية التي تقدمها V5C Properties؟", a: "نقدم حلولاً عقارية ومشاريع متكاملة، تشمل: الاستشارات العقارية، الاستحواذ على الأراضي، استشارات الشقق الكاملة، التصميم والمشتريات، إدارة المشاريع، والدعم القانوني." },
      { q: "لماذا يجب علي الاستثمار في عقارات دبي؟", a: "تجمع دبي بين الحوكمة الشفافة والعوائد الإيجارية القوية والزيادة المستمرة في قيمة رأس المال ضمن واحدة من أكثر بيئات الاستثمار أماناً في العالم." }
    ],
    locationIntelTitle: "ذكاء الموقع",
    locationIntelDesc: "استكشف أكثر المناطق طلباً في دبي واكتشف فرص الاستثمار",
    districts: [
      { id: 0, name: "دبي مارينا", description: "حياة واجهة بحرية فاخرة وأبراج شاهقة.", features: ["عائدات إيجار عالية", "حياة الواجهة البحرية", "اتصال عالمي"], stat: "8.5%", statLabel: "متوسط العائد", coordinates: { lat: 25.0805, lng: 55.1403 } },
      { id: 1, name: "نخلة جميرا", description: "وجهة فاخرة عالمية المستوى.", features: ["موقع أيقوني", "وصول للشاطئ", "فنادق 5 نجوم"], stat: "7.8%", statLabel: "متوسط العائد", coordinates: { lat: 25.1124, lng: 55.1390 } },
      { id: 5, name: "وسط مدينة دبي", description: "قلب المدينة، موطن برج خليفة.", features: ["برج خليفة", "دبي مول", "موقع متميز"], stat: "7.2%", statLabel: "متوسط العائد", coordinates: { lat: 25.1972, lng: 55.2744 } }
    ]
  },
  RU: {
    dir: "ltr",
    nav: ["О нас", "Недвижимость", "Услуги", "Застройщики", "Почему Дубай", "FAQ", "Контакты"],
    topTag: "Надежные консультанты по недвижимости с 2002 года",
    headline: "Ваш глобальный путь к\nинвестициям в недвижимость Дубая",
    subHeadline: "ОАЭ • Индия • Канада • Израиль • США",
    categories: "VILLA'S | APARTMENTS | TOWNHOUSES",
    consultBtn: "Бесплатная консультация",
    aboutTitle: "О V5C Properties",
    aboutText: "Основанная на принципах доверия и экспертизы, мы направляем глобальных инвесторов через динамичный ландшафт недвижимости Дубая с более чем двадцатилетним опытом.",
    emiratesTitle: "Объединенные Арабские Эмираты",
    emiratesHeading: "О Дубае и семи эмиратах",
    emiratesMainContent: "Дубай является ведущим мировым финансовым центром и центром образа жизни, служащим главными воротами между Востоком и Западом.",
    mapTitle: "Карта расположения Дубая",
    mapCaption: "Стратегические локации, обеспечивающие ценность и превосходство образа жизни.",
    whyTitle: "Почему недвижимость в Дубае",
    whyCards: [
      { title: "Высокая рентабельность и рост капитала", points: ["Высокая доходность от аренды", "Нулевой налог на недвижимость", "Стабильная валюта"] },
      { title: "Дружелюбен к глобальным инвесторам", points: ["Золотая виза", "100% иностранное владение", "Прозрачные правила"] },
      { title: "Безопасная и стабильная экономика", points: ["Сильное управление", "Глобальный бизнес-центр", "Инфраструктура мирового класса"] }
    ],
    lifeInDubaiTitle: "Жизнь в Дубае",
    lifeInDubai: [
      { title: "Роскошная жизнь", desc: "Стандарт непревзойденного великолепия." },
      { title: "Мультикультурное общество", desc: "Гармоничная глобальная деревня." },
      { title: "Образование и медицина", desc: "Доступ к международным школам." },
      { title: "Безопасная семейная среда", desc: "Один из самых безопасных городов." },
      { title: "Глобальная доступность", desc: "Стратегический хаб, соединяющий мир." },
      { title: "Ночная жизнь и досуг", desc: "От ресторанов Мишлен до пляжных клубов." }
    ],
    servicesTitle: "НАШИ УСЛУГИ",
    services: [
      { title: "Консультации по недвижимости" },
      { title: "Приобретение земли" },
      { title: "Консультации по квартирам" },
      { title: "Дизайн и закупки" },
      { title: "Наем подрядчиков и консультантов" },
      { title: "Управление проектами" },
      { title: "Юридическая и документальная поддержка" }
    ],
    emirates: [
      { name: "Дубай", desc: "Глобальный коммерческий центр" },
      { name: "Абу-Даби", desc: "Богатая столица" },
      { name: "Шарджа", desc: "Культурное и академическое сердце" },
      { name: "Аджман", desc: "Индустриальный дух" },
      { name: "Рас-эль-Хайма", desc: "Природа и туризм" },
      { name: "Фуджейра", desc: "Восточная прибрежная жемчужина" },
      { name: "Умм-эль-Кувейн", desc: "Древний порт" }
    ],
    presenceTitle: "Наше глобальное присутствие",
    propTitle: "Избранная недвижимость",
    propFilters: ["Все", "На стадии строительства", "Готовая", "Люкс", "Инвестиции"],
    devPartnerLine: "TRUST IS EXCELLENCE",
    form: {
      title: "Регистрация интереса",
      subtitle: "Получите экспертную консультацию по недвижимости в Дубае.",
      firstName: "Имя *",
      lastName: "Фамилия *",
      city: "Город *",
      country: "Страна *",
      mobile: "Мобильный *",
      email: "Электронная почта *",
      reference: "Имя по рекомендации (необязательно)",
      message: "Сообщение (макс. 100 слов) *",
      source: "Как вы о нас узнали? *",
      send: "Отправить регистрацию",
      sources: ["Друг", "Семья", "Социальные сети", "Другое"]
    },
    footer: {
      about: "V5C Properties LLC - ведущий консалтинговый центр недвижимости, предоставляющий специализированные решения с 2002 года.",
      quickHeading: "Ссылки",
      quick: ["Главная", "О нас", "Недвижимость", "Застройщики", "Почему Дубай", "Эмираты", "Собха Сентрал"],
      companyHeading: "Компания",
      services: ["Наши услуги", "Процесс", "FAQ", "Отзывы", "Контакты"],
      properties: ["Роскошные виллы", "Пентхаусы", "На стадии строительства"]
    },
    testimonialsTitle: "Нам доверяют инвесторы",
    testimonials: [
      { name: "Сара Дженкинс", country: "Великобритания", text: "V5C сделала мои первые международные инвестиции легкими. Их знание рынка не имеет себе равных." },
      { name: "Ахмед Аль-Файед", country: "Саудовская Аравия", text: "Профессионально, прозрачно и эффективно. Благодаря им я приобрел отличный объект в Даунтауне." },
      { name: "Майкл Чен", country: "Сингапур", text: "Процесс получения Золотой визы прошел идеально. Очень рекомендую их услуги «под ключ»." }
    ],
    processTitle: "Рабочий процесс",
    processSteps: [
      { title: "Понимание целей", desc: "Мы анализируем ваши инвестиционные цели и предпочтения в образе жизни." },
      { title: "Подбор недвижимости", desc: "Курирование эксклюзивных вариантов, идеально соответствующих вашим критериям." },
      { title: "Оформление и передача", desc: "Беспрепятственное управление документацией, платежами и передачей ключей." }
    ],
    newsletterTitle1: "Подпишитесь на нашу",
    newsletterTitle2: "Еженедельную рассылку",
    newsletterDesc: "Получайте эксклюзивные сведения о недвижимости и обновления рынка на свою почту.",
    newsletterBtn: "Подписаться",
    newsletterPlaceholder: "Введите ваш адрес электронной почты",
    faqTitle: "ЧАСТО ЗАДАВАЕМЫЕ ВОПРОСЫ",
    faqDesc: "Все, что вам нужно знать об инвестициях в недвижимость Дубая и комплексной методике V5C.",
    viewAllBtn: "Посмотреть все вопросы",
    faqs: [
      { q: "Что отличает V5C Properties?", a: "V5C Properties сочетает глубокое знание местного рынка с персонализированным подходом. Мы фокусируемся на достижении наилучшего результата через прозрачные консультации и поддержку." },
      { q: "Насколько опытен коллектив V5C Properties?", a: "Мы работаем на рынке Дубая с 2005 года, сопровождая развитие города и участвуя в ключевых проектах жилой и коммерческой недвижимости." },
      { q: "Почему стоит инвестировать в Дубай?", a: "Дубай предлагает прозрачное управление, высокую доходность от аренды и стабильный рост капитала в одной из самых безопасных сред мира." }
    ],
    locationIntelTitle: "Интеллект локаций",
    locationIntelDesc: "Изучите самые востребованные районы Дубая и откройте инвестиционные возможности",
    districts: [
      { id: 0, name: "ДУБАЙ МАРИНА", description: "Премиальная жизнь у воды и небоскребы.", features: ["Высокая доходность", "Жизнь у моря", "Глобальная сеть"], stat: "8.5%", statLabel: "Средний ROI", coordinates: { lat: 25.0805, lng: 55.1403 } },
      { id: 1, name: "ПАЛЬМА ДЖУМЕЙРА", description: "Всемирно известный остров роскоши.", features: ["Иконическая локация", "Пляжный доступ", "5-звездочные отели"], stat: "7.8%", statLabel: "Средний ROI", coordinates: { lat: 25.1124, lng: 55.1390 } },
      { id: 5, name: "ДАУНТАУН ДУБАЙ", description: "Сердце города, дом Бурдж-Халифа.", features: ["Бурдж-Халифа", "Дубай Молл", "Премиум локация"], stat: "7.2%", statLabel: "Средний ROI", coordinates: { lat: 25.1972, lng: 55.2744 } }
    ]
  },
  ES: {
    dir: "ltr",
    nav: ["Sobre Nosotros", "Propiedades", "Servicios", "Desarrolladores", "Por qué Dubái", "FAQ", "Contacto"],
    topTag: "Consultores inmobiliarios de confianza desde 2002",
    headline: "Su puerta de entrada global a\ninversiones inmobiliarias en Dubái",
    subHeadline: "EAU • India • Canadá • Estatuas Unidos • Israel",
    categories: "VILLA'S | APARTMENTS | TOWNHOUSES",
    consultBtn: "Consulta gratuita",
    aboutTitle: "Sobre V5C Properties",
    aboutText: "Fundada en los principios de confianza y experiencia, guiamos a inversores globales a través del dinámico panorama inmobiliario de Dubái con más de dos décadas de experiencia.",
    emiratesTitle: "Emiratos Árabes Unidos",
    emiratesHeading: "Sobre Dubái y los siete emiratos",
    emiratesMainContent: "Dubái se erige como un centro financiero y de estilo de vida global líder, sirviendo como la puerta de entrada definitiva entre Oriente y Occidente.",
    mapTitle: "Mapa de ubicación de Dubái",
    mapCaption: "Ubicaciones estratégicas que impulsan el valor y la excelencia en el estilo de vida.",
    whyTitle: "Por qué propiedades en Dubái",
    whyCards: [
      { title: "Alto ROI y crecimiento de capital", points: ["Fuertes rendimientos de alquiler", "Cero impuesto a la propiedad", "Moneda estable"] },
      { title: "Amigable con inversores globales", points: ["Visa dorada", "100% propiedad extranjera", "Regulaciones transparentes"] },
      { title: "Economía segura y estable", points: ["Gobernanza sólida", "Centro de negocios global", "Infraestructura de clase mundial"] }
    ],
    lifeInDubaiTitle: "Vida en Dubái",
    lifeInDubai: [
      { title: "Vida de lujo", desc: "Experimente un estándar de opulencia sin precedentes." },
      { title: "Sociedad multicultural", desc: "Una aldea global armoniosa." },
      { title: "Educación y Salud", desc: "Acceso a escuelas internacionales de clase mundial." },
      { title: "Ambiente familiar seguro", desc: "Consistente el ranking de una de las ciudades más seguras." },
      { title: "Conectividad global", desc: "Un centro estratégico que le conecta con 2/3 del mundo." },
      { title: "Vida nocturna y ocio", desc: "Desde cenas con estrellas Michelin hasta vibrantes clubes de playa." }
    ],
    servicesTitle: "NUESTROS SERVICIOS",
    services: [
      { title: "Consultoría inmobiliaria" },
      { title: "Adquisición de tierras" },
      { title: "Consultoría integral de apartamentos" },
      { title: "Diseño y adquisiciones" },
      { title: "Contratación de contratistas y consultores" },
      { title: "Gestión de proyectos" },
      { title: "Soporte legal y documentación" }
    ],
    emirates: [
      { name: "Dubái", desc: "Centro comercial global" },
      { name: "Abu Dabi", desc: "La capital rica" },
      { name: "Sharjah", desc: "Corazón cultural y académico" },
      { name: "Ajmán", desc: "El espíritu industrial" },
      { name: "Ras Al Khaimah", desc: "Cima de la naturaleza y el turismo" },
      { name: "Fujairah", desc: "Gema costera oriental" },
      { name: "Umm Al Quwain", desc: "El puerto antiguo" }
    ],
    presenceTitle: "Nuestra presencia global",
    propTitle: "Propiedades destacadas",
    propFilters: ["Todas", "En plano", "Listas", "Lujo", "Inversión"],
    devPartnerLine: "TRUST IS EXCELLENCE",
    form: {
      title: "Registrar su interés",
      subtitle: "Obtenga asesoramiento experto sobre oportunidades inmobiliarias en Dubái.",
      firstName: "Nombre *",
      lastName: "Apellido *",
      city: "Ciudad *",
      country: "País *",
      mobile: "Móvil *",
      email: "Correo electrónico *",
      reference: "Nombre de referencia (Opcional)",
      message: "Mensaje (Máx. 100 palabras) *",
      source: "¿Cómo se enteró de nosotros? *",
      send: "Enviar registro",
      sources: ["Amigo", "Familia", "Redes Sociales", "Otros"]
    },
    footer: {
      about: "V5C Properties LLC es un centro de consultoría inmobiliaria líder que proporciona soluciones especializadas desde 2002.",
      quickHeading: "Vínculos rápidos",
      quick: ["Inicio", "Sobre Nosotros", "Propiedades", "Desarrolladores", "Por qué Dubái", "Emiratos", "Sobha Central"],
      companyHeading: "Compañía",
      services: ["Servicios", "Proceso", "FAQ", "Testimonios", "Contacto"],
      properties: ["Villas de lujo", "Áticos", "En plano"]
    },
    testimonialsTitle: "Confianza de los inversores",
    testimonials: [
      { name: "Sarah Jenkins", country: "Reino Unido", text: "V5C hizo que mi primera inversión internacional fuera impecable. Su conocimiento del mercado es inigualable." },
      { name: "Ahmed Al-Fayed", country: "Arabia Saudita", text: "Profesional, transparente y eficiente. Gracias a ellos conseguí una unidad de primera en Downtown." },
      { name: "Michael Chen", country: "Singapur", text: "El proceso de la Visa Dorada se manejó perfectamente. Recomiendo mucho su servicio integral." }
    ],
    processTitle: "Proceso de Trabajo",
    processSteps: [
      { title: "Comprensión de objetivos", desc: "Analizamos sus objetivos de inversión y preferencias de estilo de vida." },
      { title: "Selección de propiedad", desc: "Curando opciones exclusivas que se ajustan perfectamente a sus criterios." },
      { title: "Aseguramiento y entrega", desc: "Gestión de documentación, pagos y entrega de llaves sin problemas." }
    ],
    newsletterTitle1: "Suscríbase a nuestro",
    newsletterTitle2: "Boletín Semanal",
    newsletterDesc: "Reciba información exclusiva sobre propiedades y actualizaciones del mercado en su bandeja de entrada.",
    newsletterBtn: "Suscribirse",
    newsletterPlaceholder: "Ingrese su dirección de correo electrónico",
    faqTitle: "PREGUNTAS FRECUENTES",
    faqDesc: "Todo lo que necesita saber sobre la inversión en bienes raíces en Dubái y la metodología integral de V5C.",
    viewAllBtn: "Ver todas las FAQ's",
    faqs: [
      { q: "¿Qué hace diferente a V5C Properties?", a: "V5C Properties combina un profundo conocimiento del mercado local con un enfoque personalizado. Nos centramos en ofrecer el mejor resultado posible." },
      { q: "¿Qué servicios ofrece V5C Properties?", a: "Ofrecemos soluciones integrales: consultoría, adquisición de tierras, gestión de proyectos y soporte legal." },
      { q: "¿Por qué invertir en Dubái?", a: "Dubái combina una gobernanza transparente, fuertes rendimientos de alquiler y una apreciación constante del capital." }
    ],
    locationIntelTitle: "Inteligencia de Ubicación",
    locationIntelDesc: "Explore los distritos más buscados de Dubái y descubra oportunidades de inversión",
    districts: [
      { id: 0, name: "DUBAI MARINA", description: "Vida premium frente al mar y rascacielos.", features: ["Altos rendimientos", "Vida costera", "Conectividad"], stat: "8.5%", statLabel: "ROI Promedio", coordinates: { lat: 25.0805, lng: 55.1403 } },
      { id: 1, name: "PALM JUMEIRAH", description: "Destino de lujo en una isla famosa mundialmente.", features: ["Ubicación icónica", "Acceso a playa", "Hoteles 5 estrellas"], stat: "7.8%", statLabel: "ROI Promedio", coordinates: { lat: 25.1124, lng: 55.1390 } },
      { id: 5, name: "DOWNTOWN DUBAI", description: "El corazón de la ciudad, hogar del Burj Khalifa.", features: ["Burj Khalifa", "Dubai Mall", "Ubicación Prime"], stat: "7.2%", statLabel: "ROI Promedio", coordinates: { lat: 25.1972, lng: 55.2744 } }
    ]
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
  {
    name: "Downtown Dubai",
    lat: 25.1972,
    lng: 55.2744,
    desc: "The center of now. Home to Burj Khalifa, Dubai Mall, and the dancing fountains.",
  },
  {
    name: "Dubai Marina",
    lat: 25.0805,
    lng: 55.1403,
    desc: "Luxury waterfront living with a stunning skyline and a vibrant promenade.",
  },
  {
    name: "Palm Jumeirah",
    lat: 25.1124,
    lng: 55.1390,
    desc: "The world-famous artificial archipelago offering exclusive beachfront villas.",
  },
  {
    name: "Business Bay",
    lat: 25.1837,
    lng: 55.2666,
    desc: "The central business district of Dubai, featuring the Dubai Water Canal.",
  },
  {
    name: "Dubai Hills Estate",
    lat: 25.1118,
    lng: 55.2536,
    desc: "A green heart of Dubai, featuring an 18-hole championship golf course.",
  },
  {
    name: "Jumeirah Beach Residence",
    lat: 25.0776,
    lng: 55.1328,
    desc: "A waterfront community located against the Persian Gulf in Dubai Marina.",
  },
  {
    name: "Creek Harbour",
    lat: 25.1950,
    lng: 55.3526,
    desc: "The future of Dubai. A sustainable waterfront community with Creek Tower.",
  }
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

// 7. Developer Partners
export const partnersData = [
  { name: "EMAAR", logo: emaarLogo },
  { name: "MERAAS", logo: meraasLogo },
  { name: "SOBHA", logo: sobhaLogo },
  { name: "AZIZI", logo: aziziLogo }
];
export const developerPartners = partnersData;

// 8. Why Dubai Data
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

// 11. Process Steps
export const processSteps = [
  { id: 1, title: "Understanding Goals", desc: "We analyze your investment targets and lifestyle preferences." },
  { id: 2, title: "Property Selection", desc: "Curating exclusive options that match your criteria perfectly." },
  { id: 3, title: "Secure & Handover", desc: "Managing documentation, payments, and key handover seamlessly." }
];

// 12. FAQs
export const faqs = [
  { q: "What makes V5C Properties different from other real estate agencies in Dubai?", a: "V5C Properties combines deep local market knowledge with a personalised, research-driven approach. Whether you're buying, selling, renting, or investing, we focus on delivering the best possible outcome through transparent advice, strong negotiation, and end-to-end support." },
  { q: "How experienced is the V5C Properties team?", a: "V5C Properties has been part of Dubai's real estate journey since 2005, witnessing the city's skyline evolve while actively dealing in both commercial and residential properties across key developments." },
  { q: "What real estate services does V5C Properties offer?", a: "We offer end-to-end real estate and project solutions, including:\n• Property consultancy\n• Land acquisition\n• Full flat consultancy\n• Design and procurement\n• Contractor and consultant hiring\n• Project management\n• Legal and documentation support" },
  { q: "How does V5C Properties support investors?", a: "We help investors identify high-yield rental assets, off-plan opportunities, and capital-growth-driven properties." },
  { q: "What kind of client experience can I expect?", a: "A seamless and well-managed journey. From your first consultation to final handover, we guide you through every step with clarity and precision, offering transparent advisory on selecting the right property in strategic locations to ensure true value for your investment—while safeguarding your interests throughout." },
  { q: "Why should I invest in Dubai real estate?", a: "Dubai combines transparent governance, strong rental returns, and consistent capital appreciation within one of the safest investment environments in the world. Backed by world-class infrastructure, sustained population growth, and strong global investor confidence, the city continues to stand out as a resilient and compelling long-term real estate market." },
  { q: "Can foreigners buy property in Dubai?", a: "Yes. Foreign nationals can purchase freehold properties with 100% ownership in designated areas across Dubai, with full rights to rent and sell." },
  { q: "What is the minimum investment required?", a: "Property investments in Dubai start from approximately USD 115,000, making it an accessible entry point for investors seeking exposure to one of the world's most dynamic real estate markets." },
  { q: "What is Golden Visa eligibility through property investment?", a: "An investment of AED 2 million or more offers key benefits, including no property tax, no income tax, and long-term UAE Golden Visa residency for you and your family." },
  { q: "Are off-plan properties safe in Dubai?", a: "Yes. All off-plan projects are regulated by RERA (Real Estate Regulatory Agency), and buyer funds are secured in government-regulated escrow accounts. Payments are released to developers only upon completion of approved construction milestones." },
  { q: "What return on investment (ROI) can I expect?", a: "Dubai offers rental yields averaging between 7% and 10%, significantly outperforming global cities such as London, New York, and Singapore, where yields typically range between 2% and 4%." },
  { q: "Which Dubai communities does V5C Properties cover?", a: "We operate across Dubai's prime and emerging communities, including Downtown Dubai, Dubai Marina, Business Bay, Palm Jumeirah, Dubai Hills Estate, JVC, Emaar master developments, and key growth corridors." },
  { q: "Do you provide market insights and investment guidance?", a: "Yes. We regularly share market updates, pricing trends, ROI data, and strategic insights to help clients make informed, data-backed real estate decisions." },
  { q: "Do you offer free consultations?", a: "Yes. All consultations are handled exclusively via email at contact@v5cproperties.com, and our team will get back to you within 24–48 hours to assist you further." },
  { q: "Do you assist with off-plan properties and new developments?", a: "Absolutely. We work closely with leading UAE developers to provide early access to new launches, competitive pricing, flexible payment plans, and expert off-plan guidance." },
  { q: "Do you assist with documentation procedures?", a: "Yes. We provide end-to-end support throughout the transaction journey, assisting you at every stage—from SPA coordination and regulatory formalities to Dubai Land Department processes and final handover—ensuring a smooth, compliant, and hassle-free experience." }
];

// 13. Testimonials
export const testimonials = [
  { name: "Sarah Jenkins", country: "UK", text: "V5C made my first international investment seamless. Their market knowledge is unmatched." },
  { name: "Ahmed Al-Fayed", country: "Saudi Arabia", text: "Professional, transparent, and efficient. I secured a prime unit in Downtown thanks to them." },
  { name: "Michael Chen", country: "Singapore", text: "The Golden Visa process was handled perfectly. Highly recommend their turnkey service." }
];