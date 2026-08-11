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
  jadwal_pelaksanaan: string;
  foto: string;
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
            jadwal_pelaksanaan:
              extractRichText(item.jadwal_pelaksanaan) || item.jadwal_pelaksanaan || "-",
            foto: imgUrl,
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

  const handleTambah = async (newItem: Omit<EskulItem, "id">) => {
    const token = getCleanToken();
    const res = await fetch(`${STRAPI_URL}/api/ekskuls`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        data: {
          nama_ekskul: newItem.nama,
          deskripsi: newItem.deskripsi,
          jadwal_pelaksanaan: newItem.jadwal_pelaksanaan,
        },
      }),
    });

    if (res.status === 401) {
      alert("Sesi login kadaluarsa. Silakan login kembali.");
      router.push("/admin/login");
      return;
    }

    setOpenTambah(false);
    fetchData();
  };

  const handleEdit = async (updatedItem: EskulItem) => {
    const token = getCleanToken();
    const targetId = updatedItem.documentId || updatedItem.id;
    if (!targetId) return;

    const payloadPlain: any = {};
    if (updatedItem.nama !== undefined) payloadPlain.nama_ekskul = updatedItem.nama;
    if (updatedItem.deskripsi !== undefined) payloadPlain.deskripsi = updatedItem.deskripsi;
    if (updatedItem.jadwal_pelaksanaan !== undefined) payloadPlain.jadwal_pelaksanaan = updatedItem.jadwal_pelaksanaan;

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
      // Direct Request 1: Coba kirim format biasa
      let res = await fetch(`${STRAPI_URL}/api/ekskuls/${targetId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ data: payloadPlain }),
      });

      // Jika 401, artinya token tidak sah/invalid
      if (res.status === 401) {
        alert("Sesi login kadaluarsa. Silakan login kembali.");
        localStorage.removeItem("admin_token");
        router.push("/admin/login");
        return;
      }

      // Jika gagal karena validation (400/422), coba format Blocks
      if (!res.ok) {
        res = await fetch(`${STRAPI_URL}/api/ekskuls/${targetId}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ data: payloadBlocks }),
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

  const handleDelete = async (id: number, nama: string) => {
    if (window.confirm(`Apakah kamu yakin ingin menghapus ${nama}?`)) {
      const token = getCleanToken();
      const targetItem = dataEskul.find((item) => item.id === id);
      const targetId = targetItem?.documentId || id;

      const res = await fetch(`${STRAPI_URL}/api/ekskuls/${targetId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.status === 401) {
        alert("Sesi login kadaluarsa. Silakan login kembali.");
        router.push("/admin/login");
        return;
      }

      fetchData();
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

          <div className="min-h-0 flex-1 overflow-y-auto">
            <EskulTable
              dataEskul={filteredData}
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
    </div>
  );
}