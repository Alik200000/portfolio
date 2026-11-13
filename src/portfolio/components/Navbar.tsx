import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowUpRight, Github, Phone } from 'lucide-react';

export function Navbar() {
  const [activeSection, setActiveSection] = useState('hero');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
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
      <header className="fixed top-0 left-0 right-0 z-50 transition-colors duration-300 border-b border-black/15 bg-[#F5F5F0]/90 text-[#0A0B0E] backdrop-blur-xl">
        <nav
          aria-label="Основная навигация"
          className="max-w-[1440px] mx-auto px-4 sm:px-8 h-14 sm:h-16 flex items-center justify-between"
        >
          <button
            onClick={() => scrollToSection('hero')}
            aria-label="ALIM.DEV — На главную"
            className="font-display font-black text-sm sm:text-base tracking-[0.16em] uppercase cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600 rounded px-1"
          >
            ALIM.DEV
          </button>

          <div className="hidden md:flex items-center gap-7">
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`relative py-1 text-xs font-semibold tracking-wide transition-opacity cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600 rounded ${
                    isActive ? 'opacity-100 font-bold text-[#0A0B0E]' : 'opacity-70 hover:opacity-100 text-[#0A0B0E]'
                  }`}
                >
                  <span>{item.label}</span>
                  {isActive && (
                    <motion.span
                      layoutId="editorialNavUnderline"
                      className="absolute left-0 right-0 -bottom-0.5 h-[2px] bg-[#0A0B0E]"
                      transition={{ type: 'spring', stiffness: 420, damping: 32 }}
                    />
                  )}
                </button>
              );
            })}
          </div>

          <div className="flex items-center gap-3 sm:gap-4">
            <a
              href="https://github.com/Alik200000"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Профиль на GitHub Alik200000"
              title="GitHub: Alik200000"
              className="hidden sm:inline-flex items-center gap-1.5 text-xs font-mono text-[#0A0B0E]/80 hover:text-[#0A0B0E] transition-opacity"
            >
              <Github className="w-3.5 h-3.5" />
              <span>GitHub</span>
            </a>

            <button
              onClick={() => scrollToSection('contact')}
              className="text-xs font-semibold tracking-wide flex items-center gap-2 cursor-pointer px-4 py-1.5 rounded-full border border-[#0A0B0E]/30 bg-white hover:bg-[#0A0B0E] hover:text-white transition-all shadow-xs"
            >
              <span>Связаться</span>
              <span aria-hidden="true" className="font-mono text-[10px] tracking-tighter">
                ===
              </span>
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-1.5 rounded-lg border border-[#0A0B0E]/25 bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600"
              aria-label="Открыть меню навигации"
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-editorial-drawer"
            >
              {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </nav>
      </header>

      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 bg-slate-900/35 backdrop-blur-sm z-40 md:hidden"
            />
            <motion.div
              id="mobile-editorial-drawer"
              initial={{ opacity: 0, y: -16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ type: 'spring', stiffness: 360, damping: 30 }}
              className="fixed top-16 left-4 right-4 z-50 p-6 rounded-3xl bg-white text-[#0A0B0E] border border-slate-300 shadow-2xl md:hidden"
            >
              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between pb-3 mb-2 border-b border-slate-200 text-[11px] font-mono text-slate-600 uppercase tracking-widest">
                  <span>Меню портфолио</span>
                  <span className="text-emerald-700 font-bold">● Алматы / Астана</span>
                </div>

                {navItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className="flex items-center justify-between py-3 px-4 rounded-2xl bg-slate-100 hover:bg-slate-200 text-[#0A0B0E] font-display font-bold text-lg tracking-tight text-left transition-colors"
                  >
                    <span>{item.label}</span>
                    <ArrowUpRight className="w-4 h-4 text-slate-600" />
                  </button>
                ))}

                <div className="grid grid-cols-2 gap-2.5 mt-3 pt-3 border-t border-slate-200">
                  <a
                    href="https://wa.me/77786078732"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="py-3 px-4 rounded-2xl bg-[#0A0B0E] text-white font-bold text-xs flex items-center justify-center gap-2"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    <span>WhatsApp</span>
                  </a>
                  <a
                    href="https://github.com/Alik200000"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="py-3 px-4 rounded-2xl bg-slate-100 border border-slate-300 text-[#0A0B0E] font-mono text-xs flex items-center justify-center gap-2"
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
