"use client";

import { useState, useEffect } from "react";
import { EskulItem } from "@/app/admin/dashboard/page";

interface EditModalProps {
  open: boolean;
  editItem: EskulItem | null;
  onClose: () => void;
  onSave: (updatedItem: EskulItem) => void;
}

export function EditModal({
  open,
  editItem,
  onClose,
  onSave,
}: EditModalProps) {
  const [nama, setNama] = useState("");
  const [jadwal, setJadwal] = useState(""); // this will be used for hari
  const [jamMulai, setJamMulai] = useState("");
  const [jamSelesai, setJamSelesai] = useState("");
  const [deskripsi, setDeskripsi] = useState("");
  const [foto, setFoto] = useState("");

  useEffect(() => {
    if (editItem) {
      setNama(editItem.nama);
      setDeskripsi(editItem.deskripsi);
      setFoto(editItem.foto);
      
      // Parse jadwal
      // expected format: "Senin\n15.00 - 17.00"
      const parts = editItem.jadwal.split("\n");
      if (parts.length === 2) {
        setJadwal(parts[0]);
        const times = parts[1].split(" - ");
        if (times.length === 2) {
          setJamMulai(times[0].replace(".", ":"));
          setJamSelesai(times[1].replace(".", ":"));
        }
      } else {
        setJadwal(editItem.jadwal);
      }
    } else {
      setNama("");
      setJadwal("");
      setJamMulai("");
      setJamSelesai("");
      setDeskripsi("");
      setFoto("");
    }
  }, [editItem]);

  const handleSimpan = () => {
    if (!editItem) return;
    
    // format jam back to using dot or colon depending on UI, I'll keep the input's colon but user can format if needed. Actually, defaultData uses dot "15.00", let's replace colon with dot.
    const formattedJamMulai = jamMulai.replace(":", ".");
    const formattedJamSelesai = jamSelesai.replace(":", ".");
    const newJadwal = `${jadwal}\n${formattedJamMulai} - ${formattedJamSelesai}`;
    
    onSave({
      ...editItem,
      nama,
      deskripsi,
      jadwal: newJadwal,
      foto: foto, // keep old foto for now since no image upload logic yet
    });
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">

      {/* Kotak Modal */}
      <div className="w-full max-w-md max-h-[90vh] overflow-y-auto rounded-2xl bg-white shadow-2xl">

        {/* Header */}
        <div className="px-6 pt-6">
          <h2 className="text-3xl font-bold text-slate-700">
            Update Ekstrakurikuler
          </h2>

          <p className="mt-1 text-sm text-gray-400">
            Edit data Ekstrakurikuler
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
              className="mt-1 w-full rounded-lg border p-2" />
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
              placeholder="Masukkan Nama Ekstrakurikuler"
              className="mt-1 w-full rounded-lg border px-3 py-2 outline-none focus:ring-2 focus:ring-sky-500 " />
          </div>

          {/* HARI */}
          <div>
            <label className="text-sm text-gray-500">
              Hari
            </label>

            <select
              value={jadwal}
              onChange={(e) => setJadwal(e.target.value)}
              className="mt-1 w-full rounded-lg border px-3 py-2 outline-none focus:ring-2 focus:ring-sky-500">
              <option value="">Pilih Hari</option>
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
                value={jamMulai}
                onChange={(e) => setJamMulai(e.target.value)}
                className="mt-1 w-full rounded-lg border px-3 py-2 outline-none focus:ring-2 focus:ring-sky-500 " />
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
                className="mt-1 w-full rounded-lg border px-3 py-2 outline-none focus:ring-2 focus:ring-sky-500" />
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
              className="mt-1 w-full resize-none rounded-lg border p-3 outline-none focus:ring-2 focus:ring-sky-500" />
          </div>
        </div>

        {/* Tombol */}
        <div className="flex gap-3 px-6 pb-6">
          <button
            onClick={handleSimpan}
            className="flex-1 bg-[#08B84F] hover:bg-[#079E43] text-white py-3 rounded-xl font-semibold transition duration-200">
            Update
          </button>

          <button
            onClick={onClose}
            className="flex-1 bg-white border border-[#FF2E35] text-[#E52B32] hover:bg-[#FFF1F1] py-3 rounded-xl font-semibold transition duration-200">
            Batal
          </button>

        </div>
      </div>
    </div>
  );
}