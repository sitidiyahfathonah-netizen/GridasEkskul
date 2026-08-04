"use client";

import { useState } from "react";

interface TambahGaleriModalProps {
  onClose: () => void;
  onSave: (
    nama: string,
    deskripsi: string,
    file: File | null
  ) => void;
}

export default function TambahGaleriModal({
  onClose,
  onSave,
}: TambahGaleriModalProps) {
  const [namaEskul, setNamaEskul] = useState("");
  const [deskripsi, setDeskripsi] = useState("");
  const [selectedFile, setSelectedFile] =
    useState<File | null>(null);

  const handleSimpan = (e: React.FormEvent) => {
    e.preventDefault();

    if (!namaEskul) {
      return alert(
        "Nama Ekstrakurikuler wajib diisi!"
      );
    }

    onSave(
      namaEskul,
      deskripsi,
      selectedFile
    );
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
        overflow-y-auto
        bg-black/70
        p-3
        backdrop-blur-sm

        sm:p-4
      "
    >
      {/* Kotak Modal */}
      <div
        className="
          relative
          my-auto
          w-full
          max-w-md
          rounded-2xl
          bg-white
          p-4
          text-slate-800
          shadow-2xl

          sm:p-6
        "
      >
        {/* Judul */}
        <h2
          className="
            mb-1
            border-b
            pb-2
            text-lg
            font-bold
            text-slate-900

            sm:text-xl
          "
        >
          Tambah Foto Ekskul
        </h2>

        <p
          className="
            mb-4
            text-xs
            text-slate-500
          "
        >
          Tambah foto untuk galeri
        </p>

        <form
          onSubmit={handleSimpan}
          className="space-y-4"
        >
          {/* Foto */}
          <div>
            <label
              className="
                mb-1
                block
                text-xs
                font-semibold
                text-slate-600
              "
            >
              Foto
            </label>

            {/* Custom Input File */}
            <div
              className="
                flex
                flex-col
                gap-2
                rounded-lg
                border
                border-slate-300
                bg-white
                p-2

                sm:flex-row
                sm:items-center
                sm:gap-3
                sm:p-1.5
              "
            >
              <label
                htmlFor="foto-upload"
                className="
                  cursor-pointer
                  shrink-0
                  rounded-md
                  border
                  border-slate-200
                  bg-slate-100
                  px-3
                  py-2
                  text-center
                  text-xs
                  font-semibold
                  text-slate-700
                  transition
                  hover:bg-slate-200

                  sm:py-1.5
                "
              >
                Pilih File
              </label>

              <span
                className="
                  w-full
                  truncate
                  text-xs
                  text-slate-500
                "
              >
                {selectedFile
                  ? selectedFile.name
                  : "Tidak ada file yang dipilih"}
              </span>

              <input
                id="foto-upload"
                type="file"
                accept="image/*"
                onChange={(e) =>
                  setSelectedFile(
                    e.target.files?.[0] || null
                  )
                }
                className="hidden"
              />
            </div>
          </div>

          {/* Nama */}
          <div>
            <label
              className="
                mb-1
                block
                text-xs
                font-semibold
                text-slate-600
              "
            >
              Nama Ekstrakurikuler
            </label>

            <input
              type="text"
              placeholder="Masukan Nama Ekstrakurikuler"
              value={namaEskul}
              onChange={(e) =>
                setNamaEskul(e.target.value)
              }
              className="
                w-full
                rounded-lg
                border
                border-slate-300
                px-3
                py-2
                text-sm
                text-slate-800
                outline-none
                focus:ring-2
                focus:ring-blue-500
              "
              required
            />
          </div>

          {/* Deskripsi */}
          <div>
            <label
              className="
                mb-1
                block
                text-xs
                font-semibold
                text-slate-600
              "
            >
              Deskripsi
            </label>

            <textarea
              rows={3}
              placeholder="Masukan deskripsi ekstrakurikuler"
              value={deskripsi}
              onChange={(e) =>
                setDeskripsi(e.target.value)
              }
              className="
                w-full
                resize-none
                rounded-lg
                border
                border-slate-300
                px-3
                py-2
                text-sm
                text-slate-800
                outline-none
                focus:ring-2
                focus:ring-blue-500
              "
            />
          </div>

          {/* Tombol */}
          <div
            className="
              flex
              flex-col
              gap-3
              pt-2

              sm:flex-row
            "
          >
            <button
              type="submit"
              className="
                flex-1
                rounded-lg
                bg-[#00a65a]
                py-2.5
                text-sm
                font-bold
                text-white
                shadow
                transition
                hover:bg-[#008d4c]
              "
            >
              Simpan
            </button>

            <button
              type="button"
              onClick={onClose}
              className="
                flex-1
                rounded-lg
                bg-[#dd4b39]
                py-2.5
                text-sm
                font-bold
                text-white
                shadow
                transition
                hover:bg-[#c9302c]
              "
            >
              Batal
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}