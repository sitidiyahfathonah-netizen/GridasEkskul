"use client";

import { useState, useEffect, useMemo } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Eskul from "./components/Eskul";
import DetailEskulCard from "./components/DetailEskulCard";
import Galeri from "./components/Galeri";
import Pendaftaran from "./components/Pendaftaran";

export default function Home() {
  const [selectedEskul, setSelectedEskul] = useState<any | null>(null);
  const [showPendaftaranOnly, setShowPendaftaranOnly] = useState(false);

  // Data dari Strapi
  const [dataEkskulDariStrapi, setDataEkskulDariStrapi] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Reset tampilan jika menu/logo Navbar diklik
  const handleReset = () => {
    setSelectedEskul(null);
    setShowPendaftaranOnly(false);
  };

  useEffect(()=> {
    async function fetchStrapiData() {
      try {
        const res = await fetch(
          "https://giver-moisture-wrecking.ngrok-free.dev/api/ekskuls?populate=*",
          {
            headers: {
              "ngrok-skip-browser-warning": "true",
            },
          }
        );

        const responseJson = await res.json();
       console.log("Data berhasil diambil:", responseJson.data);

       if (responseJson && Array.isArray(responseJson.data)) {
        setDataEkskulDariStrapi(responseJson.data);
      }

        setDataEkskulDariStrapi(responseJson.data);
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
            <Pendaftaran />
          </div>
        ) : selectedEskul ? (
          /* KONDISI 2: Jika sedang membuka Detail Ekskul */
          <DetailEskulCard
            eskul={selectedEskul}
            onBack={() => {
              setSelectedEskul(null);
              setTimeout(() => {
                const element = document.getElementById("ekskul");
                if (element) {
                  element.scrollIntoView({ behavior: "smooth" });
                }
              }, 50);
            }}
            onJoin={() => {
              setSelectedEskul(null);
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

            <div id="pendaftaran" className="scroll-mt-20">
              <Pendaftaran />
            </div>
          </>
        )}
      </main>
    </div>
  );}