"use client";

import { useState } from "react";
// Import Reusable Components dari Molecules & Organisms!
import { Sidebar, Header, GaleriGrid } from "@/components/molecules/admin";
import SearchBar from "@/components/molecules/admin/SearchBar";
import TambahGaleriModal from "@/components/organisms/admin/tambah-galeri-modal";


interface GaleriItem {
  id: number;
  nama: string;
  image: string;
}

export default function AdminGaleriPage() {
  const [galeriList, setGaleriList] = useState<GaleriItem[]>([
    { id: 1, nama: "English Club", image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=500" },
    { id: 2, nama: "Tatarias", image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?q=80&w=500" },
    { id: 3, nama: "Pramuka", image: "https://images.unsplash.com/photo-1526976668912-1a811878dd37?q=80&w=500" },
    { id: 4, nama: "Karate", image: "https://images.unsplash.com/photo-1555597673-b21d5c935865?q=80&w=500" },
  ]);

  

  const [showModal, setShowModal] = useState(false);

  const handleSimpan = (nama: string, deskripsi: string, file: File | null) => {
    const newItem: GaleriItem = {
      id: Date.now(),
      nama,
      image: file
        ? URL.createObjectURL(file)
        : "https://images.unsplash.com/photo-1511632765486-a01980e01a18?q=80&w=500",
    };

    setGaleriList([...galeriList, newItem]);
    setShowModal(false);
  };

  return (
    <div className="flex w-full min-h-screen bg-white">
      {/* 1. Sidebar Molecule */}
      <Sidebar />

      {/* 2. Main Content */}
      <main className="flex-1 flex flex-col">
        {/* Header Molecule */}
        <Header onTambahClick={() => setShowModal(true)} />

        {/* Galeri Grid Molecule */}
        <GaleriGrid items={galeriList} />
      </main>

      {/* 3. Modal Organism */}
      {showModal && (
        <TambahGaleriModal
          onClose={() => setShowModal(false)}
          onSave={handleSimpan}
        />
      )}
    </div>
  );
}