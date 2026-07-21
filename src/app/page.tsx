import TrackButton from "@/components/TrackButton";

export default function Home() {
  return (
    <div>
      <section className="relative overflow-hidden">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl">
              Exchange deals at scale
            </h1>
            <p className="mt-6 text-lg text-neutral-300 sm:text-xl">
              Dealnetxchang helps teams discover, negotiate, and close deals faster with a transparent, modern platform.
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <TrackButton name="cta_start_free">
                <a
                  href="/signup"
                  className="h-14 w-full min-w-[200px] items-center justify-center rounded-2xl bg-white px-8 text-base font-medium text-neutral-900 transition-colors hover:bg-neutral-200 active:scale-[0.98] sm:flex"
                >
                  Start for free
                </a>
              </TrackButton>
            </div>
          </div>
        </div>
      </section>

      <section id="features" className="border-t border-white/10">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold text-white sm:text-4xl">Everything you need to move deals forward</h2>
            <p className="mt-4 text-neutral-300">
              From discovery to close, the platform gives you sharper visibility and faster workflows.
            </p>
          </div>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { title: "Smart discovery", desc: "Find relevant deals with filters, signals, and saved searches." },
              { title: "Collaboration", desc: "Share boards, notes, and updates with your team in one place." },
              { title: "Analytics", desc: "Track conversion, velocity, and pipeline health in real time." },
            ].map((feature) => (
              <div key={feature.title} className="rounded-2xl border border-white/10 bg-neutral-900/40 p-6 active:scale-[0.98] transition-transform">
                <h3 className="text-lg font-semibold text-white">{feature.title}</h3>
                <p className="mt-2 text-sm text-neutral-300">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-white/10">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
          <div className="mx-auto max-w-3xl rounded-2xl border border-white/10 bg-neutral-900/40 p-8 text-center sm:p-12">
            <h2 className="text-3xl font-bold text-white sm:text-4xl">Ready to get started?</h2>
            <p className="mt-4 text-neutral-300">Create an account and see the platform in action today.</p>
            <div className="mt-8">
              <TrackButton name="cta_signup_bottom">
                <a
                  href="/signup"
                  className="h-14 w-full min-w-[200px] items-center justify-center rounded-2xl bg-white px-8 text-base font-medium text-neutral-900 transition-colors hover:bg-neutral-200 active:scale-[0.98] sm:flex"
                >
                  Create free account
                </a>
              </TrackButton>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
