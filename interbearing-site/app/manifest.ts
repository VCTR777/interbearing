import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "INTERBEARING",
    short_name: "INTERBEARING",
    description: "Підшипники та комплектуючі з доставкою по Україні.",
    start_url: "/",
    display: "standalone",
    background_color: "#0b0f19",
    theme_color: "#2563eb",
    lang: "uk",
    icons: [
      {
        src: "/icon.svg",
        sizes: "any",
        type: "image/svg+xml",
      },
    ],
  };
}
