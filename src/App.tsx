import React, { useState } from 'react';
import { Navbar } from './portfolio/components/Navbar';
import { EditorialPreloader } from './portfolio/components/EditorialPreloader';
import { Hero } from './portfolio/components/Hero';
import { StatsCounter } from './portfolio/components/StatsCounter';
import { ProjectsShowcase } from './portfolio/components/ProjectsShowcase';
import { TechUniverse } from './portfolio/components/TechUniverse';
import { ContactSection } from './portfolio/components/ContactSection';
import { Footer } from './portfolio/components/Footer';
import { ScrollProgressBar } from './portfolio/components/ScrollProgressBar';
import { InteractiveTerminal } from './portfolio/components/InteractiveTerminal';
import { PortfolioErrorBoundary } from './portfolio/components/PortfolioErrorBoundary';
import { LegalModal, LegalTab } from './portfolio/components/LegalModal';
import { CookieConsent } from './portfolio/components/CookieConsent';

export function App() {
  const [isLegalOpen, setIsLegalOpen] = useState(false);
  const [legalTab, setLegalTab] = useState<LegalTab>('privacy');

  const handleOpenLegal = (tab: LegalTab = 'privacy') => {
    setLegalTab(tab);
    setIsLegalOpen(true);
  };

  return (
    <PortfolioErrorBoundary>
      <div className="min-h-screen bg-[#07080B] text-slate-100 selection:bg-white selection:text-[#07080B] relative overflow-x-hidden font-sans">
        {/* 0. Swiss Editorial Preloader (00:00-00:01 video reference) */}
        <EditorialPreloader />

        {/* 1. Top Scroll Progress Bar */}
        <ScrollProgressBar />

        {/* 2. Adaptive Swiss Editorial Top Navigation */}
        <Navbar />

        {/* 3. Main Editorial Content Flow */}
        <main className="relative z-10">
          {/* 00:02-00:05: Light Editorial Hero with Mirrored Wordmark & Blueprint Cursor Trail */}
          <Hero />

          {/* 00:06-00:14: "ОБО МНЕ" Split Reveal, Bento Grid, Inline Pill Capsules, Marquee & Stroke Headline */}
          <StatsCounter />

          {/* 00:15-00:34 & 00:42-00:49: "ГЛАВНЫЙ ПРОЕКТ", 3D Curved Fan & Ring, 360° Wheel & Sticky "ВСЕ РАБОТЫ" */}
          <ProjectsShowcase />

          {/* 00:35-00:37: Light Editorial 4-Column "ТЕХНИКА & СТЕК" Section */}
          <TechUniverse />

          {/* 00:38-00:41: Editorial Directory & Minimalist Contact Card */}
          <ContactSection onOpenLegal={handleOpenLegal} />
        </main>

        {/* 4. Interactive Developer CLI Terminal Widget */}
        <InteractiveTerminal />

        {/* 5. Footer with Legal Navigation Links */}
        <Footer onOpenLegal={handleOpenLegal} />

        {/* 6. Cookie Consent Banner (Reel 4: @davydovit) */}
        <CookieConsent onOpenLegal={handleOpenLegal} />

        {/* 7. Interactive Legal & Compliance Modal */}
        <LegalModal
          isOpen={isLegalOpen}
          initialTab={legalTab}
          onClose={() => setIsLegalOpen(false)}
        />
      </div>
    </PortfolioErrorBoundary>
  );
}

export default App;
