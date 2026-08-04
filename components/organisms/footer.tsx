"use client";

import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full bg-blue-600 border-t border-gray-200 mt-20 py-6">
      <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Hak Cipta / Brand Sekolah */}
        <p className="text-sm font-semibold text-[#00598A]">
         © SMKN 2 Sumedang <span className="font-normal text-gray-500">| All Rights Reserved</span>
        </p>

        {/* Link Navigasi Footer (Opsional) */}
        <div className="flex items-center space-x-6 text-sm text-gray-500 font-medium">
          <Link href="/" className="hover:text-[#00598A] transition">
            Home
          </Link>
          <Link href="/eskul" className="hover:text-[#00598A] transition">
            Ekskul
          </Link>
          <Link href="/galeri" className="hover:text-[#00598A] transition">
            Galeri
          </Link>
        </div>
      </div>
    </footer>
  );
}