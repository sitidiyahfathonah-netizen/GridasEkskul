"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Josefin_Sans } from "next/font/google";

import Sidebar from "@/components/molecules/admin/sidebar";
import Header from "@/components/molecules/admin/header";
import SearchBar from "@/components/molecules/admin/SearchBar";

import { EskulTable } from "@/components/organisms/admin/Eskul-Table";
import { TambahModal } from "@/components/organisms/admin/TambahModal";
import { EditModal } from "@/components/organisms/admin/EditModal";
import { DeleteModal } from "@/components/organisms/admin/DeleteModal";

const josefin = Josefin_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";

export interface EskulItem {
  id: number;
  documentId?: string;
  nama: string;
  deskripsi: string;
  hari?: string;
  jadwal_pelaksanaan: string;
  foto: string;
  tempat_pelaksanaan?: string;
  deskripsi_singkat?: string;
  kata_ajakan?: string;
  prestasi?: string;
  deskripsi_prestasi?: string;
  foto_prestasi?: string;

}

// Helper untuk mengambil token bersih tanpa tanda petik ganda
function getCleanToken(): string {
  if (typeof window === "undefined") return "";
  const token = localStorage.getItem("admin_token") || "";
  return token.replace(/^"(.*)"$/, "$1").trim();
}

function extractRichText(content: any): string {
  if (!content) return "";
  if (typeof content === "string") return content;
  if (Array.isArray(content)) {
    return content
      .map((block) => {
        if (block.children && Array.isArray(block.children)) {
          return block.children.map((child: any) => child.text || "").join("");
        }
        return "";
      })
      .filter(Boolean)
      .join("\n");
  }
  return "";
}

