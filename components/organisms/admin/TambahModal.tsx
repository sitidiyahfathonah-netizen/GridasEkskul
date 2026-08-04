"use client";

import { useState } from "react";

interface TambahModalProps {
  open: boolean;
  onClose: () => void;
}

export function TambahModal({
  open,
  onClose,
}: TambahModalProps) {
  const [preview, setPreview] = useState<string>("");

  if (!open) return null;

  const handleImage = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];

    if (!file) return;

    setPreview(URL.createObjectURL(file));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      
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
              className="mt-1 w-full rounded-lg border p-2"
            />

            {preview && (
              <img
                src={preview}
                alt="Preview"
                className="mt-3 h-32 rounded-xl object-cover"
              />
            )}
          </div>

          {/* NAMA */}
          <div>
            <label className="text-sm text-gray-500">
              Nama Ekstrakurikuler
            </label>

            <input
              type="text"
              placeholder="Masukkan nama ekstrakurikuler"
              className="mt-1 w-full rounded-lg border px-3 py-2"
            />
          </div>

          {/* HARI */}
          <div>
            <label className="text-sm text-gray-500">
              Hari
            </label>

            <select className="mt-1 w-full rounded-lg border px-3 py-2">
              <option>Pilih Hari</option>
              <option>Senin</option>
              <option>Selasa</option>
              <option>Rabu</option>
              <option>Kamis</option>
              <option>Jumat</option>
              <option>Sabtu</option>
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
                className="mt-1 w-full rounded-lg border px-3 py-2"
              />
            </div>

            {/* Jam Selesai */}
            <div>
              <label className="text-sm text-gray-500">
                Jam Selesai
              </label>

              <input
                type="time"
                className="mt-1 w-full rounded-lg border px-3 py-2"
              />
            </div>

          </div>

          {/* DESKRIPSI */}
          <div>
            <label className="text-sm text-gray-500">
              Deskripsi
            </label>

            <textarea
              rows={6}
              placeholder="Masukkan deskripsi ekstrakurikuler..."
              className="mt-1 w-full resize-none rounded-lg border p-3"
            />
          </div>

        </div>

        {/* Tombol */}
        <div className="flex gap-3 px-6 pb-6">

        <button
  type="button"
  className="
    flex-1
    rounded-xl
    bg-[#08B84F]
    py-2
    font-semibold
    text-white
    transition
    duration-200
    hover:bg-[#079E43]
    active:bg-[#067D35]
  "
>
  Simpan
</button>

          <button
            type="button"
            onClick={onClose}
            className="flex-1 rounded-xl border border-red-500 py-2 font-semibold text-red-500 transition hover:bg-red-50"
          >
            Batal
          </button>

        </div>

      </div>
    </div>
  );
}