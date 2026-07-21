"use client";

import { useState } from "react";

type Settings = {
  name: string;
  notifications: boolean;
  theme: string;
};

function loadSettings(): Settings {
  try {
    const stored = localStorage.getItem("settings");
    if (stored) return JSON.parse(stored);
  } catch {}
  return { name: "", notifications: true, theme: "dark" };
}

export default function SettingsPage() {
  const [settings, setSettings] = useState<Settings>(loadSettings);

  function save(e: React.FormEvent) {
    e.preventDefault();
    localStorage.setItem("settings", JSON.stringify(settings));
    alert("Settings saved");
  }

  return (
    <div className="px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <h1 className="text-2xl font-bold text-white">Settings</h1>
        <p className="mt-2 text-neutral-400">Manage your account preferences.</p>
        <form onSubmit={save} className="mt-8 rounded-2xl border border-white/10 bg-neutral-900/40 p-6 space-y-6">
          <div>
            <label htmlFor="name" className="mb-1 block text-sm text-neutral-300">Display name</label>
            <input
              id="name"
              type="text"
              value={settings.name}
              onChange={(e) => setSettings({ ...settings, name: e.target.value })}
              className="w-full rounded-xl border border-white/10 bg-neutral-900 px-4 py-4 text-white outline-none focus:border-white/30"
              required
            />
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-neutral-300">Notifications</span>
            <button
              type="button"
              onClick={() => setSettings({ ...settings, notifications: !settings.notifications })}
              className={`h-10 w-16 rounded-full transition-colors ${settings.notifications ? "bg-white" : "bg-neutral-700"}`}
            >
              <span className={`block h-8 w-8 rounded-full bg-neutral-900 transition-transform ${settings.notifications ? "translate-x-7" : "translate-x-1"}`} />
            </button>
          </div>
          <div>
            <label htmlFor="theme" className="mb-1 block text-sm text-neutral-300">Theme</label>
            <select
              id="theme"
              value={settings.theme}
              onChange={(e) => setSettings({ ...settings, theme: e.target.value })}
              className="w-full rounded-xl border border-white/10 bg-neutral-900 px-4 py-4 text-white outline-none focus:border-white/30"
            >
              <option value="dark">Dark</option>
              <option value="light">Light</option>
            </select>
          </div>
          <button
            type="submit"
            className="h-14 w-full rounded-2xl bg-white text-base font-semibold text-neutral-900 transition-colors hover:bg-neutral-200 active:scale-[0.98] disabled:opacity-60"
          >
            Save changes
          </button>
        </form>
      </div>
    </div>
  );
}