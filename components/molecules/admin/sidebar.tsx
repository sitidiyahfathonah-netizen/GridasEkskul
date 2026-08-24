"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Josefin_Sans } from "next/font/google";

const josefin = Josefin_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"]
});

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const getLinkClass = (path: string) => {
    const isActive = pathname === path;

    return `block px-8 py-4 transition-all duration-200 ${isActive
      ? "bg-white/20 text-white font-bold border-r-4 border-white"
      : "text-white/70 hover:bg-white/10 hover:text-white font-medium"
      }`;
  };

  return (
    <>
      {/* Toggle Button for Mobile */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-5 left-4 z-50 flex h-10 w-10 items-center justify-center rounded-lg bg-sky-900/60 hover:bg-sky-900/80 backdrop-blur-sm text-white shadow-md transition duration-200 md:hidden"
        aria-label="Toggle Sidebar"
      >
        {isOpen ? (
          <span className="text-xl font-bold">✕</span>
        ) : (
          <span className="text-xl font-bold">☰</span>
        )}
      </button>

      {/* Backdrop for Mobile */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 z-30 bg-black/50 backdrop-blur-sm transition-opacity duration-300 md:hidden"
        />
      )}

      {/* Sidebar Drawer */}
      {/* PERBAIKAN: Mengganti md:static menjadi h-screen sticky top-0 agar terikat tinggi layar */}
      <aside
        className={`
          fixed inset-y-0 left-0 z-40 flex flex-col bg-[#00598A] text-white transition-transform duration-300 ease-in-out
          h-screen sticky top-0 md:translate-x-0 md:w-64!
          ${isOpen ? "translate-x-0 w-64" : "-translate-x-full w-0"}
          ${josefin.className}
        `}
      >
        {/* Logo */}
        <div className="flex justify-center py-8 border-b border-white/20 shrink-0">
          <Image
            src="/images/logo skolah.jpeg"
            alt="Logo"
            width={110}
            height={110}
          />
        </div>

        {/* Navigasi Menu */}
        <nav className="flex-1 mt-6 space-y-2 overflow-y-auto">
          <Link
            href="/admin/dashboard"
            onClick={() => setIsOpen(false)}
            className={getLinkClass("/admin/dashboard")}
          >
            Eskul
          </Link>
          <Link
            href="/admin/galeri"
            onClick={() => setIsOpen(false)}
            className={getLinkClass("/admin/galeri")}
          >
            Galeri
          </Link>
          <Link
            href="/admin/pendaftaran"
            onClick={() => setIsOpen(false)}
            className={getLinkClass("/admin/pendaftaran")}
          >
            Riwayat Pendaftaran
          </Link>
        </nav>

        {/* Tombol Logout terkunci di bawah */}
        {/* PERBAIKAN: pb-24 diganti pb-8 agar pas posisinya dan tidak terdorong jauh */}
        <div className="mt-auto px-6 pb-8 pt-4 shrink-0">
          <button
            onClick={() => {
              window.location.href = "/admin/login";
            }}
            className="w-full bg-white hover:bg-[#3b82f6] hover:text-white active:bg-[#1e3a8a] active:text-white active:scale-95 text-[#00598A] py-3 rounded-xl font-bold transition-all duration-200 shadow-md"
          >
            Logout
          </button>
        </div>
      </aside>
    </>
  );
}