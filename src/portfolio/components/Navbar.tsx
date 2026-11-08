import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowUpRight, Github, Phone } from 'lucide-react';

export function Navbar() {
  const [activeSection, setActiveSection] = useState('hero');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isDarkHeader, setIsDarkHeader] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Switch header theme once scrolled past the light editorial Hero
      const heroEl = document.getElementById('hero');
      const setupEl = document.getElementById('skills');
      const y = window.scrollY;

      let overLight = false;
      if (heroEl) {
        const rect = heroEl.getBoundingClientRect();
        if (rect.bottom > 72) overLight = true;
      }
      if (setupEl) {
        const rect = setupEl.getBoundingClientRect();
        if (rect.top <= 72 && rect.bottom > 72) overLight = true;
      }
      setIsDarkHeader(!overLight && y > 40);

      const sections = ['hero', 'experience', 'projects', 'skills', 'contact'];
      for (const section of [...sections].reverse()) {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 200) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [mobileMenuOpen]);

  const navItems = [
    { id: 'experience', label: 'Обо мне' },
    { id: 'projects', label: 'Работы' },
    { id: 'skills', label: 'Техника & Стек' },
    { id: 'contact', label: 'Контакты' },
  ];

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 border-b backdrop-blur-xl ${
          isDarkHeader
            ? 'bg-[#08090C]/85 border-white/10 text-white'
            : 'bg-[#F3F3EE]/85 border-black/10 text-[#0A0B0E]'
        }`}
      >
        <nav
          aria-label="Основная навигация"
          className="max-w-[1440px] mx-auto px-4 sm:px-8 h-14 sm:h-16 flex items-center justify-between"
        >
          {/* Left Brand: Swiss Editorial Wordmark */}
          <button
            onClick={() => scrollToSection('hero')}
            aria-label="ALIM.DEV — На главную"
            className="font-display font-black text-sm sm:text-base tracking-[0.16em] uppercase cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 rounded px-1"
          >
            ALIM.DEV
          </button>

          {/* Center Editorial Links */}
          <div className="hidden md:flex items-center gap-7">
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`relative py-1 text-xs font-semibold tracking-wide transition-opacity cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 rounded ${
                    isActive ? 'opacity-100 font-bold' : 'opacity-65 hover:opacity-100'
                  }`}
                >
                  <span>{item.label}</span>
                  {isActive && (
                    <motion.span
                      layoutId="editorialNavUnderline"
                      className={`absolute left-0 right-0 -bottom-0.5 h-[1.5px] ${
                        isDarkHeader ? 'bg-white' : 'bg-[#0A0B0E]'
                      }`}
                      transition={{ type: 'spring', stiffness: 420, damping: 32 }}
                    />
                  )}
                </button>
              );
            })}
          </div>

          {/* Right Action Links: Связаться + Hamburger */}
          <div className="flex items-center gap-3 sm:gap-4">
            <a
              href="https://github.com/Alik200000"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Профиль на GitHub Alik200000"
              title="GitHub: Alik200000"
              className={`hidden sm:inline-flex items-center gap-1.5 text-xs font-mono opacity-75 hover:opacity-100 transition-opacity`}
            >
              <Github className="w-3.5 h-3.5" />
              <span>GitHub</span>
            </a>

            <button
              onClick={() => scrollToSection('contact')}
              className={`text-xs font-semibold tracking-wide flex items-center gap-2 cursor-pointer px-3.5 py-1.5 rounded-full border transition-all ${
                isDarkHeader
                  ? 'border-white/20 hover:bg-white hover:text-[#08090C]'
                  : 'border-black/20 hover:bg-[#0A0B0E] hover:text-white'
              }`}
            >
              <span>Связаться</span>
              <span aria-hidden="true" className="font-mono text-[10px] tracking-tighter">
                ===
              </span>
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-1.5 rounded-lg border border-current/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500"
              aria-label="Открыть меню навигации"
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-editorial-drawer"
            >
              {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile Full-Width Editorial Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/70 backdrop-blur-sm z-40 md:hidden"
            />
            <motion.div
              id="mobile-editorial-drawer"
              initial={{ opacity: 0, y: -16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ type: 'spring', stiffness: 360, damping: 30 }}
              className="fixed top-16 left-4 right-4 z-50 p-6 rounded-3xl bg-[#0B0D13] text-white border border-white/15 shadow-2xl md:hidden"
            >
              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between pb-3 mb-2 border-b border-white/10 text-[11px] font-mono text-neutral-400 uppercase tracking-widest">
                  <span>Меню портфолио</span>
                  <span className="text-emerald-400">● Алматы / Астана</span>
                </div>

                {navItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className="flex items-center justify-between py-3 px-4 rounded-2xl bg-white/5 hover:bg-white/10 text-white font-display font-bold text-lg tracking-tight text-left transition-colors"
                  >
                    <span>{item.label}</span>
                    <ArrowUpRight className="w-4 h-4 text-neutral-400" />
                  </button>
                ))}

                <div className="grid grid-cols-2 gap-2.5 mt-3 pt-3 border-t border-white/10">
                  <a
                    href="https://wa.me/77786078732"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="py-3 px-4 rounded-2xl bg-white text-[#0A0B0E] font-bold text-xs flex items-center justify-center gap-2"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    <span>WhatsApp</span>
                  </a>
                  <a
                    href="https://github.com/Alik200000"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="py-3 px-4 rounded-2xl bg-white/10 text-white font-mono text-xs flex items-center justify-center gap-2"
                  >
                    <Github className="w-3.5 h-3.5" />
                    <span>GitHub</span>
                  </a>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
