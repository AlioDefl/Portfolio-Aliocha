"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { useStore } from "@/store/useStore";

export default function Lights() {
    const lightRef = useRef<HTMLDivElement>(null);
    const mouse = useStore((state) => state.mouse);

    useEffect(() => {
        if (lightRef.current) {
            // Smoothly follow mouse
            gsap.to(lightRef.current, {
                x: mouse.x,
                y: mouse.y,
                duration: 1.5, // Laggy/smooth feel
                ease: "power3.out",
            });
        }
    }, [mouse]);

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
