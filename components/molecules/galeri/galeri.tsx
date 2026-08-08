"use client";

import { useState, useEffect } from "react";
import { Josefin_Sans } from "next/font/google";

const josefin = Josefin_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";

interface GaleriItem {
  id: number;
  documentId?: string;
  judul_kegiatan: string;
  nama_ekskul: string;
  imageSrc: string;
}

export function Galeri() {
  const [galeriData, setGaleriData] = useState<GaleriItem[]>([]);
  const [selectedEkskul, setSelectedEkskul] = useState<string>("Semua");
  const [activeItem, setActiveItem] = useState<GaleriItem | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Helper untuk memproses URL foto dari Strapi secara fleksibel
  const getStrapiMediaUrl = (media: any) => {
    if (!media) return null;
    const item = Array.isArray(media) ? media[0] : media;
    const rawUrl =
      item?.url ||
      item?.attributes?.url ||
      item?.data?.attributes?.url ||
      item?.data?.url;

    if (!rawUrl) return null;
    if (rawUrl.startsWith("http://") || rawUrl.startsWith("https://")) return rawUrl;
    return `${STRAPI_URL}${rawUrl}`;
  };

  // FETCH DATA DARI API STRAPI
  useEffect(() => {
    const fetchGaleri = async () => {
      try {
        const res = await fetch(`${STRAPI_URL}/api/galeris?populate=*`);
        const json = await res.json();
        const rawData = json.data || [];

        const formattedData: GaleriItem[] = rawData.map((item: any) => {
          const attrs = item.attributes || item;
          const fotoData = attrs.foto;
          const ekskulData = attrs.ekskul || attrs.ekskuls;

          // Ambil nama ekskul dari relasi
          const namaEkskul =
            ekskulData?.nama_ekskul ||
            ekskulData?.attributes?.nama_ekskul ||
            (Array.isArray(ekskulData) ? ekskulData[0]?.nama_ekskul || ekskulData[0]?.attributes?.nama_ekskul : null) ||
            "Lainnya";

          const imageSrc =
            getStrapiMediaUrl(fotoData) || "/images/bg-katalog.jpeg";

          return {
            id: item.id || item.documentId,
            judul_kegiatan: attrs.judul_kegiatan || "Tanpa Judul",
            nama_ekskul: namaEkskul,
            imageSrc: imageSrc,
          };
        });

        setGaleriData(formattedData);
      } catch (error) {
        console.error("Gagal mengambil data galeri dari Strapi:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchGaleri();
  }, []);

  // Filter daftar ekskul unik untuk tombol pilihan
  const listEkskul = [
    "Semua",
    ...Array.from(new Set(galeriData.map((g) => g.nama_ekskul))),
  ];

  // Data yang difilter sesuai tombol ekskul yang aktif
  const filteredItems =
    selectedEkskul === "Semua"
      ? galeriData
      : galeriData.filter((item) => item.nama_ekskul === selectedEkskul);

  return (
    <div className={`min-h-screen bg-white text-slate-800 flex flex-col justify-between ${josefin.className}`}>

      {/* 1. CONTAINER UTAMA */}
      <main className="max-w-7xl mx-auto px-6 py-10 flex-1 w-full">

        {/* HEADER GALERI */}
        <div className="mb-8 space-y-2">
          <h1 className="text-4xl md:text-5xl font-extrabold text-[#005187] tracking-tight">
            Galeri Ekskul
          </h1>
          <p className="text-slate-500 text-lg font-medium">
            Setiap kegiatan pasti ada kenangan nya . . .
          </p>
        </div>

        {/* FILTER PER KELOMPOK EKSKUL (POIN 3) */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none">
          {listEkskul.map((ekskul) => (
            <button
              key={ekskul}
              onClick={() => setSelectedEkskul(ekskul)}
              className={`px-5 py-2 rounded-full text-sm font-semibold transition-all whitespace-nowrap cursor-pointer ${selectedEkskul === ekskul
                ? "bg-[#005187] text-white shadow-md"
                : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
            >
              {ekskul}
            </button>
          ))}
        </div>

        {/* LOADING STATE */}
        {isLoading && (
          <div className="text-center py-20 text-slate-400 font-medium">
            Memuat galeri foto...
          </div>
        )}

        {/* GRID CARD GALERI */}
        {!isLoading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredItems.map((item) => (
              <div
                key={item.id}
                onClick={() => setActiveItem(item)}
                className="group cursor-pointer bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100 flex flex-col justify-between transform hover:-translate-y-1"
              >
                {/* Visual Foto */}
                <div className="relative w-full aspect-[4/3] overflow-hidden bg-slate-100">
                  <img
                    src={item.imageSrc}
                    alt={item.judul_kegiatan}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                  />
                  <span className="absolute top-3 left-3 bg-[#005187]/90 text-white text-xs px-3 py-1 rounded-full font-semibold backdrop-blur-sm">
                    {item.nama_ekskul}
                  </span>
                </div>

                {/* Judul Kegiatan (Keterangan) */}
                <div className="p-4 bg-white text-center">
                  <p className="text-sm font-semibold text-slate-700 line-clamp-2">
                    {item.judul_kegiatan}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* KONDISI JIKA FOTO KOSONG */}
        {!isLoading && filteredItems.length === 0 && (
          <div className="text-center py-16 text-slate-400">
            Belum ada foto galeri untuk ekskul ini.
          </div>
        )}
      </main>

      {/* 2. POP UP / MODAL DETAIL FOTO (POIN 2) */}
      {activeItem && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm transition-all"
          onClick={() => setActiveItem(null)}
        >
          <div
            className="bg-white rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl transform transition-all relative animate-in fade-in zoom-in duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Tombol Tutup Modal */}
            <button
              onClick={() => setActiveItem(null)}
              className="absolute top-4 right-4 w-9 h-9 bg-black/50 hover:bg-black/80 text-white rounded-full flex items-center justify-center z-10 transition cursor-pointer"
            >
              ✕
            </button>

            {/* Gambar Besar Modal */}
            <div className="w-full max-h-[70vh] bg-black flex items-center justify-center overflow-hidden">
              <img
                src={activeItem.imageSrc}
                alt={activeItem.judul_kegiatan}
                className="w-full h-full object-contain"
              />
            </div>

            {/* Informasi Detail */}
            <div className="p-6 space-y-2">
              <div className="inline-block bg-[#005187] text-white text-xs font-bold px-3 py-1 rounded-md">
                {activeItem.nama_ekskul}
              </div>
              <h3 className="text-xl font-bold text-slate-900">
                {activeItem.judul_kegiatan}
              </h3>
            </div>
          </div>
        </div>
      )}

      {/* 3. FOOTER MINIMALIS FIGMA (POIN 4) */}
      <footer className="w-full bg-white border-t border-slate-200 py-6 px-6 md:px-16 mt-12">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-sm">
          <p className="font-bold text-[#005187]">
            SMK NEGERI 2 SUMEDANG{" "}
            <span className="font-normal text-slate-400 border-l border-slate-300 ml-2 pl-2">
              All Rights Reserved
            </span>
          </p>
        </div>
      </footer>

    </div>
  );
}