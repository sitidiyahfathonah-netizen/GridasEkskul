"use client";

interface GaleriItem {
  id: number;
  nama: string;
  image: string;
}

interface GaleriGridProps {
  items: GaleriItem[];
}

export default function GaleriGrid({ items }: GaleriGridProps) {
  return (
    <div className="grid grid-cols-2 gap-5 p-6">
      {items.map((item) => (
        <div
          key={item.id}
          className="relative group rounded-xl overflow-hidden shadow-md h-48 w-full"
        >
          <img
            src={item.image}
            alt={item.nama}
            className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
          />
          {/* Overlay Nama di Bawah Foto */}
          <div className="absolute bottom-3 left-4 text-white font-semibold text-lg drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
            {item.nama}
          </div>
        </div>
      ))}
    </div>
  );
}