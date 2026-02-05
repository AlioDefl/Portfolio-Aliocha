"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { useStore } from "@/store/useStore";

export default function Lights() {
    const lightRef = useRef<HTMLDivElement>(null);
    const mouse = useStore((state) => state.mouse);
    const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });

    // Track window size for coordinate conversion
    useEffect(() => {
        const updateWindowSize = () => {
            setWindowSize({ width: window.innerWidth, height: window.innerHeight });
        };

        updateWindowSize();
        window.addEventListener("resize", updateWindowSize);
        return () => window.removeEventListener("resize", updateWindowSize);
    }, []);

    useEffect(() => {
        if (lightRef.current && windowSize.width > 0) {
            // Convert normalized mouse coordinates (-1 to 1) to screen coordinates
            const screenX = ((mouse.x + 1) / 2) * windowSize.width;
            const screenY = ((-mouse.y + 1) / 2) * windowSize.height;

            // Smoothly follow mouse
            gsap.to(lightRef.current, {
                x: screenX,
                y: screenY,
                duration: 1.5, // Laggy/smooth feel
                ease: "power3.out",
            });
        }
    }, [mouse, windowSize]);

    return (
        <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
            {/* Mouse Spotlight */}
            <div
                ref={lightRef}
                className="absolute top-0 left-0 w-[800px] h-[800px] -translate-x-1/2 -translate-y-1/2 bg-accent/5 rounded-full blur-[100px] opacity-50 mix-blend-screen"
            />

            {/* Static Ambient Glows */}
            <div className="absolute top-[-10%] right-[-10%] w-[600px] h-[600px] bg-purple-500/5 rounded-full blur-[120px] animate-pulse" />
            <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[100px] animate-pulse delay-1000" />
        </div>
    );
}
