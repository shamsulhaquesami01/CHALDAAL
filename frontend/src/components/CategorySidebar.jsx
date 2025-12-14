import React, { useState } from 'react';
import './CategorySidebar.css';

const categories = [
  { id: 1, name: 'Flash Sales', icon: '⚡' },
  { id: 2, name: 'Grocery', icon: '🥚' },
  { id: 3, name: 'Pharmacy', icon: '💊' },
  { id: 4, name: 'Food', icon: '🍗' },
  { id: 5, name: 'Cleaning Supplies', icon: '🧹' },
  { id: 6, name: 'Home & Kitchen', icon: '🍳' },
  { id: 7, name: 'Baby Care', icon: '👶' },
  { id: 8, name: 'Pet Care', icon: '🐱' },
];

const CategorySidebar = () => {
  const [activeId, setActiveId] = useState(2); // Default to 'Grocery'

  return (
    <aside className="category-sidebar">
      <div className="menu-list">
        {categories.map((cat) => (
          <div 
            key={cat.id} 
            className={`menu-item ${activeId === cat.id ? 'active' : ''}`}
            onClick={() => setActiveId(cat.id)}
          >
            <span className="icon">{cat.icon}</span>
            <span className="label">{cat.name}</span>
            <span className="arrow">›</span>
          </div>
        ))}
      </div>
      
      {/* Realistic Footer Links */}
      <div className="sidebar-footer">
        <p>📞 16710</p>
        <p>Help & Support</p>
      </div>
    </aside>
  );
};

export default CategorySidebar;