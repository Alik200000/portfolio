import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Copy,
  Check,
  Github,
  Clock,
  SendHorizontal,
  X,
  AlertCircle,
  Phone,
  ArrowUpRight,
} from 'lucide-react';
import { LegalTab } from './LegalModal';

interface ContactSectionProps {
  onOpenLegal?: (tab: LegalTab) => void;
}

export function ContactSection({ onOpenLegal }: ContactSectionProps) {
  const email = 'aptayalimzhan07@gmail.com';
  const whatsappNumber = '+7 (778) 607-87-32';
  const whatsappLink = 'https://wa.me/77786078732';
  const githubLink = 'https://github.com/Alik200000';
  const renderPortfolioLink = 'https://portfolio-9os8.onrender.com';

  const [copied, setCopied] = useState(false);
  const [currentTime, setCurrentTime] = useState('');
  const [contactChannel, setContactChannel] = useState('Написать в WhatsApp');
  const [projectType, setProjectType] = useState('1С / Битрикс24 / Kaspi Интеграция');
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

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
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

    const text = `Здравствуйте, Алим! Меня зовут ${trimmedName}.\n\nНаправление: ${projectType}\nПредпочтительная связь: ${contactChannel}\nМой контакт: ${trimmedContact}\n\nЗадача: ${trimmedMessage}`;
    const directUrl = `https://wa.me/77786078732?text=${encodeURIComponent(text)}`;
    setLastWhatsAppUrl(directUrl);

    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      try {
        window.open(directUrl, '_blank', 'noopener,noreferrer');
      } catch {
        // Fallback button shown
      }
    }, 500);
  };

  const editorialNav = [
    { id: 'projects', label: 'Работы' },
    { id: 'experience', label: 'Обо мне' },
    { id: 'projects', label: 'Проекты' },
    { id: 'skills', label: 'Техника' },
  ];

  const projectTypes = [
    '1С / Битрикс24 / Kaspi Интеграция',
    'ИИ-Агенты и автоматизации',
    'Веб-приложение (Next.js / FastAPI)',
    'Google Sheets / Excel & Отчёты',
  ];

  return (
    <section id="contact" className="relative bg-[#07080B] text-white py-20 sm:py-28 px-4 sm:px-8">
      {/* Toast confirmation */}
      <AnimatePresence>
        {copied && (
          <motion.div
            role="status"
            aria-live="polite"
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            className="fixed top-20 left-1/2 -translate-x-1/2 z-50 bg-white text-[#07080B] px-4 py-2.5 rounded-full shadow-2xl flex items-center gap-2.5 font-mono text-xs font-bold"
          >
            <Check className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Email ({email}) скопирован!</span>
            <button
              onClick={() => setCopied(false)}
              aria-label="Закрыть уведомление"
              className="ml-1 p-0.5 rounded-full hover:bg-black/10 transition-colors"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-[1380px] mx-auto">
        {/* =================================================================
            PART 1: Giant Editorial Directory & Direct Handles (00:38 reference)
           ================================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 pb-20 border-b border-white/10">
          {/* Left 6 Cols: Large Stacked Section Links (Работы / Обо мне / Проекты / Техника) */}
          <div className="lg:col-span-6 divide-y divide-white/15 border-y border-white/15">
            {editorialNav.map((item, idx) => (
              <button
                key={`${item.label}-${idx}`}
                type="button"
                onClick={() => scrollToSection(item.id)}
                className="w-full py-5 sm:py-6 flex items-center justify-between text-left group cursor-pointer"
              >
                <span className="font-display font-bold text-3xl sm:text-5xl text-white group-hover:translate-x-2 transition-transform">
                  {item.label}
                </span>
                <ArrowUpRight className="w-6 h-6 text-neutral-500 group-hover:text-white transition-colors" />
              </button>
            ))}
          </div>

          {/* Right 6 Cols: Social Handles & Live Kazakhstan Status (00:38 right side reference) */}
          <div className="lg:col-span-6 flex flex-col justify-between gap-8 lg:pl-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div>
                  <span className="block font-mono text-xs text-neutral-500 mb-1">GitHub</span>
                  <a
                    href={githubLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-display font-bold text-2xl sm:text-3xl text-white hover:text-neutral-300 transition-colors inline-flex items-center gap-2"
                  >
                    <span>@Alik200000</span>
                    <ArrowUpRight className="w-5 h-5" />
                  </a>
                </div>

                <div>
                  <span className="block font-mono text-xs text-neutral-500 mb-1">WhatsApp / Телефон</span>
                  <a
                    href={whatsappLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-display font-bold text-xl sm:text-2xl text-white hover:text-emerald-400 transition-colors inline-flex items-center gap-2"
                  >
                    <span>{whatsappNumber}</span>
                  </a>
                </div>

                <div>
                  <span className="block font-mono text-xs text-neutral-500 mb-1">Прямая почта</span>
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-mono text-sm text-neutral-200 break-all">{email}</span>
                    <button
                      type="button"
                      onClick={handleCopyEmail}
                      aria-label="Скопировать email адрес"
                      className="px-2.5 py-1 rounded-md bg-white/10 hover:bg-white/20 text-xs font-mono text-white flex items-center gap-1 cursor-pointer transition-colors"
                    >
                      {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                      <span>{copied ? 'Скопировано' : 'Копировать'}</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Right Mini Links List */}
              <div className="flex flex-col justify-between sm:items-end text-left sm:text-right space-y-4">
                <div className="space-y-2 font-mono text-xs">
                  <a
                    href={whatsappLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-neutral-300 hover:text-white underline underline-offset-4"
                  >
                    WhatsApp Direct
                  </a>
                  <a
                    href={githubLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-neutral-300 hover:text-white underline underline-offset-4"
                  >
                    GitHub Repositories
                  </a>
                  <a
                    href={renderPortfolioLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-neutral-300 hover:text-white underline underline-offset-4"
                  >
                    Render Production
                  </a>
                </div>

                <div className="p-4 rounded-2xl bg-white/5 border border-white/10 text-left w-full sm:max-w-[230px]">
                  <div className="flex items-center justify-between text-[11px] font-mono text-neutral-400 mb-1">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      АЛМАТЫ (UTC+5)
                    </span>
                    <span className="text-white font-bold tabular-nums">{currentTime || '12:00:00'}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-[11px] font-mono text-emerald-400">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span>Открыт для проектов</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* =================================================================
            PART 2: Minimalist Dark Editorial Contact Card (00:39-00:41 reference)
           ================================================================= */}
        <div className="pt-16 sm:pt-20">
          <div className="rounded-3xl bg-[#111319] border border-white/15 p-6 sm:p-12 shadow-2xl">
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                className="py-10 text-center space-y-4"
              >
                <div className="w-16 h-16 rounded-full bg-white text-[#07080B] mx-auto flex items-center justify-center">
                  <Check className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-display font-black text-white">
                  Заявка сформирована!
                </h3>
                <p className="text-neutral-300 text-sm max-w-md mx-auto leading-relaxed">
                  Данные подготовлены для отправки. Перейдите в WhatsApp для мгновенного обсуждения вашей задачи:
                </p>
                <div className="pt-3 flex flex-col sm:flex-row gap-3 justify-center">
                  {lastWhatsAppUrl && (
                    <a
                      href={lastWhatsAppUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-7 py-3.5 rounded-full bg-white hover:bg-neutral-200 text-[#07080B] font-bold text-xs font-mono flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <Phone className="w-4 h-4" />
                      <span>Открыть диалог в WhatsApp</span>
                    </a>
                  )}
                  <button
                    type="button"
                    onClick={() => {
                      setSubmitted(false);
                      setFormState({ name: '', email: '', message: '' });
                    }}
                    className="px-6 py-3.5 rounded-full bg-white/10 hover:bg-white/15 text-white font-mono text-xs cursor-pointer"
                  >
                    Заполнить заново
                  </button>
                </div>
              </motion.div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
                {/* Left 5 Cols: "Готовы обсудить проект?" + Avatar + Direct Link (00:40 reference) */}
                <div className="lg:col-span-5 flex flex-col justify-between space-y-8">
                  <div>
                    <h2 className="font-display font-black text-3xl sm:text-5xl text-white tracking-tight leading-[1.08]">
                      Готовы обсудить проект?
                    </h2>
                    <p className="text-neutral-400 text-xs sm:text-sm mt-4 leading-relaxed max-w-sm">
                      Оставьте заявку, и я свяжусь с вами, чтобы обсудить задачу, архитектуру интеграции (1С / Битрикс24 / Kaspi / AI) и формат запуска.
                    </p>
                  </div>

                  {/* Avatar Circle + Text like in 00:40 */}
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-full bg-white text-[#07080B] flex items-center justify-center font-display font-black text-2xl shrink-0 shadow-lg">
                      A
                    </div>
                    <div className="text-xs text-neutral-300 leading-relaxed">
                      <div className="font-bold text-white">Алим (Alik200000)</div>
                      <div className="text-neutral-400">Отвечаю лично в течение 15–30 минут</div>
                    </div>
                  </div>

                  <div>
                    <a
                      href={whatsappLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-xs font-mono font-bold text-white underline underline-offset-4 hover:text-neutral-300"
                    >
                      <span>Написать напрямую в WhatsApp</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>

                {/* Right 7 Cols: Minimalist Underlined Inputs + White Pill Button (00:40 reference) */}
                <div className="lg:col-span-7">
                  <form onSubmit={handleSubmit} className="space-y-5">
                    {formError && (
                      <motion.div
                        initial={{ opacity: 0, y: -6 }}
                        animate={{ opacity: 1, y: 0 }}
                        role="alert"
                        className="p-3 rounded-xl bg-rose-500/15 border border-rose-500/30 text-rose-300 text-xs font-mono flex items-center gap-2"
                      >
                        <AlertCircle className="w-4 h-4 shrink-0" />
                        <span>{formError}</span>
                      </motion.div>
                    )}

                    {/* Topic Pills */}
                    <div className="flex flex-wrap gap-2">
                      {projectTypes.map((type) => {
                        const isSelected = projectType === type;
                        return (
                          <button
                            type="button"
                            key={type}
                            aria-pressed={isSelected}
                            onClick={() => setProjectType(type)}
                            className={`px-3 py-1.5 rounded-full font-mono text-[11px] transition-colors cursor-pointer border ${
                              isSelected
                                ? 'bg-white text-[#07080B] border-white font-bold'
                                : 'bg-transparent text-neutral-400 border-white/15 hover:text-white'
                            }`}
                          >
                            {type}
                          </button>
                        );
                      })}
                    </div>

                    {/* Input 1: Ваше имя */}
                    <div>
                      <label htmlFor="contact-name" className="sr-only">
                        Ваше имя
                      </label>
                      <input
                        id="contact-name"
                        type="text"
                        required
                        placeholder="Ваше имя"
                        value={formState.name}
                        onChange={(e) => {
                          setFormState({ ...formState, name: e.target.value });
                          if (formError) setFormError(null);
                        }}
                        className="w-full px-1 py-3.5 bg-transparent border-b border-white/20 focus:border-white text-white placeholder-neutral-500 focus:outline-none text-sm transition-colors"
                      />
                    </div>

                    {/* Input 2: Phone / Telegram with KZ flag badge like in 00:40 */}
                    <div className="flex items-center gap-3 border-b border-white/20 focus-within:border-white transition-colors">
                      <span className="text-xs font-mono text-neutral-300 shrink-0 select-none">
                        🇰🇿 +7
                      </span>
                      <label htmlFor="contact-phone" className="sr-only">
                        Телефон, WhatsApp или Telegram
                      </label>
                      <input
                        id="contact-phone"
                        type="text"
                        required
                        placeholder="(000) 000-00-00 или @telegram"
                        value={formState.email}
                        onChange={(e) => {
                          setFormState({ ...formState, email: e.target.value });
                          if (formError) setFormError(null);
                        }}
                        className="w-full py-3.5 bg-transparent text-white placeholder-neutral-500 focus:outline-none text-sm"
                      />
                    </div>

                    {/* Input 3: Как с вами связаться? (00:40 select reference) */}
                    <div>
                      <label htmlFor="contact-channel" className="block font-mono text-[11px] text-neutral-400 mb-1">
                        Как с вами связаться?
                      </label>
                      <select
                        id="contact-channel"
                        value={contactChannel}
                        onChange={(e) => setContactChannel(e.target.value)}
                        className="w-full px-1 py-3 bg-[#111319] border-b border-white/20 focus:border-white text-white text-sm focus:outline-none cursor-pointer"
                      >
                        <option value="Написать в WhatsApp">Написать в WhatsApp</option>
                        <option value="Написать в Telegram">Написать в Telegram</option>
                        <option value="Позвонить по телефону">Позвонить по телефону</option>
                      </select>
                    </div>

                    {/* Input 4: Кратко о задаче */}
                    <div>
                      <label htmlFor="contact-message" className="sr-only">
                        Описание задачи
                      </label>
                      <input
                        id="contact-message"
                        type="text"
                        required
                        placeholder="Кратко о задаче (например: интеграция 1С и Битрикс24, репрайсер Kaspi, сайт или AI-бот)"
                        value={formState.message}
                        onChange={(e) => {
                          setFormState({ ...formState, message: e.target.value });
                          if (formError) setFormError(null);
                        }}
                        className="w-full px-1 py-3.5 bg-transparent border-b border-white/20 focus:border-white text-white placeholder-neutral-500 focus:outline-none text-sm transition-colors"
                      />
                    </div>

                    <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="px-8 py-3.5 rounded-full bg-white hover:bg-neutral-200 text-[#07080B] font-bold text-sm flex items-center justify-center gap-2 transition-all cursor-pointer disabled:opacity-50"
                      >
                        <SendHorizontal className="w-4 h-4" />
                        <span>Отправить</span>
                      </button>

                      {/* Legal & PD Consent Disclaimer (Reel 4: @davydovit) */}
                      <p className="text-[11px] text-neutral-500 leading-relaxed max-w-xs">
                        Нажимая «Отправить», вы соглашаетесь с{' '}
                        <button
                          type="button"
                          onClick={() => onOpenLegal?.('privacy')}
                          className="text-neutral-300 hover:text-white underline underline-offset-2 cursor-pointer"
                        >
                          Политикой конфиденциальности
                        </button>{' '}
                        (Закон РК «О персональных данных»).
                      </p>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
