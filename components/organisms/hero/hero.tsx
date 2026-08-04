import { Josefin_Sans } from "next/font/google";

const josefin = Josefin_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export function Hero() {
  return (
    <section
      className="
        relative
        flex
        min-h-[600px]
        h-[75vh]
        w-full
        items-center
        text-white
        sm:min-h-[650px]
        md:min-h-[700px]
        md:h-[85vh]
      "
    >
      {/* Gambar Background Gedung SMKN 2 Sumedang */}
      <div className="absolute inset-0 z-0">
        <div
          className="
            h-full
            w-full
            bg-cover
            bg-center
            sm:bg-center
          "
          style={{
            backgroundImage: `url('/images/bg-sekolah.png')`,
          }}
        />

        {/* Overlay */}
        <div
          className="
            absolute
            inset-0
            z-10
            bg-gradient-to-r
            from-blue-950
            via-blue-700/90
            to-blue-900/30
            md:via-blue-600/95
            md:to-transparent
          "
        />
      </div>

      {/* Konten Teks Hero */}
      <div
        className="
          relative
          z-20
          w-full
          max-w-2xl
          space-y-5
          px-6
          sm:px-10
          md:ml-16
          md:px-8
          lg:ml-24
        "
      >
        <div className="space-y-2">
          <p
            className="
              text-lg
              font-light
              tracking-wide
              text-white
              sm:text-2xl
              md:text-4xl
            "
          >
            Selamat Datang
          </p>

          <h1
            className="
              text-4xl
              font-bold
              leading-tight
              tracking-tight
              text-white
              [text-shadow:-6px_3px_4px_rgba(0,0,0,0.25)]
              sm:text-5xl
              md:text-[60px]
              md:[text-shadow:-12px_4px_4px_rgba(0,0,0,0.25)]
            "
          >
            Gridas Ekskul
          </h1>
        </div>

        <div
          className="
            space-y-5
            text-sm
            font-light
            tracking-wide
            text-white
            sm:text-base
            md:space-y-6
            md:text-xl
          "
        >
          <p>
            Temukanlah kegiatan yang
            <br />
            sesuai dengan minat dan bakat.
          </p>

          <p>
            Bergabunglah
            <br />
            dan jadilah siswa berprestasi.
          </p>
        </div>

        {/* Tombol */}
        <div className="pt-3 sm:pt-4">
          <a
            href="#ekskul"
            className="
              inline-block
              rounded-2xl
              bg-[#1e00a3]
              px-7
              py-3
              text-sm
              font-semibold
              text-white
              shadow-md
              transition
              duration-300
              hover:bg-[#150080]
              sm:px-9
              sm:text-base
              md:px-10
            "
          >
            Lihat Ekskul
          </a>
        </div>
      </div>
    </section>
  );
}