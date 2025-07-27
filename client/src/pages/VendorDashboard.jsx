import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar"; // keep in sync
import { useAuth } from "../context/AuthContext";        // assumes existing auth hook
import "./frontpage/BazarXFrontPage.css";

const ALLOWED_CATEGORIES = [
  "Spices",
  "Fresh Veggies",
  "Dairy",
  "Packaging",
  "Cleaning",
  // add more as needed
];

export default function VendorDashboard() {
  const navigate = useNavigate();
  const { user, token } = useAuth(); // token from login cookie or context

  /* ---------- local form state ---------- */
  const [form, setForm] = useState({
    title: "",
    price: "",
    stockQty: "",
    category: "",
    description: "",
    images: [],
  });
  const [preview, setPreview] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "images") {
      setForm({ ...form, images: files });
      setPreview(Array.from(files).map((f) => URL.createObjectURL(f)));
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const handleSubmit = async (e) => {
  e.preventDefault();
  console.log("Submitting to backend… 🔥");   // ← should appear in DevTools Console
};

    setLoading(true);
    setError("");
    setSuccess(false);

    try {
      const fd = new FormData();
      Object.entries(form).forEach(([k, v]) => {
        if (k === "images") {
          Array.from(v).forEach((file) => fd.append("images", file));
        } else fd.append(k, v);
      });

      const res = await fetch("/api/vendor/products", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: fd,
      });

      if (!res.ok) throw new Error((await res.json()).message || "Upload failed");

      setSuccess(true);
      setForm({ title: "", price: "", stockQty: "", category: "", description: "", images: [] });
      setPreview([]);
      // optional: redirect to vendor product list
      // navigate("/vendor/products");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      {/* ---- Intro Hero ---- */}
      <header className="vendor-hero">
        <div className="container vendor-hero__inner">
          <h1>Sell smarter with BazarX</h1>
          <p>
            List your raw‑material inventory in minutes, reach hundreds of local street‑food vendors, and get paid as soon as the sun rises.
          </p>
          <a href="#add-product" className="btn-primary">
            Add your first product ↓
          </a>
        </div>
      </header>

      {/* ---- Add‑Product Form ---- */}
      <section id="add-product" className="add-product container">
        <h2>Add a new product</h2>

        {error && <p className="text-center text-red-600 mb-4">{error}</p>}
        {success && (
          <p className="text-center text-green-700 mb-4">Product uploaded successfully!</p>
        )}

        <form onSubmit={handleSubmit} className="add-product__form">
          
          <label>
            Title*
            <input
              type="text"
              name="title"
              value={form.title}
              onChange={handleChange}
              required
            />
          </label>

          <label>
            Category*
            <select
              name="category"
              value={form.category}
              onChange={handleChange}
              required
            >
              <option value="" disabled>
                — Select —
              </option>
              {ALLOWED_CATEGORIES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </label>

          <label>
            Price (₹)*
            <input
              type="number"
              name="price"
              min="0"
              step="0.01"
              value={form.price}
              onChange={handleChange}
              required
            />
          </label>

          <label>
            Stock Quantity*
            <input
              type="number"
              name="stockQty"
              min="0"
              value={form.stockQty}
              onChange={handleChange}
              required
            />
          </label>

          <label>
            Description
            <textarea
              name="description"
              rows={4}
              value={form.description}
              onChange={handleChange}
            />
          </label>

          <label className="file-input">
            Images (up to 5)
            <input
              type="file"
              name="images"
              accept="image/*"
              multiple
              onChange={handleChange}
            />
          </label>

          {preview.length > 0 && (
            <div className="preview-grid">
              {preview.map((src, idx) => (
                <img key={idx} src={src} alt="preview" />
              ))}
            </div>
          )}

          <button
            type="submit"
            className="btn-primary submit-btn"
            disabled={loading}
          >
            {loading ? "Uploading…" : "Submit Product"}
          </button>
        </form>
      </section>
    </>
  );
}
