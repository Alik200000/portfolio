import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Copy,
  Check,
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
  const [projectType, setProjectType] = useState('BI Дашборд / SQL & Python Аналитика');
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
    'BI Дашборд / SQL & Python Аналитика',
    '1С / Битрикс24 / Kaspi Интеграция',
    'ИИ-Агенты и автоматизации',
    'Веб-приложение (Next.js / FastAPI)',
  ];

  return (
    <section id="contact" className="relative bg-[#FAF9F5] text-[#0A0B0E] py-20 sm:py-28 px-4 sm:px-8 border-t border-black/15">
      <AnimatePresence>
        {copied && (
          <motion.div
            role="status"
            aria-live="polite"
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            className="fixed top-20 left-1/2 -translate-x-1/2 z-50 bg-[#0A0B0E] text-[#F5F5F0] px-4 py-2.5 rounded-full shadow-2xl flex items-center gap-2.5 font-mono text-xs font-bold"
          >
            <Check className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Email ({email}) скопирован!</span>
            <button
              onClick={() => setCopied(false)}
              aria-label="Закрыть уведомление"
              className="ml-1 p-0.5 rounded-full hover:bg-white/10 transition-colors"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-[1380px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 pb-20 border-b border-black/15">
          {/* Left 6 Cols: Large Stacked Section Links */}
          <div className="lg:col-span-6 divide-y divide-black/15 border-y border-black/15">
            {editorialNav.map((item, idx) => (
              <button
                key={`${item.label}-${idx}`}
                type="button"
                onClick={() => scrollToSection(item.id)}
                className="w-full py-5 sm:py-6 flex items-center justify-between text-left group cursor-pointer"
              >
                <span className="font-display font-bold text-3xl sm:text-5xl text-[#0A0B0E] group-hover:translate-x-2 transition-transform">
                  {item.label}
                </span>
                <ArrowUpRight className="w-6 h-6 text-slate-500 group-hover:text-[#0A0B0E] transition-colors" />
              </button>
            ))}
          </div>

          {/* Right 6 Cols: Social Handles & Live Kazakhstan Status */}
          <div className="lg:col-span-6 flex flex-col justify-between gap-8 lg:pl-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div>
                  <span className="block font-mono text-xs text-slate-600 font-bold mb-1">GitHub</span>
                  <a
                    href={githubLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-display font-bold text-2xl sm:text-3xl text-[#0A0B0E] hover:text-indigo-700 transition-colors inline-flex items-center gap-2"
                  >
                    <span>@Alik200000</span>
                    <ArrowUpRight className="w-5 h-5" />
                  </a>
                </div>

                <div>
                  <span className="block font-mono text-xs text-slate-600 font-bold mb-1">WhatsApp / Телефон</span>
                  <a
                    href={whatsappLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-display font-bold text-xl sm:text-2xl text-[#0A0B0E] hover:text-emerald-700 transition-colors inline-flex items-center gap-2"
                  >
                    <span>{whatsappNumber}</span>
                  </a>
                </div>

                <div>
                  <span className="block font-mono text-xs text-slate-600 font-bold mb-1">Прямая почта</span>
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-mono text-sm text-slate-800 font-semibold break-all">{email}</span>
                    <button
                      type="button"
                      onClick={handleCopyEmail}
                      aria-label="Скопировать email адрес"
                      className="px-2.5 py-1 rounded-md bg-white hover:bg-slate-100 border border-slate-300 text-xs font-mono font-bold text-[#0A0B0E] flex items-center gap-1 cursor-pointer transition-colors shadow-xs"
                    >
                      {copied ? <Check className="w-3 h-3 text-emerald-700" /> : <Copy className="w-3 h-3" />}
                      <span>{copied ? 'Скопировано' : 'Копировать'}</span>
                    </button>
                  </div>
                </div>
              </div>

              <div className="flex flex-col justify-between sm:items-end text-left sm:text-right space-y-4">
                <div className="space-y-2 font-mono text-xs font-bold">
                  <a
                    href={whatsappLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-slate-700 hover:text-[#0A0B0E] underline underline-offset-4"
                  >
                    WhatsApp Direct
                  </a>
                  <a
                    href={githubLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-slate-700 hover:text-[#0A0B0E] underline underline-offset-4"
                  >
                    GitHub Repositories
                  </a>
                  <a
                    href={renderPortfolioLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-slate-700 hover:text-[#0A0B0E] underline underline-offset-4"
                  >
                    Render Production
                  </a>
                </div>

                <div className="p-4 rounded-2xl bg-white border border-slate-300 shadow-xs text-left w-full sm:max-w-[230px]">
                  <div className="flex items-center justify-between text-[11px] font-mono text-slate-600 font-semibold mb-1">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      АЛМАТЫ (UTC+5)
                    </span>
                    <span className="text-[#0A0B0E] font-bold tabular-nums">{currentTime || '12:00:00'}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-[11px] font-mono font-bold text-emerald-800">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse" />
                    <span>Открыт для проектов и офферов</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* PART 2: Light Editorial Contact Card */}
        <div className="pt-16 sm:pt-20">
          <div className="rounded-3xl bg-white border border-slate-300 p-6 sm:p-12 shadow-xl">
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                className="py-10 text-center space-y-4"
              >
                <div className="w-16 h-16 rounded-full bg-emerald-100 border border-emerald-300 text-emerald-800 mx-auto flex items-center justify-center">
                  <Check className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-display font-black text-[#0A0B0E]">
                  Заявка сформирована!
                </h3>
                <p className="text-slate-700 text-sm max-w-md mx-auto leading-relaxed">
                  Данные подготовлены для отправки. Перейдите в WhatsApp для мгновенного обсуждения вашей задачи:
                </p>
                <div className="pt-3 flex flex-col sm:flex-row gap-3 justify-center">
                  {lastWhatsAppUrl && (
                    <a
                      href={lastWhatsAppUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-7 py-3.5 rounded-full bg-[#0A0B0E] hover:bg-neutral-800 text-[#F5F5F0] font-bold text-xs font-mono flex items-center justify-center gap-2 cursor-pointer"
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
                    className="px-6 py-3.5 rounded-full bg-slate-100 hover:bg-slate-200 border border-slate-300 text-[#0A0B0E] font-mono font-bold text-xs cursor-pointer"
                  >
                    Заполнить заново
                  </button>
                </div>
              </motion.div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
                <div className="lg:col-span-5 flex flex-col justify-between space-y-8">
                  <div>
                    <h2 className="font-display font-black text-3xl sm:text-5xl text-[#0A0B0E] tracking-tight leading-[1.08]">
                      Готовы обсудить проект?
                    </h2>
                    <p className="text-slate-700 text-xs sm:text-sm mt-4 leading-relaxed max-w-sm">
                      Оставьте заявку, и я свяжусь с вами, чтобы обсудить задачу, метрики, BI-дашборд, интеграцию (1С / Битрикс24 / Kaspi) или формат сотрудничества.
                    </p>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-full bg-[#0A0B0E] text-[#F5F5F0] flex items-center justify-center font-display font-black text-2xl shrink-0 shadow-md">
                      A
                    </div>
                    <div className="text-xs text-slate-700 leading-relaxed">
                      <div className="font-bold text-[#0A0B0E]">Алим (Alik200000)</div>
                      <div className="text-slate-600">Алматы • Отвечаю лично в течение 15–30 минут</div>
                    </div>
                  </div>

                  <div>
                    <a
                      href={whatsappLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-xs font-mono font-bold text-[#0A0B0E] underline underline-offset-4 hover:text-emerald-700"
                    >
                      <span>Написать напрямую в WhatsApp</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>

                <div className="lg:col-span-7">
                  <form onSubmit={handleSubmit} className="space-y-5">
                    {formError && (
                      <motion.div
                        initial={{ opacity: 0, y: -6 }}
                        animate={{ opacity: 1, y: 0 }}
                        role="alert"
                        className="p-3 rounded-xl bg-rose-50 border border-rose-300 text-rose-800 text-xs font-mono font-bold flex items-center gap-2"
                      >
                        <AlertCircle className="w-4 h-4 shrink-0" />
                        <span>{formError}</span>
                      </motion.div>
                    )}

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
                                ? 'bg-[#0A0B0E] text-[#F5F5F0] border-[#0A0B0E] font-bold'
                                : 'bg-[#FAF9F5] text-slate-700 border-slate-300 hover:border-[#0A0B0E] hover:text-[#0A0B0E]'
                            }`}
                          >
                            {type}
                          </button>
                        );
                      })}
                    </div>

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
                        className="w-full px-1 py-3.5 bg-transparent border-b-2 border-slate-300 focus:border-[#0A0B0E] text-[#0A0B0E] placeholder-slate-500 focus:outline-none text-base sm:text-sm transition-colors"
                      />
                    </div>

                    <div className="flex items-center gap-3 border-b-2 border-slate-300 focus-within:border-[#0A0B0E] transition-colors">
                      <span className="text-xs font-mono font-bold text-slate-700 shrink-0 select-none">
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
                        className="w-full py-3.5 bg-transparent text-[#0A0B0E] placeholder-slate-500 focus:outline-none text-base sm:text-sm"
                      />
                    </div>

                    <div>
                      <label htmlFor="contact-channel" className="block font-mono text-[11px] font-bold text-slate-600 mb-1">
                        Как с вами связаться?
                      </label>
                      <select
                        id="contact-channel"
                        value={contactChannel}
                        onChange={(e) => setContactChannel(e.target.value)}
                        className="w-full px-2 py-3 bg-[#FAF9F5] border border-slate-300 rounded-xl focus:border-[#0A0B0E] text-[#0A0B0E] text-base sm:text-sm focus:outline-none cursor-pointer"
                      >
                        <option value="Написать в WhatsApp">Написать в WhatsApp</option>
                        <option value="Написать в Telegram">Написать в Telegram</option>
                        <option value="Позвонить по телефону">Позвонить по телефону</option>
                      </select>
                    </div>

                    <div>
                      <label htmlFor="contact-message" className="sr-only">
                        Описание задачи
                      </label>
                      <input
                        id="contact-message"
                        type="text"
                        required
                        placeholder="Кратко о задаче (например: BI-дашборд, витрина данных DWH, интеграция 1С и Битрикс24, репрайсер Kaspi)"
                        value={formState.message}
                        onChange={(e) => {
                          setFormState({ ...formState, message: e.target.value });
                          if (formError) setFormError(null);
                        }}
                        className="w-full px-1 py-3.5 bg-transparent border-b-2 border-slate-300 focus:border-[#0A0B0E] text-[#0A0B0E] placeholder-slate-500 focus:outline-none text-base sm:text-sm transition-colors"
                      />
                    </div>

                    <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-[#0A0B0E] hover:bg-neutral-800 text-[#F5F5F0] font-bold text-sm flex items-center justify-center gap-2 transition-all cursor-pointer disabled:opacity-50 shadow-md"
                      >
                        <SendHorizontal className="w-4 h-4" />
                        <span>Отправить</span>
                      </button>

                      <p className="text-[11px] text-slate-600 leading-relaxed max-w-xs">
                        Нажимая «Отправить», вы соглашаетесь с{' '}
                        <button
                          type="button"
                          onClick={() => onOpenLegal?.('privacy')}
                          className="text-[#0A0B0E] font-semibold hover:text-indigo-700 underline underline-offset-2 cursor-pointer"
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
