"use client";

import { useState } from "react";

interface TambahGaleriModalProps {
  onClose: () => void;
  onSave: (nama: string, deskripsi: string, file: File | null) => void;
}

export default function TambahGaleriModal({ onClose, onSave }: TambahGaleriModalProps) {
  const [namaEskul, setNamaEskul] = useState("");
  const [deskripsi, setDeskripsi] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleSimpan = (e: React.FormEvent) => {
    e.preventDefault();
    if (!namaEskul) return alert("Nama Ekstrakurikuler wajib diisi!");
    onSave(namaEskul, deskripsi, selectedFile);
  };

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white text-slate-800 w-full max-w-md rounded-2xl p-6 shadow-2xl relative">
        <h2 className="text-xl font-bold mb-1 border-b pb-2 text-slate-900">
          Tambah Foto Ekskul
        </h2>
        <p className="text-xs text-slate-500 mb-4">Tambah foto untuk galeri</p>

        <form onSubmit={handleSimpan} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1">Foto</label>
            
            {/* Custom Input File Bahasa Indonesia */}
            <div className="flex items-center gap-3 border border-slate-300 rounded-lg p-1.5 bg-white">
              <label 
                htmlFor="foto-upload" 
                className="cursor-pointer bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold py-1.5 px-3 rounded-md transition border border-slate-200 shrink-0"
              >
                Pilih File
              </label>

              <span className="text-xs text-slate-500 truncate max-w-[200px]">
                {selectedFile ? selectedFile.name : "Tidak ada file yang dipilih"}
              </span>

              <input
                id="foto-upload"
                type="file"
                accept="image/*"
                onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
                className="hidden"
              />
            </div>
          </div>

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

          <div className="flex gap-3 pt-2">
            <button
              type="submit"
              className="flex-1 bg-[#00a65a] hover:bg-[#008d4c] text-white font-bold py-2 rounded-lg text-sm transition shadow"
            >
              Simpan
            </button>
            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-[#dd4b39] hover:bg-[#c9302c] text-white font-bold py-2 rounded-lg text-sm transition shadow"
            >
              Batal
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}