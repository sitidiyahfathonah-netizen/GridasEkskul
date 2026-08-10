"use client";

import { useState } from "react";

interface TambahGaleriModalProps {
  onClose: () => void;
  onSave: (namaEskul: string, deskripsi: string, file: File | null) => void;
}

export default function TambahGaleriModal({
  onClose,
  onSave,
}: TambahGaleriModalProps) {
  const [namaEskul, setNamaEskul] = useState("");
  const [deskripsi, setDeskripsi] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!namaEskul) return alert("Masukan Nama Ekstrakurikuler!");
    if (!selectedFile) return alert("Pilih Foto terlebih dahulu!");

    onSave(namaEskul, deskripsi, selectedFile);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-xs">
      <div className="w-full max-w-sm rounded-3xl bg-white p-6 shadow-2xl">
        <h2 className="text-lg font-bold text-slate-800">Tambah Foto Ekskul</h2>
        <p className="text-xs text-slate-400 mb-4">Tambah foto untuk galeri</p>

        <form onSubmit={handleSubmit} className="space-y-3">
          {/* Input File Foto */}
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1">
              Foto
            </label>
            <div className="flex items-center w-full border border-slate-300 rounded-lg overflow-hidden bg-white">
              <label className="cursor-pointer bg-[#A1AAB4] hover:bg-[#8F98A2] text-gray-900 font-semibold text-xs px-4 py-2 transition-colors shrink-0">
                Pilih File
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
                  className="hidden"
                  required
                />
              </label>
              <span className="px-3 text-xs text-slate-400 truncate w-full">
                {selectedFile ? selectedFile.name : "Tidak ada file yang dipilih"}
              </span>
            </div>
          </div>

          {/* Nama Ekstrakurikuler */}
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1">
              Nama Ekstrakurikuler
            </label>
            <input
              type="text"
              placeholder="Masukan Nama Ekstrakurikuler"
              value={namaEskul}
              onChange={(e) => setNamaEskul(e.target.value)}
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-emerald-500"
              required
            />
          </div>

          {/* Deskripsi */}
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1">
              Deskripsi
            </label>
            <textarea
              rows={3}
              placeholder="Masukan deskripsi ekstrakurikuler.."
              value={deskripsi}
              onChange={(e) => setDeskripsi(e.target.value)}
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-emerald-500"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2 pt-2">
            <button
              type="submit"
              className="flex-1 rounded-full bg-[#10B981] py-2 text-xs font-bold text-white shadow-sm hover:bg-emerald-600"
            >
              Simpan
            </button>

            <button
              type="button"
              onClick={onClose}
              className="flex-1 rounded-full border border-red-500 py-2 text-xs font-bold text-red-500 hover:bg-red-50"
            >
              Batal
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}