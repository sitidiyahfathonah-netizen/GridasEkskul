"use client";

import Image from "next/image";
import { useState } from "react";
import { Josefin_Sans } from "next/font/google";

const josefin = Josefin_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

interface NavbarProps {
  onReset?: () => void;
}

export function Navbar({ onReset }: NavbarProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  const handleNavClick = (e: React.MouseEvent, targetId: string) => {
    setActiveSection(targetId);

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


    setMenuOpen(false);
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300 ${josefin.className}`}>
      {/* Container Navbar Desktop & Top HP */}
      <div className="flex items-center justify-between bg-white px-6 py-3 sm:px-10 md:px-16 lg:px-24 shadow-xs">

        {/* LOGO & NAMA SEKOLAH */}
        <div
          onClick={(e) => handleNavClick(e, "home")}
          className="flex cursor-pointer items-center gap-3"
        >
          <Image
            src="/images/logo skolah.jpeg"
            alt="Logo SMKN 2 Sumedang"
            width={40}
            height={40}
            className="h-9 w-9 object-contain sm:h-10 sm:w-10"
          />
          <span className="text-sm font-bold tracking-wide text-[#00598A] sm:text-base md:text-lg">
            SMK NEGERI 2 SUMEDANG
          </span>
        </div>

        {/* MENU DESKTOP (Sesuai Presisi Figma) */}
        <nav className="hidden items-center gap-8 text-base font-medium md:flex lg:gap-10">
          <a
            href="#home"
            onClick={(e) => handleNavClick(e, "home")}
            className={`relative py-1 transition duration-200 ${activeSection === "home"
                ? "font-bold text-[#00598A] after:absolute after:bottom-0 after:left-0 after:h-[2.5px] after:w-full after:bg-[#00598A] after:rounded-full"
                : "text-gray-400 hover:text-[#00598A]"
              }`}
          >
            Home
          </a>

          <a
            href="#ekskul"
            onClick={(e) => handleNavClick(e, "ekskul")}
            className={`relative py-1 transition duration-200 ${activeSection === "ekskul"
                ? "font-bold text-[#00598A] after:absolute after:bottom-0 after:left-0 after:h-[2.5px] after:w-full after:bg-[#00598A] after:rounded-full"
                : "text-gray-400 hover:text-[#00598A]"
              }`}
          >
            Ekskul
          </a>

          <a
            href="#galeri"
            onClick={(e) => handleNavClick(e, "galeri")}
            className={`relative py-1 transition duration-200 ${activeSection === "galeri"
                ? "font-bold text-[#00598A] after:absolute after:bottom-0 after:left-0 after:h-[2.5px] after:w-full after:bg-[#00598A] after:rounded-full"
                : "text-gray-400 hover:text-[#00598A]"
              }`}
          >
            Galeri
          </a>
        </nav>

        {/* TOMBOL MENU HP */}
        <button
          type="button"
          onClick={() => setMenuOpen(!menuOpen)}
          className="flex h-10 w-10 items-center justify-center rounded-lg text-2xl text-[#00598A] transition hover:bg-sky-50 md:hidden"
          aria-label="Buka menu"
        >
          {menuOpen ? "✕" : "☰"}
        </button>
      </div>

      {/* MENU MOBILE (DRAWER KAMU TETAP UTUH) */}
      {/* Backdrop */}
      {menuOpen && (
        <div
          onClick={() => setMenuOpen(false)}
          className="fixed inset-0 z-40 bg-black/45 backdrop-blur-xs transition-opacity duration-300 md:hidden"
        />
      )}

      {/* Drawer */}
      <div
        className={`fixed inset-y-0 left-0 z-50 flex w-[280px] flex-col bg-[#222B3C] shadow-2xl transition-transform duration-300 ease-in-out md:hidden ${menuOpen ? "translate-x-0" : "-translate-x-full"
          }`}
      >
        {/* Top Profile Section */}
        <div className="relative flex flex-col items-center rounded-br-[60px] bg-[#004E7A] px-6 pt-12 pb-10 shadow-md">
          <button
            onClick={() => setMenuOpen(false)}
            className="absolute top-4 right-5 text-2xl text-sky-200 transition hover:text-white"
          >
            ✕
          </button>

          <div className="relative mb-3">
            <div className="flex h-20 w-20 -rotate-12 items-center justify-center rounded-full border-[3px] border-b-transparent border-l-white border-r-white border-t-white p-1">
              <div className="flex h-full w-full rotate-12 items-center justify-center overflow-hidden rounded-full bg-white shadow-inner">
                <Image
                  src="/images/logo skolah.jpeg"
                  alt="Logo SMKN 2 Sumedang"
                  width={60}
                  height={60}
                  className="scale-90 object-contain"
                />
              </div>
            </div>
          </div>

          <h3 className="mt-2 text-[14px] font-bold tracking-wide text-white">
            SMKN 2 SUMEDANG
          </h3>
          <p className="mt-1 text-[11px] font-medium text-sky-200">
            Sistem Informasi Ekskul
          </p>
        </div>

        {/* Menu Items */}
        <nav className="mt-8 flex flex-1 flex-col gap-2 px-4">
          <a
            href="#home"
            onClick={(e) => handleNavClick(e, "home")}
            className={`flex items-center gap-4 rounded-3xl px-6 py-4 transition ${activeSection === "home"
                ? "bg-[#E1E7EE] font-bold text-[#1E293B] shadow-xs"
                : "font-medium text-slate-300 hover:bg-white/10 hover:text-white"
              }`}
          >
            <svg
              className={`h-5 w-5 ${activeSection === "home" ? "text-[#004E7A]" : ""
                }`}
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
            </svg>
            Home
          </a>

          <a
            href="#ekskul"
            onClick={(e) => handleNavClick(e, "ekskul")}
            className={`flex items-center gap-4 rounded-3xl px-6 py-4 transition ${activeSection === "ekskul"
                ? "bg-[#E1E7EE] font-bold text-[#1E293B] shadow-xs"
                : "font-medium text-slate-300 hover:bg-white/10 hover:text-white"
              }`}
          >
            <svg
              className={`h-5 w-5 ${activeSection === "ekskul" ? "text-[#004E7A]" : ""
                }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
            Ekskul
          </a>

          <a
            href="#galeri"
            onClick={(e) => handleNavClick(e, "galeri")}
            className={`flex items-center gap-4 rounded-3xl px-6 py-4 transition ${activeSection === "galeri"
                ? "bg-[#E1E7EE] font-bold text-[#1E293B] shadow-xs"
                : "font-medium text-slate-300 hover:bg-white/10 hover:text-white"
              }`}
          >
            <svg
              className={`h-5 w-5 ${activeSection === "galeri" ? "text-[#004E7A]" : ""
                }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            Galeri
          </a>
        </nav>
      </div>
    </header>
  );
}