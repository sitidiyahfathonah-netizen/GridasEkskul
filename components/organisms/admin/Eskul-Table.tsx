"use client";

import Image from "next/image";
import { EskulItem } from "@/app/admin/dashboard/page";

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
    <div className="p-8">

      {/* Judul tabel tetap */}
      <table className="w-full">
        <thead>
          <tr className="text-left text-[#00598A] text-lg">
            <th>Foto</th>
            <th>Nama</th>
            <th>Deskripsi</th>
            <th>Jadwal</th>
            <th className="text-center">Aksi</th>
          </tr>
        </thead>
      </table>

      {/* Hanya isi tabel yang bisa di-scroll */}
      <div className="max-h-[calc(100vh-380px)] overflow-y-auto">
        <table className="w-full border-separate border-spacing-y-5">
          <tbody>
            {dataEskul.map((item) => (
              <tr key={item.id}
                className="bg-white shadow rounded-xl">

                <td className="p-4">
                  <Image
                    src={item.foto}
                    alt={item.nama}
                    width={120}
                    height={70}
                    className="rounded-lg object-cover" />
                </td>

                <td className="font-bold text-gray-600">
                  {item.nama}
                </td>

                <td className="w-[420px] text-gray-600">
                  {item.deskripsi}
                </td>

                <td className="font-bold text-gray-600 whitespace-pre-line">
                  {item.jadwal}
                </td>

                <td>
                  <div className="flex justify-center gap-3">
                    <button
                      onClick={() => onEdit(item)}
                      className="bg-[#1E3A8A] hover:bg-[#172F72] text-white px-5 py-2 rounded-lg font-semibold transition duration-200">
                      Edit
                    </button>

                    <button
                      onClick={() => onDelete(item.id, item.nama)}
                      className="bg-[#FF2E35] hover:bg-[#E5242B] text-white px-5 py-2 rounded-lg font-semibold transition duration-200"> Hapus</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}