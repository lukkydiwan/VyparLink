import Navbar from '../components/Navbar/Navbar';
import { useProducts } from '../features/products/hooks';
import ProductsPage from './Products';

export default function BuyerDashboard() {
  const { data, isLoading } = useProducts();

  if (isLoading) return <p>Loading…</p>;

  return (
    <div className="grid md:grid-cols-4 gap-6 p-4">
      {/* {data.items.map(p => (
        <div key={p._id} className="border rounded shadow">
          <img src={p.images[0]?.thumbUrl || '/placeholder.jpg'} className="w-full h-40 object-cover" />
          <div className="p-2">
            <h3 className="font-semibold">{p.title}</h3>
            <p className="text-indigo-600 font-bold">₹{p.price}</p>
          </div>
        </div>
      ))} */}

        <ProductsPage/>

    </div>
  );
}
