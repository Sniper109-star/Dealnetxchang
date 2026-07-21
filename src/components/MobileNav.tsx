"use client";

import { useState } from "react";

export default function MobileNav() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-neutral-950/90 backdrop-blur-md">
      <div className="mx-auto flex h-14 items-center justify-between px-4">
        <span className="text-base font-semibold text-white">Dealnetxchang</span>
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="inline-flex h-11 min-w-[44px] items-center justify-center rounded-full bg-neutral-900 text-neutral-300"
          aria-expanded={open}
          aria-label="Toggle menu"
        >
          <svg
            aria-hidden="true"
            className="h-6 w-6"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.5}
            viewBox="0 0 24 24"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            {open ? (
              <path d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>
      {open && (
        <nav className="border-t border-white/10 px-4 pb-4">
          <ul className="flex flex-col gap-1">
            <li><a href="/signup" className="block rounded-lg py-3 text-base text-neutral-300 active:text-white">Get started</a></li>
            <li><a href="/dashboard" className="block rounded-lg py-3 text-base text-neutral-300 active:text-white">Dashboard</a></li>
          </ul>
        </nav>
      )}
    </header>
  );
}
