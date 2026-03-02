import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Calculator,
    Image as ImageIcon,
    Volume2,
    HelpCircle,
    CheckCircle2,
    ChevronRight,
    ChevronLeft,
    Mic,
    Play,
    Triangle,
    Scan,
    Pencil
} from 'lucide-react';

// --- MAIN CARD VARIANTS ---
const slideVariants = {
    enter: (direction) => ({
        x: direction > 0 ? 800 : -800,
        opacity: 0,
        scale: 0.9,
    }),
    center: {
        zIndex: 1,
        x: 0,
        opacity: 1,
        scale: 1,
        transition: {
            x: { type: "spring", stiffness: 300, damping: 30 },
            opacity: { duration: 0.3 }
        }
    },
    exit: (direction) => ({
        zIndex: 0,
        x: direction < 0 ? -800 : 800,
        opacity: 0,
        scale: 0.9,
        transition: {
            x: { type: "spring", stiffness: 300, damping: 30 },
            opacity: { duration: 0.3 }
        }
    })
};

// --- BULLET POINT VARIANTS ---
const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: (i) => ({
        opacity: 1,
        x: 0,
        transition: {
            delay: 0.4 + (i * 0.1), // Starts after the card settles
            duration: 0.4,
            ease: "easeOut"
        }
    })
};

