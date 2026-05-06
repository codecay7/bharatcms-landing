import { currentUser } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import DashboardSidebar from '@/components/DashboardSidebar';

const plans = [
  {
    name: 'Hobby',
    price: 0,
    period: 'forever',
    description: 'For side projects',
    color: '#859398',
    limits: ['1 project', '1K records', '1GB storage', 'Test mode only'],
    current: true,
  },
  {
    name: 'Starter',
    price: 499,
    period: 'month',
    description: 'For indie devs',
    color: '#00d4ff',
    popular: true,
    limits: ['3 projects', '10K records', '10GB storage', 'Live Razorpay', 'GST invoices', 'Custom domain'],
    current: false,
  },
  {
    name: 'Pro',
    price: 1499,
    period: 'month',
    description: 'For studios',
    color: '#a855f7',
    limits: ['10 projects', '100K records', '50GB storage', 'Webhooks', 'Priority support'],
    current: false,
  },
  {
    name: 'Business',
    price: 3999,
    period: 'month',
    description: 'For agencies',
    color: '#FF9933',
    limits: ['Unlimited projects', 'Unlimited records', 'Dedicated infra', 'White-label', '99.9% SLA'],
    current: false,
  },
];

export default async function BillingPage() {
  const user = await currentUser();
  if (!user) redirect('/sign-in');

  return (
    <div className="flex min-h-screen bg-[#0e1417]">
      <DashboardSidebar />

      <main className="md:ml-64 flex-1 flex flex-col">
        {/* Header */}
        <header className="sticky top-0 z-30 bg-[#0e1417]/80 backdrop-blur-xl border-b border-white/10 px-8 py-4 flex items-center justify-between">
          <p className="text-slate-400 text-sm">
            <span className="text-white font-semibold">Billing</span> — Choose your plan
          </p>
        </header>

        <div className="flex-1 p-8 max-w-[1200px] mx-auto w-full">

          {/* Heading */}
          <div className="mb-10 text-center">
            <h2 className="text-3xl font-bold text-white mb-3">
              Simple, honest pricing 🇮🇳
            </h2>
            <p className="text-slate-400">
              No hidden fees. No USD billing. Pay in ₹ via Razorpay.
            </p>
          </div>

          {/* Plan Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
            {plans.map((plan) => (
              <div
                key={plan.name}
                className={`relative bg-white/5 backdrop-blur border rounded-2xl p-6 flex flex-col transition-all hover:scale-[1.02] ${
                  plan.popular
                    ? 'border-[#00d4ff]/50 shadow-lg shadow-[#00d4ff]/10'
                    : 'border-white/10'
                }`}
              >
                {/* Popular Badge */}
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-[#00d4ff] text-[#0e1417] text-[10px] font-bold uppercase rounded-full">
                    Most Popular
                  </div>
                )}

                {/* Current Badge */}
                {plan.current && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-white/10 text-white text-[10px] font-bold uppercase rounded-full">
                    Current Plan
                  </div>
                )}

                {/* Plan Name */}
                <div className="mb-4">
                  <h3
                    className="text-lg font-bold mb-1"
                    style={{ color: plan.color }}
                  >
                    {plan.name}
                  </h3>
                  <p className="text-slate-500 text-xs">{plan.description}</p>
                </div>

                {/* Price */}
                <div className="mb-6">
                  <span className="text-3xl font-bold text-white">
                    {plan.price === 0 ? '₹0' : `₹${plan.price.toLocaleString('en-IN')}`}
                  </span>
                  <span className="text-slate-500 text-sm ml-1">/ {plan.period}</span>
                </div>

                {/* Limits */}
                <ul className="space-y-2 flex-1 mb-6">
                  {plan.limits.map((limit) => (
                    <li key={limit} className="flex items-center gap-2 text-sm text-slate-300">
                      <span
                        className="material-symbols-outlined text-base"
                        style={{ color: plan.color }}
                      >
                        check_circle
                      </span>
                      {limit}
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                {plan.current ? (
                  <button
                    disabled
                    className="w-full py-2.5 rounded-lg text-sm font-bold bg-white/5 text-slate-500 cursor-not-allowed"
                  >
                    Current Plan
                  </button>
                ) : (
                  <button
                    className="w-full py-2.5 rounded-lg text-sm font-bold transition-all active:scale-95 hover:opacity-90"
                    style={{
                      backgroundColor: plan.color,
                      color: '#0e1417',
                    }}
                  >
                    Upgrade to {plan.name} →
                  </button>
                )}
              </div>
            ))}
          </div>

          {/* Lifetime Deal */}
          <div className="bg-gradient-to-r from-[#FF9933]/10 to-[#FF9933]/5 border border-[#FF9933]/30 rounded-2xl p-8 flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="px-2 py-0.5 bg-[#FF9933]/20 text-[#FF9933] text-[10px] font-bold uppercase rounded-full">
                  Limited — First 100 only
                </span>
              </div>
              <h3 className="text-white font-bold text-xl mb-2">
                Lifetime Deal ⚡
              </h3>
              <p className="text-slate-400 text-sm max-w-md">
                Pay once. Get Starter limits forever. Add-ons always pay-as-you-go.
                No monthly billing. Ever.
              </p>
            </div>
            <div className="text-center md:text-right">
              <div className="text-3xl font-bold text-[#FF9933] mb-1">₹2,999</div>
              <div className="text-slate-500 text-xs mb-4">one-time payment</div>
              <button className="px-8 py-3 bg-[#FF9933] text-[#0e1417] font-bold rounded-lg hover:bg-[#FF9933]/90 transition-all active:scale-95 whitespace-nowrap">
                Grab Lifetime Deal →
              </button>
            </div>
          </div>

          {/* Add-ons */}
          <div className="mt-10">
            <h3 className="text-white font-bold text-lg mb-6">
              Pay-as-you-go Add-ons
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { icon: 'auto_awesome', label: 'AI Generation', price: '₹500 / 1K generations', color: '#a855f7' },
                { icon: 'chat', label: 'WhatsApp', price: '₹1.50 / message', color: '#00d4ff' },
                { icon: 'email', label: 'Email', price: '₹200 / 10K sends', color: '#FF9933' },
                { icon: 'storage', label: 'Extra Storage', price: '₹300 / 50GB', color: '#00d4ff' },
              ].map((addon) => (
                <div
                  key={addon.label}
                  className="bg-white/5 border border-white/10 rounded-xl p-4 flex items-center gap-4"
                >
                  <span
                    className="material-symbols-outlined p-2 rounded-lg text-base"
                    style={{ color: addon.color, backgroundColor: `${addon.color}15` }}
                  >
                    {addon.icon}
                  </span>
                  <div>
                    <p className="text-white text-sm font-semibold">{addon.label}</p>
                    <p className="text-slate-500 text-xs">{addon.price}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}
