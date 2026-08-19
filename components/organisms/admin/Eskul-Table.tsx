"use client";

import { useState, useEffect } from "react";
import { EskulItem } from "@/app/admin/dashboard/page";
import { Josefin_Sans } from "next/font/google";

const josefin = Josefin_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"]
});

interface EskulTableProps {
  dataEskul: EskulItem[];
  highlightedId?: number | null | string;
  onEdit: (item: EskulItem) => void;
  onDelete: (id: number, nama: string) => void;
}

function DescriptionCell({ text }: { text: string }) {
  const [expanded, setExpanded] = useState(false);
  const isLong = text && text.length > 80;

  return (
    <div className="flex flex-col items-start">
      <div className={expanded ? "" : "line-clamp-2 md:line-clamp-3"}>
        {text}
      </div>
      {isLong && (
        <button
          onClick={() => setExpanded(!expanded)}
          className="text-[#00598A] text-xs font-bold hover:underline mt-1"
        >
          {expanded ? "Sembunyikan" : "Lihat Selengkapnya"}
        </button>
      )}
    </div>
  );
}

export function EskulTable({
  dataEskul,
  highlightedId,
  onEdit,
  onDelete,
}: EskulTableProps) {
  useEffect(() => {
    if (highlightedId) {
      setTimeout(() => {
        const row = document.getElementById(`eskul-row-${highlightedId}`);
        if (row) {
          row.scrollIntoView({ behavior: "smooth", block: "center" });
        }
      }, 300);
    }
  }, [highlightedId, dataEskul]);

  return (
    <div className="p-4 md:p-8">
      <div className="max-h-[calc(100vh-250px)] overflow-y-auto overflow-x-auto pr-2">
        {/* Menggunakan table-fixed dan min-w-900px agar layout tidak gepeng */}
        <table className="w-full min-w-[900px] table-fixed border-separate border-spacing-y-4 text-left">
          {/* Header Tabel */}
          <thead className="sticky top-0 bg-[#F5F7FA] z-10">
            <tr className={`text-[#00598A] text-lg font-bold ${josefin.className}`}>
              <th className="pb-3 pl-4 w-[140px]">Foto</th>
              <th className="pb-3 w-[160px]">Nama</th>
              {/* Kolom deskripsi diberi porsi terbesar */}
              <th className="pb-3 w-[45%]">Deskripsi</th>
              <th className="pb-3 w-[140px]">Jadwal</th>
              <th className="pb-3 text-center w-[180px]">Aksi</th>
            </tr>
          </thead>

          {/* Isi Tabel */}
          <tbody>
            {dataEskul.length > 0 ? (
              dataEskul.map((item) => (
                <tr
                  key={item.id}
                  id={`eskul-row-${item.documentId || item.id}`}
                  className={`bg-white shadow-sm rounded-xl overflow-hidden hover:shadow-md transition-shadow ${highlightedId === (item.documentId || item.id) || highlightedId === item.id
                      ? "ring-2 ring-green-400 bg-green-50"
                      : ""
                    }`}
                >
                  {/* 1. Foto */}
                  <td className="p-4 rounded-l-xl align-middle">
                    <div className="relative w-[120px] h-[70px] overflow-hidden rounded-lg bg-gray-100">
                      <img
                        src={item.foto}
                        alt={item.nama}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = "/images/tatarias.jpeg";
                        }}
                      />
                    </div>
                  </td>

                  {/* 2. Nama */}
                  <td className="font-bold text-gray-700 align-middle pr-2">
                    {item.nama}
                  </td>

                  {/* 3. Deskripsi */}
                  <td className="text-gray-600 text-sm align-middle pr-6 leading-relaxed">
                    <DescriptionCell text={item.deskripsi} />
                  </td>

                  {/* 4. Jadwal */}
                  <td className="align-middle text-sm pr-2">
                    {item.jadwal_pelaksanaan && item.jadwal_pelaksanaan !== "-" ? (
                      <div className="flex flex-col">
                        {item.jadwal_pelaksanaan.includes(",") || item.jadwal_pelaksanaan.includes("\n") ? (
                          <>
                            <span className="font-semibold text-slate-700">
                              {item.jadwal_pelaksanaan.split(/[\n,]/)[0]?.trim()}
                            </span>
                            <span className="text-xs text-gray-500 font-normal mt-0.5">
                              {item.jadwal_pelaksanaan.split(/[\n,]/)[1]?.trim()}
                            </span>
                          </>
                        ) : (
                          <span className="font-semibold text-gray-600">
                            {item.jadwal_pelaksanaan}
                          </span>
                        )}
                      </div>
                    ) : (
                      <span className="text-gray-400 font-normal">-</span>
                    )}
                  </td>

                  {/* 5. Aksi */}
                  <td className="p-4 rounded-r-xl align-middle">
                    <div className="flex justify-center gap-2">
                      <button
                        onClick={() => onEdit(item)}
                        className="bg-blue-900 hover:bg-blue-950 active:bg-[#0f1f4d] active:scale-95 text-white px-4 py-2 rounded-lg font-semibold text-sm transition-all duration-200"
                      >
                        Edit
                      </button>

                      <button
                        onClick={() => onDelete(item.id, item.nama)}
                        className="bg-red-600 hover:bg-[#E5242B] active:bg-red-800 active:scale-95 text-white px-4 py-2 rounded-lg font-semibold text-sm transition-all duration-200"
                      >
                        Hapus
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="text-center py-12 text-gray-400">
                  Data tidak ditemukan
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}