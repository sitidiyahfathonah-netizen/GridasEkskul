"use client";

import { useState, useEffect } from "react";
import { Sidebar, Header, GaleriGrid } from "@/components/molecules/admin";
import SearchBar from "@/components/molecules/admin/SearchBar";
import TambahGaleriModal from "@/components/organisms/admin/tambah-galeri-modal";
import { HapusGaleriModal } from "@/components/organisms/admin/HapusGaleriModal";
import TambahGaleriSuksesModal from "@/components/organisms/admin/TambahGaleriSuksesModal";

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
  const [showSuccessTambah, setShowSuccessTambah] = useState(false);
  const [selectedItemToDelete, setSelectedItemToDelete] = useState<GaleriItem | null>(null);
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);
  const [showSuccessDelete, setShowSuccessDelete] = useState(false);

  useEffect(() => {
    fetchGaleriData();
  }, []);

  // Helper untuk mendapatkan token valid dari localStorage
  const getAuthToken = (): string | null => {
    if (typeof window === "undefined") return null;
    const keys = ["jwt", "token", "admin_token", "accessToken", "strapi_jwt"];
    for (const key of keys) {
      const val = localStorage.getItem(key);
      if (val && val !== "null" && val !== "undefined" && val.trim() !== "") {
        return val;
      }
    }
    return null;
  };

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
      // 1. Ambil token autentikasi (sesuaikan nama key localStorage kamu)
      const token = localStorage.getItem("token") || localStorage.getItem("jwt");

      // Siapkan headers
      const headers: Record<string, string> = {};
      if (token) {
        headers["Authorization"] = `Bearer ${token}`;
      }

      // 2. Upload File Gambar ke Strapi (/api/upload)
      const formData = new FormData();
      formData.append("files", file);

      const uploadRes = await fetch(`${STRAPI_URL}/api/upload`, {
        method: "POST",
        headers: headers, // Kirim Authorization jika token ada
        body: formData,
      });

      const uploadData = await uploadRes.json();

      if (!uploadRes.ok) {
        console.error("Gagal upload foto:", uploadData);
        alert(
          `Upload gagal: ${uploadData?.error?.message ||
          "Missing or invalid credentials. Cek izin Role Public/Authenticated di Strapi Settings."
          }`
        );
        return;
      }

      // Ambil ID gambar hasil upload
      const uploadedImgId = uploadData[0]?.id;
      if (!uploadedImgId) {
        alert("Gagal memproses gambar hasil upload.");
        return;
      }

      // 3. Simpan Data Galeri Baru ke Strapi
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

      const postRes = await fetch(`${STRAPI_URL}/api/galeris`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...headers,
        },
        body: JSON.stringify({ data: payloadData }),
      });

      if (postRes.ok) {
        setShowTambahModal(false);
        setShowSuccessTambah(true);
        fetchGaleriData(); // Refresh list galeri
      } else {
        const postErrData = await postRes.json();
        console.error("Gagal simpan galeri:", postErrData);
        alert(`Gagal menyimpan: ${postErrData?.error?.message || "Terjadi kesalahan"}`);
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
      const token = getAuthToken();
      const headersConfig: Record<string, string> = {
        "Content-Type": "application/json",
      };

      // Hanya sertakan token jika benar-benar ada
      if (token) {
        headersConfig["Authorization"] = `Bearer ${token}`;
      }

      const primaryId = selectedItemToDelete.documentId || selectedItemToDelete.id;

      if (!primaryId) {
        alert("Gagal menghapus: ID item tidak ditemukan.");
        return;
      }

      let res = await fetch(`${STRAPI_URL}/api/galeris/${primaryId}`, {
        method: "DELETE",
        headers: headersConfig,
      });

      // Fallback untuk versi Strapi (id vs documentId)
      if (!res.ok && selectedItemToDelete.documentId && selectedItemToDelete.id) {
        const fallbackId =
          primaryId === selectedItemToDelete.documentId
            ? selectedItemToDelete.id
            : selectedItemToDelete.documentId;

        res = await fetch(`${STRAPI_URL}/api/galeris/${fallbackId}`, {
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

        // Jika token invalid/expired (401), bersihkan token & coba sekali lagi tanpa token
        if (res.status === 401) {
          localStorage.removeItem("token");
          localStorage.removeItem("jwt");

          // Coba hapus ulang menggunakan izin Public (tanpa header Authorization)
          const retryRes = await fetch(`${STRAPI_URL}/api/galeris/${primaryId}`, {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
          });

          if (retryRes.ok) {
            setShowConfirmDelete(false);
            setShowSuccessDelete(true);
            fetchGaleriData();
            return;
          }
        }

        alert(
          `Gagal menghapus [Status ${res.status}]: ${errJson?.error?.message || "Cek console browser"
          }`
        );
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

      {/* Pop Up Sukses Tambah (Organism) */}
      <TambahGaleriSuksesModal
        show={showSuccessTambah}
        onClose={() => setShowSuccessTambah(false)}
      />

      {/* Modal Hapus & Sukses Hapus */}
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