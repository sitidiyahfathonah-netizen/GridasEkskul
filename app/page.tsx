"use client";

import { useState, useEffect } from "react";
import { Navbar } from "@/components/organisms/navbar";
import { Hero } from "@/components/organisms/hero";
import { Eskul } from "@/components/organisms/eskul-list";
import { DetailEskulCard } from "@/components/molecules/eskul-card";
import { Galeri } from "@/components/molecules/galeri";
import { PendaftaranForm } from "@/components/organisms/pendaftaran";

export default function Home() {
  const [selectedEkskul, setSelectedEskul] = useState<any | null>(null);
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
      ekskulElement.scrollIntoView({
        behavior: "smooth",
      });
    }
  };

  // Data dari Strapi
  const [dataEkskulDariStrapi, setDataEkskulDariStrapi] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const STRAPI_URL =
    process.env.NEXT_PUBLIC_STRAPI_URL ||
    "http://localhost:1337";

  // Reset tampilan jika menu/logo Navbar diklik
  const handleReset = () => {
    setSelectedEskul(null);
    setShowPendaftaranOnly(false);
  };

  useEffect(() => {
    async function fetchStrapiData() {
      try {
        // Ganti URL ini sesuai URL ngrok Strapi kamu
        const res = await fetch(
          "http://localhost:1337/api/ekskuls?populate=*"
        );

        if (!res.ok) {
          throw new Error(
            `HTTP Error! Status: ${res.status}`
          );
        }

        const responseJson = await res.json();

        console.log(
          "Data berhasil diambil:",
          responseJson.data
        );

        if (
          responseJson &&
          Array.isArray(responseJson.data)
        ) {
          setDataEkskulDariStrapi(
            responseJson.data
          );
        }
      } catch (error) {
        console.error(
          "Waduh eror pas fetch:",
          error
        );
      } finally {
        setLoading(false);
      }
    }

    fetchStrapiData();
  }, []);

  return (
    <div
      className="
        min-h-screen
        w-full
        overflow-x-hidden
        bg-[#0f172a]
        font-sans
        antialiased
        text-white
      "
    >
      {/* Navbar */}
      <Navbar onReset={handleReset} />

      <main className="w-full">
        {/* KONDISI 1: Jika Tombol Gabung diklik */}
        {showPendaftaranOnly ? (
          <div
            className="
              w-full
              pt-16

              sm:pt-20
            "
          >
            <PendaftaranForm
              onSuccess={() => {
                setShowPendaftaranOnly(false);

                setTimeout(() => {
                  const element =
                    document.getElementById(
                      "ekskul"
                    );

                  if (element) {
                    element.scrollIntoView({
                      behavior: "smooth",
                    });
                  }
                }, 100);
              }}
            />
          </div>
        ) : selectedEkskul ? (
          /* KONDISI 2: Jika sedang membuka Detail Ekskul */
          <div className="w-full">
            <DetailEskulCard
              eskul={selectedEkskul}
              onBack={() => {
                setSelectedEskul(null);

                setTimeout(() => {
                  const element =
                    document.getElementById(
                      "ekskul"
                    );

                  if (element) {
                    element.scrollIntoView({
                      behavior: "smooth",
                    });
                  }
                }, 50);
              }}
              onJoin={() => {
                handleGabung();
                setSelectedEskul(null);
                setShowPendaftaranOnly(true);
                window.scrollTo(0, 0);
              }}
            />
          </div>
        ) : (
          /* KONDISI 3: Tampilan Beranda Utama */
          <>
            {/* Hero */}
            <section
              id="home"
              className="
                w-full
                scroll-mt-16

                sm:scroll-mt-20
              "
            >
              <Hero />
            </section>

            {/* Daftar Ekskul */}
            <section
              id="ekskul"
              className="
                w-full
                scroll-mt-16

                sm:scroll-mt-20
              "
            >
              {loading ? (
                <div
                  className="
                    px-4
                    py-10
                    text-center
                    text-sm
                    text-gray-400

                    sm:text-base
                  "
                >
                  Memuat data ekskul dari Strapi...
                </div>
              ) : (
                <Eskul
                  dataEkskul={
                    dataEkskulDariStrapi
                  }
                  onSelect={(ekskul) => {
                    setSelectedEskul(
                      ekskul
                    );

                    window.scrollTo(0, 0);
                  }}
                />
              )}
            </section>

            {/* Galeri */}
            <section
              id="galeri"
              className="
                w-full
                scroll-mt-16

                sm:scroll-mt-20
              "
            >
              <Galeri />
            </section>
          </>
        )}
      </main>
    </div>
  );
}