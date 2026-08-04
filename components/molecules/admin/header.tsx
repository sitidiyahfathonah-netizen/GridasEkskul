"use client";

interface HeaderProps {
  title?: string;
  onTambahClick?: () => void;
}

export default function Header({
  title = "GRIDAS EKSKUL",
  onTambahClick,
}: HeaderProps) {
  return (
    <header
      className="
        flex
        h-16
        items-center
        justify-between
        gap-3
        bg-[#00598A]
        px-4

        sm:h-18
        sm:px-5

        md:h-20
        md:px-8
      "
    >
      {/* Judul */}
      <h1
        className="
          min-w-0
          truncate
          text-lg
          font-bold
          tracking-wide
          text-white

          sm:text-xl

          md:text-2xl
        "
      >
        {title}
      </h1>

      {/* Tombol Tambah */}
      <button
        onClick={onTambahClick}
        className="
          shrink-0
          rounded-lg
          bg-[#08B84F]
          px-4
          py-2
          text-sm
          font-bold
          text-white
          transition
          duration-200
          hover:bg-[#079E43]

          sm:px-6
          sm:py-2.5
          sm:text-base

          md:rounded-xl
          md:px-10
          md:py-3
        "
      >
        Tambah
      </button>
    </header>
  );
}