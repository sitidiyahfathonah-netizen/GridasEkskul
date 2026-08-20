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
    /* Pembungkus Utama: Wajib overflow-x-auto agar bisa digeser */
    <div className={`w-full overflow-x-auto pb-4 ${josefin.className}`}>

      {/* Kunci lebar minimal 750px secara mutlak */}
      <div style={{ minWidth: "750px" }} className="w-full">

        {/* Header Tabel */}
        <div className="grid grid-cols-6 gap-4 px-6 py-2 text-slate-500 font-bold text-xs md:text-sm text-center mb-2 whitespace-nowrap">
          <div className="text-left">Nama</div>
          <div>Kelas</div>
          <div>Jurusan</div>
          <div>Ekskul</div>
          <div>No Telp</div>
          <div>Aksi</div>
        </div>

        {/* List Data Pendaftar */}
        <div className="space-y-3 max-h-[450px] overflow-y-auto pr-1">
          {isLoading ? (
            <div className="text-center py-12 text-slate-400 font-medium whitespace-nowrap">
              Memuat data pendaftar...
            </div>
          ) : list.length === 0 ? (
            <div className="text-center py-12 text-slate-400 font-medium bg-white rounded-2xl border whitespace-nowrap">
              Tidak ada data pendaftar.
            </div>
          ) : (
            list.map((item) => {
              const targetId = item.documentId || item.id;
              return (
                <div
                  key={targetId}
                  className="grid grid-cols-6 gap-4 items-center bg-white p-4 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition text-xs md:text-sm text-slate-700 text-center font-medium whitespace-nowrap"
                >
                  <div className="text-left font-semibold text-slate-900 px-1">
                    {item.nama}
                  </div>
                  <div>{item.kelas}</div>
                  <div className="uppercase">{item.jurusan}</div>
                  <div className="font-semibold text-[#00598a] px-1">
                    {item.ekskul}
                  </div>
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
    </div>
  );
}