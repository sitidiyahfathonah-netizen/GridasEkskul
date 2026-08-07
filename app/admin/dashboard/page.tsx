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
  weight: ["300", "400", "500", "600", "700"]
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

// Helper untuk ekstrak teks Rich Text Strapi
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
    const token = localStorage.getItem("admin_token");
    if (!token) {
      router.push("/admin/login");
      return;
    }
    fetchData();
  }, [router]);

  const fetchData = async () => {
    try {
      const res = await fetch(`${STRAPI_URL}/api/ekskuls?populate=*`);
      const result = await res.json();

      if (res.ok && result.data) {
        const formatted = result.data.map((item: any) => {
          // Ambil URL foto
          let imgUrl = "/images/tatarias.jpeg"; // Fallback default
          const fotoData = item.foto_utama || item.foto || item.gambar;

          if (fotoData) {
            // Mengecek apakah data dibungkus dalam array, 'data', atau objek langsung
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
            jadwal_pelaksanaan: extractRichText(item.jadwal_pelaksanaa) || item.jadwal_pelaksanaan || "-",
            foto: imgUrl,
          };
        });

        setDataEskul(formatted);
      }
    } catch (err) {
      console.error("Gagal load data:", err);
    }
  };

  const handleTambah = async (newItem: Omit<EskulItem, "id">) => {
    const token = localStorage.getItem("admin_token");
    await fetch(`${STRAPI_URL}/api/ekskuls`, {
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
    setOpenTambah(false);
    fetchData();
  };

  const handleEdit = async (updatedItem: EskulItem) => {
    const token = localStorage.getItem("admin_token");
    const targetId = updatedItem.documentId || updatedItem.id;
    await fetch(`${STRAPI_URL}/api/ekskuls/${targetId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        data: {
          nama_ekskul: updatedItem.nama,
          deskripsi: updatedItem.deskripsi,
          jadwal_pelaksanaan: updatedItem.jadwal_pelaksanaan,
        },
      }),
    });
    setOpenEdit(false);
    setItemToEdit(null);
    fetchData();
  };

  const handleDelete = async (id: number, nama: string) => {
    if (window.confirm(`Apakah kamu yakin ingin menghapus ${nama}?`)) {
      const token = localStorage.getItem("admin_token");
      const targetItem = dataEskul.find((item) => item.id === id);
      const targetId = targetItem?.documentId || id;

      await fetch(`${STRAPI_URL}/api/ekskuls/${targetId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchData();
    }
  };

  // Filter pencarian
  const filteredData = dataEskul.filter((item) =>
    item.nama.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.deskripsi.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex h-screen overflow-hidden bg-[#F5F7FA]">

      <Sidebar />

      <div className="flex min-w-0 flex-1 flex-col overflow-hidden">

        <Header
          title="GRIDAS EKSKUL"
          onTambahClick={() => setOpenTambah(true)}
        />


        <main className="flex min-h-0 flex-1 flex-col bg-[#F5F7FA] px-5 py-6 md:px-8">

          <div className="mb-5 shrink-0">

            <SearchBar
              value={searchQuery}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value)}
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
        onSave={handleTambah} />



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