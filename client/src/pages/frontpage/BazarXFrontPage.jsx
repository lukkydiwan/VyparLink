// ============================================================================
//  BazarX – Home Page (React Router‑ready, Search navigates to /products)
// ============================================================================

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import "./bazarxfrontPage.css";
import {
  FaTruck,
  FaTags,
  FaCheckCircle,
  FaUndoAlt,
  FaFacebookF,
  FaLinkedinIn,
  FaInstagram,
} from "react-icons/fa";

// --- Static data -----------------------------------------------------------

const categories = [
  { name: "Spices", img: "https://source.unsplash.com/featured/400x300?spices" },
  { name: "Fresh Veggies", img: "https://source.unsplash.com/featured/400x300?vegetables" },
  { name: "Dairy", img: "https://source.unsplash.com/featured/400x300?milk" },
  { name: "Packaging", img: "https://source.unsplash.com/featured/400x300?packaging" },
  { name: "Cleaning", img: "https://source.unsplash.com/featured/400x300?cleaning" },
];

const valueProps = [
  { icon: FaTruck, title: "Overnight delivery", desc: "Order by 8 pm, cook by 6 am." },
  { icon: FaTags, title: "Wholesale rates", desc: "Live mandi prices—no middlemen." },
  { icon: FaCheckCircle, title: "Quality assured", desc: "Each batch photo‑verified & FSSAI checked." },
  { icon: FaUndoAlt, title: "Easy returns", desc: "Wrong or stale? We swap before breakfast." },
];

// --- Page sections ---------------------------------------------------------

const Hero = () => (
  <section className="hero container">
    <div className="hero__content">
      <h1>Affordable ingredients, delivered by dawn.</h1>
      <p>
        BazarX lets street‑food owners lock today’s mandi prices and get fresh supplies before the <strong style={{ color: "var(--orange)" }}>tawa</strong> heats up.
      </p>
      <div className="cta-wrap">
        <Link to="/login" className="btn-primary">
          Shop Now
        </Link>
        <Link to="/register" className="btn-outline">
          Start Selling
        </Link>
      </div>
      <div className="badges">
        <span>FSSAI‑compliant suppliers ✓</span>
        <span>0% listing fee</span>
        <span>24 × 7 support</span>
      </div>
    </div>
    <img
      className="hero__image"
      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQNbFTupr58XMdBl1WwElMESLWMxtWA0RlLRA&s"
      alt="Street‑food vendor unloading crates"
    />
  </section>
);

// --- QuickSearch with navigate --------------------------------------------

const QuickSearch = () => {
  const navigate = useNavigate();
  const [q, setQ] = useState("");
  const [cat, setCat] = useState("");
  const [pin, setPin] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (q) params.append("q", q);
    if (cat) params.append("cat", cat);
    if (pin) params.append("pin", pin);
    navigate(`/products?${params.toString()}`);
  };

  return (
    <section className="quick-search container">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Search ingredient…"
          value={q}
          onChange={(e) => setQ(e.target.value)}
        />
        <select value={cat} onChange={(e) => setCat(e.target.value)}>
          <option value="" disabled>
            Category
          </option>
          <option value="spices">Spices</option>
          <option value="veggies">Veggies</option>
          <option value="dairy">Dairy</option>
        </select>
        <input
          type="text"
          placeholder="Pincode"
          value={pin}
          onChange={(e) => setPin(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>
    </section>
  );
};

const ValueProps = () => (
  <section className="value-props">
    <div className="container">
      <h2>Why BazarX?</h2>
      <div className="value-grid">
        {valueProps.map(({ icon: Icon, title, desc }) => (
          <div key={title} className="value-card">
            <Icon />
            <h3>{title}</h3>
            <p>{desc}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const Categories = () => (
  <section className="categories">
    <div className="container">
      <h2>Top Categories</h2>
      <div className="cat-grid">
        {categories.map(({ name, img }) => (
          <a key={name} href="#" className="cat-tile">
            <img src={img} alt={name} />
            <span>{name}</span>
          </a>
        ))}
      </div>
    </div>
  </section>
);

const HowItWorks = () => (
  <section className="how">
    <div className="container">
      <h2>How it works</h2>
      <div className="step-grid">
        {[
          "Browse prices",
          "Place order (cash / UPI / credit)",
          "We aggregate & source overnight",
          "Last‑mile delivery before 6 am",
        ].map((txt, i) => (
          <div className="step" key={i}>
            <div className="step-circle">{i + 1}</div>
            <p>{txt}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const Testimonials = () => (
  <section className="testimonials">
    <div className="container">
      <h2>Vendors love us</h2>
      <div className="testi-grid">
        {[
          {
            name: "Seema’s Chaat",
            quote:
              "BazarX slashed our morning mandi trips—now ingredients wait for us, not the other way round!",
          },
          {
            name: "Ramu Dosa Corner",
            quote:
              "Quality sabse best! Got photo proofs of every batch and support solves issues in minutes.",
          },
          {
            name: "Patel Pav Bhaji",
            quote: "Our ingredient cost dropped by 15 %. Savings go straight to profit!",
          },
        ].map(({ name, quote }) => (
          <div className="testi" key={name}>
            <p>“{quote}”</p>
            <span>— {name}</span>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const CTABanner = () => (
  <section className="cta-banner">
    <div className="container">
      <h2>
        Ready to cut raw‑material costs by <span style={{ color: "var(--yellow)" }}>18 %</span>{" "}
        this month?
      </h2>
      <Link to="/register">
        <button>Create free account</button>
      </Link>
    </div>
  </section>
);

const Footer = () => (
  <footer className="footer">
    <div className="container footer-grid">
      <div>
        <h3>BazarX</h3>
        <p>© {new Date().getFullYear()} BazarX Pvt Ltd.</p>
      </div>
      <div>
        <h4>Quick links</h4>
        <ul>
          <li>
            <a href="#about">About</a>
          </li>
          <li>
            <a href="#careers">Careers</a>
          </li>
          <li>
            <a href="#support">Support</a>
          </li>
          <li>
            <a href="#privacy">Privacy</a>
          </li>
        </ul>
      </div>
      <div>
        <h4>Office</h4>
        <p>
          BazarX Pvt Ltd.
          <br /> 3rd Floor, JMD Megapolis
          <br /> Gurugram, Haryana 122018
        </p>
      </div>
      <div>
        <h4>Follow us</h4>
        <div className="socials">
          <a href="#" aria-label="Facebook">
            <FaFacebookF />
          </a>
          <a href="#" aria-label="LinkedIn">
            <FaLinkedinIn />
          </a>
          <a href="#" aria-label="Instagram">
            <FaInstagram />
          </a>
        </div>
      </div>
    </div>
  </footer>
);

// --- Main Page Component ----------------------------------------------------

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <QuickSearch />
        <ValueProps />
        <Categories />
        <HowItWorks />
        <Testimonials />
        <CTABanner />
      </main>
      <Footer />
    </>
  );
}
