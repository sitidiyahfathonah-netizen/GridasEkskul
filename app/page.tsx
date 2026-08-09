"use client";

import { useState, useEffect, Suspense } from "react";
import { Navbar } from "@/components/organisms/navbar";
import { Hero } from "@/components/organisms/hero";
import { Eskul } from "@/components/organisms/eskul-list";
import { DetailEskulCard } from "@/components/molecules/eskul-card";
import { Galeri } from "@/components/molecules/galeri";
import { PendaftaranForm } from "@/components/organisms/pendaftaran";


export default function Home() {
  const [selectedEskul, setSelectedEskul] = useState<any | null>(null);
  const [showPendaftaranOnly, setShowPendaftaranOnly] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const handleGabung = () => {
    setIsFormOpen(true);
  };

  const handleSuccessOke = () => {
    setShowSuccessModal(false);
    setIsFormOpen(false);
    setSelectedEskul(null);

    const ekskulElement = document.getElementById("ekskul");
    if (ekskulElement) {
      ekskulElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Data dari Strapi
  const [dataEkskulDariStrapi, setDataEkskulDariStrapi] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";

  // Reset tampilan jika menu/logo Navbar diklik
  const handleReset = () => {
    setSelectedEskul(null);
    setShowPendaftaranOnly(false);
  };

  useEffect(() => {
    async function fetchStrapiData() {
      try {

        const res = await fetch(`${STRAPI_URL}/api/ekskuls?populate=*`);

        if (!res.ok) {
          throw new Error(`HTTP Error! Status: ${res.status}`);
        }

        const responseJson = await res.json();
        console.log("Data berhasil diambil:", responseJson.data);

        if (responseJson && Array.isArray(responseJson.data)) {
          setDataEkskulDariStrapi(responseJson.data);
        }
      } catch (error) {
        console.error("Waduh eror pas fetch:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchStrapiData();
  }, []);

  return (
    <div className="bg-[#0f172a] min-h-screen font-sans antialiased text-white">
      {/* Navbar */}
      <Navbar onReset={handleReset} />

      <main>
        {/* KONDISI 1: Jika Tombol Gabung diklik */}
        {showPendaftaranOnly ? (
          <div className="pt-20">
            <Suspense fallback={<div className="min-h-screen bg-[#16357a] text-white flex items-center justify-center">Loading...</div>}>
              <PendaftaranForm
                ekskulId={selectedEskul?.documentId || selectedEskul?.id}
                onSuccess={() => {
                  setShowPendaftaranOnly(false);
                  setSelectedEskul(null);
                }}
              />
            </Suspense>
          </div>
        ) : selectedEskul ? (
          /* KONDISI 2: Jika sedang membuka Detail Ekskul */
          <DetailEskulCard
            eskul={selectedEskul}
            onBack={() => {
              setSelectedEskul(null);
            }}
            onJoin={() => {
              // KUNCI UTAMA: Jangan ubah/reset selectedEskul saat gabung!
              // Cukup buka tampilan form pendaftaran saja.
              setShowPendaftaranOnly(true);
              window.scrollTo(0, 0);
            }}
          />
        ) : (
          /* KONDISI 3: Tampilan Beranda Utama */
          <>
            <div id="home" className="scroll-mt-20">
              <Hero />
            </div>

            <div id="ekskul" className="scroll-mt-20">
              {loading ? (
                <div className="text-center py-10 text-gray-400">
                  Memuat data ekskul dari Strapi...
                </div>
              ) : (
                <Eskul
                  dataEkskul={dataEkskulDariStrapi}
                  onSelect={(ekskul) => {
                    setSelectedEskul(ekskul);
                    window.scrollTo(0, 0);
                  }}
                />
              )}
            </div>

            <div id="galeri" className="scroll-mt-20">
              <Galeri />
            </div>
          </>
        )}
      </main>
    </div>
  );
}