"use client";

export default function TambahGaleriSuksesModal({ show, onClose }: { show: boolean; onClose: () => void }) {
    if (!show) return null;

    return (
        <div
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
            onClick={onClose}
        >
            <div
                className="bg-white rounded-3xl p-8 max-w-sm w-full flex flex-col items-center justify-center space-y-6 shadow-xl transform transition-all"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="w-24 h-24 bg-[#63F146] rounded-full flex items-center justify-center shadow-md">
                    <svg
                        className="w-14 h-14 text-white stroke-[3.5]"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M5 13l4 4L19 7"
                        />
                    </svg>
                </div>

                <h3 className="text-[#63F146] text-xl font-extrabold text-center tracking-wide">
                    Foto berhasil ditambahkan
                </h3>
            </div>
        </div>
    );
}