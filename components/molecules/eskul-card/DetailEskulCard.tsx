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
    return `https://cn17l1l4-1337.asse.devtunnels.ms/${rawUrl}`;
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
    <section className={`w-full min-h-screen py-6 sm:py-10 md:py-12 px-3 sm:px-6 md:px-8 flex justify-center items-start relative overflow-hidden ${josefin.className}`}>

      {/* ================= BACKGROUND LUAR (TRANSPARAN) ================= */}
      <div className="fixed inset-0 z-0">
        <div
          className="w-full h-full bg-cover bg-center opacity-100"
          style={{ backgroundImage: `url('/images/bgdetail.jpg')` }} />
        <div className="absolute inset-0 bg-white/85 z-10" />
      </div>

      {/* ================= CONTAINER UTAMA FULL WIDTH (TANPA BINGKAI CARD) ================= */}
      <div className="w-full max-w-5xl mx-auto relative z-20 flex flex-col min-h-screen px-2 pb-8">

        {/* ================= HEADER AREA ================= */}
        <div className="flex items-center pt-8 pb-8 relative z-30">
          <button
            onClick={onBack}
            className="text-[#00598A] hover:text-[#003c5e] font-bold transition text-3xl flex items-center absolute left-0">
            ←
          </button>

          <div className="bg-[#E5F1F8] px-10 py-1.5 rounded-3xl mx-auto flex items-center justify-center shadow-sm">
            <span className="text-sm font-bold text-[#00598A] tracking-wide">
              {nama}
            </span>
          </div>
        </div>

        {/* ================= KONTEN UTAMA ================= */}
        <div className="space-y-6 flex-1 flex flex-col mt-2">

          {/* ================= BAGIAN 1: FOTO & DETAIL INFORMASI ================= */}
          <div className="flex flex-col md:flex-row gap-4 items-stretch">
            {/* Foto Utama Ekskul */}
            <div className="w-full md:w-[45%] flex-shrink-0">
              <div
                className="w-full rounded-2xl overflow-hidden shadow-sm bg-cover bg-center"
                style={{
                  backgroundImage: `url(${fotoUtamaUrl})`,
                  aspectRatio: "3/4",
                  height: "100%",
                  minHeight: "250px"
                }} />
            </div>

            {/* Kotak Informasi Jadwal & Tempat */}
            <div className="w-full md:w-[55%] bg-[#E5F1F8]/90 backdrop-blur-sm rounded-2xl p-6 flex flex-col justify-center space-y-6 shadow-sm border border-white/60">
              <div>
                <span className="font-bold text-[#00598A] block mb-1 text-sm md:text-base">Jadwal Pelaksanaan :</span>
                <p className="font-normal text-[#5b7a8a] text-sm md:text-base leading-relaxed">{jadwal}</p>
              </div>
              <div>
                <span className="font-bold text-[#00598A] block mb-1 text-sm md:text-base">Tempat Pelaksanaan :</span>
                <p className="font-normal text-[#5b7a8a] text-sm md:text-base leading-relaxed">{tempat}</p>
              </div>
              <div>
                <span className="font-bold text-[#00598A] block mb-1 text-sm md:text-base">Hari :</span>
                <p className="font-normal text-[#5b7a8a] text-sm md:text-base leading-relaxed">{hari}</p>
              </div>
            </div>
          </div>

          {/* ================= BAGIAN 2: DESKRIPSI ================= */}
          <div className="w-full bg-[#E5F1F8]/90 backdrop-blur-sm rounded-3xl p-6 mt-2 shadow-sm border border-white/60">
            <p className="text-sm md:text-base text-[#5b7a8a] leading-relaxed text-center font-normal whitespace-pre-line">
              {renderDeskripsi()}
            </p>
          </div>

          {/* ================= BAGIAN 3: PRESTASI ================= */}
          {punyaPrestasi && (
            <div className="pt-6 flex flex-col items-center space-y-4">
              <div className="text-center mb-2">
                <h1 className="text-3xl md:text-4xl font-extrabold text-[#00598A] tracking-tight drop-shadow-sm">Prestasi</h1>
                <h1 className="text-3xl md:text-4xl font-extrabold text-[#00598A] tracking-tight -mt-2 drop-shadow-sm">Estrakulikuler</h1>
              </div>

              {/* Card Foto Prestasi */}
              {fotoPrestasiUrl && (
                <div className="w-full max-w-3xl mx-auto rounded-3xl overflow-hidden shadow-md">
                  <img
                    src={fotoPrestasiUrl}
                    alt="Foto Prestasi"
                    className="w-full h-auto object-cover" />
                </div>
              )}

              {/* Teks Prestasi */}
              {eskul.prestasi && (
                <div className="w-full text-center mt-4">
                  <div className="text-[#00598A] text-sm md:text-base font-bold leading-relaxed whitespace-pre-line px-4">
                    {eskul.prestasi}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ================= FOOTER CALL TO ACTION (JOIN) ================= */}
          <div className="mt-8 text-center space-y-6">
            <div>
              <p className="font-bold text-[#00598A] text-sm md:text-base leading-relaxed px-4 whitespace-pre-line">
                {kata_ajakan}
              </p>
            </div>

            <div className="flex justify-center pb-8">
              <button
                onClick={() => {
                  onJoin?.();
                  router.push("/daftar");
                }}
                className="bg-[#1e00a3] hover:bg-[#150080] text-white font-bold py-3 px-12 md:px-16 rounded-2xl md:rounded-xl transition duration-200 shadow-lg tracking-wide text-sm md:text-base">
                Gabung
              </button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}