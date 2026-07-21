import { getStats } from "@/lib/db";

export default async function AdminDashboardPage() {
  const stats = await getStats();

  const cards = [
    { label: "Users", value: stats.signUps.toString() },
    { label: "Deposits", value: stats.depositEvents.toString() },
    { label: "Withdrawals", value: stats.withdrawalEvents.toString() },
    { label: "Pending KYC", value: stats.pendingKycs.toString() },
  ];

  return (
    <div className="px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <h1 className="text-2xl font-bold text-white">Admin Dashboard</h1>
        <p className="mt-2 text-neutral-400">Overview of platform activity.</p>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {cards.map((card) => (
            <div key={card.label} className="rounded-2xl border border-white/10 bg-neutral-900/40 p-6">
              <h2 className="text-sm text-neutral-400">{card.label}</h2>
              <p className="mt-2 text-3xl font-semibold text-white">{card.value}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}