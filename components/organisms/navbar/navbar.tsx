"use client";

import Image from "next/image";

interface NavbarProps {
  onReset?: () => void;
}

export function Navbar({ onReset }: NavbarProps) {
const handleNavClick = (e: React.MouseEvent, targetId: string) => {
    if (onReset) {
      onReset();
    }

    const element = document.getElementById(targetId);
    if (element) {
      e.preventDefault();
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header className="flex items-center justify-between px-6 py-4 bg-white shadow-sm md:px-16 sticky top-0 z-50 text-gray-800">
      
      {/* LOGO & NAMA SEKOLAH */}
      <div 
        onClick={(e) => handleNavClick(e, "home")} 
        className="flex items-center space-x-3 cursor-pointer">

        <Image 
          src="/images/logo skolah.jpeg" 
          alt="Logo SMKN 2 Sumedang" 
          width={40} 
          height={40} 
          className="object-contain"
        />
        <span className="font-bold text-sky-800 tracking-wide text-xs md:text-sm">
          SMK NEGERI 2 SUMEDANG
        </span>
      </div>

      {/* MENU NAVIGASI */}
      <nav className="hidden md:flex items-center space-x-8 text-blue-900 font-semibold text-sm">
        <a 
          href="#home" 
          onClick={(e) => handleNavClick(e, "home")} 
          className="text-sky-800 transition duration-200"
        >
          Home
        </a>
        <a 
          href="#ekskul" 
          onClick={(e) => handleNavClick(e, "ekskul")} 
          className="text-sky-800 transition duration-200"
        >
          Eskul
        </a>
        <a href="#galeri" 
        onClick={(e) => handleNavClick(e, "galeri")} 
        className="text-sky-800 transition duration-200">
          Galeri
        </a>
       
      </nav>

    </header>
  );
}