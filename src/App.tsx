/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Linkedin, 
  Globe, 
  ChevronRight, 
  Mail,
  ShieldCheck,
  Zap
} from 'lucide-react';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export default function App() {
  // ZIEL-DATUM: Hier kannst du das Datum anpassen (Jahr-Monat-Tag)
  const TARGET_DATE = new Date('2026-05-01T00:00:00').getTime();

  const calculateTimeLeft = (): TimeLeft => {
    const now = new Date().getTime();
    const difference = TARGET_DATE - now;

    if (difference <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }

    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };
  };

  const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft());
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Countdown Logik
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setEmail('');
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-bg-dark text-white font-sans selection:bg-primary selection:text-white overflow-x-hidden">
      {/* Hintergrund */}
      <div className="fixed inset-0 z-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-bg-dark via-[#0d0f12] to-bg-dark"></div>
        <img 
          className="absolute inset-0 w-full h-full object-cover opacity-20 mix-blend-luminosity" 
          src="https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&q=80&w=2000" 
          alt="Engineering Turbine"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 opacity-10 pointer-events-none bg-blueprint-dots"></div>
      </div>

      {/* Header mit zentriertem Logo */}
      <header className="relative z-50 w-full">
        <nav className="flex justify-center items-center px-6 md:px-12 py-12 max-w-7xl mx-auto">
          <div className="h-20 md:h-28 flex items-center">
            <img 
              src="baumech_logo_blue.png" 
              alt="BauMech Engineering Logo" 
              className="h-full w-auto object-contain"
              onError={(e) => {
                (e.target as HTMLImageElement).src = 'https://picsum.photos/seed/baumech/200/60?blur=2';
              }}
              referrerPolicy="no-referrer"
            />
          </div>
        </nav>
      </header>

      <main className="relative z-10 flex flex-col items-center justify-start min-h-[calc(100vh-300px)] px-6 text-center pt-4 md:pt-8">
        {/* Badge */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 inline-flex items-center gap-2.5 px-5 py-2 rounded-full border border-white/10 bg-white/5 text-primary text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] font-display"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
          </span>
          System Initialization in Progress
        </motion.div>

        {/* Titel */}
        <motion.h1 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="text-5xl md:text-8xl lg:text-9xl font-black font-display tracking-tighter mb-8 leading-none"
        >
          COMING <span className="text-blueprint">SOON</span>
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="max-w-2xl text-slate-400 text-base md:text-lg font-light mb-16 font-sans leading-relaxed"
        >
          Engineered for precision. Built for the future.<br className="hidden md:block"/> 
          We are currently finalizing our digital infrastructure to support excellence in civil and mechanical engineering.
        </motion.p>

        {/* Countdown Anzeige */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 mb-20 w-full max-w-4xl">
          {[
            { label: 'Days', value: timeLeft.days },
            { label: 'Hours', value: timeLeft.hours },
            { label: 'Minutes', value: timeLeft.minutes },
            { label: 'Seconds', value: timeLeft.seconds, highlight: true }
          ].map((item, i) => (
            <motion.div 
              key={item.label}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + i * 0.1 }}
              className="glass-panel p-6 md:p-10 rounded-2xl flex flex-col items-center group hover:border-primary/30 transition-colors"
            >
              <span className={`text-5xl md:text-6xl font-black font-display tracking-tighter mb-2 transition-colors ${item.highlight ? 'text-primary' : 'text-white'}`}>
                {item.value.toString().padStart(2, '0')}
              </span>
              <span className="text-primary text-[10px] font-bold uppercase tracking-[0.3em] font-display opacity-80 group-hover:opacity-100">
                {item.label}
              </span>
            </motion.div>
          ))}
        </div>

        {/* E-Mail Formular */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="w-full max-w-md"
        >
          <AnimatePresence mode="wait">
            {!isSubmitted ? (
              <motion.form 
                key="form"
                exit={{ opacity: 0, scale: 0.95 }}
                onSubmit={handleSubmit} 
                className="flex flex-col md:flex-row gap-3"
              >
                <div className="relative flex-grow">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                  <input 
                    required
                    type="email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-xl pl-12 pr-6 py-4 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all" 
                    placeholder="Enter technical email" 
                  />
                </div>
                <button 
                  disabled={isSubmitting}
                  className="bg-primary text-bg-dark font-black px-8 py-4 rounded-xl font-display tracking-tight hover:brightness-110 active:scale-95 transition-all uppercase whitespace-nowrap disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {isSubmitting ? 'Processing...' : 'Notify Me'}
                  {!isSubmitting && <ChevronRight className="w-4 h-4" />}
                </button>
              </motion.form>
            ) : (
              <motion.div 
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-primary/10 border border-primary/20 rounded-xl p-4 text-primary font-bold flex items-center justify-center gap-3"
              >
                <ShieldCheck className="w-5 h-5" />
                Transmission Received. We will contact you.
              </motion.div>
            )}
          </AnimatePresence>
          <p className="mt-5 text-[10px] text-slate-500 font-display uppercase tracking-widest flex items-center justify-center gap-2">
            <Zap className="w-3 h-3" />
            Secure Transmission Guaranteed • No Spam Policy
          </p>
        </motion.div>
      </main>

      {/* Fortschrittsbalken */}
      <div className="relative z-10 w-full max-w-3xl mx-auto px-6 mt-24 mb-32">
        <div className="flex justify-between items-end mb-4">
          <span className="text-[10px] font-bold uppercase tracking-widest text-primary font-display">Infrastructure Deployment</span>
          <span className="text-sm font-black font-display">86%</span>
        </div>
        <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden border border-white/5">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: '86%' }}
            transition={{ duration: 2, ease: "easeOut", delay: 1.2 }}
            className="h-full bg-primary relative"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-[shimmer_2s_infinite]"></div>
          </motion.div>
        </div>
      </div>

      {/* Footer */}
      <footer className="relative z-10 w-full border-t border-white/5">
        <div className="flex flex-col md:flex-row justify-between items-center px-6 md:px-12 py-16 w-full max-w-7xl mx-auto">
          <div className="mb-12 md:mb-0 text-center md:text-left">
            <div className="h-10 mb-4 flex items-center justify-center md:justify-start">
              <img 
                src="baumech_logo_blue.png" 
                alt="BauMech Engineering Logo" 
                className="h-full w-auto object-contain"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = 'https://picsum.photos/seed/baumech/200/60?blur=2';
                }}
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="text-xs tracking-wide uppercase text-slate-500 font-display">
              @2026 BauMech Engineering. We support you on your way to success
            </div>
          </div>
        </div>
      </footer>

      <style>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
      `}</style>
    </div>
  );
}
