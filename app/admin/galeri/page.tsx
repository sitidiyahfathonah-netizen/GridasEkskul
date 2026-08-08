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
          const attrs = item.attributes || item;
          let imgUrl = "/images/tatarias.jpeg";
          const fotoObj = attrs.foto || attrs.gambar || attrs.foto_utama;

          if (fotoObj) {
            const mediaObj = Array.isArray(fotoObj) ? fotoObj[0] : fotoObj;
            const path = mediaObj?.url || mediaObj?.attributes?.url;
            if (path) {
              imgUrl = path.startsWith("http") ? path : `${STRAPI_URL}${path}`;
            }
          }

          // Parsing Nama Ekskul dari Relation Strapi atau pemecahan judul_kegiatan
          const ekskulData = attrs.ekskul || attrs.ekskuls;
          let namaEkskul =
            ekskulData?.nama_ekskul ||
            ekskulData?.attributes?.nama_ekskul ||
            ekskulData?.data?.attributes?.nama_ekskul ||
            (Array.isArray(ekskulData) ? ekskulData[0]?.nama_ekskul || ekskulData[0]?.attributes?.nama_ekskul : null) ||
            attrs.nama_ekskul ||
            attrs.nama;

          // Ekstrak nama ekskul jika judul_kegiatan menggunakan format "Ekskul - Deskripsi"
          const rawJudul = attrs.judul_kegiatan || "";
          if (!namaEkskul && rawJudul.includes("-")) {
            namaEkskul = rawJudul.split("-")[0].trim();
          }

          return {
            id: item.id,
            documentId: item.documentId,
            nama: namaEkskul || "Lainnya",
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
    namaEskul: string | number,
    deskripsi: string,
    file: File | null
  ) => {
    if (!file) {
      alert("Harap pilih foto terlebih dahulu!");
      return;
    }

    try {
      // 1. Ambil Token JWT dari localStorage
      const token =
        localStorage.getItem("admin_token") ||
        localStorage.getItem("token") ||
        localStorage.getItem("jwt") ||
        localStorage.getItem("accessToken");

      const headersConfig: Record<string, string> = {};

      if (token && token !== "null" && token !== "undefined") {
        headersConfig["Authorization"] = `Bearer ${token}`;
      }

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
        alert(`Upload gagal: ${uploadData?.error?.message || "Cek izin role Public/Authenticated di Strapi"}`);
        return;
      }

      const uploadedImgId = uploadData[0]?.id;

      if (!uploadedImgId) {
        alert("Gagal memproses gambar.");
        return;
      }

      // 3. Menyiapkan Payload
      const payloadData: Record<string, any> = {
        judul_kegiatan:
          typeof namaEskul === "number" || !isNaN(Number(namaEskul))
            ? deskripsi
            : `${namaEskul} - ${deskripsi}`,
        foto: uploadedImgId,
      };

      if (typeof namaEskul === "number" || !isNaN(Number(namaEskul))) {
        payloadData.ekskul = Number(namaEskul);
      }

      const res = await fetch(`${STRAPI_URL}/api/galeris`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...headersConfig,
        },
        body: JSON.stringify({ data: payloadData }),
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

  // Handler Hapus Galeri (Diperbaiki)
  const handleHapusData = async () => {
    if (!selectedItemToDelete) return;

    try {
      // Ambil token dari berbagai variasi nama key localStorage
      const token =
        localStorage.getItem("admin_token") ||
        localStorage.getItem("token") ||
        localStorage.getItem("jwt") ||
        localStorage.getItem("accessToken");

      const headersConfig: Record<string, string> = {
        "Content-Type": "application/json",
      };

      if (token && token !== "null" && token !== "undefined") {
        headersConfig["Authorization"] = `Bearer ${token}`;
      }

      // Prioritaskan documentId (Strapi v5), fallback ke id angka (Strapi v4)
      const targetId = selectedItemToDelete.documentId || selectedItemToDelete.id;

      let res = await fetch(`${STRAPI_URL}/api/galeris/${targetId}`, {
        method: "DELETE",
        headers: headersConfig,
      });

      // Jika mencoba documentId gagal, coba hapus menggunakan numeric ID
      if (!res.ok && selectedItemToDelete.documentId && selectedItemToDelete.id) {
        res = await fetch(`${STRAPI_URL}/api/galeris/${selectedItemToDelete.id}`, {
          method: "DELETE",
          headers: headersConfig,
        });
      }

      if (res.ok) {
        setShowConfirmDelete(false);
        setShowSuccessDelete(true);
        fetchGaleriData();
      } else {
        const errJson = await res.json().catch(() => ({}));
        console.error("Error Hapus Strapi:", res.status, errJson);

        // Memberikan info penyebab error yang spesifik
        if (res.status === 403) {
          alert("Gagal menghapus (403 Forbidden): Pastikan izin 'delete' untuk Galeri sudah di-centang juga di Settings > Roles > Public di Strapi.");
        } else {
          alert(`Gagal menghapus data dari server [Status ${res.status}]: ${errJson?.error?.message || "Cek console browser"}`);
        }
      }
    } catch (err) {
      console.error("Gagal menghapus foto:", err);
      alert("Terjadi kesalahan koneksi saat menghapus data.");
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