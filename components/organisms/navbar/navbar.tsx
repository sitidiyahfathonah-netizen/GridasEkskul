"use client";
import { Squares2X2Icon, UserIcon, PhotoIcon } from '@heroicons/react/24/outline';
import Image from "next/image";
import { useState } from "react";

interface NavbarProps {
  onReset?: () => void;
}

export function Navbar({ onReset }: NavbarProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  const handleNavClick = (
    e: React.MouseEvent,
    targetId: string
  ) => {
    e.preventDefault();
    setActiveSection(targetId);

    if (onReset) {
      onReset();
    }

    // Menutup menu setelah menu dipilih di HP
    setMenuOpen(false);

    // Memberi waktu React untuk re-render sebelum mencari ID
    setTimeout(() => {
      const element = document.getElementById(targetId);
      if (element) {
        element.scrollIntoView({
          behavior: "smooth",
        });
      }
    }, 100);
  };

  return (
    <header
      className="sticky top-0 z-50 w-full bg-white text-gray-800 shadow-sm">
      <div
        className="flex items-center justify-between px-4 py-3 sm:px-6 sm:py-4 md:px-10 lg:px-16">
        {/* LOGO & NAMA SEKOLAH */}
        <div
          onClick={(e) =>
            handleNavClick(e, "home")}
          className="flex cursor-pointer items-center gap-2 sm:gap-3">
          <Image
            src="/images/logo skolah.jpeg"
            alt="Logo SMKN 2 Sumedang"
            width={40}
            height={40}
            className="h-9 w-9 object-contain sm:h-10 sm:w-10 " />

          <span
            className="text-[10px] font-bold tracking-wide text-sky-800 sm:text-xs md:text-sm">SMK NEGERI 2 SUMEDANG
          </span>
        </div>

        {/* MENU DESKTOP */}
        <nav
          className="hidden items-center gap-8 text-sm font-semibold text-blue-900 md:flex">
          <a
            href="#home"
            onClick={(e) =>
              handleNavClick(e, "home")}
            className="text-sky-800 transition duration-200 hover:text-[#00598A]">Home</a>

          <a
            href="#ekskul"
            onClick={(e) =>
              handleNavClick(e, "ekskul")}
            className="text-sky-800 transition duration-200 hover:text-[#00598A]">Eskul</a>

          <a
            href="#galeri"
            onClick={(e) =>
              handleNavClick(e, "galeri")}
            className="text-sky-800 transition duration-200 hover:text-[#00598A]">Galeri</a>
        </nav>

        {/* TOMBOL MENU HP */}
        <button
          type="button"
          onClick={() =>
            setMenuOpen(!menuOpen)}
          className="flex h-10 w-10 items-center justify-center rounded-lg text-2xl text-sky-800 transition hover:bg-sky-50 md:hidden" aria-label="Buka menu">
          {menuOpen ? "✕" : "☰"}
        </button>
      </div>

      {/* MENU MOBILE (DRAWER) */}
      {/* Backdrop */}
      {menuOpen && (
        <div
          onClick={() => setMenuOpen(false)}
          className="fixed inset-0 z-40 bg-black/45 backdrop-blur-xs transition-opacity duration-300 md:hidden" />)}

      {/* menu navigasi sidebar*/}
      <div
        className={`
          fixed inset-y-0 left-0 z-50 flex w-[280px] flex-col bg-[#222B3C] shadow-2xl transition-transform duration-300 ease-in-out md:hidden
          ${menuOpen ? "translate-x-0" : "-translate-x-full"}`}>

        {/* Top Profile Section */}
        <div className="bg-[#004E7A] rounded-br-[60px] pt-12 pb-10 px-6 relative flex flex-col items-center shadow-md">
          <button
            onClick={() => setMenuOpen(false)}
            className="absolute top-4 right-5 text-sky-200 hover:text-white text-2xl transition"> ✕ </button>

          <div className="relative mb-3">
            {/* border ring */}
            <div className="h-20 w-20 rounded-full border-[3px] border-l-white border-t-white border-r-white border-b-transparent p-1 flex items-center justify-center transform -rotate-12">
              <div className="h-full w-full rounded-full bg-white flex items-center justify-center overflow-hidden shadow-inner transform rotate-12">
                <Image
                  src="/images/logo skolah.jpeg"
                  alt="Logo SMKN 2 Sumedang"
                  width={60}
                  height={60}
                  className="object-contain scale-90" />
              </div>
            </div>
          </div>

          <h3 className="text-white font-bold text-[14px] tracking-wide mt-2">SMKN 2 SUMEDANG</h3>
          <p className="text-sky-200 text-[11px] mt-1 font-medium">Sistem Informasi Ekskul</p>
        </div>

        {/* Menu Items */}
        <nav className="flex flex-col gap-2 mt-8 px-4 flex-1">
          {/* 1. Menu Dashboard */}
          <a
            href="#home"
            onClick={(e) => handleNavClick(e, "home")}
            className={`flex items-center gap-4 px-6 py-4 rounded-3xl transition ${activeSection === "home"
              ? "bg-[#E1E7EE] text-[#1E293B] font-bold shadow-sm"
              : "text-slate-300 font-medium hover:bg-white/10 hover:text-white"}`}>
            <Squares2X2Icon className={`w-5 h-5 ${activeSection === "home" ? "text-[#004E7A]" : ""}`} />
            Dashboard
          </a>

          {/* 2. Menu Eskul */}
          <a
            href="#ekskul"
            onClick={(e) => handleNavClick(e, "ekskul")}
            className={`flex items-center gap-4 px-6 py-4 rounded-3xl transition ${activeSection === "ekskul"
              ? "bg-[#E1E7EE] text-[#1E293B] font-bold shadow-sm"
              : "text-slate-300 font-medium hover:bg-white/10 hover:text-white"}`}>
            <UserIcon className={`w-5 h-5 ${activeSection === "ekskul" ? "text-[#004E7A]" : ""}`} />
            Eskul
          </a>

          {/* 3. Menu Galeri */}
          <a
            href="#galeri"
            onClick={(e) => handleNavClick(e, "galeri")}
            className={`flex items-center gap-4 px-6 py-4 rounded-3xl transition ${activeSection === "galeri"
              ? "bg-[#E1E7EE] text-[#1E293B] font-bold shadow-sm"
              : "text-slate-300 font-medium hover:bg-white/10 hover:text-white"}`}>
            <PhotoIcon className={`w-5 h-5 ${activeSection === "galeri" ? "text-[#004E7A]" : ""}`} />
            Galeri
          </a>
        </nav>
      </div>
    </header>
  );
}