export default function FeatureSection() {
    const [index, setIndex] = useState(0);
    const [direction, setDirection] = useState(0);

    const features = [
        {
            title: "MATHEMATICAL EQUATION PROCESSING ENGINE",
            icon: <Calculator className="text-indigo-400" size={42} />,
            items: ["Detect LaTeX and math symbols", "Convert √x → “square root of x”", "Handle Integrals & Matrices", "Step-by-step explanation mode"],
            color: "group-hover:shadow-[0_0_50px_rgba(99,102,241,0.3)]",
            gradient: "from-indigo-600/20",
            visual: (
                <div className="absolute inset-0 overflow-hidden opacity-30 pointer-events-none">
                    <motion.div animate={{ y: [0, -15, 0] }} transition={{ duration: 4, repeat: Infinity }} className="absolute top-10 left-10 text-2xl font-serif text-indigo-400">√x</motion.div>
                    <motion.div animate={{ y: [0, 15, 0] }} transition={{ duration: 5, repeat: Infinity }} className="absolute top-10 right-60 text-2xl font-serif text-indigo-300">x²</motion.div>
                    <motion.div animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 6, repeat: Infinity }} className="absolute bottom-10 left-10 text-3xl font-serif text-indigo-500">∫x dx</motion.div>
                    <motion.div animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 6, repeat: Infinity }} className="absolute top-50 left-15 text-5xl font-serif text-indigo-500">+</motion.div>
                    <motion.div animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 6, repeat: Infinity }} className="absolute top-10 left-80 text-5xl font-serif text-indigo-500">*</motion.div>
                    <motion.div animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 6, repeat: Infinity }} className="absolute bottom-10 right-100 text-3xl font-serif text-indigo-500">%</motion.div>
                    <motion.div animate={{ y: [0, 15, 0] }} transition={{ duration: 6, repeat: Infinity }} className="absolute bottom-40 right-40 text-2xl font-serif text-indigo-500">(x + 1)²</motion.div>
                    <motion.div animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 6, repeat: Infinity }} className="absolute top-30 right-10 text-5xl font-serif text-indigo-500">^</motion.div>
                </div>
            )
        },
        {
            title: "DIAGRAM-TO-TEXT CONVERTER",
            icon: <ImageIcon className="text-indigo-400" size={42} />,
            items: ["Extract diagrams from PDF", "Detect text labels using OCR", "Generate structured descriptions", "Allow teacher override mode"],
            color: "group-hover:shadow-[0_0_50px_rgba(168,85,247,0.3)]",
            gradient: "from-purple-600/20",
            visual: (
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute bottom-30 right-20 flex flex-col items-center opacity-30">
                        <Triangle size={120} className="text-purple-400" />
                        <div className="flex gap-6 mt-1 font-bold text-[10px]"><span>A</span><span>B</span><span>C</span></div>
                    </div>
                    <div className="absolute bottom-10 left-10 flex flex-col items-center opacity-30">
                        <Scan size={45} className=" text-purple-500" />
                    </div>
                    <div className="absolute top-10 left-100 flex flex-col items-center opacity-30">
                        <Pencil size={40} className=" text-purple-500" />
                    </div>
                    <motion.div className="absolute bottom-10 right-10 bg-black/60 p-3 rounded-xl border border-white/10 max-w-45 hidden md:block">
                        <p className="text-[13px] text-purple-500 font-mono">
                            <TypewriterText text="> Analyzing: Triangle ABC detected..." />
                        </p>
                    </motion.div>
                </div>
            )
        },
        {
            title: "TEXT-TO-SPEECH INTEGRATION",
            icon: <Volume2 className="text-indigo-400" size={60} />,
            items: ["Natural-sounding AI audio", "Chapter-wise structured files", "Adjustable voice & speed", "Cloud-based MP3 streaming"],
            color: "group-hover:shadow-[0_0_50px_rgba(59,130,246,0.3)]",
            gradient: "from-blue-600/20",
            visual: (
                <div className="absolute inset-0 overflow-hidden pointer-events-none flex items-center justify-center">
                    <motion.div animate={{ scale: [1, 1, 1] }} transition={{ repeat: Infinity, duration: 2 }} className="absolute top-10 right-35 bg-white/15 px-40 py-2 rounded-2xl border border-white/10 flex items-center gap-3 scale-75 md:scale-100">
                        <div className="bg-blue-500 p-2 rounded-full shadow-[0_0_15px_rgba(59,130,246,0.5)]"><Play size={12} fill="white" /></div>
                        <div>
                            <p className="text-[15px] text-gray-400 uppercase tracking-widest ">Playing...</p>
                            <p className="text-sm font-bold text-white">Chapter 4 — Audio</p>
                        </div>
                    </motion.div>
                    <div className="absolute bottom-10 right-120 flex gap-2 items-end h-10">
                        {[1, 2, 3, 4, 3, 2, 1].map((h, i) => (
                            <motion.div key={i} animate={{ height: [5, h * 6, 5] }} transition={{ repeat: Infinity, duration: 1, delay: i * 0.1 }} className="w-1 bg-blue-400 rounded-full" />
                        ))}
                    </div>
                </div>
            )
        },
        {
            title: "INTELLIGENT QUIZ SYSTEM",
            icon: <HelpCircle className="text-indigo-400" size={42} />,
            items: ["Voice-based answer support", "Audio-based question reading", "Attempt history tracking", "Weak area & gap analysis"],
            color: "group-hover:shadow-[0_0_50px_rgba(16,185,129,0.3)]",
            gradient: "from-emerald-600/20",
            visual: (
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute top-10 right-55 bg-white/15 px-40 py-4 rounded-xl border border-white/10 scale-75 origin-top-right">
                        <p className="text-[30px] text-emerald-300 mb-1 font-bold uppercase">Performance</p>
                        <div className="w-48 h-1 bg-white/10 rounded-full overflow-hidden">
                            <motion.div initial={{ width: 0 }} animate={{ width: "85%" }} transition={{ duration: 2 }} className="h-full  bg-emerald-200" />
                        </div>
                    </div>
                    <motion.div animate={{ opacity: [1, 1.3, 1] }} transition={{ repeat: Infinity, duration: 2 }} className="absolute bottom-10 right-10 flex flex-col items-center text-emerald-200 scale-75 md:scale-100">
                        <Mic size={30} />
                        <span className="text-[15px] font-black mt-1 uppercase tracking-tighter">Listening...</span>
                    </motion.div>
                </div>
            )
        }
    ];

    const paginate = (newDirection) => {
        setDirection(newDirection);
        setIndex((prevIndex) => (prevIndex + 1) % features.length);
    };

    return (
        <section className="min-h-screen w-full bg-[#050505] flex flex-col items-center justify-center py-16 md:py-24 relative px-6 overflow-hidden">
            <div className={`absolute inset-0 bg-linear-to-b ${features[index].gradient} to-transparent opacity-20 transition-colors duration-1000`} />

            {/* HEADER SECTION WITH SCROLL REVEAL */}
            <div className="relative z-10 mb-8 text-center">
                <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: false }} transition={{ delay: 0.1 }} className="text-3xl md:text-5xl font-bold animate-glow mb-2 text-white uppercase tracking-tighter">Advanced Features</motion.h2>
                <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: false }} transition={{ delay: 0.2 }} className="text-gray-400 italic text-sm md:text-lg opacity-80">“Technology That Understands Accessibility”</motion.p>
            </div>

            <div className="relative w-full max-w-5xl group flex justify-center items-center">
                <AnimatePresence initial={false} custom={direction} mode="wait">
                    <motion.div
                        key={index}
                        custom={direction}
                        variants={slideVariants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        onClick={() => paginate(index % 2 === 0 ? -1 : 1)}
                        className={`relative cursor-pointer bg-white/[0.03] backdrop-blur-3xl border border-white/10 rounded-[30px] md:rounded-[40px] p-8 md:p-16 flex flex-col md:flex-row items-center gap-10 transition-shadow duration-500 ${features[index].color} min-h-[450px] md:min-h-[500px] w-full`}
                    >
                        {/* Slide-specific visual elements */}
                        {features[index].visual}

                        <div className="w-full md:w-1/3 flex flex-col items-center text-center relative z-10 pointer-events-none">
                            <motion.div
                                initial={{ scale: 0.8, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                transition={{ delay: 0.3 }}
                                className="p-8 md:p-10 rounded-full bg-white/5 border border-white/10 mb-6 shadow-inner"
                            >
                                {features[index].icon}
                            </motion.div>
                            <p className="text-white/30 text-[9px] font-black uppercase tracking-widest flex items-center gap-2">
                                <ChevronLeft size={12} /> Click to Swap <ChevronRight size={12} />
                            </p>
                        </div>

                        <div className="w-full md:w-2/3 relative z-10 text-left pointer-events-none">
                            <motion.h3
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.35 }}
                                className="text-2xl md:text-4xl font-black mb-6 leading-tight tracking-tight text-white uppercase italic"
                            >
                                {features[index].title}
                            </motion.h3>

                            {/* ANIMATED BULLET POINTS */}
                            <div className="grid grid-cols-1 gap-4">
                                {features[index].items.map((item, i) => (
                                    <motion.div
                                        key={`${index}-${i}`} // Composite key ensures animation restarts on slide change
                                        custom={i}
                                        variants={itemVariants}
                                        initial="hidden"
                                        animate="visible"
                                        className="flex items-start gap-4 text-gray-300 text-sm md:text-lg"
                                    >
                                        <CheckCircle2 className="text-indigo-500 mt-1 flex-shrink-0" size={18} />
                                        <span className="font-medium tracking-tight leading-snug">{item}</span>
                                    </motion.div>
                                ))}
                            </div>
                        </div>

                        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
                            {features.map((_, i) => (
                                <div key={i} className={`h-1 rounded-full transition-all duration-300 ${index === i ? "w-8 bg-white" : "w-1.5 bg-white/20"}`} />
                            ))}
                        </div>
                    </motion.div>
                </AnimatePresence>
            </div>
        </section>
    );
}

function TypewriterText({ text }) {
    const [display, setDisplay] = useState("");
    React.useEffect(() => {
        let i = 0;
        const interval = setInterval(() => {
            setDisplay(text.substring(0, i));
            i++;
            if (i > text.length) clearInterval(interval);
        }, 50);
        return () => clearInterval(interval);
    }, [text]);
    return <span>{display}</span>;
}