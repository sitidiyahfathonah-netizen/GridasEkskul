"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const getLinkClass = (path: string) => {
    const isActive = pathname === path;

    return `block px-8 py-4 transition-all duration-200 ${
      isActive
        ? "bg-white/20 text-white font-bold border-r-4 border-white" // Tampilan saat AKTIF
        : "text-white/70 hover:bg-white/10 hover:text-white font-medium" // Tampilan saat TIDAK aktif
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
      <aside
        className={`
          fixed inset-y-0 left-0 z-40 flex w-64 flex-col bg-[#00598A] text-white transition-transform duration-300 ease-in-out
          md:static md:translate-x-0
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        <div className="flex justify-center py-8 border-b border-white/20">
          <Image
            src="/images/logo skolah.jpeg"
            alt="Logo"
            width={110}
            height={110}
          />
        </div>

        <nav className="flex-1 mt-10 space-y-3">
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

        <div className="mt-auto px-10 pb-24">
          <button
            onClick={() => {
              window.location.href = "/admin/login";
            }}
            className="
              w-full
              bg-white
              hover:bg-gray-100
              text-[#00598A]
              py-3
              rounded-xl
              font-bold
              transition
              duration-200
            "
          >
            Logout
          </button>
        </div>
      </aside>
    </>
  );
}