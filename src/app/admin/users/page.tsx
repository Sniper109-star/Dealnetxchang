import { getUsers } from "@/lib/db";

export default async function AdminUsersPage() {
  const users = await getUsers();

  return (
    <div className="px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <h1 className="text-2xl font-bold text-white">Users</h1>
        <p className="mt-2 text-neutral-400">Manage registered users.</p>
        <div className="mt-8 rounded-2xl border border-white/10 bg-neutral-900/40 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="px-6 py-3 text-neutral-400">Name</th>
                  <th className="px-6 py-3 text-neutral-400">Email</th>
                  <th className="px-6 py-3 text-neutral-400">Role</th>
                  <th className="px-6 py-3 text-neutral-400">Joined</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {users.map((user) => (
                  <tr key={user.id}>
                    <td className="px-6 py-4 text-white">{user.name}</td>
                    <td className="px-6 py-4 text-neutral-300">{user.email}</td>
                    <td className="px-6 py-4 text-neutral-300">{user.role}</td>
                    <td className="px-6 py-4 text-neutral-500">{new Date(user.createdAt).toLocaleDateString()}</td>
                  </tr>
                ))}
                {users.length === 0 && (
                  <tr>
                    <td colSpan={4} className="px-6 py-8 text-center text-sm text-neutral-500">No users found.</td>
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