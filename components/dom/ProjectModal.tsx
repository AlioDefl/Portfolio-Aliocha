"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { useStore } from "@/store/useStore";

interface Project {
    id: number;
    title: string;
    category: string;
    year: string;
    description: string;
    challenges?: string;
    learnings?: string;
    impact?: string;
    image: string;
    tech: string[];
}

interface ProjectModalProps {
    project: Project;
    onClose: () => void;
}

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
    const modalRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const setCursorVariant = useStore((state) => state.setCursorVariant);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Animate modal in
            gsap.fromTo(
                modalRef.current,
                { opacity: 0 },
                { opacity: 1, duration: 0.5, ease: "power2.out" }
            );

            gsap.fromTo(
                contentRef.current,
                { y: 50, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.6, delay: 0.2, ease: "power3.out" }
            );
        });

        // Lock body scroll
        document.body.style.overflow = "hidden";

        return () => {
            ctx.revert();
            document.body.style.overflow = "";
        };
    }, []);

    const handleClose = () => {
        gsap.to(modalRef.current, {
            opacity: 0,
            duration: 0.4,
            ease: "power2.in",
            onComplete: onClose,
        });
    };

    return (
        <div
            ref={modalRef}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-dark/90 backdrop-blur-sm p-4 md:p-8"
            onClick={handleClose}
        >
            <div
                ref={contentRef}
                className="bg-dark border border-light/10 w-full max-w-4xl max-h-[90vh] overflow-y-auto relative"
                onClick={(e) => e.stopPropagation()}
                onMouseEnter={() => setCursorVariant("default")}
            >
                {/* Close button */}
                <button
                    onClick={handleClose}
                    className="absolute top-6 right-6 z-20 text-light/50 hover:text-light transition-colors"
                >
                    CLOSE [X]
                </button>

                <div className="grid md:grid-cols-2 gap-8">
                    {/* Image Section */}
                    <div className="relative h-64 md:h-full min-h-[300px]">
                        <img
                            src={project.image}
                            alt={project.title}
                            className="absolute inset-0 w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-dark to-transparent opacity-50" />
                    </div>

                    {/* Content Section */}
                    <div className="p-8 md:p-12 space-y-8">
                        <div>
                            <div className="flex items-center gap-4 mb-4 font-mono text-xs text-light/60">
                                <span>{project.category}</span>
                                <span className="w-1 h-1 bg-light/60 rounded-full" />
                                <span>{project.year}</span>
                            </div>
                            <h2 className="font-display text-4xl md:text-5xl font-bold text-light mb-6 tracking-tight leading-none">
                                {project.title}
                            </h2>
                            <div className="flex flex-wrap gap-2 mb-8">
                                {project.tech.map((tech, idx) => (
                                    <span
                                        key={idx}
                                        className="px-3 py-1 border border-light/20 font-mono text-xs text-light/80"
                                    >
                                        {tech}
                                    </span>
                                ))}
                            </div>
                        </div>

                        <div className="space-y-6 font-mono text-sm text-light/80 leading-relaxed">
                            <div>
                                <h3 className="text-accent text-xs tracking-widest mb-2 uppercase">Description</h3>
                                <p>{project.description}</p>
                            </div>

                            {project.challenges && (
                                <div>
                                    <h3 className="text-accent text-xs tracking-widest mb-2 uppercase">Défis Relevés</h3>
                                    <p>{project.challenges}</p>
                                </div>
                            )}

                            {project.learnings && (
                                <div>
                                    <h3 className="text-accent text-xs tracking-widest mb-2 uppercase">Apprentissages</h3>
                                    <p>{project.learnings}</p>
                                </div>
                            )}

                            {project.impact && (
                                <div>
                                    <h3 className="text-accent text-xs tracking-widest mb-2 uppercase">Ce que ça m'a apporté</h3>
                                    <p>{project.impact}</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
