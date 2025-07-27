// src/pages/AllProduct.jsx
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";
import "../styles/products.css";          // ← same CSS we wrote earlier

export default function AllProduct() {
  const [data, setData]   = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch("http://localhost:4000/api/products?limit=100");
        if (!res.ok) throw new Error(`API error ${res.status}`);
        const json = await res.json();
        setData(json.items || json);     // adjust if your API shape differs
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  return (
    <>
      <Navbar />

      <section className="products-page">
        <h2 className="products-heading">All Products</h2>

        {loading && <p className="loading-text">Loading…</p>}
        {error   && <p className="loading-text">Error: {error}</p>}

        {!loading && !error && data?.length ? (
          <div className="prod-grid">
            {data.map((p) => (
              <Link key={p._id} to={`/products/${p._id}`} className="prod-card">
                <img
                  src={
                    p.images?.[0]?.thumbUrl ||
                    "https://via.placeholder.com/300x200?text=No+Image"
                  }
                  alt={p.title}
                  className="prod-img"
                />
                <div className="prod-info">
                  <h3 className="prod-title">{p.title}</h3>
                  <p className="prod-price">₹{p.price}</p>
                  {p.vendor?.name && (
                    <p className="prod-vendor">Vendor: {p.vendor.name}</p>
                  )}
                  <span className="prod-link">View Details →</span>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          !loading && !error && (
            <p className="loading-text">No products found.</p>
          )
        )}
      </section>
    </>
  );
}
