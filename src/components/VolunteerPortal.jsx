import React, { useState, useEffect } from 'react';
import { fetchNeeds, updateStatus, fetchVolunteers } from '../utils/api';
import { MapPin, Navigation, CheckCircle, Clock, AlertTriangle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const VolunteerPortal = () => {
  const [volunteers, setVolunteers] = useState([]);
  const [activeVolunteer, setActiveVolunteer] = useState(null);
  const [myMissions, setMyMissions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    loadVolunteers();
  }, []);

  useEffect(() => {
    if (activeVolunteer) {
      loadMissions();
    }
  }, [activeVolunteer]);

  const loadVolunteers = async () => {
    try {
      const response = await fetchVolunteers();
      setVolunteers(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const loadMissions = async () => {
    setIsLoading(true);
    try {
      const response = await fetchNeeds();
      // Filter needs where this volunteer is assigned
      const assigned = response.data.filter(need => 
        need.assignedVolunteers.some(v => v._id === activeVolunteer._id) && 
        need.status !== 'Resolved'
      );
      setMyMissions(assigned);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleResolve = async (needId) => {
    try {
      await updateStatus(needId, 'Resolved');
      loadMissions();
    } catch (error) {
      console.error(error);
    }
  };

  if (!activeVolunteer) {
    return (
      <div className="max-w-2xl mx-auto p-8">
        <h2 className="text-3xl font-bold mb-6 text-center">Volunteer Login Simulation</h2>
        <p className="text-gray-400 text-center mb-10">Select a volunteer profile to enter their mission portal.</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {volunteers.map(vol => (
            <button 
              key={vol._id}
              onClick={() => setActiveVolunteer(vol)}
              className="glass-card p-6 text-left hover:border-primary/50 transition-all group"
            >
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-bold text-lg group-hover:text-primary transition-colors">{vol.name}</h3>
                  <p className="text-xs text-gray-500">{vol.skills.join(', ')}</p>
                </div>
                <div className="w-10 h-10 bg-primary/10 text-primary rounded-full flex items-center justify-center">
                  <Navigation size={20} />
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto h-full flex flex-col bg-background p-4">
      <header className="flex justify-between items-center mb-8 bg-secondary/50 p-4 rounded-2xl border border-white/5">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center font-bold">
            {activeVolunteer.name.charAt(0)}
          </div>
          <div>
            <h2 className="font-bold">{activeVolunteer.name}</h2>
            <div className="flex items-center gap-1 text-[10px] text-green-500 font-bold uppercase">
              <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
              On Duty
            </div>
          </div>
        </div>
        <button onClick={() => setActiveVolunteer(null)} className="text-xs text-gray-500 hover:text-white transition-colors">
          Switch Profile
        </button>
      </header>

      <main className="flex-1 overflow-y-auto space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-bold">Active Missions</h3>
          <span className="bg-white/5 px-3 py-1 rounded-full text-xs font-bold">{myMissions.length}</span>
        </div>

        <AnimatePresence>
          {myMissions.length > 0 ? (
            myMissions.map(mission => (
              <motion.div 
                key={mission._id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="glass-card border-l-4 border-primary p-6 relative overflow-hidden"
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="bg-primary/20 text-primary px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">
                    {mission.category} Emergency
                  </div>
                  <div className="flex items-center gap-1 text-gray-500 text-xs">
                    <Clock size={12} />
                    {new Date(mission.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </div>
                </div>

                <h4 className="text-lg font-bold mb-2">Rescue at {mission.location.address}</h4>
                <p className="text-sm text-gray-400 mb-6 line-clamp-2">{mission.description}</p>

                <div className="flex items-center gap-3 p-3 bg-white/5 rounded-xl mb-6">
                  <div className="w-8 h-8 bg-blue-500/20 text-blue-500 rounded-lg flex items-center justify-center">
                    <Navigation size={18} />
                  </div>
                  <div className="text-xs font-bold text-blue-400">Tap for GPS Directions</div>
                </div>

                <button 
                  onClick={() => handleResolve(mission._id)}
                  className="w-full py-4 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl font-bold flex items-center justify-center gap-2 transition-all shadow-lg shadow-emerald-500/20"
                >
                  <CheckCircle size={20} />
                  Complete Mission
                </button>
              </motion.div>
            ))
          ) : (
            <div className="flex flex-col items-center justify-center py-20 text-center opacity-40">
              <Shield size={48} className="mb-4" />
              <p className="text-lg font-bold">Standing By</p>
              <p className="text-xs">Waiting for next critical dispatch...</p>
            </div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
};

export default VolunteerPortal;
