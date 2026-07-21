import { getStats, getEvents, getDeposits, getUsers, type User, type Event as AnalyticsEvent, type Deposit } from "@/lib/db";

type Stat = {
  signUps: number;
  depositEvents: number;
  totalDeposits: number;
  buttonClicks: number;
  conversions: number;
};

function StatCard({ title, value }: { title: string; value: string | number }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-neutral-900/40 p-6">
      <h3 className="text-sm text-neutral-400">{title}</h3>
      <p className="mt-2 text-3xl font-semibold text-white">{value}</p>
    </div>
  );
}

export default async function AdminPage() {
  const stats: Stat = await getStats();
  const events: AnalyticsEvent[] = await getEvents();
  const deposits: Deposit[] = await getDeposits();
  const users: User[] = await getUsers();

  const recentEvents = events.slice(-20).reverse();

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white">Admin panel</h1>
        <p className="mt-2 text-neutral-400">Real platform metrics and event logs.</p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
        <StatCard title="Sign-ups" value={stats.signUps} />
        <StatCard title="Deposits" value={stats.depositEvents} />
        <StatCard title="Button clicks" value={stats.buttonClicks} />
        <StatCard title="Conversions" value={stats.conversions} />
        <StatCard title="Total deposit amount" value={`$${stats.totalDeposits.toFixed(2)}`} />
      </div>

      <div className="mt-10 grid gap-6 lg:grid-cols-2">
        <div className="rounded-2xl border border-white/10 bg-neutral-900/40 p-6">
          <h2 className="text-lg font-semibold text-white">Recent events</h2>
          <div className="mt-4 max-h-96 overflow-auto">
            {recentEvents.length === 0 && (
              <p className="text-sm text-neutral-500">No events tracked yet.</p>
            )}
            <table className="w-full text-left text-sm text-neutral-300">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="pb-2 font-medium text-neutral-400">Event</th>
                  <th className="pb-2 font-medium text-neutral-400">Time</th>
                </tr>
              </thead>
              <tbody>
                {recentEvents.map((event) => (
                  <tr key={event.id} className="border-b border-white/5">
                    <td className="py-2 capitalize">{event.type.replace(/_/g, " ")}</td>
                    <td className="py-2 text-neutral-500">
                      {new Date(event.createdAt).toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="rounded-2xl border border-white/10 bg-neutral-900/40 p-6">
          <h2 className="text-lg font-semibold text-white">Recent deposits</h2>
          <div className="mt-4 max-h-96 overflow-auto">
            {deposits.length === 0 && (
              <p className="text-sm text-neutral-500">No deposits yet.</p>
            )}
            <table className="w-full text-left text-sm text-neutral-300">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="pb-2 font-medium text-neutral-400">User</th>
                  <th className="pb-2 font-medium text-neutral-400">Amount</th>
                  <th className="pb-2 font-medium text-neutral-400">Status</th>
                </tr>
              </thead>
              <tbody>
                {deposits.slice(-20).reverse().map((d) => {
                  const user = users.find((u) => u.id === d.userId);
                  return (
                    <tr key={d.id} className="border-b border-white/5">
                      <td className="py-2">{user?.email ?? d.userId}</td>
                      <td className="py-2">${d.amount.toFixed(2)}</td>
                      <td className="py-2 capitalize">{d.status}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div className="mt-10 rounded-2xl border border-white/10 bg-neutral-900/40 p-6">
        <h2 className="text-lg font-semibold text-white">Registered users</h2>
        {users.length === 0 && <p className="mt-2 text-sm text-neutral-500">No users yet.</p>}
        <div className="mt-4 max-h-96 overflow-auto">
          <table className="w-full text-left text-sm text-neutral-300">
            <thead>
              <tr className="border-b border-white/10">
                <th className="pb-2 font-medium text-neutral-400">Name</th>
                <th className="pb-2 font-medium text-neutral-400">Email</th>
                <th className="pb-2 font-medium text-neutral-400">Joined</th>
              </tr>
            </thead>
            <tbody>
              {users.slice(-20).reverse().map((u) => (
                <tr key={u.id} className="border-b border-white/5">
                  <td className="py-2">{u.name}</td>
                  <td className="py-2">{u.email}</td>
                  <td className="py-2 text-neutral-500">
                    {u.createdAt ? new Date(u.createdAt).toLocaleDateString() : "—"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
