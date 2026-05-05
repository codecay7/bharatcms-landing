import { currentUser } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'

export default async function DashboardPage() {
  const user = await currentUser()
  if (!user) redirect('/sign-in')

  return (
    <div className="min-h-screen bg-[#0e1417] text-white p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-cyan-400">
          Welcome, {user.firstName} ��
        </h1>
        <p className="text-gray-400 mt-2 text-sm">
          {user.emailAddresses[0].emailAddress}
        </p>
        <div className="mt-8 p-6 rounded-xl border border-white/10 bg-white/5">
          <p className="text-gray-300 text-sm">🚧 Dashboard UI coming in Pillar 4 — auth is live ✅</p>
          <p className="text-gray-500 text-xs mt-2">Clerk ID: {user.id}</p>
        </div>
      </div>
    </div>
  )
}
