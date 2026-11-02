import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Terminal,
  Copy,
  Check,
  Github,
  Clock,
  SendHorizontal,
  X,
  AlertCircle,
  Phone,
  Mail,
  MapPin,
  ExternalLink,
} from 'lucide-react';

export function ContactSection() {
  const email = 'aptayalimzhan07@gmail.com';
  const whatsappNumber = '+7 (778) 607-87-32';
  const whatsappLink = 'https://wa.me/77786078732';
  const githubLink = 'https://github.com/Alik200000';
  const renderPortfolioLink = 'https://portfolio-9os8.onrender.com';

  const [copied, setCopied] = useState(false);
  const [currentTime, setCurrentTime] = useState('');
  const [projectType, setProjectType] = useState('Kaspi / B2B Интеграция');
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [formError, setFormError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [lastWhatsAppUrl, setLastWhatsAppUrl] = useState('');
  const copyTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Live World Clock Kazakhstan (UTC+5)
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = {
        timeZone: 'Asia/Almaty',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
      };
      setCurrentTime(new Intl.DateTimeFormat([], options).format(now));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleCopyEmail = async () => {
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(email);
      } else {
        const textArea = document.createElement('textarea');
        textArea.value = email;
        textArea.style.position = 'fixed';
        textArea.style.opacity = '0';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
      }
      setCopied(true);
      if (copyTimeoutRef.current) clearTimeout(copyTimeoutRef.current);
      copyTimeoutRef.current = setTimeout(() => setCopied(false), 2500);
    } catch {
      setCopied(true);
      if (copyTimeoutRef.current) clearTimeout(copyTimeoutRef.current);
      copyTimeoutRef.current = setTimeout(() => setCopied(false), 2500);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    const trimmedName = formState.name.trim();
    const trimmedContact = formState.email.trim();
    const trimmedMessage = formState.message.trim();

    if (!trimmedName || !trimmedContact || !trimmedMessage) {
      setFormError('Пожалуйста, заполните все поля перед отправкой.');
      return;
    }

    setIsSubmitting(true);

    // Construct authentic direct message for WhatsApp
    const text = `Здравствуйте, Алим! Меня зовут ${trimmedName}.\n\nТема: ${projectType}\nМой контакт: ${trimmedContact}\n\nЗадача: ${trimmedMessage}`;
    const directUrl = `https://wa.me/77786078732?text=${encodeURIComponent(text)}`;
    setLastWhatsAppUrl(directUrl);

    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      // Attempt to open WhatsApp directly
      try {
        window.open(directUrl, '_blank', 'noopener,noreferrer');
      } catch {
        // Fallback handled by rendered button
      }
    }, 600);
  };

  const projectTypes = [
    'Kaspi / B2B Интеграция',
    'ИИ-Агенты и автоматизации',
    'Веб-приложение на React/Next.js',
    '1С:Предприятие & CRM системы',
  ];

  return (
    <section id="contact" className="relative px-4 sm:px-6 py-24 max-w-6xl mx-auto">
      {/* Toast confirmation */}
      <AnimatePresence>
        {copied && (
          <motion.div
            role="status"
            aria-live="polite"
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            className="fixed top-24 left-1/2 -translate-x-1/2 z-50 bg-[#161C2C] border border-cyan-500/40 text-cyan-300 px-4 py-2.5 rounded-full shadow-2xl backdrop-blur-xl flex items-center gap-2.5 font-mono text-xs"
          >
            <Check className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Email ({email}) скопирован в буфер!</span>
            <button
              onClick={() => setCopied(false)}
              aria-label="Закрыть уведомление"
              className="ml-1 p-0.5 rounded-full hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-950/40 border border-violet-500/30 text-violet-300 text-xs font-mono mb-3">
          <Terminal className="w-3.5 h-3.5 text-cyan-400" />
          <span>ПРЯМАЯ СВЯЗЬ И КОНТАКТЫ</span>
        </div>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-black text-white tracking-tight">
          Готов Обсудить Проект
        </h2>
        <p className="text-slate-400 text-sm sm:text-base mt-3 font-medium">
          Если вам нужен разработчик под B2B-продукт, интеграцию с Kaspi / 1C, запуск AI-автоматизации или работа в сильной команде — напишите мне напрямую.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Quick Connect Card & Status */}
        <div className="lg:col-span-5 space-y-6">
          {/* Quick Copy Box */}
          <div className="rounded-3xl bg-[#0F131D]/80 border border-white/10 p-6 sm:p-7 backdrop-blur-xl shadow-2xl relative overflow-hidden group">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-mono uppercase tracking-wider text-slate-400">
                Прямая почта
              </span>
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            </div>

            <div className="font-mono text-sm sm:text-base font-bold text-white mb-4 break-all">
              {email}
            </div>

            <button
              onClick={handleCopyEmail}
              aria-label="Скопировать email адрес"
              className="w-full py-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-cyan-500/40 text-slate-200 hover:text-white font-mono text-xs font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span className="text-emerald-400">Скопировано в буфер!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 text-cyan-400" />
                  <span>Скопировать Email</span>
                </>
              )}
            </button>
          </div>

          {/* Real-Time Operational Status & Location */}
          <div className="rounded-3xl bg-[#0F131D]/80 border border-white/10 p-6 sm:p-7 backdrop-blur-xl shadow-2xl space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-mono text-slate-300">
                <Clock className="w-4 h-4 text-cyan-400" />
                <span>ВРЕМЯ В КАЗАХСТАНЕ (UTC+5)</span>
              </div>
              <span className="font-mono text-xs font-bold tabular-nums text-white bg-white/5 px-2.5 py-1 rounded-lg border border-white/5">
                {currentTime || '12:00:00'}
              </span>
            </div>

            <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
              <MapPin className="w-4 h-4 text-rose-400 shrink-0" />
              <span>Казахстан (Алматы / Астана / Удалённо)</span>
            </div>

            <div className="p-3.5 rounded-xl bg-[#161C2C]/70 border border-white/5 space-y-1">
              <div className="flex items-center gap-2 text-xs font-bold text-emerald-400 font-mono">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                <span>СТАТУС: ДОСТУПЕН ДЛЯ ПРОЕКТОВ</span>
              </div>
              <p className="text-[11px] text-slate-400 leading-normal">
                Готов к задачам по веб-разработке, B2B-интеграциям и автоматизации бизнеса.
              </p>
            </div>

            {/* Direct Instant Action Links */}
            <div className="pt-2 space-y-2.5">
              <span className="text-[11px] font-mono text-slate-500 uppercase tracking-wider block">
                Прямые каналы связи
              </span>

              {/* WhatsApp direct button */}
              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-between p-3.5 rounded-2xl bg-emerald-600/20 hover:bg-emerald-600/30 border border-emerald-500/40 text-emerald-300 hover:text-white transition-all font-mono text-xs font-semibold"
              >
                <div className="flex items-center gap-2.5">
                  <Phone className="w-4 h-4 text-emerald-400" />
                  <span>WhatsApp: {whatsappNumber}</span>
                </div>
                <ExternalLink className="w-3.5 h-3.5 opacity-70" />
              </a>

              {/* GitHub and Live Render */}
              <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                <a
                  href={githubLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 p-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 hover:border-white/20 text-slate-300 hover:text-white transition-all"
                >
                  <Github className="w-4 h-4 text-slate-400" />
                  <span>Alik200000</span>
                </a>
                <a
                  href={renderPortfolioLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 p-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 hover:border-white/20 text-slate-300 hover:text-white transition-all"
                >
                  <ExternalLink className="w-4 h-4 text-cyan-400" />
                  <span>Render Demo</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Sleek Developer Terminal Form */}
        <div className="lg:col-span-7">
          <div className="rounded-3xl bg-[#090B10]/90 border border-white/15 overflow-hidden shadow-2xl backdrop-blur-2xl">
            {/* Terminal Window Header (macOS Pills) */}
            <div className="px-5 py-3.5 bg-[#0F131D] border-b border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-rose-500/80" />
                <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
              </div>
              <span className="font-mono text-xs text-slate-400 font-medium">
                terminal://alim-dev/contact.sh
              </span>
              <div className="w-12" />
            </div>

            {/* Terminal Body */}
            <div className="p-6 sm:p-8">
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="py-10 text-center space-y-4"
                >
                  <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 mx-auto flex items-center justify-center">
                    <Check className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-display font-bold text-white">
                    Заявка сформирована!
                  </h3>
                  <p className="text-slate-300 text-sm max-w-md mx-auto leading-relaxed">
                    Данные готовы к передаче. Вы можете сразу перейти в WhatsApp для мгновенного ответа:
                  </p>

                  <div className="pt-2 flex flex-col sm:flex-row gap-3 justify-center">
                    {lastWhatsAppUrl && (
                      <a
                        href={lastWhatsAppUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs font-mono flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/30 transition-all cursor-pointer"
                      >
                        <Phone className="w-4 h-4" />
                        <span>Открыть диалог в WhatsApp</span>
                      </a>
                    )}
                    <button
                      onClick={() => {
                        setSubmitted(false);
                        setFormState({ name: '', email: '', message: '' });
                      }}
                      className="px-5 py-3 rounded-xl bg-white/10 hover:bg-white/15 text-slate-300 hover:text-white font-mono text-xs transition-colors cursor-pointer"
                    >
                      Заполнить заново
                    </button>
                  </div>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  {/* Inline Error Message */}
                  {formError && (
                    <motion.div
                      initial={{ opacity: 0, y: -8 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-3 rounded-xl bg-rose-500/15 border border-rose-500/30 text-rose-300 text-xs font-mono flex items-center gap-2"
                      role="alert"
                    >
                      <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
                      <span>{formError}</span>
                    </motion.div>
                  )}

                  <div>
                    <label className="block font-mono text-xs text-slate-400 uppercase tracking-wider mb-2">
                      Направление / Тема обращения
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      {projectTypes.map((type) => {
                        const isSelected = projectType === type;
                        return (
                          <button
                            type="button"
                            key={type}
                            aria-pressed={isSelected}
                            onClick={() => {
                              setProjectType(type);
                              if (formError) setFormError(null);
                            }}
                            className={`p-2.5 rounded-xl font-mono text-xs font-semibold text-left transition-all border cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400 ${
                              isSelected
                                ? 'bg-gradient-to-r from-violet-600/30 to-cyan-600/30 border-cyan-400 text-white'
                                : 'bg-[#161C2C]/50 hover:bg-[#161C2C] border-white/5 text-slate-400 hover:text-slate-200'
                            }`}
                          >
                            {type}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-mono text-xs text-slate-400 uppercase tracking-wider mb-2">
                        Ваше имя
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Например: Арман"
                        value={formState.name}
                        onChange={(e) => {
                          setFormState({ ...formState, name: e.target.value });
                          if (formError) setFormError(null);
                        }}
                        className="w-full px-4 py-3 rounded-xl bg-[#161C2C]/60 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500 text-sm font-sans"
                      />
                    </div>
                    <div>
                      <label className="block font-mono text-xs text-slate-400 uppercase tracking-wider mb-2">
                        WhatsApp, Telegram или Email
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="+7 777 ... или @username"
                        value={formState.email}
                        onChange={(e) => {
                          setFormState({ ...formState, email: e.target.value });
                          if (formError) setFormError(null);
                        }}
                        className="w-full px-4 py-3 rounded-xl bg-[#161C2C]/60 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500 text-sm font-sans"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block font-mono text-xs text-slate-400 uppercase tracking-wider mb-2">
                      Описание задачи или проекта
                    </label>
                    <textarea
                      rows={4}
                      required
                      placeholder="Опишите ваши цели: интеграция с Kaspi/1С, разработка веб-сервиса или внедрение AI..."
                      value={formState.message}
                      onChange={(e) => {
                        setFormState({ ...formState, message: e.target.value });
                        if (formError) setFormError(null);
                      }}
                      className="w-full px-4 py-3 rounded-xl bg-[#161C2C]/60 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500 text-sm font-sans resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3.5 rounded-xl bg-gradient-to-r from-violet-600 via-indigo-600 to-cyan-500 hover:from-violet-500 hover:to-cyan-400 text-white font-bold text-sm tracking-wide shadow-xl shadow-violet-600/25 flex items-center justify-center gap-2 transition-all cursor-pointer disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400"
                  >
                    {isSubmitting ? (
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <>
                        <SendHorizontal className="w-4 h-4" />
                        <span>Отправить сообщение</span>
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
