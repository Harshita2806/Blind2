import React, { useRef } from 'react';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import {
    UserPlus,
    LayoutDashboard,
    Headphones,
    CheckCircle2,
    ArrowUpRight,
    Sparkles,
    BookOpen,
    Mic,
    BarChart3,
    ShieldCheck
} from 'lucide-react';
import TeacherImage from '../../images/Teacher.png';
 import Login from '../../images/Login.png';
import Student from '../../images/Student.png';

export default function HowItWorks() {
    const containerRef = useRef(null);

    // Tracking scroll progress for the vertical line
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start center", "end center"]
    });

    const scaleY = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    const steps = [
        {
            number: "01",
            title: "Create Your Account",
            subtitle: "Getting started is simple",
            icon: <UserPlus className="text-indigo-400" size={28} />,
            description: "Students and teachers can sign up in minutes to create personalized profiles with secure cloud synchronization.",
            features: [
                "Secure login & profile management",
                "Role-based access (Student/Teacher)",
                "Personalized learning preferences",
                "Saved progress & cloud sync"
            ],
            color: "from-indigo-500/20",
            glow: "shadow-indigo-500/10"
        },
        {
            number: "02",
            title: "Teacher Dashboard",
            subtitle: "Create Accessible Learning",
            icon: <LayoutDashboard className="text-purple-400" size={28} />,
            description: "Teachers transform traditional NCERT PDFs into fully accessible, audio-first learning experiences using our AI engine.",
            features: [
                "Automatic Math & Diagram extraction",
                "Voice-based MCQ & Quiz creation",
                "Detailed student performance analytics",
                "Audio preview before publishing"
            ],
            color: "from-purple-500/20",
            glow: "shadow-purple-500/10"
        },
        {
            number: "03",
            title: "Student Dashboard",
            subtitle: "Learn Without Barriers",
            icon: <Headphones className="text-emerald-400" size={28} />,
            description: "A structured, audio-driven environment designed specifically for independent learning and voice interaction.",
            features: [
                "Adjustable Playback (0.5x – 2x)",
                "Repeat last sentence/equation",
                "Voice-based doubt asking",
                "Adaptive progress intelligence"
            ],
            color: "from-emerald-500/20",
            glow: "shadow-emerald-500/10"
        }
    ];

    return (
        <section ref={containerRef} className="bg-[#050505] text-white py-20 px-6 relative overflow-hidden">
            {/* Background Ambient Glows */}
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-600/5 blur-[120px] rounded-full pointer-events-none" />
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-600/5 blur-[120px] rounded-full pointer-events-none" />

            {/* Header */}
            <div className="max-w-7xl mx-auto text-center mb-12 relative z-10">
                <h2 className="text-3xl md:text-6xl font-bold mb-6 tracking-tight animate-glow">How It Works</h2>
                <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto font-light leading-relaxed">
                    Our platform is designed to make learning seamless, structured, and fully accessible in just three simple steps.
                </p>
            </div>

            <div className="max-w-7xl mx-auto relative">
                {/* THE STICKY PROGRESS LINE */}
                <div className="absolute left-1/2 top-0 bottom-0 w-[2px] bg-white/5 -translate-x-1/2 hidden lg:block">
                    <motion.div
                        style={{ scaleY }}
                        className="absolute top-0 left-0 right-0 bg-gradient-to-b from-indigo-500 via-purple-500 to-emerald-500 origin-top shadow-[0_0_15px_rgba(99,102,241,0.5)]"
                    />
                </div>

                <div className="space-y-40">
                    {steps.map((step, index) => (
                        <div key={index} className={`relative flex flex-col ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-16 items-center`}>

                            {/* Step Number Bubble (Desktop) */}
                            <div className="absolute left-1/2 -translate-x-1/2 hidden lg:flex items-center justify-center z-20">
                                <motion.div
                                    initial={{ scale: 0, opacity: 0 }}
                                    whileInView={{ scale: 1, opacity: 1 }}
                                    viewport={{ margin: "-100px" }}
                                    className="w-12 h-12 rounded-full bg-[#050505] border-2 border-indigo-500 flex items-center justify-center font-bold text-indigo-400 shadow-[0_0_20px_rgba(99,102,241,0.3)]"
                                >
                                    {step.number}
                                </motion.div>
                            </div>

                            {/* Content Side */}
                            <motion.div
                                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.8, ease: "easeOut" }}
                                viewport={{ once: true, amount: 0.3 }}
                                className="w-full lg:w-[45%] space-y-8"
                            >
                                <div className="space-y-2">
                                    <div className="flex items-center gap-3">
                                        <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-indigo-400">
                                            {step.icon}
                                        </div>
                                        <h4 className="text-indigo-400 font-bold tracking-[0.2em] text-xs uppercase">{step.subtitle}</h4>
                                    </div>
                                    <h3 className="text-3xl md:text-5xl font-bold tracking-tight">{step.title}</h3>
                                </div>

                                <p className="text-gray-400 text-lg leading-relaxed font-light">
                                    {step.description}
                                </p>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    {step.features.map((feat, i) => (
                                        <motion.div
                                            key={i}
                                            initial={{ opacity: 0, y: 10 }}
                                            whileInView={{ opacity: 1, y: 0 }}
                                            transition={{ delay: i * 0.1 }}
                                            className="flex items-start gap-3 group"
                                        >
                                            <CheckCircle2 size={18} className="text-indigo-500 mt-1 shrink-0 group-hover:scale-110 transition-transform" />
                                            <span className="text-sm text-gray-300 font-medium leading-tight">{feat}</span>
                                        </motion.div>
                                    ))}
                                </div>
                            </motion.div>

                            {/* Visual Grid Side */}
                            <motion.div
                                initial={{ opacity: 0, scale: 0.8, rotateY: index % 2 === 0 ? 10 : -10 }}
                                whileInView={{ opacity: 1, scale: 1, rotateY: 0 }}
                                transition={{ duration: 1, ease: "circOut" }}
                                viewport={{ once: true, amount: 0.2 }}
                                className={`w-full lg:w-[45%] aspect-[4/3] rounded-[40px] bg-gradient-to-br ${step.color} to-transparent border border-white/10 relative overflow-hidden group shadow-2xl ${step.glow} perspective-1000`}
                            >

                                {/* --- STEP 1 IMAGE (Index 0) --- */}
                                {index === 0 && (
                                    <img
                                        // REPLACE 'TeacherImage' WITH YOUR IMPORTED IMAGE VARIABLE (e.g., StepOneImage)
                                        src={Login}
                                        alt="Create Account Preview"
                                        className="absolute inset-0 w-full h-full object-scale-down transition-transform duration-700 group-hover:scale-105 z-0"
                                    />
                                )}

                                {/* --- STEP 2 IMAGE (Index 1) --- */}
                                {index === 1 && (
                                    <img
                                        src={TeacherImage}
                                        alt="Teacher Dashboard Preview"
                                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 z-0"
                                    />
                                )}

                                {/* --- STEP 3 IMAGE (Index 2) --- */}
                                {index === 2 && (
                                    <img
                                        // REPLACE 'TeacherImage' WITH YOUR IMPORTED IMAGE VARIABLE (e.g., StepThreeImage)
                                        src={Student}
                                        alt="Student Dashboard Preview"
                                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 z-0"
                                    />
                                )}

                                {/* Overlay: Darkens image slightly, fades on hover */}
                                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/10 transition-all duration-700 z-10" />

                                {/* Floating UI Elements for Step 2 & 3 feel */}
                                {index === 1 && (
                                    <div className="absolute bottom-8 right-8 p-4 rounded-2xl bg-black/60 backdrop-blur-md border border-white/10 hidden md:block animate-pulse z-20">
                                        <BarChart3 className="text-purple-400" size={24} />
                                    </div>
                                )}
                                {index === 2 && (
                                    <div className="absolute top-8 left-8 p-4 rounded-2xl bg-black/60 backdrop-blur-md border border-white/10 hidden md:block animate-bounce z-20">
                                        <Mic className="text-emerald-400" size={24} />
                                    </div>
                                )}
                            </motion.div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}