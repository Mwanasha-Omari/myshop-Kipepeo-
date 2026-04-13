"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { auth, googleProvider } from "@/lib/firebase";
import { createUserWithEmailAndPassword, signInWithPopup } from "firebase/auth";

export default function LoginPage() {
  const router = useRouter();
  const [form, setForm] = useState({ name: "", email: "", password: "", confirm: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSignup(e) {
    e.preventDefault();
    if (form.password !== form.confirm) return setError("Passwords don't match");
    setLoading(true);
    try {
      await createUserWithEmailAndPassword(auth, form.email, form.password);
      router.push("/shop");
    } catch (err) {
      setError(err.message);
    }
    setLoading(false);
  }

  async function handleGoogle() {
    try {
      await signInWithPopup(auth, googleProvider);
      router.push("/shop");
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <div style={{
      minHeight: "100vh",
      backgroundImage: "url('/tailored.jpg')",
      backgroundSize: "cover",
      backgroundPosition: "center",
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    }}>
      <div style={{ position: "absolute", inset: 0, backgroundColor: "rgba(0,0,0,0.55)" }} />
      <div style={{
        position: "relative",
        backgroundColor: "#fff",
        borderRadius: "8px",
        padding: "36px 32px",
        width: "100%",
        maxWidth: "360px"
      }}>
        <h2 style={{ textAlign: "center", marginBottom: "24px", fontSize: "18px" }}>Sign Up</h2>

        {error && (
          <p style={{ color: "red", fontSize: "12px", textAlign: "center", marginBottom: "10px" }}>{error}</p>
        )}

        <form onSubmit={handleSignup} style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          {[
            { label: "Name", key: "name", type: "text", placeholder: "Enter Your Name" },
            { label: "Email", key: "email", type: "email", placeholder: "Enter Your Email" },
            { label: "Password", key: "password", type: "password", placeholder: "Enter Your Password" },
            { label: "Confirm password", key: "confirm", type: "password", placeholder: "Confirm Password" },
          ].map(({ label, key, type, placeholder }) => (
            <div key={key} style={{ display: "flex", gap: "8px", alignItems: "center" }}>
              <label style={{ width: "130px", fontSize: "13px", color: "#555" }}>{label}:</label>
              <input
                type={type}
                placeholder={placeholder}
                value={form[key]}
                onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                required
                style={{ flex: 1, padding: "8px", border: "1px solid #ddd", borderRadius: "4px", fontSize: "13px" }}
              />
            </div>
          ))}

          <button
            type="submit"
            disabled={loading}
            style={{ marginTop: "8px", padding: "10px", backgroundColor: "#2d6a4f", color: "#fff", border: "none", borderRadius: "4px", fontSize: "14px", fontWeight: "bold", cursor: "pointer" }}
          >
            {loading ? "Creating account..." : "Sign Up"}
          </button>
        </form>

        <p style={{ textAlign: "center", fontSize: "13px", color: "#888", margin: "12px 0" }}>OR</p>

        <button
          onClick={handleGoogle}
          style={{ width: "100%", padding: "10px", backgroundColor: "#fff", border: "1px solid #ddd", borderRadius: "4px", fontSize: "14px", cursor: "pointer" }}
        >
          G &nbsp; Continue with Google
        </button>

        <p style={{ textAlign: "center", fontSize: "13px", marginTop: "16px" }}>
          Already have an account?{" "}
          <Link href="\login\signin" style={{ color: "#2d6a4f", fontWeight: "bold" }}>Login</Link>
        </p>
      </div>
    </div>
  );
}