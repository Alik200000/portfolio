import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Github, ExternalLink, Terminal, ArrowRight, Layers } from 'lucide-react';

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
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm cursor-pointer"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 20 }}
            transition={{ type: 'spring', stiffness: 350, damping: 28 }}
            className="relative z-10 w-full max-w-3xl rounded-3xl bg-white border border-slate-300 p-6 sm:p-8 shadow-2xl text-[#0A0B0E] max-h-[90vh] overflow-y-auto"
          >
            <button
              onClick={onClose}
              aria-label="Закрыть модальное окно"
              className="absolute top-6 right-6 p-2 rounded-full bg-slate-100 hover:bg-slate-200 border border-slate-300 text-slate-700 hover:text-[#0A0B0E] transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="mb-4 pr-10">
              <span className="px-3 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider bg-slate-100 border border-slate-300 text-[#0A0B0E]">
                {project.categoryLabel}
              </span>
              <h3 className="text-2xl sm:text-3xl font-display font-black text-[#0A0B0E] mt-3">
                {project.title}
              </h3>
              <p className="text-sm text-slate-700 mt-2 leading-relaxed">
                {project.tagline}
              </p>
            </div>

            <div className="my-6 p-4 rounded-2xl bg-[#FAF9F5] border border-slate-300">
              <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#0A0B0E] uppercase tracking-wider mb-3">
                <Layers className="w-4 h-4" />
                <span>Архитектурный пайплайн и поток данных</span>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                {project.architectureNodes.map((node, idx) => (
                  <React.Fragment key={idx}>
                    <span className="px-3 py-1.5 rounded-xl bg-white border border-slate-300 text-xs font-mono text-[#0A0B0E] font-bold shadow-xs">
                      {node}
                    </span>
                    {idx < project.architectureNodes.length - 1 && (
                      <ArrowRight className="w-3.5 h-3.5 text-slate-500 shrink-0 hidden sm:inline" />
                    )}
                  </React.Fragment>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
              <div className="p-3 rounded-xl bg-[#FAF9F5] border border-slate-300">
                <div className="text-[10px] font-mono uppercase text-slate-500 font-bold">Среда / Рантайм</div>
                <div className="text-xs font-bold text-[#0A0B0E] mt-1">{project.techSpec.runtime}</div>
              </div>
              <div className="p-3 rounded-xl bg-[#FAF9F5] border border-slate-300">
                <div className="text-[10px] font-mono uppercase text-slate-500 font-bold">Протокол / Обмен</div>
                <div className="text-xs font-bold text-indigo-800 mt-1">{project.techSpec.protocol}</div>
              </div>
              <div className="p-3 rounded-xl bg-[#FAF9F5] border border-slate-300">
                <div className="text-[10px] font-mono uppercase text-slate-500 font-bold">База / Хранилище</div>
                <div className="text-xs font-bold text-[#0A0B0E] mt-1">{project.techSpec.storage}</div>
              </div>
              <div className="p-3 rounded-xl bg-[#FAF9F5] border border-slate-300">
                <div className="text-[10px] font-mono uppercase text-slate-500 font-bold">Безопасность</div>
                <div className="text-xs font-bold text-emerald-800 mt-1">{project.techSpec.security}</div>
              </div>
            </div>

            <div className="mb-6 rounded-2xl bg-[#FAF9F5] border border-slate-300 overflow-hidden">
              <div className="px-4 py-2.5 border-b border-slate-300 bg-slate-100 flex items-center justify-between text-xs font-mono text-slate-700 font-bold">
                <span className="flex items-center gap-2">
                  <Terminal className="w-3.5 h-3.5 text-[#0A0B0E]" />
                  {project.codeSnippet.title}
                </span>
                <span className="text-[10px] uppercase text-slate-600 font-bold">{project.codeSnippet.language}</span>
              </div>
              <pre className="p-4 text-xs font-mono text-slate-900 overflow-x-auto leading-relaxed">
                <code>{project.codeSnippet.code}</code>
              </pre>
            </div>

            <div className="flex flex-wrap items-center justify-end gap-3 pt-4 border-t border-slate-200">
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 border border-slate-300 text-[#0A0B0E] font-bold text-xs transition-colors cursor-pointer"
              >
                <Github className="w-4 h-4" />
                <span>Открыть репозиторий на GitHub</span>
              </a>

              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#0A0B0E] hover:bg-neutral-800 text-[#F5F5F0] font-bold text-xs transition-colors cursor-pointer shadow-md"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>Открыть Live Дашборд</span>
                </a>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
