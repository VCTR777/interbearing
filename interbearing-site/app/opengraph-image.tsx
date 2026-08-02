import { ImageResponse } from "next/og";

export const alt = "INTERBEARING — надійність у кожному оберті";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "72px 84px",
          color: "white",
          background:
            "radial-gradient(circle at 82% 35%, #183a7a 0%, #0d1b38 28%, #080c15 62%)",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", width: "700px" }}>
          <div style={{ display: "flex", fontSize: 64, fontWeight: 900, letterSpacing: -2 }}>
            INTER<span style={{ color: "#3b82f6" }}>BEARING</span>
          </div>
          <div style={{ display: "flex", marginTop: 30, fontSize: 36, fontWeight: 700 }}>
            Надійність у кожному оберті
          </div>
          <div style={{ display: "flex", marginTop: 24, fontSize: 24, color: "#aebbd0" }}>
            Підшипники світових брендів для промисловості та техніки
          </div>
        </div>
        <div
          style={{
            width: 300,
            height: 300,
            borderRadius: "50%",
            border: "44px solid #3b82f6",
            boxShadow: "0 0 80px rgba(59,130,246,.45), inset 0 0 0 28px #71809a",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 108,
            fontWeight: 900,
            background: "#0b1220",
          }}
        >
          IB
        </div>
      </div>
    ),
    size,
  );
}
