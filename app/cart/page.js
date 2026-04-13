"use client";
import Link from "next/link";
import { useShop } from "@/app/context/ShopContext";
import { FaTrash } from "react-icons/fa";

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, totalPrice } = useShop();

  if (cart.length === 0) {
    return (
      <div style={{ textAlign: "center", padding: "80px 20px" }}>
        <p style={{ fontSize: "16px", color: "#888", marginBottom: "20px" }}>Your cart is empty</p>
        <Link href="/shop">
          <button style={{ padding: "12px 32px", backgroundColor: "#2d6a4f", color: "#fff", border: "none", borderRadius: "4px", cursor: "pointer", fontWeight: "bold" }}>
            Browse Shop
          </button>
        </Link>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: "600px", margin: "40px auto", padding: "0 20px" }}>
      <h2 style={{
        textAlign: "center", fontFamily: "Georgia, serif",
        fontStyle: "italic", fontSize: "26px",
        color: "#2d6a4f", marginBottom: "32px"
      }}>
        My Cart
      </h2>

      {cart.map((item) => (
        <div key={`${item.id}-${item.selectedColor}`} style={{
          display: "flex", alignItems: "center", gap: "16px",
          marginBottom: "20px", borderBottom: "1px solid #eee", paddingBottom: "20px"
        }}>
          <img
            src={item.image}
            alt={item.name}
            style={{ width: "90px", height: "90px", objectFit: "cover", borderRadius: "6px" }}
          />

          <div style={{ flex: 1 }}>
            <p style={{ fontSize: "14px", fontWeight: "500", margin: "0 0 4px" }}>{item.name}</p>
            <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "4px" }}>
              <span style={{ fontSize: "11px", color: "#888" }}>Color:</span>
              <div style={{
                width: "14px", height: "14px", borderRadius: "50%",
                backgroundColor: item.selectedColor, border: "1px solid #ccc"
              }} />
            </div>
            <p style={{ fontSize: "13px", color: "#2d6a4f", fontWeight: "bold", margin: 0 }}>
              {item.price}
            </p>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <button
              onClick={() => updateQuantity(item.id, item.selectedColor, item.quantity - 1)}
              style={{ width: "28px", height: "28px", border: "1px solid #ddd", borderRadius: "4px", cursor: "pointer", fontSize: "16px", background: "#fff" }}
            >−</button>
            <span style={{ fontSize: "14px", fontWeight: "500", minWidth: "20px", textAlign: "center" }}>
              {item.quantity}
            </span>
            <button
              onClick={() => updateQuantity(item.id, item.selectedColor, item.quantity + 1)}
              style={{ width: "28px", height: "28px", border: "1px solid #ddd", borderRadius: "4px", cursor: "pointer", fontSize: "16px", background: "#fff" }}
            >+</button>
          </div>

          {/* Remove button */}
          <button
            onClick={() => removeFromCart(item.id, item.selectedColor)}
            style={{ background: "none", border: "none", cursor: "pointer", color: "#cc0000" }}
          >
            <FaTrash size={14} />
          </button>
        </div>
      ))}

      <div style={{ border: "1px solid #eee", borderRadius: "8px", padding: "16px", backgroundColor: "#fff", marginTop: "8px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px", fontSize: "13px", color: "#555" }}>
          <span>Subtotal</span>
          <span>KES {totalPrice.toLocaleString()}</span>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "16px", fontSize: "13px", color: "#555" }}>
          <span>Shipping</span>
          <span>KES 200</span>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", fontWeight: "bold", fontSize: "15px", borderTop: "1px solid #eee", paddingTop: "12px" }}>
          <span>Total</span>
          <span style={{ color: "#2d6a4f" }}>KES {(totalPrice + 200).toLocaleString()}</span>
        </div>
      </div>

      <div style={{ textAlign: "center", marginTop: "24px" }}>
        <Link href="/checkout">
          <button style={{
            padding: "13px 60px", backgroundColor: "#2d6a4f",
            color: "#fff", border: "none", borderRadius: "4px",
            fontSize: "15px", fontWeight: "bold", cursor: "pointer"
          }}>
            Checkout
          </button>
        </Link>
      </div>
    </div>
  );
}