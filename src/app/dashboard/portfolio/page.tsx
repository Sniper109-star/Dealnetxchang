import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { getPortfolioByUserId } from "@/lib/db";

export default async function PortfolioPage() {
  const cookieStore = await cookies();
  const userId = cookieStore.get("user_id")?.value;

  if (!userId) {
    redirect("/signup");
  }

  const portfolio = await getPortfolioByUserId(userId);

  const stats = [
    { label: "Total Value", value: portfolio ? `$${portfolio.totalValue.toFixed(2)}` : "$0.00" },
    { label: "Available", value: portfolio ? `$${portfolio.availableBalance.toFixed(2)}` : "$0.00" },
    { label: "Invested", value: portfolio ? `$${portfolio.investedBalance.toFixed(2)}` : "$0.00" },
  ];

  return (
    <div className="px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <h1 className="text-2xl font-bold text-white">Portfolio</h1>
        <p className="mt-2 text-neutral-400">Overview of your investments.</p>
        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          {stats.map((s) => (
            <div key={s.label} className="rounded-2xl border border-white/10 bg-neutral-900/40 p-6">
              <h2 className="text-sm text-neutral-400">{s.label}</h2>
              <p className="mt-2 text-3xl font-semibold text-white">{s.value}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}