import React, { useState } from 'react';
import { UserPlus, MapPin, Shield, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { createVolunteer } from '../utils/api';

const VolunteerRegistration = ({ onComplete }) => {
  const [formData, setFormData] = useState({
    name: '',
    skills: '',
    address: '',
    lat: 22.7196,
    lng: 75.8577
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const payload = {
        name: formData.name,
        skills: formData.skills.split(',').map(s => s.trim()),
        location: {
          address: formData.address,
          coordinates: { lat: formData.lat, lng: formData.lng }
        }
      };
      await createVolunteer(payload);
      setIsSuccess(true);
      setTimeout(() => {
        onComplete();
      }, 2000);
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="flex flex-col items-center justify-center p-12 text-center">
        <motion.div 
          initial={{ scale: 0 }} 
          animate={{ scale: 1 }} 
          className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mb-6 shadow-lg shadow-green-500/20"
        >
          <CheckCircle size={40} className="text-white" />
        </motion.div>
        <h2 className="text-3xl font-bold mb-2">Welcome to the Force!</h2>
        <p className="text-gray-400">Your profile is live. NGOs can now assign you to critical missions.</p>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto glass-card p-8 border-white/10 relative z-10 shadow-2xl">
      <div className="flex items-center gap-3 mb-8">
        <div className="w-12 h-12 bg-primary/20 text-primary rounded-xl flex items-center justify-center">
          <UserPlus size={24} />
        </div>
        <div>
          <h2 className="text-2xl font-bold">Join GeoSmart</h2>
          <p className="text-sm text-gray-400">Become a certified crisis responder</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
        <div>
          <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Full Name</label>
          <input 
            required
            className="w-full bg-white/5 border border-white/10 rounded-xl p-3 focus:border-primary outline-none transition-all text-white"
            placeholder="John Doe"
            value={formData.name}
            onChange={(e) => setFormData({...formData, name: e.target.value})}
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Skills (comma separated)</label>
          <input 
            required
            className="w-full bg-white/5 border border-white/10 rounded-xl p-3 focus:border-primary outline-none transition-all text-white"
            placeholder="First Aid, Driving, Cooking"
            value={formData.skills}
            onChange={(e) => setFormData({...formData, skills: e.target.value})}
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Base Location (City/Area)</label>
          <div className="relative">
            <MapPin className="absolute left-3 top-3.5 text-gray-500" size={18} />
            <input 
              required
              className="w-full bg-white/5 border border-white/10 rounded-xl p-3 pl-10 focus:border-primary outline-none transition-all text-white"
              placeholder="Indore, MP"
              value={formData.address}
              onChange={(e) => setFormData({...formData, address: e.target.value})}
            />
          </div>
        </div>

        <div className="p-4 bg-primary/5 rounded-xl border border-primary/10 flex gap-3">
          <Shield className="text-primary flex-shrink-0" size={20} />
          <p className="text-[10px] text-gray-400">
            By registering, you agree to be available for emergency missions within a 10km radius of your location.
          </p>
        </div>

        <button 
          type="submit"
          disabled={isSubmitting}
          className="w-full py-4 bg-primary hover:bg-primary/90 text-white rounded-xl font-bold shadow-lg shadow-primary/20 transition-all disabled:opacity-50 relative z-20 cursor-pointer"
        >
          {isSubmitting ? 'Registering...' : 'Complete Registration'}
        </button>
      </form>
    </div>
  );
};

export default VolunteerRegistration;
