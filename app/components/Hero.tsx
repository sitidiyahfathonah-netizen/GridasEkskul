import { Josefin_Sans } from "next/font/google";

// 🌟 CARA BENAR MEMANGGIL FONT DI NEXT.JS
// Kita ambil font Josefin Sans dengan berbagai ketebalan (dari tipis sampai tebal)
const josefin = Josefin_Sans({ 
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"]
});
export default function Hero() {
  return (
    <section 
      className="relative w-full h-[85vh] min-h-[700px] flex items-center text-white"
    >
      {/* Gambar Background Gedung SMKN 2 Sumedang */}
      <div className="absolute inset-0 z-0">
        <div 
          className="w-full h-full bg-cover bg-center"
          style={{ backgroundImage: `url('/images/bg-sekolah.png')` }}
        />
        {/* */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-950 via-blue-600/95 to-transparent z-10" />
      </div>

      {/* Konten Teks Hero */}
      <div className="relative z-20 max-w-2xl px-8 md:ml-16 space-y-6">
        <div className="space-y-2">
          <p className="text-xl md:text-4xl font-light tracking-wide text-white opacity-100">
            Selamat Datang
          </p>
          <h1 className="text-4xl md:text-[60px] font-bold tracking-tight leading-tight text-white [text-shadow:-12px_4px_4px_rgba(0,0,0,0.25)]">
            Gridas Ekskul
          </h1>
        </div>
        
        <div className="text-sm md:text-xl space-y-6 font-light tracking-wide text-white opacity-100">
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

        {/* */}
        <div className="pt-4">
          <a 
            href="#ekskul" 
            className="inline-block bg-[#1e00a3] hover:bg-[#150080] text-white font-semibold px-10 py-3 rounded-2xl transition duration-300 shadow-md"
          >
            Lihat Ekskul
          </a>
        </div>
      </div>
    </section>
  );
}