"use client";

interface HapusGaleriModalProps {
    showConfirm: boolean;
    showSuccess: boolean;
    onConfirm: () => void;
    onCancel: () => void;
    onCloseSuccess: () => void;
}

export function HapusGaleriModal({
    showConfirm,
    showSuccess,
    onConfirm,
    onCancel,
    onCloseSuccess,
}: HapusGaleriModalProps) {
    if (showSuccess) {
        return (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-xs">
                <div className="flex w-full max-w-xs flex-col items-center justify-center rounded-3xl bg-white p-6 text-center shadow-2xl">
                    <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-[#4ADE80]">
                        <svg
                            className="h-10 w-10 text-white"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={3}
                                d="M5 13l4 4L19 7"
                            />
                        </svg>
                    </div>
                    <h3 className="mb-4 text-base font-bold text-[#4ADE80]">
                        Penghapusan Berhasil !
                    </h3>
                    <button
                        onClick={onCloseSuccess}
                        className="rounded-full bg-emerald-500 px-6 py-1.5 text-xs font-bold text-white hover:bg-emerald-600"
                    >
                        Tutup
                    </button>
                </div>
            </div>
        );
    }

    if (showConfirm) {
        return (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-xs">
                <div className="flex w-full max-w-xs flex-col items-center justify-center rounded-3xl bg-white p-6 text-center shadow-2xl">
                    <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#EF4444]">
                        <span className="text-3xl font-extrabold text-white">✕</span>
                    </div>
                    <h3 className="mb-6 text-sm font-bold leading-relaxed text-red-600">
                        Apakah anda yakin <br /> ingin menghapus foto <br /> ini?
                    </h3>
                    <div className="flex w-full items-center justify-center gap-3">
                        <button
                            onClick={onConfirm}
                            className="w-20 rounded-lg border border-red-500 bg-white hover:bg-red-500 hover:text-white active:bg-red-700 active:text-white active:scale-95 py-1.5 text-xs font-bold text-red-600 transition-all duration-200"
                        >
                            Ya
                        </button>
                        <button
                            onClick={onCancel}
                            className="w-24 rounded-lg border border-red-500 bg-white hover:bg-red-500 hover:text-white active:bg-red-700 active:text-white active:scale-95 py-1.5 text-xs font-bold text-red-600 transition-all duration-200"
                        >
                            Pikir Lagi
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return null;
}