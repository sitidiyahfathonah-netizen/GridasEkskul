"use client";

import { useState } from "react";

interface TambahModalProps {
  open: boolean;
  onClose: () => void;
}

export function TambahModal({
  open,
  onClose,
}: TambahModalProps) {
  const [preview, setPreview] = useState<string>("");

  if (!open) return null;

  const handleImage = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];

    if (!file) return;

    setPreview(URL.createObjectURL(file));
  };

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
            Tambah Ekstrakurikuler
          </h2>

          <p
            className="
              mt-1
              text-xs
              text-gray-400

              sm:text-sm
            "
          >
            Tambah data ekstrakurikuler
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
              onChange={handleImage}
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

            {preview && (
              <img
                src={preview}
                alt="Preview"
                className="
                  mt-3
                  h-28
                  rounded-xl
                  object-cover

                  sm:h-32
                "
              />
            )}
          </div>

          {/* NAMA */}
          <div>
            <label className="text-sm text-gray-500">
              Nama Ekstrakurikuler
            </label>

            <input
              type="text"
              placeholder="Masukkan nama ekstrakurikuler"
              className="
                mt-1
                w-full
                rounded-lg
                border
                px-3
                py-2
                text-sm
                outline-none

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
              className="
                mt-1
                w-full
                rounded-lg
                border
                px-3
                py-2
                text-sm
                outline-none

                sm:text-base
              "
            >
              <option>Pilih Hari</option>
              <option>Senin</option>
              <option>Selasa</option>
              <option>Rabu</option>
              <option>Kamis</option>
              <option>Jumat</option>
              <option>Sabtu</option>
            </select>
          </div>

          {/* JAM */}
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {/* Jam Mulai */}
            <div>
              <label className="text-sm text-gray-500">
                Jam Mulai
              </label>

              <input
                type="time"
                className="
                  mt-1
                  w-full
                  rounded-lg
                  border
                  px-3
                  py-2
                  text-sm

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
                className="
                  mt-1
                  w-full
                  rounded-lg
                  border
                  px-3
                  py-2
                  text-sm

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
            type="button"
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
              active:bg-[#067D35]

              sm:flex-1
              sm:py-2
              sm:text-base
            "
          >
            Simpan
          </button>

          <button
            type="button"
            onClick={onClose}
            className="
              w-full
              rounded-xl
              border
              border-red-500
              py-2.5
              text-sm
              font-semibold
              text-red-500
              transition
              hover:bg-red-50

              sm:flex-1
              sm:py-2
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