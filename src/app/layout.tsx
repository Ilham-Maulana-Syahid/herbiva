import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Pojok Herbal Pintar | Inovasi Herbal untuk Kemandirian Kesehatan",
  description:
    "Platform edukasi herbal berbasis sains untuk kemandirian kesehatan masyarakat Indonesia. Menyediakan informasi herbal, wedang tradisional, dan konsultasi AI herbal.",
  keywords: [
    "herbal",
    "jamu",
    "kesehatan",
    "posyandu",
    "puskesmas",
    "wedang",
    "tradisional",
    "kemenkes",
  ],
  icons: {
    icon: "/logo.png",
    apple: "/logo.png",
  },
  openGraph: {
    title: "Pojok Herbal Pintar",
    description: "Inovasi Herbal untuk Kemandirian Kesehatan Masyarakat",
    images: ["/logo.png"],
    type: "website",
  },
};

export default function RootLayout({
  children,
}: LayoutProps<"/">) {
  return (
    <html
      lang="id"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-bg">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
