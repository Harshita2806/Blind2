import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Menu, User, Zap, Users, BookOpen,
    CheckCircle, Sparkles, X, Mic2, PieChart
} from "lucide-react";
import UploadCenter from "../components/Teacher/UploadCenter";
import SemanticEditor from "../components/Teacher/SemanticEditor";
import AudioLab from "../components/Teacher/AudioLab";
import AssessmentArchitect from "../components/Teacher/AssessmentArchitect";
import InsightEngine from "../components/Teacher/InsightEngine";
import CurriculumCommander from "../components/Teacher/CurriculumCommander";

// Animation Variants
const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.15,
            delayChildren: 0.2,
        }
    }
};

const itemVariants = {
    hidden: { opacity: 0, scale: 0.9, y: 30 },
    visible: {
        opacity: 1,
        scale: 1,
        y: 0,
        transition: { type: "spring", stiffness: 120, damping: 10 }
    }
};

const headingLeftVariants = {
    hidden: { opacity: 0, x: -60 },
    visible: {
        opacity: 1,
        x: 0,
        transition: { type: "spring", stiffness: 100, damping: 14, delay: 1.2 }
    }
};

const headingRightVariants = {
    hidden: { opacity: 0, x: 60 },
    visible: {
        opacity: 1,
        x: 0,
        transition: { type: "spring", stiffness: 100, damping: 14, delay: 1.8 }
    }
};


