"use client";
import { Josefin_Sans } from "next/font/google";
import { useSearchParams } from "next/navigation";

const josefin = Josefin_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"]
});
import { useState } from "react";

interface PendaftaranFormProps {
  onSuccess?: () => void;
}

export function PendaftaranForm({ onSuccess }: { onSuccess?: () => void }) {

  const searchParams = useSearchParams();
  const ekskulId = searchParams.get("ekskulId");
  const [formData, setFormData] = useState({
    nama: "",
    kelas: "",
    no_telp: "",
    jurusan: "",
  });

  const [isSuccess, setIsSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleKembaliKeKatalog = () => {
    setIsSuccess(false);
    if (onSuccess) {
      onSuccess();
    }
  };


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const BASE_URL = process.env.NEXT_PUBLIC_STRAPI_URL || "https://cn17l1l4-1337.asse.devtunnels.ms";

    try {
      const res = await fetch(`${BASE_URL}/api/pendaftarans`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          data: {
            nama: formData.nama,
            kelas: formData.kelas,
            no_telp: formData.no_telp,
            ekskuls: ekskulId ? [ekskulId] : []
          },
        }),
      });

      if (res.ok) {
        setIsSuccess(true);
        setFormData({ nama: "", kelas: "", no_telp: "", jurusan: "" });
      } else {
        alert("Gagal mengirim pendaftaran, coba lagi!");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Terjadi kesalahan koneksi ke server.");
    } finally {
      setLoading(false);
    }
  };
  return (
    /* SEAKAN SATU HALAMAN PENUH DESKTOP */
    <section className="w-full min-h-screen bg-cover bg-center relative flex flex-col justify-center items-center px-6 md:px-16"
      style={{ backgroundImage: `url('/images/bg-daftar.jpeg')` }}>
      {/* Overlay Biru Transparan Penuh */}
 <div className="absolute inset-0 z-10 bg-gradient-to-r from-[#005893]/80 via-[#005893]/60 via-[45%] to-transparent to-[80%] md:via-[50%]" />
      <div className="relative z-10 w-full max-w-2xl flex flex-col justify-center h-full space-y-6 py-12">



        {/* INPUT FORM & JUDUL (Semua Sejajar Menggunakan Grid yang Sama) */}
        {isSuccess ? (
          /* STATUS SUKSES */
          <div className="text-center py-8 space-y-4 bg-white/10 backdrop-blur-sm rounded-2xl p-6">
            <div className="w-14 h-14 bg-emerald-500 rounded-full flex items-center justify-center mx-auto shadow-lg">
              <span className="text-white text-xl font-bold">✓</span>
            </div>
            <h3 className="text-lg font-bold text-white">Pendaftaran Berhasil!</h3>
            <button
              onClick={() => {
                setIsSuccess(false);
                if (onSuccess) onSuccess();
              }}
              className="px-10 py-2.5 bg-green-500 hover:bg-green-700 active:bg-[#056b2d] active:scale-95 text-white rounded-lg text-sm font-bold transition-all duration-200">
              Oke
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5 w-full">

         {/* JUDUL FORM */}
<div className="mb-6">
  <h1 className="text-3xl sm:text-4xl md:text-[50px] font-bold tracking-tight text-white whitespace-nowrap [text-shadow:-12px_4px_4px_rgba(0,0,0,0.25)]">
    Form Pendaftaran
  </h1>
</div>

{/* 1. Nama */}
<div className="grid grid-cols-1 sm:grid-cols-4 items-start sm:items-center gap-2 sm:gap-4">
  <label className="text-2xl font-bold tracking-tight leading-tight text-white [text-shadow:-12px_4px_4px_rgba(0,0,0,0.25)]">
    Nama
  </label>
  <input
    type="text"
    required
    value={formData.nama}
    onChange={(e) => setFormData({ ...formData, nama: e.target.value })}
    className="col-span-1 sm:col-span-3 px-4 py-2 bg-white text-gray-800 rounded-[2px] text-sm focus:outline-none font-medium shadow-md"/>
</div>

           {/* 2. Kelas */}
<div className="grid grid-cols-1 sm:grid-cols-4 items-start sm:items-center gap-2 sm:gap-4">
  <label className="text-2xl font-bold tracking-tight leading-tight text-white [text-shadow:-12px_4px_4px_rgba(0,0,0,0.25)]">
    Kelas
  </label>
  
  {/* Pembungkus relatif */}
  <div className="col-span-1 sm:col-span-3 relative flex items-center">
    <select
      required
      value={formData.kelas}
      onChange={(e) => setFormData({ ...formData, kelas: e.target.value })}
      className="w-full px-4 py-2 bg-white text-gray-800 rounded-[2px] text-sm focus:outline-none font-medium shadow-md cursor-pointer appearance-none pr-12">
      <option value="" disabled hidden></option>
      <option value="X">Kelas X</option>
      <option value="XI">Kelas XI</option>
      <option value="XII">Kelas XII</option>
    </select>

    {/* KOTAK PUTIH TOMBOL DROPDOWN (Sama persis seperti di gambar Figma) */}
    <div className="pointer-events-none absolute right-1 w-8 h-8 bg-white rounded-md shadow-md flex items-center justify-center">
      <div className="w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[8px] border-t-[#0f4c81]"></div>
    </div>
  </div>
</div>


            {/* 3. Jurusan */}
<div className="grid grid-cols-1 sm:grid-cols-4 items-start sm:items-center gap-2 sm:gap-4">
  <label className="text-2xl font-bold tracking-tight leading-tight text-white [text-shadow:-12px_4px_4px_rgba(0,0,0,0.25)]">
    Jurusan
  </label>
  
  <div className="col-span-1 sm:col-span-3 relative flex items-center">
    <select
      required
      value={formData.jurusan}
      onChange={(e) => setFormData({ ...formData, jurusan: e.target.value })}
      className="w-full px-4 py-2 bg-white text-gray-800 rounded-[2px] text-sm focus:outline-none font-medium shadow-md cursor-pointer appearance-none pr-12">
      <option value="" disabled hidden></option>
      <option value="PPLG">PPLG</option>
      <option value="PM">PM</option>
      <option value="AKL">AKL</option>
      <option value="MPLB">MPLB</option>
    </select>

    {/* Kotak Putih Tombol Dropdown */}
    <div className="pointer-events-none absolute right-1 w-8 h-8 bg-white rounded-md shadow-md flex items-center justify-center">
      <div className="w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[8px] border-t-[#0f4c81]"></div>
    </div>
  </div>
</div>

{/* 4. No.Telp */}
<div className="grid grid-cols-1 sm:grid-cols-4 items-start sm:items-center gap-2 sm:gap-4">
  <label className="text-2xl font-bold tracking-tight leading-tight text-white [text-shadow:-12px_4px_4px_rgba(0,0,0,0.25)]">
    No Telp
  </label>
  <input
    type="tel"
    required
    value={formData.no_telp}
    onChange={(e) => setFormData({ ...formData, no_telp: e.target.value })}
    className="col-span-1 sm:col-span-3 px-4 py-2 bg-white text-gray-800 rounded-[2px] text-sm focus:outline-none font-medium shadow-md"/>
</div>

           {/* TOMBOL DAFTAR */}
<div className="grid grid-cols-1 sm:grid-cols-4 items-center gap-2 sm:gap-4 pt-4">
  <div className="sm:col-start-2 sm:col-span-3">
    <button
                  type="submit"
                  className="w-full sm:w-auto px-10 py-2 bg-white hover:bg-blue-600 active:bg-slate-200 active:scale-95 text-[#16357a] font-bold tracking-tight leading-tight text-sm rounded-[2px] transition-all duration-200 shadow-md tracking-wider">
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