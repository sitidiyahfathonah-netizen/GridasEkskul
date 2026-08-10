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
  title: "GRIDAS EKSKUL",
  description: "Portal resmi kegiatan ekstrakurikuler GRIDAS",
  openGraph: {
    title: "GRIDAS EKSKUL",
    description: "Portal resmi kegiatan ekstrakurikuler GRIDAS",
    url: "https://gridas-ekskul.vercel.app",
    siteName: "GRIDAS EKSKUL",
    images: [
      {
        url: "/favicon.ico", // Atau ganti dengan path logo web kamu, misal: "/images/logo.png"
        width: 800,
        height: 600,
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
