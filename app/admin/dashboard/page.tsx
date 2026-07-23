"use client";

import Image from "next/image";
import Link from "next/link";

export default function DashboardPage() {
  const data = [
    {
      id: 1,
      nama: "Tatarias",
      deskripsi:
        "Ekstrakurikuler Tata Rias bertujuan mengembangkan keterampilan merias.",
      jadwal: "Selasa\n15.00 - 17.00",
      foto: "/images/tatarias.jpeg",
    },
    {
      id: 2,
      nama: "Pramuka",
      deskripsi:
        "Ekstrakurikuler Pramuka membentuk karakter disiplin dan kepemimpinan.",
      jadwal: "Rabu\n15.00 - 17.00",
      foto: "/images/pramuka.jpeg",
    },
    {
      id: 3,
      nama: "Paskibra",
      deskripsi:
        "Ekstrakurikuler Paskibra membentuk karakter disiplin dan tanggung jawab.",
      jadwal: "Kamis\n15.00 - 17.00",
      foto: "/images/Paskibra.jpeg",
    },
    {
      id: 4,
      nama: "Basket",
      deskripsi:
        "Mengembangkan kemampuan bermain basket dan sportivitas.",
      jadwal: "Jumat\n15.00 - 17.00",
      foto: "/images/basket.jpeg",
    },
  ];

  return (
    <div className="flex w-full min-h-screen bg-white">

      {/* ================= SIDEBAR ================= */}

      <aside className="w-72 bg-[#00598A] text-white flex flex-col">

        <div className="flex justify-center py-8 border-b border-white/20">
          <Image
            src="/images/logo skolah.jpeg"
            alt="Logo"
            width={110}
            height={110}/>
        </div>

        <nav className="flex-1 mt-8">

          <Link href="/admin/dashboard" className="block px-10 py-4 bg-white/10 font-semibold">
            Eskul
          </Link>

          <Link href="/admin/galeri" className="block px-10 py-4 hover:bg-white/10  text-sky-900">
            Galeri
          </Link>

          <Link href="/admin/pendaftaran" className="block px-10 py-4 hover:bg-white/10  text-sky-900">
            Riwayat Pendaftaran
          </Link>
        </nav>
      </aside>

      {/* ================= CONTENT ================= */}

      <main className="flex-1 flex flex-col">

        {/* HEADER */}

        <header className="h-20 bg-[#00598A] flex items-center justify-between px-10">
          <h1 className="text-3xl font-bold text-white tracking-wide">
            GRIDAS EKSKUL
          </h1>
          <button className="bg-[#32D74B] hover:bg-green-500 text-white font-bold px-8 py-3 rounded-xl">
            Tambah
          </button>
        </header>

        {/* TABLE */}

        <div className="p-8 overflow-auto">

          <table className="w-full border-separate border-spacing-y-5">

            <thead>

              <tr className="text-left text-[#00598A] text-lg">

                <th>Foto</th>
                <th>Nama</th>
                <th>Deskripsi</th>
                <th>Jadwal</th>
                <th className="text-center">Aksi</th>
              </tr>

            </thead>

            <tbody>
              {data.map((item) => (

                <tr
                  key={item.id}
                  className="bg-white shadow rounded-xl">
                  <td className="p-4">

                    <Image
                      src={item.foto}
                      alt={item.nama}
                      width={120}
                      height={70}
                      className="rounded-lg object-cover"/>
                  </td>

                  <td className="font-bold text-gray-600">
                    {item.nama}
                  </td>

                  <td className="w-[420px] text-gray-600">
                    {item.deskripsi}
                  </td>

                  <td className="font-bold text-gray-600 whitespace-pre-line">
                    {item.jadwal}
                  </td>

                  <td>

                    <div className="flex justify-center gap-3">

                      <button className="bg-[#163FA8] text-white px-5 py-2 rounded-lg hover:bg-blue-800">
                        Edit
                      </button>

                      <button className="bg-red-500 text-white px-5 py-2 rounded-lg hover:bg-red-600">
                        Hapus
                      </button>

                    </div>
                  </td>
                </tr>
              ))}

            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}