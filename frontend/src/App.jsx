import { useState } from "react";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import "./App.css";
import { products } from "./data/products";
import ProductCard from "./components/ProductCard";
import CartSidebar from "./components/CartSidebar";
import CategorySidebar from "./components/CategorySidebar";
import Checkout from "./pages/Checkout";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import {
  FaBars,
  FaSearch,
  FaMapMarkerAlt,
  FaUser,
  FaShoppingBag,
} from "react-icons/fa";
import { MdKeyboardArrowDown } from "react-icons/md";
import BannerCarousel from "./components/BannerCarousel";

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

function AppContent() {
  const navigate = useNavigate();
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("Grocery");
  const [user, setUser] = useState(null);

  // Filter Logic
  const displayedProducts = products.filter(
    (p) => p.category === selectedCategory
  );

  // Cart Functions
  const handleAddToCart = (product) => {
    const exists = cart.find((item) => item.id === product.id);
    if (exists) {
      setCart(
        cart.map((item) =>
          item.id === product.id ? { ...exists, qty: exists.qty + 1 } : item
        )
      );
    } else {
      setCart([...cart, { ...product, qty: 1 }]);
    }
    setIsCartOpen(true);
  };

  const handleUpdateQty = (id, amount) => {
    setCart((prevCart) =>
      prevCart
        .map((item) =>
          item.id === id ? { ...item, qty: item.qty + amount } : item
        )
        .filter((item) => item.qty > 0)
    );
  };

  const handlePlaceOrder = (customerData) => {
    console.log("ORDER PLACED!", { customer: customerData, items: cart });
    alert("Order Placed Successfully!");
    setCart([]);
    navigate("/");
  };

  return (
    <div className="app-container">
      {/* --- PROFESSIONAL HEADER START --- */}
      <header className="header">
        {/* LEFT: Logo & Menu */}
        <div
          className="logo-section"
          onClick={() => navigate("/")}
          style={{ cursor: "pointer" }}
        >
          <FaBars className="menu-icon" />
          <span className="brand-logo">Chaldal</span>
        </div>

        {/* CENTER: Search Bar */}
        <div className="search-container">
          <FaSearch className="search-icon-inside" />
          <input
            type="text"
            className="search-input"
            placeholder="Search for products (e.g. eggs, milk, potato)"
          />
        </div>

        {/* RIGHT: Actions (Location, Login, Cart) */}
        <div className="header-actions">
          {/* Location Selector */}
          <div className="location-selector">
            <FaMapMarkerAlt style={{ color: "#ff6b6b" }} />
            <span>Dhaka</span>
            <MdKeyboardArrowDown />
          </div>

          {/* Login / User Profile */}
          {user ? (
            <div
              className="user-profile"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "5px",
                fontWeight: "bold",
                color: "#444",
              }}
            >
              <FaUser /> <span>{user.name}</span>
            </div>
          ) : (
            <button className="login-btn" onClick={() => navigate("/login")}>
              Login
            </button>
          )}

          {/* Cart Badge (Moved here for better layout) */}
          <div
            className="cart-badge-btn"
            onClick={() => setIsCartOpen(true)}
            style={{
              background: "#ffeaa7",
              padding: "8px 15px",
              borderRadius: "4px",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: "8px",
              border: "1px solid #fcce38",
            }}
          >
            <FaShoppingBag style={{ color: "#d63031" }} />
            <span style={{ fontWeight: "bold", color: "#2d3436" }}>
              {cart.reduce((acc, item) => acc + item.qty, 0)} Items
            </span>
          </div>
        </div>
      </header>
      {/* --- HEADER END --- */}

      {/* ROUTES */}
      <Routes>
        <Route path="/login" element={<Login onLogin={setUser} />} />
        <Route path="/signup" element={<Signup onLogin={setUser} />} />

        {/* HOME PAGE */}
{/* HOME ROUTE */}
        <Route path="/" element={
          <div className="main-layout" style={{ display: 'flex' }}>
            <CategorySidebar activeCategory={selectedCategory} onSelectCategory={setSelectedCategory} />
            
            {/* CHANGED: Removed 'product-grid' class. added flex-direction column */}
            <main style={{ flex: 1, background: '#f6f6f6', display: 'flex', flexDirection: 'column', overflowX: 'hidden' }}>
              
              {/* 1. CAROUSEL (Now takes full width naturally) */}
              <BannerCarousel />

              {/* 2. PRODUCT GRID (Separate container for grid items) */}
              <div style={{ 
                padding: '20px', 
                display: 'grid', 
                gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', 
                gap: '20px' 
              }}>
                {displayedProducts.length > 0 ? (
                  // --- TRICK: We repeat the list 4 times to simulate a full store ---
                  [...displayedProducts, ...displayedProducts, ...displayedProducts, ...displayedProducts].map((product, index) => (
                    <ProductCard 
                      // Using index to create unique keys for duplicates
                      key={`${product.id}-${index}`} 
                      product={product} 
                      cart={cart}
                      onAddToCart={handleAddToCart} 
                      onUpdateQty={handleUpdateQty}
                    />
                  ))
                ) : (
                  <div style={{padding: '20px', color: '#666', gridColumn: '1 / -1'}}>
                     <h3>No products found in {selectedCategory}</h3>
                     <p>Try clicking "Grocery" in the sidebar!</p>
                  </div>
                )}
              </div>
            </main>
          </div>
        } />

        {/* CHECKOUT PAGE */}
        <Route
          path="/checkout"
          element={<Checkout cart={cart} placeOrder={handlePlaceOrder} />}
        />
      </Routes>

      {/* CART SIDEBAR */}
      <CartSidebar
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cart}
        onUpdateQty={handleUpdateQty}
        onCheckout={() => {
          setIsCartOpen(false);
          navigate("/checkout");
        }}
      />
    </div>
  );
}

export default App;
