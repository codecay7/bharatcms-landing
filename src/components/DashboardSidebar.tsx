'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useUser } from '@clerk/nextjs';

const navItems = [
  { label: 'Dashboard', icon: 'dashboard', href: '/dashboard' },
  { label: 'Projects', icon: 'folder_open', href: '/dashboard/projects' },
  { label: 'Billing', icon: 'credit_card', href: '/dashboard/billing' },
  { label: 'API Keys', icon: 'key', href: '/dashboard/api-keys' },
];

export default function DashboardSidebar() {
  const pathname = usePathname();
  const { user } = useUser();

  return (
    <aside className="h-screen w-64 fixed left-0 top-0 border-r border-white/10 bg-[#0f0f12]/80 backdrop-blur-2xl z-40 hidden md:flex flex-col">
      {/* Logo */}
      <div className="p-6 flex items-center gap-3">
        <div className="w-8 h-8 bg-[#00d4ff] rounded flex items-center justify-center">
          <span className="material-symbols-outlined text-[#0e1417] text-base font-bold">bolt</span>
        </div>
        <div>
          <h1 className="text-[#00d4ff] tracking-widest text-lg font-bold">BHARATCMS</h1>
          <p className="text-[#859398] text-[10px] uppercase">India's Headless CMS 🇮🇳</p>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-4 mt-6 space-y-1">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 py-3 px-4 text-sm font-semibold transition-colors rounded-lg ${
                isActive
                  ? 'text-[#00d4ff] bg-[#00d4ff]/5 border-l-4 border-[#00d4ff]'
                  : 'text-slate-500 hover:bg-white/5 hover:text-white'
              }`}
            >
              <span className="material-symbols-outlined text-base">{item.icon}</span>
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* Bottom: Plan + User */}
      <div className="p-4 mt-auto">
        <div className="bg-white/5 backdrop-blur border border-white/10 rounded-xl p-4 mb-4">
          <p className="text-[#00d4ff] mb-1 text-[10px] uppercase font-bold">Current Plan</p>
          <p className="text-sm text-white mb-3 font-semibold capitalize">Hobby</p>
          <Link
            href="/dashboard/billing"
            className="w-full py-2 bg-[#00d4ff] text-[#0e1417] font-bold text-xs rounded block text-center hover:bg-[#00d4ff]/90 transition-all active:scale-95"
          >
            Upgrade Plan
          </Link>
        </div>

        <div className="flex items-center gap-3 pt-4 border-t border-white/5">
          <div className="w-8 h-8 rounded-full bg-[#00d4ff]/20 flex items-center justify-center text-[#00d4ff] font-bold text-sm">
            {user?.firstName?.[0] ?? 'U'}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-white text-xs font-semibold truncate">{(user?.firstName?.[0] ?? user?.lastName?.[0] ?? 'U').toUpperCase()}</p>
            <p className="text-slate-500 text-[10px] truncate">{user?.primaryEmailAddress?.emailAddress}</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
