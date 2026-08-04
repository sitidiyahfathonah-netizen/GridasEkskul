"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Sidebar() {
  const pathname = usePathname();

  const getLinkClass = (path: string) => {
    const isActive = pathname === path;

    return `
      flex
      items-center
      justify-center
      md:justify-start
      px-3
      md:px-8
      py-4
      transition-all
      duration-200
      ${
        isActive
          ? "bg-white/20 text-white font-bold border-r-4 border-white"
          : "text-white/70 hover:bg-white/10 hover:text-white font-medium"
      }
    `;
  };

  return (
    <aside
      className="
        w-20
        md:w-64
        shrink-0
        bg-[#00598A]
        text-white
        flex
        flex-col
        transition-all
        duration-300
      "
    >
      {/* Logo */}
      <div
        className="
          flex
          justify-center
          py-6
          md:py-8
          border-b
          border-white/20
        "
      >
        <Image
          src="/images/logo skolah.jpeg"
          alt="Logo"
          width={110}
          height={110}
          className="
            w-14
            h-14
            md:w-[110px]
            md:h-[110px]
            object-contain
          "
        />
      </div>

      {/* Menu */}
      <nav className="flex-1 mt-8 md:mt-10 space-y-3">
        <Link
          href="/admin/dashboard"
          className={getLinkClass("/admin/dashboard")}
        >
          <span className="hidden md:inline">
            Eskul
          </span>

          <span className="md:hidden text-lg">
            E
          </span>
        </Link>

        <Link
          href="/admin/galeri"
          className={getLinkClass("/admin/galeri")}
        >
          <span className="hidden md:inline">
            Galeri
          </span>

          <span className="md:hidden text-lg">
            G
          </span>
        </Link>

        <Link
          href="/admin/pendaftaran"
          className={getLinkClass("/admin/pendaftaran")}
        >
          <span className="hidden md:inline">
            Riwayat Pendaftaran
          </span>

          <span className="md:hidden text-lg">
            R
          </span>
        </Link>
      </nav>

      {/* Tombol Logout */}
      <div
        className="
          mt-auto
          px-3
          md:px-10
          pb-8
          md:pb-24
        "
      >
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
          <span className="hidden md:inline">
            Logout
          </span>

          <span className="md:hidden">
            ↪
          </span>
        </button>
      </div>
    </aside>
  );
}