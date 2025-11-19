"use client";

import Hero from "@/components/dom/Hero";
import About from "@/components/dom/About";
import ProjectGallery from "@/components/dom/ProjectGallery";
import Skills from "@/components/dom/Skills";
import Contact from "@/components/dom/Contact";
import LanguageSwitcher from "@/components/dom/LanguageSwitcher";
import content from "@/data/content.json";
import { useStore } from "@/store/useStore";

export default function Home() {
  const language = useStore((state) => state.language);
  const data = content[language];

  return (
    <main className="relative">
      <LanguageSwitcher />
      <Hero data={data.hero} />
      <About data={data.about} />
      <ProjectGallery projects={data.projects} />
      <Skills data={data.skills} />
      <Contact data={data.contact} />
    </main>
  );
}
