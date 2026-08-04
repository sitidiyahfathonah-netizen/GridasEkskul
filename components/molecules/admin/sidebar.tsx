"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Sidebar() {
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
    <aside className="w-64 bg-[#00598A] text-white flex flex-col">
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
          className={getLinkClass("/admin/dashboard")}
        >
          Eskul
        </Link>
        <Link
          href="/admin/galeri"
          className={getLinkClass("/admin/galeri")}
        >
          Galeri
        </Link>
        <Link
          href="/admin/pendaftaran"
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
  );
}