export default function TeacherDashboard() {
    const [activeView, setActiveView] = useState("dashboard");
    const [isSidebarOpen, setSidebarOpen] = useState(false);
    const uploadRef = useRef(null);

    const scrollToUpload = () => {
        setSidebarOpen(false);
        if (activeView !== "dashboard") {
            setActiveView("dashboard");
            setTimeout(() => {
                uploadRef.current?.scrollIntoView({ behavior: "smooth" });
            }, 100);
        } else {
            uploadRef.current?.scrollIntoView({ behavior: "smooth" });
        }
    };

    const renderContent = () => {
        switch (activeView) {
            case "semantic": return <SemanticEditor />;
            case "audio": return <AudioLab />;
            case "assessment": return <AssessmentArchitect />;
            case "curriculum": return <CurriculumCommander />;
            case "insights": return <InsightEngine />;
            default: return (
                <>
                    {/* --- HERO CONTENT --- */}
                    <main className="relative min-h-screen flex items-center justify-center px-4 md:px-10 pt-24 pb-20">
                        <motion.div
                            variants={containerVariants}
                            initial="hidden"
                            animate="visible"
                            // Mobile: Flex column, Desktop: Grid 12-col
                            className="w-full max-w-[1400px] flex flex-col lg:grid lg:grid-cols-12 gap-8 lg:gap-4 items-center"
                        >
                            {/* --- DESKTOP LEFT STATS (Hidden on Mobile) --- */}
                            <div className="hidden lg:flex col-span-3 flex-col items-center gap-12">
                                <CircularStat variants={itemVariants} icon={<Users />} label="Students" value="1.2k" color="indigo" />
                                <CircularStat variants={itemVariants} icon={<Mic2 />} label="Audio" value="142h" color="emerald" />
                            </div>

                            {/* --- CENTER CONTENT --- */}
                            <div className="w-full lg:col-span-6 text-center flex flex-col items-center">
                                <motion.div
                                    variants={itemVariants}
                                    className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-500/15 border border-indigo-500/30 text-indigo-300 text-[10px] uppercase tracking-widest mb-6 backdrop-blur-sm shadow-[0_0_15px_rgba(99,102,241,0.2)]"
                                >
                                    <Sparkles size={12} className="text-indigo-400" /> System Operational
                                </motion.div>

                                <div className="overflow-hidden mb-6 py-2">
                                    <motion.h1 variants={headingLeftVariants} className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight leading-tight font-serif">
                                        Welcome Back,
                                    </motion.h1>
                                    <motion.span variants={headingRightVariants} className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight leading-tight block font-serif text-transparent bg-clip-text bg-linear-to-r from-indigo-300 to-emerald-300 shadow-[0_0_30px_rgba(110,231,183,0.20)]">
                                        Professor Alexander
                                    </motion.span>
                                </div>

                                <motion.p variants={itemVariants} className="text-gray-200 text-base md:text-lg mb-10 max-w-md mx-auto leading-relaxed">
                                    Design accessible lessons. Empower every learner. Upload material, generate AI narration, and track progress instantly.
                                </motion.p>

                                <motion.button
                                    onClick={scrollToUpload}
                                    variants={itemVariants}
                                    whileHover={{ scale: 1.06, boxShadow: "0 0 45px rgba(255,255,255,0.4)" }}
                                    whileTap={{ scale: 0.94 }}
                                    className="px-8 py-3.5 md:px-10 md:py-4 bg-white text-black hover:bg-indigo-50 rounded-full font-bold transition-all shadow-xl relative overflow-hidden group"
                                >
                                    <span className="relative z-10 flex items-center gap-2">Get Started </span>
                                    <motion.div className="absolute inset-0 bg-gradient-to-r from-indigo-100 to-purple-100 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                </motion.button>

                                {/* --- MOBILE STATS GRID (Visible only on Mobile) --- */}
                                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-12 w-full max-w-md lg:hidden">
                                    {/* Reordered for visual balance on mobile */}
                                    <div className="col-span-1 sm:col-span-1">
                                        <CircularStat variants={itemVariants} icon={<Users />} label="Students" value="1.2k" color="indigo" mobile />
                                    </div>
                                    <div className="col-span-1 sm:col-span-1">
                                        <CircularStat variants={itemVariants} icon={<BookOpen />} label="Lessons" value="48" color="indigo" mobile />
                                    </div>
                                    <div className="col-span-1 sm:col-span-1">
                                        <CircularStat variants={itemVariants} icon={<Mic2 />} label="Audio" value="142h" color="emerald" mobile />
                                    </div>
                                    <div className="col-span-1 sm:col-span-1">
                                        <CircularStat variants={itemVariants} icon={<CheckCircle />} label="Compliance" value="98%" color="emerald" mobile />
                                    </div>
                                    <div className="col-span-2 sm:col-span-1 flex justify-center">
                                        <CircularStat variants={itemVariants} icon={<PieChart />} label="Engagement" value="High" color="indigo" mobile />
                                    </div>
                                </div>
                            </div>

                            {/* --- DESKTOP RIGHT STATS (Hidden on Mobile) --- */}
                            <div className="hidden lg:flex col-span-3 flex-col items-center gap-12">
                                <CircularStat variants={itemVariants} icon={<BookOpen />} label="Lessons" value="48" color="indigo" />
                                <CircularStat variants={itemVariants} icon={<CheckCircle />} label="Compliance" value="98%" color="emerald" />
                                <CircularStat variants={itemVariants} icon={<PieChart />} label="Engagement" value="High" color="indigo" />
                            </div>
                        </motion.div>
                    </main>

                    {/* --- FEATURE 1: UPLOAD CENTER --- */}
                    <div ref={uploadRef} className="scroll-mt-4">
                        <UploadCenter />
                    </div>
                </>
            );
        }
    };

    return (
        <div className="relative min-h-screen bg-[#050507] text-white font-sans overflow-x-hidden flex flex-col selection:bg-indigo-500/30">

            {/* --- FIXED NAVBAR --- */}
            <header className="fixed top-0 left-0 w-full z-[100] border-b border-white/10 bg-black/60 backdrop-blur-xl px-6 md:px-8 py-3 md:py-4 flex items-center justify-between">
                <button onClick={() => setSidebarOpen(true)} className="p-2 hover:bg-white/10 rounded-xl transition-all text-indigo-400">
                    <Menu size={22} />
                </button>

                <div className="flex items-center gap-4 cursor-pointer" onClick={() => setActiveView("dashboard")}>
                    <div className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center hover:bg-white/10 transition-colors">
                        <User size={16} />
                    </div>
                </div>
            </header>

            {/* --- DYNAMIC CONTENT --- */}
            <AnimatePresence mode="wait">
                <motion.div
                    key={activeView}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                >
                    {renderContent()}
                </motion.div>
            </AnimatePresence>

            {/* --- SIDEBAR --- */}
            <AnimatePresence>
                {isSidebarOpen && (
                    <>
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setSidebarOpen(false)}
                            className="fixed inset-0 bg-black/60 backdrop-blur-md z-[110]"
                        />

                        {/* Sidebar Container */}
                        <motion.div
                            initial={{ x: "-100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: "-100%" }}
                            transition={{ type: "spring", damping: 20, stiffness: 100 }}
                            // Responsive width: 85% on mobile, 320px (w-80) on desktop
                            className="fixed left-0 top-0 h-full w-[85%] sm:w-80 bg-[#09090b]/90 backdrop-blur-2xl border-r border-white/10 z-[120] flex flex-col"
                        >
                            {/* Header */}
                            <div className="p-6 md:p-8 flex justify-between items-center border-b border-white/5">
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 bg-indigo-500 rounded-lg flex items-center justify-center">
                                        <Zap size={18} className="text-white fill-white" />
                                    </div>
                                    <span className="text-md font-black font-semibold tracking-wider text-white">
                                        Access Learn
                                    </span>
                                </div>
                                <button
                                    onClick={() => setSidebarOpen(false)}
                                    className="p-2 hover:bg-white/5 rounded-full transition-colors text-gray-500 hover:text-white"
                                >
                                    <X size={20} />
                                </button>
                            </div>

                            {/* Navigation Links */}
                            <nav className="flex-1 p-4 md:p-6 flex flex-col gap-2 overflow-y-auto">
                                <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest ml-4 mb-2">Main Lab</p>

                                {[
                                    { id: "dashboard", label: "Upload Center", icon: <Users size={18} />, action: scrollToUpload },
                                    { id: "semantic", label: "Semantic Editor", icon: <BookOpen size={18} />, action: () => setActiveView("semantic") },
                                    { id: "audio", label: "Audio Lab", icon: <Mic2 size={18} />, action: () => setActiveView("audio") },
                                    { id: "assessment", label: "Assessment Architect", icon: <CheckCircle size={18} />, action: () => setActiveView("assessment") },
                                    { id: "curriculum", label: "Curriculum Commander", icon: <PieChart size={18} />, action: () => setActiveView("curriculum") },
                                    { id: "insights", label: "Insight Engine", icon: <Sparkles size={18} />, action: () => setActiveView("insights") },
                                ].map((item, index) => (
                                    <motion.button
                                        key={item.id}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: index * 0.05 + 0.2 }}
                                        onClick={() => { item.action(); setSidebarOpen(false); }}
                                        className={`group flex items-center gap-4 px-4 py-3.5 rounded-2xl transition-all duration-300 ${activeView === item.id
                                            ? "bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 shadow-[0_0_20px_rgba(99,102,241,0.1)]"
                                            : "hover:bg-white/5 text-gray-400 hover:text-white border border-transparent"
                                            }`}
                                    >
                                        <span className={`${activeView === item.id ? "text-indigo-400" : "text-gray-500 group-hover:text-indigo-400"} transition-colors`}>
                                            {item.icon}
                                        </span>
                                        <span className="text-sm font-semibold tracking-wide">{item.label}</span>

                                        {activeView === item.id && (
                                            <motion.div layoutId="activePill" className="ml-auto w-1.5 h-1.5 rounded-full bg-indigo-400 shadow-[0_0_10px_rgba(129,140,248,0.8)]" />
                                        )}
                                    </motion.button>
                                ))}
                            </nav>

                            {/* Footer / User Profile */}
                            <div className="p-4 md:p-6 border-t border-white/5 bg-white/[0.02]">
                                <div className="flex items-center gap-4 p-2">
                                    <div className="relative">
                                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center font-bold text-white shadow-lg">
                                            PA
                                        </div>
                                        <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 border-2 border-[#09090b] rounded-full" />
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-sm font-bold text-white leading-none">Prof. Alexander</span>
                                        <span className="text-[10px] text-gray-500 mt-1 uppercase tracking-tighter">Premium Account</span>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </div>
    );
}

// --- REDUCED PARTICLE CANVAS BACKGROUND (Unchanged) ---
function ReducedParticleBackground() {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        let animationId;
        let particles = [];

        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        resize();
        window.addEventListener('resize', resize);

        class Particle {
            constructor() { this.reset(); }

            reset() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.size = Math.random() * 2.5 + 0.8;
                this.speedX = (Math.random() - 0.5) * 0.3;
                this.speedY = (Math.random() - 0.5) * 0.3;
                this.opacity = Math.random() * 0.3 + 0.1;
                this.hue = Math.random() * 30 + 235;
            }

            update() {
                this.x += this.speedX;
                this.y += this.speedY;

                if (this.x < 0) this.x = canvas.width;
                if (this.x > canvas.width) this.x = 0;
                if (this.y < 0) this.y = canvas.height;
                if (this.y > canvas.height) this.y = 0;
            }

            draw() {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fillStyle = `hsla(${this.hue}, 80%, 65%, ${this.opacity})`;
                ctx.fill();
            }
        }

        for (let i = 0; i < 25; i++) particles.push(new Particle());

        const orbs = [
            { x: canvas.width * 0.2, y: canvas.height * 0.2, radius: 400, hue: 245, speedX: 0.1, speedY: 0.1 },
            { x: canvas.width * 0.8, y: canvas.height * 0.8, radius: 450, hue: 160, speedX: -0.08, speedY: 0.08 },
            { x: canvas.width * 0.6, y: canvas.height * 0.3, radius: 300, hue: 260, speedX: 0.05, speedY: -0.05 },
        ];

        const animate = () => {
            ctx.fillStyle = 'rgba(5, 5, 7, 0.2)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            orbs.forEach(orb => {
                orb.x += orb.speedX;
                orb.y += orb.speedY;

                if (orb.x < -orb.radius) orb.x = canvas.width + orb.radius;
                if (orb.x > canvas.width + orb.radius) orb.x = -orb.radius;
                if (orb.y < -orb.radius) orb.y = canvas.height + orb.radius;
                if (orb.y > canvas.height + orb.radius) orb.y = -orb.radius;

                const gradient = ctx.createRadialGradient(orb.x, orb.y, 0, orb.x, orb.y, orb.radius);
                gradient.addColorStop(0, `hsla(${orb.hue}, 70%, 55%, 0.12)`);
                gradient.addColorStop(0.6, `hsla(${orb.hue}, 60%, 45%, 0.05)`);
                gradient.addColorStop(1, 'transparent');

                ctx.beginPath();
                ctx.arc(orb.x, orb.y, orb.radius, 0, Math.PI * 2);
                ctx.fillStyle = gradient;
                ctx.fill();
            });

            particles.forEach(p => { p.update(); p.draw(); });

            animationId = requestAnimationFrame(animate);
        };

        animate();

        return () => {
            window.removeEventListener('resize', resize);
            cancelAnimationFrame(animationId);
        };
    }, []);

    return <canvas ref={canvasRef} className="absolute inset-0 z-0 pointer-events-none" />;
}

