"use client";

import { useState } from "react";
import { Josefin_Sans } from "next/font/google";
import { useSearchParams } from "next/navigation";
import { SuccessModal } from "./SuccessModal";

const josefin = Josefin_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"]
});

interface PendaftaranFormProps {
  onSuccess?: () => void;
  ekskulId?: string | number;
}

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";

export function PendaftaranForm({ onSuccess, ekskulId: propEkskulId }: PendaftaranFormProps) {
  const searchParams = useSearchParams();

  const activeEkskulId = propEkskulId || searchParams.get("ekskulId");

  const [formData, setFormData] = useState({
    nama: "",
    kelas: "",
    jurusan: "",
    no_telp: "",
  });

  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Mengambil ID dari prop atau query URL
    const targetEkskul = propEkskulId || searchParams.get("ekskulId");

    // Jika targetEkskul berupa object, ambil ID/documentId-nya
    let finalEkskulId = targetEkskul;
    if (typeof targetEkskul === "object" && targetEkskul !== null) {
      finalEkskulId = (targetEkskul as any).documentId || (targetEkskul as any).id;
    }

    try {
      // 1. Coba kirim ID tunggal (untuk Single Relation Strapi)
      const payloadSingle = {
        data: {
          nama: formData.nama,
          kelas: formData.kelas,
          jurusan: formData.jurusan,
          no_telp: formData.no_telp,
          ekskul: finalEkskulId ? finalEkskulId : null,
        },
      };

      console.log("Mencoba POST Single Relation dengan ID:", finalEkskulId);

      let res = await fetch(`${STRAPI_URL}/api/pendaftarans`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payloadSingle),
      });

      // 2. Jika gagal/error karena Strapi minta Array (Multi Relation), kirim ulang sebagai Array
      if (!res.ok) {
        console.log("Single Relation gagal, mencoba Array Relation...");
        const payloadArray = {
          data: {
            ...payloadSingle.data,
            ekskul: finalEkskulId ? [finalEkskulId] : [],
          },
        };

        res = await fetch(`${STRAPI_URL}/api/pendaftarans`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payloadArray),
        });
      }

      if (res.ok) {
        setShowSuccessModal(true);
        setFormData({ nama: "", kelas: "", jurusan: "", no_telp: "" });
      } else {
        const errResult = await res.json();
        console.error("Detail Error Strapi:", errResult);
        setShowSuccessModal(true);
      }
    } catch (err) {
      console.error("Network Error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleCloseSuccess = () => {
    setShowSuccessModal(false);
    if (onSuccess) {
      onSuccess();
    }
  };

  return (
    <div
      className={`fixed inset-0 z-50 w-full h-full overflow-y-auto bg-cover bg-center bg-no-repeat flex items-center justify-center ${josefin.className}`}
      style={{ backgroundImage: `url('/images/bg-daftar.jpeg')` }}
    >
      {/* Gradasi Biru Ke Transparan */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#005893]/90 via-[#005893]/65 to-transparent pointer-events-none" />

      {/* Container Utama Tepat di Tengah (center) */}
      <div className="relative z-10 w-full max-w-xl px-6 py-10 flex flex-col justify-center items-center">
        <form onSubmit={handleSubmit} className="w-full space-y-5">

          {/* JUDUL FORM DENGAN SHADOW */}
          <div className="grid grid-cols-1 sm:grid-cols-4 items-center gap-2 sm:gap-4 mb-3">
            <div className="sm:col-start-2 sm:col-span-3">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white [text-shadow:-4px_4px_6px_rgba(0,0,0,0.4)] whitespace-nowrap">
                Form Pendaftaran
              </h1>
            </div>
          </div>

          {/* 1. NAMA */}
          <div className="grid grid-cols-1 sm:grid-cols-4 items-start sm:items-center gap-2 sm:gap-4">
            <label className="text-base font-bold text-white [text-shadow:-2px_2px_4px_rgba(0,0,0,0.4)]">Nama</label>
            <input
              type="text"
              required
              value={formData.nama}
              onChange={(e) => setFormData({ ...formData, nama: e.target.value })}
              className="col-span-1 sm:col-span-3 px-4 py-2 bg-white text-gray-800 rounded-none text-sm focus:outline-none font-semibold shadow-md"
            />
          </div>

          {/* 2. KELAS */}
          <div className="grid grid-cols-1 sm:grid-cols-4 items-start sm:items-center gap-2 sm:gap-4">
            <label className="text-base font-bold text-white [text-shadow:-2px_2px_4px_rgba(0,0,0,0.4)]">Kelas</label>
            <select
              required
              value={formData.kelas}
              onChange={(e) => setFormData({ ...formData, kelas: e.target.value })}
              className="col-span-1 sm:col-span-3 px-4 py-2 bg-white text-gray-800 rounded-none text-sm focus:outline-none font-semibold shadow-md cursor-pointer"
            >
              <option value="" disabled>Pilih Kelas</option>
              <option value="X">Kelas X</option>
              <option value="XI">Kelas XI</option>
              <option value="XII">Kelas XII</option>
            </select>
          </div>

          {/* 3. JURUSAN */}
          <div className="grid grid-cols-1 sm:grid-cols-4 items-start sm:items-center gap-2 sm:gap-4">
            <label className="text-base font-bold text-white [text-shadow:-2px_2px_4px_rgba(0,0,0,0.4)]">Jurusan</label>
            <select
              required
              value={formData.jurusan}
              onChange={(e) => setFormData({ ...formData, jurusan: e.target.value })}
              className="col-span-1 sm:col-span-3 px-4 py-2 bg-white text-gray-800 rounded-none text-sm focus:outline-none font-semibold shadow-md cursor-pointer"
            >
              <option value="" disabled>Pilih Jurusan</option>
              <option value="PPLG">PPLG</option>
              <option value="PM">PM</option>
              <option value="AKL">AKL</option>
              <option value="MPLB">MPLB</option>
            </select>
          </div>

          {/* 4. NO TELP */}
          <div className="grid grid-cols-1 sm:grid-cols-4 items-start sm:items-center gap-2 sm:gap-4">
            <label className="text-base font-bold text-white [text-shadow:-2px_2px_4px_rgba(0,0,0,0.4)]">No Telp</label>
            <input
              type="tel"
              required
              value={formData.no_telp}
              onChange={(e) => setFormData({ ...formData, no_telp: e.target.value })}
              className="col-span-1 sm:col-span-3 px-4 py-2 bg-white text-gray-800 rounded-none text-sm focus:outline-none font-semibold shadow-md"
            />
          </div>

          {/* TOMBOL DAFTAR */}
          <div className="grid grid-cols-1 sm:grid-cols-4 items-center gap-2 sm:gap-4 pt-3">
            <div className="sm:col-start-2 sm:col-span-3">
              <button
                type="submit"
                disabled={loading}
                className="px-8 py-2 bg-white hover:bg-slate-100 active:bg-slate-200 text-[#005893] font-extrabold text-sm rounded-none transition-all duration-200 shadow-md cursor-pointer"
              >
                {loading ? "Mengirim..." : "Daftar"}
              </button>
            </div>
          </div>
        </form>
      </div>

      <SuccessModal
        isOpen={showSuccessModal}
        onClose={handleCloseSuccess}
      />
    </div>
  );
}