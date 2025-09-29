import { ImageResponse } from "next/og";

// Image metadata
export const size = {
  width: 192,
  height: 192,
};
export const contentType = "image/png";

// Image generation
export default function Icon192() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#F7931A",
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: "24px",
        }}
      >
        <div
          style={{
            fontSize: "130px",
            fontWeight: "bold",
            color: "white",
            fontFamily: "Arial, sans-serif",
          }}
        >
          ₿
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
