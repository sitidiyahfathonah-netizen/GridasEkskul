"use client";

import { useState, useEffect } from "react";
import { Sidebar, Header, GaleriGrid } from "@/components/molecules/admin";
import SearchBar from "@/components/molecules/admin/SearchBar";
import TambahGaleriModal from "@/components/organisms/admin/tambah-galeri-modal";
import { HapusGaleriModal } from "@/components/organisms/admin/HapusGaleriModal";

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";

export interface GaleriItem {
  id: number;
  documentId?: string;
  nama: string;
  image: string;
}

export default function AdminGaleriPage() {
  const [galeriList, setGaleriList] = useState<GaleriItem[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  // State Modals
  const [showTambahModal, setShowTambahModal] = useState(false);
  const [selectedItemToDelete, setSelectedItemToDelete] = useState<GaleriItem | null>(null);
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);
  const [showSuccessDelete, setShowSuccessDelete] = useState(false);

  useEffect(() => {
    fetchGaleriData();
  }, []);

  const fetchGaleriData = async () => {
    try {
      const res = await fetch(`${STRAPI_URL}/api/galeris?populate=*`);
      const result = await res.json();

      if (res.ok && result.data) {
        const formatted = result.data.map((item: any) => {
          let imgUrl = "/images/tatarias.jpeg";
          const fotoObj = item.foto || item.gambar || item.foto_utama;

          if (fotoObj) {
            const mediaObj = Array.isArray(fotoObj) ? fotoObj[0] : fotoObj;
            const path = mediaObj?.url || mediaObj?.attributes?.url;
            if (path) {
              imgUrl = path.startsWith("http") ? path : `${STRAPI_URL}${path}`;
            }
          }

          return {
            id: item.id,
            documentId: item.documentId,
            nama: item.nama_ekskul || item.nama || item.ekskul?.nama_ekskul || "Galeri Ekskul",
            image: imgUrl,
          };
        });

        setGaleriList(formatted);
      }
    } catch (err) {
      console.error("Gagal load galeri:", err);
    }
  };

  // Handler Tambah Galeri Baru
  const handleSimpan = async (
    namaEskul: string,
    deskripsi: string,
    file: File | null
  ) => {
    if (!file) {
      alert("Harap pilih foto terlebih dahulu!");
      return;
    }

    try {
      // 1. Ambil Token JWT dari localStorage
      const token = localStorage.getItem("admin_token") || localStorage.getItem("jwt") || localStorage.getItem("token");

      // Validasi ketersediaan token
      if (!token || token === "null" || token === "undefined") {
        alert("Sesi login kamu tidak ditemukan atau telah berakhir. Silakan re-login terlebih dahulu.");
        return;
      }

      const headersConfig: HeadersInit = {
        Authorization: `Bearer ${token}`,
      };

      // 2. Upload File Foto ke Strapi
      const formData = new FormData();
      formData.append("files", file);

      const uploadRes = await fetch(`${STRAPI_URL}/api/upload`, {
        method: "POST",
        headers: headersConfig,
        body: formData,
      });

      const uploadData = await uploadRes.json();

      if (!uploadRes.ok) {
        console.error("Gagal upload foto:", uploadData);
        alert(`Upload gagal: ${uploadData?.error?.message || "Cek izin role Authenticated di Strapi"}`);
        return;
      }

      const uploadedImgId = uploadData[0]?.id;

      if (!uploadedImgId) {
        alert("Gagal memproses gambar.");
        return;
      }

      // 3. Simpan Data ke Content-Type 'galeris'
      const res = await fetch(`${STRAPI_URL}/api/galeris`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...headersConfig,
        },
        body: JSON.stringify({
          data: {
            nama_ekskul: namaEskul,
            deskripsi: deskripsi,
            foto: uploadedImgId,
          },
        }),
      });

      if (res.ok) {
        setShowTambahModal(false);
        fetchGaleriData();
      } else {
        const resData = await res.json();
        console.error("Gagal simpan galeri:", resData);
        alert(`Gagal menyimpan: ${resData?.error?.message || "Periksa skema field Strapi"}`);
      }
    } catch (err) {
      console.error("Error jaringan/server:", err);
      alert("Terjadi kesalahan koneksi ke server.");
    }
  };

  // Handler Hapus Galeri
  const handleHapusData = async () => {
    if (!selectedItemToDelete) return;

    try {
      const token = localStorage.getItem("admin_token") || localStorage.getItem("token");
      const headersConfig: HeadersInit = token
        ? { Authorization: `Bearer ${token}` }
        : {};

      const targetId = selectedItemToDelete.documentId || selectedItemToDelete.id;

      const res = await fetch(`${STRAPI_URL}/api/galeris/${targetId}`, {
        method: "DELETE",
        headers: headersConfig,
      });

      if (res.ok) {
        setShowConfirmDelete(false);
        setShowSuccessDelete(true);
        fetchGaleriData();
      } else {
        alert("Gagal menghapus data dari server.");
      }
    } catch (err) {
      console.error("Gagal menghapus foto:", err);
    }
  };

  const filteredGaleri = galeriList.filter((item) =>
    item.nama.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex w-full min-h-screen bg-[#F5F7FA]">
      <Sidebar />

      <main className="flex-1 flex flex-col min-w-0">
        <Header onTambahClick={() => setShowTambahModal(true)} />

        <div className="p-6 md:p-8 space-y-6 flex-1 overflow-y-auto">
          <SearchBar
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />

          <GaleriGrid
            items={filteredGaleri}
            onCardClick={(item: GaleriItem) => {
              setSelectedItemToDelete(item);
              setShowConfirmDelete(true);
            }}
          />
        </div>
      </main>

      {/* Modal Tambah */}
      {showTambahModal && (
        <TambahGaleriModal
          onClose={() => setShowTambahModal(false)}
          onSave={handleSimpan}
        />
      )}

      {/* Modal Hapus & Sukses */}
      <HapusGaleriModal
        showConfirm={showConfirmDelete}
        showSuccess={showSuccessDelete}
        onConfirm={handleHapusData}
        onCancel={() => setShowConfirmDelete(false)}
        onCloseSuccess={() => setShowSuccessDelete(false)}
      />
    </div>
  );
}