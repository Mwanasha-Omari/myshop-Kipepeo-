import Link from "next/link";

const ladiesProducts = [
    { id: 1, name: "Elegant Evening Gown", price: "KES 8,500", rating: 4, image: "/Carpet Slit Gown.jpg" },
    { id: 2, name: "Satin Midi Dress", price: "KES 6,200", rating: 5, image: "/Corset-Waist Trousers.jpg" },
    { id: 3, name: "One Shoulder Gown", price: "KES 9,000", rating: 4, image: "/Flowing Silk Maxi Skirt.jpg" },
    { id: 4, name: "Bodycon Dress", price: "KES 5,500", rating: 3, image: "/Peplum Top + Pants Set.jpg" },
  ];

const menProducts = [
    { id: 1, name: "Classic Dark Suit", price: "KES 12,000", rating: 5, colors: ["#000", "#1a1a2e", "#2d4a22"], image: "/brown suit.jpg" },
    { id: 2, name: "Velvet Blazer", price: "KES 9,500", rating: 4, colors: ["#000080", "#000", "#8B0000"], image: "/fashinista.jpg" },
    { id: 3, name: "African Print Suit", price: "KES 10,500", rating: 5, colors: ["#8B4513", "#DAA520", "#006400"], image: "/formen.jpg" },
    { id: 4, name: "Slim Fit Tuxedo", price: "KES 13,000", rating: 4, colors: ["#000", "#36454F", "#1C1C1C"], image: "/jordan.jpg" },
];

function StarRating({ rating }) {
  return (
    <div style={{ display: "flex", gap: "2px", margin: "6px 0" }}>
      {[1, 2, 3, 4, 5].map((star) => (
        <span key={star} style={{ color: star <= rating ? "#f5a623" : "#ccc", fontSize: "14px" }}>★</span>
      ))}
    </div>
  );
}

function ProductCard({ product }) {
  return (
    <div style={{
      border: "1px solid #eee",
      borderRadius: "8px",
      overflow: "hidden",
      backgroundColor: "#fff",
      boxShadow: "0 2px 8px rgba(0,0,0,0.06)"
    }}>
      <img
        src={product.image}
        alt={product.name}
        style={{ width: "100%", height: "280px", objectFit: "cover" }}
      />
      <div style={{ padding: "12px" }}>
        <p style={{ fontSize: "14px", fontWeight: "500", margin: "0 0 4px" }}>{product.name}</p>
        <StarRating rating={product.rating} />
        <p style={{ fontSize: "14px", fontWeight: "bold", color: "#2d6a4f", margin: "4px 0 12px" }}>
          {product.price}
        </p>
        <div style={{ display: "flex", gap: "8px" }}>
          <button style={{
            flex: 1,
            padding: "8px",
            backgroundColor: "#2d6a4f",
            color: "#fff",
            border: "none",
            borderRadius: "4px",
            fontSize: "13px",
            cursor: "pointer",
            fontWeight: "bold"
          }}>
            VIEW
          </button>
          <button style={{
            padding: "8px 12px",
            backgroundColor: "#fff",
            color: "#2d6a4f",
            border: "1px solid #2d6a4f",
            borderRadius: "4px",
            fontSize: "13px",
            cursor: "pointer"
          }}>
            🛒
          </button>
        </div>
      </div>
    </div>
  );
}

function CategorySection({ title, products, viewLink }) {
  return (
    <section style={{ marginBottom: "60px" }}>
      <h2 style={{
        textAlign: "center",
        fontFamily: "Georgia, serif",
        fontStyle: "italic",
        fontSize: "28px",
        color: "#2d6a4f",
        marginBottom: "24px"
      }}>
        {title}
      </h2>
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
        gap: "20px",
        marginBottom: "24px"
      }}>
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      <div style={{ textAlign: "center" }}>
        <Link href={viewLink}>
          <button style={{
            padding: "12px 48px",
            backgroundColor: "#2d6a4f",
            color: "#fff",
            border: "none",
            borderRadius: "4px",
            fontSize: "15px",
            fontWeight: "bold",
            cursor: "pointer",
            letterSpacing: "1px"
          }}>
            VIEW ALL
          </button>
        </Link>
      </div>
    </section>
  );
}

export default function ShopPage() {
  return (
    <div style={{ backgroundColor: "#f9f9f9", minHeight: "100vh" }}>
      <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "40px 20px" }}>
        <CategorySection
          title="Ladies Category"
          products={ladiesProducts}
          viewLink="/shop/ladies"
        />
        <CategorySection
          title="Men Category"
          products={menProducts}
          viewLink="/shop/men"
        />
      </div>

      <footer style={{
        backgroundColor: "#1a1a1a",
        color: "#fff",
        textAlign: "center",
        padding: "24px",
        fontSize: "13px"
      }}>
        <p>© 2026 Kipepeo Fashion. All rights reserved.</p>
        <div style={{ marginTop: "8px", display: "flex", justifyContent: "center", gap: "16px" }}>
          <a href="#" style={{ color: "#fff" }}>Facebook</a>
          <a href="#" style={{ color: "#fff" }}>Instagram</a>
          <a href="#" style={{ color: "#fff" }}>Twitter</a>
        </div>
      </footer>
    </div>
  );
}