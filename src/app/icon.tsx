import { ImageResponse } from "next/og";

// Image metadata
export const size = {
  width: 32,
  height: 32,
};
export const contentType = "image/png";

// Image generation
export default function Icon() {
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
          borderRadius: "6px",
        }}
      >
        <div
          style={{
            fontSize: "20px",
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
