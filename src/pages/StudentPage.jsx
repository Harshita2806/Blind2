import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Menu, User, Play, Compass, Book,
    Headphones, Mic, BarChart, History, X, Sparkles, Zap
} from "lucide-react";
import SSubjectLibrary from "../components/Student/SubjectLibrary";
import NeuralPlayer from "../components/Student/NeuralPlayer";
import VoiceDoubts from "../components/Student/VoiceDoubts";
import MasteryMap from "../components/Student/MasteryMap";

export default function StudentPage() {
    const [activeView, setActiveView] = useState("dashboard");
    const [isSidebarOpen, setSidebarOpen] = useState(false);
    const libraryRef = useRef(null);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.3 } }
    };

    const itemVariants = {
        hidden: { opacity: 0, scale: 0.9, y: 20 },
        visible: { opacity: 1, scale: 1, y: 0, transition: { type: "spring", stiffness: 100, damping: 15 } }
    };

    const scrollToLibrary = () => {
        setSidebarOpen(false);
        setActiveView("dashboard");
        setTimeout(() => {
            libraryRef.current?.scrollIntoView({ behavior: "smooth" });
        }, 100);
    };

    // Helper to render current feature view
    const renderContent = () => {
        switch (activeView) {
            case "player": return <NeuralPlayer />;
            case "doubts": return <VoiceDoubts />;
            case "analytics": return <MasteryMap />;
            default: return (
                <>
                    <motion.section
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        // Mobile: Flex Col, Desktop: Grid 12-col
                        className="px-6 md:px-10 max-w-[1400px] mx-auto flex flex-col lg:grid lg:grid-cols-12 gap-8 lg:gap-12 items-center min-h-[85vh] pt-4"
                    >
                        {/* --- DESKTOP LEFT STATS (Hidden on Mobile) --- */}
                        <div className="hidden lg:flex col-span-3 flex-col items-center gap-8">
                            <StatSquare icon={<History />} label="Last Session" value="45m" color="indigo" variants={itemVariants} />
                            <StatSquare icon={<Book />} label="Chapters" value="12/15" color="purple" variants={itemVariants} />
                        </div>

                        {/* --- CENTER HERO (Full width on Mobile) --- */}
                        <div className="w-full lg:col-span-6 text-center flex flex-col items-center">
                            <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 text-[10px] uppercase tracking-[0.2em] mb-6 shadow-[0_0_15px_rgba(99,102,241,0.1)]">
                                <Sparkles size={12} /> Personalized Learning Path
                            </motion.div>

                            <motion.h1 variants={itemVariants} className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.1] mb-4 md:mb-6 font-serif">
                                Listen. Learn. <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 to-purple-400">Conquer.</span>
                            </motion.h1>

                            <motion.p variants={itemVariants} className="text-gray-400 text-base md:text-lg mb-8 max-w-xl mx-auto leading-relaxed italic">
                                "Transform your study sessions into an immersive audio journey. From complex equations to historical sagas, dive deep into your subjects."
                            </motion.p>

                            {/* Buttons: Stack on mobile, row on desktop */}
                            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto px-4 sm:px-0">
                                <motion.button
                                    variants={itemVariants}
                                    whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(99,102,241,0.4)" }}
                                    whileTap={{ scale: 0.95 }}
                                    className="px-8 py-4 bg-indigo-500/50 text-white rounded-2xl font-bold flex items-center justify-center gap-3 transition-all"
                                >
                                    <Play size={18} fill="white" /> Continue: Quantum Physics
                                </motion.button>
                                <motion.button
                                    onClick={scrollToLibrary}
                                    variants={itemVariants}
                                    whileHover={{ scale: 1.05 }}
                                    className="px-8 py-4 bg-white/5 border border-white/10 hover:bg-white/10 rounded-2xl font-bold transition-all"
                                >
                                    Explore Subjects
                                </motion.button>
                            </div>

                            {/* --- MOBILE STATS GRID (Visible only on Mobile) --- */}
                            <div className="grid grid-cols-2 gap-4 mt-12 w-full max-w-md lg:hidden">
                                <StatSquare icon={<History />} label="Last Session" value="45m" color="indigo" variants={itemVariants} mobile />
                                <StatSquare icon={<Zap />} label="Retention" value="89%" color="indigo" variants={itemVariants} mobile />
                                <StatSquare icon={<Book />} label="Chapters" value="12/15" color="purple" variants={itemVariants} mobile />
                                <StatSquare icon={<BarChart />} label="Streak" value="14 Days" color="purple" variants={itemVariants} mobile />
                            </div>
                        </div>

                        {/* --- DESKTOP RIGHT STATS (Hidden on Mobile) --- */}
                        <div className="hidden lg:flex col-span-3 flex-col items-center gap-8">
                            <StatSquare icon={<Zap />} label="Retention" value="89%" color="indigo" variants={itemVariants} />
                            <StatSquare icon={<BarChart />} label="Streak" value="14 Days" color="purple" variants={itemVariants} />
                        </div>
                    </motion.section>

                    {/* Feature 1: Subject Library */}
                    <div ref={libraryRef}>
                        <SSubjectLibrary />
                    </div>
                </>
            );
        }
    };

    return (
        <div className="relative min-h-screen bg-[#050507] text-white font-sans overflow-x-hidden selection:bg-indigo-500/30">

            {/* --- FIXED NAVBAR --- */}
            <header className="fixed top-0 left-0 w-full z-[100] border-b border-white/10 bg-black/60 backdrop-blur-xl px-6 md:px-8 py-3 md:py-4 flex items-center justify-between">
                <button onClick={() => setSidebarOpen(true)} className="p-2 hover:bg-white/10 rounded-xl transition-all text-indigo-400">
                    <Menu size={22} />
                </button>

                <div className="w-9 h-9 md:w-10 md:h-10 rounded-full border border-white/10 bg-white/5 flex items-center justify-center cursor-pointer hover:border-indigo-500/50 transition-all">
                    <User size={18} className="text-indigo-400" />
                </div>
            </header>

            {/* --- MAIN CONTENT --- */}
            <main className="pt-20 md:pt-24 pb-12">
                <AnimatePresence mode="wait">
                    <motion.div key={activeView}>
                        {renderContent()}
                    </motion.div>
                </AnimatePresence>
            </main>

            {/* --- SIDEBAR --- */}
            <StudentSidebar
                isOpen={isSidebarOpen}
                setOpen={setSidebarOpen}
                activeView={activeView}
                setActiveView={setActiveView}
                scrollToLibrary={scrollToLibrary}
            />
        </div>
    );
}

