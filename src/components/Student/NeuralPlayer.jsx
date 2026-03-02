import React from "react";
import { motion } from "framer-motion";
import { Play, SkipBack, SkipForward, Repeat, Zap, Bookmark, List } from "lucide-react";

export default function NeuralPlayer() {
    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="pt-20 px-10 max-w-5xl mx-auto">
            <div className="bg-[#09090b] border border-white/5 rounded-[3rem] p-12 shadow-2xl relative overflow-hidden">
                {/* Background Glow */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-64 bg-indigo-500/10 blur-[120px]" />

                <div className="relative z-10 flex flex-col items-center">
                    <span className="text-[10px] uppercase tracking-[0.4em] text-indigo-400 font-black mb-8">Now Playing • Quantum Physics</span>

                    {/* Audiobook Cover Art / Square Style */}
                    <div className="w-64 h-64 bg-gradient-to-br from-indigo-500/20 to-purple-500/20 border border-white/10 rounded-[2.5rem] flex items-center justify-center mb-10 shadow-inner">
                        <Zap size={80} className="text-indigo-400 opacity-50" />
                    </div>

                    <h2 className="text-3xl font-bold mb-2 font-serif text-white">Chapter 4: The Uncertainty Principle</h2>
                    <p className="text-gray-500 mb-10">Narrator: AI Alexander</p>

                    {/* Fake Waveform */}
                    <div className="w-full flex items-end justify-center gap-1 h-12 mb-10">
                        {[...Array(30)].map((_, i) => (
                            <motion.div
                                key={i}
                                animate={{ height: [10, Math.random() * 40, 10] }}
                                transition={{ repeat: Infinity, duration: 1 + Math.random() }}
                                className="w-1.5 bg-indigo-500/40 rounded-full"
                            />
                        ))}
                    </div>

                    {/* Controls */}
                    <div className="flex items-center gap-8 mb-12">
                        <button className="text-gray-500 hover:text-white transition-colors"><Repeat size={20} /></button>
                        <button className="text-white hover:text-indigo-400 transition-all"><SkipBack size={32} fill="currentColor" /></button>
                        <button className="w-20 h-20 bg-indigo-500 rounded-full flex items-center justify-center text-black hover:scale-105 transition-transform">
                            <Play size={32} fill="black" />
                        </button>
                        <button className="text-white hover:text-indigo-400 transition-all"><SkipForward size={32} fill="currentColor" /></button>
                        <button className="text-indigo-400 hover:text-white transition-colors" title="Repeat Last Equation">
                            <span className="text-xs font-black italic">f(x)</span>
                        </button>
                    </div>

                    {/* Utility Bar */}
                    <div className="grid grid-cols-3 w-full max-w-md p-4 bg-white/5 rounded-2xl border border-white/5">
                        <button className="flex flex-col items-center gap-1 text-[10px] font-bold text-gray-400 hover:text-indigo-400">
                            <Bookmark size={16} /> BOOKMARK
                        </button>
                        <button className="flex flex-col items-center gap-1 text-[10px] font-bold text-indigo-400">
                            <span className="text-xs">1.5x</span> SPEED
                        </button>
                        <button className="flex flex-col items-center gap-1 text-[10px] font-bold text-gray-400 hover:text-indigo-400">
                            <List size={16} /> TRANSCRIPT
                        </button>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}