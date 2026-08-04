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

      {/* MENU MOBILE */}
      {menuOpen && (
        <nav
          className="
            flex
            flex-col
            border-t
            border-gray-200
            bg-white
            px-4
            py-3
            text-sm
            font-semibold

            md:hidden
          "
        >
          <a
            href="#home"
            onClick={(e) =>
              handleNavClick(e, "home")
            }
            className="
              rounded-lg
              px-4
              py-3
              text-sky-800
              transition
              hover:bg-sky-50
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
              rounded-lg
              px-4
              py-3
              text-sky-800
              transition
              hover:bg-sky-50
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
              rounded-lg
              px-4
              py-3
              text-sky-800
              transition
              hover:bg-sky-50
            "
          >
            Galeri
          </a>
        </nav>
      )}
    </header>
  );
}