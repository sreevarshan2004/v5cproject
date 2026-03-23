import React from "react";
import { motion } from "framer-motion";
import { scaleIn, fadeInUp, staggerContainer } from "../../utils/animations";

const EmiratesSection = ({ emirates, user, content }) => {
  const emirateImages = {
    "Dubai": "https://4kwallpapers.com/images/wallpapers/burj-khalifa-dubai-cityscape-skyscrapers-dusk-clearsky-3500x2333-2157.jpg",
    "Abu Dhabi": "https://wallpaperaccess.com/full/3191698.jpg",
    "Sharjah": "https://lp-cms-production.imgix.net/2019-06/GettyImages-501869699_super.jpg?fit=crop&q=40&sharp=10&vib=20&auto=format&ixlib=react-8.6.4&quot",
    "Ajman": "https://a.travel-assets.com/findyours-php/viewfinder/images/res70/60000/60566-Ajman.jpg?impolicy=fcrop&w=1040&h=580&q=mediumHigh",
    "Ras Al Khaimah": "https://www.dubai-reisebuero.de/wp/wp-content/uploads/2017/04/waldorf-astoria-ras-al-khaimah.jpg",
    "Fujairah": "https://www.dubai-reisebuero.de/wp/wp-content/uploads/2017/05/le-meridien-al-aqah-beach-resort-1024x768.jpg",
    "Umm Al Quwain": "https://sp.yimg.com/ib/th?id=OADD2.1254542787432011_1L1XNB395MLRLHJ&pid=21.2&c=16&roil=0&roit=0&roir=1&roib=1&w=442&h=231"
  };

  return (
    <section id="emirates" className="section-bg-primary relative py-8 md:py-12 overflow-hidden">
      <div className="container mx-auto px-6 md:px-24 grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-16 items-center relative z-10">

        {/* Left Side: Content */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="space-y-10"
        >
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <motion.div initial={{ width: 0 }} whileInView={{ width: 48 }} transition={{ duration: 0.8 }} className="h-px bg-[#D4AF37]" />
              <span className="text-[#D4AF37] text-[10px] font-black uppercase tracking-[0.8em]">{content.emiratesTitle}</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-black uppercase text-theme-primary leading-snug tracking-tighter">
              {content.emiratesHeading.split('&')[0]} & <br /> <span className="text-transparent" style={{ WebkitTextStroke: '1px #D4AF37' }}>{content.emiratesHeading.split('&')[1]}</span>
            </h2>
          </div>
          <motion.p variants={fadeInUp} className="text-theme-secondary text-base md:text-lg leading-relaxed font-medium">
            {content.emiratesMainContent}
          </motion.p>
        </motion.div>

        {/* Right Side: Emirates Grid */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-2 sm:grid-cols-3 gap-4 md:gap-6"
        >
          {(content.emirates || []).map((emirate, i) => (
            <motion.div key={i} variants={scaleIn} whileHover={{ scale: 1.02 }} className="group relative rounded-[2rem] h-[190px] w-full overflow-hidden cursor-pointer">
              <div className="absolute inset-0 rounded-[2rem] z-10 overflow-hidden">
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                  style={{ backgroundImage: `url(${Object.values(emirateImages)[i]})` }}
                />
                <div className="relative z-20 h-full p-6 flex flex-col justify-between">
                  <div className="space-y-2">
                    <h3 className="text-white text-sm font-black uppercase group-hover:text-[#D4AF37] transition-colors duration-300">{emirate.name}</h3>
                  </div>
                  <p className="text-white/80 text-[9px] font-bold uppercase tracking-wider group-hover:text-white transition-colors duration-300">
                    {emirate.desc}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default EmiratesSection;