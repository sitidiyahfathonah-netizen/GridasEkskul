"use client";

import { useState, useEffect } from "react";
import { EskulItem } from "@/app/admin/dashboard/page";
import { Josefin_Sans } from "next/font/google";

const josefin = Josefin_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

interface EditModalProps {
  open: boolean;
  editItem: EskulItem | null;
  onClose: () => void;
  onSave: (updatedItem: EskulItem) => void;
}

const LIST_HARI = ["Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu", "Minggu"];

export function EditModal({ open, editItem, onClose, onSave }: EditModalProps) {
  const [nama, setNama] = useState("");
  const [jadwal, setJadwal] = useState("");
  const [jamMulai, setJamMulai] = useState("");
  const [jamSelesai, setJamSelesai] = useState("");
  const [deskripsi, setDeskripsi] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  useEffect(() => {
    if (editItem) {
      setNama(editItem.nama || "");
      
      // Mengunci pembacaan deskripsi agar tidak hilang
      if (typeof editItem.deskripsi === "string") {
        setDeskripsi(editItem.deskripsi);
      } else {
        setDeskripsi("");
      }

      const rawJadwal = editItem.jadwal_pelaksanaan || "";

      const foundHari = LIST_HARI.find((hari) =>
        rawJadwal.toLowerCase().includes(hari.toLowerCase())
      ) || "";
      setJadwal(foundHari);

      let jamText = rawJadwal;
      if (foundHari) {
        jamText = rawJadwal
          .replace(new RegExp(foundHari, "gi"), "")
          .replace(/^[\s,:-]+/, "")
          .trim();
      }

      const jamParts = jamText.split("-").map((s) => s.trim());
      setJamMulai(jamParts[0] || "");
      setJamSelesai(jamParts[1] || "");
    } else {
      setNama("");
      setJadwal("");
      setJamMulai("");
      setJamSelesai("");
      setDeskripsi("");
      setSelectedFile(null);
    }
  }, [editItem]);

  const onSubmit = () => {
    if (!editItem) return;

    let formatJam = "";
    if (jamMulai && jamSelesai) {
      formatJam = `${jamMulai} - ${jamSelesai}`;
    } else {
      formatJam = jamMulai || jamSelesai;
    }

    let newJadwal = "";
    if (jadwal && formatJam) {
      newJadwal = `${jadwal}, ${formatJam}`;
    } else {
      newJadwal = jadwal || formatJam;
    }

    const changedFields: Partial<EskulItem> = {
      id: editItem.id,
      documentId: editItem.documentId,
    };

    if (nama.trim() !== "" && nama !== editItem.nama) changedFields.nama = nama.trim();
    if (deskripsi !== editItem.deskripsi) changedFields.deskripsi = deskripsi;
    if (newJadwal !== editItem.jadwal_pelaksanaan) changedFields.jadwal_pelaksanaan = newJadwal;

    onSave(changedFields as EskulItem);
    onClose();
  };

  if (!open) return null;

  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 ${josefin.className}`}>
      <div className="w-full max-w-md max-h-[90vh] overflow-y-auto rounded-2xl bg-white shadow-2xl">
        <div className="px-6 pt-6">
          <h2 className="text-3xl font-bold text-slate-700">Update Ekstrakurikuler</h2>
          <p className="mt-1 text-sm text-gray-400">Edit data Ekstrakurikuler</p>
        </div>

        <div className="space-y-4 px-6 py-5">
          <div>
            <label className="text-sm font-semibold text-[#8A94A6] mb-1 block">Foto</label>
            <div className="flex items-center w-full border border-gray-300 rounded-lg overflow-hidden bg-white mt-1">
              <label className="cursor-pointer bg-[#A1AAB4] hover:bg-[#8F98A2] text-gray-900 font-semibold text-sm px-5 py-2.5 transition-colors shrink-0">
                Pilih File
                <input
                  type="file"
                  className="hidden"
                  onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
                />
              </label>
              <span className="px-4 text-sm text-[#8A94A6] truncate w-full">
                {selectedFile ? selectedFile.name : "Tidak ada file yang dipilih"}
              </span>
            </div>
          </div>

          <div>
            <label className="text-sm font-semibold text-[#8A94A6] mb-1 block">Nama Ekstrakurikuler</label>
            <input
              type="text"
              value={nama}
              onChange={(e) => setNama(e.target.value)}
              className="mt-1 w-full rounded-lg border px-3 py-2 outline-none focus:ring-2 focus:ring-sky-500"
            />
          </div>

          <div>
            <label className="text-sm font-semibold text-[#8A94A6] mb-1 block">Hari (Opsional)</label>
            <select
              value={jadwal}
              onChange={(e) => setJadwal(e.target.value)}
              className="mt-1 w-full rounded-lg border px-3 py-2 outline-none focus:ring-2 focus:ring-sky-500"
            >
              <option value="">Pilih Hari (Opsional)</option>
              {LIST_HARI.map((h) => (
                <option key={h} value={h}>{h}</option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-sm font-semibold text-[#8A94A6] mb-1 block">Jam Mulai</label>
              <input
                type="text"
                value={jamMulai}
                onChange={(e) => setJamMulai(e.target.value)}
                placeholder="15:00"
                className="mt-1 w-full rounded-lg border px-3 py-2 outline-none focus:ring-2 focus:ring-sky-500"
              />
            </div>
            <div>
              <label className="text-sm font-semibold text-[#8A94A6] mb-1 block">Jam Selesai</label>
              <input
                type="text"
                value={jamSelesai}
                onChange={(e) => setJamSelesai(e.target.value)}
                placeholder="17:00"
                className="mt-1 w-full rounded-lg border px-3 py-2 outline-none focus:ring-2 focus:ring-sky-500"
              />
            </div>
          </div>

          <div>
            <label className="text-sm font-semibold text-[#8A94A6] mb-1 block">Deskripsi</label>
            <textarea
              rows={5}
              value={deskripsi}
              onChange={(e) => setDeskripsi(e.target.value)}
              placeholder="Masukkan deskripsi..."
              className="mt-1 w-full resize-none rounded-lg border p-3 outline-none focus:ring-2 focus:ring-sky-500"
            />
          </div>
        </div>

        <div className="flex gap-3 px-6 pb-6">
          <button
            onClick={onSubmit}
            className="flex-1 bg-[#08B84F] hover:bg-[#079E43] text-white py-3 rounded-xl font-semibold transition-all"
          >
            Update
          </button>
          <button
            onClick={onClose}
            className="flex-1 bg-white border border-[#FF2E35] text-[#E52B32] hover:bg-[#FF2E35] hover:text-white py-3 rounded-xl font-semibold transition-all"
          >
            Batal
          </button>
        </div>
      </div>
    </div>
  );
}