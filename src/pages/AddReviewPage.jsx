import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Star, Send, ArrowLeft, User, MapPin, MessageSquare } from 'lucide-react';
import { motion } from 'framer-motion';

import { IMAGE_BASE_URL } from '../data/constanturl';

const AddReviewPage = () => {
  const navigate = useNavigate();
  const [rating, setRating] = useState(5);
  const [hoveredStar, setHoveredStar] = useState(0);
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    feedback: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // ✅ CORRECT URL FOR DATABASE
  const API_URL = `${IMAGE_BASE_URL}add-review.php`;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...formData, rating }),
      });

      if (response.ok) {
        alert('Review submitted successfully!');
        navigate('/');
        window.location.reload(); // Refresh to show the new review
      } else {
        alert('Failed to submit review. Please try again.');
      }
    } catch (error) {
      console.error('Error submitting review:', error);
      alert('Server error. Make sure your Backend is running (node app.js).');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white pt-32 pb-20 font-sans">
      <div className="container mx-auto px-6 max-w-2xl">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-400 hover:text-[#D4AF37] mb-8 transition-colors uppercase text-xs font-bold tracking-widest"
        >
          <ArrowLeft size={16} /> Back
        </button>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-[#111111] p-8 md:p-12 rounded-[2rem] border border-white/10 shadow-2xl"
        >
          <div className="text-center mb-10">
            <h1 className="text-3xl font-normal mb-2">Share Your <span className="text-[#D4AF37] font-bold">Experience</span></h1>
            <p className="text-gray-500 text-sm font-sans">Your feedback helps us provide better service.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Rating Stars */}
            <div className="flex flex-col items-center gap-4 mb-8">
              <span className="text-xs font-bold uppercase tracking-widest text-gray-500">Rate our service</span>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onMouseEnter={() => setHoveredStar(star)}
                    onMouseLeave={() => setHoveredStar(0)}
                    onClick={() => setRating(star)}
                    className="transition-transform hover:scale-110 focus:outline-none"
                  >
                    <Star
                      size={32}
                      className={`${(hoveredStar || rating) >= star ? 'fill-[#D4AF37] text-[#D4AF37]' : 'text-gray-600'} transition-colors`}
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Input Fields */}
            <div className="space-y-4">
              <div className="relative group">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-[#D4AF37] transition-colors" size={18} />
                <input
                  type="text"
                  placeholder="Your Name"
                  required
                  className="w-full bg-[#0A0A0A] border border-white/10 rounded-xl py-4 pl-12 pr-4 text-white outline-none focus:border-[#D4AF37] transition-all"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>

              <div className="relative group">
                <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-[#D4AF37] transition-colors" size={18} />
                <input
                  type="text"
                  placeholder="Location (e.g. Dubai, UK)"
                  className="w-full bg-[#0A0A0A] border border-white/10 rounded-xl py-4 pl-12 pr-4 text-white outline-none focus:border-[#D4AF37] transition-all"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                />
              </div>

              <div className="relative group">
                <MessageSquare className="absolute left-4 top-6 text-gray-500 group-focus-within:text-[#D4AF37] transition-colors" size={18} />
                <textarea
                  rows="4"
                  placeholder="Tell us about your experience..."
                  required
                  className="w-full bg-[#0A0A0A] border border-white/10 rounded-xl py-4 pl-12 pr-4 text-white outline-none focus:border-[#D4AF37] transition-all resize-none"
                  value={formData.feedback}
                  onChange={(e) => setFormData({ ...formData, feedback: e.target.value })}
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-[#D4AF37] text-black font-bold uppercase tracking-widest py-4 rounded-xl hover:bg-white transition-all shadow-lg flex items-center justify-center gap-2 mt-4"
            >
              {isSubmitting ? 'Submitting...' : <><Send size={18} /> Submit Review</>}
            </button>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default AddReviewPage;