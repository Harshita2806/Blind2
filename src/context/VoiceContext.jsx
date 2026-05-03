import React, { createContext, useContext, useEffect, useState, useCallback, useRef } from 'react';

const VoiceContext = createContext();

export const useVoice = () => useContext(VoiceContext);

/**
 * VoiceProvider handles both Speech Synthesis (Speaking) and Speech Recognition (Listening)
 */
export const VoiceProvider = ({ children }) => {
    const [isListening, setIsListening] = useState(false);
    const [transcript, setTranscript] = useState('');
    const [lastCommand, setLastCommand] = useState('');
    const recognitionRef = useRef(null);
    const [isSupported, setIsSupported] = useState(true);
    const [isVoiceEnabled, setIsVoiceEnabled] = useState(localStorage.getItem('voice-nav-enabled') === 'true');

    // Auditory Feedback (TTS)
    const speak = useCallback((text) => {
        if (!window.speechSynthesis) return;
        
        // Cancel any pending speech to avoid queuing delays
        window.speechSynthesis.cancel();
        
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.rate = 1.0;
        utterance.pitch = 1.0;
        utterance.volume = 1.0;
        
        // Voice selection (optional: try to find a natural voice)
        const voices = window.speechSynthesis.getVoices();
        const preferredVoice = voices.find(v => v.name.includes('Google') || v.name.includes('Natural')) || voices[0];
        if (preferredVoice) utterance.voice = preferredVoice;

        window.speechSynthesis.speak(utterance);
    }, []);

    // Speech Recognition Setup
    useEffect(() => {
        const Recognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        if (!Recognition) {
            console.error('Speech recognition is not supported in this browser.');
            setIsSupported(false);
            return;
        }

        const recognition = new Recognition();
        recognition.continuous = true;
        recognition.interimResults = false; // Only final results for commands
        recognition.lang = 'en-US';

        recognition.onstart = () => setIsListening(true);
        recognition.onend = () => {
            setIsListening(false);
            // Auto-restart logic if enabled
            if (localStorage.getItem('voice-nav-enabled') === 'true') {
                try { recognition.start(); } catch (e) { /* already started */ }
            }
        };

        recognition.onresult = (event) => {
            let command = event.results[event.results.length - 1][0].transcript.trim().toLowerCase();
            
            // Normalize email symbols
            command = command
                .replace(/\bat the rate\b/g, "@")
                .replace(/\bat rate\b/g, "@")
                .replace(/\bdot\b/g, ".");
                
            setTranscript(command);
            setLastCommand(command);
            
            // Clear the command after processing it (or let consumers handle it)
            setTimeout(() => setLastCommand(''), 2000);
        };

        recognition.onerror = (event) => {
            console.error('Speech recognition error:', event.error);
            if (event.error === 'not-allowed') {
                setIsSupported(false);
            }
        };

        recognitionRef.current = recognition;

        // Start listening if enabled in localStorage
        if (localStorage.getItem('voice-nav-enabled') === 'true') {
            try {
                recognition.start();
            } catch (e) {
                console.warn('Initial recognition start failed:', e);
            }
        }

        return () => {
            if (recognitionRef.current) recognitionRef.current.stop();
        };
    }, []);

    const toggleVoice = useCallback(() => {
        if (!recognitionRef.current) {
            if (!isSupported) {
                speak("Speech recognition is not supported in this browser.");
            }
            return;
        }

        if (isVoiceEnabled) {
            localStorage.setItem('voice-nav-enabled', 'false');
            setIsVoiceEnabled(false);
            try {
                recognitionRef.current.stop();
            } catch (e) {
                console.warn('Stop failed:', e);
            }
            speak("Voice commands disabled.");
        } else {
            localStorage.setItem('voice-nav-enabled', 'true');
            setIsVoiceEnabled(true);
            try {
                recognitionRef.current.start();
                speak("Voice commands enabled. How can I help you?");
            } catch (e) {
                console.error('Start failed:', e);
                speak("Could not start voice recognition. Please check your microphone permissions.");
                setIsVoiceEnabled(false);
                localStorage.setItem('voice-nav-enabled', 'false');
            }
        }
    }, [isVoiceEnabled, isSupported, speak]);

    return (
        <VoiceContext.Provider value={{ 
            isListening, 
            isVoiceEnabled,
            transcript, 
            lastCommand, 
            isSupported,
            speak, 
            toggleVoice 
        }}>
            {children}
        </VoiceContext.Provider>
    );
};
