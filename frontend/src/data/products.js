export const products = [
  {
    id: 1,
    name: "Miniket Rice Premium",
    category: "Rice",
    price: 65,
    originalPrice: 70, // <--- New field for discount calculation
    unit: "kg",
    image: "https://chaldn.com/_mpimage/chinigura-rice-premium-1-kg?src=https%3A%2F%2Feggyolk.chaldal.com%2Fapi%2FPicture%2FRaw%3FpictureId%3D48071&q=best&v=1&m=400&webp=1",
    stock: 50
  },
  {
    id: 2,
    name: "Rupchanda Soybean Oil",
    category: "Oil",
    price: 185,
    originalPrice: 190,
    unit: "ltr",
    image: "https://chaldn.com/_mpimage/rupchanda-soybean-oil-2-ltr?src=https%3A%2F%2Feggyolk.chaldal.com%2Fapi%2FPicture%2FRaw%3FpictureId%3D129481&q=best&v=1",
    stock: 20
  },
  {
    id: 3,
    name: "Coca-Cola",
    category: "Beverage",
    price: 60,
    originalPrice: 60, // No discount
    unit: "bottle",
    image: "https://chaldn.com/_mpimage/coca-cola-250-ml?src=https%3A%2F%2Feggyolk.chaldal.com%2Fapi%2FPicture%2FRaw%3FpictureId%3D146979&q=best&v=1&m=400&webp=1",
    stock: 100
  },
  {
    id: 4,
    name: "ACI Pure Salt",
    category: "Grocery",
    price: 40,
    originalPrice: 45,
    unit: "kg",
    image: "https://chaldn.com/_mpimage/aci-pure-salt-1-kg?src=https%3A%2F%2Feggyolk.chaldal.com%2Fapi%2FPicture%2FRaw%3FpictureId%3D47100&q=best&v=1&m=400&webp=1",
    stock: 200
  }
];