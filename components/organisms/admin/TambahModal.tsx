"use client";

import { useState } from "react";
import { EskulItem } from "@/app/admin/dashboard/page";
import { Josefin_Sans } from "next/font/google";

const josefin = Josefin_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"]
});


interface TambahModalProps {
  open: boolean;
  onClose: () => void;
  onSave: (newItem: Omit<EskulItem, "id">) => void;
}

export function TambahModal({
  open,
  onClose,
  onSave,
}: TambahModalProps) {
  const [preview, setPreview] = useState<string>("");
  const [nama, setNama] = useState("");
  const [hari, setHari] = useState("");
  const [jamMulai, setJamMulai] = useState("");
  const [jamSelesai, setJamSelesai] = useState("");
  const [deskripsi, setDeskripsi] = useState("");

  const handleSimpan = () => {
    if (!nama || !hari || !jamMulai || !jamSelesai || !deskripsi) {
      alert("Mohon lengkapi semua data.");
      return;
    }
    const jadwal_pelaksanaan = `${hari}\n${jamMulai} - ${jamSelesai}`;
    onSave({
      nama,
      deskripsi,
      jadwal_pelaksanaan,
      foto: preview || "/images/placeholder.jpeg", // Default image if none
    });
    // Reset form after saving
    setPreview("");
    setNama("");
    setHari("");
    setJamMulai("");
    setJamSelesai("");
    setDeskripsi("");
  };

  if (!open) return null;

  const handleImage = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];

    if (!file) return;

    setPreview(URL.createObjectURL(file));
  };

  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 ${josefin.className}`}>

      {/* Kotak Modal */}
      <div className="w-full max-w-md max-h-[90vh] overflow-y-auto rounded-2xl bg-white shadow-2xl">

        {/* Header */}
        <div className="px-6 pt-6">
          <h2 className="text-3xl font-bold text-slate-700">
            Tambah Ekstrakurikuler
          </h2>

          <p className="mt-1 text-sm text-gray-400">
            Tambah data ekstrakurikuler
          </p>
        </div>

        {/* Isi Modal */}
        <div className="space-y-4 px-6 py-5">

          {/* FOTO */}
          <div>
            <label className="text-sm text-gray-500">
              Foto
            </label>

            <input
              type="file"
              onChange={handleImage}
              className="mt-1 w-full rounded-lg border p-2" />

            {preview && (
              <img
                src={preview}
                alt="Preview"
                className="mt-3 h-32 rounded-xl object-cover" />
            )}
          </div>

          {/* NAMA */}
          <div>
            <label className="text-sm text-gray-500">
              Nama Ekstrakurikuler
            </label>

            <input
              type="text"
              value={nama}
              onChange={(e) => setNama(e.target.value)}
              placeholder="Masukkan nama ekstrakurikuler"
              className="mt-1 w-full rounded-lg border px-3 py-2" />
          </div>

          {/* HARI */}
          <div>
            <label className="text-sm text-gray-500">
              Hari
            </label>

            <select
              value={hari}
              onChange={(e) => setHari(e.target.value)}
              className="mt-1 w-full rounded-lg border px-3 py-2"
            >
              <option value="">Pilih Hari</option>
              <option value="Senin">Senin</option>
              <option value="Selasa">Selasa</option>
              <option value="Rabu">Rabu</option>
              <option value="Kamis">Kamis</option>
              <option value="Jumat">Jumat</option>
              <option value="Sabtu">Sabtu</option>
            </select>
          </div>

          {/* JAM */}
          <div className="grid grid-cols-2 gap-3">

            {/* Jam Mulai */}
            <div>
              <label className="text-sm text-gray-500">
                Jam Mulai
              </label>

              <input
                type="time"
                value={jamMulai}
                onChange={(e) => setJamMulai(e.target.value)}
                className="mt-1 w-full rounded-lg border px-3 py-2" />
            </div>

            {/* Jam Selesai */}
            <div>
              <label className="text-sm text-gray-500">
                Jam Selesai
              </label>

              <input
                type="time"
                value={jamSelesai}
                onChange={(e) => setJamSelesai(e.target.value)}
                className="mt-1 w-full rounded-lg border px-3 py-2" />
            </div>
          </div>

          {/* DESKRIPSI */}
          <div>
            <label className="text-sm text-gray-500">
              Deskripsi
            </label>

            <textarea
              rows={6}
              value={deskripsi}
              onChange={(e) => setDeskripsi(e.target.value)}
              placeholder="Masukkan deskripsi ekstrakurikuler..."
              className="mt-1 w-full resize-none rounded-lg border p-3" />
          </div>
        </div>

        {/* Tombol */}
        <div className={`flex gap-3 px-6 pb-6 ${josefin.className}`}>

          <button
            type="button"
            onClick={handleSimpan}
            className="flex-1 rounded-xl bg-[#08B84F] py-2 font-semibold text-white transition duration-200 hover:bg-[#079E43] active:bg-[#067D35]">
            Simpan
          </button>

          <button
            type="button"
            onClick={onClose}
            className="flex-1 rounded-xl border border-red-500 py-2 font-semibold text-red-500 transition hover:bg-red-50">
            Batal
          </button>

        </div>
      </div>
    </div>
  );
}