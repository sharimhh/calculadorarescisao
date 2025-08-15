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
  title: "Calculadora de Rescisão Trabalhista",
  description: "Calculadora completa de rescisão trabalhista baseada na CLT. Calcule demissões, pedidos de demissão e acordos mútuos com precisão jurídica.",
  keywords: "rescisão trabalhista, CLT, cálculo trabalhista, demissão, FGTS, aviso prévio",
  authors: [{ name: "Calculadora Rescisão" }],
  creator: "Calculadora Rescisão",
  publisher: "Calculadora Rescisão",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Calc Rescisão",
  },
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
  },
  themeColor: "#2563eb",
  colorScheme: "light",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: "https://calculadora-rescisao.vercel.app",
    siteName: "Calculadora de Rescisão Trabalhista",
    title: "Calculadora de Rescisão Trabalhista",
    description: "Calculadora completa de rescisão trabalhista baseada na CLT",
    images: [
      {
        url: "/icon-512x512.svg",
        width: 512,
        height: 512,
        alt: "Calculadora de Rescisão Trabalhista",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Calculadora de Rescisão Trabalhista",
    description: "Calculadora completa de rescisão trabalhista baseada na CLT",
    images: ["/icon-512x512.svg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
