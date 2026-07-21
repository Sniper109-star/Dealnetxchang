"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SignupPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, name }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Something went wrong");
        return;
      }

      router.push("/dashboard");
    } catch {
      setError("Failed to create account");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-neutral-950 px-4">
      <form onSubmit={onSubmit} className="w-full max-w-md space-y-4">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-white">Create your account</h1>
          <p className="mt-2 text-neutral-400">Start tracking your deals today.</p>
        </div>
        <div>
          <label htmlFor="name" className="mb-1 block text-sm text-neutral-300">
            Full name
          </label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full rounded-xl border border-white/10 bg-neutral-900 px-4 py-4 text-white outline-none focus:border-white/30"
            required
          />
        </div>
        <div>
          <label htmlFor="email" className="mb-1 block text-sm text-neutral-300">
            Email
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-xl border border-white/10 bg-neutral-900 px-4 py-4 text-white outline-none focus:border-white/30"
            required
          />
        </div>
        {error && <p className="text-sm text-red-400">{error}</p>}
        <button
          type="submit"
          disabled={loading}
          className="h-14 w-full rounded-2xl bg-white text-base font-semibold text-neutral-900 transition-colors hover:bg-neutral-200 active:scale-[0.98] disabled:opacity-60"
        >
          {loading ? "Creating account..." : "Get started"}
        </button>
      </form>
    </div>
  );
}
