"use client";

interface HeaderProps {
  onTambahClick?: () => void;
}

export default function Header({ onTambahClick }: HeaderProps) {
  return (
    <header className="h-20 bg-[#00598A] flex items-center justify-between px-10">
      <h1 className="text-3xl font-bold text-white tracking-wide">
        GRIDAS EKSKUL
      </h1>
      <button 
        onClick={onTambahClick}
        className="bg-[#32D74B] hover:bg-green-500 text-white font-bold px-8 py-3 rounded-xl"
      >
        Tambah
      </button>
    </header>
  );
}