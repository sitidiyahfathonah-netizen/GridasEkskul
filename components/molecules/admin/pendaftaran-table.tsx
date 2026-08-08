"use client";

import { Josefin_Sans } from "next/font/google";

const josefin = Josefin_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"]
});


export interface PendaftarData {
  id: number;
  documentId?: string;
  nama: string;
  kelas: string;
  jurusan: string;
  ekskul: string;
  no_telp: string;
}

interface PendaftaranTableProps {
  list: PendaftarData[];
  isLoading: boolean;
  onDelete: (id: string | number) => void;
}

export default function PendaftaranTable({ list, isLoading, onDelete }: PendaftaranTableProps) {
  return (
    <div className={`w-full flex-1 flex flex-col ${josefin.className}`}>
      {/* Header Tabel */}
      <div className={`grid grid-cols-6 gap-2 px-6 py-2 text-slate-500 font-bold text-xs md:text-sm text-center mb-2 ${josefin.className}`}>
        <div className="text-left">Nama</div>
        <div>Kelas</div>
        <div>Jurusan</div>
        <div>Ekskul</div>
        <div>No Telp</div>
        <div>Aksi</div>
      </div>

      {/* Item List Pendaftar */}
      <div className={`space-y-3 flex-1 overflow-y-auto max-h-[420px] pr-1 ${josefin.className}`}>
        {isLoading ? (
          <div className="text-center py-12 text-slate-400 font-medium">Memuat data pendaftar...</div>
        ) : list.length === 0 ? (
          <div className="text-center py-12 text-slate-400 font-medium bg-white rounded-2xl border">
            Tidak ada data pendaftar.
          </div>
        ) : (
          list.map((item) => {
            const targetId = item.documentId || item.id;
            return (
              <div
                key={targetId}
                className={`grid grid-cols-6 gap-2 items-center bg-white p-4 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition text-xs md:text-sm text-slate-700 text-center font-medium ${josefin.className}`}
              >
                <div className="text-left font-semibold text-slate-900 truncate">{item.nama}</div>
                <div>{item.kelas}</div>
                <div className="uppercase">{item.jurusan}</div>
                <div className="font-semibold text-[#00598a]">{item.ekskul}</div>
                <div className="text-slate-500">{item.no_telp}</div>
                <div>
                  <button
                    onClick={() => onDelete(targetId)}
                    className="bg-red-600 hover:bg-red-700 text-white font-bold px-4 py-1.5 rounded-full text-xs transition active:scale-95 shadow-sm"
                  >
                    Hapus
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}