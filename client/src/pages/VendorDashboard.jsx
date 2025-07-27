// src/pages/VendorDashboard.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";
import { useAuth } from "../context/AuthContext";
import "./frontpage/bazarxfrontPage.css";          // re‑use existing styles

/* ------------ shared list so dropdown & backend stay in sync --------- */
const ALLOWED_CATEGORIES = [
  "Spices",
  "Fresh Veggies",
  "Dairy",
  "Packaging",
  "Cleaning",
];

export default function VendorDashboard() {
  const navigate = useNavigate();
  const { token } = useAuth();

  /* ----------------------- local form state -------------------------- */
  const [form, setForm] = useState({
    title: "",
    price: "",
    stockQty: "",
    category: "",
    description: "",
    images: [""],                 // start with one empty URL field
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  /* ----------------------- handlers ---------------------------------- */
  const handleField = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleImgChange = (idx, value) => {
    const list = [...form.images];
    list[idx] = value;
    setForm({ ...form, images: list });
  };

  const addImgField = () =>
    setForm({ ...form, images: [...form.images, ""] });

  const removeImgField = (idx) =>
    setForm({
      ...form,
      images: form.images.filter((_, i) => i !== idx),
    });

  /* ----------------------- submit ------------------------------------ */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess(false);

    try {
      const payload = {
        ...form,
        images: form.images.filter((u) => u.trim() !== ""),
      };

      const API = import.meta.env.VITE_API_URL || "http://localhost:4000";
      const res = await fetch(`${API}/api/vendor/products`, {
        method: "POST",
        credentials: "include",             // send token cookie
        headers: {
          "Content-Type": "application/json",
          ...(token && { Authorization: `Bearer ${token}` }),
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok)
        throw new Error((await res.json()).message || "Upload failed");

      setSuccess(true);
      setForm({
        title: "",
        price: "",
        stockQty: "",
        category: "",
        description: "",
        images: [""],
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  /* ----------------------- JSX --------------------------------------- */
  return (
    <>
      <Navbar />

      {/* ---------- hero ---------- */}
      <header className="vendor-hero">
        <div className="container vendor-hero__inner">
          <h1>Sell smarter with VyaaparLink</h1>
          <p>
            List your raw‑material inventory in minutes, reach hundreds of
            local street‑food vendors, and get paid as soon as the sun rises.
          </p>
          <a href="#add-product" className="btn-primary">
            Add your first product ↓
          </a>
        </div>
      </header>

      {/* ---------- form ---------- */}
      <section id="add-product" className="add-product container">
        <h2>Add a new product</h2>

        {error && <p className="alert error">{error}</p>}
        {success && (
          <p className="alert success">Product uploaded successfully!</p>
        )}

        <form onSubmit={handleSubmit} className="add-product__form">
          <label>
            Title*
            <input
              type="text"
              name="title"
              value={form.title}
              onChange={handleField}
              required
            />
          </label>

          <label>
            Category*
            <select
              name="category"
              value={form.category}
              onChange={handleField}
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
              onChange={handleField}
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
              onChange={handleField}
              required
            />
          </label>

          <label>
            Description
            <textarea
              name="description"
              rows={4}
              value={form.description}
              onChange={handleField}
            />
          </label>

          {/* ---------- image URL fields ---------- */}
          <label>Image URLs*</label>
          {form.images.map((url, idx) => (
            <div key={idx} className="url-row">
              <input
                type="url"
                placeholder="https://example.com/photo.jpg"
                value={url}
                onChange={(e) => handleImgChange(idx, e.target.value)}
                required={idx === 0}
              />
              {form.images.length > 1 && (
                <button
                  type="button"
                  className="btn-small"
                  onClick={() => removeImgField(idx)}
                >
                  ✕
                </button>
              )}
            </div>
          ))}

          <button
            type="button"
            className="btn-outline btn-small"
            onClick={addImgField}
          >
            + Add another URL
          </button>

          {/* live preview */}
          {form.images.some((u) => u.trim()) && (
            <div className="preview-grid">
              {form.images
                .filter((u) => u.trim())
                .map((src, i) => (
                  <img key={i} src={src} alt="preview" />
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
