"use client";

import { useState } from "react";

export default function Pendaftaran() {
  const [formData, setFormData] = useState({
    nama: "",
    kelas: "",
    noTelp: "",
    jurusan: "",
  });

  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Data Pendaftar:", formData);
    setIsSuccess(true);
    setFormData({ nama: "", kelas: "", noTelp: "", jurusan: "" });
  };

  return (
    /* SEAKAN SATU HALAMAN PENUH DESKTOP */
    <section className="w-full min-h-screen bg-cover bg-center relative flex flex-col justify-center items-center px-6 md:px-16"
      style={{ backgroundImage: `url('/images/bg-katalog.jpeg')` }}
    >
      {/* Overlay Biru Transparan Penuh */}
      <div className="absolute inset-0 bg-[#16357a]/90 z-0" />

      <div className="relative z-10 w-full max-w-2xl flex flex-col justify-center h-full space-y-6 py-12">
        
        {/* INPUT FORM & JUDUL (Semua Sejajar Menggunakan Grid yang Sama) */}
        {isSuccess ? (
          /* STATUS SUKSES */
          <div className="text-center py-8 space-y-4 bg-white/10 backdrop-blur-sm rounded-none p-6">
            <div className="w-14 h-14 bg-emerald-500 rounded-full flex items-center justify-center mx-auto shadow-lg">
              <span className="text-white text-xl font-bold">✓</span>
            </div>
            <h3 className="text-lg font-bold text-white">Pendaftaran Berhasil!</h3>
            <button 
              onClick={() => setIsSuccess(false)}
              className="px-8 py-1.5 bg-white text-blue-900 rounded-none text-xs font-bold transition hover:bg-slate-100"
            >
              Kembali
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5 w-full">
            
            {/* JUDUL FORM: Sekarang pakai grid col-4 dan col-span-3 biar lurus dengan textfield */}
            <div className="grid grid-cols-4 items-center gap-4 mb-4">
              <div className="col-start-2 col-span-3">
                <h2 className="text-3xl md:text-4xl font-bold tracking-wide text-white">
                  Form Pendaftaran
                </h2>
              </div>
            </div>

            {/* 1. Nama */}
            <div className="grid grid-cols-4 items-center gap-4">
              <label className="text-base font-medium text-white">Nama</label>
              <input 
                type="text"
                required
                value={formData.nama}
                onChange={(e) => setFormData({ ...formData, nama: e.target.value })}
                className="col-span-3 px-4 py-2 bg-white text-gray-800 rounded-none text-sm focus:outline-none font-medium shadow-md"
              />
            </div>

            {/* 2. Kelas */}
            <div className="grid grid-cols-4 items-center gap-4">
              <label className="text-base font-medium text-white">Kelas</label>
              <select 
                required
                value={formData.kelas}
                onChange={(e) => setFormData({ ...formData, kelas: e.target.value })}
                className="col-span-3 px-4 py-2 bg-white text-gray-800 rounded-none text-sm focus:outline-none font-medium shadow-md cursor-pointer"
              >
                <option value="" disabled>Pilih Kelas</option>
                <option value="X">Kelas X</option>
                <option value="XI">Kelas XI</option>
                <option value="XII">Kelas XII</option>
              </select>
            </div>

            {/* 3. No.Telp */}
            <div className="grid grid-cols-4 items-center gap-4">
              <label className="text-base font-medium text-white">No.Telp</label>
              <input 
                type="tel"
                required
                value={formData.noTelp}
                onChange={(e) => setFormData({ ...formData, noTelp: e.target.value })}
                className="col-span-3 px-4 py-2 bg-white text-gray-800 rounded-none text-sm focus:outline-none font-medium shadow-md"
              />
            </div>

            {/* 4. Jurusan */}
            <div className="grid grid-cols-4 items-center gap-4">
              <label className="text-base font-medium text-white">Jurusan</label>
              <select 
                required
                value={formData.jurusan}
                onChange={(e) => setFormData({ ...formData, jurusan: e.target.value })}
                className="col-span-3 px-4 py-2 bg-white text-gray-800 rounded-none text-sm focus:outline-none font-medium shadow-md cursor-pointer"
              >
                <option value="" disabled>Pilih Jurusan</option>
                <option value="PPLG">PPLG</option>
                <option value="PM">PM</option>
                <option value="AKL">AKL</option>
                <option value="MPLB">MPLB</option>
              </select>
            </div>

            {/* TOMBOL DAFTAR KOTAK PUTIH (Lurus di bawah textfield) */}
            <div className="grid grid-cols-4 items-center gap-4 pt-4">
              <div className="col-start-2 col-span-3">
                <button 
                  type="submit"
                  className="px-10 py-2 bg-white hover:bg-slate-100 text-[#16357a] font-bold text-sm rounded-none transition duration-150 shadow-md tracking-wider"
                >
                  Daftar
                </button>
              </div>
            </div>

          </form>
        )}

      </div>
    </section>
  );
}