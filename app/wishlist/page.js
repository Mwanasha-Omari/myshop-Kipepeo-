"use client";
import { useState } from "react";
import Link from "next/link";

const initialWishlist = [
  { id: 1, name: "Elegant Evening Gown", price: "KES 8,500", image: "/ladies1.jpg" },
  { id: 2, name: "Classic Dark Suit", price: "KES 12,000", image: "/men1.jpg" },
];

export default function WishlistPage() {
  const [wishlist, setWishlist] = useState(initialWishlist);

  function removeItem(id) {
    setWishlist(wishlist.filter((item) => item.id !== id));
  }

  return (
    <div style={{ maxWidth: "700px", margin: "40px auto", padding: "0 20px" }}>
      <h2 style={{
        textAlign: "center",
        fontFamily: "Georgia, serif",
        fontStyle: "italic",
        fontSize: "28px",
        color: "#2d6a4f",
        marginBottom: "32px"
      }}>
        My Wishlist
      </h2>

      {wishlist.length === 0 ? (
        <div style={{ textAlign: "center", padding: "60px 0" }}>
          <p style={{ fontSize: "16px", color: "#888", marginBottom: "20px" }}>Your wishlist is empty</p>
          <Link href="/shop">
            <button style={{ padding: "12px 32px", backgroundColor: "#2d6a4f", color: "#fff", border: "none", borderRadius: "4px", cursor: "pointer", fontWeight: "bold" }}>
              Browse Shop
            </button>
          </Link>
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          {wishlist.map((item) => (
            <div key={item.id} style={{
              display: "flex",
              alignItems: "center",
              gap: "16px",
              border: "1px solid #eee",
              borderRadius: "8px",
              padding: "16px",
              backgroundColor: "#fff"
            }}>
              <img
                src={item.image}
                alt={item.name}
                style={{ width: "80px", height: "80px", objectFit: "cover", borderRadius: "6px" }}
              />
              <div style={{ flex: 1 }}>
                <p style={{ fontSize: "15px", fontWeight: "500", margin: "0 0 4px" }}>{item.name}</p>
                <p style={{ fontSize: "14px", color: "#2d6a4f", fontWeight: "bold", margin: 0 }}>{item.price}</p>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                <Link href="/cart">
                  <button style={{ padding: "8px 16px", backgroundColor: "#2d6a4f", color: "#fff", border: "none", borderRadius: "4px", fontSize: "12px", cursor: "pointer", fontWeight: "bold" }}>
                    Add to Cart
                  </button>
                </Link>
                <button
                  onClick={() => removeItem(item.id)}
                  style={{ padding: "8px 16px", backgroundColor: "#fff", color: "#cc0000", border: "1px solid #cc0000", borderRadius: "4px", fontSize: "12px", cursor: "pointer" }}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}

          <div style={{ textAlign: "center", marginTop: "24px" }}>
            <Link href="/shop">
              <button style={{ padding: "12px 32px", backgroundColor: "#fff", color: "#2d6a4f", border: "1px solid #2d6a4f", borderRadius: "4px", cursor: "pointer", fontWeight: "bold" }}>
                Continue Shopping
              </button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}