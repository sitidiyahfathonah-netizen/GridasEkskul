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
  onSave: (newItem: Omit<EskulItem, "id">, file: File | null) => void;
}

export function TambahModal({
  open,
  onClose,
  onSave,
}: TambahModalProps) {
  const [preview, setPreview] = useState<string>("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [nama, setNama] = useState("");
  const [hari, setHari] = useState("");
  const [jamMulai, setJamMulai] = useState("");
  const [jamSelesai, setJamSelesai] = useState("");
  const [deskripsi, setDeskripsi] = useState("");
  const [slug, setSlug] = useState("");
const [tempatPelaksanaan, setTempatPelaksanaan] = useState("");
const [deskripsiSingkat, setDeskripsiSingkat] = useState("");
const [kataAjakan, setKataAjakan] = useState("");
const [prestasi, setPrestasi] = useState("");

const [previewPrestasi, setPreviewPrestasi] = useState<string>("");
const [selectedPrestasiFile, setSelectedPrestasiFile] =
  useState<File | null>(null);

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
      foto: "", // Akan ditimpa oleh hasil upload API di DashboardPage
    }, selectedFile);
    // Reset form after saving
    setPreview("");
    setSelectedFile(null);
    setNama("");
    setHari("");
    setJamMulai("");
    setJamSelesai("");
    setDeskripsi("");
  };

  if (!open) return null;

  const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      const url = URL.createObjectURL(file);
      setPreview(url);
    }
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
            <label className="text-sm text-gray-500 mb-1 block">
              Foto
            </label>

            <div className="flex items-center w-full border border-gray-300 rounded-lg overflow-hidden bg-white">
              <label className="cursor-pointer bg-[#A1AAB4] hover:bg-[#8F98A2] text-gray-900 font-semibold text-sm px-5 py-2.5 transition-colors shrink-0">
                Pilih File
                <input
                  type="file"
                  onChange={handleImage}
                  className="hidden" />
              </label>
              <span className="px-4 text-sm text-gray-400 truncate w-full">
                {selectedFile ? selectedFile.name : "Tidak ada file yang dipilih"}
              </span>
            </div>

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

{/* SLUG */}
<div>
  <label className="text-sm text-gray-500">
    Slug
  </label>

  <input
    type="text"
    value={slug}
    onChange={(e) => setSlug(e.target.value)}
    placeholder="Ekskul-"
    className="mt-1 w-full rounded-lg border px-3 py-2"
  />
</div>

{/* TEMPAT PELAKSANAAN */}
<div>
  <label className="text-sm text-gray-500">
    Tempat Pelaksanaan
  </label>

  <input
    type="text"
    value={tempatPelaksanaan}
    onChange={(e) => setTempatPelaksanaan(e.target.value)}
    placeholder="Masukkan tempat pelaksanaan"
    className="mt-1 w-full rounded-lg border px-3 py-2"
  />
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

{/* DESKRIPSI SINGKAT */}
<div>
  <label className="text-sm text-gray-500">
    Deskripsi Singkat
  </label>

  <textarea
    rows={3}
    value={deskripsiSingkat}
    onChange={(e) => setDeskripsiSingkat(e.target.value)}
    placeholder="Masukkan deskripsi singkat ekstrakurikuler..."
    className="mt-1 w-full resize-none rounded-lg border p-3"
  />
</div>

{/* KATA AJAKAN */}
<div>
  <label className="text-sm text-gray-500">
    Kata Ajakan
  </label>

  <input
    type="text"
    value={kataAjakan}
    onChange={(e) => setKataAjakan(e.target.value)}
    placeholder="Masukkan kata-kata ajakan..."
    className="mt-1 w-full rounded-lg border px-3 py-2"
  />
</div>
{/* FOTO PRESTASI */}
<div>
  <label className="mb-1 block text-sm text-gray-500">
    Foto Prestasi
  </label>

  <div className="flex items-center w-full border border-gray-300 rounded-lg overflow-hidden bg-white">
    <label className="cursor-pointer bg-[#A1AAB4] hover:bg-[#8F98A2] text-gray-900 font-semibold text-sm px-5 py-2.5 transition-colors shrink-0">
      Pilih File

      <input
        type="file"
        accept="image/*"
        onChange={(e) => {
          const file = e.target.files?.[0];

          if (file) {
            setSelectedPrestasiFile(file);

            const url = URL.createObjectURL(file);
            setPreviewPrestasi(url);
          }
        }}
        className="hidden"
      />
    </label>

    <span className="px-4 text-sm text-gray-400 truncate w-full">
      {selectedPrestasiFile
        ? selectedPrestasiFile.name
        : "Tidak ada file yang dipilih"}
    </span>
  </div>

  {previewPrestasi && (
    <img
      src={previewPrestasi}
      alt="Preview Prestasi"
      className="mt-3 h-32 rounded-xl object-cover"
    />
  )}
</div>

{/* DESKRIPSI PRESTASI */}
<div>
  <label className="text-sm text-gray-500">
    Deskripsi Prestasi
  </label>

  <textarea
    rows={4}
    value={prestasi}
    onChange={(e) => setPrestasi(e.target.value)}
    placeholder="Masukkan prestasi..."
    className="mt-1 w-full resize-none rounded-lg border p-3"
  />
</div>

        {/* Tombol */}
        <div className={`flex gap-3 px-6 pb-6 ${josefin.className}`}>

          <button
            type="button"
            onClick={handleSimpan}
            className="flex-1 rounded-xl bg-green-500 hover:bg-[#079E43] active:bg-[#056b2d] active:scale-95 py-2 font-semibold text-white transition-all duration-200">
            Simpan
          </button>

          <button
            type="button"
            onClick={onClose}
            className="flex-1 rounded-xl border border-red-500 bg-white text-red-500 hover:bg-red-500 hover:text-white active:bg-red-700 active:text-white active:scale-95 py-2 font-semibold transition-all duration-200">
            Batal
          </button>

        </div>
      </div>
    </div>
  );
}