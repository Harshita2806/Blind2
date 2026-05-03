import React from 'react';
import { useVoice } from '../context/VoiceContext';
import { Mic, MicOff, Volume2, HelpCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const VoiceStatusUI = () => {
    const { isListening, isVoiceEnabled, toggleVoice, speak } = useVoice();

    if (!isVoiceEnabled) {
        return (
            <button
                onClick={toggleVoice}
                className="fixed bottom-6 left-6 z-[100] w-12 h-12 bg-gray-800 text-gray-400 rounded-full flex items-center justify-center border border-white/10 hover:bg-gray-700 transition-all shadow-lg"
                title="Enable Voice Commands"
            >
                <MicOff size={20} />
            </button>
        );
    }

    return (
        <div className="fixed bottom-6 left-6 z-[100] flex flex-col items-start gap-3">
            <AnimatePresence>
                {isListening && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8, x: -20 }}
                        animate={{ opacity: 1, scale: 1, x: 0 }}
                        exit={{ opacity: 0, scale: 0.8, x: -20 }}
                        className="bg-teal-500 text-black px-4 py-2 rounded-2xl font-black text-xs uppercase tracking-widest shadow-[0_0_20px_rgba(45,212,191,0.5)] flex items-center gap-2"
                    >
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-black opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-black"></span>
                        </span>
                        Listening...
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="flex items-center gap-2">
                <button
                    onClick={toggleVoice}
                    className={`w-14 h-14 rounded-full flex items-center justify-center transition-all shadow-xl border-2 ${
                        isListening 
                        ? "bg-teal-400 border-teal-300 text-black scale-110 shadow-teal-500/40" 
                        : "bg-[#0a0a0f] border-teal-900/50 text-teal-400 hover:border-teal-400"
                    }`}
                >
                    {isListening ? <Mic size={24} className="animate-pulse" /> : <Mic size={24} />}
                </button>
                
                <button
                    onClick={() => speak("Voice assistant is active. Say 'Help' for a list of commands.")}
                    className="w-10 h-10 rounded-full bg-white/5 border border-white/10 text-gray-400 flex items-center justify-center hover:bg-white/10 transition-all"
                >
                    <HelpCircle size={18} />
                </button>
            </div>
        </div>
    );
};

export default VoiceStatusUI;
