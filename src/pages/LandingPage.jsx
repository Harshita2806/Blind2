import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
// Added Link for navigation
import { Link } from 'react-router-dom';
import {
    BookOpen,
    ArrowRight,
    Sparkles,
    AlertCircle,
    Headphones,
    Waves,
    Users,
    Library,
    Heart,

} from 'lucide-react';

// Assets
import heroImage from '../images/image.png';
import probImage from '../images/image2.png';
import solImage from '../images/image3.png';
import FeatureSection from '../components/Hero/FeatureSection';
import HowItWorks from '../components/Hero/HowItWorks';
import AboutSection from '../components/Hero/AboutSection';
import IntelligentFlowSection from '../components/Hero/IntelligentFlowSection';
import { ContactSection, Footer } from '../components/Hero/ContactFooter';


// --- ANIMATION VARIANTS ---
const springTransition = {
    type: "spring",
    stiffness: 100,
    damping: 20,
    mass: 1
};

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.12, delayChildren: 0.3 }
    }
};

const wordVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
};

const badgeVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } }
};

export default function LandingPage() {
    return (
        <div className="bg-[#050505] text-white font-sans selection:bg-indigo-500/30 h-screen overflow-y-scroll snap-y snap-mandatory scroll-smooth no-scrollbar">
            <style>{`
                .no-scrollbar::-webkit-scrollbar { display: none; }
                .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
                
                @keyframes glow {
                    0%, 100% { text-shadow: 0 0 10px rgba(99, 102, 241, 0.2), 0 0 20px rgba(99, 102, 241, 0.2); }
                    50% { text-shadow: 0 0 20px rgba(99, 102, 241, 0.6), 0 0 40px rgba(99, 102, 241, 0.4); }
                }
                .animate-glow { animation: glow 3s ease-in-out infinite; }
                .perspective-1000 { perspective: 1000px; }
            `}</style>

            <Header />

            <div className="snap-start"><HeroSection /></div>
            <ProblemSolution />
            <ImpactSlides />

            {/* Added ID for Features navigation */}
            <div id="features" className="snap-start">
                <FeatureSection />
            </div>

            {/* Added ID for How It Works navigation */}
            <div id="how-it-works" className="snap-start">
                <HowItWorks />
            </div>

            <div className="snap-start">
                <IntelligentFlowSection />
            </div>

            {/* Added ID for About navigation */}
            <div id="about" className="snap-start">
                <AboutSection />
            </div>

            {/* Added ID for Contact navigation */}
            <div id="contact" className="snap-start">
                <ContactSection />
                <Footer />
            </div>

        </div>
    );
}


// --- IMPACT SLIDES SECTION ---
function ImpactSlides() {
    const slides = [
        {
            icon: <Users className="text-indigo-500 mb-6" size={48} />,
            title: "10,000+ Blind & Visually Impaired Learners Supported",
            desc: "Building independence through accessible education.",
            bg: "bg-indigo-600/5"
        },
        {
            icon: <Library className="text-indigo-500 mb-6" size={48} />,
            title: "500+ Audio-Based Courses Available",
            desc: "From academics to skill development — fully narrated and accessible.",
            bg: "bg-purple-600/5"
        },
        {
            icon: <Heart className="text-indigo-500 mb-6" size={48} />,
            title: "98% Learner Satisfaction Rate",
            desc: "Because accessibility isn’t an add-on — it’s our foundation.",
            bg: "bg-blue-600/5"
        }
    ];

    return (
        <>
            {slides.map((slide, index) => (
                <section key={index} className={`snap-start h-screen w-full flex flex-col items-center justify-center px-6 relative overflow-hidden ${slide.bg}`}>
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-500/10 blur-[120px] rounded-full z-0" />
                    <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} viewport={{ amount: 0.5 }} className="relative z-10 text-center max-w-4xl">
                        <div className="flex justify-center">{slide.icon}</div>
                        <h2 className="text-4xl md:text-7xl font-bold mb-8 tracking-tight animate-glow leading-tight">{slide.title}</h2>
                        <p className="text-xl md:text-2xl text-gray-400 font-light">{slide.desc}</p>
                        <motion.div initial={{ width: 0 }} whileInView={{ width: "100px" }} className="h-1 bg-indigo-500 mx-auto mt-12 rounded-full shadow-[0_0_15px_rgba(99,102,241,0.5)]" />
                    </motion.div>
                </section>
            ))}
        </>
    );
}

// --- HEADER ---
function Header() {
    const [isOpen, setIsOpen] = useState(false);

    // Updated navLinks to include both section slugs and explicit paths
    const navLinks = [
        { name: "About", slug: "about" },
        { name: "Features", slug: "features" },
        { name: "How It Works", slug: "how-it-works" },
        { name: "Contact", slug: "contact" },
        { name: "Teacher", path: "/teacher" }, // Route path
        { name: "Student", path: "/student" }  // Route path
    ];

    return (
        <motion.header
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            className="fixed top-0 left-0 right-0 z-50 bg-brand-bg/80 backdrop-blur-lg border-b border-white/5"
        >
            <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
                <a href="/" className="flex items-center gap-2 text-brand-primary font-bold text-xl">
                    <BookOpen size={24} />
                    <span>AccessLearn</span>
                </a>

                <nav className="hidden md:flex items-center gap-8">
                    {navLinks.map(link => {
                        // If link has a 'path', use React Router Link
                        if (link.path) {
                            return (
                                <Link
                                    key={link.name}
                                    to={link.path}
                                    className="text-gray-300 hover:text-white transition-colors text-sm font-medium"
                                >
                                    {link.name}
                                </Link>
                            );
                        }
                        // Otherwise use anchor tag for section scrolling
                        return (
                            <a
                                key={link.name}
                                href={`#${link.slug}`}
                                className="text-gray-300 hover:text-white transition-colors text-sm font-medium"
                            >
                                {link.name}
                            </a>
                        );
                    })}
                </nav>

                {/* Single Login Button */}
                <div className="hidden md:flex items-center gap-4">
                    <Link
                        to="/auth"
                        className="bg-brand-primary px-5 py-2 rounded-lg text-sm font-semibold hover:brightness-110 transition-all text-white"
                    >
                        Login
                    </Link>
                </div>
            </div>
        </motion.header>
    );
}