export default function DashboardPage() {
  const router = useRouter();
  const [dataEskul, setDataEskul] = useState<EskulItem[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [openTambah, setOpenTambah] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [itemToEdit, setItemToEdit] = useState<EskulItem | null>(null);
  const [openDelete, setOpenDelete] = useState(false);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [highlightedId, setHighlightedId] = useState<number | null>(null);

  useEffect(() => {
    const token = getCleanToken();
    if (!token) {
      router.push("/admin/login");
      return;
    }
    fetchData();
  }, [router]);

  const fetchData = async () => {
    try {
      const token = getCleanToken();
      const res = await fetch(`${STRAPI_URL}/api/ekskuls?populate=*`, {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });

      if (res.status === 401) {
        alert("Sesi login Anda telah berakhir. Silakan login kembali.");
        localStorage.removeItem("admin_token");
        router.push("/admin/login");
        return;
      }

      const result = await res.json();

      if (res.ok && result.data) {
        const formatted = result.data.map((item: any) => {
          let imgUrl = "/images/tatarias.jpeg";
          const fotoData = item.foto_utama || item.foto || item.gambar;
          const fotoPrestasiData = item.foto_prestasi;

          let fotoPrestasiUrl = "";
          if (fotoPrestasiData) {
            const mediaObj = Array.isArray(fotoPrestasiData)
              ? fotoPrestasiData[0]
              : fotoPrestasiData.data
                ? fotoPrestasiData.data
                : fotoPrestasiData;

            const path =
              mediaObj?.attributes?.url ||
              mediaObj?.url ||
              mediaObj?.formats?.medium?.url ||
              mediaObj?.formats?.thumbnail?.url;

            if (path) {
              fotoPrestasiUrl = path.startsWith("http")
                ? path
                : `${STRAPI_URL}${path}`;
            }
          }

          if (fotoData) {
            const mediaObj = Array.isArray(fotoData)
              ? fotoData[0]
              : fotoData.data
                ? fotoData.data
                : fotoData;

            const path =
              mediaObj?.attributes?.url ||
              mediaObj?.url ||
              mediaObj?.formats?.medium?.url ||
              mediaObj?.formats?.thumbnail?.url;

            if (path) {
              imgUrl = path.startsWith("http") ? path : `${STRAPI_URL}${path}`;
            }
          }

          return {
            id: item.id,
            documentId: item.documentId,
            nama: item.nama_ekskul || item.nama || "",
            deskripsi: extractRichText(item.deskripsi),
            jadwal_pelaksanaan: extractRichText(item.jadwal_pelaksanaan) || item.jadwal_pelaksanaan || "-",
            tempat_pelaksanaan: item.tempat_pelaksanaan || "",
            hari: item.hari || "",
            deskripsi_singkat: extractRichText(item.deskripsi_singkat) || item.deskripsi_singkat || "",
            kata_ajakan: extractRichText(item.kata_ajakan) || item.kata_ajakan || "",
            prestasi: extractRichText(item.prestasi) || item.prestasi || "",
            deskripsi_prestasi: extractRichText(item.deskripsi_prestasi) || item.deskripsi_prestasi || "",
            foto: imgUrl,
            foto_prestasi: fotoPrestasiUrl,
          };
        });

        // Hapus duplikat data jika Strapi mengembalikan versi Draft & Published bersamaan
        const uniqueData = Array.from(
          new Map(formatted.map((item: any) => [item.documentId || item.id, item])).values()
        );

        setDataEskul(uniqueData as EskulItem[]);
      }
    } catch (err) {
      console.error("Gagal load data:", err);
    }
  };

  const handleTambah = async (newItem: Omit<EskulItem, "id">, file?: File | null, prestasiFile?: File | null) => {
    const token = getCleanToken();
    let uploadedImgId = null;
    let uploadedPrestasiImgId = null;

    if (file) {
      const formData = new FormData();
      formData.append("files", file);

      const uploadRes = await fetch(`${STRAPI_URL}/api/upload`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });

      if (uploadRes.ok) {
        const uploadData = await uploadRes.json();
        uploadedImgId = uploadData[0]?.id;
      } else {
        const errData = await uploadRes.json();
        console.error("Upload error:", errData);
        alert(`Gagal mengupload foto: ${errData?.error?.message || "Kesalahan server Strapi"}`);
        return;
      }
    }

    if (prestasiFile) {
      const formData = new FormData();
      formData.append("files", prestasiFile);

      const uploadPrestasiRes = await fetch(`${STRAPI_URL}/api/upload`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (uploadPrestasiRes.ok) {
        const uploadData = await uploadPrestasiRes.json();
        uploadedPrestasiImgId = uploadData[0]?.id;
      } else {
        const errData = await uploadPrestasiRes.json();
        console.error("Upload foto prestasi error:", errData);
        alert(
          `Gagal mengupload foto prestasi: ${errData?.error?.message || "Kesalahan server Strapi"
          }`
        );
        return;
      }
    }

    const payloadPlain = {
      nama_ekskul: newItem.nama,
      deskripsi: newItem.deskripsi,
      deskripsi_singkat: newItem.deskripsi_singkat,
      jadwal_pelaksanaan: newItem.jadwal_pelaksanaan,
      hari: newItem.hari,
      tempat_pelaksanaan: newItem.tempat_pelaksanaan,
      prestasi: newItem.prestasi,
      foto_prestasi: newItem.foto_prestasi,
      ...(uploadedImgId ? { foto_utama: uploadedImgId } : {}),
      ...(uploadedPrestasiImgId ? { foto_prestasi: uploadedPrestasiImgId } : {}),
    };

    const payloadBlocks = {
      nama_ekskul: newItem.nama,
      deskripsi: newItem.deskripsi
        ? [{ type: "paragraph", children: [{ type: "text", text: newItem.deskripsi }] }]
        : [],
      deskripsi_singkat: newItem.deskripsi_singkat,
      jadwal_pelaksanaan: newItem.jadwal_pelaksanaan,
      hari: newItem.hari,
      tempat_pelaksanaan: newItem.tempat_pelaksanaan,
      prestasi: newItem.prestasi,
      foto_prestasi: newItem.foto_prestasi,
      ...(uploadedImgId ? { foto_utama: uploadedImgId } : {}),
      ...(uploadedPrestasiImgId ? { foto_prestasi: uploadedPrestasiImgId } : {}),
    };

    try {
      let res = await fetch(`${STRAPI_URL}/api/ekskuls`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ data: payloadBlocks }), // Coba Blocks format duluan untuk v5
      });

      if (res.status === 401) {
        alert("Sesi login kadaluarsa. Silakan login kembali.");
        router.push("/admin/login");
        return;
      }

      // Jika gagal, coba format plain text
      if (!res.ok) {
        res = await fetch(`${STRAPI_URL}/api/ekskuls`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ data: payloadPlain }),
        });
      }

      if (!res.ok) {
        const errorData = await res.json();
        console.error("Detail Error Strapi:", errorData);
        alert(`Gagal tambah data: ${errorData?.error?.message || "Format tidak sesuai"}`);
        return;
      }

      const addedData = await res.json();
      if (addedData?.data?.id) {
        setHighlightedId(addedData.data.id);
      } else if (addedData?.data?.documentId) {
        setHighlightedId(addedData.data.documentId);
      }

      setOpenTambah(false);
      fetchData();
    } catch (error) {
      console.error("Gagal tambah data:", error);
    }
  };

  const handleEdit = async (updatedItem: EskulItem, file?: File | null, prestasiFile?: File | null) => {
    const token = getCleanToken();
    let uploadedImgId = null;
    let uploadedPrestasiImgId = null;

    if (file) {
      const formData = new FormData();
      formData.append("files", file);
      const uploadRes = await fetch(`${STRAPI_URL}/api/upload`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (!uploadRes.ok) {
        const errorData = await uploadRes.json();
        console.error("Upload foto utama error:", errorData);
        alert(`Gagal mengupload foto: ${errorData?.error?.message || "Kesalahan server Strapi"}`);
        return;
      }
      const uploadData = await uploadRes.json();
      uploadedImgId = uploadData[0]?.id;
    }
    if (prestasiFile) {
      const formData = new FormData();
      formData.append("files", prestasiFile);

      const uploadPrestasiRes = await fetch(`${STRAPI_URL}/api/upload`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (!uploadPrestasiRes.ok) {
        const errorData = await uploadPrestasiRes.json();
        console.error("Upload foto prestasi error:", errorData);
        alert(
          `Gagal mengupload foto prestasi: ${errorData?.error?.message || "Kesalahan server Strapi"
          }`
        );
        return;
      }

      const uploadData = await uploadPrestasiRes.json();
      uploadedPrestasiImgId = uploadData[0]?.id;
    }

    const targetId = updatedItem.documentId || updatedItem.id;
    if (!targetId) return;

    const payloadPlain: any = {};
    if (updatedItem.nama !== undefined) payloadPlain.nama_ekskul = updatedItem.nama;
    if (updatedItem.deskripsi !== undefined) payloadPlain.deskripsi = updatedItem.deskripsi;
    if (updatedItem.jadwal_pelaksanaan !== undefined) payloadPlain.jadwal_pelaksanaan = updatedItem.jadwal_pelaksanaan;
    if (updatedItem.tempat_pelaksanaan !== undefined) payloadPlain.tempat_pelaksanaan = updatedItem.tempat_pelaksanaan;
    if (updatedItem.deskripsi_singkat !== undefined) payloadPlain.deskripsi_singkat = updatedItem.deskripsi_singkat;
    if (updatedItem.kata_ajakan !== undefined) payloadPlain.kata_ajakan = updatedItem.kata_ajakan;
    if (updatedItem.prestasi !== undefined) payloadPlain.prestasi = updatedItem.prestasi;
    if (updatedItem.hari !== undefined) payloadPlain.hari = updatedItem.hari;

    if (uploadedImgId) payloadPlain.foto_utama = uploadedImgId;
    if (uploadedPrestasiImgId) payloadPlain.foto_prestasi = uploadedPrestasiImgId;

    const payloadBlocks: any = { ...payloadPlain };
    if (updatedItem.deskripsi !== undefined) {
      payloadBlocks.deskripsi = updatedItem.deskripsi
        ? [{ type: "paragraph", children: [{ type: "text", text: updatedItem.deskripsi }] }]
        : [];
    }

    if (Object.keys(payloadPlain).length === 0) {
      setOpenEdit(false);
      setItemToEdit(null);
      return;
    }

    try {
      let res = await fetch(`${STRAPI_URL}/api/ekskuls/${targetId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ data: payloadBlocks }), // Coba Blocks format duluan
      });

      if (res.status === 401) {
        alert("Sesi login kadaluarsa. Silakan login kembali.");
        localStorage.removeItem("admin_token");
        router.push("/admin/login");
        return;
      }

      if (!res.ok) {
        res = await fetch(`${STRAPI_URL}/api/ekskuls/${targetId}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ data: payloadPlain }),
        });
      }

      if (!res.ok) {
        const errorData = await res.json();
        console.error("Detail Error Strapi:", errorData);
        alert(`Gagal update: ${errorData?.error?.message || "Format tidak sesuai"}`);
        return;
      }

      setOpenEdit(false);
      setItemToEdit(null);
      fetchData();
    } catch (error) {
      console.error("Gagal update data:", error);
    }
  };

  const handleDelete = (id: number) => {
    setDeleteId(id);
    setOpenDelete(true);
  };

  const confirmDelete = async (): Promise<boolean> => {
    if (!deleteId) return false;
    const token = getCleanToken();
    const targetItem = dataEskul.find((item) => item.id === deleteId);
    const targetId = targetItem?.documentId || deleteId;

    try {
      const res = await fetch(`${STRAPI_URL}/api/ekskuls/${targetId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.status === 401) {
        alert("Sesi login kadaluarsa. Silakan login kembali.");
        router.push("/admin/login");
        return false;
      }

      if (!res.ok) {
        alert("Gagal menghapus data");
        return false;
      }

      fetchData();
      return true;
    } catch (error) {
      console.error("Gagal menghapus:", error);
      alert("Terjadi kesalahan jaringan.");
      return false;
    }
  };

  const filteredData = dataEskul.filter(
    (item) =>
      item.nama.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.deskripsi.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className={`flex h-screen overflow-hidden bg-[#F5F7FA] ${josefin.className}`}>
      <Sidebar />

      <div className="flex min-w-0 flex-1 flex-col overflow-hidden">
        <Header title="GRIDAS EKSKUL" onTambahClick={() => setOpenTambah(true)} />

        <main className="flex min-h-0 flex-1 flex-col bg-[#F5F7FA] px-5 py-6 md:px-8">
          <div className="mb-5 shrink-0">
            <SearchBar
              value={searchQuery}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setSearchQuery(e.target.value)
              }
            />
          </div>

          <div className="min-h-0 flex-1">
            <EskulTable
              dataEskul={filteredData}
              highlightedId={highlightedId}
              onEdit={(item) => {
                setItemToEdit(item);
                setOpenEdit(true);
              }}
              onDelete={handleDelete}
            />
          </div>
        </main>
      </div>

      <TambahModal
        open={openTambah}
        onClose={() => setOpenTambah(false)}
        onSave={handleTambah}
      />

      <EditModal
        open={openEdit}
        editItem={itemToEdit}
        onClose={() => {
          setOpenEdit(false);
          setItemToEdit(null);
        }}
        onSave={handleEdit}
      />

      <DeleteModal
        open={openDelete}
        onClose={() => setOpenDelete(false)}
        onDelete={confirmDelete}
      />
    </div>
  );
}