"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { auth, googleProvider } from "@/lib/firebase";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";

export default function SigninPage() {
  const router = useRouter();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  async function handleLogin(e) {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, form.email, form.password);
      router.push("/shop");
    } catch (err) {
      setError("Invalid email or password");
    }
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
        <h2 style={{ textAlign: "center", marginBottom: "24px", fontSize: "18px" }}>Login</h2>

        {error && <p style={{ color: "red", fontSize: "12px", textAlign: "center", marginBottom: "10px" }}>{error}</p>}

        <form onSubmit={handleLogin} style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
            <label style={{ width: "100px", fontSize: "13px", color: "#555" }}>Email:</label>
            <input
              type="email"
              placeholder="Enter Your Email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
              style={{ flex: 1, padding: "8px", border: "1px solid #ddd", borderRadius: "4px", fontSize: "13px" }}
            />
          </div>
          <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
            <label style={{ width: "100px", fontSize: "13px", color: "#555" }}>Password:</label>
            <input
              type="password"
              placeholder="Enter Your Password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              required
              style={{ flex: 1, padding: "8px", border: "1px solid #ddd", borderRadius: "4px", fontSize: "13px" }}
            />
          </div>
          <button
            type="submit"
            style={{ marginTop: "8px", padding: "10px", backgroundColor: "#2d6a4f", color: "#fff", border: "none", borderRadius: "4px", fontSize: "14px", fontWeight: "bold", cursor: "pointer" }}
          >
            Login
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
          Don't have an account?{" "}
          <Link href="/login" style={{ color: "#2d6a4f", fontWeight: "bold" }}>Sign Up</Link>
        </p>
      </div>
    </div>
  );
}