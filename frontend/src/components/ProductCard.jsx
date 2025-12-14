import { useCartStore } from '../store/cartStore'

function ProductCard({ product }) {
  const addToCart = useCartStore(state => state.addToCart)

  return (
    <div style={{ border: '1px solid #ccc', padding: '1rem', width: '200px' }}>
      <img src={product.image} alt={product.name} width='100%' />
      <h3>{product.name}</h3>
      <p>৳{product.price}</p>
      <button onClick={() => addToCart(product)}>Add to Cart</button>
    </div>
  )
}

export default ProductCard
