export default function AboutPage() {
  return (
    <div className="px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white sm:text-5xl">About Dealnetxchang</h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-neutral-400">
            A modern platform built to help you track, manage, and grow your investments with confidence.
          </p>
        </div>
        <div className="mt-12 grid gap-6 sm:grid-cols-2">
          <div className="rounded-2xl border border-white/10 bg-neutral-900/40 p-6 text-center">
            <h3 className="text-lg font-semibold text-white">Real-Time Tracking</h3>
            <p className="mt-2 text-neutral-300">Monitor your portfolio performance with live updates and detailed analytics.</p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-neutral-900/40 p-6 text-center">
            <h3 className="text-lg font-semibold text-white">Secure Investments</h3>
            <p className="mt-2 text-neutral-300">Your assets are protected with enterprise-grade security and best practices.</p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-neutral-900/40 p-6 text-center">
            <h3 className="text-lg font-semibold text-white">Smart Analytics</h3>
            <p className="mt-2 text-neutral-300">Get actionable insights from powerful tools designed for modern investors.</p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-neutral-900/40 p-6 text-center">
            <h3 className="text-lg font-semibold text-white">Seamless Experience</h3>
            <p className="mt-2 text-neutral-300">Enjoy a smooth, intuitive interface built for both desktop and mobile.</p>
          </div>
        </div>
      </div>
    </div>
  );
}