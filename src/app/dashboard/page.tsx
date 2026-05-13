import { currentUser } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import DashboardSidebar from '@/components/DashboardSidebar';

const PLAN_LIMITS: Record<string, { projects: string; records: string; storage: string; price: string }> = {
  hobby: { projects: '1', records: '1K', storage: '1GB', price: '₹0 / month' },
  starter: { projects: '3', records: '10K', storage: '10GB', price: '₹499 / month' },
  pro: { projects: '10', records: '100K', storage: '50GB', price: '₹1,499 / month' },
  business: { projects: 'Unlimited', records: 'Unlimited', storage: 'Unlimited', price: '₹3,999 / month' },
  lifetime: { projects: '3', records: '10K', storage: '10GB', price: 'Lifetime Deal' },
};

export default async function DashboardPage() {
  const user = await currentUser();
  if (!user) redirect('/sign-in');

  const firstName = user.firstName ?? 'Developer';
  const currentPlan = ((user.unsafeMetadata?.plan as string) || 'hobby').toLowerCase();
  const limits = PLAN_LIMITS[currentPlan] || PLAN_LIMITS.hobby;
  const isHobby = currentPlan === 'hobby';

  return (
    <div className="flex min-h-screen bg-[#0e1417]">
      <DashboardSidebar />

      <main className="md:ml-64 flex-1 flex flex-col">
        <header className="sticky top-0 z-30 bg-[#0e1417]/80 backdrop-blur-xl border-b border-white/10 px-8 py-4 flex items-center justify-between">
          <p className="text-slate-400 text-sm">
            Welcome back, <span className="text-white font-semibold">{firstName}</span> 👋
          </p>
          <div className="flex items-center gap-3">
            <button className="w-9 h-9 flex items-center justify-center rounded-lg bg-white/5 border border-white/10 hover:text-[#00d4ff] transition-all">
              <span className="material-symbols-outlined text-base">notifications</span>
            </button>
            <div className="w-9 h-9 rounded-full bg-[#00d4ff]/20 flex items-center justify-center text-[#00d4ff] font-bold text-sm">
              {firstName[0].toUpperCase()}
            </div>
          </div>
        </header>

        <div className="flex-1 p-8 max-w-[1200px] mx-auto w-full">

          {/* Hero Banner */}
          <section className="mb-10 relative overflow-hidden rounded-2xl p-8 bg-white/5 backdrop-blur border border-white/10">
            <div className="absolute inset-0 bg-gradient-to-r from-[#00d4ff]/10 via-transparent to-transparent pointer-events-none" />
            <div className="relative z-10">
              <h2 className="text-2xl font-bold text-white mb-2">
                Good to have you, {firstName} 🚀
              </h2>
              {isHobby ? (
                <p className="text-slate-400 max-w-lg">
                  You're on the <span className="text-[#00d4ff] font-semibold">Hobby plan</span>.
                  Upgrade to Starter to unlock live Razorpay payments, GST invoices and more.
                </p>
              ) : (
                <p className="text-slate-400 max-w-lg">
                  You're on the <span className="text-[#00d4ff] font-semibold capitalize">{currentPlan} plan</span>.
                  {currentPlan === 'lifetime' ? ' Starter limits, forever. 🎉' : ' Keep building!'}
                </p>
              )}
            </div>
          </section>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
            <div className="bg-white/5 backdrop-blur border border-white/10 rounded-2xl p-6 hover:border-[#00d4ff]/30 transition-all">
              <div className="flex justify-between items-start mb-4">
                <span className="material-symbols-outlined text-[#00d4ff] p-2 bg-[#00d4ff]/10 rounded-lg">folder_open</span>
                <span className="text-slate-500 text-xs font-bold">Limit: {limits.projects}</span>
              </div>
              <p className="text-slate-500 text-xs uppercase font-bold mb-1">Projects</p>
              <h4 className="text-3xl font-bold text-white">0 <span className="text-slate-600 text-base">/ {limits.projects}</span></h4>
            </div>

            <div className="bg-white/5 backdrop-blur border border-white/10 rounded-2xl p-6 hover:border-[#00d4ff]/30 transition-all">
              <div className="flex justify-between items-start mb-4">
                <span className="material-symbols-outlined text-[#a855f7] p-2 bg-[#a855f7]/10 rounded-lg">database</span>
                <span className="text-slate-500 text-xs font-bold">Limit: {limits.records}</span>
              </div>
              <p className="text-slate-500 text-xs uppercase font-bold mb-1">Records</p>
              <h4 className="text-3xl font-bold text-white">0 <span className="text-slate-600 text-base">/ {limits.records}</span></h4>
            </div>

            <div className="bg-white/5 backdrop-blur border border-white/10 rounded-2xl p-6 hover:border-[#00d4ff]/30 transition-all">
              <div className="flex justify-between items-start mb-4">
                <span className="material-symbols-outlined text-[#FF9933] p-2 bg-[#FF9933]/10 rounded-lg">storage</span>
                <span className="text-slate-500 text-xs font-bold">Limit: {limits.storage}</span>
              </div>
              <p className="text-slate-500 text-xs uppercase font-bold mb-1">Storage</p>
              <h4 className="text-3xl font-bold text-white">0 <span className="text-slate-600 text-base">/ {limits.storage}</span></h4>
            </div>

            <div className="bg-white/5 backdrop-blur border border-white/10 rounded-2xl p-6 hover:border-[#00d4ff]/30 transition-all">
              <div className="flex justify-between items-start mb-4">
                <span className="material-symbols-outlined text-[#00d4ff] p-2 bg-[#00d4ff]/10 rounded-lg">workspace_premium</span>
                <span className="px-2 py-0.5 rounded bg-[#00d4ff]/10 text-[#00d4ff] text-[10px] font-bold uppercase">Active</span>
              </div>
              <p className="text-slate-500 text-xs uppercase font-bold mb-1">Current Plan</p>
              <h4 className="text-2xl font-bold text-white capitalize">{currentPlan}</h4>
              <p className="text-slate-500 text-xs mt-1">{limits.price}</p>
            </div>
          </div>

          {/* Upgrade CTA — only show if not on Business */}
          {currentPlan !== 'business' && (
            <div className="bg-gradient-to-r from-[#00d4ff]/10 to-[#a855f7]/10 border border-[#00d4ff]/20 rounded-2xl p-8 flex flex-col md:flex-row items-center justify-between gap-6">
              <div>
                <h3 className="text-white font-bold text-xl mb-2">
                  {isHobby ? 'Ready to go live? 🇮��' : 'Want more power? 🚀'}
                </h3>
                <p className="text-slate-400 text-sm max-w-md">
                  {isHobby
                    ? 'Upgrade to Starter (₹499/mo) — unlock live Razorpay payments, GST invoices, 3 projects, 10K records and custom domain.'
                    : 'Upgrade your plan to unlock more projects, records, storage and priority support.'}
                </p>
              </div>

              <a href="/dashboard/billing"
              className="px-8 py-3 bg-[#00d4ff] text-[#0e1417] font-bold rounded-lg hover:bg-[#00d4ff]/90 transition-all active:scale-95 whitespace-nowrap"
              >
              {isHobby ? 'Upgrade to Starter ->' : 'View Plans ->'}
            </a>
            </div>
          )}

    </div>
      </main >
    </div >
  );
}
