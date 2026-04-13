export default function OrdersPage() {
    return (
      <div style={{ maxWidth: "500px", margin: "40px auto", padding: "0 20px" }}>
        {/* Progress */}
        <div style={{ display: "flex", alignItems: "center", marginBottom: "40px" }}>
          <div style={{ width: "16px", height: "16px", borderRadius: "50%", backgroundColor: "#2d6a4f" }} />
          <div style={{ flex: 1, height: "3px", backgroundColor: "#ccc" }} />
          <div style={{ width: "16px", height: "16px", borderRadius: "50%", backgroundColor: "#ccc" }} />
          <div style={{ flex: 1, height: "3px", backgroundColor: "#ccc" }} />
          <div style={{ width: "16px", height: "16px", borderRadius: "50%", backgroundColor: "#ccc" }} />
        </div>
  
        {/* Status icons */}
        <div style={{ border: "1px solid #ddd", borderRadius: "8px", padding: "32px 24px" }}>
          <div style={{ display: "flex", justifyContent: "space-around", marginBottom: "32px" }}>
            {[
              { label: "On the way", icon: "🚗" },
              { label: "Delivered", icon: "🚚" },
              { label: "Picked", icon: "📋" },
            ].map(({ label, icon }) => (
              <div key={label} style={{ textAlign: "center" }}>
                <div style={{ fontSize: "40px", marginBottom: "8px" }}>{icon}</div>
                <p style={{ fontSize: "13px", fontWeight: "500" }}>{label}</p>
              </div>
            ))}
          </div>
  
          <div style={{ backgroundColor: "#f0f0f0", borderRadius: "8px", height: "120px", display: "flex", alignItems: "center", justifyContent: "center", color: "#888", fontSize: "13px" }}>
            📍 Location Map
          </div>
        </div>
  
        <footer style={{ marginTop: "60px", backgroundColor: "#1a1a1a", color: "#fff", padding: "32px 24px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "20px", marginBottom: "24px", fontSize: "12px" }}>
            {[0, 1].map((col) => (
              <div key={col}>
                {["About Us", "Policies", "Our Product", "Custom made"].map((item) => (
                  <p key={item} style={{ marginBottom: "6px", cursor: "pointer", color: "#ccc" }}>{item}</p>
                ))}
              </div>
            ))}
            <div>
              <p style={{ marginBottom: "12px", fontSize: "13px" }}>Our Social Media platforms</p>
              <div style={{ display: "flex", gap: "16px", fontSize: "20px" }}>
                <span style={{ cursor: "pointer" }}>📘</span>
                <span style={{ cursor: "pointer" }}>🐦</span>
                <span style={{ cursor: "pointer" }}>📸</span>
              </div>
            </div>
          </div>
        </footer>
      </div>
    );
  }