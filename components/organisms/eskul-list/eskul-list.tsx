"use client";

import { useState } from "react";
import { Josefin_Sans } from "next/font/google";

const josefin = Josefin_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const STRAPI_URL =
  process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";

interface EskulProps {
  dataEkskul: any[];
  onSelect: (ekskul: any) => void;
}

export function Eskul({
  dataEkskul,
  onSelect,
}: EskulProps) {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredEskul = dataEkskul.filter((eskul) => {
    const nama = eskul.nama_ekskul || "";

    return nama
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
  });

  return (
    <section
      id="ekskul"
      className={`w-full ${josefin.className}`}
    >
      {/* HERO SECTION */}
      <div
        className="
          relative
          flex
          h-[400px]
          w-full
          flex-col
          items-center
          justify-center
          overflow-hidden
          px-4
          sm:h-[430px]
          sm:px-6
          md:h-[480px]
        "
      >
        {/* Gambar Background */}
        <div
          className="
            absolute
            inset-0
            z-0
            h-full
            w-full
            bg-cover
            bg-center
            opacity-40
            blur-[1px]
          "
          style={{
            backgroundImage:
              `url('/images/bg-katalog.jpeg')`,
          }}
        />

        {/* Overlay */}
        <div
          className="
            absolute
            inset-0
            z-10
            bg-gradient-to-b
            via-[#104f79]/10
            to-[#104f79]
          "
        />

        {/* Konten Search + Judul */}
        <div
          className="
            relative
            z-20
            -mt-4
            flex
            w-full
            max-w-2xl
            flex-col
            items-center
            space-y-12
            text-center
            sm:-mt-6
            sm:space-y-16
            md:space-y-20
          "
        >
          {/* SEARCH BAR */}
          <div className="w-full">
            <div
              className="
                flex
                items-center
                gap-2
                rounded-full
                border
                border-slate-100
                bg-white/95
                px-4
                py-2.5
                shadow-[0_8px_30px_rgb(0,0,0,0.12)]
                backdrop-blur-md
                sm:gap-3
                sm:px-6
                sm:py-3
              "
            >
              <input
                type="text"
                placeholder="Cari Eskul..."
                value={searchQuery}
                onChange={(e) =>
                  setSearchQuery(e.target.value)
                }
                className="
                  w-full
                  bg-transparent
                  text-sm
                  font-normal
                  text-slate-700
                  outline-none
                  placeholder:text-slate-400
                  sm:text-base
                  md:text-lg
                "
              />

              <button
                className="
                  shrink-0
                  rounded-full
                  bg-white
                  p-1.5
                  text-blue-600
                  shadow-md
                  transition
                  hover:scale-105
                  active:scale-95
                  sm:p-2
                "
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="
                    h-5
                    w-5
                    sm:h-6
                    sm:w-6
                  "
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.602 10.602z"
                  />
                </svg>
              </button>
            </div>
          </div>

          {/* JUDUL KATALOG */}
          <div className="space-y-1 text-white">
            <h2
              className="
                text-4xl
                font-bold
                leading-none
                tracking-tight
                [text-shadow:-3px_3px_7px_rgba(0,0,0,0.4)]
                sm:text-5xl
                md:text-[64px]
                md:[text-shadow:-4px_4px_8px_rgba(0,0,0,0.4)]
              "
            >
              Katalog
            </h2>

            <h3
              className="
                text-3xl
                font-bold
                leading-tight
                tracking-tight
                [text-shadow:-3px_3px_7px_rgba(0,0,0,0.4)]
                sm:text-4xl
                md:text-[54px]
                md:[text-shadow:-4px_4px_8px_rgba(0,0,0,0.4)]
              "
            >
              Gridas Ekstrakulikuler
            </h3>
          </div>
        </div>
      </div>

      {/* CATALOG GRID */}
      <div
        className="
          w-full
          bg-gradient-to-b
          from-[#104f79]
          via-[#0e4468]
          to-[#0a314b]
          px-4
          pb-16
          pt-2
          sm:px-6
          sm:pb-20
          md:px-10
          md:pb-24
          lg:px-16
        "
      >
        <div className="mx-auto max-w-6xl">
          {/* GRID CARD */}
          <div
            className="
              grid
              w-full
              grid-cols-1
              items-stretch
              justify-center
              gap-5
              sm:grid-cols-2
              sm:gap-6
              lg:grid-cols-3
              lg:gap-8
            "
          >
            {filteredEskul.map((eskul) => {
              const namaEskul =
                eskul.nama_ekskul ||
                eskul.attributes?.nama_ekskul ||
                "";

              const deskripsiSingkat =
                eskul.deskripsi_singkat ||
                eskul.attributes?.deskripsi_singkat ||
                "Belum ada deskripsi singkat.";

              const fotoData =
                eskul.foto_utama ||
                eskul.attributes?.foto_utama;

              const photoUrl =
                fotoData?.url ||
                fotoData?.data?.attributes?.url;

              const imageSrc = photoUrl
                ? photoUrl.startsWith("http")
                  ? photoUrl
                  : `${STRAPI_URL}${photoUrl}`
                : "";

              return (
                <div
                  key={
                    eskul.documentId ||
                    eskul.id
                  }
                  className=" flex flex-col justify-between gap-4 rounded-[24px] border border-slate-50 bg-white p-4 shadow-[0_15px_40px_rgba(0,0,0,0.15)] transition
                    duration-300 hover:-translate-y-2  sm:rounded-[28px]  sm:p-5  md:rounded-[32px]"
                >
                  <div className="space-y-3 sm:space-y-4">
                    {/* Gambar */}
                    <div
                      className="aspect-video w-full overflow-hidden rounded-[18px] bg-slate-100 sm:rounded-[22px]
                      md:rounded-[24px]"
                    >
                      <img
                        src={imageSrc}
                        alt={namaEskul}
                        className="
                          h-full
                          w-full
                          object-cover
                        "
                        onError={(e) => {
                          e.currentTarget.src =
                            "/images/bg-katalog.jpeg";
                        }}
                      />
                    </div>

                    {/* Nama dan Deskripsi */}
                    <div className="space-y-1 px-1">
                      <h4
                        className="text-xl font-bold tracking-tight text-slate-90 sm:text-2xl"
                      >
                        {namaEskul}
                      </h4>

                      <p
                        className="line-clamp-2 text-xs font-normal text-slate-500 sm:text-sm"
                      >
                        {deskripsiSingkat}
                      </p>
                    </div>
                  </div>

                  {/* Tombol Detail */}
                  <div className="pt-1 sm:pt-2">
                    <button
                      onClick={() => {
                        if (
                          typeof onSelect ===
                          "function"
                        ) {
                          onSelect(eskul);
                        }
                      }}
                      className="w-full rounded-xl bg-sky-800 py-2.5 text-sm font-bold tracking-wide text-white shadow-md
                      transition duration-200 hover:bg-[#006aa7] active:scale-[0.98] sm:rounded-2xl sm:py-3 sm:text-base"
                      
                    >
                      Lihat Detail
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Data tidak ditemukan */}
          {filteredEskul.length === 0 && (
            <div
              className="mt-10 px-4 text-center text-base text-white/60 sm:mt-12 sm:text-lg "
            >
              Ekstrakurikuler "{searchQuery}"
              tidak ditemukan.
            </div>
          )}
        </div>
      </div>
    </section>
  );
}