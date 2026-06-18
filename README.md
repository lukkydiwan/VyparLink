# VyparLink

VyparLink is a full-stack e-commerce platform built to solve a real problem: local vendors — kiranas, small manufacturers, and cottage businesses — have no direct way to reach online buyers. They depend on middlemen, local foot traffic, or expensive marketplace fees. VyparLink gives them a dedicated storefront to list products, manage inventory, and fulfill orders directly, while giving buyers a clean marketplace to discover and purchase from local sellers.

---

## The Problem It Solves

Small vendors in India operate in a fragmented, offline-first world. They can't list on Amazon or Flipkart without complex onboarding, high commissions, and logistical dependencies. VyparLink removes these barriers — a vendor signs up, lists their products with images and pricing, and immediately starts selling. Buyers get direct access to local goods across categories like spices, fresh vegetables, dairy, and more.

---

## Live Demo

| Service | URL |
|---|---|
| Frontend | https://vyparlink.onrender.com |
| Backend API | https://backvyparlink.onrender.com |

---

## Features

### For Vendors
- Register as a vendor and get a dedicated dashboard
- List products with title, description, category, price, stock quantity, and up to 5 images
- Edit and delete product listings
- View incoming orders and update order status (Placed → Shipped → Delivered)

### For Buyers
- Browse all listed products across categories
- View product details with images and vendor info
- Place orders with delivery address and payment method (COD / UPI)
- Track order status from the buyer dashboard

### Platform
- JWT-based authentication with HTTP-only cookies (secure, no localStorage tokens)
- Role-based access control: `buyer`, `vendor`, `admin`
- Protected routes on both frontend and backend
- Image upload with Multer and Sharp (resize/optimize on server)

---

## Tech Stack

### Frontend (`/client`)
| Technology | Purpose |
|---|---|
| React 19 + Vite | UI framework and build tool |
| React Router v6 | Client-side routing |
| TanStack Query v5 | Server state, caching, and data fetching |
| Zustand | Client-side global state |
| Axios | HTTP client with credentials support |
| Tailwind CSS v4 | Utility-first styling |
| Lucide React + React Icons | Icon library |

### Backend (`/server`)
| Technology | Purpose |
|---|---|
| Node.js + Express 5 | REST API server |
| MongoDB + Mongoose | Database and ODM |
| bcryptjs | Password hashing |
| JSON Web Tokens | Auth tokens stored in HTTP-only cookies |
| Multer + Sharp | File upload and image processing |
| express-validator | Request validation |
| Morgan | HTTP request logging |
| cookie-parser | Signed cookie support |
| dotenv | Environment variable management |

---

## Project Structure

```
VyparLink/
├── client/                         # React frontend
│   ├── public/                     # Static assets (category images, logo)
│   └── src/
│       ├── components/
│       │   ├── Navbar/             # Top navigation bar
│       │   └── ProtectedRoute.jsx  # Route guard for authenticated pages
│       ├── context/
│       │   └── AuthContext.jsx     # Global auth state (current user, login/logout)
│       ├── features/
│       │   └── products/
│       │       └── hooks.js        # TanStack Query hooks for product fetching
│       ├── lib/
│       │   └── api.js              # Axios instance with base URL and credentials
│       ├── pages/
│       │   ├── Home.jsx            # Landing page
│       │   ├── AuthForm.jsx        # Shared register/login form
│       │   ├── Login.jsx           # Login page
│       │   ├── Products.jsx        # Product listing/browse page
│       │   ├── AllProduct.jsx      # Full product catalog
│       │   ├── ProductDetail.jsx   # Single product view
│       │   ├── BuyerDashboard.jsx  # Buyer order history
│       │   ├── VendorDashboard.jsx # Vendor product and order management
│       │   ├── Love.jsx            # Saved/wishlist page
│       │   └── frontpage/
│       │       └── BazarXFrontPage.jsx  # Hero/marketing landing section
│       └── styles/                 # Component-level CSS files
│
└── server/                         # Node.js backend
    ├── seed.js                     # Database seed script
    └── src/
        ├── server.js               # Entry point — connects DB and starts server
        ├── app.js                  # Express app — middleware and route mounting
        ├── config/
        │   └── db.js               # MongoDB connection logic
        ├── controllers/
        │   ├── auth.controller.js  # Register, login, logout
        │   ├── product.controller.js # Public product listing and detail
        │   ├── order.controller.js # Buyer order placement
        │   └── vendor.controller.js # Vendor product CRUD and order management
        ├── middlewares/
        │   ├── error.js            # Global error handler and 404 handler
        │   └── upload.js           # Multer config for image uploads
        ├── models/
        │   ├── user.model.js       # User schema (buyer / vendor / admin roles)
        │   ├── product.model.js    # Product schema with category enum
        │   └── order.model.js      # Order schema with items, address, payment
        ├── routes/
        │   ├── auth.routes.js      # POST /api/auth/register, /login, /logout
        │   ├── product.routes.js   # GET /api/products, POST (vendor), GET /:id
        │   ├── order.routes.js     # POST /api/orders (buyer only)
        │   └── vendor.routes.js    # /api/vendor/products and /api/vendor/orders
        └── utils/
            └── jwt.js              # Token sign/verify + protect middleware
```

