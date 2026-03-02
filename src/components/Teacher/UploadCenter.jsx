import React from "react";
import { motion } from "framer-motion";
import { Upload, FileText, Cloud, ShieldCheck } from "lucide-react";

export default function UploadCenter() {
    return (
        <section className="min-h-screen py-20 px-10 flex flex-col items-center justify-center bg-[#050507]">
            <div className="max-w-[1000px] w-full text-center">

                {/* --- ANIMATED HEADING --- */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8 }}
                    className="mb-6"
                >
                    <h2 className="text-3xl md:text-4xl font-bold font-welcome tracking-wide text-white uppercase">
                        Feature 1: The Upload Center
                    </h2>
                </motion.div>

                {/* --- ANIMATED QUOTE --- */}
                <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                    className="text-indigo-300/80 text-xl md:text-2xl italic font-light mb-4 px-4"
                >
                    "Transforming raw knowledge into accessible experiences begins with a single drop of data."
                </motion.p>

                {/* --- MAIN CONTENT AREA --- */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6, delay: 0.5 }}
                    className="relative group"
                >
                    <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500/20 to-emerald-500/20 rounded-[2rem] blur-2xl opacity-50 group-hover:opacity-70 transition duration-1000" />

                    <div className="relative bg-[#0d0d12] border border-white/10 rounded-[2rem] p-12 md:p-20 flex flex-col items-center justify-center cursor-pointer transition-all hover:border-white/20">
                        <div className="w-20 h-14 rounded-2xl bg-indigo-500/10 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500">
                            <Upload className="text-indigo-400" size={40} />
                        </div>

                        <h3 className="text-2xl font-semibold mb-4 text-white">
                            Drag & Drop Your Material
                        </h3>
                        <p className="text-gray-400 mb-8 max-w-sm mx-auto leading-relaxed">
                            Support for PDF, DOCX, or plain text files. Our AI will automatically parse the structure for your curriculum.
                        </p>

                        <div className="flex flex-wrap justify-center gap-6 text-[11px] uppercase tracking-[0.2em] text-gray-500 font-bold">
                            <span className="flex items-center gap-2"><FileText size={14} /> PDF/DOCX</span>
                            <span className="flex items-center gap-2"><Cloud size={14} /> Cloud Import</span>
                            <span className="flex items-center gap-2"><ShieldCheck size={14} /> Secure Encryption</span>
                        </div>

                        <button className="mt-12 px-8 py-3 bg-indigo-500/10 hover:bg-indigo-500/20 border border-indigo-500/30 text-indigo-300 rounded-xl font-semibold transition-all">
                            Browse Files
                        </button>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}