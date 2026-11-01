import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Github, ExternalLink, Terminal, Cpu, ShieldCheck, ArrowRight, Layers } from 'lucide-react';

export interface DetailedProject {
  id: string;
  title: string;
  categoryLabel: string;
  tagline: string;
  architectureNodes: string[];
  techSpec: {
    runtime: string;
    protocol: string;
    storage: string;
    security: string;
  };
  codeSnippet: {
    language: string;
    title: string;
    code: string;
  };
  githubUrl: string;
  liveUrl?: string;
}

interface ProjectDetailModalProps {
  project: DetailedProject | null;
  onClose: () => void;
}

export function ProjectDetailModal({ project, onClose }: ProjectDetailModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (project) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [project, onClose]);

  return (
    <AnimatePresence>
      {project && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-md cursor-pointer"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 20 }}
            transition={{ type: 'spring', stiffness: 350, damping: 28 }}
            className="relative z-10 w-full max-w-3xl rounded-3xl bg-[#0D111A] border border-cyan-500/30 p-6 sm:p-8 shadow-2xl text-slate-100 max-h-[90vh] overflow-y-auto"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              aria-label="Закрыть модальное окно"
              className="absolute top-6 right-6 p-2 rounded-full bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Category & Title */}
            <div className="mb-4">
              <span className="px-3 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider bg-cyan-950/60 border border-cyan-500/30 text-cyan-300">
                {project.categoryLabel}
              </span>
              <h3 className="text-2xl sm:text-3xl font-display font-black text-white mt-3">
                {project.title}
              </h3>
              <p className="text-sm text-slate-300 mt-2 leading-relaxed">
                {project.tagline}
              </p>
            </div>

            {/* Architecture Pipeline Flow */}
            <div className="my-6 p-4 rounded-2xl bg-[#080B12] border border-white/10">
              <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 uppercase tracking-wider mb-3">
                <Layers className="w-4 h-4" />
                <span>Архитектурный пайплайн проекта</span>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                {project.architectureNodes.map((node, idx) => (
                  <React.Fragment key={idx}>
                    <span className="px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 text-xs font-mono text-slate-200 font-semibold shadow-sm">
                      {node}
                    </span>
                    {idx < project.architectureNodes.length - 1 && (
                      <ArrowRight className="w-3.5 h-3.5 text-cyan-400 shrink-0 hidden sm:inline" />
                    )}
                  </React.Fragment>
                ))}
              </div>
            </div>

            {/* Technical Specifications Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
              <div className="p-3 rounded-xl bg-white/[0.03] border border-white/5">
                <div className="text-[10px] font-mono uppercase text-slate-500">Среда / Рантайм</div>
                <div className="text-xs font-bold text-slate-200 mt-1">{project.techSpec.runtime}</div>
              </div>
              <div className="p-3 rounded-xl bg-white/[0.03] border border-white/5">
                <div className="text-[10px] font-mono uppercase text-slate-500">Протокол / Обмен</div>
                <div className="text-xs font-bold text-cyan-300 mt-1">{project.techSpec.protocol}</div>
              </div>
              <div className="p-3 rounded-xl bg-white/[0.03] border border-white/5">
                <div className="text-[10px] font-mono uppercase text-slate-500">База / Хранилище</div>
                <div className="text-xs font-bold text-slate-200 mt-1">{project.techSpec.storage}</div>
              </div>
              <div className="p-3 rounded-xl bg-white/[0.03] border border-white/5">
                <div className="text-[10px] font-mono uppercase text-slate-500">Безопасность</div>
                <div className="text-xs font-bold text-emerald-400 mt-1">{project.techSpec.security}</div>
              </div>
            </div>

            {/* Code / Configuration Snippet */}
            <div className="mb-6 rounded-2xl bg-[#06080F] border border-white/10 overflow-hidden">
              <div className="px-4 py-2 border-b border-white/5 flex items-center justify-between text-xs font-mono text-slate-400">
                <span className="flex items-center gap-2">
                  <Terminal className="w-3.5 h-3.5 text-cyan-400" />
                  {project.codeSnippet.title}
                </span>
                <span className="text-[10px] uppercase text-slate-500 font-bold">{project.codeSnippet.language}</span>
              </div>
              <pre className="p-4 text-xs font-mono text-emerald-300/90 overflow-x-auto leading-relaxed">
                <code>{project.codeSnippet.code}</code>
              </pre>
            </div>

            {/* Bottom Actions */}
            <div className="flex flex-wrap items-center justify-end gap-3 pt-4 border-t border-white/10">
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-xs transition-colors cursor-pointer"
              >
                <Github className="w-4 h-4" />
                <span>Открыть репозиторий на GitHub</span>
              </a>

              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs transition-colors cursor-pointer shadow-lg shadow-emerald-600/30"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>Открыть Live Production</span>
                </a>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
