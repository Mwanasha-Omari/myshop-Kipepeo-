"use client";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { useShop } from "@/app/context/ShopContext";
import Link from "next/link";
import {
  FiMapPin, FiUser, FiPhone, FiChevronRight,
  FiChevronLeft, FiCheckCircle, FiShoppingBag,
  FiCreditCard, FiTruck, FiPackage
} from "react-icons/fi";
export default function CheckoutPage() {
  const { cart, totalPrice } = useShop();

  const [step, setStep] = useState(1);
  const [shipping, setShipping] = useState({ name: "", address: "", contact: "" });
  const [coords, setCoords] = useState({ lat: -4.0435, lng: 39.6682 }); // Mombasa default
  const [payment, setPayment] = useState("mpesa");
  const [phone, setPhone] = useState("");
  const [cardDetails, setCardDetails] = useState({ number: "", expiry: "", cvv: "" });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("success");
  const mapRef = useRef(null);
  const markerRef = useRef(null);
  const leafletMap = useRef(null);

  useEffect(() => {
    if (step !== 1) return;
    if (leafletMap.current) return;

    const L = window.L;
    if (!L) return;

    const map = L.map(mapRef.current, { zoomControl: true }).setView(
      [coords.lat, coords.lng], 14
    );

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "© OpenStreetMap contributors",
    }).addTo(map);

    const marker = L.marker([coords.lat, coords.lng], { draggable: true }).addTo(map);
    marker.bindPopup("Drag to your delivery location").openPopup();

    marker.on("dragend", (e) => {
      const { lat, lng } = e.target.getLatLng();
      setCoords({ lat: +lat.toFixed(5), lng: +lng.toFixed(5) });

      fetch(`https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`)
        .then((r) => r.json())
        .then((d) => {
          if (d.display_name) {
            setShipping((prev) => ({ ...prev, address: d.display_name.split(",").slice(0, 3).join(", ") }));
          }
        })
        .catch(() => {});
    });

    map.on("click", (e) => {
      const { lat, lng } = e.latlng;
      marker.setLatLng([lat, lng]);
      setCoords({ lat: +lat.toFixed(5), lng: +lng.toFixed(5) });

      fetch(`https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`)
        .then((r) => r.json())
        .then((d) => {
          if (d.display_name) {
            setShipping((prev) => ({ ...prev, address: d.display_name.split(",").slice(0, 3).join(", ") }));
          }
        })
        .catch(() => {});
    });

    leafletMap.current = map;
    markerRef.current = marker;
  }, [step]);

  function locateMe() {
    if (!navigator.geolocation) return;
    navigator.geolocation.getCurrentPosition((pos) => {
      const { latitude: lat, longitude: lng } = pos.coords;
      setCoords({ lat, lng });
      leafletMap.current?.setView([lat, lng], 16);
      markerRef.current?.setLatLng([lat, lng]);

      fetch(`https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`)
        .then((r) => r.json())
        .then((d) => {
          if (d.display_name) {
            setShipping((prev) => ({ ...prev, address: d.display_name.split(",").slice(0, 3).join(", ") }));
          }
        })
        .catch(() => {});
    });
  }

  function handleShippingDone(e) {
    e.preventDefault();
    if (!shipping.name || !shipping.address || !shipping.contact) {
      setMessage("Please fill in all shipping details");
      setMessageType("error");
      return;
    }
    setMessage("");
    setStep(2);
  }

  async function handlePayment() {
    setLoading(true);
    setMessage("");
    try {
      if (payment === "mpesa") {
        if (!phone) {
          setMessage("Please enter your M-Pesa phone number");
          setMessageType("error");
          setLoading(false);
          return;
        }
        const res = await fetch("/api/payments/mpesa", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            phone: phone.startsWith("0") ? "254" + phone.slice(1) : phone,
            amount: totalPrice + 200,
          }),
        });
        const data = await res.json();
        if (data.ResponseCode === "0") {
          setMessage("Check your phone for the M-Pesa prompt!");
          setMessageType("success");
          setTimeout(() => setStep(3), 3000);
        } else {
          setMessage(data.errorMessage || "M-Pesa request failed. Try again.");
          setMessageType("error");
        }
      } else if (payment === "card") {
        if (!cardDetails.number || !cardDetails.expiry || !cardDetails.cvv) {
          setMessage("Please fill in all card details");
          setMessageType("error");
          setLoading(false);
          return;
        }
        const res = await fetch("/api/payments/card", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ amount: totalPrice + 200, cardDetails }),
        });
        const data = await res.json();
        if (data.success) setStep(3);
        else {
          setMessage(data.error || "Card payment failed. Try again.");
          setMessageType("error");
        }
      } else {
        setStep(3);
      }
    } catch {
      setMessage("Something went wrong. Check your connection.");
      setMessageType("error");
    }
    setLoading(false);
  }

  if (cart.length === 0 && step !== 3) {
    return (
      <div style={{ textAlign: "center", padding: "80px 20px" }}>
        <FiShoppingBag size={40} color="#ccc" style={{ marginBottom: "16px" }} />
        <p style={{ fontSize: "15px", color: "#888", marginBottom: "20px" }}>Your cart is empty</p>
        <Link href="/shop">
          <button style={btnGreen}>Go Shopping</button>
        </Link>
      </div>
    );
  }

  const steps = [
    { label: "Delivery", icon: <FiMapPin size={14} /> },
    { label: "Payment", icon: <FiCreditCard size={14} /> },
    { label: "Complete", icon: <FiCheckCircle size={14} /> },
  ];

  return (
    <>
      <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
      <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js" async />

      <div style={{ maxWidth: "560px", margin: "40px auto", padding: "0 20px" }}>

        <div style={{ display: "flex", alignItems: "center", marginBottom: "36px" }}>
          {steps.map((s, i) => (
            <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center" }}>
              <div style={{
                width: "32px", height: "32px", borderRadius: "50%",
                backgroundColor: step > i + 1 ? "#2d6a4f" : step === i + 1 ? "#2d6a4f" : "#eee",
                display: "flex", alignItems: "center", justifyContent: "center",
                color: step >= i + 1 ? "#fff" : "#aaa",
                marginBottom: "4px", transition: "background 0.3s"
              }}>
                {s.icon}
              </div>
              <p style={{ fontSize: "11px", color: step === i + 1 ? "#2d6a4f" : "#aaa", margin: 0, fontWeight: step === i + 1 ? "600" : "400" }}>
                {s.label}
              </p>
              {i < steps.length - 1 && (
                <div style={{ position: "absolute", width: "calc(33% - 32px)", height: "1px", backgroundColor: step > i + 1 ? "#2d6a4f" : "#eee" }} />
              )}
            </div>
          ))}
        </div>

        {step === 1 && (
          <div style={card}>
            <h3 style={cardTitle}><FiTruck size={16} style={{ marginRight: "8px" }} />Delivery Details</h3>
            <p style={cardSub}>Pin your delivery location on the map</p>

            <div style={{ position: "relative", marginBottom: "16px" }}>
              <div ref={mapRef} style={{ width: "100%", height: "220px", borderRadius: "8px", border: "1px solid #eee", overflow: "hidden" }} />
              <button
                type="button"
                onClick={locateMe}
                style={{
                  position: "absolute", bottom: "12px", right: "12px", zIndex: 1000,
                  background: "#fff", border: "1px solid #ddd", borderRadius: "6px",
                  padding: "6px 10px", fontSize: "12px", cursor: "pointer",
                  display: "flex", alignItems: "center", gap: "4px", boxShadow: "0 1px 4px rgba(0,0,0,0.12)"
                }}
              >
                <FiMapPin size={12} color="#2d6a4f" /> Use my location
              </button>
            </div>

            {message && <p style={{ color: "red", fontSize: "12px", textAlign: "center", marginBottom: "10px" }}>{message}</p>}

            <form onSubmit={handleShippingDone} style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              {[
                { label: "Name", key: "name", placeholder: "Your full name", icon: <FiUser size={14} color="#aaa" /> },
                { label: "Address", key: "address", placeholder: "Auto-filled or type address", icon: <FiMapPin size={14} color="#aaa" /> },
                { label: "Contact", key: "contact", placeholder: "Phone number", icon: <FiPhone size={14} color="#aaa" /> },
              ].map(({ label, key, placeholder, icon }) => (
                <div key={key}>
                  <label style={{ fontSize: "12px", color: "#888", marginBottom: "4px", display: "block" }}>{label}</label>
                  <div style={{ display: "flex", alignItems: "center", border: "1px solid #ddd", borderRadius: "6px", padding: "0 10px", gap: "8px" }}>
                    {icon}
                    <input
                      placeholder={placeholder}
                      value={shipping[key]}
                      onChange={(e) => setShipping({ ...shipping, [key]: e.target.value })}
                      style={{ flex: 1, padding: "9px 0", border: "none", outline: "none", fontSize: "13px", background: "transparent" }}
                    />
                  </div>
                </div>
              ))}

              <button type="submit" style={{ ...btnGreen, display: "flex", alignItems: "center", justifyContent: "center", gap: "6px", marginTop: "4px" }}>
                Continue <FiChevronRight size={15} />
              </button>
            </form>
          </div>
        )}

        {step === 2 && (
          <div style={card}>
            <h3 style={cardTitle}><FiCreditCard size={16} style={{ marginRight: "8px" }} />Payment Method</h3>

            <div style={{ display: "flex", gap: "10px", marginBottom: "20px", flexWrap: "wrap" }}>
              {[
{ value: "mpesa", label: "M-Pesa", icon: <span style={{ fontSize: "13px", fontWeight: "700", color: "#4caf50" }}>M</span> },
{ value: "card", label: "Card", icon: <FiCreditCard size={16} /> },
                { value: "cash", label: "Cash on Delivery", icon: <FiTruck size={16} /> },
              ].map((opt) => (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => { setPayment(opt.value); setMessage(""); }}
                  style={{
                    flex: 1, padding: "10px 8px", border: `1.5px solid ${payment === opt.value ? "#2d6a4f" : "#ddd"}`,
                    borderRadius: "8px", backgroundColor: payment === opt.value ? "#f0f7f4" : "#fff",
                    color: payment === opt.value ? "#2d6a4f" : "#555",
                    cursor: "pointer", fontSize: "12px", fontWeight: payment === opt.value ? "600" : "400",
                    display: "flex", flexDirection: "column", alignItems: "center", gap: "5px"
                  }}
                >
                  {opt.icon}{opt.label}
                </button>
              ))}
            </div>

            {payment === "mpesa" && (
              <div style={{ marginBottom: "16px" }}>
                <label style={{ fontSize: "12px", color: "#888", marginBottom: "4px", display: "block" }}>M-Pesa Number</label>
                <div style={{ display: "flex", alignItems: "center", border: "1px solid #ddd", borderRadius: "6px", padding: "0 10px", gap: "8px" }}>
                  <FiPhone size={14} color="#aaa" />
                  <input
                    placeholder="e.g. 0712345678"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    style={{ flex: 1, padding: "9px 0", border: "none", outline: "none", fontSize: "13px", background: "transparent" }}
                  />
                </div>
              </div>
            )}

            {payment === "card" && (
              <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginBottom: "16px" }}>
                <div style={{ display: "flex", alignItems: "center", border: "1px solid #ddd", borderRadius: "6px", padding: "0 10px", gap: "8px" }}>
                  <FiCreditCard size={14} color="#aaa" />
                  <input placeholder="Card number" value={cardDetails.number}
                    onChange={(e) => setCardDetails({ ...cardDetails, number: e.target.value })}
                    style={{ flex: 1, padding: "9px 0", border: "none", outline: "none", fontSize: "13px", background: "transparent" }} />
                </div>
                <div style={{ display: "flex", gap: "10px" }}>
                  {["expiry", "cvv"].map((k) => (
                    <input key={k} placeholder={k === "expiry" ? "MM/YY" : "CVV"}
                      value={cardDetails[k]}
                      onChange={(e) => setCardDetails({ ...cardDetails, [k]: e.target.value })}
                      style={{ flex: 1, padding: "9px 10px", border: "1px solid #ddd", borderRadius: "6px", fontSize: "13px" }} />
                  ))}
                </div>
              </div>
            )}

            {payment === "cash" && (
              <div style={{ background: "#f9f9f9", borderRadius: "8px", padding: "12px 14px", marginBottom: "16px", display: "flex", alignItems: "center", gap: "8px" }}>
                <FiPackage size={16} color="#2d6a4f" />
                <p style={{ fontSize: "13px", color: "#555", margin: 0 }}>Pay when your order is delivered.</p>
              </div>
            )}

            {message && (
              <p style={{ textAlign: "center", fontSize: "13px", color: messageType === "error" ? "red" : "#2d6a4f", marginBottom: "12px" }}>{message}</p>
            )}

            <div style={{ borderTop: "1px solid #f0f0f0", paddingTop: "14px", marginBottom: "18px" }}>
              {cart.map((item) => (
                <div key={`${item.id}-${item.selectedColor}`} style={{ display: "flex", justifyContent: "space-between", fontSize: "13px", marginBottom: "5px", color: "#555" }}>
                  <span>{item.name} x{item.quantity}</span>
                  <span>KES {(parseInt(item.price.replace(/[^0-9]/g, "")) * item.quantity).toLocaleString()}</span>
                </div>
              ))}
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "13px", color: "#888", marginTop: "6px" }}>
                <span>Shipping</span><span>KES 200</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", fontWeight: "600", fontSize: "15px", borderTop: "1px solid #f0f0f0", paddingTop: "10px", marginTop: "8px" }}>
                <span>Total</span>
                <span style={{ color: "#2d6a4f" }}>KES {(totalPrice + 200).toLocaleString()}</span>
              </div>
            </div>

            <div style={{ display: "flex", gap: "10px" }}>
              <button onClick={() => setStep(1)} style={{ ...btnOutline, display: "flex", alignItems: "center", gap: "5px" }}>
                <FiChevronLeft size={15} /> Back
              </button>
              <button onClick={handlePayment} disabled={loading} style={{ ...btnGreen, flex: 2, display: "flex", alignItems: "center", justifyContent: "center", gap: "6px" }}>
                {loading ? "Processing..." : payment === "cash" ? "Place Order" : "Pay Now"}
                {!loading && <FiChevronRight size={15} />}
              </button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div style={{ ...card, textAlign: "center", padding: "56px 28px" }}>
            <FiCheckCircle size={52} color="#2d6a4f" style={{ marginBottom: "16px" }} />
            <h3 style={{ color: "#2d6a4f", marginBottom: "8px" }}>Order Placed!</h3>
            <p style={{ fontSize: "13px", color: "#888", marginBottom: "28px" }}>
              Thank you for your order. We'll contact you shortly.
            </p>
            <Link href="/orders">
              <button style={btnGreen}>Track My Order</button>
            </Link>
          </div>
        )}

      </div>
    </>
  );
}

const card = {
  border: "1px solid #eee", borderRadius: "10px", padding: "28px", background: "#fff"
};
const cardTitle = {
  fontSize: "16px", fontWeight: "600", marginBottom: "4px", display: "flex", alignItems: "center", color: "#222"
};
const cardSub = {
  fontSize: "12px", color: "#aaa", marginBottom: "16px", marginTop: 0
};
const btnGreen = {
  padding: "11px 28px", backgroundColor: "#2d6a4f", color: "#fff",
  border: "none", borderRadius: "6px", fontSize: "14px", fontWeight: "600", cursor: "pointer", width: "100%"
};
const btnOutline = {
  flex: 1, padding: "11px", border: "1px solid #ddd", backgroundColor: "#fff",
  borderRadius: "6px", cursor: "pointer", fontSize: "13px", color: "#555", justifyContent: "center"
};