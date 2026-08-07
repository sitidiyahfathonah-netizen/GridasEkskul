"use client"

import { useState } from "react";

export interface GaleriItem {
  id: number;
  documentId?: string;
  nama: string;
  image: string;
}

interface GaleriGridProps {
  items: GaleriItem[];
  onCardClick?: (item: GaleriItem) => void;
}

export default function GaleriGrid({ items, onCardClick }: GaleriGridProps) {
  const [activeCardId, setActiveCardId] = useState<number | null>(null);

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
      {items.map((item) => {
        const isActive = activeCardId === item.id;

        return (
          <div
            key={item.id}
            onClick={() => setActiveCardId(isActive ? null : item.id)}
            className="group relative h-52 w-full cursor-pointer overflow-hidden rounded-2xl shadow-md transition-all duration-300 hover:shadow-xl"
          >
            <img
              src={item.image}
              alt={item.nama}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

            <div className="absolute bottom-4 left-6 z-10">
              <h3 className="text-xl font-bold text-white drop-shadow-md">
                {item.nama}
              </h3>
            </div>

            {/* Pop-up / Overlay Tombol Hapus saat foto diklik */}
            <div
              className={`absolute inset-0 z-20 flex items-center justify-center bg-black/40 transition-opacity duration-200 ${isActive ? "opacity-100" : "opacity-0 group-hover:opacity-100"
                }`}
            >
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  if (onCardClick) onCardClick(item);
                }}
                className="rounded-xl bg-red-600 px-5 py-2 text-xs font-bold text-white shadow-lg transition-transform hover:scale-105 hover:bg-red-700 active:scale-95"
              >
                Hapus Foto
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}