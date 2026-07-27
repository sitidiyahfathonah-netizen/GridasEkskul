"use client";

interface GaleriItem {
  id: number;
  nama: string;
  gambar: string;
}

const dataGaleri: GaleriItem[] = [
  { id: 1, nama: "Ekskul Paskibra", gambar: "/images/Paskibra.jpeg" },
  { id: 2, nama: "English Club", gambar: "/images/english club.jpeg" },
  { id: 3, nama: "Ekskul Tatarias", gambar: "/images/Tata rias.jpeg" }, // Sesuaikan dengan nama file gambarmu
  { id: 4, nama: "Ekskul PMR", gambar: "/images/PMR.jpeg" },
  { id: 5, nama: "Ekskul Pramuka", gambar: "/images/pramuka.jpeg" },
  { id: 6, nama: "Ekskul Futsal", gambar: "/images/Futsal.jpeg" },
  { id: 7, nama: "Ekskul drumband", gambar: "/images/drumband.jpeg" },
  { id: 8, nama: "Ekskul Photography", gambar: "/images/Photography.jpeg" },
  { id: 9, nama: "Ekskul Silat", gambar: "/images/Silat.jpeg" },
  { id: 10, nama: "Ekskul Tari", gambar: "/images/Tari.jpeg" },
  { id: 11, nama: "Ekskul Basket", gambar: "/images/Basket.jpeg" },
  { id: 12, nama: "Ekskul Coding", gambar: "/images/coding.jpeg" },
  { id: 13, nama: "Ekskul Drumband", gambar: "/images/db1.jpeg" },
  { id: 14, nama: "Ekskul Drumband", gambar: "/images/db2.jpeg" },
  { id: 15, nama: "Ekskul Drumband", gambar: "/images/db3.jpeg" },
  
  
];

export  function Galeri() {
  return (
    <section className="w-full min-h-screen bg-white py-16 px-6 md:px-16 text-slate-800">
      <div className="max-w-5xl mx-auto space-y-10">
        
        {/* LOGO & HEADER SEKOLAH (Pojok Kiri Atas) */}
        <div className="flex items-center space-x-3 text-xs md:text-sm font-bold text-slate-700 tracking-wider">
          <div className="w-8 h-8 flex items-center justify-center text-white text-[10px]">
            <img 
                      src="/images/logo skolah.jpeg" 
                      alt="Logo SMKN 2 Sumedang" 
                      width={40} 
                      height={40} 
                      className="object-contain"
                    />
          </div>
          <span >SMK NEGERI 2 SUMEDANG</span>
        </div>

        {/* JUDUL UTAMA GALERI */}
        <div className="space-y-2 text-left">
          <h1 className="text-4xl md:text-5xl font-black text-[#1e3a8a] tracking-tight">
            Galeri Ekskul
          </h1>
          <p className="text-sm md:text-base text-slate-500 font-medium">
            Setiap kegiatan pasti ada kenangan nya ...
          </p>
        </div>

        {/* GRID FOTO MASONRY STYLE */}
        <div className="columns-1 sm:columns-2 gap-6 space-y-6 pt-4">
          {dataGaleri.map((item) => (
            <div 
              key={item.id} 
              className="break-inside-avoid relative rounded-3xl overflow-hidden shadow-md group border border-slate-100 bg-slate-50"
            >
              {/* Image Container */}
              <img 
                src={item.gambar} 
                alt={item.nama}
                className="w-full h-auto object-cover  transition-transform duration-500 group-hover:scale-105"
              />
              
              {/* Overlay Efek Gelap Gradasi Semu */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80" />
              
              {/* Label Nama Ekskul di Kiri Bawah */}
              <div className="absolute bottom-4 left-5 text-white font-bold text-sm md:text-base drop-shadow-sm">
                {item.nama}
              </div>
            </div>
          ))}

        </div>
          <div className=" w-full flex items-center justify-between px-6 py-4 bg-white shadow-sm md:px-16 sticky top-0 z-50 text-gray-800">
          <div className="flex items-center space-x-3 cursor-pointer">
          <span className="font-bold text-sky-800 tracking-wide text-xs md:text-sm">
          SMK NEGERI 2 SUMEDANG
        </span>
      </div>
      </div>

      </div>
    </section>
  );
}