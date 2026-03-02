import React from "react";
import { motion } from "framer-motion";
import { AlertTriangle, CheckCircle2, TrendingUp } from "lucide-react";

export default function MasteryMap() {
    const insights = [
        { topic: "Thermodynamics", status: "Weak", color: "text-rose-400", bg: "bg-rose-500/10", icon: <AlertTriangle /> },
        { topic: "Calculus: Integration", status: "Mastered", color: "text-emerald-400", bg: "bg-emerald-500/10", icon: <CheckCircle2 /> },
        { topic: "Optics", status: "In Progress", color: "text-indigo-400", bg: "bg-indigo-500/10", icon: <TrendingUp /> }
    ];

    return (
        <div className="pt-24 px-10 max-w-6xl mx-auto">
            <h2 className="text-4xl font-bold font-serif mb-12">Knowledge Insights</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                {insights.map((item, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="bg-[#09090b] border border-white/5 p-8 rounded-[2.5rem] flex flex-col items-center text-center group hover:border-white/10"
                    >
                        <div className={`p-4 rounded-2xl ${item.bg} ${item.color} mb-6`}>
                            {item.icon}
                        </div>
                        <h3 className="text-xl font-bold text-white mb-2">{item.topic}</h3>
                        <span className={`text-[10px] font-black uppercase tracking-widest ${item.color}`}>{item.status}</span>
                    </motion.div>
                ))}
            </div>

            <div className="bg-indigo-500/5 border border-indigo-500/10 rounded-[2.5rem] p-10">
                <h4 className="font-bold text-lg mb-4">Study Recommendation</h4>
                <p className="text-gray-400 leading-relaxed italic">
                    "Based on your audio retention, we suggest re-listening to 'Thermodynamics: Second Law' at 0.8x speed. You skipped this section twice in your last session."
                </p>
            </div>
        </div>
    );
}