import Link from "next/link";

export default function Navbar() {
  return (
    <nav style={{
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "16px 40px",
      backgroundColor: "#fff",
      borderBottom: "1px solid #eee"
    }}>
      <div style={{ fontWeight: "bold", fontSize: "20px", fontStyle: "italic" }}>Kipepeo</div>
      <div style={{ display: "flex", gap: "40px" }}>
        <Link href="/" style={{ textDecoration: "none", color: "#000" }}>Home</Link>
        <Link href="/request" style={{ textDecoration: "none", color: "#000" }}>Request</Link>
        <Link href="/shop" style={{ textDecoration: "none", color: "#000" }}>Order</Link>
      </div>
      <div style={{ display: "flex", gap: "16px", fontSize: "20px" }}>
        <Link href="/cart">🛒</Link>
        <Link href="/wishlist">🤍</Link>
        <Link href="/login">👤</Link>
      </div>
    </nav>
  );
}