"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Link from "next/link";
import { getUsers } from "@/lib/db";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const cookieStore = await cookies();
  const userId = cookieStore.get("user_id")?.value;
  const userRole = cookieStore.get("user_role")?.value;

  if (!userId || userRole !== "admin") {
    redirect("/dashboard");
  }

  const currentPath = "/admin";

  const navLinks = [
    { href: "/admin", label: "Dashboard" },
    { href: "/admin/users", label: "Users" },
    { href: "/admin/deposits", label: "Deposits" },
    { href: "/admin/withdrawals", label: "Withdrawals" },
    { href: "/admin/kyc", label: "KYC" },
    { href: "/admin/analytics", label: "Analytics" },
    { href: "/admin/settings", label: "Settings" },
  ];

  return (
    <div className="min-h-screen bg-neutral-950">
      <header className="border-b border-white/10 bg-neutral-950/90 backdrop-blur-md">
        <div className="mx-auto px-4 py-4">
          <div className="flex flex-col gap-3">
            <span className="text-base font-semibold text-white">Admin</span>
            <nav className="flex flex-wrap items-center gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`rounded-lg px-3 py-2 text-sm text-neutral-300 ${currentPath === link.href ? "text-white" : ""}`}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      </header>
      <main>{children}</main>
    </div>
  );
}