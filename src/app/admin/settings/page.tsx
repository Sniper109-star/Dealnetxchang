import { getSettings } from "@/lib/db";

export default async function AdminSettingsPage() {
  const settings = await getSettings();

  return (
    <div className="px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <h1 className="text-2xl font-bold text-white">Settings</h1>
        <p className="mt-2 text-neutral-400">Platform configuration.</p>
        <div className="mt-8 rounded-2xl border border-white/10 bg-neutral-900/40 p-6">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="px-6 py-3 text-neutral-400">Key</th>
                  <th className="px-6 py-3 text-neutral-400">Value</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {settings.map((s) => (
                  <tr key={s.id}>
                    <td className="px-6 py-4 text-white">{s.key}</td>
                    <td className="px-6 py-4 text-neutral-300">{s.value}</td>
                  </tr>
                ))}
                {settings.length === 0 && (
                  <tr>
                    <td colSpan={2} className="px-6 py-8 text-center text-sm text-neutral-500">No settings found.</td>
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