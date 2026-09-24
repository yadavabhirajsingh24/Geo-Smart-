import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LayoutGrid, Shield, Zap, Globe, Users, ArrowRight, MessageSquare, MapPin, Clock, Smartphone, QrCode, Heart, Activity } from 'lucide-react';
import { fetchNeeds } from '../utils/api';
import WhatsAppBot from './WhatsAppBot';

const MOCK_NEEDS = [
  { _id: '1', category: 'Medical', location: { address: 'Dharavi, Mumbai' }, description: 'Urgent need for first-aid kits and asthma inhalers. 5 people injured.' },
  { _id: '2', category: 'Food & Water', location: { address: 'Bandra West, Mumbai' }, description: '50 families stranded without clean drinking water. Need immediate drop.' },
  { _id: '3', category: 'Rescue', location: { address: 'Andheri East, Mumbai' }, description: 'Severe waterlogging. Need boats for evacuation of elderly residents.' },
  { _id: '4', category: 'Shelter', location: { address: 'Kurla, Mumbai' }, description: 'Temporary tents needed for 100 displaced individuals due to landslide.' },
];

const LandingPage = ({ onEnterDashboard }) => {
  const [liveNeeds, setLiveNeeds] = useState([]);
  const [showBot, setShowBot] = useState(false);

  useEffect(() => {
    const loadLiveFeed = async () => {
      try {
        const response = await fetchNeeds();
        if (response.data && response.data.length > 0) {
          setLiveNeeds(response.data.slice(0, 10));
        } else {
          setLiveNeeds(MOCK_NEEDS); // Fallback if DB is empty
        }
      } catch (error) {
        console.warn("API failed, using mock data for hackathon demo");
        setLiveNeeds(MOCK_NEEDS); // Fallback if API fails
      }
    };
    loadLiveFeed();
    const interval = setInterval(loadLiveFeed, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-background text-white selection:bg-primary/30 selection:text-primary overflow-x-hidden">
      {/* Hackathon Banner */}
      <div className="bg-primary/20 border-b border-primary/30 text-primary text-center py-2 text-xs font-black uppercase tracking-[0.2em] relative z-50">
        🏆 Built for Google Solution Challenge 2026 🏆
      </div>

      {/* Navbar */}
      <nav className="sticky top-0 w-full z-50 bg-background/80 backdrop-blur-xl border-b border-white/5 px-4 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <LayoutGrid size={20} className="text-white" />
            </div>
            <span className="text-xl font-bold gradient-text">GeoSmart AI</span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm font-bold text-gray-400">
            <a href="#features" className="hover:text-white transition-colors">Features</a>
            <a href="#process" className="hover:text-white transition-colors">How it Works</a>
            <a href="#impact" className="hover:text-white transition-colors">Impact</a>
            <a href="#live-feed" className="hover:text-white transition-colors">Live Feed</a>
          </div>
          <button 
            onClick={onEnterDashboard}
            className="bg-white text-black px-6 py-2 rounded-full font-black hover:bg-gray-200 transition-all shadow-lg shadow-white/10"
          >
            Launch Platform
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-24 pb-20 px-4">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-primary/10 blur-[120px] rounded-full pointer-events-none" />
        
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center relative z-10">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-bold text-primary mb-8"
            >
              <Zap size={14} className="fill-current" />
              AI-DRIVEN CRISIS RESPONSE SYSTEM
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-6xl md:text-8xl font-black mb-8 leading-tight tracking-tight"
            >
              Intelligence <br />
              <span className="gradient-text">Across India.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl text-gray-400 mb-12 max-w-2xl leading-relaxed"
            >
              The first AI-native humanitarian platform. Share crisis details via WhatsApp and watch them appear instantly on our national response map.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-col sm:flex-row items-center gap-4"
            >
              <button 
                onClick={onEnterDashboard}
                className="w-full sm:w-auto bg-primary px-8 py-4 rounded-2xl text-lg font-black flex items-center justify-center gap-3 hover:scale-105 transition-all shadow-2xl shadow-primary/30"
              >
                Enter Dashboard
                <ArrowRight size={20} />
              </button>
              <button 
                onClick={() => setShowBot(true)}
                className="w-full sm:w-auto px-8 py-4 rounded-2xl text-lg font-bold bg-[#25D366]/10 border border-[#25D366]/30 text-[#25D366] hover:bg-[#25D366]/20 transition-all flex items-center justify-center gap-3"
              >
                <MessageSquare size={20} />
                Try WhatsApp Bot
              </button>
            </motion.div>
          </div>

          <motion.div
            id="live-feed"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative"
          >
            <div className="absolute inset-0 bg-primary/20 blur-[100px] rounded-full" />
            <div className="glass-card p-6 border-white/10 relative overflow-hidden h-[500px]">
               <h3 className="text-sm font-bold text-gray-500 mb-6 flex items-center gap-2">
                 <Clock size={14} /> LIVE NATIONAL FEED
               </h3>
               <div className="space-y-4 overflow-y-auto h-[380px] pr-2 custom-scrollbar">
                 <AnimatePresence>
                   {liveNeeds.map((need, i) => (
                     <motion.div
                       initial={{ opacity: 0, x: 20 }}
                       animate={{ opacity: 1, x: 0 }}
                       transition={{ delay: i * 0.1 }}
                       key={need._id}
                       className="p-4 bg-white/5 border-l-4 border-primary rounded-xl hover:bg-white/10 transition-colors cursor-default"
                     >
                       <div className="flex justify-between items-start mb-2">
                         <span className="text-[10px] font-black uppercase text-primary tracking-widest px-2 py-1 bg-primary/10 rounded">{need.category}</span>
                         <span className="text-[10px] text-gray-400 font-bold flex items-center gap-1"><MapPin size={10}/> {need.location.address}</span>
                       </div>
                       <p className="text-sm text-gray-200 mt-3 font-medium leading-relaxed">{need.description}</p>
                     </motion.div>
                   ))}
                 </AnimatePresence>
               </div>
               <div className="absolute bottom-0 left-0 w-full p-8 bg-gradient-to-t from-background to-transparent pt-20">
                  <p className="text-xs text-center text-gray-500 font-bold uppercase tracking-widest flex items-center justify-center gap-2">
                     <Activity size={12} className="text-primary animate-pulse" /> Live updates from field
                  </p>
               </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* How It Works (Process) Section */}
      <section id="process" className="py-32 px-4 bg-white/[0.02]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-black mb-4">How GeoSmart Works</h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">From chaos to coordination in seconds.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
             <div className="hidden md:block absolute top-1/2 left-0 w-full h-1 bg-white/5 -translate-y-1/2" />
             
             <ProcessCard 
               step="01"
               icon={<MessageSquare className="text-[#25D366]" />}
               title="WhatsApp Reporting"
               desc="Victims or bystanders simply send a message with photos or audio to our WhatsApp bot. No app installation needed."
             />
             <ProcessCard 
               step="02"
               icon={<Zap className="text-primary" />}
               title="Gemini AI Analysis"
               desc="Our AI instantly parses unstructured text, extracts location, categorizes the need, and calculates an urgency score."
             />
             <ProcessCard 
               step="03"
               icon={<Users className="text-blue-400" />}
               title="Smart Dispatch"
               desc="The dashboard visualizes the crisis, and the system automatically dispatches the nearest skilled volunteers."
             />
          </div>
        </div>
      </section>

      {/* WhatsApp Integration Section */}
      <section className="py-32 px-4 border-y border-white/5">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
          <div className="order-2 md:order-1">
            <div className="inline-flex items-center gap-2 p-3 bg-[#25D366]/10 rounded-2xl mb-8 border border-[#25D366]/20">
               <Smartphone className="text-[#25D366]" size={32} />
               <div>
                  <div className="text-sm font-bold text-[#25D366]">Official WhatsApp Channel</div>
                  <div className="text-[10px] text-gray-500 uppercase tracking-widest font-black">Scan to Start Reporting</div>
               </div>
            </div>
            <h2 className="text-5xl font-black mb-8 leading-tight">Frictionless <br /> Reporting.</h2>
            <p className="text-lg text-gray-400 mb-10 leading-relaxed">
              In a crisis, every second counts. That's why we eliminated the app download. Just send a message to our AI on WhatsApp, and our platform handles the rest.
            </p>
            <div className="flex gap-6 p-6 bg-white/5 rounded-3xl border border-white/10 items-center max-w-sm">
               <div className="w-24 h-24 bg-white rounded-2xl flex items-center justify-center p-2 shadow-2xl">
                  <QrCode size={80} className="text-black" />
               </div>
               <div>
                  <div className="text-xl font-bold mb-1">Scan QR Code</div>
                  <p className="text-sm text-gray-500">Access the GeoSmart AI field bot instantly.</p>
               </div>
            </div>
          </div>
          <div className="order-1 md:order-2 flex justify-center">
            <div className="relative w-[300px] h-[600px] border-[8px] border-[#1f2937] rounded-[40px] overflow-hidden shadow-[0_0_50px_rgba(37,211,102,0.15)] bg-black">
               <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-[#1f2937] rounded-b-2xl z-20" />
               <WhatsAppBot />
            </div>
          </div>
        </div>
      </section>

      {/* Feature Grid */}
      <section id="features" className="py-32 px-4 bg-background">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl font-black mb-4">The Smart Backbone</h2>
            <p className="text-xl text-gray-400">Advanced coordination for the world's most critical moments.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard 
              icon={<Globe className="text-blue-400" />}
              title="National Heatmaps"
              desc="Real-time visualization of crisis hotspots across India using aggregated field reports and leaflet mapping."
            />
            <FeatureCard 
              icon={<Shield className="text-primary" />}
              title="Priority Scoring"
              desc="Proprietary algorithm dynamically scores and sorts crises so NGOs focus on the most severe situations first."
            />
            <FeatureCard 
              icon={<Users className="text-emerald-400" />}
              title="Volunteer Portal"
              desc="A dedicated web app for volunteers to receive missions, navigate to locations, and update statuses on the fly."
            />
          </div>
        </div>
      </section>

      {/* Impact Stats */}
      <section id="impact" className="py-24 px-4 bg-primary text-white text-center">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
           <Stat label="Simulated Reports" value="500+" />
           <Stat label="Average Response" value="< 2 mins" />
           <Stat label="Active Volunteers" value="250" />
           <Stat label="Lives Saved" value="1,240" />
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 bg-[#050505] text-center text-gray-500 text-sm">
        <div className="flex items-center justify-center gap-2 mb-4 opacity-50">
          <LayoutGrid size={24} />
          <span className="font-bold text-white text-xl">GeoSmart AI</span>
        </div>
        <p className="font-medium tracking-wide">© 2026 GeoSmart AI Platform. Built for Google Solution Challenge.</p>
      </footer>

      {/* WhatsApp Modal */}
      <AnimatePresence>
        {showBot && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/90 backdrop-blur-md"
          >
            <div className="relative w-[320px] h-[600px] border-[8px] border-[#1f2937] rounded-[40px] overflow-hidden shadow-2xl bg-black">
               <button 
                 onClick={() => setShowBot(false)}
                 className="absolute top-2 right-4 z-50 text-white font-bold bg-white/20 w-8 h-8 rounded-full flex items-center justify-center hover:bg-white/40 transition-colors"
               >
                 ×
               </button>
               <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-[#1f2937] rounded-b-2xl z-20" />
               <WhatsAppBot onNeedCreated={() => {}} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const FeatureCard = ({ icon, title, desc }) => (
  <div className="glass-card p-8 border-white/5 hover:border-primary/20 hover:-translate-y-2 transition-all duration-300 group bg-white/[0.02]">
    <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-white/10 transition-all">
      {React.cloneElement(icon, { size: 28 })}
    </div>
    <h3 className="text-2xl font-bold mb-4">{title}</h3>
    <p className="text-gray-400 leading-relaxed">{desc}</p>
  </div>
);

const ProcessCard = ({ step, icon, title, desc }) => (
  <div className="relative glass-card p-8 bg-[#0a0a0a] border-white/10 z-10 hover:-translate-y-2 transition-transform duration-300">
    <div className="absolute -top-6 -left-6 text-8xl font-black text-white/[0.03] select-none pointer-events-none">
       {step}
    </div>
    <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center mb-6">
      {icon}
    </div>
    <h3 className="text-xl font-bold mb-3">{title}</h3>
    <p className="text-sm text-gray-400 leading-relaxed">{desc}</p>
  </div>
);

const Stat = ({ label, value }) => (
  <div className="text-center">
    <div className="text-5xl font-black mb-3">{value}</div>
    <div className="text-xs font-bold uppercase tracking-[0.2em] text-white/70">{label}</div>
  </div>
);

export default LandingPage;
