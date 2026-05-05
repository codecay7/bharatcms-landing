'use client'

import { Show, UserButton } from '@clerk/nextjs'
import Link from 'next/link'

export default function NavbarAuth() {
  return (
    <div className="flex items-center gap-3">
      <Show when="signed-out">
        <Link
          href="/sign-in"
          className="bg-white/5 border border-white/10 text-white font-bold px-4 py-2 rounded-lg text-sm hover:bg-white/10 transition"
        >
          Sign In
        </Link>
        <a
          href="#waitlist"
          className="bg-cyan-brand text-black font-bold px-5 py-2 rounded-lg btn-neo text-sm"
        >
          Join Waitlist
        </a>
      </Show>
      <Show when="signed-in">
        <Link
          href="/dashboard"
          className="bg-white/5 border border-white/10 text-white font-bold px-4 py-2 rounded-lg text-sm hover:bg-white/10 transition"
        >
          Dashboard
        </Link>
        <UserButton />
      </Show>
    </div>
  )
}
