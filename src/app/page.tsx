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
  Users,
  Zap,
  Star,
  ExternalLink,
} from 'lucide-react';
import { GithubIcon, TwitterIcon } from '@/lib/icons';
import { supabase } from '@/lib/supabase';

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
              <a href="#stats" className="text-white/60 hover:text-white transition">Roadmap</a>
              <a href="https://github.com/codecay7/bharatcms" target="_blank" rel="noreferrer" className="text-white/60 hover:text-white transition">GitHub</a>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="hidden sm:block bg-saffron-brand/10 text-saffron-brand text-[10px] font-bold px-2 py-1 rounded border border-saffron-brand/20 uppercase tracking-widest">
              Made in India 🇮🇳
            </span>
            <a
              href="#waitlist"
              className="bg-cyan-brand text-black font-bold px-5 py-2 rounded-lg btn-neo text-sm"
            >
              Join Waitlist
            </a>
          </div>
        </nav>
      </header>

      {/* ============ HERO ============ */}
      <section className="relative max-w-7xl mx-auto px-6 md:px-8 pt-20 pb-32 text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          {/* Day badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 mb-8">
            <span className="w-2 h-2 rounded-full bg-cyan-brand animate-pulse" />
            <span className="text-xs font-semibold tracking-wider uppercase text-white/70">
              Day 1 of #BuildInPublic · Launching Soon
            </span>
          </div>

          {/* Headline */}
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black mb-6 leading-[1.05] max-w-5xl mx-auto">
            The Headless CMS<br />
            Built for <span className="text-cyan-brand">India 🇮🇳</span>
          </h1>

          {/* Subheadline */}
          <p className="text-lg md:text-xl text-white/60 max-w-3xl mx-auto mb-12 leading-relaxed">
            Native support for{' '}
            <span className="text-white font-semibold">Razorpay</span>,{' '}
            <span className="text-white font-semibold">GST Invoicing</span>,{' '}
            <span className="text-white font-semibold">Hindi & 22 Indian languages</span>,
            and Bharat-tuned AI. Skip Strapi. Skip Contentful. Build in ₹.
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
                  Get early access + lifetime ₹2,999 deal (first 100 customers only)
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
    <option value="ecommerce" className="bg-[#0e1417]">E-commerce store</option>
    <option value="booking" className="bg-[#0e1417]">Booking / Appointments</option>
    <option value="realestate" className="bg-[#0e1417]">Real Estate listings</option>
    <option value="education" className="bg-[#0e1417]">Education / Coaching</option>
    <option value="blog" className="bg-[#0e1417]">Blog / Content site</option>
    <option value="agency" className="bg-[#0e1417]">Agency client work</option>
    <option value="other" className="bg-[#0e1417]">Something else</option>
  </select>

  {/* Custom arrow */}
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
                  No spam · Unsubscribe anytime · Made in India 🇮🇳
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
                  We will email when BharatCMS launches. Help us spread the word?
                </p>
                <a
                  href="https://twitter.com/intent/tweet?text=Just%20joined%20the%20%40BharatCMS%20waitlist%20%E2%80%94%20India%27s%20first%20AI-powered%20headless%20CMS%20with%20Razorpay%20%26%20GST%20built-in%20%F0%9F%87%AE%F0%9F%87%B3%20%23BuildInPublic"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 text-cyan-brand hover:underline"
                >
                  <TwitterIcon className="w-4 h-4" /> Tweet about it
                </a>
              </motion.div>
            )}
          </div>

          {/* Dashboard Preview SVG Mockup */}
          <div className="relative max-w-5xl mx-auto" style={{ perspective: '1000px' }}>
            <motion.div
              initial={{ opacity: 0, rotateX: 12 }}
              whileInView={{ opacity: 1, rotateX: 6 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="glass-strong rounded-2xl overflow-hidden p-1 border border-white/20 bg-gradient-to-br from-white/10 to-transparent"
              style={{ transformStyle: 'preserve-3d' }}
            >
              {/* Mock dashboard SVG */}
              <div className="rounded-xl bg-gradient-to-br from-[#0a1014] to-[#161d1f] aspect-video p-6 md:p-10 flex flex-col gap-4 relative overflow-hidden">
                {/* Top bar */}
                <div className="flex items-center justify-between border-b border-white/5 pb-4">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500/60" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
                    <div className="w-3 h-3 rounded-full bg-green-500/60" />
                  </div>
                  <div className="text-xs text-white/30 font-mono">bharatcms.com/admin</div>
                  <div className="w-12" />
                </div>
                {/* Main content */}
                <div className="grid grid-cols-12 gap-4 flex-1">
                  {/* Sidebar */}
                  <div className="col-span-3 bg-white/[0.02] rounded-lg p-3 space-y-2">
                    <div className="text-[10px] text-cyan-brand font-bold mb-2">CONTENT</div>
                    {['Products', 'Orders', 'Customers', 'Pages'].map((item, i) => (
                      <div key={item} className={`text-xs px-2 py-1.5 rounded ${i === 0 ? 'bg-cyan-brand/20 text-cyan-brand' : 'text-white/40'}`}>
                        {item}
                      </div>
                    ))}
                  </div>
                  {/* Main */}
                  <div className="col-span-9 space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="h-3 bg-white/10 rounded w-32" />
                      <div className="h-6 bg-cyan-brand/30 rounded w-24" />
                    </div>
                    {/* Stats cards */}
                    <div className="grid grid-cols-3 gap-3">
                      {[
                        { label: 'Revenue', value: '₹1.2L', color: 'text-cyan-brand' },
                        { label: 'Orders', value: '47', color: 'text-saffron-brand' },
                        { label: 'AI Generated', value: '12', color: 'text-purple-brand' },
                      ].map((stat) => (
                        <div key={stat.label} className="bg-white/[0.03] border border-white/5 rounded-lg p-3">
                          <div className="text-[9px] text-white/40 uppercase">{stat.label}</div>
                          <div className={`text-lg font-bold ${stat.color}`}>{stat.value}</div>
                        </div>
                      ))}
                    </div>
                    {/* Chart placeholder */}
                    <div className="bg-white/[0.03] border border-white/5 rounded-lg p-3 flex-1 flex items-end gap-1 h-24">
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

            {/* Floating Cards */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="absolute -top-8 -right-4 lg:-right-10 glass-strong p-4 rounded-xl btn-neo border border-white/20 hidden md:block animate-float"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-cyan-brand/20 rounded-lg flex items-center justify-center">
                  <Users className="w-5 h-5 text-cyan-brand" />
                </div>
                <div className="text-left">
                  <p className="text-[10px] uppercase tracking-widest text-white/40 font-bold">Waitlist</p>
                  <p className="text-base font-bold text-white">Growing daily</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 }}
              className="absolute -bottom-8 -left-4 lg:-left-10 glass-strong p-4 rounded-xl btn-neo border border-white/20 hidden md:block animate-float"
              style={{ animationDelay: '1s' }}
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-emerald-500/20 rounded-lg flex items-center justify-center">
                  <Zap className="w-5 h-5 text-emerald-400" />
                </div>
                <div className="text-left">
                  <p className="text-[10px] uppercase tracking-widest text-white/40 font-bold">🇮🇳 Mumbai Region</p>
                  <p className="text-base font-bold text-white">ap-south-1</p>
                </div>
              </div>
            </motion.div>
          </div>
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
              { value: '0', label: 'GitHub Stars', color: 'text-white' },
              { value: '₹0', label: 'Revenue (Honest!)', color: 'text-emerald-400' },
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
              { icon: Database, color: 'text-cyan-brand', text: '🇮🇳 Mumbai Hosted (Supabase)' },
              { icon: Unlock, color: 'text-purple-brand', text: '🔓 Open Source · MIT License' },
              { icon: BarChart3, color: 'text-saffron-brand', text: '📊 Public Roadmap & Commits' },
            ].map((badge) => (
              <div key={badge.text} className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-sm">
                <badge.icon className={`w-4 h-4 ${badge.color}`} />
                <span className="text-white/80">{badge.text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ FEATURES BENTO ============ */}
      <section id="features" className="max-w-7xl mx-auto px-6 md:px-8 py-32">
        <div className="mb-16 max-w-2xl">
          <h2 className="text-4xl md:text-6xl font-black mb-4">
            Built for <span className="text-cyan-brand">Bharat 🇮🇳</span>
          </h2>
          <p className="text-lg text-white/60">
            Everything you need to capture the Indian market — from Tier 1 cities to rural clusters.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Razorpay (large) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="md:col-span-2 glass rounded-2xl p-8 border border-white/10 relative overflow-hidden group hover:border-cyan-brand/30 transition"
          >
            <div className="absolute -right-20 -bottom-20 w-64 h-64 bg-cyan-brand/10 blur-[80px] rounded-full" />
            <div className="relative z-10">
              <CreditCard className="w-10 h-10 text-cyan-brand mb-6" />
              <h3 className="text-2xl font-bold mb-4">Razorpay & UPI Native</h3>
              <p className="text-white/60 max-w-md mb-6">
                Plug-and-play checkout optimized for UPI, Net Banking, and local credit cards. Zero-code setup for subscription management.
              </p>
              <div className="flex gap-2 flex-wrap">
                <span className="px-3 py-1 bg-cyan-brand/20 text-cyan-brand rounded-full text-xs font-semibold">UPI Auto-pay</span>
                <span className="px-3 py-1 bg-cyan-brand/20 text-cyan-brand rounded-full text-xs font-semibold">Instant Settlements</span>
              </div>
            </div>
          </motion.div>

          {/* GST */}
          <motion.div
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
            className="glass rounded-2xl p-8 border border-white/10 hover:border-saffron-brand/30 transition"
          >
            <FileText className="w-10 h-10 text-saffron-brand mb-6" />
            <h3 className="text-2xl font-bold mb-4">GST Ready</h3>
            <p className="text-white/60">
              Auto-generate GST-compliant invoices. Handles HSN codes and interstate IGST logic out of the box.
            </p>
          </motion.div>

          {/* Vayu AI */}
          <motion.div
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}
            className="glass rounded-2xl p-8 border border-white/10 relative overflow-hidden hover:border-purple-brand/30 transition"
          >
            <Sparkles className="absolute top-4 right-4 w-5 h-5 text-purple-brand animate-pulse" />
            <h3 className="text-2xl font-bold mb-4">Vayu AI Engine</h3>
            <p className="text-white/60 mb-6">
              Generative AI tuned for 22 official Indian languages. Content that resonates from Mumbai to Mizoram.
            </p>
            <div className="grid grid-cols-4 gap-2 mt-6">
              {['वा', 'यु', 'AI', '✨'].map((char, i) => (
                <div key={i} className="aspect-square bg-purple-brand/10 border border-purple-brand/20 rounded-lg flex items-center justify-center text-2xl font-black text-purple-brand">
                  {char}
                </div>
              ))}
            </div>
          </motion.div>

          {/* Localization (large) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.3 }}
            className="md:col-span-2 glass rounded-2xl p-8 border border-white/10 flex flex-col md:flex-row gap-8 items-center hover:border-saffron-brand/30 transition"
          >
            <div className="flex-1">
              <Languages className="w-10 h-10 text-saffron-brand mb-6" />
              <h3 className="text-2xl font-bold mb-4">Hyper-Local Localization</h3>
              <p className="text-white/60">
                Translate your entire app or site into 22+ languages with one click. Special focus on Hindi, Tamil, Bengali, and Marathi nuances.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-3 shrink-0">
              {[
                { char: 'अ', label: 'Hindi' },
                { char: 'த', label: 'Tamil' },
                { char: 'ব', label: 'Bengali' },
                { char: 'म', label: 'Marathi' },
              ].map((lang) => (
                <div key={lang.label} className="bg-white/5 border border-white/10 p-4 rounded-xl text-center w-20">
                  <span className="text-2xl font-black text-white">{lang.char}</span>
                  <p className="text-[10px] text-white/40 uppercase mt-1">{lang.label}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* WhatsApp */}
          <motion.div
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.4 }}
            className="glass rounded-2xl p-8 border border-white/10 bg-gradient-to-br from-emerald-500/5 to-transparent hover:border-emerald-500/30 transition"
          >
            <MessageCircle className="w-10 h-10 text-emerald-400 mb-6" />
            <h3 className="text-2xl font-bold mb-4">WhatsApp Cloud</h3>
            <p className="text-white/60">
              Direct integration with WhatsApp Business API. Send transactional alerts and marketing campaigns from the CMS.
            </p>
          </motion.div>

          {/* Templates (large) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.5 }}
            className="md:col-span-3 glass rounded-2xl p-8 border border-white/10 hover:border-cyan-brand/30 transition group"
          >
            <div className="flex justify-between items-start mb-6">
              <div>
                <Layout className="w-10 h-10 text-cyan-brand mb-4" />
                <h3 className="text-2xl font-bold mb-2">Local Context Templates</h3>
                <p className="text-white/60 max-w-2xl">
                  Pre-built schemas for Kirana commerce, Real Estate (RERA-aligned), EdTech, Booking, and Blog platforms.
                </p>
              </div>
              <button className="bg-white/5 p-2 rounded-lg border border-white/10 hover:bg-white/10 transition">
                <ExternalLink className="w-5 h-5 text-white" />
              </button>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mt-6 opacity-60 group-hover:opacity-100 transition">
              {['E-commerce', 'Booking', 'Real Estate', 'Education', 'Blog'].map((tpl) => (
                <div key={tpl} className="bg-white/5 border border-white/10 rounded-lg p-3 text-center text-xs font-semibold text-white/70">
                  {tpl}
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ============ PRICING ============ */}
      <section id="pricing" className="max-w-7xl mx-auto px-6 md:px-8 py-32">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-black mb-4">Simple, Honest Pricing</h2>
          <p className="text-lg text-white/60">No tricks. No hidden fees. Pay in ₹.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {/* Free */}
          <div className="glass rounded-3xl p-8 border border-white/10 flex flex-col">
            <p className="text-xs uppercase tracking-widest text-white/50 font-bold mb-4">Free Forever</p>
            <div className="flex items-baseline gap-1 mb-8">
              <span className="text-5xl font-black">₹0</span>
              <span className="text-white/50">/mo</span>
            </div>
            <ul className="space-y-3 mb-10 flex-grow">
              {['1 project', '5GB storage', 'Community support', 'All core features'].map((perk) => (
                <li key={perk} className="flex items-center gap-3 text-white/70 text-sm">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" /> {perk}
                </li>
              ))}
            </ul>
            <a href="#waitlist" className="w-full py-4 rounded-xl border border-white/10 text-white font-bold text-center hover:bg-white/5 transition">
              Start Free
            </a>
          </div>

          {/* Pro */}
          <div className="glass-strong rounded-3xl p-8 border-2 border-cyan-brand relative flex flex-col bg-gradient-to-b from-cyan-brand/5 to-transparent">
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-cyan-brand text-black px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest whitespace-nowrap">
              Most Popular
            </div>
            <p className="text-xs uppercase tracking-widest text-cyan-brand font-bold mb-4">Pro Plan</p>
            <div className="flex items-baseline gap-1 mb-8">
              <span className="text-5xl font-black">₹999</span>
              <span className="text-white/50">/mo</span>
            </div>
            <ul className="space-y-3 mb-10 flex-grow">
              {['Unlimited projects', 'Vayu AI Engine', 'Razorpay + GST', 'WhatsApp API', 'Priority support'].map((perk) => (
                <li key={perk} className="flex items-center gap-3 text-white text-sm">
                  <Check className="w-4 h-4 text-cyan-brand shrink-0" /> {perk}
                </li>
              ))}
            </ul>
            <a href="#waitlist" className="btn-neo w-full py-4 rounded-xl bg-cyan-brand text-black font-bold text-center transition">
              Get Pro
            </a>
          </div>

          {/* Lifetime */}
          <div className="glass rounded-3xl p-8 border-2 border-saffron-brand relative flex flex-col bg-gradient-to-b from-saffron-brand/10 to-transparent">
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-saffron-brand text-black px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest whitespace-nowrap">
              First 100 Only
            </div>
            <p className="text-xs uppercase tracking-widest text-saffron-brand font-bold mb-4">Lifetime Deal</p>
            <div className="flex items-baseline gap-1 mb-8">
              <span className="text-5xl font-black">₹2,999</span>
              <span className="text-white/50">once</span>
            </div>
            <ul className="space-y-3 mb-10 flex-grow">
              {['Everything in Pro', 'Lifetime updates', 'White-label option', 'Founder Discord access', 'Pay once, use forever'].map((perk) => (
                <li key={perk} className="flex items-center gap-3 text-white text-sm">
                  <Check className="w-4 h-4 text-saffron-brand shrink-0" /> {perk}
                </li>
              ))}
            </ul>
            <a href="#waitlist" className="w-full py-4 rounded-xl bg-saffron-brand text-black font-bold text-center hover:bg-saffron-soft transition" style={{ boxShadow: '0 0 30px rgba(255,153,51,0.3)' }}>
              Reserve My Spot
            </a>
          </div>
        </div>
      </section>

      {/* ============ FINAL CTA ============ */}
      <section className="max-w-5xl mx-auto px-6 md:px-8 py-32">
        <div className="glass-strong rounded-[32px] p-12 md:p-16 text-center border border-white/20 bg-gradient-to-b from-white/10 to-transparent relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyan-brand to-transparent" />
          <h2 className="text-4xl md:text-6xl font-black mb-6">Be Customer #1 of BharatCMS</h2>
          <p className="text-lg text-white/60 mb-10 max-w-xl mx-auto">
            Join the waitlist. Get lifetime access for ₹2,999. Launch with us.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="#waitlist" className="btn-neo bg-cyan-brand text-black px-10 py-4 rounded-xl text-lg font-bold transition">
              Join Waitlist
            </a>
            <a
              href="https://github.com/codecay7/bharatcms"
              target="_blank"
              rel="noreferrer"
              className="bg-white/5 border border-white/10 px-10 py-4 rounded-xl text-lg font-bold hover:bg-white/10 transition flex items-center justify-center gap-2"
            >
              Star on GitHub <Star className="w-5 h-5 text-yellow-400" />
            </a>
          </div>
        </div>
      </section>-

      {/* ============ FOOTER ============ */}
      <footer className="bg-black/40 w-full mt-20 py-16 border-t border-white/10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 max-w-7xl mx-auto px-6 md:px-8">
          <div className="col-span-2 space-y-6">
            <span className="text-white font-black text-xl">
              Bharat<span className="text-cyan-brand">CMS</span>
            </span>
            <p className="text-white/40 text-sm leading-relaxed max-w-xs">
              Built solo by Diwakar Kumar in 90 days. Follow the journey.
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