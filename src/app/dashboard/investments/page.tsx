import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { getInvestmentsByUserId } from "@/lib/db";

export default async function InvestmentsPage() {
  const cookieStore = await cookies();
  const userId = cookieStore.get("user_id")?.value;

  if (!userId) {
    redirect("/signup");
  }

  const investments = await getInvestmentsByUserId(userId);

  return (
    <div className="px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <h1 className="text-2xl font-bold text-white">Investments</h1>
        <p className="mt-2 text-neutral-400">Your current holdings and performance.</p>
        <div className="mt-8 rounded-2xl border border-white/10 bg-neutral-900/40 overflow-hidden">
          {investments.length === 0 && (
            <p className="py-8 text-center text-sm text-neutral-500">No investments yet.</p>
          )}
          {investments.length > 0 && (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="px-6 py-3 text-neutral-400">Symbol</th>
                    <th className="px-6 py-3 text-neutral-400">Name</th>
                    <th className="px-6 py-3 text-neutral-400">Quantity</th>
                    <th className="px-6 py-3 text-neutral-400">Current Value</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {investments.map((inv) => (
                    <tr key={inv.id}>
                      <td className="px-6 py-4 text-white font-medium">{inv.symbol}</td>
                      <td className="px-6 py-4 text-neutral-300">{inv.name}</td>
                      <td className="px-6 py-4 text-neutral-300">{inv.quantity}</td>
                      <td className="px-6 py-4 text-white">${(inv.quantity * inv.currentPrice).toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}