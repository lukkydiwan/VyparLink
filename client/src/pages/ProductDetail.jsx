import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { api } from "../lib/api";
import Navbar from "../components/Navbar/Navbar";
import "../styles/product-detail.css";

export default function ProductDetail() {
  const { id } = useParams();
  const { data, isLoading } = useQuery({
    queryKey: ["product", id],
    queryFn: () => api.get(`/products/${id}`).then((r) => r.data),
  });

  if (isLoading) return <p className="pt-32 text-center text-gray-500">Loading…</p>;
  const p = data;
  return (
    <>
      <Navbar />
      <section className="detail-page pt-28 pb-16 px-6 min-h-screen bg-[#fffafa] flex flex-col items-center">
        <Link to="/products" className="self-start mb-6 text-rose-600 hover:underline">← Back to products</Link>
        <div className="detail-card max-w-4xl w-full bg-white rounded-3xl shadow-lg overflow-hidden grid md:grid-cols-2">
          <img src={p.images?.[0]?.url || "https://via.placeholder.com/600x400?text=No+Image"} alt={p.title} className="object-cover h-80 md:h-full w-full" />
          <div className="p-8 flex flex-col">
            <h2 className="text-3xl font-bold text-gray-800 mb-2">{p.title}</h2>
            <p className="text-rose-600 text-2xl font-semibold mb-4">₹{p.price}</p>
            <p className="text-gray-600 leading-relaxed mb-6">{p.description || "Delight your senses with this fabulous product fresh from local vendors."}</p>
            <button className="add-btn w-full py-3 rounded-full bg-rose-600 text-white text-lg font-medium hover:bg-rose-700 transition">Add to Cart</button>
          </div>
        </div>
      </section>
    </>
  );
}