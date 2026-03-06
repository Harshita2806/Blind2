import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Users, BookOpen, BarChart, TrendingUp, Award, Clock, Loader2 } from "lucide-react";
import { analyticsAPI } from "../../services/api";

export default function InsightEngine() {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        analyticsAPI.getStudents()
            .then(res => setData(res.data))
            .catch(err => setError("Failed to load analytics."))
            .finally(() => setLoading(false));
    }, []);

    if (loading) return (
        <div className="flex items-center justify-center py-32 gap-3 text-gray-500 pt-[100px]">
            <Loader2 size={24} className="animate-spin" /><span>Loading analytics…</span>
        </div>
    );
    if (error) return <div className="text-center py-32 text-red-400 pt-[100px]">{error}</div>;

    const stats = [
        { label: "Total Students", value: data?.totalStudents || 0, icon: <Users size={22} />, color: "indigo" },
        { label: "Materials", value: data?.totalMaterials || 0, icon: <BookOpen size={22} />, color: "purple" },
    ];

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="pt-24 px-6 md:px-10 max-w-6xl mx-auto pb-12">
            <h2 className="text-3xl font-bold text-white mb-2 font-serif">Insight Engine</h2>
            <p className="text-gray-500 mb-8">Real-time analytics on student performance and engagement.</p>

            {/* Overview stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
                {stats.map((s, i) => (
                    <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
                        className="bg-[#09090b] border border-white/10 rounded-2xl p-5 flex flex-col items-center text-center">
                        <div className={`text-${s.color}-400 mb-2`}>{s.icon}</div>
                        <div className="text-3xl font-black text-white">{s.value}</div>
                        <div className="text-[10px] text-gray-500 uppercase tracking-widest mt-1 font-bold">{s.label}</div>
                    </motion.div>
                ))}
            </div>

            {/* Student table */}
            <div className="bg-[#09090b] border border-white/10 rounded-[2rem] overflow-hidden">
                <div className="p-6 border-b border-white/5">
                    <h3 className="text-lg font-bold text-white">Student Performance</h3>
                </div>
                {!data?.students || data.students.length === 0 ? (
                    <div className="p-12 text-center text-gray-600">
                        <Users size={40} className="mx-auto mb-3 opacity-30" />
                        <p>No students have accessed your materials yet.</p>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full" role="table" aria-label="Student performance table">
                            <thead className="bg-white/[0.02]">
                                <tr>
                                    {["Student", "Materials", "Avg Completion", "Listen Time", "Quiz Attempts", "Avg Score"].map(h => (
                                        <th key={h} className="text-left text-[10px] uppercase tracking-widest text-gray-500 font-bold px-5 py-3" scope="col">{h}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/5">
                                {data.students.map((s, i) => (
                                    <motion.tr key={s._id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.05 }}
                                        className="hover:bg-white/[0.02] transition-colors">
                                        <td className="px-5 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 rounded-lg bg-indigo-500/20 flex items-center justify-center text-indigo-400 font-bold text-xs">
                                                    {s.name?.charAt(0).toUpperCase()}
                                                </div>
                                                <div>
                                                    <p className="text-white text-sm font-semibold">{s.name}</p>
                                                    <p className="text-gray-600 text-xs">{s.email}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-5 py-4 text-gray-400 text-sm">{s.materialsAccessed}</td>
                                        <td className="px-5 py-4">
                                            <div className="flex items-center gap-2">
                                                <div className="w-16 h-1.5 bg-white/10 rounded-full">
                                                    <div className="h-full bg-indigo-500 rounded-full" style={{ width: `${s.avgCompletion}%` }} />
                                                </div>
                                                <span className="text-gray-400 text-xs">{s.avgCompletion}%</span>
                                            </div>
                                        </td>
                                        <td className="px-5 py-4 text-gray-400 text-sm">{s.totalListenedMinutes}m</td>
                                        <td className="px-5 py-4 text-gray-400 text-sm">{s.quizAttempts}</td>
                                        <td className="px-5 py-4">
                                            <span className={`text-sm font-bold ${s.avgQuizScore >= 70 ? "text-emerald-400" : s.avgQuizScore >= 50 ? "text-amber-400" : "text-red-400"}`}>
                                                {s.avgQuizScore > 0 ? `${s.avgQuizScore}%` : "—"}
                                            </span>
                                        </td>
                                    </motion.tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </motion.div>
    );
}