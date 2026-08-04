"use client";

interface GaleriItem {
  id: number;
  nama: string;
  image: string;
}

interface GaleriGridProps {
  items: GaleriItem[];
}

export default function GaleriGrid({
  items,
}: GaleriGridProps) {
  return (
    <div
      className="
        grid
        grid-cols-1
        gap-4
        p-3

        sm:grid-cols-2
        sm:gap-5
        sm:p-5

        lg:grid-cols-2
        lg:gap-6
        lg:p-6
      "
    >
      {items.map((item) => (
        <div
          key={item.id}
          className="
            relative
            group
            h-44
            w-full
            overflow-hidden
            rounded-xl
            shadow-md

            sm:h-48

            md:h-52
          "
        >
          <img
            src={item.image}
            alt={item.nama}
            className="
              h-full
              w-full
              object-cover
              transition
              duration-300
              group-hover:scale-105
            "
          />

          {/* Overlay Nama di Bawah Foto */}
          <div
            className="
              absolute
              bottom-3
              left-4
              text-base
              font-semibold
              text-white
              drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]

              sm:text-lg
            "
          >
            {item.nama}
          </div>
        </div>
      ))}
    </div>
  );
}