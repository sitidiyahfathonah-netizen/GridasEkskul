"use client";

interface DeleteModalProps {
  open: boolean;
  onClose: () => void;
  onDelete: () => void;
  namaEskul?: string;
}

export function DeleteModal({
  open,
  onClose,
  onDelete,
  namaEskul,
}: DeleteModalProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="w-full max-w-md rounded-2xl bg-white shadow-2xl">

        {/* Header */}
        <div className="px-6 pt-6">
          <h2 className="text-3xl font-bold text-slate-700">
            Hapus Ekstrakurikuler
          </h2>

          <p className="mt-2 text-sm text-gray-400">
            Konfirmasi penghapusan data
          </p>
        </div>

        {/* Isi */}
        <div className="px-6 py-8 text-center">
          <p className="text-lg text-slate-600 leading-relaxed">
            Apakah Anda yakin ingin menghapus
          </p>

          <p className="mt-2 text-xl font-bold text-[#00598A]">
            {namaEskul || "data ekstrakurikuler"}?
          </p>

          <p className="mt-4 text-sm text-red-500">
            Data yang dihapus tidak dapat dikembalikan.
          </p>
        </div>

        {/* Footer */}
        <div className="flex gap-3 px-6 pb-6">
          <button
            onClick={onDelete}
            className="flex-1 rounded-xl bg-green-500 py-2.5 font-semibold text-white transition hover:bg-green-600">
            Ya, Hapus
          </button>

          <button
            onClick={onClose}
            className="flex-1 rounded-xl border border-red-500 py-2.5 font-semibold text-red-500 transition hover:bg-red-50">
            Batal
          </button>
        </div>

      </div>
    </div>
  );
}