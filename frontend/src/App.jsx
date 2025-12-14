import { useState } from 'react';
import './App.css';
import { products } from './data/products';
import ProductCard from './components/ProductCard';
import CartSidebar from './components/CartSidebar'; // <--- Import Component
import CategorySidebar from './components/CategorySidebar';

function App() {
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false); // <--- State for opening sidebar
  const [selectedCategory, setSelectedCategory] = useState("Grocery"); // Default
  // Filter products based on selection
// Note: If you want a "Show All" option, handle that logic here
const displayedProducts = products.filter(p => p.category === selectedCategory);


  // Add Item
  const handleAddToCart = (product) => {
    const exists = cart.find(item => item.id === product.id);
    if (exists) {
      setCart(cart.map(item => item.id === product.id ? { ...exists, qty: exists.qty + 1 } : item));
    } else {
      setCart([...cart, { ...product, qty: 1 }]);
    }
    setIsCartOpen(true); // Auto-open cart when adding item (Like Chaldal)
  };

  // Update Quantity (+ or -)
// Update Quantity (and remove if 0)
  const handleUpdateQty = (id, amount) => {
    setCart(prevCart => {
      return prevCart.map(item => {
        if (item.id === id) {
          return { ...item, qty: item.qty + amount };
        }
        return item;
      }).filter(item => item.qty > 0); // <--- This line removes items with 0 qty
    });
  };

 return (
    
    <div className="app-container">
      {/* Header (Keep as is) */}
      <header className="header">
        <div className="logo-section">
          <div className="menu-icon">☰</div>
          <h1>Chaldal</h1>
        </div>
        {/* Search Bar (New Realism Feature) */}
        <div className="search-bar">
          <input type="text" placeholder="Search for products (e.g. eggs, milk)..." />
          <button>🔍</button>
        </div>
        
        <div className="cart-badge" onClick={() => setIsCartOpen(true)}>
          🛍️ {cart.reduce((acc, item) => acc + item.qty, 0)} Items
        </div>
      </header>

      {/* Main Layout: Flex container for Sidebar + Grid */}
      <div className="main-layout" style={{ display: 'flex' }}>
        
        {/* Left Sidebar */}
       {/* Left Sidebar */}
<CategorySidebar 
  activeCategory={selectedCategory} 
  onSelectCategory={setSelectedCategory} 
/>

        {/* Right Content */}
<main className="product-grid" style={{ flex: 1, background: '#f6f6f6' }}>
  {/* ... banner code ... */}

  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '20px' }}>
 {displayedProducts.map((product) => (
  <ProductCard 
    key={product.id} 
    product={product} 
    cart={cart}
    onAddToCart={handleAddToCart} 
    onUpdateQty={handleUpdateQty}
  />
))}
  </div>
</main>
      </div>

      <CartSidebar 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)} 
        cartItems={cart} 
        onUpdateQty={handleUpdateQty}
      />
    </div>
  );
}

export default App;