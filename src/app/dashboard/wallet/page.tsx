"use client";

import { useState, useEffect } from "react";

type Transaction = {
  id: string;
  amount: number;
  status: string;
  type: string;
  createdAt: string;
};

export default function WalletPage() {
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    fetch("/api/transactions")
      .then((res) => res.json())
      .then((data) => setTransactions(data.transactions || []))
      .catch(() => {});
  }, []);

  async function deposit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    await fetch("/api/deposit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount: Number(amount) }),
    });
    setAmount("");
    setLoading(false);
    fetch("/api/transactions")
      .then((res) => res.json())
      .then((data) => setTransactions(data.transactions || []));
  }

  return (
    <div className="px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <h1 className="text-2xl font-bold text-white">Wallet</h1>
        <p className="mt-2 text-neutral-400">Deposit funds and view your recent activity.</p>

        <form onSubmit={deposit} className="mt-8 rounded-2xl border border-white/10 bg-neutral-900/40 p-6">
          <h2 className="text-sm font-medium text-neutral-300">New deposit</h2>
          <div className="mt-4 flex flex-col gap-3 sm:flex-row">
            <input
              type="number"
              step="0.01"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full rounded-xl border border-white/10 bg-neutral-900 px-4 py-4 text-white outline-none focus:border-white/30"
              placeholder="0.00"
              required
            />
            <button
              type="submit"
              disabled={loading}
              className="h-14 w-full rounded-2xl bg-white text-base font-semibold text-neutral-900 transition-colors hover:bg-neutral-200 active:scale-[0.98] disabled:opacity-60 sm:w-auto"
            >
              {loading ? "Processing..." : "Deposit"}
            </button>
          </div>
        </form>

        <div className="mt-8 rounded-2xl border border-white/10 bg-neutral-900/40 p-6">
          <h3 className="text-lg font-semibold text-white">Recent activity</h3>
          <div className="mt-4 divide-y divide-white/5">
            {transactions.length === 0 && (
              <p className="py-6 text-center text-sm text-neutral-500">No activity yet.</p>
            )}
            {transactions.map((t) => (
              <div key={t.id} className="flex items-center justify-between py-3">
                <span className="text-sm text-neutral-300">{t.type === "deposit" ? "Deposit" : "Withdrawal"} of ${t.amount.toFixed(2)}</span>
                <span className="text-xs text-neutral-500">{new Date(t.createdAt).toLocaleString()}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}