"use client";

interface SuccessModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export function SuccessModal({ isOpen, onClose }: SuccessModalProps) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-fade-in">
            <div className="bg-white rounded-[28px] p-8 max-w-xs w-full text-center shadow-2xl flex flex-col items-center space-y-5 transform transition-all scale-100">

                {/* Ikon Centang Hijau */}
                <div className="w-20 h-20 bg-[#5CE65C] rounded-full flex items-center justify-center shadow-md">
                    <svg
                        className="w-11 h-11 text-white stroke-[3.5]"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                </div>

                {/* Teks Pesan Sukses */}
                <div className="space-y-2">
                    <h3 className="text-xl font-extrabold text-[#22C55E] leading-snug">
                        Pendaftaran Berhasil !
                    </h3>
                    <p className="text-xs text-[#22C55E] font-medium leading-relaxed px-2">
                        Pengurus akan menghubungimu via Whatsapp untuk info selanjutnya
                    </p>
                </div>

                {/* Tombol Oke */}
                <button
                    onClick={onClose}
                    className="px-8 py-2 bg-[#22C55E] hover:bg-emerald-600 active:scale-95 text-white font-bold text-sm rounded-xl transition-all shadow-md mt-2"
                >
                    Oke
                </button>

            </div>
        </div>
    );
}