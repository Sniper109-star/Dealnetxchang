"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Invalid credentials");
        return;
      }

      router.push("/dashboard");
    } catch {
      setError("Failed to sign in");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-neutral-950 px-4">
      <form onSubmit={onSubmit} className="w-full max-w-md space-y-4">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-white">Welcome back</h1>
          <p className="mt-2 text-neutral-400">Sign in to your account.</p>
        </div>
        <div>
          <label htmlFor="email" className="mb-1 block text-sm text-neutral-300">Email</label>
          <input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full rounded-xl border border-white/10 bg-neutral-900 px-4 py-4 text-white outline-none focus:border-white/30" required />
        </div>
        <div>
          <label htmlFor="password" className="mb-1 block text-sm text-neutral-300">Password</label>
          <input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full rounded-xl border border-white/10 bg-neutral-900 px-4 py-4 text-white outline-none focus:border-white/30" required />
        </div>
        {error && <p className="text-sm text-red-400">{error}</p>}
        <button type="submit" disabled={loading} className="h-14 w-full rounded-2xl bg-white text-base font-semibold text-neutral-900 transition-colors hover:bg-neutral-200 active:scale-[0.98] disabled:opacity-60">
          {loading ? "Signing in..." : "Sign in"}
        </button>
        <p className="text-center text-sm text-neutral-400">
          Don{"'"}t have an account? <a href="/register" className="text-white underline underline-offset-2">Register</a>
        </p>
      </form>
    </div>
  );
}
