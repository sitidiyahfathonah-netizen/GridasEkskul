"use client";

import Image from "next/image";
import { useState } from "react";

interface NavbarProps {
  onReset?: () => void;
}

export function Navbar({ onReset }: NavbarProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleNavClick = (
    e: React.MouseEvent,
    targetId: string
  ) => {
    if (onReset) {
      onReset();
    }

    const element = document.getElementById(targetId);

    if (element) {
      e.preventDefault();

      element.scrollIntoView({
        behavior: "smooth",
      });
    }

    // Menutup menu setelah menu dipilih di HP
    setMenuOpen(false);
  };

  return (
    <header
      className="
        sticky
        top-0
        z-50
        w-full
        bg-white
        text-gray-800
        shadow-sm
      "
    >
      <div
        className="
          flex
          items-center
          justify-between
          px-4
          py-3

          sm:px-6
          sm:py-4

          md:px-10

          lg:px-16
        "
      >
        {/* LOGO & NAMA SEKOLAH */}
        <div
          onClick={(e) =>
            handleNavClick(e, "home")
          }
          className="
            flex
            cursor-pointer
            items-center
            gap-2

            sm:gap-3
          "
        >
          <Image
            src="/images/logo skolah.jpeg"
            alt="Logo SMKN 2 Sumedang"
            width={40}
            height={40}
            className="
              h-9
              w-9
              object-contain

              sm:h-10
              sm:w-10
            "
          />

          <span
            className="
              text-[10px]
              font-bold
              tracking-wide
              text-sky-800

              sm:text-xs

              md:text-sm
            "
          >
            SMK NEGERI 2 SUMEDANG
          </span>
        </div>

        {/* MENU DESKTOP */}
        <nav
          className="
            hidden
            items-center
            gap-8
            text-sm
            font-semibold
            text-blue-900

            md:flex
          "
        >
          <a
            href="#home"
            onClick={(e) =>
              handleNavClick(e, "home")
            }
            className="
              text-sky-800
              transition
              duration-200
              hover:text-[#00598A]
            "
          >
            Home
          </a>

          <a
            href="#ekskul"
            onClick={(e) =>
              handleNavClick(e, "ekskul")
            }
            className="
              text-sky-800
              transition
              duration-200
              hover:text-[#00598A]
            "
          >
            Eskul
          </a>

          <a
            href="#galeri"
            onClick={(e) =>
              handleNavClick(e, "galeri")
            }
            className="
              text-sky-800
              transition
              duration-200
              hover:text-[#00598A]
            "
          >
            Galeri
          </a>
        </nav>

        {/* TOMBOL MENU HP */}
        <button
          type="button"
          onClick={() =>
            setMenuOpen(!menuOpen)
          }
          className="
            flex
            h-10
            w-10
            items-center
            justify-center
            rounded-lg
            text-2xl
            text-sky-800
            transition
            hover:bg-sky-50

            md:hidden
          "
          aria-label="Buka menu"
        >
          {menuOpen ? "✕" : "☰"}
        </button>
      </div>

      {/* MENU MOBILE (DRAWER) */}
      {/* Backdrop */}
      {menuOpen && (
        <div
          onClick={() => setMenuOpen(false)}
          className="fixed inset-0 z-40 bg-black/45 backdrop-blur-xs transition-opacity duration-300 md:hidden"
        />
      )}

      {/* Drawer */}
      <div
        className={`
          fixed inset-y-0 right-0 z-50 flex w-72 flex-col bg-white p-6 shadow-2xl transition-transform duration-300 ease-in-out md:hidden
          ${menuOpen ? "translate-x-0" : "translate-x-full"}
        `}
      >
        <div className="flex items-center justify-between pb-6 border-b border-gray-100">
          <span className="text-xs font-extrabold tracking-wider text-sky-800">
            MENU UTAMA
          </span>
          <button
            onClick={() => setMenuOpen(false)}
            className="flex h-10 w-10 items-center justify-center rounded-lg text-2xl text-gray-500 hover:bg-gray-50 transition"
            aria-label="Tutup menu"
          >
            ✕
          </button>
        </div>

        <nav className="flex flex-col gap-2 mt-6">
          <a
            href="#home"
            onClick={(e) => handleNavClick(e, "home")}
            className="flex items-center rounded-xl px-4 py-3 text-base font-semibold text-sky-800 hover:bg-sky-50 transition duration-200"
          >
            Home
          </a>

          <a
            href="#ekskul"
            onClick={(e) => handleNavClick(e, "ekskul")}
            className="flex items-center rounded-xl px-4 py-3 text-base font-semibold text-sky-800 hover:bg-sky-50 transition duration-200"
          >
            Eskul
          </a>

          <a
            href="#galeri"
            onClick={(e) => handleNavClick(e, "galeri")}
            className="flex items-center rounded-xl px-4 py-3 text-base font-semibold text-sky-800 hover:bg-sky-50 transition duration-200"
          >
            Galeri
          </a>
        </nav>
      </div>
    </header>
  );
}