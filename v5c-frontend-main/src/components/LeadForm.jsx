import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, X } from 'lucide-react';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';

const LeadForm = ({ onClose, content }) => {
  const t = content?.form || {
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
  };

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    city: '',
    country: '',
    mobile: '',
    email: '',
    message: '',
    referenceName: '',
    source: '',
    sourceOther: ''
  });

  const [wordCount, setWordCount] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();

    const emailBody = `
New Registration from V5C Properties Website (Hero Section)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
CONTACT INFORMATION
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

First Name: ${formData.firstName}
Last Name: ${formData.lastName}
City: ${formData.city}
Country: ${formData.country}
Mobile: ${formData.mobile}
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

  const handlePhoneChange = (value, data) => {
    setFormData({ ...formData, mobile: `+${value}` });
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, x: 20 }}
      animate={{ opacity: 1, scale: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white/95 backdrop-blur-md border border-[#D4AF37]/30 rounded-2xl p-6 md:p-8 shadow-2xl w-full max-w-[450px] relative pointer-events-auto"
    >
      {onClose && (
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-black transition-colors"
        >
          <X size={20} />
        </button>
      )}

      <div className="mb-6">
        <h3 className="text-xl font-bold text-[#0B1A2E] mb-2 uppercase tracking-tight">{t.title}</h3>
        <p className="text-gray-600 text-xs font-sans">{t.subtitle}</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-3">
        <div className="grid grid-cols-2 gap-3">
          <input
            type="text"
            name="firstName"
            placeholder={t.firstName}
            value={formData.firstName}
            onChange={handleChange}
            required
            className="w-full bg-white border border-gray-200 rounded-lg px-3 py-2 text-[#0B1A2E] placeholder-gray-400 focus:border-[#D4AF37] focus:outline-none transition-colors text-xs font-sans"
          />
          <input
            type="text"
            name="lastName"
            placeholder={t.lastName}
            value={formData.lastName}
            onChange={handleChange}
            required
            className="w-full bg-white border border-gray-200 rounded-lg px-3 py-2 text-[#0B1A2E] placeholder-gray-400 focus:border-[#D4AF37] focus:outline-none transition-colors text-xs font-sans"
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <input
            type="text"
            name="city"
            placeholder={t.city}
            value={formData.city}
            onChange={handleChange}
            required
            className="w-full bg-white border border-gray-200 rounded-lg px-3 py-2 text-[#0B1A2E] placeholder-gray-400 focus:border-[#D4AF37] focus:outline-none transition-colors text-xs font-sans"
          />
          <input
            type="text"
            name="country"
            placeholder={t.country}
            value={formData.country}
            onChange={handleChange}
            required
            className="w-full bg-white border border-gray-200 rounded-lg px-3 py-2 text-[#0B1A2E] placeholder-gray-400 focus:border-[#D4AF37] focus:outline-none transition-colors text-xs font-sans"
          />
        </div>

        <div className="grid grid-cols-1 gap-3">
          <div className="relative group phone-input-container">
            <PhoneInput
              country={'ae'}
              value={formData.mobile}
              onChange={handlePhoneChange}
              placeholder={t.mobile}
              inputProps={{
                name: 'mobile',
                required: true,
                autoFocus: false
              }}
              containerStyle={{ width: '100%' }}
              inputClass="!w-full !bg-white !border !border-gray-200 !rounded-lg !px-3 !py-2 !text-[#0B1A2E] !placeholder-gray-400 !focus:border-[#D4AF37] !focus:outline-none !transition-colors !text-xs !font-sans !h-auto !pl-14"
              buttonClass="!bg-white !border !border-gray-200 !rounded-l-lg hover:!bg-gray-50 transition-colors"
              dropdownClass="!bg-white !border !border-gray-200 !rounded-lg !shadow-xl !font-sans !text-xs"
              enableSearch={true}
              searchPlaceholder="Search country..."
            />
          </div>
        </div>

        <input
          type="email"
          name="email"
          placeholder={t.email}
          value={formData.email}
          onChange={handleChange}
          required
          className="w-full bg-white border border-gray-200 rounded-lg px-3 py-2 text-[#0B1A2E] placeholder-gray-400 focus:border-[#D4AF37] focus:outline-none transition-colors text-xs font-sans"
        />

        <input
          type="text"
          name="referenceName"
          placeholder={t.reference}
          value={formData.referenceName}
          onChange={handleChange}
          className="w-full bg-white border border-gray-200 rounded-lg px-3 py-2 text-[#0B1A2E] placeholder-gray-400 focus:border-[#D4AF37] focus:outline-none transition-colors text-xs font-sans"
        />

        <div className="relative">

          <textarea
            name="message"
            placeholder={t.message}
            value={formData.message}
            onChange={handleChange}
            rows="3"
            required
            className="w-full bg-white border border-gray-200 rounded-lg px-3 py-2 text-[#0B1A2E] placeholder-gray-400 focus:border-[#D4AF37] focus:outline-none transition-colors resize-none text-xs font-sans"
          ></textarea>
        </div>

        <select
          name="source"
          value={formData.source}
          onChange={handleChange}
          required
          className="w-full bg-white border border-gray-200 rounded-lg px-3 py-2 text-[#0B1A2E] focus:border-[#D4AF37] focus:outline-none transition-colors text-xs font-sans"
        >
          <option value="">{t.source}</option>
          {t.sources.map((src, i) => (
            <option key={i} value={src}>{src}</option>
          ))}
        </select>

        {formData.source === 'Others' && (
          <input
            type="text"
            name="sourceOther"
            placeholder="Please specify"
            value={formData.sourceOther}
            onChange={handleChange}
            required
            className="w-full bg-white border border-gray-200 rounded-lg px-3 py-2 text-[#0B1A2E] placeholder-gray-400 focus:border-[#D4AF37] focus:outline-none transition-colors text-xs font-sans"
          />
        )}

        <motion.button
          type="submit"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full bg-[#D4AF37] text-black font-bold py-2.5 px-4 rounded-lg hover:bg-[#0B1A2E] hover:text-white transition-colors flex items-center justify-center gap-2 text-xs font-sans uppercase tracking-wider mt-2 shadow-lg"
        >
          <Send size={14} />
          {t.send}
        </motion.button>
      </form>
    </motion.div>
  );
};

export default LeadForm;
