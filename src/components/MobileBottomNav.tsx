"use client";

const NAV_ITEMS = [
  { label: "Home", href: "#home", icon: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3" },
  { label: "Explore", href: "#explore", icon: "M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" },
  { label: "Activity", href: "#activity", icon: "M4 6h16M4 12h16M4 18h16" },
  { label: "Profile", href: "#profile", icon: "M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" },
];

function NavIcon({ icon }: { icon: string }) {
  return (
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
      <path d={icon} />
    </svg>
  );
}

export default function MobileBottomNav() {
  return (
    <nav
      aria-label="Primary"
      className="fixed inset-x-0 bottom-0 z-50 border-t border-white/10 bg-neutral-900/95 backdrop-blur-sm safe-bottom"
    >
      <ul className="flex items-center justify-around">
        {NAV_ITEMS.map((item) => (
          <li key={item.href}>
            <a
              href={item.href}
              className="flex flex-col items-center gap-1 py-2 px-3 text-xs text-neutral-400 transition-colors active:text-white"
            >
              <NavIcon icon={item.icon} />
              <span>{item.label}</span>
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
