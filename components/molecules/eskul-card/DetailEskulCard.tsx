"use client";

import { Josefin_Sans } from "next/font/google";
import { useRouter } from "next/navigation";

// Pemanggil Font
const josefin = Josefin_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

interface DetailEskulProps {
  eskul: any | null;
  onBack: () => void;
  onJoin?: () => void;
}

export function DetailEskulCard({
  eskul,
  onBack,
  onJoin,
}: DetailEskulProps) {
  if (!eskul) return null;

  console.log(eskul);

  const router = useRouter();

  // Mapping field dari skema Strapi v5
  const nama = eskul.nama_ekskul || "";

  const jadwal =
    eskul.jadwal ||
    eskul.jadwal_pelaksanaan ||
    eskul.waktu ||
    "Belum diatur";

  const tempat =
    eskul.tempat ||
    eskul.tempat_pelaksanaan ||
    eskul.lokasi ||
    "Belum diatur";

  const hari = eskul.hari || "Belum diatur";

  const kata_ajakan =
    eskul.kata_ajakan ||
    eskul.attributes?.kata_ajakan ||
    "belum diatur";

  // Helper mengambil URL gambar dari Strapi
  const getStrapiMediaUrl = (media: any) => {
    if (!media) return null;

    const item = Array.isArray(media)
      ? media[0]
      : media;

    const rawUrl =
      item?.url ||
      item?.attributes?.url ||
      item?.data?.attributes?.url ||
      item?.data?.url;

    if (!rawUrl) return null;

    if (
      rawUrl.startsWith("http://") ||
      rawUrl.startsWith("https://")
    ) {
      return rawUrl;
    }

    return `http://localhost:1337${rawUrl}`;
  };

  // Mengambil foto dari Strapi
  const fotoUtamaUrl =
    getStrapiMediaUrl(eskul.foto_utama) || "";

  const fotoPrestasiUrl =
    getStrapiMediaUrl(eskul.foto_prestasi);

  // Menentukan apakah bagian prestasi ditampilkan
  const punyaPrestasi = Boolean(
    fotoPrestasiUrl || eskul.prestasi
  );

  // Mengubah Blocks Strapi menjadi teks
  const renderDeskripsi = () => {
    const rawDeskripsi = eskul.deskripsi;

    if (!rawDeskripsi) {
      return "Belum ada deskripsi.";
    }

    if (typeof rawDeskripsi === "string") {
      return rawDeskripsi;
    }

    if (Array.isArray(rawDeskripsi)) {
      return rawDeskripsi
        .map((block: any) => {
          if (
            block.children &&
            Array.isArray(block.children)
          ) {
            return block.children
              .map((child: any) => child.text)
              .join("");
          }

          return "";
        })
        .join("\n");
    }

    return "Format deskripsi tidak didukung.";
  };

  return (
    <section
      className={`
        relative
        flex
        min-h-screen
        w-full
        items-start
        justify-center
        overflow-hidden
        bg-[#6B424D]/10
        px-3
        py-4
        sm:px-5
        sm:py-8
        md:items-center
        md:px-8
        md:py-12
        ${josefin.className}
      `}
    >
      {/* BACKGROUND */}
      <div className="absolute inset-0 z-0">
        <div
          className="
            h-full
            w-full
            bg-cover
            bg-center
            opacity-80
          "
          style={{
            backgroundImage:
              "url('/images/bgdetail.jpg')",
          }}
        />

        <div className="absolute inset-0 bg-gradient-to-b from-white/20 to-sky-100/30" />
      </div>

      {/* CARD UTAMA */}
      <div
        className="
          relative
          z-20
          flex
          w-full
          max-w-sm
          flex-col
          overflow-hidden
          rounded-[24px]
          border
          border-slate-100
          bg-white
          shadow-[0_20px_50px_rgba(0,0,0,0.15)]

          sm:max-w-xl
          sm:rounded-[32px]

          md:max-w-2xl
          md:rounded-[40px]

          lg:max-w-4xl
        "
      >
        {/* HEADER */}
        <div
          className="
            sticky
            top-0
            z-30
            flex
            items-center
            justify-between
            border-b
            border-slate-100
            bg-white
            px-4
            py-4

            sm:px-6
            sm:py-5

            md:px-8
            md:py-6
          "
        >
          {/* Tombol kembali */}
          <button
            onClick={onBack}
            className="
              flex
              items-center
              gap-1
              text-xs
              font-bold
              text-slate-400
              transition

              hover:text-slate-600

              sm:text-sm
            "
          >
            <span>←</span>
          </button>

          {/* Nama ekskul */}
          <div
            className="
              max-w-[150px]
              truncate
              rounded-full
              bg-sky-100
              px-3
              py-1.5

              sm:max-w-[250px]
              sm:px-5
            "
          >
            <span
              className="
                block
                truncate
                text-center
                text-xs
                font-bold
                uppercase
                tracking-wide
                text-sky-800

                sm:text-sm
              "
            >
              {nama}
            </span>
          </div>

          {/* Logo teks */}
          <span
            className="
              text-[9px]
              font-bold
              tracking-widest
              text-slate-300

              sm:text-xs
            "
          >
            GRIDAS
          </span>
        </div>

        {/* ISI CARD */}
        <div
          className="
            flex-1
            space-y-5
            p-4

            sm:space-y-6
            sm:p-6

            md:p-8
          "
        >
          {/* FOTO DAN INFORMASI */}
          <div
            className="
              grid
              grid-cols-1
              gap-4

              sm:grid-cols-2

              md:gap-6
            "
          >
            {/* Foto utama */}
            <div
              className="
                h-48
                w-full
                rounded-2xl
                border
                border-slate-100
                bg-slate-100
                bg-cover
                bg-center
                shadow-sm

                sm:h-56
                sm:rounded-3xl

                md:h-64
              "
              style={{
                backgroundImage:
                  `url(${fotoUtamaUrl})`,
              }}
            />

            {/* Informasi */}
            <div
              className="
                flex
                flex-col
                justify-between
                gap-4
                rounded-2xl
                bg-sky-100
                p-4
                text-xs
                text-slate-700

                sm:rounded-3xl
                sm:p-5

                md:text-sm
              "
            >
              <div>
                <span className="mb-1 block font-bold text-sky-800">
                  Jadwal Pelaksanaan:
                </span>

                <p className="break-words">
                  {jadwal}
                </p>
              </div>

              <div>
                <span className="mb-1 block font-bold text-[#00598A]">
                  Tempat Pelaksanaan:
                </span>

                <p className="break-words">
                  {tempat}
                </p>
              </div>

              <div>
                <span className="mb-1 block font-bold text-[#00598A]">
                  Hari:
                </span>

                <p className="break-words">
                  {hari}
                </p>
              </div>
            </div>
          </div>

          {/* DESKRIPSI */}
          <div
            className="
              rounded-2xl
              border
              border-sky-100/50
              bg-sky-100
              p-4

              sm:p-5

              md:p-6
            "
          >
            <p
              className="
                whitespace-pre-line
                break-words
                text-center
                font-sans
                text-xs
                leading-relaxed
                text-slate-600

                sm:text-sm

                md:text-base
              "
            >
              {renderDeskripsi()}
            </p>
          </div>

          {/* PRESTASI */}
          {punyaPrestasi && (
            <div
              className="
                flex
                flex-col
                items-center
                space-y-4
                py-2

                sm:space-y-5
              "
            >
              {/* Judul */}
              <div className="text-center">
                <h1
                  className="
                    text-xl
                    font-bold
                    tracking-tight
                    text-[#00598A]

                    sm:text-2xl

                    md:text-3xl
                  "
                >
                  Prestasi
                </h1>

                <h1
                  className="
                    -mt-1
                    text-xl
                    font-bold
                    tracking-tight
                    text-[#00598A]

                    sm:text-2xl

                    md:text-3xl
                  "
                >
                  Ekstrakurikuler
                </h1>
              </div>

              {/* Foto prestasi */}
              {fotoPrestasiUrl && (
                <div
                  className="
                    w-full
                    overflow-hidden
                    rounded-2xl
                    border
                    border-slate-100
                    bg-slate-100
                    shadow-md
                  "
                >
                  <img
                    src={fotoPrestasiUrl}
                    alt="Foto Prestasi"
                    className="
                      h-auto
                      w-full
                      object-contain
                    "
                  />
                </div>
              )}

              {/* Teks prestasi */}
              {eskul.prestasi && (
                <div
                  className="
                    w-full
                    px-2
                    text-center
                  "
                >
                  <div
                    className="
                      mx-auto
                      max-w-2xl
                      whitespace-pre-line
                      break-words
                      text-xs
                      font-bold
                      leading-relaxed
                      text-[#00598A]

                      sm:text-sm

                      md:text-base
                    "
                  >
                    {eskul.prestasi}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* BAGIAN GABUNG */}
          <div
            className="
              mt-auto
              space-y-4
              bg-gradient-to-t
              from-slate-50
              to-white
              pt-4
              text-center

              sm:pt-6
            "
          >
            {/* Kata ajakan */}
            <p
              className="
                break-words
                px-1
                text-xs
                text-slate-700

                sm:text-sm

                md:text-base
              "
            >
              {kata_ajakan}
            </p>

            {/* Tombol gabung */}
            <button
              onClick={() => {
                onJoin?.();

                router.push("/daftar");
              }}
              className="
                w-full
                rounded-xl
                bg-[#1E00A3]
                px-5
                py-3
                text-sm
                font-bold
                tracking-wide
                text-white
                shadow-lg
                transition
                duration-200

                hover:bg-[#150080]

                active:scale-[0.99]

                sm:rounded-2xl
                sm:py-3.5
                sm:text-base
              "
            >
              Gabung
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}