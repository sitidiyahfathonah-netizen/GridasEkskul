"use client";

import Image from "next/image";
import Link from "next/link";

export default function Sidebar() {
  return (
    <aside className="w-72 bg-[#00598A] text-white flex flex-col">
      <div className="flex justify-center py-8 border-b border-white/20">
        <Image
          src="/images/logo skolah.jpeg"
          alt="Logo"
          width={110}
          height={110}
        />
      </div>

      <nav className="flex-1 mt-8">
        <Link
          href="/admin/dashboard"
          className="block px-10 py-4 bg-white/10 font-semibold"
        >
          Eskul
        </Link>
        <Link
          href="/admin/galeri"
          className="block px-10 py-4 hover:bg-white/10  text-sky-900"
        >
          Galeri
        </Link>
        <Link
          href="/admin/pendaftaran"
          className="block px-10 py-4 hover:bg-white/10 text-sky-900"
        >
          Riwayat Pendaftaran
        </Link>
      </nav>
    </aside>
  );
}