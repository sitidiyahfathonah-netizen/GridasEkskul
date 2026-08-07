"use client";

import { useState } from "react";

import Sidebar from "@/components/molecules/admin/sidebar";
import Header from "@/components/molecules/admin/header";
import SearchBar from "@/components/molecules/admin/SearchBar";

import { EskulTable } from "@/components/organisms/admin/Eskul-Table";
import { TambahModal } from "@/components/organisms/admin/TambahModal";
import { EditModal } from "@/components/organisms/admin/EditModal";

export interface EskulItem {
  id: number;
  nama: string;
  deskripsi: string;
  jadwal: string;
  foto: string;
}

const defaultData: EskulItem[] = [
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

export default function DashboardPage() {
  const [dataEskul, setDataEskul] = useState<EskulItem[]>(defaultData);
  const [openTambah, setOpenTambah] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [itemToEdit, setItemToEdit] = useState<EskulItem | null>(null);

  const handleTambah = (newItem: Omit<EskulItem, "id">) => {
    const nextId = dataEskul.length > 0 ? Math.max(...dataEskul.map(d => d.id)) + 1 : 1;
    setDataEskul([...dataEskul, { ...newItem, id: nextId }]);
    setOpenTambah(false);
  };

  const handleEdit = (updatedItem: EskulItem) => {
    setDataEskul(dataEskul.map(item => item.id === updatedItem.id ? updatedItem : item));
    setOpenEdit(false);
    setItemToEdit(null);
  };

  const handleDelete = (id: number, nama: string) => {
    if (window.confirm(`Apakah kamu yakin ingin menghapus ${nama}?`)) {
      setDataEskul(dataEskul.filter(item => item.id !== id));
    }
  };

  return (
    <div className="flex h-screen overflow-hidden bg-[#F5F7FA]">
      {/* Sidebar */}
      <Sidebar />

      {/* Bagian kanan */}
      <div className="flex min-w-0 flex-1 flex-col overflow-hidden">
        {/* Header tetap */}
        <Header
          title="GRIDAS EKSKUL"
          onTambahClick={() => setOpenTambah(true)}
        />

        {/* Isi halaman */}
        <main className="flex min-h-0 flex-1 flex-col bg-[#F5F7FA] px-5 py-6 md:px-8">
          
          {/* Search tetap */}
          <div className="mb-5 shrink-0">
            <SearchBar />
          </div>

          {/* Hanya tabel yang bisa di-scroll */}
          <div className="min-h-0 flex-1 overflow-y-auto">
            <EskulTable
              dataEskul={dataEskul}
              onEdit={(item) => {
                setItemToEdit(item);
                setOpenEdit(true);
              }}
              onDelete={handleDelete}
            />
          </div>

        </main>
      </div>

      {/* Modal Tambah */}
      <TambahModal
        open={openTambah}
        onClose={() => setOpenTambah(false)}
        onSave={handleTambah}
      />

      {/* Modal Edit */}
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