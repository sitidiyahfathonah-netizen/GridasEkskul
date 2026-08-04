"use client";

import { useState } from "react";

interface EditModalProps {
  open: boolean;
  onClose: () => void;
}

export function EditModal({
  open,
  onClose,
}: EditModalProps) {
  const [nama, setNama] = useState("");
  const [jadwal, setJadwal] = useState("");
  const [jamMulai, setJamMulai] = useState("");
  const [jamSelesai, setJamSelesai] = useState("");
  const [deskripsi, setDeskripsi] = useState("");

  if (!open) return null;

  return (
    <div
      className="
        fixed
        inset-0
        z-50
        flex
        items-center
        justify-center
        bg-black/40
        p-3

        sm:p-4
      "
    >
      {/* Kotak Modal */}
      <div
        className="
          max-h-[92vh]
          w-full
          max-w-md
          overflow-y-auto
          rounded-2xl
          bg-white
          shadow-2xl

          sm:max-h-[90vh]
        "
      >
        {/* Header */}
        <div
          className="
            px-4
            pt-5

            sm:px-6
            sm:pt-6
          "
        >
          <h2
            className="
              text-2xl
              font-bold
              text-slate-700

              sm:text-3xl
            "
          >
            Update Ekstrakurikuler
          </h2>

          <p
            className="
              mt-1
              text-xs
              text-gray-400

              sm:text-sm
            "
          >
            Edit data Ekstrakurikuler
          </p>
        </div>

        {/* Isi Modal */}
        <div
          className="
            space-y-3
            px-4
            py-4

            sm:space-y-4
            sm:px-6
            sm:py-5
          "
        >
          {/* FOTO */}
          <div>
            <label className="text-sm text-gray-500">
              Foto
            </label>

            <input
              type="file"
              className="
                mt-1
                w-full
                rounded-lg
                border
                p-2
                text-xs

                sm:text-sm
              "
            />
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
              className="
                mt-1
                w-full
                rounded-lg
                border
                px-3
                py-2
                text-sm
                outline-none
                focus:ring-2
                focus:ring-sky-500

                sm:text-base
              "
            />
          </div>

          {/* HARI */}
          <div>
            <label className="text-sm text-gray-500">
              Hari
            </label>

            <select
              value={jadwal}
              onChange={(e) => setJadwal(e.target.value)}
              className="
                mt-1
                w-full
                rounded-lg
                border
                px-3
                py-2
                text-sm
                outline-none
                focus:ring-2
                focus:ring-sky-500

                sm:text-base
              "
            >
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
          <div
            className="
              grid
              grid-cols-1
              gap-3

              sm:grid-cols-2
            "
          >
            {/* Jam Mulai */}
            <div>
              <label className="text-sm text-gray-500">
                Jam Mulai
              </label>

              <input
                type="time"
                value={jamMulai}
                onChange={(e) => setJamMulai(e.target.value)}
                className="
                  mt-1
                  w-full
                  rounded-lg
                  border
                  px-3
                  py-2
                  text-sm
                  outline-none
                  focus:ring-2
                  focus:ring-sky-500

                  sm:text-base
                "
              />
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
                className="
                  mt-1
                  w-full
                  rounded-lg
                  border
                  px-3
                  py-2
                  text-sm
                  outline-none
                  focus:ring-2
                  focus:ring-sky-500

                  sm:text-base
                "
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
              value={deskripsi}
              onChange={(e) => setDeskripsi(e.target.value)}
              placeholder="Masukkan deskripsi ekstrakurikuler..."
              className="
                mt-1
                w-full
                resize-none
                rounded-lg
                border
                p-3
                text-sm
                outline-none
                focus:ring-2
                focus:ring-sky-500

                sm:text-base
              "
            />
          </div>
        </div>

        {/* Tombol */}
        <div
          className="
            flex
            flex-col
            gap-2
            px-4
            pb-5

            sm:flex-row
            sm:gap-3
            sm:px-6
            sm:pb-6
          "
        >
          <button
            className="
              w-full
              rounded-xl
              bg-[#08B84F]
              py-2.5
              text-sm
              font-semibold
              text-white
              transition
              duration-200
              hover:bg-[#079E43]

              sm:flex-1
              sm:py-3
              sm:text-base
            "
          >
            Update
          </button>

          <button
            onClick={onClose}
            className="
              w-full
              rounded-xl
              border
              border-[#FF2E35]
              bg-white
              py-2.5
              text-sm
              font-semibold
              text-[#E52B32]
              transition
              duration-200
              hover:bg-[#FFF1F1]

              sm:flex-1
              sm:py-3
              sm:text-base
            "
          >
            Batal
          </button>
        </div>
      </div>
    </div>
  );
}