// Added 'mobile' prop for compact styles
function StatSquare({ icon, label, value, color, variants, mobile }) {
    const isIndigo = color === "indigo";

    // Dynamic sizing classes
    const sizeClasses = mobile
        ? "w-full h-32 md:h-36" // Mobile: Smaller, full width of grid cell
        : "w-36 h-36 md:w-44 md:h-44"; // Desktop: Larger fixed size

    return (
        <motion.div variants={variants} className={`${sizeClasses} group relative`}>
            <div className={`absolute inset-0 blur-2xl opacity-10 group-hover:opacity-30 transition-opacity duration-500 rounded-3xl ${isIndigo ? 'bg-indigo-500' : 'bg-purple-500'}`} />
            <div className="w-full h-full relative flex flex-col items-center justify-center rounded-[2rem] md:rounded-[2.5rem] border border-white/10 bg-[#09090b]/60 backdrop-blur-2xl transition-all duration-500 group-hover:border-indigo-500/40 group-hover:translate-y-[-5px]">
                <div className={isIndigo ? "text-indigo-400" : "text-purple-400"}>
                    {React.cloneElement(icon, { size: mobile ? 22 : 28, strokeWidth: 1.5 })}
                </div>
                <div className={`font-black mt-1 tracking-tighter text-white ${mobile ? 'text-2xl' : 'text-3xl'}`}>{value}</div>
                <div className="text-[9px] md:text-[10px] uppercase tracking-[0.2em] text-gray-500 font-bold mt-0.5">{label}</div>
            </div>
        </motion.div>
    );
}

function StudentSidebar({ isOpen, setOpen, activeView, setActiveView, scrollToLibrary }) {
    const menuItems = [
        { id: "dashboard", label: "My Hub", icon: <Compass size={18} />, action: () => setActiveView("dashboard") },
        { id: "subjects", label: "Library", icon: <Book size={18} />, action: scrollToLibrary },
        { id: "player", label: "Neural Player", icon: <Headphones size={18} />, action: () => setActiveView("player") },
        { id: "doubts", label: "Voice Doubts", icon: <Mic size={18} />, action: () => setActiveView("doubts") },
        { id: "analytics", label: "Mastery Map", icon: <BarChart size={18} />, action: () => setActiveView("analytics") },
    ];

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setOpen(false)} className="fixed inset-0 bg-black/80 backdrop-blur-md z-[110]" />
                    <motion.div
                        initial={{ x: "-100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "-100%" }}
                        transition={{ type: "spring", damping: 25, stiffness: 120 }}
                        // Full width on mobile, fixed width on desktop
                        className="fixed left-0 top-0 h-full w-[85%] sm:w-80 bg-[#09090b]/95 border-r border-white/10 z-[120] p-6 sm:p-8 flex flex-col shadow-2xl"
                    >
                        <div className="flex justify-between items-center mb-8 md:mb-12">
                            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-indigo-400">Student Menu</span>
                            <X size={20} className="cursor-pointer text-gray-600 hover:text-white transition-colors" onClick={() => setOpen(false)} />
                        </div>
                        <nav className="space-y-2 flex-1">
                            {menuItems.map((item) => (
                                <button
                                    key={item.id}
                                    onClick={() => { item.action(); setOpen(false); }}
                                    className={`w-full flex items-center gap-4 px-5 py-4 rounded-2xl transition-all duration-300 ${activeView === item.id
                                        ? "bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 shadow-inner"
                                        : "text-gray-500 hover:bg-white/5 hover:text-gray-200"
                                        }`}
                                >
                                    <span className={activeView === item.id ? "text-indigo-400" : "text-gray-600"}>{item.icon}</span>
                                    <span className="font-bold text-sm tracking-wide">{item.label}</span>
                                </button>
                            ))}
                        </nav>

                        <div className="mt-auto p-5 bg-indigo-500/5 rounded-[1.5rem] border border-white/5 relative overflow-hidden group">
                            <div className="absolute top-0 right-0 p-2 opacity-10 group-hover:rotate-12 transition-transform"><Sparkles size={40} /></div>
                            <p className="text-[10px] uppercase tracking-widest text-indigo-400 font-bold mb-2">Resume Learning</p>
                            <p className="text-sm font-bold text-white">Advanced Calculus</p>
                            <p className="text-xs text-gray-500 mt-1">Section 4.2: Derivatives</p>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}