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

const siteUrl = "https://www.interbearing.com.ua";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),

  title: {
    default: "INTERBEARING — підшипники та комплектуючі",
    template: "%s | INTERBEARING",
  },

  description:
    "Підшипники світових брендів для промисловості, автомобільної та аграрної техніки. Професійний підбір і доставка по Україні.",

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

  authors: [{ name: "INTERBEARING", url: siteUrl }],
  creator: "INTERBEARING",
  publisher: "INTERBEARING",

  alternates: {
    canonical: "/",
  },

  icons: {
    icon: [
      {
        url: "/icon.svg",
        type: "image/svg+xml",
      },
    ],
    shortcut: "/favicon.ico",
    apple: "/icon.svg",
  },

  openGraph: {
    type: "website",
    locale: "uk_UA",
    url: "/",
    siteName: "INTERBEARING",
    title: "INTERBEARING — підшипники та комплектуючі",
    description:
      "Підбір і постачання підшипників світових брендів з доставкою по Україні.",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "INTERBEARING — надійність у кожному оберті",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "INTERBEARING — підшипники та комплектуючі",
    description:
      "Підбір і постачання підшипників світових брендів з доставкою по Україні.",
    images: ["/opengraph-image"],
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

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${siteUrl}/#organization`,
  name: "INTERBEARING",
  alternateName: "Інтерберінг",
  url: siteUrl,
  logo: {
    "@type": "ImageObject",
    url: `${siteUrl}/icon.svg`,
    width: 256,
    height: 256,
  },
  image: `${siteUrl}/opengraph-image`,
  description:
    "Постачання підшипників і комплектуючих для промисловості, автомобільної та аграрної техніки.",
  email: "interbearing1@gmail.com",
  telephone: "+380958227953",
  address: {
    "@type": "PostalAddress",
    streetAddress: "вул. Любарського, 143, оф. 207",
    addressLocality: "Дніпро",
    postalCode: "49034",
    addressCountry: "UA",
  },
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${siteUrl}/#website`,
  name: "INTERBEARING",
  url: siteUrl,
  inLanguage: "uk-UA",
  publisher: {
    "@id": `${siteUrl}/#organization`,
  },
};

const themeScript = `
  (() => {
    try {
      const stored = localStorage.getItem("interbearing-theme");
      const preference = ["system", "light", "dark"].includes(stored)
        ? stored
        : "system";

      const resolved =
        preference === "system"
          ? matchMedia("(prefers-color-scheme: dark)").matches
            ? "dark"
            : "light"
          : preference;

      document.documentElement.dataset.theme = resolved;
      document.documentElement.style.colorScheme = resolved;
    } catch {
      document.documentElement.dataset.theme = "dark";
    }
  })();
`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="uk"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema).replace(/</g, "\\u003c"),
          }}
        />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(websiteSchema).replace(/</g, "\\u003c"),
          }}
        />
      </head>

      <body className="flex min-h-full flex-col">
        <ThemeProvider>
          <CartProvider>{children}</CartProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}