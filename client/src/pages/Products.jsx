import { useLocation, Link } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";
import { useProducts } from "../features/products/hooks";
import "./Products.css"; // plain‑CSS file below

export default function ProductsPage() {
  /* ─── 1. Parse filters from URL ─── */
  const { search } = useLocation();
  const params = new URLSearchParams(search);
  const q = params.get("q") || "";
  const cat = params.get("cat") || "";
  const pin = params.get("pin") || "";

  /* ─── 2. Fetch products ─── */
  const { data, isLoading } = useProducts({ search: q, category: cat, pincode: pin });

  /* ─── 3. Render ─── */
  return (
    <>
      <Navbar />
      <section className="products-page">
        <h2 className="products-heading">All Products</h2>

        {(q || cat || pin) && (
          <p className="filter-summary">
            Showing&nbsp;
            {q && <>results for <strong>“{q}”</strong>&nbsp;</>}
            {cat && <>in <strong>{cat}</strong>&nbsp;</>}
            {pin && <>near <strong>{pin}</strong></>}
          </p>
        )}

        {isLoading ? (
          <p className="loading-text">Loading…</p>
        ) : data?.items?.length ? (
          <div className="prod-grid">
            {data.items.map((p) => (
              <Link key={p._id} to={`/products/${p._id}`} className="prod-card">
                <img
                  src={p.images?.[0] }
                  alt={p.title}
                  className="prod-img"
                />
                <div className="prod-info">
                  <h3 className="prod-title">{p.title}</h3>
                  <p className="prod-price">₹{p.price}</p>
                  {p.vendor?.name && <p className="prod-vendor">Vendor: {p.vendor.name}</p>}
                  <span className="prod-link">View Details →</span>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <p className="loading-text">No products found.</p>
        )}
      </section>
    </>
  );
}