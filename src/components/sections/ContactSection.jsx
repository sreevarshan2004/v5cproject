import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, Send } from 'lucide-react';

// Custom WhatsApp Icon Component
const WhatsAppIcon = ({ size = 20, className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
  >
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
  </svg>
);

const ContactSection = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    city: '',
    country: '',
    countryCode: '+971',
    mobile: '',
    email: '',
    message: '',
    referenceName: '',
    source: '',
    sourceOther: ''
  });

  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [wordCount, setWordCount] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();

    const emailBody = `
New Registration from V5C Properties Website

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
CONTACT INFORMATION
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

First Name: ${formData.firstName}
Last Name: ${formData.lastName}
City: ${formData.city}
Country: ${formData.country}
Mobile: ${formData.countryCode} ${formData.mobile}
Email: ${formData.email}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
MESSAGE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

${formData.message}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
ADDITIONAL INFORMATION
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Reference Name: ${formData.referenceName || 'Not provided'}
Heard About Us: ${formData.source === 'Others' ? formData.sourceOther : formData.source}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Submitted: ${new Date().toLocaleString()}
    `.trim();

    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=contact@v5cproperties.com&su=${encodeURIComponent('New Registration - ' + formData.firstName + ' ' + formData.lastName)}&body=${encodeURIComponent(emailBody)}`;
    window.open(gmailUrl, '_blank');
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'message') {
      const words = value.trim().split(/\s+/).filter(word => word.length > 0);
      if (words.length <= 100) {
        setFormData({ ...formData, [name]: value });
        setWordCount(words.length);
      }
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=contact@v5cproperties.com&su=${encodeURIComponent('Newsletter Subscription')}&body=${encodeURIComponent('Please subscribe me to the V5C Properties newsletter.\\n\\nEmail: ' + newsletterEmail)}`;
    window.open(gmailUrl, '_blank');
    setNewsletterEmail('');
  };

  return (
    <section id="contact" className="py-8 md:py-12 bg-white relative overflow-hidden">
      <div className="container mx-auto px-6 md:px-24 relative z-10">

        {/* Header */}
        <div className="text-center mb-6 md:mb-8">
          <h2 className="text-4xl md:text-5xl font-black uppercase text-theme-primary leading-snug tracking-tighter font-sans">
            CONTACT <span className="text-theme-accent">V5C PROPERTIES</span>
          </h2>
          <p className="text-gray-600 text-sm mt-3 font-sans">Dubai Real Estate Consultants & UAE Property Experts</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 items-start">

          {/* Left Side - Contact Details */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <div>
              <h3 className="text-xl font-bold text-[#0B1A2E] mb-4">Let's Connect</h3>
              <p className="text-gray-600 text-sm leading-relaxed mb-6 font-sans">
                Ready to explore Dubai's premier real estate opportunities? Our expert team is here to guide you through every step of your investment journey.
              </p>
            </div>

            {/* Contact Info - All Regions */}
            <div className="space-y-6">
              {/* UAE */}
              <div>
                <h4 className="text-l font-bold text-[#0B1A2E] mb-3 uppercase font-sans">United Arab Emirates</h4>
                <div className="space-y-3 pl-4">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-[#D4AF37]/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <Phone size={16} className="text-[#D4AF37]" />
                    </div>
                    <a href="tel:+971503854097" className="text-gray-600 text-sm hover:text-[#D4AF37] transition-colors font-sans">
                      +971 (50) 385 4097
                    </a>
                  </div>
                  <div className="flex items-center gap-4">
                    <a
                      href="https://wa.me/971503854097"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 bg-[#25D366]/10 rounded-full flex items-center justify-center hover:bg-[#25D366]/20 transition-colors group flex-shrink-0"
                    >
                      <WhatsAppIcon size={16} className="text-[#25D366] group-hover:scale-110 transition-transform" />
                    </a>
                    <a
                      href="https://wa.me/971503854097"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-600 text-sm hover:text-[#25D366] transition-colors font-sans"
                    >
                      WhatsApp
                    </a>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-[#D4AF37]/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <Mail size={16} className="text-[#D4AF37]" />
                    </div>
                    <a href="mailto:contact@v5cproperties.com" className="text-gray-600 text-sm hover:text-[#D4AF37] transition-colors font-sans">
                      contact@v5cproperties.com
                    </a>
                  </div>
                </div>
              </div>

              {/* Canada & USA */}
              <div>
                <h4 className="text-l font-bold text-[#0B1A2E] mb-3 uppercase font-sans">Canada & USA</h4>
                <div className="space-y-3 pl-4">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-[#D4AF37]/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <Phone size={16} className="text-[#D4AF37]" />
                    </div>
                    <a href="tel:+971503854097" className="text-gray-600 text-sm hover:text-[#D4AF37] transition-colors font-sans">
                      +971 (50) 385 4097
                    </a>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-[#D4AF37]/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <Mail size={16} className="text-[#D4AF37]" />
                    </div>
                    <a href="mailto:contact@v5cproperties.com" className="text-gray-600 text-sm hover:text-[#D4AF37] transition-colors font-sans">
                      contact@v5cproperties.com
                    </a>
                  </div>
                </div>
              </div>

              {/* India */}
              <div>
                <h4 className="text-l font-bold text-[#0B1A2E] mb-3 uppercase font-sans">India</h4>
                <div className="space-y-3 pl-4">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-[#D4AF37]/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <Phone size={16} className="text-[#D4AF37]" />
                    </div>
                    <div className="flex flex-col gap-1">
                      <a href="tel:+919176627139" className="text-gray-600 text-sm hover:text-[#D4AF37] transition-colors font-sans">
                        +91 91766 27139
                      </a>
                      <a href="tel:+919384836698" className="text-gray-600 text-sm hover:text-[#D4AF37] transition-colors font-sans">
                        +91 93848 36698
                      </a>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-[#D4AF37]/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <Mail size={16} className="text-[#D4AF37]" />
                    </div>
                    <a href="mailto:contact@v5cproperties.com" className="text-gray-600 text-sm hover:text-[#D4AF37] transition-colors font-sans">
                      contact@v5cproperties.com
                    </a>
                  </div>
                </div>
              </div>

              {/* Israel */}
              <div>
                <h4 className="text-l font-bold text-[#0B1A2E] mb-3 uppercase font-sans">Israel</h4>
                <div className="space-y-3 pl-4">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-[#D4AF37]/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <Phone size={16} className="text-[#D4AF37]" />
                    </div>
                    <a href="tel:+972546382626" className="text-gray-600 text-sm hover:text-[#D4AF37] transition-colors font-sans">
                      +972 54-638-2626
                    </a>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-[#D4AF37]/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <Mail size={16} className="text-[#D4AF37]" />
                    </div>
                    <a href="mailto:contact@v5cproperties.com" className="text-gray-600 text-sm hover:text-[#D4AF37] transition-colors font-sans">
                      contact@v5cproperties.com
                    </a>
                  </div>
                </div>
              </div>

              {/* Office Location */}
              <div className="flex items-center gap-4 pt-4 border-t border-gray-300">
                <div className="w-10 h-10 bg-[#D4AF37]/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <MapPin size={16} className="text-[#D4AF37]" />
                </div>
                <div>
                  <p className="text-[#0B1A2E] font-bold text-sm font-sans">Headquarters</p>
                  <p className="text-gray-600 text-sm font-sans">Dubai, United Arab Emirates</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Side - Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-gray-50 border border-gray-300 rounded-2xl p-6 md:p-8"
          >
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Name Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  name="firstName"
                  placeholder="First Name *"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                  className="w-full bg-white border border-gray-300 rounded-lg px-4 py-3 text-[#0B1A2E] placeholder-gray-500 focus:border-[#D4AF37] focus:outline-none transition-colors text-sm font-sans"
                />
                <input
                  type="text"
                  name="lastName"
                  placeholder="Last Name *"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                  className="w-full bg-white border border-gray-300 rounded-lg px-4 py-3 text-[#0B1A2E] placeholder-gray-500 focus:border-[#D4AF37] focus:outline-none transition-colors text-sm font-sans"
                />
              </div>

              {/* City & Country */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  name="city"
                  placeholder="City *"
                  value={formData.city}
                  onChange={handleChange}
                  required
                  className="w-full bg-white border border-gray-300 rounded-lg px-4 py-3 text-[#0B1A2E] placeholder-gray-500 focus:border-[#D4AF37] focus:outline-none transition-colors text-sm font-sans"
                />
                <input
                  type="text"
                  name="country"
                  placeholder="Country *"
                  value={formData.country}
                  onChange={handleChange}
                  required
                  className="w-full bg-white border border-gray-300 rounded-lg px-4 py-3 text-[#0B1A2E] placeholder-gray-500 focus:border-[#D4AF37] focus:outline-none transition-colors text-sm font-sans"
                />
              </div>

              {/* Mobile with Country Code */}
              <div className="grid grid-cols-3 gap-4">
                <select
                  name="countryCode"
                  value={formData.countryCode}
                  onChange={handleChange}
                  required
                  className="w-full bg-white border border-gray-300 rounded-lg px-4 py-3 text-[#0B1A2E] focus:border-[#D4AF37] focus:outline-none transition-colors text-sm font-sans"
                >
                  <option value="+971">+971 (UAE)</option>
                  <option value="+1">+1 (US/CA)</option>
                  <option value="+91">+91 (IN)</option>
                  <option value="+44">+44 (UK)</option>
                  <option value="+61">+61 (AU)</option>
                  <option value="+966">+966 (SA)</option>
                  <option value="+974">+974 (QA)</option>
                  <option value="+965">+965 (KW)</option>
                  <option value="+968">+968 (OM)</option>
                </select>
                <input
                  type="tel"
                  name="mobile"
                  placeholder="Mobile Number *"
                  value={formData.mobile}
                  onChange={handleChange}
                  required
                  className="col-span-2 w-full bg-white border border-gray-300 rounded-lg px-4 py-3 text-[#0B1A2E] placeholder-gray-500 focus:border-[#D4AF37] focus:outline-none transition-colors text-sm font-sans"
                />
              </div>

              {/* Email */}
              <input
                type="email"
                name="email"
                placeholder="Email Address *"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full bg-white border border-gray-300 rounded-lg px-4 py-3 text-[#0B1A2E] placeholder-gray-500 focus:border-[#D4AF37] focus:outline-none transition-colors text-sm font-sans"
              />

              {/* Message with Word Count */}
              <div className="relative">
                <textarea
                  name="message"
                  placeholder="Message / Description (Max 100 words) *"
                  value={formData.message}
                  onChange={handleChange}
                  rows="4"
                  required
                  className="w-full bg-white border border-gray-300 rounded-lg px-4 py-3 text-[#0B1A2E] placeholder-gray-500 focus:border-[#D4AF37] focus:outline-none transition-colors resize-none text-sm font-sans"
                ></textarea>
                <span className={`absolute bottom-2 right-3 text-xs ${wordCount > 90 ? 'text-[#D4AF37]' : 'text-gray-500'} font-sans`}>
                  {wordCount}/100 words
                </span>
              </div>

              {/* Reference Name */}
              <input
                type="text"
                name="referenceName"
                placeholder="Reference Name (Optional)"
                value={formData.referenceName}
                onChange={handleChange}
                className="w-full bg-white border border-gray-300 rounded-lg px-4 py-3 text-[#0B1A2E] placeholder-gray-500 focus:border-[#D4AF37] focus:outline-none transition-colors text-sm font-sans"
              />

              {/* Source Selection */}
              <div>
                <select
                  name="source"
                  value={formData.source}
                  onChange={handleChange}
                  required
                  className="w-full bg-white border border-gray-300 rounded-lg px-4 py-3 text-[#0B1A2E] focus:border-[#D4AF37] focus:outline-none transition-colors text-sm font-sans"
                >
                  <option value="">From where have you heard about V5C Properties? *</option>
                  <option value="Friend">Friend</option>
                  <option value="Family">Family</option>
                  <option value="Social Media">Social Media</option>
                  <option value="Others">Others</option>
                </select>
                {formData.source === 'Others' && (
                  <input
                    type="text"
                    name="sourceOther"
                    placeholder="Please specify"
                    value={formData.sourceOther}
                    onChange={handleChange}
                    required
                    className="w-full bg-white border border-gray-300 rounded-lg px-4 py-3 text-[#0B1A2E] placeholder-gray-500 focus:border-[#D4AF37] focus:outline-none transition-colors text-sm mt-4 font-sans"
                  />
                )}
              </div>

              {/* Referral Message */}
              <div className="bg-[#D4AF37]/10 border border-[#D4AF37]/30 rounded-lg p-4 text-center">
                <p className="text-[#D4AF37] text-sm font-medium font-sans">
                  Refer V5C Properties to your family and friends, and get reward – Work with Us.
                </p>
              </div>

              {/* Submit Button */}
              <motion.button
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-[#D4AF37] text-black font-bold py-3 px-6 rounded-lg hover:bg-[#0B1A2E] hover:text-white transition-colors flex items-center justify-center gap-2 font-sans"
              >
                <Send size={18} />
                Send Registration
              </motion.button>
            </form>

            {/* Newsletter Section */}
            <div className="mt-8 pt-8 border-t border-gray-300">
              <h3 className="text-[#0B1A2E] text-sm font-bold uppercase tracking-wider mb-4 text-center font-sans">
                Subscribe to Our Newsletter
              </h3>
              <form onSubmit={handleNewsletterSubmit} className="flex gap-2">
                <input
                  type="email"
                  placeholder="Your email address"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  required
                  className="flex-1 bg-white border border-gray-300 rounded-lg px-4 py-2 text-[#0B1A2E] placeholder-gray-500 focus:border-[#D4AF37] focus:outline-none transition-colors text-sm font-sans"
                />
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-[#D4AF37] text-black font-bold py-2 px-6 rounded-lg hover:bg-[#0B1A2E] hover:text-white transition-colors text-sm font-sans"
                >
                  Submit
                </motion.button>
              </form>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default ContactSection;
