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

  // Menyimpan data yang akan dihapus
  const [eskulDipilih, setEskulDipilih] =
    useState<EskulItem | null>(null);

  // Mengatur popup konfirmasi
  const [popupHapus, setPopupHapus] =
    useState(false);

  // Mengatur popup sukses
  const [popupSukses, setPopupSukses] =
    useState(false);

  // Membuka popup hapus
  const bukaPopupHapus = (item: EskulItem) => {
    setEskulDipilih(item);
    setPopupHapus(true);
  };

  // Menghapus data
  const handleHapus = () => {
    if (!eskulDipilih) return;

    setDataEskul((dataSebelumnya) =>
      dataSebelumnya.filter(
        (item) => item.id !== eskulDipilih.id
      )
    );

    setPopupHapus(false);
    setPopupSukses(true);
    setEskulDipilih(null);
  };

  // Menutup popup sukses
  const tutupPopupSukses = () => {
    setPopupSukses(false);
  };

  return (
    <>
      <div
        className="
          w-full
          p-3

          sm:p-5

          md:p-8
        "
      >
        {/* Area tabel bisa digeser ke samping di HP */}
        <div className="w-full overflow-x-auto">

          {/* Judul tabel tetap */}
          <table className="min-w-[850px] w-full">
            <thead>
              <tr
                className="
                  text-left
                  text-base
                  text-[#00598A]

                  md:text-lg
                "
              >
                <th className="px-2 py-2 md:px-0">
                  Foto
                </th>

                <th className="px-2 py-2 md:px-0">
                  Nama
                </th>

                <th className="px-2 py-2 md:px-0">
                  Deskripsi
                </th>

                <th className="px-2 py-2 md:px-0">
                  Jadwal
                </th>

                <th className="px-2 py-2 text-center md:px-0">
                  Aksi
                </th>
              </tr>
            </thead>
          </table>

          {/* Hanya isi tabel yang bisa di-scroll */}
          <div
            className="
              max-h-[calc(100vh-330px)]
              overflow-y-auto

              md:max-h-[calc(100vh-380px)]
            "
          >
            <table
              className="
                min-w-[850px]
                w-full
                border-separate
                border-spacing-y-3

                md:border-spacing-y-5
              "
            >
              <tbody>
                {dataEskul.map((item) => (
                  <tr
                    key={item.id}
                    className="rounded-xl bg-white shadow"
                  >
                    <td className="p-3 md:p-4">
                      <Image
                        src={item.foto}
                        alt={item.nama}
                        width={120}
                        height={70}
                        className="
                          h-[55px]
                          w-[95px]
                          rounded-lg
                          object-cover

                          md:h-[70px]
                          md:w-[120px]
                        "
                      />
                    </td>

                    <td
                      className="
                        px-2
                        font-bold
                        text-sm
                        text-gray-600

                        md:text-base
                      "
                    >
                      {item.nama}
                    </td>

                    <td
                      className="
                        w-[360px]
                        px-2
                        text-sm
                        text-gray-600

                        md:w-[420px]
                        md:text-base
                      "
                    >
                      {item.deskripsi}
                    </td>

                    <td
                      className="
                        px-2
                        text-sm
                        font-bold
                        whitespace-pre-line
                        text-gray-600

                        md:text-base
                      "
                    >
                      {item.jadwal}
                    </td>

                    <td className="px-2">
                      <div className="flex justify-center gap-2 md:gap-3">

                        {/* Tombol Edit */}
                        <button
                          onClick={onEdit}
                          className="
                            rounded-lg
                            bg-[#1E3A8A]
                            px-3
                            py-2
                            text-sm
                            font-semibold
                            text-white
                            transition
                            duration-200
                            hover:bg-[#172F72]

                            md:px-5
                            md:text-base
                          "
                        >
                          Edit
                        </button>

                        {/* Tombol Hapus */}
                        <button
                          onClick={() =>
                            bukaPopupHapus(item)
                          }
                          className="
                            rounded-lg
                            bg-[#FF2E35]
                            px-3
                            py-2
                            text-sm
                            font-semibold
                            text-white
                            transition
                            duration-200
                            hover:bg-[#E5242B]

                            md:px-5
                            md:text-base
                          "
                        >
                          Hapus
                        </button>

                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

        </div>
      </div>

      {/* POPUP KONFIRMASI HAPUS */}
      {popupHapus && (
        <div
          className="
            fixed
            inset-0
            z-50
            flex
            items-center
            justify-center
            bg-black/40
            p-4
          "
        >
          <div
            className="
              w-full
              max-w-[280px]
              rounded-[25px]
              bg-white
              px-6
              py-5
              text-center
              shadow-2xl

              sm:max-w-[320px]
              sm:px-7
            "
          >
            {/* Ikon X */}
            <div
              className="
                mx-auto
                flex
                h-[68px]
                w-[68px]
                items-center
                justify-center
                rounded-full
                bg-[#FF2E20]
                text-[52px]
                font-light
                leading-none
                text-white

                sm:h-[76px]
                sm:w-[76px]
                sm:text-[58px]
              "
            >
              ×
            </div>

            {/* Pertanyaan */}
            <h3
              className="
                mt-4
                text-base
                font-bold
                leading-[20px]
                text-[#C51E1E]

                sm:text-[18px]
              "
            >
              Apakah anda yakin
              <br />
              ingin menghapus ekskul
              <br />
              ini?
            </h3>

            {/* Tombol */}
            <div className="mt-4 flex justify-center gap-2">
              <button
                onClick={handleHapus}
                className="
                  rounded-md
                  border
                  border-[#FF2E35]
                  px-4
                  py-1
                  text-sm
                  font-semibold
                  text-[#D52A2A]
                  transition
                  hover:bg-[#FF2E35]
                  hover:text-white

                  sm:px-5
                "
              >
                Ya
              </button>

              <button
                onClick={() => {
                  setPopupHapus(false);
                  setEskulDipilih(null);
                }}
                className="
                  rounded-md
                  border
                  border-[#FF2E35]
                  px-3
                  py-1
                  text-sm
                  font-semibold
                  text-[#D52A2A]
                  transition
                  hover:bg-[#FF2E35]
                  hover:text-white
                "
              >
                Pikir Lagi
              </button>
            </div>
          </div>
        </div>
      )}

      {/* POPUP HAPUS BERHASIL */}
      {popupSukses && (
        <div
          className="
            fixed
            inset-0
            z-50
            flex
            items-center
            justify-center
            bg-black/40
            p-4
          "
        >
          <div
            className="
              w-full
              max-w-[280px]
              rounded-[25px]
              bg-white
              px-6
              py-6
              text-center
              shadow-2xl

              sm:max-w-[320px]
              sm:px-7
              sm:py-7
            "
          >
            {/* Ikon Centang */}
            <div
              className="
                mx-auto
                flex
                h-[68px]
                w-[68px]
                items-center
                justify-center
                rounded-full
                bg-[#5BE23D]
                text-[45px]
                font-bold
                text-white

                sm:h-[76px]
                sm:w-[76px]
                sm:text-[50px]
              "
            >
              ✓
            </div>

            {/* Pesan sukses */}
            <h3
              className="
                mt-5
                text-base
                font-bold
                tracking-[1px]
                text-[#53B83A]

                sm:mt-6
                sm:text-[18px]
              "
            >
              Penghapusan Berhasil!
            </h3>

            {/* Tombol tutup */}
            <button
              onClick={tutupPopupSukses}
              className="
                mt-5
                rounded-lg
                bg-[#53C83B]
                px-6
                py-2
                text-sm
                font-semibold
                text-white
                transition
                hover:bg-[#45AD30]

                sm:px-7
              "
            >
              OK
            </button>
          </div>
        </div>
      )}
    </>
  );
}