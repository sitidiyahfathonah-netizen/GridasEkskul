"use client";

import Image from "next/image";
import Link from "next/link";

export default function Sidebar() {
  return (
    <aside className="w-64 min-h-screen bg-[#00598A] flex flex-col">

      {/* Logo */}
      <div className="flex flex-col items-center pt-8 pb-10">
        <Image
          src="/images/logo.png"
          alt="Logo"
          width={90}
          height={90}
        />
      </div>

      {/* Menu */}
      <nav className="flex flex-col">

        <Link
          href="/admin/dashboard"
          className="px-8 py-4 text-white font-semibold bg-white/10 border-l-4 border-white"
        >
          Eskul
        </Link>

        <Link
          href="/admin/galeri"
          className="px-8 py-4 text-white/70 hover:text-white hover:bg-white/10 transition"
        >
          Galeri
        </Link>

        <Link
          href="/admin/pendaftaran"
          className="px-8 py-4 text-white/70 hover:text-white hover:bg-white/10 transition"
        >
          Riwayat Pendaftaran
        </Link>

      </nav>

      {/* Logout */}
      <div className="mt-auto p-6">
        <button className="w-full bg-red-500 hover:bg-red-600 text-white rounded-lg py-3 font-semibold transition">
          Logout
        </button>
      </div>

    </aside>
  );
}