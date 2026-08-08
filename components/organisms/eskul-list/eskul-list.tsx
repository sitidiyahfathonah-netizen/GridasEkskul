"use client";
import { useState } from "react";
import { Josefin_Sans } from "next/font/google";

const josefin = Josefin_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"]
});

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";

interface EskulProps {
  dataEkskul: any[];
  onSelect: (ekskul: any) => void;
}

export function Eskul({ dataEkskul, onSelect }: EskulProps) {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredEskul = dataEkskul.filter((eskul) => {
    const nama = eskul.nama_ekskul || "";
    return nama.toLowerCase().includes(searchQuery.toLowerCase());
  });



  // Helper fungsi untuk mengekstrak URL media Strapi secara fleksibel
  const getStrapiMediaUrl = (media: any) => {
    if (!media) return null;
    const item = Array.isArray(media) ? media[0] : media;
    const rawUrl =
      item?.url ||
      item?.attributes?.url ||
      item?.data?.attributes?.url ||
      item?.data?.url ||
      (Array.isArray(item?.data) ? item?.data[0]?.attributes?.url || item?.data[0]?.url : null);

    if (!rawUrl) return null;
    if (rawUrl.startsWith("http://") || rawUrl.startsWith("https://")) return rawUrl;
    return `${STRAPI_URL}${rawUrl}`;
  };

  return (
    <section id="ekskul"
      className={`w-full ${josefin.className}`}>
      {/* 1. HERO SECTION */}
      <div className="relative w-full pt-6 pb-20 md:pt-8 md:pb-28 flex flex-col items-center justify-start px-4 overflow-hidden bg-[#005187]">
        <div
          className="absolute inset-0 w-full h-full bg-cover bg-center z-0"
          style={{ backgroundImage: `url('/images/bg-katalog.jpeg')` }}
        />

        <div className="absolute inset-0 bg-gradient-to-b from-gray-800 via-sky-800/1 to-[#104f79] z-10" />
        <div className="relative z-20 max-w-2xl w-full flex flex-col items-center text-center space-y-6">

          {/* SEARCH BAR TERPISAH DENGAN TOMBOL BULAT */}
          <div className="w-full flex items-center justify-center gap-3 max-w-md mx-auto mb-6">
            <div className="flex-1 bg-white px-6 py-2.5 rounded-full shadow-[0_8px_30px_rgba(0,0,0,0.15)] border border-slate-100 flex items-center">
              <input
                type="text"
                placeholder="Cari Eskul..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-transparent outline-none text-slate-700 placeholder-slate-400 text-lg font-normal font-sans"
              />

              {/* Tombol Bulat Terpisah */}
              <button
                type="button"
                className="w-11 h-11 bg-white rounded-full flex items-center justify-center shadow-[0_8px_30px_rgba(0,0,0,0.15)] border border-slate-100 hover:bg-gray-50 transition-all flex-shrink-0 cursor-pointer">
                <svg xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-[#00598A]"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2.5}
                  stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
            </div>
          </div>

          {/* JUDUL UTAMA KATALOG */}
          <div className="text-white space-y-1 drop-shadow-[0_5px_20px_rgba(0,0,0,0.5)]">
            <h2 className="text-4xl md:text-[87px] font-bold tracking-tight leading-tight">
              Katalog
            </h2>
            <h3 className="text-4xl md:text-[60px] font-bold tracking-tight leading-tight">
              Gridas Ekstrakulikuler
            </h3>
          </div>
        </div>
      </div>

      {/* 2. CATALOG GRID SECTION (Bagian Bawah dengan Gradasi Warna Biru ke Bawah) */}
      <div className="w-full bg-gradient-to-b from-[#104f79] via-[#0e4468] to-[#0a314b] pb-24 px-6 md:px-30">
        <div className="max-w-6xl mx-auto -mt-12 md:-mt-16 relative z-30">
          {/* GRID CARD EKSKUL */}
          <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch justify-center">
            {filteredEskul.map((eskul) => {
              const namaEskul = eskul.nama_ekskul || eskul.attributes?.nama_ekskul || "";
              const deskripsiSingkat = eskul.deskripsi_singkat || eskul.attributes?.deskripsi_singkat || "Belum ada deskripsi singkat.";

              const fotoData = eskul.foto_utama || eskul.attributes?.foto_utama;
              const rawUrl =
                fotoData?.url ||
                fotoData?.attributes?.url ||
                fotoData?.data?.attributes?.url ||
                fotoData?.data?.url ||
                (Array.isArray(fotoData) ? fotoData[0]?.url || fotoData[0]?.attributes?.url : null) ||
                (Array.isArray(fotoData?.data) ? fotoData?.data[0]?.attributes?.url || fotoData?.data[0]?.url : null);

              const imageSrc = getStrapiMediaUrl(fotoData) || (rawUrl ? `http://localhost:1337${rawUrl}` : "/images/bg-katalog.jpeg");

              return (
                <div
                  key={eskul.documentId || eskul.id}
                  className="bg-white rounded-[32px] p-5 shadow-[0_15px_40px_rgba(0,0,0,0.15)] flex flex-col justify-between gap-4 transform hover:-translate-y-2 transition duration-300 border border-slate-50"
                >
                  <div className="space-y-4">
                    {/* Gambar Miniatur Eskul */}
                    <div className="w-full aspect-video rounded-[24px] overflow-hidden bg-slate-100">
                      <img
                        src={imageSrc}
                        alt={namaEskul}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          const target = e.currentTarget;
                          if (rawUrl && !target.src.includes("localhost:1337")) {
                            target.src = `http://localhost:1337${rawUrl}`;
                          } else {
                            target.src = "/images/bg-katalog.jpeg";
                          }
                        }}
                      />
                    </div>

                    {/* Teks Nama & Deskripsi */}
                    <div className="px-1 space-y-1">
                      <h4 className="text-2xl font-bold text-slate-900 tracking-tight">
                        {namaEskul}
                      </h4>
                      <p className="text-sm text-slate-500 font-normal line-clamp-2">
                        {deskripsiSingkat}
                      </p>
                    </div>
                  </div>

                  {/* Tombol Detail */}
                  <div className="pt-2">
                    <button
                      onClick={() => onSelect(eskul)}
                      className="bg-[#0092DA] hover:bg-[#007AB8] active:bg-white active:text-[#0092DA] active:border-[#0092DA] active:scale-95 border-2 border-transparent text-white font-bold py-2 md:py-2.5 px-4 rounded-xl text-xs md:text-sm shadow-sm transition-all duration-200 flex-1 w-full">
                      Lihat Detail
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Jika pencarian tidak ditemukan */}
          {filteredEskul.length === 0 && (
            <div className="text-center text-white/60 mt-12 text-lg">
              Ekstrakurikuler "{searchQuery}" tidak ditemukan.
            </div>
          )}
        </div>
      </div>

    </section>
  );
}