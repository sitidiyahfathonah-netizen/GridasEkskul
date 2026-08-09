"use client";

import { useState, useEffect } from "react";
import { Sidebar } from "@/components/molecules/admin";
import SearchBar from "@/components/molecules/admin/SearchBar";
import PendaftaranTable, { PendaftarData } from "@/components/molecules/admin/pendaftaran-table";
import { Josefin_Sans } from "next/font/google";

const josefin = Josefin_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"]
});

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";

export default function PendaftaranAdminPage() {
  const [pendaftarList, setPendaftarList] = useState<PendaftarData[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchPendaftarData();
  }, []);

  const fetchPendaftarData = async () => {
    setIsLoading(true);
    try {
      // Tembak API tanpa menyertakan Authorization Header
      const res = await fetch(`${STRAPI_URL}/api/pendaftarans?populate=*`);
      const result = await res.json();

      console.log("Data dari Strapi:", result);

      if (res.ok && result.data) {
        const formatted = result.data.map((item: any) => {
          const attrs = item.attributes ? item.attributes : item;
          const ekskulData = attrs.ekskul || attrs.ekskuls;
          let namaEkskul = "-";

          if (ekskulData) {
            if (Array.isArray(ekskulData) && ekskulData.length > 0) {
              namaEkskul = ekskulData[0]?.nama_ekskul || ekskulData[0]?.attributes?.nama_ekskul || "-";
            } else if (typeof ekskulData === "object") {
              namaEkskul = ekskulData?.nama_ekskul || ekskulData?.data?.attributes?.nama_ekskul || "-";
            }
          }

          return {
            id: item.id,
            documentId: item.documentId || item.id,
            nama: attrs.nama || "-",
            kelas: attrs.kelas || "-",
            jurusan: attrs.jurusan || "-",
            ekskul: namaEkskul,
            no_telp: attrs.no_telp || attrs.no_hp || "-",
          };
        });

        setPendaftarList(formatted);
      }
    } catch (err) {
      console.error("Gagal memuat data pendaftar:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeletePendaftar = async (id: number | string) => {
    if (!confirm("Apakah Anda yakin ingin menghapus data pendaftar ini?")) return;

    try {
      const res = await fetch(`${STRAPI_URL}/api/pendaftarans/${id}`, {
        method: "DELETE",
        // Jangan pakai Authorization header jika menggunakan izin Public
      });

      if (res.ok) {
        alert("Data berhasil dihapus!");
        fetchPendaftarData(); // Refresh list
      } else {
        const errJson = await res.json().catch(() => ({}));
        alert(`Gagal menghapus: ${errJson?.error?.message || "Terjadi kesalahan"}`);
      }
    } catch (err) {
      console.error("Error deleting:", err);
      alert("Gagal terhubung ke server.");
    }
  };

  const filteredList = pendaftarList.filter(
    (item) =>
      item.nama.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.ekskul.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.jurusan.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex w-full min-h-screen bg-[#F5F7FA]">
      <Sidebar />

      <main className="flex-1 flex-col min-w-0">
        {/* Header Biru Atas (Presisi seperti Figma) */}
        <div className="bg-[#00598a] w-full py-8 px-5">
          <h1 className={`text-3xl md:text-4xl font-extrabold text-white tracking-wider ${josefin.className}`}>
            PENDAFTAR
          </h1>
        </div>

        {/* Area Konten Utama (Search & Tabel) */}
        <div className="p-6 md:p-8 space-y-6 flex-1 overflow-y-auto">
          <SearchBar
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />

          <PendaftaranTable
            list={filteredList}
            isLoading={isLoading}
            onDelete={handleDeletePendaftar}
          />
        </div>
      </main>
    </div>
  );
}