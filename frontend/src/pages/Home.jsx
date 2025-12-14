import ProductCard from '../components/ProductCard'
import { products } from '../data/products'

function Home() {
  return (
    <div>
      <h1>Chaaldal Grocery Store</h1>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
        {products.map(p => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </div>
  )
}

export default Home
