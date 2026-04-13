"use client";
import { useState } from "react";
import Link from "next/link";
import { FaHeart, FaRegHeart, FaShoppingCart, FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";

const ladiesProducts = [
  { id: 1, name: "Elegant Evening Gown", price: "KES 8,500", rating: 4, colors: ["#000", "#8B4513", "#FFD700"], image: "/Carpet Slit Gown.jpg" },
  { id: 2, name: "Satin Midi Dress", price: "KES 6,200", rating: 5, colors: ["#8B0000", "#FF69B4", "#000"], image: "/Corset-Waist Trousers.jpg" },
  { id: 3, name: "One Shoulder Gown", price: "KES 9,000", rating: 4, colors: ["#FFC0CB", "#800080", "#fff"], image: "/Flowing Silk Maxi Skirt.jpg" },
  { id: 4, name: "Bodycon Dress", price: "KES 5,500", rating: 3, colors: ["#000", "#4B0082", "#DC143C"], image: "/Peplum Top + Pants Set.jpg" },
  { id: 5, name: "Feather Trim Gown", price: "KES 11,000", rating: 5, colors: ["#FFB6C1", "#fff", "#000"], image: "/Power Suit.jpg" },
  { id: 6, name: "Draped Maxi Dress", price: "KES 7,800", rating: 4, colors: ["#D2B48C", "#808080", "#000"], image: "/Red Carpet Slit Gown.jpg" },
  { id: 7, name: "Floral Wrap Dress", price: "KES 5,000", rating: 4, colors: ["#FF6347", "#fff", "#228B22"], image: "/Royal Blazer Dress.jpg" },
  { id: 8, name: "Puff Sleeve Gown", price: "KES 9,800", rating: 5, colors: ["#E6E6FA", "#DDA0DD", "#000"], image: "/Silk Matching Set.jpg" },
  { id: 9, name: "Sequin Mini Dress", price: "KES 7,200", rating: 4, colors: ["#FFD700", "#C0C0C0", "#000"], image: "/Velour Corset bride Dress.jpg" },
  { id: 10, name: "Lace Maxi Gown", price: "KES 12,000", rating: 5, colors: ["#fff", "#FFF0F5", "#000"], image: "/Velour Corset Dress.jpg" },
  { id: 11, name: "Off Shoulder Dress", price: "KES 6,800", rating: 3, colors: ["#DC143C", "#000", "#FF69B4"], image: "/blue gown.jpg" },
  { id: 12, name: "Ankara Print Gown", price: "KES 8,000", rating: 5, colors: ["#FF8C00", "#006400", "#00008B"], image: "/Royal Blazer brown Dress.jpg" },
];

function StarRating({ rating }) {
  return (
    <div style={{ display: "flex", gap: "2px" }}>
      {[1, 2, 3, 4, 5].map((star) => (
        <span key={star} style={{ color: star <= rating ? "#f5a623" : "#ccc", fontSize: "13px" }}>★</span>
      ))}
    </div>
  );
}

function ProductCard({ product, onAddToCart, onToggleFavourite, isFavourite }) {
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [added, setAdded] = useState(false);

  function handleAddToCart() {
    onAddToCart({ ...product, selectedColor });
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  }

  return (
    <div style={{
      border: "1px solid #eee",
      borderRadius: "8px",
      overflow: "hidden",
      backgroundColor: "#fff",
      boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
      position: "relative"
    }}>
      <button
        onClick={() => onToggleFavourite(product)}
        style={{
          position: "absolute", top: "10px", right: "10px",
          background: "rgba(255,255,255,0.9)", border: "none",
          borderRadius: "50%", width: "32px", height: "32px",
          cursor: "pointer", display: "flex",
          alignItems: "center", justifyContent: "center"
        }}
      >
        {isFavourite
          ? <FaHeart color="#e00" size={16} />
          : <FaRegHeart color="#888" size={16} />}
      </button>

      <img
        src={product.image}
        alt={product.name}
        style={{ width: "100%", height: "300px", objectFit: "cover" }}
      />

      <div style={{ padding: "12px" }}>
        <p style={{ fontSize: "13px", fontWeight: "500", margin: "0 0 4px" }}>{product.name}</p>
        <p style={{ fontSize: "11px", color: "#888", margin: "0 0 4px" }}>Available colors</p>

        <div style={{ display: "flex", gap: "6px", margin: "6px 0" }}>
          {product.colors.map((color, i) => (
            <div
              key={i}
              onClick={() => setSelectedColor(color)}
              style={{
                width: "18px", height: "18px", borderRadius: "50%",
                backgroundColor: color, cursor: "pointer",
                border: selectedColor === color ? "2px solid #2d6a4f" : "1px solid #ccc",
                transform: selectedColor === color ? "scale(1.2)" : "scale(1)",
                transition: "all 0.15s"
              }}
            />
          ))}
        </div>

        <StarRating rating={product.rating} />
        <p style={{ fontSize: "13px", fontWeight: "bold", color: "#2d6a4f", margin: "6px 0 10px" }}>
          Price: {product.price}
        </p>

        <div style={{ display: "flex", gap: "8px" }}>
          <button
            onClick={handleAddToCart}
            style={{
              flex: 1, padding: "8px",
              backgroundColor: added ? "#2d6a4f" : "#fff",
              color: added ? "#fff" : "#2d6a4f",
              border: "1px solid #2d6a4f", borderRadius: "4px",
              fontSize: "12px", cursor: "pointer", fontWeight: "bold",
              transition: "all 0.2s"
            }}
          >
            {added ? "Added ✓" : "Add to cart"}
          </button>
          <Link href="/checkout" style={{ flex: 1 }}>
            <button style={{
              width: "100%", padding: "8px", backgroundColor: "#2d6a4f",
              color: "#fff", border: "none", borderRadius: "4px",
              fontSize: "12px", cursor: "pointer", fontWeight: "bold"
            }}>
              Shop now
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function LadiesPage() {
  const [cart, setCart] = useState([]);
  const [favourites, setFavourites] = useState([]);
  const [toast, setToast] = useState("");

  function addToCart(product) {
    setCart((prev) => {
      const existing = prev.find((i) => i.id === product.id && i.selectedColor === product.selectedColor);
      if (existing) {
        return prev.map((i) =>
          i.id === product.id && i.selectedColor === product.selectedColor
            ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    setToast(`${product.name} added to cart!`);
    setTimeout(() => setToast(""), 2000);
  }

  function toggleFavourite(product) {
    setFavourites((prev) => {
      const exists = prev.find((i) => i.id === product.id);
      if (exists) {
        setToast("Removed from favourites");
        setTimeout(() => setToast(""), 2000);
        return prev.filter((i) => i.id !== product.id);
      }
      setToast(`${product.name} added to favourites!`);
      setTimeout(() => setToast(""), 2000);
      return [...prev, product];
    });
  }

  const totalItems = cart.reduce((sum, i) => sum + i.quantity, 0);

  return (
    <div>
      {toast && (
        <div style={{
          position: "fixed", top: "80px", right: "20px",
          backgroundColor: "#2d6a4f", color: "#fff",
          padding: "12px 20px", borderRadius: "8px",
          fontSize: "13px", zIndex: 1000
        }}>
          {toast}
        </div>
      )}

      <div style={{
        backgroundColor: "#fff", borderBottom: "1px solid #eee",
        padding: "10px 40px", display: "flex",
        justifyContent: "flex-end", gap: "20px", alignItems: "center"
      }}>
        <Link href="/wishlist" style={{ textDecoration: "none", color: "#555", fontSize: "13px", display: "flex", alignItems: "center", gap: "6px" }}>
          <FaHeart color="#e00" size={14} /> Favourites ({favourites.length})
        </Link>
        <Link href="/cart" style={{ textDecoration: "none", color: "#555", fontSize: "13px", display: "flex", alignItems: "center", gap: "6px" }}>
          <FaShoppingCart color="#2d6a4f" size={14} /> Cart ({totalItems})
        </Link>
      </div>

      <div style={{ backgroundColor: "#f9f9f9", minHeight: "100vh", padding: "40px 20px" }}>
        <h2 style={{
          textAlign: "center", fontFamily: "Georgia, serif",
          fontStyle: "italic", fontSize: "28px",
          color: "#2d6a4f", marginBottom: "32px"
        }}>
          Ladies Category
        </h2>
        <div style={{
          maxWidth: "1100px", margin: "0 auto",
          display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
          gap: "24px"
        }}>
          {ladiesProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={addToCart}
              onToggleFavourite={toggleFavourite}
              isFavourite={!!favourites.find((i) => i.id === product.id)}
            />
          ))}
        </div>
      </div>

      <footer style={{ backgroundColor: "#1a1a1a", color: "#fff", padding: "32px 24px" }}>
        <div style={{
          display: "grid", gridTemplateColumns: "1fr 1fr 1fr",
          gap: "20px", maxWidth: "1100px", margin: "0 auto",
          marginBottom: "24px", fontSize: "12px"
        }}>
          <div>
            <p style={{ fontWeight: "500", marginBottom: "10px", color: "#fff" }}>Company</p>
            {[
              { label: "About Us", href: "/about" },
              { label: "Policies", href: "/policies" },
              { label: "Our Product", href: "/shop" },
              { label: "Custom made", href: "/request" },
            ].map((item) => (
              <Link key={item.label} href={item.href} style={{ display: "block", marginBottom: "6px", color: "#ccc", textDecoration: "none" }}>
                {item.label}
              </Link>
            ))}
          </div>
          <div>
            <p style={{ fontWeight: "500", marginBottom: "10px", color: "#fff" }}>Help</p>
            {[
              { label: "Contact Us", href: "/contact" },
              { label: "My Orders", href: "/orders" },
              { label: "Cart", href: "/cart" },
              { label: "Wishlist", href: "/wishlist" },
            ].map((item) => (
              <Link key={item.label} href={item.href} style={{ display: "block", marginBottom: "6px", color: "#ccc", textDecoration: "none" }}>
                {item.label}
              </Link>
            ))}
          </div>
          <div>
            <p style={{ fontWeight: "500", marginBottom: "12px", fontSize: "13px" }}>Our Social Media</p>
            <div style={{ display: "flex", gap: "16px" }}>
              <a href="https://facebook.com" target="_blank" rel="noreferrer">
                <FaFacebook color="#ccc" size={22} />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noreferrer">
                <FaTwitter color="#ccc" size={22} />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noreferrer">
                <FaInstagram color="#ccc" size={22} />
              </a>
            </div>
          </div>
        </div>
        <p style={{ textAlign: "center", fontSize: "11px", color: "#666", marginTop: "16px" }}>
          © 2026 Kipepeo Fashion. All rights reserved.
        </p>
      </footer>
    </div>
  );
}