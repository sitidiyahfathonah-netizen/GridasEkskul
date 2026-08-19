"use client";

import { useState } from "react";

interface DeleteModalProps {
  open: boolean;
  onClose: () => void;
  onDelete: () => Promise<boolean>;
}

export function DeleteModal({
  open,
  onClose,
  onDelete,
}: DeleteModalProps) {
  const [isSuccess, setIsSuccess] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  if (!open) {
    if (isSuccess) setIsSuccess(false); // Reset state when closed
    return null;
  }

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      const success = await onDelete();
      if (success) {
        setIsSuccess(true);
        setTimeout(() => {
          setIsSuccess(false);
          onClose();
        }, 2000);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="w-full max-w-[320px] rounded-3xl bg-white shadow-2xl p-8 text-center relative overflow-hidden transition-all">
        {isSuccess ? (
          <div className="flex flex-col items-center justify-center py-2 animate-in zoom-in duration-300">
            <div className="w-20 h-20 bg-[#63F152] rounded-full flex items-center justify-center mb-6">
              <span className="text-5xl font-bold text-white">
                ✓
              </span>
            </div>

            <h2 className="text-xl font-extrabold text-[#63F152] tracking-wide">
              Penghapusan Berhasil !
            </h2>
          </div>

        ) : (
          <div className="flex flex-col items-center py-4 animate-in fade-in duration-200">
            <div className="w-20 h-20 bg-[#F23B33] rounded-full flex items-center justify-center mb-5">
               <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-14 w-14 text-white"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={3}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M6 18L18 6M6 6l12 12"
        />
      </svg>
            </div>

            <h2 className="text-xl font-extrabold text-[#F23B33] mb-6 leading-snug">
              Apakah anda yakin<br />
              ingin menghapus ekskul<br />
              ini?
            </h2>

            <div className="flex gap-2 w-full px-2">
              <button
                onClick={handleDelete}
                disabled={isDeleting}
                className="flex-1 rounded-lg border-2 border-[#F23B33] bg-white text-[#F23B33] hover:bg-[#F23B33] hover:text-white active:scale-95 py-2 font-extrabold text-sm transition-all">
                Ya
              </button>
              <button
                onClick={onClose}
                disabled={isDeleting}
                className="flex-1 rounded-lg border-2 border-[#F23B33] bg-white text-[#F23B33] hover:bg-[#F23B33] hover:text-white active:scale-95 py-2 font-extrabold text-sm transition-all">
                Pikir Lagi
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}