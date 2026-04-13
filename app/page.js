import Link from "next/link";

export default function Home() {
  return (
    <div>
      {/* Hero Section only — navbar is in layout.js */}
      <div style={{
        position: "relative",
        height: "500px",
        backgroundImage: "url('/tailored.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
      }}>
        <div style={{
          position: "absolute",
          inset: 0,
          backgroundColor: "rgba(0,0,0,0.55)"
        }} />

        <div style={{ position: "relative", textAlign: "center", color: "#fff" }}>
          <h1 style={{ fontSize: "48px", fontWeight: "900", letterSpacing: "2px", margin: 0 }}>
            MAKING YOUR
          </h1>
          <h1 style={{ fontSize: "48px", fontWeight: "900", letterSpacing: "2px", margin: 0 }}>
            DREAM A REALITY
          </h1>
          <Link href="/shop">
            <button style={{
              marginTop: "32px",
              padding: "14px 40px",
              backgroundColor: "#2d6a4f",
              color: "#fff",
              border: "none",
              fontSize: "16px",
              fontWeight: "bold",
              letterSpacing: "1px",
              cursor: "pointer",
              borderRadius: "4px"
            }}>
              START NOW
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}