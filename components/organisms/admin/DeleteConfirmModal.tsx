"use client";

interface DeleteConfirmModalProps {
    isOpen: boolean;
    isSuccess: boolean;
    isDeleting?: boolean;
    onConfirm: () => void;
    onCancel: () => void;
    onCloseSuccess: () => void;
}

export function DeleteConfirmModal({
    isOpen,
    isSuccess,
    isDeleting = false,
    onConfirm,
    onCancel,
    onCloseSuccess,
}: DeleteConfirmModalProps) {
    // Modal Konfirmasi Hapus
    if (isOpen && !isSuccess) {
        return (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-fade-in">
                <div className="bg-white rounded-[28px] p-8 max-w-sm w-full text-center shadow-2xl flex flex-col items-center space-y-5">
                    {/* Ikon Silang Merah */}
                    <div className="w-20 h-20 bg-[#EF4444] rounded-full flex items-center justify-center shadow-md">
                        <svg
                            className="w-10 h-10 text-white stroke-[3]"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </div>

                    {/* Teks Pertanyaan */}
                    <h3 className="text-xl font-extrabold text-[#EF4444] leading-snug px-2">
                        Apakah anda yakin ingin menghapus pendaftar ini?
                    </h3>

                    {/* Tombol Aksi */}
                    <div className="flex items-center justify-center gap-3 pt-2 w-full">
                        <button
                            onClick={onConfirm}
                            disabled={isDeleting}
                            className="px-6 py-1.5 border-2 border-[#EF4444] text-[#EF4444] font-bold text-base rounded-lg hover:bg-red-50 active:scale-95 transition-all min-w-[80px]"
                        >
                            {isDeleting ? "..." : "Ya"}
                        </button>
                        <button
                            onClick={onCancel}
                            className="px-5 py-1.5 border-2 border-[#EF4444] text-[#EF4444] font-bold text-base rounded-lg hover:bg-red-50 active:scale-95 transition-all"
                        >
                            Pikir Lagi
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    // Modal Penghapusan Berhasil
    if (isSuccess) {
        return (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-fade-in">
                <div className="bg-white rounded-[28px] p-8 max-w-sm w-full text-center shadow-2xl flex flex-col items-center space-y-6">
                    {/* Ikon Centang Hijau */}
                    <div className="w-20 h-20 bg-[#6EE7B7] rounded-full flex items-center justify-center shadow-md">
                        <svg
                            className="w-10 h-10 text-white stroke-[3]"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                    </div>

                    {/* Teks Sukses */}
                    <h3 className="text-xl font-extrabold text-[#10B981] leading-snug">
                        Penghapusan Berhasil !
                    </h3>

                    {/* Tombol OK */}
                    <button
                        onClick={onCloseSuccess}
                        className="px-8 py-1.5 bg-[#10B981] text-white font-bold text-sm rounded-lg hover:bg-emerald-600 active:scale-95 transition-all"
                    >
                        Oke
                    </button>
                </div>
            </div>
        );
    }

    return null;
}