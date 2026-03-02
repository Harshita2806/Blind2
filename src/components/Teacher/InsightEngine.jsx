import React from "react";
import { motion } from "framer-motion";
import { BarChart3, Fingerprint, LineChart, Zap } from "lucide-react";

export default function InsightEngine() {
    return (
        <div className="min-h-screen bg-[#050507] text-white pt-20 px-10 flex flex-col items-center">
            {/* --- HEADING --- */}
            <motion.h2
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="text-4xl md:text-5xl font-bold mb-4 text-center uppercase tracking-tight font-serif"
            >
                Insight Engine
            </motion.h2>

            {/* --- QUOTE --- */}
            <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.8 }}
                className="text-blue-300/70 text-xl md:text-2xl italic font-light mb-8 text-center max-w-2xl"
            >
                "Data is the silent feedback of the mind, revealing where the light of understanding flickers."
            </motion.p>

            {/* --- STAT CARDS --- */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-6xl mb-10">
                {[
                    { label: "Active Retention", val: "84%", color: "text-blue-400" },
                    { label: "Drop-off Rate", val: "12%", color: "text-cyan-400" },
                    { label: "Concept Mastery", val: "High", color: "text-indigo-400" }
                ].map((stat, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 + (i * 0.1) }}
                        className="bg-[#0d0d12] border border-white/15 p-8 rounded-3xl flex flex-col items-center justify-center"
                    >
                        <span className="text-[10px] uppercase tracking-[0.3em] text-gray-500 font-bold mb-2">{stat.label}</span>
                        <span className={`text-4xl font-black ${stat.color}`}>{stat.val}</span>
                    </motion.div>
                ))}
            </div>

            {/* --- MAIN ANALYTICS VIEW --- */}
            <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.8 }}
                className="w-full max-w-6xl bg-[#09090b] border border-blue-500/10 rounded-[2.5rem] p-12 h-90 flex flex-col items-center justify-center relative overflow-hidden group"
            >
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-500/40 to-transparent" />

                <div className="flex items-center gap-8 mb-10">
                    <LineChart className="text-blue-400 opacity-50" size={32} />
                    <BarChart3 className="text-blue-400" size={48} />
                    <Fingerprint className="text-blue-400 opacity-50" size={32} />
                </div>

                <h3 className="text-2xl font-bold mb-4 tracking-tight">Predictive Learning Analysis</h3>
                <p className="text-gray-500 text-center max-w-lg mb-8 leading-relaxed">
                    Our neural engine tracks micro-engagements to predict which students might struggle with upcoming modules.
                </p>

                <button className="px-8 py-3 bg-blue-500/10 border border-blue-500/30 text-blue-300 rounded-xl font-bold hover:bg-blue-500/20 transition-all">
                    Generate Full Report
                </button>
            </motion.div>
        </div>
    );
}