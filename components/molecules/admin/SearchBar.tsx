"use client";

export default function SearchBar() {
  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">

      {/* Search */}
      <div className="relative w-full">

        <input
          type="text"
          placeholder="Cari Ekskul"
          className="w-full rounded-xl border border-gray-300 bg-white pl-14 pr-5 py-3 text-sm outline-none focus:border-[#00598A] focus:ring-2 focus:ring-[#00598A]/20"/>

        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
          🔍
        </span>

      </div>

    </div>
  );
}