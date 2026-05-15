'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  CreditCard,
  FileText,
  Languages,
  Sparkles,
  MessageCircle,
  Layout,
  ArrowRight,
  Check,
  CheckCircle2,
  Loader2,
  Database,
  Unlock,
  BarChart3,
  Zap,
  Star,
  ExternalLink,
  Code2,
  AlertCircle,
} from 'lucide-react';
import { GithubIcon, TwitterIcon } from '@/lib/icons';
import { supabase } from '@/lib/supabase';
import NavbarAuth from '@/components/NavbarAuth';

export default function LandingPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [useCase, setUseCase] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const { error: dbError } = await supabase
        .from('waitlist')
        .insert([{ email, name, use_case: useCase, source: 'landing' }]);

      if (dbError) {
        if (dbError.code === '23505') {
          setError("You're already on the waitlist! 🎉");
        } else {
          setError(dbError.message);
        }
      } else {
        setSuccess(true);
        setEmail('');
        setName('');
        setUseCase('');
      }
    } catch (err: any) {
      setError(err.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="relative min-h-screen overflow-x-hidden bg-[#0e1417] text-white">
      {/* Grid pattern bg */}
      <div
        className="fixed inset-0 pointer-events-none opacity-30"
        style={{
          backgroundImage: 'radial-gradient(rgba(0,212,255,0.08) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />

      {/* Background blobs */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-cyan-brand/20 blur-[120px] rounded-full -z-10 animate-pulse-glow" />
      <div className="absolute top-1/3 right-1/4 w-[400px] h-[400px] bg-purple-brand/10 blur-[100px] rounded-full -z-10 animate-pulse-glow" style={{ animationDelay: '1s' }} />
      <div className="absolute top-[80%] left-1/2 w-[400px] h-[400px] bg-saffron-brand/10 blur-[100px] rounded-full -z-10 animate-pulse-glow" style={{ animationDelay: '2s' }} />

      {/* ============ NAVBAR ============ */}
      <header className="sticky top-0 w-full z-50 bg-[#0e1417]/60 backdrop-blur-xl border-b border-white/10">
        <nav className="flex items-center justify-between px-6 md:px-8 py-4 max-w-7xl mx-auto">
          <div className="flex items-center gap-8">
            <span className="text-xl font-black text-white tracking-tight">
              Bharat<span className="text-cyan-brand">CMS</span>
            </span>
            <div className="hidden md:flex gap-6 text-sm">
              <a href="#features" className="text-white/60 hover:text-white transition">Features</a>
              <a href="#pricing" className="text-white/60 hover:text-white transition">Pricing</a>
              <a href="#scope" className="text-white/60 hover:text-white transition">Scope</a>
              <a href="https://github.com/codecay7/bharatcms" target="_blank" rel="noreferrer" className="text-white/60 hover:text-white transition">GitHub</a>
              <a href="https://bharatcms-storefront-ecommerce.vercel.app/store" target="_blank" rel="noreferrer" className="text-cyan-brand hover:text-white transition font-semibold">Store Demo ↗</a>
              
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="hidden sm:block bg-saffron-brand/10 text-saffron-brand text-[10px] font-bold px-2 py-1 rounded border border-saffron-brand/20 uppercase tracking-widest">
              Made in India 🇮🇳
            </span>
            <NavbarAuth />
          </div>
        </nav>
      </header>

      {/* ============ HERO (Tightened) ============ */}
      <section className="relative max-w-7xl mx-auto px-6 md:px-8 pt-20 pb-32 text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          {/* Day badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 mb-8">
            <span className="w-2 h-2 rounded-full bg-cyan-brand animate-pulse" />
            <span className="text-xs font-semibold tracking-wider uppercase text-white/70">
              Building in Public · Pre-Launch
            </span>
          </div>

          {/* Headline */}
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black mb-6 leading-[1.05] max-w-5xl mx-auto">
            The Headless CMS<br />
            for <span className="text-cyan-brand">Indian Developers 🇮🇳</span>
          </h1>

          {/* Subheadline - Tightened */}
          <p className="text-lg md:text-xl text-white/60 max-w-2xl mx-auto mb-12 leading-relaxed">
            Build faster with{' '}
            <span className="text-white font-semibold">Razorpay</span>,{' '}
            <span className="text-white font-semibold">GST-ready invoices</span>, and{' '}
            <span className="text-white font-semibold">Mumbai hosting</span>{' '}
            — already integrated. No plugin hunting. Just ship.
          </p>

          {/* Email Form Card */}
          <div id="waitlist" className="max-w-xl mx-auto mb-20">
            {!success ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="glass-strong rounded-3xl p-8 text-left border-white/20"
              >
                <h3 className="text-xl md:text-2xl font-bold text-white mb-2">
                  Join the waitlist 🚀
                </h3>
                <p className="text-sm text-white/60 mb-6">
                  Early access + ₹2,999 lifetime Starter (first 100 only)
                </p>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <input
                      type="text"
                      placeholder="Your name (optional)"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/40 focus:outline-none focus:border-cyan-brand/60 transition"
                    />
                    <input
                      type="email"
                      required
                      placeholder="you@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/40 focus:outline-none focus:border-cyan-brand/60 transition"
                    />
                  </div>

                  <div className="relative">
                    <select
                      value={useCase}
                      onChange={(e) => setUseCase(e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 pr-10 text-white focus:outline-none focus:border-cyan-brand/60 transition appearance-none cursor-pointer"
                    >
                      <option value="" className="bg-[#0e1417]">What will you build?</option>
                      <option value="saas" className="bg-[#0e1417]">SaaS for Indian users</option>
                      <option value="ecommerce" className="bg-[#0e1417]">E-commerce backend</option>
                      <option value="agency" className="bg-[#0e1417]">Client work / Agency</option>
                      <option value="booking" className="bg-[#0e1417]">Booking / Appointments</option>
                      <option value="content" className="bg-[#0e1417]">Content / Blog backend</option>
                      <option value="exploring" className="bg-[#0e1417]">Just exploring</option>
                      <option value="other" className="bg-[#0e1417]">Something else</option>
                    </select>
                    <svg
                      className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/60"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.23 7.21a.75.75 0 011.06.02L10 11.06l3.71-3.83a.75.75 0 111.08 1.04l-4.25 4.39a.75.75 0 01-1.08 0L5.21 8.27a.75.75 0 01.02-1.06z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>

                  {error && (
                    <p className="text-sm text-red-400 bg-red-500/10 border border-red-500/20 rounded-lg px-3 py-2">
                      {error}
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={loading}
                    className="btn-neo w-full bg-cyan-brand hover:bg-cyan-hover text-black font-bold py-4 rounded-xl flex items-center justify-center gap-2 disabled:opacity-50 transition"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" /> Joining...
                      </>
                    ) : (
                      <>
                        Get Early Access <ArrowRight className="w-5 h-5" />
                      </>
                    )}
                  </button>
                </form>

                <p className="text-[10px] text-center text-white/40 mt-4 uppercase tracking-widest font-bold">
                  No spam · Unsubscribe anytime
                </p>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="glass-strong rounded-3xl p-12 text-center"
              >
                <div className="w-16 h-16 bg-cyan-brand/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 className="w-8 h-8 text-cyan-brand" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">You're in! 🎉</h3>
                <p className="text-white/60 mb-6">
                  We'll email when BharatCMS launches. Help spread the word?
                </p>
                <a
                  href="https://twitter.com/intent/tweet?text=Just%20joined%20the%20BharatCMS%20waitlist%20%E2%80%94%20a%20headless%20CMS%20for%20Indian%20developers%20%F0%9F%87%AE%F0%9F%87%B3%20%23BuildInPublic"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 text-cyan-brand hover:underline"
                >
                  <TwitterIcon className="w-4 h-4" /> Tweet about it
                </a>
              </motion.div>
            )}
          </div>

          {/* Dashboard Preview Mockup */}
          <div className="rounded-xl bg-gradient-to-br from-[#0a1014] to-[#161d1f] aspect-[4/3] sm:aspect-video p-3 sm:p-6 md:p-10 flex flex-col gap-3 sm:gap-4 relative overflow-hidden border border-white/5">
            <div className="flex items-center justify-between border-b border-white/5 pb-2 sm:pb-4">
              <div className="flex items-center gap-1.5 sm:gap-2">
                <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-red-500/60" />
                <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-yellow-500/60" />
                <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-green-500/60" />
              </div>
              <div className="text-[9px] sm:text-xs text-white/30 font-mono truncate px-2">
                bharatcms.com/admin
              </div>
              <div className="w-6 sm:w-12 shrink-0" />
            </div>

            <div className="grid grid-cols-12 gap-2 sm:gap-4 flex-1 min-h-0">
              <div className="col-span-4 sm:col-span-4 md:col-span-3 bg-white/[0.02] rounded-lg p-2 sm:p-3 space-y-1 sm:space-y-2">
                <div className="text-[7px] sm:text-[9px] md:text-[10px] text-cyan-brand font-bold mb-1.5 sm:mb-2 tracking-wider">
                  CONTENT
                </div>
                {['Products', 'Orders', 'Customers', 'Pages'].map((item, i) => (
                  <div
                    key={item}
                    className={`text-[9px] sm:text-[10px] md:text-xs px-1.5 sm:px-2 py-1 sm:py-1.5 rounded ${i === 0 ? 'bg-cyan-brand/20 text-cyan-brand' : 'text-white/40'
                      }`}
                  >
                    {item}
                  </div>
                ))}
              </div>

              <div className="col-span-8 sm:col-span-8 md:col-span-9 space-y-2 sm:space-y-3 flex flex-col min-h-0">
                <div className="flex items-center justify-between">
                  <div className="h-2 sm:h-3 bg-white/10 rounded w-20 sm:w-32" />
                  <div className="h-5 sm:h-6 bg-cyan-brand/30 rounded w-16 sm:w-24" />
                </div>

                <div className="grid grid-cols-3 gap-1.5 sm:gap-3">
                  {[
                    { label: 'Revenue', value: '₹1.2L', color: 'text-cyan-brand' },
                    { label: 'Orders', value: '47', color: 'text-saffron-brand' },
                    { label: 'API Calls', value: '12K', color: 'text-purple-brand' },
                  ].map((stat) => (
                    <div
                      key={stat.label}
                      className="bg-white/[0.03] border border-white/5 rounded-md sm:rounded-lg p-1.5 sm:p-3"
                    >
                      <div className="text-[6px] sm:text-[8px] md:text-[9px] text-white/40 uppercase tracking-wide truncate leading-tight">
                        {stat.label}
                      </div>
                      <div className={`text-xs sm:text-base md:text-lg font-bold ${stat.color} mt-0.5`}>
                        {stat.value}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="bg-white/[0.03] border border-white/5 rounded-md sm:rounded-lg p-2 sm:p-3 flex-1 flex items-end gap-0.5 sm:gap-1 min-h-[60px]">
                  {[40, 60, 35, 80, 55, 90, 70, 85, 60, 95, 75, 88].map((h, i) => (
                    <div
                      key={i}
                      style={{ height: `${h}%` }}
                      className="flex-1 bg-gradient-to-t from-cyan-brand/40 to-cyan-brand/80 rounded-sm"
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* ============ NEW: WHY THIS EXISTS (Premium UI) ============ */}
      <section className="max-w-6xl mx-auto px-6 md:px-8 py-32 relative">
        {/* Background accent */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-96 bg-cyan-brand/5 blur-[120px] rounded-full -z-10" />

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-saffron-brand animate-pulse" />
            <span className="text-xs font-semibold tracking-wider uppercase text-white/70">
              The Problem
            </span>
          </div>
          <h2 className="text-4xl md:text-6xl font-black mb-6 leading-tight">
            Stop Rebuilding the<br />
            <span className="text-cyan-brand">Same Stack</span> Every Project.
          </h2>
          <p className="text-lg text-white/50 max-w-2xl mx-auto">
            Every Indian developer wastes weeks on the same setup.
            <br className="hidden md:block" />
            We've already done it — for you.
          </p>
        </motion.div>

        {/* Comparison Container */}
        <div className="relative">
          {/* VS Divider (Desktop) */}
          <div className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 items-center justify-center">
            <div className="relative">
              <div className="absolute inset-0 bg-cyan-brand blur-xl opacity-50" />
              <div className="relative w-16 h-16 rounded-full bg-gradient-to-br from-cyan-brand to-purple-brand flex items-center justify-center border-4 border-[#0e1417] shadow-2xl">
                <span className="text-black font-black text-sm tracking-tight">VS</span>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6 lg:gap-12">

            {/* WITHOUT BharatCMS */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative group"
            >
              <div className="relative glass rounded-3xl p-8 md:p-10 border border-red-500/15 bg-gradient-to-br from-red-500/[0.04] via-transparent to-transparent overflow-hidden h-full">
                {/* Top gradient line */}
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-red-500/40 to-transparent" />

                {/* Watermark */}
                <div className="absolute -top-8 -right-8 text-[120px] font-black text-red-500/[0.03] select-none pointer-events-none">
                  😩
                </div>

                {/* Header */}
                <div className="relative mb-8">
                  <p className="text-[10px] uppercase tracking-widest text-red-400/70 font-bold mb-2">
                    Without BharatCMS
                  </p>
                  <h3 className="text-3xl md:text-4xl font-black text-white/90">
                    The Old Way
                  </h3>
                  <p className="text-sm text-white/40 mt-2">
                    ~3-4 weeks of setup. Every. Single. Project.
                  </p>
                </div>

                {/* List */}
                <ul className="relative space-y-4">
                  {[
                    { time: '2 weeks', task: 'Integrating Razorpay', detail: 'Reading docs, handling webhooks, testing flows' },
                    { time: '5 days', task: 'GST invoice logic', detail: 'HSN codes, CGST/SGST splits, PDF generation' },
                    { time: '3 days', task: 'Configuring Mumbai hosting', detail: 'AWS setup, CDN, SSL, monitoring' },
                    { time: '∞ days', task: 'Stripe-first tools', detail: "Wrappers, hacks, things that don't fit India" },
                  ].map((item, i) => (
                    <motion.li
                      key={item.task}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.1 + i * 0.08 }}
                      className="flex items-start gap-4 group/item"
                    >
                      {/* Time badge */}
                      <div className="shrink-0 w-16 text-center">
                        <div className="px-2 py-1 rounded-md bg-red-500/10 border border-red-500/20">
                          <p className="text-[10px] font-mono font-bold text-red-400 uppercase">
                            {item.time}
                          </p>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="flex-1 pb-3 border-b border-white/5 last:border-0">
                        <p className="text-white/80 font-semibold text-base">
                          {item.task}
                        </p>
                        <p className="text-white/40 text-xs mt-1">
                          {item.detail}
                        </p>
                      </div>
                    </motion.li>
                  ))}
                </ul>

                {/* Bottom Result */}
                <div className="mt-8 pt-6 border-t border-red-500/10">
                  <div className="flex items-center justify-between">
                    <p className="text-xs text-white/40 uppercase tracking-wider">
                      Total time wasted
                    </p>
                    <p className="text-2xl font-black text-red-400">
                      3-4 weeks
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* WITH BharatCMS */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="relative group"
            >
              {/* Glow effect */}
              <div className="absolute -inset-1 bg-gradient-to-br from-cyan-brand/30 via-purple-brand/20 to-cyan-brand/30 rounded-3xl blur-2xl opacity-40 group-hover:opacity-70 transition duration-700" />

              <div className="relative glass-strong rounded-3xl p-8 md:p-10 border border-cyan-brand/30 bg-gradient-to-br from-cyan-brand/[0.08] via-transparent to-purple-brand/[0.05] overflow-hidden h-full">
                {/* Top gradient line */}
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-brand to-transparent" />

                {/* Watermark */}
                <div className="absolute -top-8 -right-8 text-[120px] font-black text-cyan-brand/[0.04] select-none pointer-events-none">
                  🚀
                </div>

                {/* Header */}
                <div className="relative mb-8">
                  <p className="text-[10px] uppercase tracking-widest text-cyan-brand font-bold mb-2">
                    With BharatCMS
                  </p>
                  <h3 className="text-3xl md:text-4xl font-black text-white">
                    Day One Ready
                  </h3>
                  <p className="text-sm text-white/50 mt-2">
                    Skip the setup. Start shipping features.
                  </p>
                </div>

                {/* List */}
                <ul className="relative space-y-4">
                  {[
                    { time: '0 mins', task: 'Razorpay ready out-of-box', detail: 'UPI, cards, subscriptions, webhooks' },
                    { time: '0 mins', task: 'GST invoices auto-generated', detail: 'Compliant PDFs with all tax splits' },
                    { time: '0 mins', task: 'Mumbai hosting included', detail: 'ap-south-1, sub-50ms latency' },
                    { time: '0 mins', task: 'India-first by default', detail: '₹ symbol, DD/MM dates, regional UX' },
                  ].map((item, i) => (
                    <motion.li
                      key={item.task}
                      initial={{ opacity: 0, x: 10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.1 + i * 0.08 }}
                      className="flex items-start gap-4 group/item"
                    >
                      {/* Time badge */}
                      <div className="shrink-0 w-16 text-center">
                        <div className="px-2 py-1 rounded-md bg-cyan-brand/15 border border-cyan-brand/30">
                          <p className="text-[10px] font-mono font-bold text-cyan-brand uppercase">
                            {item.time}
                          </p>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="flex-1 pb-3 border-b border-white/5 last:border-0">
                        <p className="text-white font-semibold text-base">
                          {item.task}
                        </p>
                        <p className="text-white/50 text-xs mt-1">
                          {item.detail}
                        </p>
                      </div>
                    </motion.li>
                  ))}
                </ul>

                {/* Bottom Result */}
                <div className="mt-8 pt-6 border-t border-cyan-brand/20">
                  <div className="flex items-center justify-between">
                    <p className="text-xs text-white/40 uppercase tracking-wider">
                      Time saved
                    </p>
                    <p className="text-2xl font-black text-cyan-brand">
                      3-4 weeks
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Bottom Stats Strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-12 grid grid-cols-3 gap-4 md:gap-6 max-w-3xl mx-auto"
        >
          {[
            { value: '3-4 weeks', label: 'Time saved per project' },
            { value: '₹0', label: 'Setup cost' },
            { value: 'Day 1', label: 'Ready to ship' },
          ].map((stat, i) => (
            <div
              key={stat.label}
              className="glass rounded-2xl p-4 md:p-6 text-center border border-white/10 hover:border-cyan-brand/30 transition"
            >
              <p className="text-xl md:text-2xl font-black text-cyan-brand mb-1">
                {stat.value}
              </p>
              <p className="text-[10px] md:text-xs uppercase tracking-wider text-white/50 font-semibold">
                {stat.label}
              </p>
            </div>
          ))}
        </motion.div>
      </section>

      {/* ============ #BUILDINPUBLIC STATS ============ */}
      <section id="stats" className="bg-black/30 py-20 border-y border-white/5 relative">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <h2 className="text-center text-xs font-bold text-white/40 mb-12 tracking-[0.2em] uppercase">
            Building in Public · Live Stats
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-12">
            {[
              { value: '0', label: 'Waitlist Signups', color: 'text-cyan-brand' },
              { value: 'Day 1', label: 'Of Building', color: 'text-purple-brand' },
              { value: '0', label: 'Paying Users', color: 'text-white' },
              { value: '₹0', label: 'Revenue (So Far)', color: 'text-emerald-400' },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass rounded-2xl p-6 text-center border border-white/10"
              >
                <p className={`text-4xl md:text-5xl font-black leading-none mb-2 ${stat.color}`}>
                  {stat.value}
                </p>
                <p className="text-xs uppercase tracking-wider text-white/50 font-semibold">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </div>
          <div className="flex flex-wrap justify-center gap-3">
            {[
              { icon: Database, color: 'text-cyan-brand', text: '🇮🇳 Mumbai Hosted' },
              { icon: Unlock, color: 'text-purple-brand', text: '🔓 Open Source (MIT)' },
              { icon: BarChart3, color: 'text-saffron-brand', text: '📊 Public Roadmap' },
            ].map((badge) => (
              <div key={badge.text} className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-sm">
                <badge.icon className={`w-4 h-4 ${badge.color}`} />
                <span className="text-white/80">{badge.text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ FEATURES (Compressed) ============ */}
      <section id="features" className="max-w-7xl mx-auto px-6 md:px-8 py-32">
        <div className="mb-16 max-w-2xl text-center mx-auto">
          <h2 className="text-4xl md:text-6xl font-black mb-4">
            Built-in. Not Bolted-on.
          </h2>
          <p className="text-lg text-white/60">
            Core integrations included. Add-ons when you need them.
          </p>
        </div>

        {/* Core Features */}
        <div className="mb-12">
          <p className="text-xs uppercase tracking-widest text-cyan-brand/80 font-bold mb-6 text-center">
            ✓ Core (Included)
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Razorpay */}
            <motion.div
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              className="glass rounded-2xl p-6 border border-white/10 hover:border-cyan-brand/30 transition"
            >
              <CreditCard className="w-8 h-8 text-cyan-brand mb-4" />
              <h3 className="text-xl font-bold mb-2">Razorpay Plugin</h3>
              <p className="text-white/60 text-sm">
                Built-in UPI, cards, subscriptions, and webhooks. No manual setup.
              </p>
            </motion.div>

            {/* GST */}
            <motion.div
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
              className="glass rounded-2xl p-6 border border-white/10 hover:border-saffron-brand/30 transition"
            >
              <FileText className="w-8 h-8 text-saffron-brand mb-4" />
              <h3 className="text-xl font-bold mb-2">GST Invoice Generator</h3>
              <p className="text-white/60 text-sm">
                GST-compliant PDFs with correct tax splits. (Filing — use Tally/Zoho.)
              </p>
            </motion.div>

            {/* Mumbai Hosting */}
            <motion.div
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}
              className="glass rounded-2xl p-6 border border-white/10 hover:border-emerald-500/30 transition"
            >
              <Zap className="w-8 h-8 text-emerald-400 mb-4" />
              <h3 className="text-xl font-bold mb-2">Mumbai Hosting</h3>
              <p className="text-white/60 text-sm">
                ap-south-1 region. ~30-50ms latency for Indian users.
              </p>
            </motion.div>

            {/* Strapi-Compatible */}
            <motion.div
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.3 }}
              className="glass rounded-2xl p-6 border border-white/10 hover:border-cyan-brand/30 transition"
            >
              <Code2 className="w-8 h-8 text-cyan-brand mb-4" />
              <h3 className="text-xl font-bold mb-2">Strapi-Compatible</h3>
              <p className="text-white/60 text-sm">
                Built on Strapi v4. Same APIs, plugins, and DX you know.
              </p>
            </motion.div>

            {/* Templates */}
            <motion.div
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.4 }}
              className="glass rounded-2xl p-6 border border-white/10 hover:border-purple-brand/30 transition"
            >
              <Layout className="w-8 h-8 text-purple-brand mb-4" />
              <h3 className="text-xl font-bold mb-2">Starter Schemas</h3>
              <p className="text-white/60 text-sm">
                E-commerce, Booking, Real Estate. Skip the boilerplate.
              </p>
            </motion.div>

            {/* Open Source */}
            <motion.div
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.5 }}
              className="glass rounded-2xl p-6 border border-white/10 hover:border-cyan-brand/30 transition"
            >
              <Unlock className="w-8 h-8 text-cyan-brand mb-4" />
              <h3 className="text-xl font-bold mb-2">Open Source</h3>
              <p className="text-white/60 text-sm">
                MIT-licensed. Self-host or use our cloud. Your choice.
              </p>
            </motion.div>
          </div>
        </div>

        {/* Add-ons */}
        <div>
          <p className="text-xs uppercase tracking-widest text-saffron-brand/80 font-bold mb-6 text-center">
            ⏳ Add-ons (Pay-as-you-go)
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Vayu AI */}
            <motion.div
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              className="glass rounded-2xl p-6 border border-white/10 hover:border-purple-brand/30 transition"
            >
              <Sparkles className="w-8 h-8 text-purple-brand mb-4" />
              <h3 className="text-xl font-bold mb-2">AI Helpers</h3>
              <p className="text-white/60 text-sm">
                Generate content in Hindi & Indian languages. Usage-based pricing.
              </p>
            </motion.div>

            {/* WhatsApp */}
            <motion.div
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
              className="glass rounded-2xl p-6 border border-white/10 hover:border-emerald-500/30 transition"
            >
              <MessageCircle className="w-8 h-8 text-emerald-400 mb-4" />
              <h3 className="text-xl font-bold mb-2">WhatsApp Notifications</h3>
              <p className="text-white/60 text-sm">
                Order alerts, booking reminders, receipts. Pay per message (Meta pricing).
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ============ PRICING (with decision guidance) ============ */}
      <section id="pricing" className="max-w-7xl mx-auto px-6 md:px-8 py-32">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-6xl font-black mb-4">Simple Pricing</h2>
          <p className="text-lg text-white/60 mb-2">
            Start simple. Scale when needed.
          </p>
          <p className="text-sm text-white/40">
            Most developers begin with Starter and upgrade as their product grows.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {/* Free */}
          <div className="glass rounded-3xl p-6 border border-white/10 flex flex-col">
            <p className="text-xs uppercase tracking-widest text-white/50 font-bold mb-2">Hobby</p>
            <p className="text-xs text-white/40 mb-4">Side projects</p>
            <div className="flex items-baseline gap-1 mb-6">
              <span className="text-4xl font-black">₹0</span>
              <span className="text-white/50 text-sm">/mo</span>
            </div>
            <ul className="space-y-2 mb-8 flex-grow text-sm">
              {['1 project', '1K records', '1 GB storage', 'Razorpay test mode', 'Community support'].map((perk) => (
                <li key={perk} className="flex items-start gap-2 text-white/70">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" /> {perk}
                </li>
              ))}
            </ul>
            <a href="#waitlist" className="w-full py-3 rounded-xl border border-white/10 text-white font-bold text-center hover:bg-white/5 transition text-sm">
              Start Free
            </a>
          </div>

          {/* Starter - Most Popular */}
          <div className="glass-strong rounded-3xl p-6 border-2 border-cyan-brand relative flex flex-col bg-gradient-to-b from-cyan-brand/5 to-transparent">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-cyan-brand text-black px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest whitespace-nowrap">
              Most Popular
            </div>
            <p className="text-xs uppercase tracking-widest text-cyan-brand font-bold mb-2">Starter</p>
            <p className="text-xs text-white/40 mb-4">Indie devs</p>
            <div className="flex items-baseline gap-1 mb-6">
              <span className="text-4xl font-black">₹499</span>
              <span className="text-white/50 text-sm">/mo</span>
            </div>
            <ul className="space-y-2 mb-8 flex-grow text-sm">
              {['3 projects', '10K records', '10 GB storage', 'Razorpay LIVE mode', 'GST invoices', 'Custom domain', 'Email support'].map((perk) => (
                <li key={perk} className="flex items-start gap-2 text-white">
                  <Check className="w-4 h-4 text-cyan-brand shrink-0 mt-0.5" /> {perk}
                </li>
              ))}
            </ul>
            <a href="#waitlist" className="btn-neo w-full py-3 rounded-xl bg-cyan-brand text-black font-bold text-center transition text-sm">
              Get Starter
            </a>
          </div>

          {/* Pro */}
          <div className="glass rounded-3xl p-6 border border-white/10 flex flex-col">
            <p className="text-xs uppercase tracking-widest text-purple-brand font-bold mb-2">Pro</p>
            <p className="text-xs text-white/40 mb-4">Studios & startups</p>
            <div className="flex items-baseline gap-1 mb-6">
              <span className="text-4xl font-black">₹1,499</span>
              <span className="text-white/50 text-sm">/mo</span>
            </div>
            <ul className="space-y-2 mb-8 flex-grow text-sm">
              {['10 projects', '100K records', '50 GB storage', 'Everything in Starter', 'Webhooks + advanced', 'Priority support'].map((perk) => (
                <li key={perk} className="flex items-start gap-2 text-white/70">
                  <Check className="w-4 h-4 text-purple-brand shrink-0 mt-0.5" /> {perk}
                </li>
              ))}
            </ul>
            <a href="#waitlist" className="w-full py-3 rounded-xl border border-purple-brand/40 text-purple-brand font-bold text-center hover:bg-purple-brand/10 transition text-sm">
              Get Pro
            </a>
          </div>

          {/* Business */}
          <div className="glass rounded-3xl p-6 border border-white/10 flex flex-col">
            <p className="text-xs uppercase tracking-widest text-saffron-brand font-bold mb-2">Business</p>
            <p className="text-xs text-white/40 mb-4">Agencies & teams</p>
            <div className="flex items-baseline gap-1 mb-6">
              <span className="text-4xl font-black">₹3,999</span>
              <span className="text-white/50 text-sm">/mo</span>
            </div>
            <ul className="space-y-2 mb-8 flex-grow text-sm">
              {['Unlimited projects', 'Dedicated infra', 'White-label', '99.9% SLA', 'Dedicated support'].map((perk) => (
                <li key={perk} className="flex items-start gap-2 text-white/70">
                  <Check className="w-4 h-4 text-saffron-brand shrink-0 mt-0.5" /> {perk}
                </li>
              ))}
            </ul>
            <a href="#waitlist" className="w-full py-3 rounded-xl border border-saffron-brand/40 text-saffron-brand font-bold text-center hover:bg-saffron-brand/10 transition text-sm">
              Contact Us
            </a>
          </div>
        </div>

        {/* Add-ons strip */}
        <div className="mt-12 max-w-4xl mx-auto">
          <p className="text-center text-xs uppercase tracking-widest text-white/40 font-bold mb-4">
            Pay-as-you-go Add-ons
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { label: 'AI Generation', price: '₹500', unit: '/1K' },
              { label: 'WhatsApp', price: '₹1.50', unit: '/msg' },
              { label: 'Email', price: '₹200', unit: '/10K' },
              { label: 'Storage', price: '₹300', unit: '/50GB' },
            ].map((addon) => (
              <div key={addon.label} className="bg-white/5 border border-white/10 rounded-xl p-4 text-center">
                <p className="text-xs uppercase text-white/40 font-bold mb-1">{addon.label}</p>
                <p className="text-lg font-black text-white">{addon.price}<span className="text-xs text-white/40">{addon.unit}</span></p>
              </div>
            ))}
          </div>
        </div>

        {/* Lifetime Deal */}
        <div className="mt-12 max-w-2xl mx-auto">
          <div className="glass-strong rounded-3xl p-8 border-2 border-saffron-brand relative bg-gradient-to-b from-saffron-brand/10 to-transparent">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-saffron-brand text-black px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest whitespace-nowrap">
              First 100 only
            </div>
            <div className="text-center">
              <p className="text-xs uppercase tracking-widest text-saffron-brand font-bold mb-2">Lifetime Starter</p>
              <p className="text-xs text-white/50 mb-4">Best for early adopters building side projects</p>
              <div className="flex items-baseline gap-1 justify-center mb-4">
                <span className="text-5xl font-black">₹2,999</span>
                <span className="text-white/50">once</span>
              </div>
              <p className="text-white/60 mb-6 max-w-md mx-auto text-sm">
                Lock in <span className="text-white font-semibold">Starter limits forever</span>.
                Add-ons stay pay-as-you-go.
              </p>
              <a href="#waitlist" className="btn-neo inline-block bg-saffron-brand text-black px-8 py-3 rounded-xl font-bold transition" style={{ boxShadow: '0 0 30px rgba(255,153,51,0.3)' }}>
                Reserve My Spot
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ============ SCOPE (Premium UI) ============ */}
      <section id="scope" className="max-w-6xl mx-auto px-6 md:px-8 py-32">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 mb-6">
            <AlertCircle className="w-3 h-3 text-saffron-brand" />
            <span className="text-xs font-semibold tracking-wider uppercase text-white/70">
              Honest Scope
            </span>
          </div>
          <h2 className="text-4xl md:text-6xl font-black mb-4 leading-tight">
            Built for <span className="text-cyan-brand">Developers</span>.
            <br />
            Not <span className="text-white/30 line-through decoration-red-500/60 decoration-2">Everyone</span>.
          </h2>
          <p className="text-lg text-white/50 max-w-xl mx-auto">
            Clear scope. No surprises. No marketing fluff.
          </p>
        </motion.div>

        {/* Comparison Cards */}
        <div className="grid md:grid-cols-2 gap-6 lg:gap-8">

          {/* WHAT IT IS */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative group"
          >
            {/* Glow effect */}
            <div className="absolute -inset-0.5 bg-gradient-to-br from-emerald-500/30 via-cyan-brand/20 to-emerald-500/30 rounded-3xl blur-xl opacity-50 group-hover:opacity-75 transition duration-500" />

            <div className="relative glass-strong rounded-3xl p-8 md:p-10 border border-emerald-500/20 bg-gradient-to-br from-emerald-500/[0.08] via-transparent to-cyan-brand/[0.05] h-full">
              {/* Header */}
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center">
                    <CheckCircle2 className="w-6 h-6 text-emerald-400" />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-widest text-emerald-400/80 font-bold">
                      What it IS
                    </p>
                    <h3 className="text-2xl font-black text-white">
                      Core Promise
                    </h3>
                  </div>
                </div>
              </div>

              {/* List */}
              <ul className="space-y-4">
                {[
                  { label: 'Headless CMS', sub: 'Built on Strapi v4 (MIT)' },
                  { label: 'Razorpay Payments', sub: 'UPI, cards, subscriptions' },
                  { label: 'GST Invoice PDFs', sub: 'HSN codes, tax splits' },
                  { label: 'Mumbai-Hosted', sub: 'ap-south-1, sub-50ms' },
                  { label: 'Open Source', sub: 'MIT licensed, self-host friendly' },
                ].map((item, i) => (
                  <motion.li
                    key={item.label}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 + i * 0.05 }}
                    className="flex items-start gap-3 group/item"
                  >
                    <div className="w-5 h-5 rounded-md bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center shrink-0 mt-0.5 group-hover/item:bg-emerald-500/30 transition">
                      <Check className="w-3 h-3 text-emerald-400" strokeWidth={3} />
                    </div>
                    <div>
                      <p className="text-white font-semibold text-base leading-tight">
                        {item.label}
                      </p>
                      <p className="text-white/40 text-sm mt-0.5">
                        {item.sub}
                      </p>
                    </div>
                  </motion.li>
                ))}
              </ul>

              {/* Bottom tag */}
              <div className="mt-8 pt-6 border-t border-white/5">
                <p className="text-xs text-emerald-400/70 font-mono">
                  → If this matches your needs, you're in the right place.
                </p>
              </div>
            </div>
          </motion.div>

          {/* WHAT IT IS NOT */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="relative group"
          >
            {/* Glow effect */}
            <div className="absolute -inset-0.5 bg-gradient-to-br from-red-500/20 via-saffron-brand/10 to-red-500/20 rounded-3xl blur-xl opacity-40 group-hover:opacity-60 transition duration-500" />

            <div className="relative glass-strong rounded-3xl p-8 md:p-10 border border-red-500/20 bg-gradient-to-br from-red-500/[0.05] via-transparent to-saffron-brand/[0.03] h-full">
              {/* Header */}
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-red-500/10 border border-red-500/30 flex items-center justify-center">
                    <AlertCircle className="w-6 h-6 text-red-400" />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-widest text-red-400/80 font-bold">
                      What it's NOT
                    </p>
                    <h3 className="text-2xl font-black text-white">
                      Honest Limits
                    </h3>
                  </div>
                </div>
              </div>

              {/* List */}
              <ul className="space-y-4">
                {[
                  { label: 'Not Shopify', sub: "We're a CMS, not a storefront builder" },
                  { label: 'Not Tally / Zoho', sub: 'No GST filing — just invoices' },
                  { label: 'Not WATI / Gupshup', sub: 'WhatsApp is a paid add-on' },
                  { label: 'Not No-Code', sub: 'Developers only (for now)' },
                  { label: 'Not Magic AI', sub: 'AI-assisted, not AI-everything' },
                ].map((item, i) => (
                  <motion.li
                    key={item.label}
                    initial={{ opacity: 0, x: 10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 + i * 0.05 }}
                    className="flex items-start gap-3 group/item"
                  >
                    <div className="w-5 h-5 rounded-md bg-red-500/15 border border-red-500/40 flex items-center justify-center shrink-0 mt-0.5 group-hover/item:bg-red-500/25 transition">
                      {/* < className="w-3 h-3 text-red-400" strokeWidth={3} /> */}
                    </div>
                    <div>
                      <p className="text-white font-semibold text-base leading-tight">
                        {item.label}
                      </p>
                      <p className="text-white/40 text-sm mt-0.5">
                        {item.sub}
                      </p>
                    </div>
                  </motion.li>
                ))}
              </ul>

              {/* Bottom tag */}
              <div className="mt-8 pt-6 border-t border-white/5">
                <p className="text-xs text-red-400/70 font-mono">
                  → Need these? Use the right tool for the job.
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom Trust Line */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <p className="text-sm text-white/40 italic max-w-2xl mx-auto">
            "We'd rather lose a customer to clarity than win one with confusion."
          </p>
        </motion.div>
      </section>

      {/* ============ FINAL CTA (Stronger) ============ */}
      <section className="max-w-5xl mx-auto px-6 md:px-8 py-32">
        <div className="glass-strong rounded-[32px] p-12 md:p-16 text-center border border-white/20 bg-gradient-to-b from-white/10 to-transparent relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyan-brand to-transparent" />
          <h2 className="text-4xl md:text-6xl font-black mb-6">
            Start Building for India
          </h2>
          <p className="text-lg text-white/60 mb-10 max-w-xl mx-auto">
            Join the first 100 developers using BharatCMS. Lifetime Starter for ₹2,999.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="#waitlist" className="btn-neo bg-cyan-brand text-black px-10 py-4 rounded-xl text-lg font-bold transition">
              Join Waitlist 🚀
            </a>
            <a
              href="https://github.com/codecay7/bharatcms"
              target="_blank"
              rel="noreferrer"
              className="bg-white/5 border border-white/10 px-10 py-4 rounded-xl text-lg font-bold hover:bg-white/10 transition flex items-center justify-center gap-2"
            >
              View GitHub <Star className="w-5 h-5 text-yellow-400" />
            </a>
          </div>
        </div>
      </section>

      {/* ============ FOOTER ============ */}
      <footer className="bg-black/40 w-full mt-20 py-16 border-t border-white/10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 max-w-7xl mx-auto px-6 md:px-8">
          <div className="col-span-2 space-y-6">
            <span className="text-white font-black text-xl">
              Bharat<span className="text-cyan-brand">CMS</span>
            </span>
            <p className="text-white/40 text-sm leading-relaxed max-w-xs">
              Built solo by Diwakar Kumar. Day 1 of #BuildInPublic. Follow the journey.
            </p>
            <div className="flex gap-3">
              <a href="https://github.com/codecay7/bharatcms" target="_blank" rel="noreferrer" className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-white/60 hover:text-cyan-brand hover:border-cyan-brand/30 transition">
                <GithubIcon className="w-4 h-4" />
              </a>
              <a href="https://twitter.com/" target="_blank" rel="noreferrer" className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-white/60 hover:text-cyan-brand hover:border-cyan-brand/30 transition">
                <TwitterIcon className="w-4 h-4" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-white font-bold mb-4 uppercase text-[10px] tracking-widest">Platform</h4>
            <ul className="space-y-3 text-xs">
              {['Roadmap', 'API Docs', 'Pricing', 'Changelog'].map((link) => (
                <li key={link}>
                  <a href="#" className="text-white/40 uppercase tracking-widest hover:text-cyan-brand transition">{link}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-4 uppercase text-[10px] tracking-widest">Community</h4>
            <ul className="space-y-3 text-xs">
              {['Discord', 'GitHub', 'Twitter', 'Email'].map((link) => (
                <li key={link}>
                  <a href="#" className="text-white/40 uppercase tracking-widest hover:text-cyan-brand transition">{link}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 md:px-8 mt-12 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-white/40 text-[10px] uppercase tracking-widest">
            © 2026 BharatCMS. Made with ❤️ in India 🇮🇳
          </p>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-yellow-400 animate-pulse" />
            <span className="text-white/40 text-[10px] uppercase tracking-widest">Currently in Development</span>
          </div>
        </div>
      </footer>
    </main>
  );
}