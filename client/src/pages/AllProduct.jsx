// src/pages/AllProduct.jsx
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";
import "../styles/products.css";

export default function AllProduct() {
  const { search } = useLocation();                // ← ?q=&cat=&pin=
  const params = new URLSearchParams(search);
  const q   = params.get("q")   || "";
  const cat = params.get("cat") || "";
  const pin = params.get("pin") || "";

  const [data, setData]   = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function load() {
      try {
        setLoading(true);
        setError("");
        const urlParams = new URLSearchParams();
        if (q)   urlParams.append("q",   q);
        if (cat) urlParams.append("cat", cat);
        if (pin) urlParams.append("pin", pin);
        urlParams.append("limit", 100);           // grab up to 100 matches

        const res = await fetch(
          `import.meta.env.VITE_API_URL/api/products?${urlParams.toString()}`
        );
        if (!res.ok) throw new Error(`API error ${res.status}`);
        const json = await res.json();
        setData(json.items || json);              // adjust if API shape differs
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [q, cat, pin]);                              // refetch when URL changes

  return (
    <>
      <Navbar />

      <section className="products-page">
        <h2 className="products-heading">Search Results</h2>

        {loading && <p className="loading-text">Loading…</p>}
        {error   && <p className="loading-text">Error: {error}</p>}

        {!loading && !error && data?.length ? (
          <div className="prod-grid">
            {data.map((p) => (
              <Link key={p._id} to={`/products/${p._id}`} className="prod-card">
                <img
                  src={
                    p.images?.[0]
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
