import { getStats, getEvents } from "@/lib/db";

export default async function AdminAnalyticsPage() {
  const stats = await getStats();
  const events = await getEvents();

  const cards = [
    { label: "Total Deposits", value: `$${stats.totalDeposits.toFixed(2)}` },
    { label: "Total Withdrawals", value: `$${stats.totalWithdrawals.toFixed(2)}` },
    { label: "Button Clicks", value: stats.buttonClicks.toString() },
    { label: "Conversions", value: stats.conversions.toString() },
  ];

  return (
    <div className="px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <h1 className="text-2xl font-bold text-white">Analytics</h1>
        <p className="mt-2 text-neutral-400">Platform performance and events.</p>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {cards.map((card) => (
            <div key={card.label} className="rounded-2xl border border-white/10 bg-neutral-900/40 p-6">
              <h2 className="text-sm text-neutral-400">{card.label}</h2>
              <p className="mt-2 text-3xl font-semibold text-white">{card.value}</p>
            </div>
          ))}
        </div>
        <div className="mt-8 rounded-2xl border border-white/10 bg-neutral-900/40 p-6">
          <h3 className="text-lg font-semibold text-white">Recent events</h3>
          <div className="mt-4 divide-y divide-white/5">
            {events.length === 0 && (
              <p className="py-6 text-center text-sm text-neutral-500">No events recorded.</p>
            )}
            {events.map((ev) => (
              <div key={ev.id} className="flex items-center justify-between py-3">
                <span className="text-sm text-neutral-300">{ev.type}</span>
                <span className="text-xs text-neutral-500">{new Date(ev.createdAt).toLocaleString()}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}