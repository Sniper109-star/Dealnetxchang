import MobileBottomNav from "@/components/MobileBottomNav";

export default function Home() {
  return (
    <main className="mx-auto flex min-h-screen max-w-lg flex-col bg-neutral-900 pb-[calc(4.5rem+env(safe-area-inset-bottom))]">
      <header className="safe-top sticky top-0 z-40 border-b border-white/10 bg-neutral-900/90 backdrop-blur-md">
        <div className="flex items-center justify-between px-4 py-3">
          <h1 className="text-lg font-semibold text-white">Dealnetxchang</h1>
          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-neutral-800 text-neutral-300 transition-colors active:bg-neutral-700 active:text-white"
            aria-label="Notifications"
          >
            <svg
              aria-hidden="true"
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.5}
              viewBox="0 0 24 24"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
            </svg>
          </button>
        </div>
      </header>

      <section className="flex-1 px-4 pt-6">
        <div className="rounded-2xl border border-dashed border-white/10 bg-neutral-800/40 p-8 text-center">
          <p className="text-sm text-neutral-400">Mobile UI shell ready.</p>
          <p className="mt-2 text-xs text-neutral-500">Plug in your content and flows.</p>
        </div>
      </section>

      <MobileBottomNav />
    </main>
  );
}
