import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});


export const metadata: Metadata = {
  metadataBase: new URL("https://gridas-ekskul.vercel.app"),
  title: "GRIDAS EKSKUL",
  description: "Portal resmi kegiatan ekstrakurikuler GRIDAS",
  openGraph: {
    title: "GRIDAS EKSKUL",
    description: "Portal resmi kegiatan ekstrakurikuler GRIDAS",
    url: "https://gridas-ekskul.vercel.app",
    siteName: "GRIDAS EKSKUL",
    images: [
      {
        // Langsung panggil dari /images/... (tanpa menulis kata 'public')
        url: "/images/logo-sekolah.jpeg",
        width: 800,
        height: 600,
        alt: "Logo Sekolah GRIDAS",
      },
    ],
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
