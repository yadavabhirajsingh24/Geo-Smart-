import React, { useState } from 'react';
import { Send, Bot, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { createNeed } from '../utils/api';

const WhatsAppSimulator = ({ onNeedCreated }) => {
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState(null); // 'success' | 'error'

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    setIsLoading(true);
    setStatus(null);

    try {
      const response = await createNeed({ message });
      setStatus('success');
      setMessage('');
      if (onNeedCreated) onNeedCreated(response.data);
      
      // Clear success message after 3 seconds
      setTimeout(() => setStatus(null), 3000);
    } catch (error) {
      console.error(error);
      setStatus('error');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="glass-card p-6 flex flex-col h-full border-white/5">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-8 h-8 bg-green-500/20 text-green-500 rounded-lg flex items-center justify-center">
          <Bot size={18} />
        </div>
        <h2 className="text-xl font-semibold">AI Field Input</h2>
      </div>

      <div className="flex-1 bg-black/40 rounded-2xl p-4 mb-4 overflow-y-auto space-y-4 border border-white/5">
        <div className="flex gap-3">
          <div className="w-8 h-8 rounded-full bg-primary/20 flex-shrink-0 flex items-center justify-center text-[10px] font-bold">AI</div>
          <div className="bg-white/5 p-3 rounded-2xl rounded-tl-none text-sm text-gray-300 max-w-[80%]">
            Paste a WhatsApp message or field report here. I'll use Gemini AI to extract location, category, and urgency.
          </div>
        </div>

        <AnimatePresence>
          {status === 'success' && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="flex gap-3 justify-end"
            >
              <div className="bg-green-500/10 border border-green-500/20 p-3 rounded-2xl rounded-tr-none text-sm text-green-400 flex items-center gap-2">
                <CheckCircle size={14} />
                Crisis report processed and added to heatmap.
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <form onSubmit={handleSubmit} className="relative">
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="e.g. Need medical help in Vijay Nagar, 10 people injured, urgent!"
          className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 pr-14 text-sm focus:outline-none focus:border-primary/50 transition-all resize-none h-24"
        />
        <button
          disabled={isLoading || !message.trim()}
          type="submit"
          className="absolute bottom-4 right-4 w-10 h-10 bg-primary hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-xl flex items-center justify-center shadow-lg shadow-primary/20 transition-all"
        >
          {isLoading ? <Loader2 size={18} className="animate-spin" /> : <Send size={18} />}
        </button>
      </form>
    </div>
  );
};

export default WhatsAppSimulator;
