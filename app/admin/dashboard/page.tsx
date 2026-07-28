"use client";

import { Sidebar, Header, EskulTable } from "@/components/molecules/admin";

export default function DashboardPage() {
  return (
    <div className="flex w-full min-h-screen bg-white">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col">
        <Header />
        <EskulTable />
      </main>
    </div>
  );
}