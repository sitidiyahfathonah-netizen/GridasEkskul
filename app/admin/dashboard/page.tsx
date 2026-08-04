"use client";

import { useState } from "react";

import Sidebar from "@/components/molecules/admin/sidebar";
import Header from "@/components/molecules/admin/header";
import SearchBar from "@/components/molecules/admin/SearchBar";

import { EskulTable } from "@/components/organisms/admin/Eskul-Table";
import { TambahModal } from "@/components/organisms/admin/TambahModal";
import { EditModal } from "@/components/organisms/admin/EditModal";

export default function DashboardPage() {
  const [openTambah, setOpenTambah] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);

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
              onEdit={() => setOpenEdit(true)}
            />
          </div>

        </main>
      </div>

      {/* Modal Tambah */}
      <TambahModal
        open={openTambah}
        onClose={() => setOpenTambah(false)}
      />

      {/* Modal Edit */}
      <EditModal
        open={openEdit}
        onClose={() => setOpenEdit(false)}
      />
    </div>
  );
}