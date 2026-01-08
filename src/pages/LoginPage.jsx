import React, { useState } from "react";
import { User, ShieldCheck, ArrowRight, Lock, Mail, Phone, UserCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const LoginPage = ({ onLogin }) => {
  const [activeTab, setActiveTab] = useState("user"); // 'user' or 'admin'
  
  // Form States
  const [userData, setUserData] = useState({ name: "", email: "", phone: "" });
  const [adminData, setAdminData] = useState({ username: "", password: "" });
  const [error, setError] = useState("");

  const handleUserLogin = (e) => {
    e.preventDefault();
    if (userData.name && userData.email && userData.phone) {
      onLogin({ role: "user", ...userData });
    } else {
      setError("Please fill in all fields.");
    }
  };

  const handleAdminLogin = (e) => {
    e.preventDefault();
    if (adminData.username === "admin" && adminData.password === "admin") {
      onLogin({ role: "admin", name: "Administrator" });
    } else {
      setError("Invalid Admin Credentials");
    }
  };

  // --- Animation Variants ---
  const backdropVariants = {
    animate: {
      scale: [1, 1.2, 1],
      rotate: [0, 90, 0],
      opacity: [0.3, 0.5, 0.3],
      transition: { duration: 15, repeat: Infinity, ease: "linear" }
    }
  };

  const formVariants = {
    hidden: { opacity: 0, x: 20, filter: "blur(5px)" },
    visible: { opacity: 1, x: 0, filter: "blur(0px)", transition: { duration: 0.4, ease: "easeOut" } },
    exit: { opacity: 0, x: -20, filter: "blur(5px)", transition: { duration: 0.3 } }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-6 font-sans selection:bg-[#D4AF37] selection:text-black relative overflow-hidden">
      
      {/* 1. Animated Background Ambience */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div 
          variants={backdropVariants}
          animate="animate"
          className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-[#D4AF37]/20 blur-[120px] rounded-full" 
        />
        <motion.div 
          variants={backdropVariants}
          animate="animate"
          transition={{ duration: 20, repeat: Infinity, ease: "linear", delay: 2 }}
          className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-[#D4AF37]/10 blur-[120px] rounded-full" 
        />
      </div>

      {/* 2. Main Glass Card */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.8, type: "spring" }}
        className="relative z-10 w-full max-w-md bg-[#0A0A0A]/80 backdrop-blur-xl border border-white/10 rounded-[2.5rem] p-8 md:p-10 shadow-2xl"
      >
        {/* Header */}
        <div className="text-center mb-10">
          <motion.div 
            initial={{ opacity: 0, y: -10 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ delay: 0.2 }}
            className="inline-block mb-3"
          >
            <span className="text-[#D4AF37] text-[10px] font-black uppercase tracking-[0.4em] border border-[#D4AF37]/30 px-3 py-1 rounded-full">Secure Portal</span>
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            transition={{ delay: 0.3 }}
            className="text-4xl font-black uppercase text-white tracking-tighter"
          >
            Welcome <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] to-[#FCEabb]">Back</span>
          </motion.h2>
        </div>

        {/* 3. Sliding Tabs */}
        <div className="flex bg-black/50 p-1.5 rounded-2xl mb-8 border border-white/5 relative">
          {['user', 'admin'].map((tab) => (
            <button 
              key={tab}
              onClick={() => { setActiveTab(tab); setError(""); }}
              className={`flex-1 relative z-10 flex items-center justify-center gap-2 py-3.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-colors duration-300 ${activeTab === tab ? 'text-black' : 'text-gray-500 hover:text-white'}`}
            >
              {activeTab === tab && (
                <motion.div 
                  layoutId="activeTabBg"
                  className="absolute inset-0 bg-[#D4AF37] rounded-xl shadow-[0_0_20px_rgba(212,175,55,0.4)]"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
              <span className="relative z-20 flex items-center gap-2">
                {tab === 'user' ? <User size={14} /> : <ShieldCheck size={14} />}
                {tab === 'user' ? 'Investor' : 'Admin'}
              </span>
            </button>
          ))}
        </div>

        {/* 4. Animated Forms with AnimatePresence */}
        <div className="relative min-h-[300px]">
          <AnimatePresence mode="wait">
            {activeTab === "user" ? (
              <motion.form 
                key="user-form"
                variants={formVariants}
                initial="hidden" animate="visible" exit="exit"
                onSubmit={handleUserLogin} 
                className="space-y-5"
              >
                <div className="space-y-5">
                  <InputGroup icon={<UserCircle size={18} />} type="text" placeholder="Full Name" value={userData.name} onChange={(e) => setUserData({...userData, name: e.target.value})} />
                  <InputGroup icon={<Mail size={18} />} type="email" placeholder="Gmail Address" value={userData.email} onChange={(e) => setUserData({...userData, email: e.target.value})} />
                  <InputGroup icon={<Phone size={18} />} type="tel" placeholder="Phone Number" value={userData.phone} onChange={(e) => setUserData({...userData, phone: e.target.value})} />
                </div>
                
                {error && <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-red-500 text-[10px] font-bold uppercase text-center tracking-wider">{error}</motion.p>}
                
                <SubmitButton text="Enter Dashboard" />
              </motion.form>
            ) : (
              <motion.form 
                key="admin-form"
                variants={formVariants}
                initial="hidden" animate="visible" exit="exit"
                onSubmit={handleAdminLogin} 
                className="space-y-5"
              >
                <div className="space-y-5">
                   <InputGroup icon={<ShieldCheck size={18} />} type="text" placeholder="Admin Username" value={adminData.username} onChange={(e) => setAdminData({...adminData, username: e.target.value})} />
                   <InputGroup icon={<Lock size={18} />} type="password" placeholder="Password" value={adminData.password} onChange={(e) => setAdminData({...adminData, password: e.target.value})} />
                </div>
                
                {error && <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-red-500 text-[10px] font-bold uppercase text-center tracking-wider">{error}</motion.p>}
                
                <SubmitButton text="Access Admin Panel" />
              </motion.form>
            )}
          </AnimatePresence>
        </div>

      </motion.div>
    </div>
  );
};

// --- Helper Components for Cleaner Code ---

const InputGroup = ({ type, placeholder, value, onChange, icon }) => (
  <div className="relative group">
    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-[#D4AF37] transition-colors">
      {icon}
    </div>
    <motion.input 
      whileFocus={{ scale: 1.02, borderColor: "rgba(212,175,55,0.5)" }}
      type={type} 
      placeholder={placeholder} 
      className="w-full bg-black/50 border border-white/10 rounded-xl py-4 pl-12 pr-4 text-sm text-white placeholder-gray-600 outline-none transition-all duration-300"
      value={value} 
      onChange={onChange} 
    />
  </div>
);

const SubmitButton = ({ text }) => (
  <motion.button 
    whileHover={{ scale: 1.02, boxShadow: "0 0 20px rgba(212,175,55,0.3)" }}
    whileTap={{ scale: 0.98 }}
    type="submit" 
    className="w-full bg-gradient-to-r from-[#D4AF37] to-[#FCEabb] text-black py-4 rounded-xl text-xs font-black uppercase tracking-[0.2em] flex items-center justify-center gap-3 mt-6 shadow-xl relative overflow-hidden group"
  >
    <span className="relative z-10">{text}</span>
    <ArrowRight size={16} className="relative z-10" />
    <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500 ease-out" />
  </motion.button>
);

export default LoginPage;