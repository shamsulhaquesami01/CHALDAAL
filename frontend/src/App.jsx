import { useState } from 'react';
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom'; // <--- NEW IMPORTS
import './App.css';
import { products } from './data/products';
import ProductCard from './components/ProductCard';
import CartSidebar from './components/CartSidebar';
import CategorySidebar from './components/CategorySidebar';
import Checkout from './pages/Checkout'; // <--- Import Checkout Page

// Wrapper Component to handle Routing
function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

// Main Content Component
function AppContent() {
  const navigate = useNavigate(); // <--- Hook to change pages
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("Rice");

  // Filter Logic
  const displayedProducts = products.filter(p => p.category === selectedCategory);

  // Cart Functions
  const handleAddToCart = (product) => {
    const exists = cart.find(item => item.id === product.id);
    if (exists) {
      setCart(cart.map(item => item.id === product.id ? { ...exists, qty: exists.qty + 1 } : item));
    } else {
      setCart([...cart, { ...product, qty: 1 }]);
    }
    setIsCartOpen(true);
  };

  const handleUpdateQty = (id, amount) => {
    setCart(prevCart => prevCart.map(item => 
      item.id === id ? { ...item, qty: item.qty + amount } : item
    ).filter(item => item.qty > 0));
  };

  // Place Order Function (Logs to console for now)
  const handlePlaceOrder = (customerData) => {
    console.log("ORDER PLACED!", { customer: customerData, items: cart });
    alert("Order Placed Successfully!");
    setCart([]); // Clear Cart
    navigate('/'); // Go back home
  };

  return (
    <div className="app-container">
      {/* HEADER (Always Visible) */}
      <header className="header">
        <div className="logo-section" onClick={() => navigate('/')} style={{cursor: 'pointer'}}>
          <div className="menu-icon">☰</div>
          <h1>Chaldal Clone</h1>
        </div>
        <div className="cart-badge" onClick={() => setIsCartOpen(true)} style={{cursor: 'pointer'}}>
          🛍️ {cart.reduce((acc, item) => acc + item.qty, 0)} Items
        </div>
      </header>

      {/* ROUTES (Switch between Home and Checkout) */}
      <Routes>
        
        {/* HOME ROUTE */}
        <Route path="/" element={
          <div className="main-layout" style={{ display: 'flex' }}>
            <CategorySidebar activeCategory={selectedCategory} onSelectCategory={setSelectedCategory} />
            
            <main className="product-grid" style={{ flex: 1, background: '#f6f6f6' }}>
               <div className="banner" style={{
                 height: '200px', 
                 background: 'linear-gradient(to right, #ffd645, #ffca28)',
                 margin: '0 0 20px 0',
                 borderRadius: '8px',
                 display: 'flex',
                 alignItems: 'center', 
                 justifyContent: 'center',
                 color: 'white', fontSize: '24px', fontWeight: 'bold'
               }}>
                 {selectedCategory} Delivery
               </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '20px' }}>
                {displayedProducts.length > 0 ? (
                  displayedProducts.map((product) => (
                    <ProductCard 
                      key={product.id} product={product} cart={cart}
                      onAddToCart={handleAddToCart} onUpdateQty={handleUpdateQty}
                    />
                  ))
                ) : (
                  <p>No products found in {selectedCategory}</p>
                )}
              </div>
            </main>
          </div>
        } />

        {/* CHECKOUT ROUTE */}
        <Route path="/checkout" element={
          <Checkout cart={cart} placeOrder={handlePlaceOrder} />
        } />

      </Routes>

      <CartSidebar 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)} 
        cartItems={cart} 
        onUpdateQty={handleUpdateQty}
        // Pass function to navigate to checkout
        onCheckout={() => {
          setIsCartOpen(false); // Close sidebar
          navigate('/checkout'); // Go to page
        }}
      />
    </div>
  );
}

export default App;