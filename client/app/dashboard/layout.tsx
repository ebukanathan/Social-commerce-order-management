import Link from "next/link";
import React from "react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen bg-zinc-50 dark:bg-black">
      {/* Sidebar */}
      <aside className="w-64 bg-white dark:bg-zinc-900 border-r border-zinc-200 dark:border-zinc-800 flex flex-col">
        <div className="h-16 flex items-center justify-center border-b border-zinc-200 dark:border-zinc-800">
          <span className="text-lg font-semibold tracking-wide">Dashboard</span>
        </div>
        <nav className="flex-1 flex flex-col gap-2 p-4">
          <Link
            href="/Dashboard"
            className="px-4 py-2 rounded hover:bg-zinc-100 dark:hover:bg-zinc-800 transition"
          >
            Home
          </Link>
          <Link
            href="/dashboard/order"
            className="px-4 py-2 rounded hover:bg-zinc-100 dark:hover:bg-zinc-800 transition"
          >
            Orders
          </Link>
          <Link
            href="/Dashboard/settings"
            className="px-4 py-2 rounded hover:bg-zinc-100 dark:hover:bg-zinc-800 transition"
          >
            Settings
          </Link>
        </nav>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
        {/* Navbar */}
        <header className="h-16 px-6 bg-white dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-800 flex items-center justify-between">
          <div className="text-base font-medium">
            Welcome to your dashboard!
          </div>
          <div>
            <Link
              href="/"
              className="text-sm px-4 py-2 rounded bg-zinc-200 dark:bg-zinc-700 hover:bg-zinc-300 dark:hover:bg-zinc-600 transition"
            >
              Main Site
            </Link>
          </div>
        </header>

        <main className="flex-1 p-6 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}
