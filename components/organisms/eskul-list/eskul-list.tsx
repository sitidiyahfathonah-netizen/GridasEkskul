"use client";
import { useState } from "react";
import { Josefin_Sans } from "next/font/google";

const josefin = Josefin_Sans({ 
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"]
});

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";

// 1. Definisikan tipe data Props agar TypeScript di page.tsx tidak eror lagi
interface EskulProps {
  dataEkskul: any[];
  onSelect: (ekskul: any) => void;
}

export  function Eskul({ dataEkskul, onSelect }: EskulProps) {
  // State untuk menangani pencarian
  const [searchQuery, setSearchQuery] = useState("");

  // 2. Filter data dari Strapi berdasarkan apa yang diketik user di Search Bar
  const filteredEskul = dataEkskul.filter((eskul) => {
    const nama = eskul.nama_ekskul || "";
    return nama.toLowerCase().includes(searchQuery.toLowerCase());
  });

  return (
    <section 
      id="ekskul"
      className={`relative w-full min-h-screen bg-[#104f79] text-slate-800 ${josefin.className}`}>
      {/* GAMBAR BACKGROUND & GRADASI LAPISAN */}
      <div className="relative w-full py-16 px-6 overflow-hidden"></div>
      <div className="absolute inset-0 z-0">
        <div 
          className="w-full h-full bg-cover bg-center opacity-40 filter blur-[1px]"
          style={{ backgroundImage: `url('/images/bg-katalog.jpeg')` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900/40 via-[#104f79]/70 to-[#104f79] z-10" />
  
      </div>

      {/* KONTEN UTAMA */}
      <div className="relative z-20 max-w-6xl mx-auto flex flex-col items-center">
        {/* 🔍 STICKY SEARCH BAR: Sekarang fungsinya udah aktif! */}
        
       <div className="w-full max-w-2xl mb-10">
         <div className="flex items-center gap-3 bg-white/95 backdrop-blur-md px-6 py-3 rounded-full shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-slate-100">
              <input
              type="text" 
              placeholder="Cari Eskul..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)} // Mengupdate query pencarian
              className="w-full bg-transparent outline-none text-slate-700 placeholder-slate-400 text-lg font-normal font-sans"
            />
            <button className="p-2 bg-white rounded-full shadow-md hover:scale-105 transition active:scale-95 text-blue-600">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.602 10.602z" />
              </svg>
            </button>
          </div>
        </div>

        {/* JUDUL UTAMA KATALOG */}
        <div className="text-center text-white mb-16 space-y-1">
          <h2 className="text-5xl md:text-[64px] font-bold tracking-tight leading-none [text-shadow:-4px_4px_8px_rgba(0,0,0,0.4)]">
            Katalog
          </h2>
          <h3 className="text-4xl md:text-[54px] font-bold tracking-tight leading-tight [text-shadow:-4px_4px_8px_rgba(0,0,0,0.4)]">
            Gridas Ekstrakulikuler
          </h3>
        </div>

        {/* 3. GRID CARD EKSKUL (Mapping Data dari Strapi) */}
        
        <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-8 items-center justify-center px-4">
          {filteredEskul.map((eskul) => {
            // Mapping field berdasarkan nama komponen di Strapi v5
            const namaEskul = eskul.nama_ekskul || eskul.attributes?.nama_ekskul || "";
            const deskripsiSingkat = eskul.deskripsi_singkat || eskul.attributes?.deskripsi_singkat || "Belum ada deskripsi singkat.";

            const fotoData = eskul.foto_utama || eskul.attributes?.foto_utama;
            const photoUrl = fotoData?.url || fotoData?.data?.attributes?.url;

            // Cek jika foto_utama ada di Strapi, kalau ada gabungkan dengan url localhost Strapi
            const imageSrc = eskul.foto_utama 
              ? (photoUrl.startsWith("http") ? photoUrl : `${STRAPI_URL}${photoUrl}`) 
              : "/images/coding.jpeg"; // Fallback gambar default

            return (
              <div 
                key={eskul.documentId || eskul.id} 
                className="bg-white rounded-[32px] p-5 shadow-[0_15px_40px_rgba(0,0,0,0.15)] flex flex-col gap-4 transform hover:-translate-y-2 transition duration-300 border border-slate-50"
              >
                {/* Tempat Gambar Miniatur Eskul */}
                <div className="w-full h-44 rounded-[24px] overflow-hidden bg-slate-100">
                  <img 
                    src={imageSrc} 
                    alt={namaEskul} 
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.src = "/images/bg-katalog.jpeg";
                    }}
                  />
                </div>

                {/* Teks Nama & Deskripsi */}
                <div className="px-1 space-y-1">
                  <h4 className="text-2xl font-bold text-slate-900 tracking-tight">
                    {namaEskul}
                  </h4>
                  <p className="text-sm text-slate-400 font-normal line-clamp-2">
                    {deskripsiSingkat}
                  </p>
                </div>

                {/* Tombol Detail */}
                <div className="pt-2">
                  <button
                    onClick={() => {
                      if (typeof onSelect === 'function') {
                        onSelect(eskul); // Melempar data eskul utuh ke DetailEskulCard
                      }
                    }}
                    className="w-full bg-sky-800 hover:bg-[#006aa7] text-white font-bold py-3 rounded-2xl transition duration-200 shadow-md text-base tracking-wide transform active:scale-[0.98]"
                  >
                    Detail
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
    </section>
  );
}