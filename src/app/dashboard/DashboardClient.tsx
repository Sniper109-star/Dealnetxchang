"use client";

import { use } from "react";
import { useState } from "react";

type Deposit = {
  id: string;
  amount: number;
  status: string;
  createdAt: string;
};

export default function DashboardClient() {
  const statsPromise = fetch("/api/stats")
    .then((res) => res.json())
    .catch(() => ({ deposits: [] }));

  const data = use(statsPromise);
  const deposits: Deposit[] = data.deposits || [];

  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);

  const total = deposits.reduce((sum, d) => sum + d.amount, 0);

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
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="text-2xl font-bold text-white">Your dashboard</h1>
      <p className="mt-2 text-neutral-400">Manage deposits and view your history.</p>

      <div className="mt-8 grid gap-6 sm:grid-cols-2">
        <div className="rounded-2xl border border-white/10 bg-neutral-900/40 p-6">
          <h2 className="text-sm text-neutral-400">Total deposited</h2>
          <p className="mt-2 text-3xl font-semibold text-white">${total.toFixed(2)}</p>
        </div>

        <form onSubmit={deposit} className="rounded-2xl border border-white/10 bg-neutral-900/40 p-6">
          <h2 className="text-sm text-neutral-400">New deposit</h2>
          <div className="mt-4 flex gap-3">
            <input
              type="number"
              step="0.01"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="flex-1 rounded-lg border border-white/10 bg-neutral-900 px-4 py-3 text-white outline-none focus:border-white/30"
              placeholder="0.00"
              required
            />
            <button
              type="submit"
              disabled={loading}
              className="rounded-full bg-white px-6 text-sm font-semibold text-neutral-900 transition-colors hover:bg-neutral-200 disabled:opacity-60"
            >
              {loading ? "Processing..." : "Deposit"}
            </button>
          </div>
        </form>
      </div>

      <div className="mt-10 rounded-2xl border border-white/10 bg-neutral-900/40 p-6">
        <h3 className="text-lg font-semibold text-white">Deposit history</h3>
        <div className="mt-4 divide-y divide-white/5">
          {deposits.length === 0 && (
            <p className="py-6 text-center text-sm text-neutral-500">No deposits yet.</p>
          )}
          {deposits.map((d) => (
            <div key={d.id} className="flex items-center justify-between py-3">
              <span className="text-sm text-neutral-300">${d.amount.toFixed(2)}</span>
              <span className="text-xs text-neutral-500">{new Date(d.createdAt).toLocaleString()}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
