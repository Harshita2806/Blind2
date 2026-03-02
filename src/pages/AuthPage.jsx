import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BookOpen } from "lucide-react";

import s1 from "../assets/s1.png";
import s2 from "../assets/s2.png";
import s3 from "../assets/s3.png";

const carouselData = [
    {
        url: s1,
        text: "Inclusive education for all learners",
        sub: "Empowering every student's journey",
    },
    {
        url: s2,
        text: "Learn through AI-powered audio experiences",
        sub: "Advanced narration for every subject",
    },
    {
        url: s3,
        text: "Accessible tools for a brighter future",
        sub: "Designed specifically for accessibility",
    },
];

export default function AuthPage() {
    const [isLogin, setIsLogin] = useState(true);
    const [index, setIndex] = useState(0);
    const [role, setRole] = useState("student");

    useEffect(() => {
        const timer = setInterval(() => {
            setIndex((prev) => (prev + 1) % carouselData.length);
        }, 5000);
        return () => clearInterval(timer);
    }, []);

    return (
        <div className="h-screen w-screen bg-brand-bg font-main text-white overflow-hidden flex items-center justify-center">
            <div className="w-full h-full flex flex-col lg:flex-row overflow-hidden relative">
                <AnimatePresence mode="popLayout" initial={false}>
                    <motion.div
                        key={isLogin ? "login-view" : "signup-view"}
                        initial={{ opacity: 0, x: isLogin ? -50 : 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: isLogin ? 50 : -50 }}
                        transition={{ duration: 0.5, ease: "easeInOut" }}
                        className={`flex w-full h-full ${isLogin ? "lg:flex-row" : "lg:flex-row-reverse"
                            }`}
                    >
                        {/* FORM SECTION */}
                        <div className="w-full lg:w-1/2 h-full flex flex-col items-center justify-center p-6 sm:p-10 lg:p-16 overflow-y-auto no-scrollbar">
                            <div className="w-full max-w-100">
                                <div className="flex items-center gap-2 text-brand-primary font-bold text-xl mb-10">
                                    <BookOpen size={24} />
                                    <span>AccessLearn</span>
                                </div>

                                {isLogin ? (
                                    <div className="space-y-6">
                                        <div>
                                            <h1 className="text-3xl font-bold font-sans tracking-normal mb-2 text-white">
                                                Welcome Back
                                            </h1>
                                            <p className="font-sans text-gray-300 text-base tracking-wide">
                                                Log in to continue your learning journey
                                            </p>
                                        </div>

                                        <div className="space-y-5">
                                            <InputBlock
                                                label="Email"
                                                type="email"
                                                placeholder="you@example.com"
                                            />

                                            <div className="relative">
                                                <InputBlock
                                                    label="Password"
                                                    type="password"
                                                    placeholder="Enter password"
                                                />
                                                <button className="absolute top-0 right-0 text-xs text-brand-primary hover:underline cursor-pointer font-medium">
                                                    Forgot?
                                                </button>
                                            </div>

                                            <button className="w-full bg-brand-primary text-white py-3.5 rounded-xl font-semibold text-base mt-2 hover:brightness-110 active:scale-[0.98] transition-all shadow-lg">
                                                Log In
                                            </button>
                                        </div>

                                        <p className="text-center text-gray-400 text-sm mt-8">
                                            Don't have an account?
                                            <button
                                                onClick={() => setIsLogin(false)}
                                                className="text-brand-primary font-semibold hover:underline cursor-pointer ml-1"
                                            >
                                                Sign up
                                            </button>
                                        </p>
                                    </div>
                                ) : (
                                    <div className="space-y-6">
                                        <div>
                                            <h1 className="text-4xl font-bold font-sans tracking-wide mb-2 text-white">
                                                Create Account
                                            </h1>
                                            <p className="text-gray-400 text-base">
                                                Join our accessible learning platform
                                            </p>
                                        </div>

                                        <div className="space-y-4">
                                            <InputBlock
                                                label="Full Name"
                                                type="text"
                                                placeholder="Enter your full name"
                                            />
                                            <InputBlock
                                                label="Email"
                                                type="email"
                                                placeholder="you@example.com"
                                            />
                                            <InputBlock
                                                label="Password"
                                                type="password"
                                                placeholder="Create a password"
                                            />

                                            <div className="space-y-2 pt-1">
                                                <label className="text-xs font-medium text-gray-300 ml-1">
                                                    I am a
                                                </label>

                                                <div className="grid grid-cols-2 gap-3">
                                                    <button
                                                        onClick={() => setRole("student")}
                                                        className={`py-3 rounded-xl text-sm font-medium transition-all border-2 ${role === "student"
                                                                ? "bg-brand-input border-brand-primary text-white"
                                                                : "bg-transparent border-white/10 text-gray-400 hover:border-white/20"
                                                            }`}
                                                    >
                                                        Student
                                                    </button>

                                                    <button
                                                        onClick={() => setRole("teacher")}
                                                        className={`py-3 rounded-xl text-sm font-medium transition-all border-2 ${role === "teacher"
                                                                ? "bg-brand-input border-brand-primary text-white"
                                                                : "bg-transparent border-white/10 text-gray-400 hover:border-white/20"
                                                            }`}
                                                    >
                                                        Teacher
                                                    </button>
                                                </div>
                                            </div>

                                            <button className="w-full bg-brand-primary text-white py-3.5 rounded-xl font-semibold text-base mt-2 hover:brightness-110 transition-all shadow-lg">
                                                Create Account
                                            </button>
                                        </div>

                                        <p className="text-center text-gray-400 text-sm mt-6">
                                            Already have an account?
                                            <button
                                                onClick={() => setIsLogin(true)}
                                                className="text-brand-primary font-semibold hover:underline cursor-pointer ml-1"
                                            >
                                                Log in
                                            </button>
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* CAROUSEL SECTION */}
                        <div className="hidden lg:flex w-1/2 h-full">
                            <div className="h-full w-full relative overflow-hidden bg-brand-bg">
                                <AnimatePresence mode="wait">
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, scale: 1.05 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.95 }}
                                        transition={{ duration: 0.8 }}
                                        className="absolute inset-0"
                                    >
                                        <img
                                            src={carouselData[index].url}
                                            alt=""
                                            className="w-full h-full object-cover"
                                        />

                                        <div className="absolute inset-0 bg-linear-to-t from-brand-bg via-transparent to-transparent opacity-80" />

                                        <div className="absolute bottom-12 left-10 right-10">
                                            <h2 className="text-3xl font-bold mb-3 leading-tight font-welcome tracking-tight">
                                                {carouselData[index].text}
                                            </h2>

                                            <p className="text-gray-300 text-base mb-8">
                                                {carouselData[index].sub}
                                            </p>

                                            <div className="flex gap-2">
                                                {carouselData.map((_, i) => (
                                                    <div
                                                        key={i}
                                                        className={`h-1.5 rounded-full transition-all duration-300 ${i === index
                                                                ? "w-8 bg-brand-primary"
                                                                : "w-4 bg-white/30"
                                                            }`}
                                                    />
                                                ))}
                                            </div>
                                        </div>
                                    </motion.div>
                                </AnimatePresence>
                            </div>
                        </div>
                    </motion.div>
                </AnimatePresence>
            </div>
        </div>
    );
}

function InputBlock({ label, type, placeholder }) {
    return (
        <div className="space-y-1.5">
            <label className="text-xs font-medium text-gray-400 block ml-1">
                {label}
            </label>
            <input
                type={type}
                placeholder={placeholder}
                className="w-full bg-brand-input border border-white/10 rounded-xl px-4 py-3 focus:ring-1 focus:ring-brand-primary focus:border-transparent outline-none transition-all placeholder:text-gray-600 text-white text-sm"
                aria-label={label}
            />
        </div>
    );
}