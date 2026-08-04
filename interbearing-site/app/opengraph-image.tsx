import { ImageResponse } from "next/og";

export const alt = "INTERBEARING — надійність у кожному оберті";
export const size = {
  width: 1200,
  height: 630,
};
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
          color: "#f8fafc",
          background:
            "radial-gradient(circle at 82% 38%, #173b7a 0%, #0d1b38 29%, #080c15 64%)",
          fontFamily: "Arial, sans-serif",
        }}
      >
        <div
          style={{
            width: 710,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div
            style={{
              display: "flex",
              fontSize: 67,
              fontWeight: 900,
              letterSpacing: -2,
            }}
          >
            INTER<span style={{ color: "#3b82f6" }}>BEARING</span>
          </div>

          <div
            style={{
              display: "flex",
              marginTop: 30,
              fontSize: 38,
              lineHeight: 1.15,
              fontWeight: 700,
            }}
          >
            Надійність у кожному оберті
          </div>

          <div
            style={{
              display: "flex",
              marginTop: 25,
              fontSize: 25,
              lineHeight: 1.4,
              color: "#aebbd0",
            }}
          >
            Підшипники та комплектуючі для промисловості й техніки
          </div>

          <div
            style={{
              display: "flex",
              marginTop: 42,
              fontSize: 22,
              fontWeight: 700,
              color: "#60a5fa",
            }}
          >
            www.interbearing.com.ua
          </div>
        </div>

        <div
          style={{
            width: 330,
            height: 330,
            position: "relative",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: "50%",
            border: "45px solid #3b82f6",
            boxShadow:
              "0 0 90px rgba(59, 130, 246, 0.48), inset 0 0 0 24px #7c8ca6",
            background: "#0b1220",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 108,
              fontWeight: 900,
              letterSpacing: -10,
              color: "#f8fafc",
              transform: "translateX(-5px)",
            }}
          >
            IB
          </div>
        </div>
      </div>
    ),
    size,
  );
}
