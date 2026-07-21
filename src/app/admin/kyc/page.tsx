import { getKycs, getUsers } from "@/lib/db";

export default async function AdminKycPage() {
  const kycs = await getKycs();
  const users = await getUsers();

  const getUserName = (userId: string) => users.find((u) => u.id === userId)?.name || "Unknown";

  return (
    <div className="px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <h1 className="text-2xl font-bold text-white">KYC</h1>
        <p className="mt-2 text-neutral-400">Review Know Your Customer submissions.</p>
        <div className="mt-8 rounded-2xl border border-white/10 bg-neutral-900/40 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="px-6 py-3 text-neutral-400">User</th>
                  <th className="px-6 py-3 text-neutral-400">Full Name</th>
                  <th className="px-6 py-3 text-neutral-400">Document</th>
                  <th className="px-6 py-3 text-neutral-400">Number</th>
                  <th className="px-6 py-3 text-neutral-400">Status</th>
                  <th className="px-6 py-3 text-neutral-400">Submitted</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {kycs.map((k) => (
                  <tr key={k.id}>
                    <td className="px-6 py-4 text-white">{getUserName(k.userId)}</td>
                    <td className="px-6 py-4 text-neutral-300">{k.fullName}</td>
                    <td className="px-6 py-4 text-neutral-300">{k.documentType}</td>
                    <td className="px-6 py-4 text-neutral-300">{k.documentNumber}</td>
                    <td className="px-6 py-4 text-neutral-300">{k.status}</td>
                    <td className="px-6 py-4 text-neutral-500">{new Date(k.submittedAt).toLocaleString()}</td>
                  </tr>
                ))}
                {kycs.length === 0 && (
                  <tr>
                    <td colSpan={6} className="px-6 py-8 text-center text-sm text-neutral-500">No KYC submissions found.</td>
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