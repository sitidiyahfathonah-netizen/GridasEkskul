"use client";
import { Josefin_Sans } from "next/font/google";
import { useRouter } from "next/navigation";

// Pemanggil Font 
const josefin = Josefin_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"]
});

interface DetailEskulProps {
  eskul: any | null; // Ubah ke any dulu agar flexibel menerima object dari Strapi
  onBack: () => void;
  onJoin?: () => void;
}

export function DetailEskulCard({ eskul, onBack, onJoin }: DetailEskulProps) {
  if (!eskul) return null;
  console.log(eskul)
  const router = useRouter();

  // Mapping field dari skema Strapi v5 kamu
  const nama = eskul.nama_ekskul || "";
  const jadwal = eskul.jadwal || eskul.jadwal_pelaksanaan || eskul.waktu || "Belum diatur";
  const tempat = eskul.tempat || eskul.tempat_pelaksanaan || eskul.lokasi || "Belum diatur";
  const hari = eskul.hari || "Belum diatur";
  const kata_ajakan = eskul.kata_ajakan || eskul.attributes?.kata_ajakan || "belum diatur"


  const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";

  // Helper fungsi untuk membaca URL gambar dari Strapi v5 secara fleksibel
  const getStrapiMediaUrl = (media: any) => {
    if (!media) return null;
    const item = Array.isArray(media) ? media[0] : media;
    const rawUrl =
      item?.url ||
      item?.attributes?.url ||
      item?.data?.attributes?.url ||
      item?.data?.url;

    if (!rawUrl) return null;
    if (rawUrl.startsWith('http://') || rawUrl.startsWith('https://')) return rawUrl;
    return `${STRAPI_URL}${rawUrl}`;
  };

  // Panggil helper di atas untuk ambil foto
  const fotoUtamaUrl = getStrapiMediaUrl(eskul.foto_utama) || '';
  const fotoPrestasiUrl = getStrapiMediaUrl(eskul.foto_prestasi);

  // Penentu apakah section prestasi muncul atau tidak
  const punyaPrestasi = Boolean(fotoPrestasiUrl || eskul.prestasi);


  // JINAKKAN EROR BLOCKS: Fungsi untuk mengekstrak teks asli dari komponen Blocks Strapi v5
  const renderDeskripsi = () => {
    const rawDeskripsi = eskul.deskripsi;

    if (!rawDeskripsi) return "Belum ada deskripsi.";


    if (typeof rawDeskripsi === 'string') return rawDeskripsi;

    // Jika tipenya adalah Rich Text / Blocks (Array of Objects) bawaan Strapi v5
    if (Array.isArray(rawDeskripsi)) {
      return rawDeskripsi
        .map((block: any) => {
          if (block.children && Array.isArray(block.children)) {
            return block.children.map((child: any) => child.text).join("");
          }
          return "";
        })
        .join("\n");
    }

    return "Format deskripsi tidak didukung.";
  };

  return (
    <section className={`w-full min-h-screen bg-[#6B424D]/10 py-6 sm:py-10 md:py-12 px-3 sm:px-4 md:px-6 flex justify-center items-start md:items-center relative overflow-hidden ${josefin.className}`}>

      {/* ================= BACKGROUND MOTIF SAMAR FIGMA ================= */}
      <div className="absolute inset-0 z-0">
        <div
          className="w-full h-full bg-cover bg-center opacity-80 filter blur-[1px]"
          style={{ backgroundImage: `url('/images/bgdetail.jpg')` }}
        />
        {/* Lapisan Gradasi Warna Khas Katalog */}
        <div className="absolute inset-0 bg-gradient-to-b z-10" />
      </div>

      {/* ================= BINGKAI CARD UTAMA  ================= */}
      <div className="w-full max-w-sm sm:max-w-md md:max-w-lg bg-white rounded-[28px] sm:rounded-[35px] md:rounded-[40px] shadow-[0_20px_50px_rgba(0,0,0,0.15)] overflow-hidden border border-slate-100 relative z-20 flex flex-col">

        {/* ================= HEADER AREA (FIXED STICKY) ================= */}
        <div className="p-4 sm:p-5 md:p-6 flex items-center justify-between border-b border-slate-50 bg-white sticky top-0 z-30">
          <button
            onClick={onBack}
            className="text-slate-400 hover:text-slate-600 font-bold transition text-xs sm:text-sm flex items-center gap-1"
          >
            <span>← </span>
          </button>

          <div className="flex items-center gap-2 bg-sky-100 px-4 py-1.5 rounded-full">
            <span className="text-sm font-bold text-sky-800 tracking-wide uppercase">
              {nama}
            </span>
          </div>

          <span className="text-xs font-bold text-slate-300 tracking-widest">GRIDAS</span>
        </div>

        {/* CONTAINER KONTEN UTAMA */}
        <div className="p-6 space-y-6 flex-1">

          {/* ================= BAGIAN 1: DETAIL INFORMASI UTAMA ================= */}
          <div className="grid grid-cols-2 gap-4 items-stretch">
            {/* Foto Utama Ekskul dari Strapi */}
            <div
              className="rounded-3xl overflow-hidden h-44 shadow-sm bg-cover bg-center border border-slate-100"
              style={{ backgroundImage: `url(${fotoUtamaUrl})` }}
            />

            {/* Kotak Informasi Jadwal & Tempat */}
            <div className=" bg-sky-100 rounded-3xl p-4 flex flex-col justify-between text-slate-700 text-[11px] md:text-xs space-y-2">
              <div>
                <span className="font-bold text-sky-800 block mb-0.5">Jadwal Pelaksanaan :</span>
                <p className="font-normal">{jadwal}</p>
              </div>
              <div>
                <span className="font-bold text-[#00598a] block mb-0.5">Tempat Pelaksanaan :</span>
                <p className="font-normal">{tempat}</p>
              </div>
              <div>
                <span className="font-bold text-[#00598a] block mb-0.5">Hari :</span>
                <p className="font-normal">{hari}</p>
              </div>
            </div>
          </div>

          {/* ================= BAGIAN 2: DESKRIPSI TENTANG EKSKUL (Memanggil fungsi pengaman blocks) ================= */}
          <div className=" bg-sky-100 rounded-2xl p-4 border border-sky-100/50">
            <p className="text-xs text-slate-600 leading-relaxed text-center font-normal font-sans whitespace-pre-line">
              {renderDeskripsi()}
            </p>
          </div>

          {/* ================= BAGIAN 3: PRESTASI (SUDAH DINAMIS) ================= */}
          {punyaPrestasi && (
            <div className="py-2 flex flex-col items-center space-y-4">
              <div className="text-center">
                <h1 className="text-2xl font-bold text-[#00598a] tracking-tight">Prestasi</h1>
                <h1 className="text-2xl font-bold text-[#00598a] tracking-tight -mt-1">Ekstrakurikuler</h1>
              </div>

              {/* Card Foto Prestasi */}
              {fotoPrestasiUrl && (
                <div className="w-full rounded-2xl overflow-hidden shadow-md  bg-slate-100 border border-slate-100">
                  <img
                    src={fotoPrestasiUrl}
                    alt="Foto Prestasi"
                    className="w-full h-auto object-contain rounded-2xl"
                  />
                </div>
              )}

              {/* Teks Prestasi (Tersusun ke bawah / List) */}
              {eskul.prestasi && (
                <div className="w-full text-center mt-2 px-2">
                  <div className="text-[#00598A] text-xs sm:text-sm font-bold leading-relaxed whitespace-pre-line max-w-xs mx-auto">
                    {eskul.prestasi}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ================= FOOTER CALL TO ACTION (JOIN) ================= */}
          <div className="pt-4 bg-gradient-to-t from-slate-50 to-white mt-auto text-center space-y-4">
            <div>
              <span className="font-bold text-sky-800 block mb-0.5"></span>
              <p className="font-normal text-slate-700">{kata_ajakan}</p>
            </div>

            <button
              onClick={() => {
                onJoin?.(); // tetap menjalankan logika lama jika ada
                router.push("/daftar");
              }}
              className="w-full bg-[#1e00a3] hover:bg-[#150080] text-white font-bold py-3.5 rounded-2xl transition duration-200 shadow-lg tracking-wide transform active:scale-[0.99] text-sm">
              Gabung
            </button>
          </div>

        </div>
      </div>
    </section>
  );
}