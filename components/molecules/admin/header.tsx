"use client";

import { Josefin_Sans } from "next/font/google";

const josefin = Josefin_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"]
});


interface HeaderProps {
  title?: string;
  onTambahClick?: () => void;
}

export default function Header({
  title = "GRIDAS EKSKUL",
  onTambahClick,
}: HeaderProps) {
  return (
    <header className="flex h-20 items-center justify-between bg-[#00598A] px-4 md:px-8">
      <h1 className={`text-xl md:text-2xl font-bold tracking-wide text-white pl-12 md:pl-0 ${josefin.className}`}>
        {title}
      </h1>

      <button
        onClick={onTambahClick}
        className={`bg-[#08B84F] hover:bg-[#079E43] text-white px-10 py-3 rounded-xl font-bold transition duration-200 ${josefin.className}`}>
        Tambah
      </button>
    </header>
  );
}