---

## API Reference

### Auth — `/api/auth`
| Method | Endpoint | Access | Description |
|---|---|---|---|
| POST | `/register` | Public | Register as buyer or vendor |
| POST | `/login` | Public | Login and receive JWT cookie |
| POST | `/logout` | Public | Clear auth cookie |
| GET | `/me` | Protected | Get current logged-in user |

### Products — `/api/products`
| Method | Endpoint | Access | Description |
|---|---|---|---|
| GET | `/` | Public | List all products (with filters) |
| GET | `/:id` | Public | Get single product detail |
| POST | `/` | Vendor | Create a new product listing |

### Vendor — `/api/vendor`
| Method | Endpoint | Access | Description |
|---|---|---|---|
| GET | `/products` | Vendor | Get vendor's own product listings |
| POST | `/products` | Vendor | Create product with image upload |
| PUT | `/products/:id` | Vendor | Update product details |
| DELETE | `/products/:id` | Vendor | Delete a product listing |
| GET | `/orders` | Vendor | View all orders for vendor's products |
| PUT | `/orders/:id/status` | Vendor | Update order status |

### Orders — `/api/orders`
| Method | Endpoint | Access | Description |
|---|---|---|---|
| POST | `/` | Buyer | Place a new order |

---

## Data Models

### User
```
name, email, password (hashed), role: ['buyer' | 'vendor' | 'admin']
```

### Product
```
vendor (ref: User), title, description, category (enum), price, stockQty, images[]
```
Categories: `Spices`, `Fresh Veggies`, `Dairy`, `Packaging`, `Cleaning`

### Order
```
buyer (ref: User), items[{ product, qty, priceAtPurchase }], total,
status: ['PLACED' | 'PAID' | 'SHIPPED' | 'DELIVERED'],
address: { line1, city, pincode, phone },
payment: { method: ['COD' | 'UPI'], txnId }
```

---

## Local Setup

### Prerequisites
- Node.js 18+
- MongoDB Atlas account (or local MongoDB)

### Backend

```bash
cd server
npm install
```

Create a `.env` file in `/server`:
```
MONGO_URI=mongodb+srv://<user>:<password>@<cluster>.mongodb.net/<dbname>
JWT_SECRET=your_jwt_secret
COOKIE_SECRET=your_cookie_secret
CLIENT_URL=http://localhost:5173
PORT=4000
```

```bash
npm run dev        # development with nodemon
npm run prod       # production
```

Optionally seed the database:
```bash
node seed.js
```

### Frontend

```bash
cd client
npm install
npm run dev
```

The frontend runs at `http://localhost:5173` and expects the backend at `http://localhost:4000`.

---

## Deployment (Render)

Both services are deployed on Render.

### Backend (Web Service)
- **Build command:** `npm install`
- **Start command:** `npm run prod`
- **Environment variables to set in Render dashboard:**

| Key | Value |
|---|---|
| `MONGO_URI` | Your MongoDB Atlas connection string |
| `JWT_SECRET` | A long random secret string |
| `COOKIE_SECRET` | A long random secret string |
| `CLIENT_URL` | `https://vyparlink.onrender.com` |

### Frontend (Static Site)
- **Build command:** `npm run build`
- **Publish directory:** `dist`
- **Environment variables:**

| Key | Value |
|---|---|
| `VITE_API_URL` | `https://backvyparlink.onrender.com` |

---

## Developer

**Lakshya Singh**
- GitHub: [@lukkydiwan](https://github.com/lukkydiwan)
- Email: diwanlukky@gmail.com
