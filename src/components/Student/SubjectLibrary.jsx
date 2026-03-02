import React from "react";
import { motion } from "framer-motion";
import { BookOpen, Clock, Star, ArrowRight } from "lucide-react";

const subjects = [
    { id: 1, title: "Quantum Physics", chapters: 12, time: "14h", progress: 65, color: "from-indigo-500" },
    { id: 2, title: "Advanced Calculus", chapters: 10, time: "11h", progress: 30, color: "from-purple-500" },
    { id: 3, title: "Microbiology", chapters: 15, time: "18h", progress: 90, color: "from-blue-500" },
];

export default function SubjectLibrary({ libraryRef }) {
    return (
        <section ref={libraryRef} className="py-24 px-10 max-w-[1400px] mx-auto scroll-mt-20">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="flex justify-between items-end mb-12"
            >
                <div>
                    <h2 className="text-4xl font-bold font-serif mb-2">Subject Library</h2>
                    <p className="text-gray-500 uppercase tracking-widest text-[10px] font-bold">Your Curated Learning Path</p>
                </div>
                <button className="text-indigo-400 text-sm font-bold flex items-center gap-2 hover:gap-3 transition-all">
                    View All <ArrowRight size={16} />
                </button>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {subjects.map((subject, index) => (
                    <motion.div
                        key={subject.id}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        viewport={{ once: true }}
                        whileHover={{ y: -10 }}
                        className="relative group cursor-pointer"
                    >
                        <div className={`absolute inset-0 bg-gradient-to-br ${subject.color} to-transparent opacity-0 group-hover:opacity-10 blur-2xl transition-opacity duration-500 rounded-[2.5rem]`} />
                        <div className="relative bg-[#09090b]/60 border border-white/5 backdrop-blur-xl p-8 rounded-[2.5rem] h-full flex flex-col border-t-white/10">
                            <div className="flex justify-between items-start mb-6">
                                <div className="p-3 bg-white/5 rounded-2xl text-indigo-400">
                                    <BookOpen size={24} />
                                </div>
                                <div className="flex items-center gap-1 text-amber-400 text-xs font-bold">
                                    <Star size={12} fill="currentColor" /> 4.9
                                </div>
                            </div>

                            <h3 className="text-2xl font-bold mb-2 group-hover:text-indigo-300 transition-colors">{subject.title}</h3>

                            <div className="flex gap-4 mb-8">
                                <div className="flex items-center gap-1.5 text-gray-500 text-xs">
                                    <Clock size={14} /> {subject.time}
                                </div>
                                <div className="flex items-center gap-1.5 text-gray-500 text-xs">
                                    <BookOpen size={14} /> {subject.chapters} Chapters
                                </div>
                            </div>

                            <div className="mt-auto pt-6 border-t border-white/5">
                                <div className="flex justify-between text-[10px] uppercase font-bold mb-2 tracking-widest">
                                    <span className="text-gray-500">Completion</span>
                                    <span className="text-indigo-400">{subject.progress}%</span>
                                </div>
                                <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        whileInView={{ width: `${subject.progress}%` }}
                                        transition={{ duration: 1, delay: 0.5 }}
                                        className="h-full bg-indigo-500 shadow-[0_0_10px_rgba(99,102,241,0.5)]"
                                    />
                                </div>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}