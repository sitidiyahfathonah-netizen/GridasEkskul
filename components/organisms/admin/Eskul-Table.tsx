"use client";


import { EskulItem } from "@/app/admin/dashboard/page";
import { Josefin_Sans } from "next/font/google";

const josefin = Josefin_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"]
});

interface EskulTableProps {
  dataEskul: EskulItem[];
  onEdit: (item: EskulItem) => void;
  onDelete: (id: number, nama: string) => void;
}

export function EskulTable({
  dataEskul,
  onEdit,
  onDelete,
}: EskulTableProps) {
  return (
    <div className="p-4 md:p-8">
      {/* Cukup gunakan 1 elemen table agar kolom header & body SELALU presisi */}
      <div className="max-h-[calc(100vh-250px)] overflow-y-auto overflow-x-auto pr-2">
        <table className="w-full min-w-[800px] border-separate border-spacing-y-4 text-left">
          {/* Header Tabel */}
          <thead className="sticky top-0 bg-[#F5F7FA] z-10">
            <tr className={`text-[#00598A] text-lg font-bold ${josefin.className}`}>
              <th className="pb-3 pl-4 w-[150px]">Foto</th>
              <th className="pb-3 w-[180px]">Nama</th>
              <th className="pb-3">Deskripsi</th>
              <th className="pb-3 w-[180px]">Jadwal</th>
              <th className="pb-3 text-center w-[200px]">Aksi</th>
            </tr>
          </thead>

          {/* Isi Tabel */}
          <tbody>
            {dataEskul.length > 0 ? (
              dataEskul.map((item) => (
                <tr
                  key={item.id}
                  className="bg-white shadow-sm rounded-xl overflow-hidden hover:shadow-md transition-shadow"
                >
                  {/* 1. Foto */}
                  <td className="p-4 rounded-l-xl align-middle">
                    <div className="relative w-[120px] h-[70px] overflow-hidden rounded-lg bg-gray-100">
                      {/* Menggunakan tag img standar agar tidak error domain Next Image */}
                      <img
                        src={item.foto}
                        alt={item.nama}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          // Fallback jika gambar gagal dimuat
                          (e.target as HTMLImageElement).src = "/images/tatarias.jpeg";
                        }}
                      />
                    </div>
                  </td>

                  {/* 2. Nama */}
                  <td className="font-bold text-gray-700 align-middle">
                    {item.nama}
                  </td>

                  {/* 3. Deskripsi */}
                  <td className="text-gray-600 text-sm align-middle pr-4 leading-relaxed">
                    {item.deskripsi}
                  </td>

                 {/* 4. Jadwal */}
<td className="align-middle text-sm">
  {item.jadwal_pelaksanaan && item.jadwal_pelaksanaan !== "-" ? (
    <div className="flex flex-col">
      {item.jadwal_pelaksanaan.includes(",") || item.jadwal_pelaksanaan.includes("\n") ? (
        <>
          {/* Baris 1: Hari (Tebal) */}
          <span className="font-semibold text-slate-700">
            {item.jadwal_pelaksanaan.split(/[\n,]/)[0]?.trim()}
          </span>
          {/* Baris 2: Jam (Abu-abu & Lebih Kecil) */}
          <span className="text-xs text-gray-500 font-normal mt-0.5">
            {item.jadwal_pelaksanaan.split(/[\n,]/)[1]?.trim()}
          </span>
        </>
      ) : (
        /* Jika cuma ada jam saja atau hari saja */
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
                    <div className="flex justify-center gap-3">
                      <button
                        onClick={() => onEdit(item)}
                        className="bg-blue-900 hover:bg-blue-950 active:bg-[#0f1f4d] active:scale-95 text-white px-4 py-2 rounded-lg font-semibold text-sm transition-all duration-200">
                        Edit
                      </button>

                      <button
                        onClick={() => onDelete(item.id, item.nama)}
                        className="bg-red-600 hover:bg-[#E5242B] active:bg-red-800 active:scale-95 text-white px-4 py-2 rounded-lg font-semibold text-sm transition-all duration-200">
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