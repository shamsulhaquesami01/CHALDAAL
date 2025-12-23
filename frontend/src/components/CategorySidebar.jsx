import React from 'react';
import './CategorySidebar.css';

// Make sure these names match the "category" inside your src/data/products.js
const categories = [
  { id: 1, name: 'Grocery', icon: '🥚' },
  { id: 2, name: 'Oil', icon: '💧' },
  { id: 3, name: 'Rice', icon: '🍚' },
  { id: 4, name: 'Beverage', icon: '🥤' },
  { id: 5, name: 'Cooking', icon: '🍳' },
  { id: 6, name: 'Food', icon: '🍔' },
  { id: 7, name: 'Pharmacy', icon: '💊' },
];

const CategorySidebar = ({ activeCategory, onSelectCategory }) => {
  return (
    <aside className="category-sidebar">
      <div className="menu-list">
        {categories.map((cat) => (
          <div 
            key={cat.id} 
            // If this category is the active one, add the 'active' class (yellow highlight)
            className={`menu-item ${activeCategory === cat.name ? 'active' : ''}`}
            // When clicked, run the function passed from App.jsx
            onClick={() => onSelectCategory(cat.name)}
          >
            <span className="icon">{cat.icon}</span>
            <span className="label">{cat.name}</span>
            <span className="arrow">›</span>
          </div>
        ))}
      </div>
      
      <div className="sidebar-footer">
        <p>📞 16710</p>
        <p>Help & Support</p>
      </div>
    </aside>
  );
};

export default CategorySidebar;