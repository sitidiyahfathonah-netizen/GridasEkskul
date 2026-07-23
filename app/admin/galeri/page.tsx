"use client";
import Image from "next/image";
import { useState } from "react";
import Link from "next/link";

// Tipe data untuk item galeri
interface GaleriItem {
  id: number;
  nama: string;
  image: string;
}

export default function AdminGaleriPage() {
  // State data galeri (dummy awal sesuai Figma)
  const [galeriList, setGaleriList] = useState<GaleriItem[]>([
    { id: 1, nama: "English Club", image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=500" },
    { id: 2, nama: "Tatarias", image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?q=80&w=500" },
    { id: 3, nama: "Pramuka", image: "https://images.unsplash.com/photo-1526976668912-1a811878dd37?q=80&w=500" },
    { id: 4, nama: "Karate", image: "https://images.unsplash.com/photo-1555597673-b21d5c935865?q=80&w=500" },
  ]);

  // State Modal Pop-up Tambah
  const [showModal, setShowModal] = useState(false);
  const [namaEskul, setNamaEskul] = useState("");
  const [deskripsi, setDeskripsi] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  // Fungsi simpan foto baru
  const handleSimpan = (e: React.FormEvent) => {
    e.preventDefault();
    if (!namaEskul) return alert("Nama Ekstrakurikuler wajib diisi!");

    const newItem: GaleriItem = {
      id: Date.now(),
      nama: namaEskul,
      // Menggunakan URL preview jika ada file, atau image default
      image: selectedFile
        ? URL.createObjectURL(selectedFile)
        : "https://images.unsplash.com/photo-1511632765486-a01980e01a18?q=80&w=500",
    };

    setGaleriList([...galeriList, newItem]);
    
    // Reset form & tutup modal
    setNamaEskul("");
    setDeskripsi("");
    setSelectedFile(null);
    setShowModal(false);
  };

  return (
    <div className="flex w-full min-h-screen bg-white">
      {/* 1. SIDEBAR KIRI */}
      <aside className="w-72 bg-[#00598A] text-white flex flex-col">
      
          {/* Logo SMKN 2 Sumedang */}
          <div className="flex justify-center py-8 border-b border-white/20">
              <Image
                          src="/images/logo skolah.jpeg"
                          alt="Logo"
                          width={110}
                          height={110}/>
            </div>
             <nav className="flex-1 mt-8">

            <Link href="/admin/dashboard" className="block px-10 py-4 bg-white/10 text-sky-900">
            Eskul
          </Link>

          <Link href="/admin/galeri" className="block px-10 py-4 hover:bg-white/10 font-semibold">
            Galeri
          </Link>

          <Link href="/admin/pendaftaran" className="block px-10 py-4 hover:bg-white/10  text-sky-900">
            Riwayat Pendaftaran
          </Link>
           </nav>
      </aside>

      {/* 2. KONTEN UTAMA */}
      <main className="flex-1 flex flex-col">
        {/* Header Biru & Tombol Tambah */}
       <header className="h-20 bg-[#00598A] flex items-center justify-between px-10">
          <h1 className="text-3xl font-bold text-white tracking-wide">
            GALERI EKSTRAKULIKULER
          </h1>
          <button className="bg-[#32D74B] hover:bg-green-500 text-white font-bold px-8 py-3 rounded-xl">
            Tambah
          </button>
        </header>

        {/* Grid Kartu Foto Galeri */}
        <div className="p-8 overflow-auto"></div>
        <div className="grid grid-cols-2 gap-5 p-6">
          {galeriList.map((item) => (
            <div
              key={item.id}
             className="relative group rounded-xl overflow-hidden shadow-md h-48 w-full"
            >
              <img
                  src={item.image}
                  alt={item.nama}
                className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
              />
              {/* Overlay Nama di Bawah Foto (Sesuai Figma) */}
              <div className="absolute bottom-3 left-4 text-white font-semibold text-lg drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                   {item.nama}
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* 3. POP-UP / MODAL TAMBAH FOTO (Sesuai Figma Pop-up Tambah) */}
      {showModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white text-slate-800 w-full max-w-md rounded-2xl p-6 shadow-2xl relative">
            <h2 className="text-xl font-bold mb-1 border-b pb-2 text-slate-900">
              Tambah Foto Ekskul
            </h2>
            <p className="text-xs text-slate-500 mb-4">Tambah foto untuk galeri</p>

            <form onSubmit={handleSimpan} className="space-y-4">
              {/* Input Foto File */}
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Foto</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
                  className="w-full text-xs text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-slate-100 file:text-slate-700 hover:file:bg-slate-200 cursor-pointer border border-slate-300 rounded-lg p-1"
                />
              </div>

              {/* Input Nama Ekstrakurikuler */}
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">
                  Nama Ekstrakurikuler
                </label>
                <input
                  type="text"
                  placeholder="Masukan Nama Ekstrakurikuler"
                  value={namaEskul}
                  onChange={(e) => setNamaEskul(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-800"
                  required
                />
              </div>

              {/* Input Deskripsi */}
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Deskripsi</label>
                <textarea
                  rows={3}
                  placeholder="Masukan deskripsi ekstrakurikuler"
                  value={deskripsi}
                  onChange={(e) => setDeskripsi(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-800 resize-none"
                ></textarea>
              </div>

              {/* Tombol Simpan & Batal */}
              <div className="flex gap-3 pt-2">
                <button
                  type="submit"
                  className="flex-1 bg-[#00a65a] hover:bg-[#008d4c] text-white font-bold py-2 rounded-lg text-sm transition shadow"
                >
                  Simpan
                </button>
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="flex-1 bg-[#dd4b39] hover:bg-[#c9302c] text-white font-bold py-2 rounded-lg text-sm transition shadow"
                >
                  Batal
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}