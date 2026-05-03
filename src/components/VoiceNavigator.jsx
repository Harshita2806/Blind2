import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useVoice } from '../context/VoiceContext';
import { useAuth } from '../context/AuthContext';

/**
 * VoiceNavigator is a "headless" component that handles global voice commands
 * and announces page transitions.
 */
const VoiceNavigator = () => {
    const { lastCommand, speak } = useVoice();
    const navigate = useNavigate();
    const location = useLocation();
    const { user, logout } = useAuth();

    // 1. Handle Navigation Commands
    useEffect(() => {
        if (!lastCommand) return;

        const cmd = lastCommand.toLowerCase();
        console.log('Voice Navigator handling command:', cmd);

        // Navigation Commands (Flexible)
        if (cmd.match(/(go|back|open).*home|landing/)) {
            speak("Navigating to home page");
            navigate('/');
        }
        else if (cmd.match(/(go|back|open).*dashboard/)) {
            if (user) {
                speak(`Navigating to your dashboard`);
                navigate(user.role === 'teacher' ? '/teacher' : '/student');
            } else {
                speak("Please login first to access your dashboard.");
            }
        }
        else if (cmd.match(/(go|back|open).*login|sign in/)) {
            speak("Navigating to login page");
            navigate('/login');
        }
        else if (cmd.match(/(go|back|open).*signup|register|create account/)) {
            speak("Navigating to signup page");
            navigate('/signup');
        }
        else if (cmd.match(/logout|sign out|exit/)) {
            speak("Logging you out");
            logout();
            navigate('/');
        }
        
        // Help Commands
        else if (cmd.match(/commands|help|what.*say/)) {
            speak("Available commands include: Go home, Go to dashboard, Login, Logout, and Where am I.");
        }
        
        // State Commands
        else if (cmd.match(/where.*i|current page/)) {
            announceCurrentPage();
        }

    }, [lastCommand, navigate, user, logout, speak]);

    // 2. Announce Page Transitions
    useEffect(() => {
        announceCurrentPage();
    }, [location.pathname]);

    const announceCurrentPage = () => {
        const path = location.pathname;
        if (path === '/') speak("You are on the Home Page.");
        else if (path === '/auth' || path === '/login') speak("You are on the Login Page.");
        else if (path === '/signup') speak("You are on the Signup Page.");
        else if (path === '/student') speak("You are on the Student Dashboard.");
        else if (path === '/teacher') speak("You are on the Teacher Dashboard.");
        else if (path.startsWith('/quiz/')) speak("You are on the Quiz Page.");
    };

    return null; // This component doesn't render anything
};

export default VoiceNavigator;
