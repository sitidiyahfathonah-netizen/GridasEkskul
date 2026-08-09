"use client";

import { useState, useEffect } from "react";
import { Sidebar } from "@/components/molecules/admin";
import SearchBar from "@/components/molecules/admin/SearchBar";
import PendaftaranTable, { PendaftarData } from "@/components/molecules/admin/pendaftaran-table";
import { DeleteConfirmModal } from "@/components/organisms/admin/DeleteConfirmModal";
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

  // State untuk Modal Hapus (Custom Organism)
  const [selectedDeleteId, setSelectedDeleteId] = useState<number | string | null>(null);
  const [showDeleteSuccess, setShowDeleteSuccess] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    fetchPendaftarData();
  }, []);

  const fetchPendaftarData = async () => {
    setIsLoading(true);
    try {

      const res = await fetch(`${STRAPI_URL}/api/pendaftarans?populate=ekskul`);
      const result = await res.json();



      if (res.ok && result.data) {
        const formatted = result.data.map((item: any) => {
          const attrs = item.attributes ? item.attributes : item;
          const ekskulData = attrs.ekskul || attrs.ekskuls;
          let namaEkskul = "-";

          if (ekskulData) {
            // 1. Jika ekskulData berbentuk Array
            if (Array.isArray(ekskulData) && ekskulData.length > 0) {
              const firstEkskul = ekskulData[0];
              const eAttrs = firstEkskul.attributes || firstEkskul;
              namaEkskul = eAttrs.judul || eAttrs.nama || eAttrs.nama_ekskul || eAttrs.title || "-";
            }
            // 2. Jika ekskulData berbentuk Object
            else if (typeof ekskulData === "object") {
              const eAttrs = ekskulData.data?.attributes || ekskulData.attributes || ekskulData.data || ekskulData;
              namaEkskul = eAttrs.judul || eAttrs.nama || eAttrs.nama_ekskul || eAttrs.title || "-";
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

  // Trigger saat tombol Hapus di tabel diklik -> Buka Modal
  const handleOpenDeleteModal = (id: number | string) => {
    setSelectedDeleteId(id);
  };

  // Eksekusi Hapus saat tombol "Ya" di Modal diklik
  const handleConfirmDelete = async () => {
    if (!selectedDeleteId) return;

    setIsDeleting(true);
    try {
      const res = await fetch(`${STRAPI_URL}/api/pendaftarans/${selectedDeleteId}`, {
        method: "DELETE",

      });

      if (res.ok) {
        setSelectedDeleteId(null);
        setShowDeleteSuccess(true);
        fetchPendaftarData(); // Refresh data tabel
      } else {
        alert("Gagal menghapus data dari server.");
      }
    } catch (err) {
      console.error("Error deleting:", err);
      alert("Terjadi kesalahan koneksi.");
    } finally {
      setIsDeleting(false);
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
        {/* Header Biru Atas */}
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
            onDelete={handleOpenDeleteModal}
          />
        </div>
      </main>

      {/* Modal Custom dari Organisms */}
      <DeleteConfirmModal
        isOpen={Boolean(selectedDeleteId)}
        isSuccess={showDeleteSuccess}
        isDeleting={isDeleting}
        onConfirm={handleConfirmDelete}
        onCancel={() => setSelectedDeleteId(null)}
        onCloseSuccess={() => setShowDeleteSuccess(false)}
      />
    </div>
  );
}