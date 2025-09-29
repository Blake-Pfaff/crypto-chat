import { ImageResponse } from "next/og";

// Image metadata
export const size = {
  width: 180,
  height: 180,
};
export const contentType = "image/png";

// Image generation
export default function AppleIcon() {
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
          borderRadius: "20px",
        }}
      >
        <div
          style={{
            fontSize: "120px",
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
