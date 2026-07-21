import { getWithdrawals, getUsers } from "@/lib/db";

export default async function AdminWithdrawalsPage() {
  const withdrawals = await getWithdrawals();
  const users = await getUsers();

  const getUserName = (userId: string) => users.find((u) => u.id === userId)?.name || "Unknown";

  return (
    <div className="px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <h1 className="text-2xl font-bold text-white">Withdrawals</h1>
        <p className="mt-2 text-neutral-400">Review withdrawal requests.</p>
        <div className="mt-8 rounded-2xl border border-white/10 bg-neutral-900/40 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="px-6 py-3 text-neutral-400">User</th>
                  <th className="px-6 py-3 text-neutral-400">Amount</th>
                  <th className="px-6 py-3 text-neutral-400">Status</th>
                  <th className="px-6 py-3 text-neutral-400">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {withdrawals.map((w) => (
                  <tr key={w.id}>
                    <td className="px-6 py-4 text-white">{getUserName(w.userId)}</td>
                    <td className="px-6 py-4 text-neutral-300">${w.amount.toFixed(2)}</td>
                    <td className="px-6 py-4 text-neutral-300">{w.status}</td>
                    <td className="px-6 py-4 text-neutral-500">{new Date(w.createdAt).toLocaleString()}</td>
                  </tr>
                ))}
                {withdrawals.length === 0 && (
                  <tr>
                    <td colSpan={4} className="px-6 py-8 text-center text-sm text-neutral-500">No withdrawals found.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}