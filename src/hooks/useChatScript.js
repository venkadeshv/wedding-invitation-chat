import { useState, useEffect, useRef } from 'react';



export const useChatScript = (script) => {
    const [messages, setMessages] = useState([]);
    const [currentStep, setCurrentStep] = useState(0);
    const [isTyping, setIsTyping] = useState(false);
    const [typingSender, setTypingSender] = useState('');

    const audioCtxRef = useRef(null);

    const playPopSound = () => {
        try {
            const AudioContext = window.AudioContext || window.webkitAudioContext;
            if (!AudioContext) return;

            if (!audioCtxRef.current) {
                audioCtxRef.current = new AudioContext();
            }

            const ctx = audioCtxRef.current;
            if (ctx.state === 'suspended') {
                ctx.resume();
            }

            const osc = ctx.createOscillator();
            const gain = ctx.createGain();

            osc.type = 'sine';

            // Softer "glassy" pop sound
            const now = ctx.currentTime;

            osc.frequency.setValueAtTime(600, now);
            osc.frequency.exponentialRampToValueAtTime(300, now + 0.15); // Slower ramp

            gain.gain.setValueAtTime(0, now);
            gain.gain.linearRampToValueAtTime(0.04, now + 0.02); // Quick fade in
            gain.gain.exponentialRampToValueAtTime(0.001, now + 0.15); // Smooth fade out

            osc.connect(gain);
            gain.connect(ctx.destination);

            osc.start();
            osc.stop(now + 0.2);
        } catch (e) {
            console.error("Audio play failed", e);
        }
    };

    const playSound = () => {
        playPopSound();
    };

    useEffect(() => {
        if (currentStep >= script.length) return;

        const step = script[currentStep];
        let timeout;

        // Show typing indicator before message if it's a text message
        if (step.type === 'text') {
            setIsTyping(true);
            setTypingSender(step.sender);
            timeout = setTimeout(() => {
                setIsTyping(false);
                setMessages((prev) => [...prev, step]);
                setCurrentStep((prev) => prev + 1);
                playSound();
            }, step.delay);
        } else {
            // System messages or others directly appear after delay
            timeout = setTimeout(() => {
                setMessages((prev) => [...prev, step]);
                setCurrentStep((prev) => prev + 1);
                if (step.type !== 'system') playSound(); // Don't play for system messages usually, but maybe for images?
            }, step.delay);
        }

        return () => clearTimeout(timeout);
    }, [currentStep, script]);

    return { messages, isTyping, typingSender };
};
