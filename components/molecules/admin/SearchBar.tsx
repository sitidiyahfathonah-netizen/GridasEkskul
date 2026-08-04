"use client";

export default function SearchBar() {
  return (
    <div
      className="
        mb-5
        flex
        w-full
        flex-col
        gap-3

        sm:mb-6
        sm:gap-4

        md:mb-8
        md:flex-row
        md:items-center
        md:justify-between
      "
    >
      {/* Search */}
      <div className="relative w-full">
        <input
          type="text"
          placeholder="Cari Ekskul"
          className="
            w-full
            rounded-lg
            border
            border-gray-300
            bg-white

            py-2.5
            pl-12
            pr-4

            text-sm
            outline-none

            focus:border-[#00598A]
            focus:ring-2
            focus:ring-[#00598A]/20

            sm:rounded-xl
            sm:py-3
            sm:pl-14
            sm:pr-5
            sm:text-base
          "
        />

        <span
          className="
            absolute
            left-3
            top-1/2
            -translate-y-1/2
            text-sm
            text-gray-400

            sm:left-4
            sm:text-base
          "
        >
          🔍
        </span>
      </div>
    </div>
  );
}