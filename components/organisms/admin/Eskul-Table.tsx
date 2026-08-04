"use client";

import Image from "next/image";
import { useState } from "react";

interface EskulItem {
  id: number;
  nama: string;
  deskripsi: string;
  jadwal: string;
  foto: string;
}

const defaultData: EskulItem[] = [
  {
    id: 1,
    nama: "Tatarias",
    deskripsi:
      "Ekstrakurikuler Tata Rias bertujuan mengembangkan keterampilan merias.",
    jadwal: "Selasa\n15.00 - 17.00",
    foto: "/images/tatarias.jpeg",
  },
  {
    id: 2,
    nama: "Pramuka",
    deskripsi:
      "Ekstrakurikuler Pramuka membentuk karakter disiplin dan kepemimpinan.",
    jadwal: "Rabu\n15.00 - 17.00",
    foto: "/images/pramuka.jpeg",
  },
  {
    id: 3,
    nama: "Paskibra",
    deskripsi:
      "Ekstrakurikuler Paskibra membentuk karakter disiplin dan tanggung jawab.",
    jadwal: "Kamis\n15.00 - 17.00",
    foto: "/images/Paskibra.jpeg",
  },
  {
    id: 4,
    nama: "Basket",
    deskripsi:
      "Mengembangkan kemampuan bermain basket dan sportivitas.",
    jadwal: "Jumat\n15.00 - 17.00",
    foto: "/images/basket.jpeg",
  },
];

interface EskulTableProps {
  onEdit: () => void;
}

export function EskulTable({
  onEdit,
}: EskulTableProps) {
  // Menyimpan data agar bisa dihapus
  const [dataEskul, setDataEskul] =
    useState<EskulItem[]>(defaultData);

  // Fungsi tombol Hapus
  const handleHapus = (id: number, nama: string) => {
    const yakin = window.confirm(
      `Apakah kamu yakin ingin menghapus ${nama}?`
    );

    if (!yakin) return;

    setDataEskul((dataSebelumnya) =>
      dataSebelumnya.filter((item) => item.id !== id)
    );
  };

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
              <tr
                key={item.id}
                className="bg-white shadow rounded-xl"
              >
                <td className="p-4">
                  <Image
                    src={item.foto}
                    alt={item.nama}
                    width={120}
                    height={70}
                    className="rounded-lg object-cover"
                  />
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
                      onClick={onEdit}
                      className="
    bg-[#1E3A8A]
    hover:bg-[#172F72]
    text-white
    px-5
    py-2
    rounded-lg
    font-semibold
    transition
    duration-200
  "
>
  Edit
</button>

                    <button
                      onClick={() =>
                        handleHapus(item.id, item.nama)
                      }
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