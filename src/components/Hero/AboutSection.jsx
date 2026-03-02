import React from "react";
import { motion } from "framer-motion";
import { Sparkles, Brain, Globe, Users, Info } from "lucide-react";

export default function AboutSection() {
    return (
        <section className="relative w-full min-h-screen  flex items-center justify-center py-16 px-6 overflow-hidden">

            {/* --- BACKGROUND ELEMENTS --- */}
            <div className="absolute inset-0 pointer-events-none">
                <div
                    className="absolute inset-0 opacity-[0.02]"
                    style={{ backgroundImage: 'linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg, #ffffff 1px, transparent 1px)', backgroundSize: '30px 30px' }}
                />
                <motion.div
                    animate={{ opacity: [0.08, 0.15, 0.08] }}
                    transition={{ duration: 6, repeat: Infinity }}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-brand-primary opacity-10 rounded-full blur-[120px]"
                />
            </div>

            {/* --- MAIN COMPACT CONTAINER --- */}
            <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1.5 }}
                viewport={{ once: true }}
                className="max-w-6xl mx-auto relative z-20 w-full border border-white/30 rounded-[40px] p-6 md:p-10 backdrop-blur-xl bg-brand-bg/50 shadow-2xl flex flex-col justify-center overflow-hidden"
            >
                {/* 2x2 HUD Grid Layout */}
                <div className="grid grid-cols-1 md:grid-cols-2 grid-rows-2 gap-y-8 md:gap-y-4 relative">

                    {/* TOP LEFT */}
                    <motion.div
                        initial={{ opacity: 0, x: -80, y: -80 }}
                        whileInView={{ opacity: 1, x: 0, y: 0 }}
                        transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
                        viewport={{ once: true }}
                        whileHover={{ y: -6 }}
                        className="flex flex-col justify-start text-left space-y-2"
                    >
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 text-gray-400 text-[9px] font-semibold uppercase tracking-wider w-fit">
                            <Info size={10} /> About Us
                        </div>

                        {/* POPPING HEADING */}
                        <motion.h3
                            initial={{ scale: 0.6, opacity: 0 }}
                            whileInView={{ scale: 1, opacity: 1 }}
                            transition={{ type: "spring", stiffness: 180, damping: 12, delay: 0.3 }}
                            className="text-2xl md:text-3xl font-bold text-white uppercase tracking-tight font-welcome"
                        >
                            About Us
                        </motion.h3>

                        <p className="text-gray-500 text-xs md:text-sm leading-relaxed max-w-[260px]">
                            AccessLearn is a collective of AI engineers and accessibility advocates dedicated to rewriting the rules of digital education for the visually impaired.
                        </p>
                    </motion.div>

                    {/* TOP RIGHT */}
                    <motion.div
                        initial={{ opacity: 0, x: 80, y: -80 }}
                        whileInView={{ opacity: 1, x: 0, y: 0 }}
                        transition={{ duration: 1, ease: "easeOut", delay: 0.4 }}
                        viewport={{ once: true }}
                        whileHover={{ y: -6 }}
                        className="flex flex-col justify-start items-end text-right space-y-2"
                    >
                        <motion.h3
                            initial={{ scale: 0.6, opacity: 0 }}
                            whileInView={{ scale: 1, opacity: 1 }}
                            transition={{ type: "spring", stiffness: 200, damping: 12, delay: 0.5 }}
                            className="text-3xl md:text-5xl font-bold font-welcome text-white tracking-tight leading-none"
                        >
                            Accessible <br /> <motion.span
                                animate={{
                                    textShadow: [
                                        "0px 0px 15px rgba(99,102,241,2)"
                                    ]
                                }}
                                transition={{ duration: 2, repeat: Infinity }}
                                className="text-indigo-300 text-xl md:text-3xl"
                            >
                                by Design.
                            </motion.span>
                        </motion.h3>

                        <p className="text-gray-400 text-sm leading-snug max-w-[280px]">
                            Visual complexity should never be a barrier. We engineer a world where knowledge is universally accessible.
                        </p>
                    </motion.div>

                    {/* BOTTOM LEFT */}
                    <motion.div
                        initial={{ opacity: 0, x: -80, y: 80 }}
                        whileInView={{ opacity: 1, x: 0, y: 0 }}
                        transition={{ duration: 1, ease: "easeOut", delay: 0.6 }}
                        viewport={{ once: true }}
                        whileHover={{ y: -6 }}
                        className="flex flex-col justify-start mt-15 space-y-2"
                    >
                        <motion.h3
                            initial={{ scale: 0.6, opacity: 0 }}
                            whileInView={{ scale: 1, opacity: 1 }}
                            transition={{ type: "spring", stiffness: 200, damping: 12, delay: 0.7 }}
                            className="text-3xl md:text-5xl font-bold font-welcome text-white tracking-tight leading-none"
                        >
                            Inclusive <motion.span
                                animate={{
                                    textShadow: [
                                        "0px 0px 15px rgba(99,102,241,2)"
                                    ]
                                }}
                                transition={{ duration: 2.2, repeat: Infinity }}
                                className="text-indigo-300 text-xl md:text-3xl"
                            >
                                by Default.
                            </motion.span>
                        </motion.h3>

                        <p className="text-gray-400 text-sm leading-snug max-w-[280px]">
                            Rebuilding education around empathy and AI to ensure every student learns without limits.
                        </p>
                    </motion.div>

                    {/* BOTTOM RIGHT */}
                    <motion.div
                        initial={{ opacity: 0, x: 80, y: 80 }}
                        whileInView={{ opacity: 1, x: 0, y: 0 }}
                        transition={{ duration: 1, ease: "easeOut", delay: 0.8 }}
                        viewport={{ once: true }}
                        whileHover={{ y: -6 }}
                        className="flex flex-col justify-end items-end space-y-3"
                    >
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-indigo-500/30 bg-indigo-500/10 text-indigo-400 text-[12px] font-semibold uppercase tracking-wider w-fit ml-auto">
                            <Sparkles size={10} /> The Vision
                        </div>

                        <div className="flex flex-wrap gap-3">
                            <motion.div
                                whileHover={{ scale: 1.05 }}
                                className="px-4 py-2 rounded-xl bg-white/[0.03] border border-white/5 flex items-center gap-3 hover:border-brand-primary/30 transition-colors"
                            >
                                <Globe size={16} className="text-brand-primary" />
                                <span className="text-[15px] font-semibold text-white/70 uppercase tracking-wider">Global Edge</span>
                            </motion.div>

                            <motion.div
                                whileHover={{ scale: 1.05 }}
                                className="px-4 py-2 rounded-xl bg-white/[0.03] border border-white/5 flex items-center gap-3 hover:border-brand-primary/30 transition-colors"
                            >
                                <Users size={16} className="text-indigo-400" />
                                <span className="text-[15px] font-semibold text-white/70 uppercase tracking-wider">12k+ Users</span>
                            </motion.div>
                        </div>
                    </motion.div>

                    {/* CENTER HUB */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 flex flex-col items-center justify-center">
                        <div className="absolute h-[50vh] w-px bg-gradient-to-b from-transparent via-white/20 to-transparent" />
                        <div className="absolute w-[60vw] h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

                        <motion.div
                            animate={{ scale: [1, 1.08, 1], rotate: 360 }}
                            transition={{ rotate: { duration: 20, repeat: Infinity, ease: "linear" }, scale: { duration: 3, repeat: Infinity } }}
                            className="relative bg-brand-bg border border-brand-primary/50 p-6 rounded-full shadow-[0_0_60px_rgba(85,70,161,0.25)]"
                        >
                            <Brain size={28} className="text-brand-primary" />
                            <div className="absolute inset-0 rounded-full border-2 border-brand-primary/20 animate-ping" style={{ animationDuration: '3s' }} />
                        </motion.div>
                    </div>
                </div>

                <div className="absolute top-4 left-4 w-6 h-6 border-t border-l border-white/30 rounded-tl-2xl" />
                <div className="absolute bottom-4 right-4 w-6 h-6 border-b border-r border-white/30 rounded-br-2xl" />

            </motion.div>
        </section>
    );
}
