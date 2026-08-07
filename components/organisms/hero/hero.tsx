import { Josefin_Sans } from "next/font/google";

const josefin = Josefin_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export function Hero() {
  return (
    <section
      className=" relative flex min-h-[480px] h-[80vh]  w-full items-center text-white
        sm:min-h-[600px] md:min-h-[700px] md:h-[85vh] ">

      {/* Gambar Background Gedung SMKN 2 Sumedang */}
      <div className="absolute inset-0 z-0">
        <div
          className="h-full w-full bg-cover bg-center sm:bg-center"
          style={{
            backgroundImage: `url('/images/bg-sekolah.png')`,
          }}
        />

        {/* Overlay Responsive */}
        <div
          className=" absolute
            inset-0 z-10 bg-gradient-to-b from-[#0f172a]/80 via-blue-950/85 to-[#0f172a] md:bg-gradient-to-r md:from-blue-950
            md:via-blue-700/90 md:to-transparent"/>
      </div>

      {/* Konten Teks Hero */}
      <div
        className="relative z-20 w-full max-w-2xl space-y-4 px-6 pt-12 pb-8
          sm:space-y-5 sm:px-10 md:ml-16 md:px-8 md:pt-0 md:pb-0 lg:ml-24">
        <div className="space-y-2">
          <p
            className="text-base font-light tracking-wide text-blue-200/90
              sm:text-2xl md:text-4xl">
            Selamat Datang
          </p>

          <h1
            className="text-3xl font-bold leading-tight tracking-tight
              text-white [text-shadow:-4px_2px_4px_rgba(0,0,0,0.3)]
              :text-5xl md:text-[60px] md:[text-shadow:-12px_sm4px_4px_rgba(0,0,0,0.25)]">
            Gridas Ekskul
          </h1>
        </div>

        <div className="space-y-3 text-sm font-light leading-relaxed tracking-wide text-slate-200
           sm:text-base  md:space-y-6  md:text-xl">
          <p>
            Temukanlah kegiatan yang
            <br className="hidden sm:inline" />{" "}
            sesuai dengan minat dan bakat.
          </p>

          <p>
            Bergabunglah
            <br className="hidden sm:inline" />{" "}
            dan jadilah siswa berprestasi.
          </p>
        </div>

        {/* Tombol */}
        <div className="pt-2 sm:pt-4">
          <a
            href="#ekskul"
            className="inline-block rounded-2xl bg-[#1e00a3] px-6 py-2.5 text-sm font-semibold text-white
              shadow-lg shadow-indio-950/50 transition duration-300 hover:bg-[#150080] active:scale-95 sm:px-9
              sm:py-3 sm:text-base md:px-10">
            Lihat Ekskul
          </a>
        </div>
      </div>
    </section>
  );
}