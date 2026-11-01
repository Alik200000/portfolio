import React, { useState, useEffect } from 'react';
import { Navbar } from './portfolio/components/Navbar';
import { Hero } from './portfolio/components/Hero';
import { StatsCounter } from './portfolio/components/StatsCounter';
import { ProjectsShowcase } from './portfolio/components/ProjectsShowcase';
import { TechUniverse } from './portfolio/components/TechUniverse';
import { JourneyTimeline } from './portfolio/components/JourneyTimeline';
import { ContactSection } from './portfolio/components/ContactSection';
import { Footer } from './portfolio/components/Footer';
import { ScrollProgressBar } from './portfolio/components/ScrollProgressBar';
import { InteractiveBackground } from './portfolio/components/InteractiveBackground';
import { InteractiveTerminal } from './portfolio/components/InteractiveTerminal';

export function App() {
  const [mousePos, setMousePos] = useState({ x: -500, y: -500 });

  // Ambient mouse follower for specular lighting
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="min-h-screen bg-[#05060A] text-slate-100 selection:bg-cyan-500 selection:text-white relative overflow-x-hidden font-sans">
      {/* 1. Neon Top Scroll Progress Bar */}
      <ScrollProgressBar />

      {/* 2. Interactive Reactive Particle & Constellation Background */}
      <InteractiveBackground />

      {/* 3. Ambient Spotlight Mouse Follower */}
      <div
        className="pointer-events-none fixed inset-0 z-0 transition-opacity duration-500 hidden md:block"
        style={{
          background: `radial-gradient(650px circle at ${mousePos.x}px ${mousePos.y}px, rgba(6, 182, 212, 0.07), transparent 80%)`,
        }}
      />

      {/* 4. Floating Pill Navigation */}
      <Navbar />

      {/* 5. Main Content Flow */}
      <main className="relative z-10">
        {/* Hero Section */}
        <Hero />

        {/* Key Confirmed Facts & Competencies */}
        <StatsCounter />

        {/* Real Commercial Projects Showcase with 3D Tilt & Architecture Inspector */}
        <ProjectsShowcase />

        {/* Practical Tech Stack & Tools */}
        <TechUniverse />

        {/* About Me & Practical Engineering Principles */}
        <JourneyTimeline />

        {/* Direct Contact & Connection Hub */}
        <ContactSection />
      </main>

      {/* 6. Interactive Developer CLI Terminal Widget */}
      <InteractiveTerminal />

      {/* 7. Footer */}
      <Footer />
    </div>
  );
}

export default App;
