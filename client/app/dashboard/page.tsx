export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl font-semibold">Dashboard</h1>
        <span className="text-zinc-500 dark:text-zinc-400 text-sm mt-2 sm:mt-0">
          Overview of your account
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-zinc-900 rounded-lg shadow p-6 flex flex-col items-start">
          <div className="text-lg font-medium mb-2">Profile</div>
          <p className="text-zinc-500 dark:text-zinc-400 text-sm mb-4">
            View and update your personal information.
          </p>
          <a
            href="/Dashboard/profile"
            className="text-blue-600 dark:text-blue-400 hover:underline text-sm font-semibold"
          >
            Go to Profile &rarr;
          </a>
        </div>
        <div className="bg-white dark:bg-zinc-900 rounded-lg shadow p-6 flex flex-col items-start">
          <div className="text-lg font-medium mb-2">Settings</div>
          <p className="text-zinc-500 dark:text-zinc-400 text-sm mb-4">
            Manage your account and preferences.
          </p>
          <a
            href="/Dashboard/settings"
            className="text-blue-600 dark:text-blue-400 hover:underline text-sm font-semibold"
          >
            Go to Settings &rarr;
          </a>
        </div>
        <div className="bg-white dark:bg-zinc-900 rounded-lg shadow p-6 flex flex-col items-start">
          <div className="text-lg font-medium mb-2">Stats</div>
          <p className="text-zinc-500 dark:text-zinc-400 text-sm mb-4">
            Check your monthly usage statistics.
          </p>
          <button
            className="text-blue-600 dark:text-blue-400 hover:underline text-sm font-semibold"
            disabled
            title="Coming soon"
          >
            Coming Soon
          </button>
        </div>
      </div>
    </div>
  );
}