// --- ORB COMPONENT WITH FLOAT & GLOW ANIMATION ---
function CircularStat({ icon, label, value, color, size = "large", variants, mobile }) {
    const isEmerald = color === "emerald";

    // Vibrant glow colors
    const glowColor = isEmerald ? "rgba(16,185,129,0.4)" : "rgba(99,102,241,0.4)";
    const borderGlow = isEmerald ? "border-emerald-500/50" : "border-indigo-500/50";
    const textColor = isEmerald ? "text-emerald-400" : "text-indigo-400";

    // Responsive Sizing
    const circleSize = mobile
        ? "w-28 h-28 sm:w-32 sm:h-32"
        : (size === "large" ? "w-40 h-40" : "w-32 h-32");

    const iconSize = mobile ? 18 : (size === "large" ? 22 : 18);
    const valueText = mobile ? "text-xl" : (size === "large" ? "text-2xl" : "text-xl");

    const floatDelay = value === '1.2k' ? 0.2 : value === '48' ? 0.4 : 1;

    return (
        <motion.div
            variants={variants}
            animate={{
                y: [0, -12, 0],
                boxShadow: [
                    `0 0 25px ${glowColor}, inset 0 0 20px rgba(255,255,255,0.06)`,
                    `0 0 40px ${isEmerald ? "rgba(20,220,150,0.9)" : "rgba(120,130,250,0.9)"}, inset 0 0 20px rgba(255,255,255,0.06)`,
                    `0 0 25px ${glowColor}, inset 0 0 20px rgba(255,255,255,0.06)`
                ]
            }}
            transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: floatDelay
            }}
            whileHover={{
                scale: 1.05,
                borderColor: "rgba(255,255,255,0.8)",
                transition: { duration: 0.3 }
            }}
            className={`group relative ${circleSize} flex flex-col items-center justify-center rounded-full border-2 ${borderGlow} bg-black/60 backdrop-blur-md transition-all duration-50 cursor-pointer`}
        >
            {/* Icon */}
            <div className={`mb-1 transition-colors ${textColor}`}>
                {React.cloneElement(icon, { size: iconSize })}
            </div>

            {/* Value */}
            <span className={`${valueText} font-bold tracking-tight text-white`}>{value}</span>

            {/* Label */}
            <span className="text-[8px] sm:text-[9px] uppercase tracking-tighter text-gray-400 mt-0.5 font-medium">{label}</span>

            {/* Decorative Outer Ring */}
            <div className="absolute inset-[-6px] rounded-full border border-white/[0.1] pointer-events-none group-hover:border-white/20 group-hover:rotate-180 transition-transform duration-1000" />
        </motion.div>
    );
}