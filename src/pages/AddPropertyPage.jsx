import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const AddPropertyPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center p-6">
      <div className="text-center">
        <button 
          onClick={() => navigate(-1)} 
          className="flex items-center gap-2 text-gray-400 hover:text-[#D4AF37] mb-6 transition-colors mx-auto"
        >
          <ArrowLeft size={16} />
          <span className="font-bold uppercase text-xs tracking-widest">Back to Dashboard</span>
        </button>
        <h1 className="text-4xl font-black uppercase text-white mb-4">Add Property</h1>
        <p className="text-gray-400 font-sans">Property management page coming soon...</p>
      </div>
    </div>
  );
};

export default AddPropertyPage;
