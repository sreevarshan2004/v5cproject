import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Save, ArrowLeft, User, MapPin, MessageSquare } from "lucide-react";

const InputField = ({ icon: Icon, ...props }) => (
  <div className="relative group">
    <Icon className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-[#D4AF37] transition-colors" size={18} />
    <input 
      {...props}
      className="w-full bg-[#111] border border-white/10 rounded-xl py-4 pl-12 pr-4 text-white text-sm outline-none focus:border-[#D4AF37] transition-all placeholder-gray-600"
    />
  </div>
);

const AddReviewPage = () => {
  const navigate = useNavigate();
  // Ensure this matches your server port (usually 5000 based on your file structure)
  const API_BASE = "http://localhost:5000/api"; 

  const [formData, setFormData] = useState({
    name: "",
    country: "",
    text: ""
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if(!formData.name || !formData.text) return alert("Please fill in all fields");

    try {
        const response = await fetch(`${API_BASE}/testimonials`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)
        });

        if(response.ok) {
            alert("Review Submitted Successfully!");
            navigate("/"); // Go back to home page
            window.location.reload(); // Refresh to show the new review
        } else {
            alert("Failed to submit review");
        }
    } catch (error) {
        console.error(error);
        alert("Error connecting to server");
    }
  };

  return (
    <div className="min-h-screen bg-black text-white pt-32 pb-24 px-6 flex items-center justify-center relative overflow-hidden font-sans">
      
      {/* Background Decor */}
      <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-[#D4AF37]/10 rounded-full blur-[150px] pointer-events-none" />

      <div className="w-full max-w-2xl relative z-10">
        
        {/* Header */}
        <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-gray-500 hover:text-[#D4AF37] mb-8 text-xs font-black uppercase tracking-widest transition-colors">
            <ArrowLeft size={16} /> Back to Home
        </button>

        <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-[#0A0A0A] border border-white/10 p-8 md:p-12 rounded-[2.5rem] relative overflow-hidden shadow-2xl"
        >
            {/* Moving Border Top (Decorative) */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent opacity-50" />

            <div className="text-center mb-10">
                <span className="text-[#D4AF37] text-[10px] font-black uppercase tracking-[0.6em]">Feedback</span>
                <h1 className="text-3xl md:text-4xl font-black uppercase text-white mt-2">Share Your <span className="text-[#D4AF37]">Experience</span></h1>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <InputField 
                        icon={User} 
                        placeholder="Your Name" 
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                    />
                    <InputField 
                        icon={MapPin} 
                        placeholder="Country / Location" 
                        value={formData.country}
                        onChange={(e) => setFormData({...formData, country: e.target.value})}
                    />
                </div>

                <div className="relative group">
                    <MessageSquare className="absolute left-4 top-4 text-gray-500 group-focus-within:text-[#D4AF37] transition-colors" size={18} />
                    <textarea 
                        rows="5"
                        placeholder="Write your review here..." 
                        className="w-full bg-[#111] border border-white/10 rounded-xl py-4 pl-12 pr-4 text-white text-sm outline-none focus:border-[#D4AF37] transition-all placeholder-gray-600 resize-none"
                        value={formData.text}
                        onChange={(e) => setFormData({...formData, text: e.target.value})}
                    />
                </div>

                <motion.button 
                    whileHover={{ scale: 1.02, boxShadow: "0 0 20px rgba(212,175,55,0.4)" }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    className="w-full py-5 bg-[#D4AF37] text-black font-black uppercase text-xs tracking-widest rounded-xl flex items-center justify-center gap-2 mt-4 hover:bg-white transition-colors"
                >
                    <Save size={18} /> Submit Review
                </motion.button>

            </form>
        </motion.div>
      </div>
    </div>
  );
};

export default AddReviewPage;