function HeroSection() {
    const titlePart1 = "Accessible Learning,".split(" ");
    const titlePart2 = "Powered by AI".split(" ");
    return (
        <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
            <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-indigo-600/10 blur-[120px] rounded-full" />
            <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
                <motion.div initial="hidden" animate="visible" variants={containerVariants}>
                    <motion.div variants={badgeVariants} className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-bold mb-6"><Sparkles size={14} /> NEW: AI MATH NARRATION</motion.div>
                    <h1 className="text-5xl lg:text-7xl font-bold leading-[1.1] mb-6 flex flex-wrap">
                        {titlePart1.map((word, i) => (<motion.span key={`p1-${i}`} variants={wordVariants} className="inline-block mr-3">{word}</motion.span>))}
                        <span className="text-indigo-500 flex flex-wrap">{titlePart2.map((word, i) => (<motion.span key={`p2-${i}`} variants={wordVariants} className="inline-block mr-3">{word}</motion.span>))}</span>
                    </h1>
                    <motion.p variants={wordVariants} className="text-gray-400 text-lg mb-8 max-w-lg">Breaking digital barriers for visually impaired students.</motion.p>
                    <motion.div variants={wordVariants}><button className="bg-white text-black px-8 py-4 rounded-2xl font-bold flex items-center gap-2 hover:bg-indigo-500 hover:text-white transition-all">Start Learning <ArrowRight size={20} /></button></motion.div>
                </motion.div>
                <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1 }} className="rounded-[40px] border border-white/10 overflow-hidden bg-[#111] hidden lg:block"><img src={heroImage} alt="App Interface" className="w-full h-auto" /></motion.div>
            </div>
        </section>
    );
}

function ProblemSolution() {
    const rowVariants = { hiddenLeft: { opacity: 0, x: -60 }, hiddenRight: { opacity: 0, x: 60 }, visible: { opacity: 1, x: 0 } };
    return (
        <>
            <section className="snap-start h-screen w-full flex flex-col items-center justify-center bg-[#050505] px-6 no-scrollbar">
                <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} className="mb-10 text-center">
                    <h2 className="text-4xl md:text-5xl font-bold italic">Inclusive <span className="text-indigo-500">By Design</span></h2>
                </motion.div>
                <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 gap-8 h-[65vh]">
                    <motion.div variants={rowVariants} initial="hiddenLeft" whileInView="visible" transition={springTransition} viewport={{ once: false, amount: 0.4 }} className="bg-white/5 backdrop-blur-lg border border-white/10 p-10 rounded-[40px] flex flex-col justify-center transform-gpu">
                        <AlertCircle className="text-red-200 mb-6" size={40} />
                        <h3 className="text-3xl font-bold mb-4 uppercase">The Barrier</h3>
                        <p className="text-gray-400 text-lg leading-relaxed">Traditional e-learning is 90% visual. Without sight, students encounter "Digital Walls".</p>
                    </motion.div>
                    <motion.div variants={rowVariants} initial="hiddenRight" whileInView="visible" transition={springTransition} viewport={{ once: false, amount: 0.4 }} className="relative rounded-[40px] overflow-hidden border border-white/10"><img src={probImage} className="absolute inset-0 w-full h-full object-fill grayscale opacity-50" alt="The Problem" /></motion.div>
                </div>
            </section>
            <section className="snap-start h-screen w-full flex items-center justify-center bg-[#050505] px-6 no-scrollbar">
                <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 gap-8 h-[65vh]">
                    <motion.div variants={rowVariants} initial="hiddenLeft" whileInView="visible" transition={springTransition} viewport={{ once: false, amount: 0.4 }} className="relative rounded-[40px] overflow-hidden border border-indigo-500/30">
                        <img src={solImage} className="absolute inset-0 w-full h-full object-fill" alt="The Solution" />
                        <div className="absolute inset-0 bg-indigo-600/20 mix-blend-overlay" />
                    </motion.div>
                    <motion.div variants={rowVariants} initial="hiddenRight" whileInView="visible" transition={springTransition} viewport={{ once: false, amount: 0.4 }} className="bg-indigo-600/10 backdrop-blur-lg border border-indigo-500/20 p-10 rounded-[40px] flex flex-col justify-center transform-gpu">
                        <Headphones className="text-indigo-400 mb-6" size={40} />
                        <h3 className="text-3xl font-bold mb-4 uppercase">The Bridge</h3>
                        <p className="text-gray-400 text-lg leading-relaxed mb-8">We use AI to convert visual complexity into spatial audio and narrated formulas.</p>
                        <div className="flex gap-4">
                            <span className="flex items-center gap-2 text-xs font-black bg-white/5 px-4 py-2 rounded-full"><Waves size={16} /> SONIC SYNC</span>
                            <span className="flex items-center gap-2 text-xs font-black bg-white/5 px-4 py-2 rounded-full"><Sparkles size={16} /> AI NARRATOR</span>
                        </div>
                    </motion.div>
                </div>
            </section>
        </>
    );
}