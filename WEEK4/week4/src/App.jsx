import { useEffect, useState } from "react";
import "./App.css";

// -------- Closure (tracks API calls) --------
function createFetchCounter() {
  let count = 0;
  return function () {
    count++;
    return count;
  };
}
const getFetchCount = createFetchCounter();

// -------- Presentational Component (Dumb) --------
function ProductCard({ product }) {
  return (
    <div className="card">
      <img src={product.thumbnail} alt={product.title} />
      <h3>{product.title}</h3>
      <p>${product.price}</p>
    </div>
  );
}

// -------- Skeleton UI --------
function SkeletonCard() {
  return (
    <div className="card skeleton">
      <div className="img"></div>
      <div className="text"></div>
      <div className="text small"></div>
    </div>
  );
}

// -------- Container Component (Smart) --------
function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [fetchCount, setFetchCount] = useState(0);

  useEffect(() => {
    async function fetchProducts() {
      setLoading(true);

      const count = getFetchCount();
      setFetchCount(count);

      const res = await fetch("https://dummyjson.com/products");
      const data = await res.json();

      setProducts(data.products);
      setLoading(false);
    }

    fetchProducts();
  }, []);

  return (
    <div className="app">
      <header className="header">
        <h1>Product Listing Page</h1>
        <p>Async UI | Skeleton | Smart-Dumb Components</p>
        <p className="count">API Fetch Count: {fetchCount}</p>
      </header>

      <div className="grid">
        {loading
          ? Array(8)
              .fill(0)
              .map((_, i) => <SkeletonCard key={i} />)
          : products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
      </div>
    </div>
  );
}

export default App;