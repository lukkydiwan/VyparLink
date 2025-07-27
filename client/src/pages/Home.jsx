import Navbar from "../components/Navbar/Navbar";
import { Link } from "react-router-dom";
import "../styles/banner.css";
import "../styles/home.css";

export default function Homeee() {
  return (
    <>
      <Navbar />
<section>
<img src=" https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQNbFTupr58XMdBl1WwElMESLWMxtWA0RlLRA&s" alt="" />
        <div className="mt-10 flex gap-6">
          <Link to="/login" className="cta-btn-primary">Shop Now</Link>
          <Link to="/register" className="cta-btn-secondary">Start Selling</Link>
         
        </div>
</section>
    </>
  );
}
