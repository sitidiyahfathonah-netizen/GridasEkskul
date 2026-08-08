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

  // Helper memproses URL foto dari Strapi
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

  // FETCH DATA GALERI DARI STRAPI
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
          const rawJudul = attrs.judul_kegiatan || "Tanpa Judul";

          // 1. Ambil nama ekskul dari relation Strapi (memeriksa semua kemungkinan hirarki JSON Strapi)
          let namaEkskul =
            ekskulData?.nama_ekskul ||
            ekskulData?.attributes?.nama_ekskul ||
            ekskulData?.data?.attributes?.nama_ekskul ||
            ekskulData?.data?.nama_ekskul ||
            (Array.isArray(ekskulData?.data) ? ekskulData.data[0]?.attributes?.nama_ekskul : null) ||
            (Array.isArray(ekskulData) ? ekskulData[0]?.nama_ekskul || ekskulData[0]?.attributes?.nama_ekskul : null);

          // 2. Jika relasi Strapi tidak terhubung, ekstrak dari judul_kegiatan (contoh: "Tata Busana - Proses sketsa...")
          if ((!namaEkskul || namaEkskul === "Lainnya" || namaEkskul === "Galeri Ekskul") && rawJudul.includes("-")) {
            const parts = rawJudul.split("-");
            if (parts.length > 0 && parts[0].trim().length > 0) {
              namaEkskul = parts[0].trim();
            }
          }

          // Fallback terakhir jika benar-benar tidak terdeteksi
          if (!namaEkskul) {
            namaEkskul = "Lainnya";
          }

          const imageSrc =
            getStrapiMediaUrl(fotoData) || "/images/bg-katalog.jpeg";

          return {
            id: item.id || item.documentId,
            judul_kegiatan: rawJudul,
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

  // Filter pilihan nama ekskul untuk tombol pills
  const listEkskulFilter = [
    "Semua",
    ...Array.from(new Set(galeriData.map((g) => g.nama_ekskul))),
  ];

  // Menampilkan foto sesuai pilihan filter
  const filteredItems =
    selectedEkskul === "Semua"
      ? galeriData
      : galeriData.filter((item) => item.nama_ekskul === selectedEkskul);

  return (
    <div className={`min-h-screen bg-white text-slate-800 flex flex-col justify-between ${josefin.className}`}>

      {/* CONTAINER UTAMA */}
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

        {/* FILTER PILLS */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none">
          {listEkskulFilter.map((ekskul) => (
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

        {/* GRID DAFTAR FOTO KEGIATAN */}
        {!isLoading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredItems.map((item) => (
              <div
                key={item.id}
                onClick={() => setActiveItem(item)}
                className="group cursor-pointer relative h-52 w-full rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 bg-slate-100"
              >
                {/* Visual Foto */}
                <img
                  src={item.imageSrc}
                  alt={item.judul_kegiatan}
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                />

                {/* Overlay Gradient Gelap */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                {/* Nama Ekskul Melayang di Atas Foto */}
                <div className="absolute bottom-4 left-5 right-5 z-10">
                  <h3 className="text-white font-bold text-lg drop-shadow-md">
                    {item.nama_ekskul}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* JIKA FOTO KOSONG */}
        {!isLoading && filteredItems.length === 0 && (
          <div className="text-center py-16 text-slate-400">
            Belum ada foto galeri untuk ekskul ini.
          </div>
        )}
      </main>

      {/* POP-UP MODAL DETAIL FOTO */}
      {activeItem && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm transition-all"
          onClick={() => setActiveItem(null)}
        >
          <div
            className="bg-white rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl transform transition-all relative animate-in fade-in zoom-in duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header Modal */}
            <div className="p-5 border-b border-slate-100 flex justify-between items-center bg-slate-50">
              <div>
                <h2 className="text-xl font-bold text-[#005187]">
                  {activeItem.nama_ekskul}
                </h2>
                <p className="text-xs text-slate-500">
                  Dokumentasi kegiatan
                </p>
              </div>
              <button
                onClick={() => setActiveItem(null)}
                className="w-8 h-8 rounded-full bg-slate-200 hover:bg-slate-300 text-slate-700 font-bold flex items-center justify-center transition cursor-pointer"
              >
                ✕
              </button>
            </div>

            {/* Content Modal */}
            <div className="p-6 space-y-4">
              <div className="w-full h-64 bg-slate-100 rounded-2xl overflow-hidden shadow-inner">
                <img
                  src={activeItem.imageSrc}
                  alt={activeItem.judul_kegiatan}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Keterangan Kegiatan */}
              <div className="text-center bg-slate-50 p-4 rounded-xl border border-slate-100">
                <p className="text-sm font-semibold text-slate-700">
                  {activeItem.judul_kegiatan}
                </p>
              </div>

            </div>
          </div>
        </div>
      )}

      {/* FOOTER */}
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