"use client";

import { useStore } from "@/store/useStore";

export default function LanguageSwitcher() {
    const language = useStore((state) => state.language);
    const setLanguage = useStore((state) => state.setLanguage);

    return (
        <button
            onClick={() => setLanguage(language === "fr" ? "en" : "fr")}
            className="fixed top-8 right-8 z-[100] font-mono text-sm font-bold text-light mix-blend-exclusion hover:opacity-70 transition-opacity"
            data-cursor="hover"
        >
            {language === "fr" ? "EN" : "FR"}
        </button>
    );
}
