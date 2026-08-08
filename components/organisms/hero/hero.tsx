import { Josefin_Sans } from "next/font/google";

// Inisialisasi Font Josefin Sans
const josefin = Josefin_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export function Hero() {
  return (
    <section className={`relative flex min-h-[100dvh] w-full items-center overflow-hidden pt-16 pb-10 text-white ${josefin.className}`}>
      {/* Gambar Background Sekolah */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url('/images/bg-sekolah.png')` }}>
        {/* Overlay Gradient Biru persis Figma (Biru Sekolah -> Transparan) */}
        <div className="absolute inset-0 z-10 bg-gradient-to-r from-[#005893] via-[#005893] via-[45%] to-transparent to-[80%] md:via-[50%]" />
      </div>

      {/* Konten Teks Hero */}
      <div className="relative z-20 w-full max-w-2xl space-y-5 px-6 sm:px-10 md:ml-16 lg:ml-24">
        {/* Judul Utama */}
        <div className="space-y-1">
          <p className="text-xl font-light tracking-wide text-white/90 sm:text-2xl md:text-3xl">
            Selamat Datang
          </p>
          <h1 className="text-4xl md:text-[60px] font-bold tracking-tight text-white drop-shadow sm:text-10xl md:text-6xl">
            Gridas Ekskul
          </h1>
        </div>

        {/* Deskripsi (Dua Baris Sesuai Figma) */}
        <div className="space-y-3 text-sm font-light tracking-wide text-white/95 sm:text-base md:text-lg leading-relaxed">
          <p>
            Temukanlah kegiatan yang sesuai
            <br></br>
            dengan minat dan bakat.
          </p>

          <p>
            Bergabunglah
            <br></br>
            dan jadilah siswa berprestasi.
          </p>
        </div>

        {/* Tombol Lihat Ekskul */}
        <div className="pt-2">
          <a
            href="#ekskul"
            className="inline-block rounded-xl bg-blue-900 px-7 py-3 text-sm font-semibold text-white shadow-lg transition duration-300 hover:bg-blue-950 hover:shadow-xl sm:px-8 sm:text-base">
            Lihat Ekskul
          </a>
        </div>
      </div>
    </section>
  );
}