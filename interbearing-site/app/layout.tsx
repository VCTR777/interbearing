import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import CartProvider from "./components/CartProvider";
import ThemeProvider from "./components/ThemeProvider";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin", "cyrillic"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin", "cyrillic"],
});

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "https://interbearing-onb8.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "INTERBEARING — підшипники та комплектуючі",
    template: "%s | INTERBEARING",
  },
  description:
    "Підшипники світових брендів для промисловості, автомобільної та аграрної техніки. Підбір, консультація і доставка по Україні.",
  applicationName: "INTERBEARING",
  keywords: [
    "підшипники",
    "купити підшипник",
    "підшипники Дніпро",
    "промислові підшипники",
    "автомобільні підшипники",
    "SKF",
    "FAG",
    "INA",
    "NSK",
    "KOYO",
    "NTN",
  ],
  authors: [{ name: "INTERBEARING" }],
  creator: "INTERBEARING",
  publisher: "INTERBEARING",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "uk_UA",
    url: "/",
    siteName: "INTERBEARING",
    title: "INTERBEARING — підшипники та комплектуючі",
    description:
      "Підбір і постачання підшипників світових брендів з доставкою по Україні.",
  },
  twitter: {
    card: "summary_large_image",
    title: "INTERBEARING — підшипники та комплектуючі",
    description:
      "Підбір і постачання підшипників світових брендів з доставкою по Україні.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  manifest: "/manifest.webmanifest",
};

const themeScript = `
  (() => {
    try {
      const stored = localStorage.getItem("interbearing-theme");
      const preference = ["system", "light", "dark"].includes(stored)
        ? stored
        : "system";
      const resolved = preference === "system"
        ? (matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light")
        : preference;
      document.documentElement.dataset.theme = resolved;
      document.documentElement.style.colorScheme = resolved;
    } catch {
      document.documentElement.dataset.theme = "dark";
    }
  })();
`;

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="uk"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="flex min-h-full flex-col">
        <ThemeProvider>
          <CartProvider>{children}</CartProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
