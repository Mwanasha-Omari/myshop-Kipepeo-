"use client";
import { useState } from "react";
import Link from "next/link";
import { FaHeart, FaRegHeart, FaShoppingCart, FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";
import { useShop } from "@/app/context/ShopContext";

const menProducts = [
  { id: 101, name: "Classic Dark Suit", price: "KES 12,000", rating: 5, colors: ["#000", "#1a1a2e", "#2d4a22"], image: "/brown suit.jpg" },
  { id: 102, name: "Velvet Blazer", price: "KES 9,500", rating: 4, colors: ["#000080", "#000", "#8B0000"], image: "/fashinista.jpg" },
  { id: 103, name: "African Print Suit", price: "KES 10,500", rating: 5, colors: ["#8B4513", "#DAA520", "#006400"], image: "/formen.jpg" },
  { id: 104, name: "Slim Fit Tuxedo", price: "KES 13,000", rating: 4, colors: ["#000", "#36454F", "#1C1C1C"], image: "/jordan.jpg" },
  { id: 105, name: "Casual Smart Jacket", price: "KES 8,000", rating: 4, colors: ["#808080", "#000", "#4B3832"], image: "/linen.jpg" },
  { id: 106, name: "Linen Summer Suit", price: "KES 7,500", rating: 3, colors: ["#F5F5DC", "#D2B48C", "#808080"], image: "/masc.jpg" },
  { id: 107, name: "Tailored Blazer", price: "KES 12,000", rating: 5, colors: ["#000", "#1a1a2e", "#2d4a22"], image: "/black.jpg" },
  { id: 108, name: "Smart Casual Suit", price: "KES 9,500", rating: 4, colors: ["#000080", "#000", "#8B0000"], image: "/fm.jpg" },
  { id: 109, name: "Designer Suit", price: "KES 10,500", rating: 5, colors: ["#8B4513", "#DAA520", "#006400"], image: "/love.jpg" },
  { id: 110, name: "Premium Tuxedo", price: "KES 13,000", rating: 4, colors: ["#000", "#36454F", "#1C1C1C"], image: "/pretty.jpg" },
  { id: 111, name: "Modern Fit Suit", price: "KES 8,000", rating: 4, colors: ["#808080", "#000", "#4B3832"], image: "/formen.jpg" },
  { id: 112, name: "Classic Linen Suit", price: "KES 7,500", rating: 3, colors: ["#F5F5DC", "#D2B48C", "#808080"], image: "/fashinista.jpg" },
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
      border: "1px solid #eee", borderRadius: "8px", overflow: "hidden",
      backgroundColor: "#fff", boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
      position: "relative"
    }}>
      <button
        onClick={() => onToggleFavourite(product)}
        style={{
          position: "absolute", top: "10px", right: "10px",
          background: "rgba(255,255,255,0.9)", border: "none",
          borderRadius: "50%", width: "32px", height: "32px",
          cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center"
        }}
      >
        {isFavourite ? <FaHeart color="#e00" size={16} /> : <FaRegHeart color="#888" size={16} />}
      </button>

      <img src={product.image} alt={product.name} style={{ width: "100%", height: "300px", objectFit: "cover" }} />

      <div style={{ padding: "12px" }}>
        <p style={{ fontSize: "13px", fontWeight: "500", margin: "0 0 4px" }}>{product.name}</p>
        <p style={{ fontSize: "11px", color: "#888", margin: "0 0 4px" }}>Available colors</p>
        <div style={{ display: "flex", gap: "6px", margin: "6px 0" }}>
          {product.colors.map((color, i) => (
            <div key={i} onClick={() => setSelectedColor(color)} style={{
              width: "18px", height: "18px", borderRadius: "50%",
              backgroundColor: color, cursor: "pointer",
              border: selectedColor === color ? "2px solid #2d6a4f" : "1px solid #ccc",
              transform: selectedColor === color ? "scale(1.2)" : "scale(1)",
              transition: "all 0.15s"
            }} />
          ))}
        </div>
        <StarRating rating={product.rating} />
        <p style={{ fontSize: "13px", fontWeight: "bold", color: "#2d6a4f", margin: "6px 0 10px" }}>
          Price: {product.price}
        </p>
        <div style={{ display: "flex", gap: "8px" }}>
          <button onClick={handleAddToCart} style={{
            flex: 1, padding: "8px",
            backgroundColor: added ? "#2d6a4f" : "#fff",
            color: added ? "#fff" : "#2d6a4f",
            border: "1px solid #2d6a4f", borderRadius: "4px",
            fontSize: "12px", cursor: "pointer", fontWeight: "bold", transition: "all 0.2s"
          }}>
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

export default function MenPage() {
  const { favourites, totalItems, addToCart, toggleFavourite } = useShop();
  const [toast, setToast] = useState("");

  function handleAddToCart(product) {
    addToCart(product);
    setToast(`${product.name} added to cart!`);
    setTimeout(() => setToast(""), 2000);
  }

  function handleToggleFavourite(product) {
    toggleFavourite(product);
    const exists = favourites.find((i) => i.id === product.id);
    setToast(exists ? "Removed from favourites" : `${product.name} added to favourites!`);
    setTimeout(() => setToast(""), 2000);
  }

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

      {/* Cart & Favourites bar */}
      <div style={{
        backgroundColor: "#fff", borderBottom: "1px solid #eee",
        padding: "10px 40px", display: "flex",
        justifyContent: "flex-end", gap: "20px", alignItems: "center"
      }}>
        <Link href="/wishlist" style={{ textDecoration: "none", color: "#555", fontSize: "13px", display: "flex", alignItems: "center", gap: "6px" }}>
          <FaHeart color="#e00" size={14} /> Favourites ({favourites.length})
        </Link>
        <Link href="/cart" style={{ textDecoration: "black", color: "#555", fontSize: "13px", display: "flex", alignItems: "center", gap: "6px" }}>
          <FaShoppingCart color="#2d6a4f" size={14} /> Cart ({totalItems})
        </Link>
      </div>

      <div style={{ backgroundColor: "#f9f9f9", minHeight: "100vh", padding: "40px 20px" }}>
        <h2 style={{
          textAlign: "center", fontFamily: "Georgia, serif",
          fontStyle: "italic", fontSize: "28px",
          color: "#2d6a4f", marginBottom: "32px"
        }}>
          Men Category
        </h2>
        <div style={{
          maxWidth: "1100px", margin: "0 auto",
          display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
          gap: "24px"
        }}>
          {menProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={handleAddToCart}
              onToggleFavourite={handleToggleFavourite}
              isFavourite={!!favourites.find((i) => i.id === product.id)}
            />
          ))}
        </div>
      </div>

      {/* Footer */}
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
              <a href="https://facebook.com" target="_blank" rel="noreferrer"><FaFacebook color="#ccc" size={22} /></a>
              <a href="https://twitter.com" target="_blank" rel="noreferrer"><FaTwitter color="#ccc" size={22} /></a>
              <a href="https://instagram.com" target="_blank" rel="noreferrer"><FaInstagram color="#ccc" size={22} /></a>
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