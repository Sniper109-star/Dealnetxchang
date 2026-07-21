export default function SiteFooter() {
  return (
    <footer className="border-t border-white/10 bg-neutral-950">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
          <div className="flex flex-col items-center gap-1 md:items-start">
            <span className="text-base font-semibold text-white">Dealnetxchang</span>
            <p className="text-sm text-neutral-400">Built for the modern web.</p>
          </div>
          <nav className="flex flex-wrap items-center justify-center gap-6 text-sm text-neutral-400" aria-label="Footer">
            <a href="#privacy" className="transition-colors hover:text-white">Privacy</a>
            <a href="#terms" className="transition-colors hover:text-white">Terms</a>
            <a href="#contact" className="transition-colors hover:text-white">Contact</a>
          </nav>
        </div>
        <div className="mt-8 text-center text-xs text-neutral-500">
          © {new Date().getFullYear()} Dealnetxchang. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
