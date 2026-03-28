import React, { useEffect, useState, useRef } from "react";
import "./App.css";

function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  const cacheRef = useRef({});
  const activeFetchId = useRef(0);
  const lastFetchTime = useRef(null);

  const fetchProducts = async () => {
    const fetchId = ++activeFetchId.current;
    setLoading(true);

    if (cacheRef.current.data) {
      setProducts(cacheRef.current.data);
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("https://dummyjson.com/products");
      const data = await response.json();

      if (fetchId === activeFetchId.current) {
        cacheRef.current.data = data.products;
        lastFetchTime.current = Date.now();
        setProducts(data.products);
        setLoading(false);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Filter products based on search term
  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="App">
      <h1>Product Listing</h1>

      <input
        type="text"
        placeholder="Search products..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-bar"
      />

      {loading ? (
        <div className="skeleton-container">
          {[...Array(6)].map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      ) : (
        <ProductList products={filteredProducts} />
      )}
    </div>
  );
}

const ProductList = ({ products }) => (
  <div className="product-list">
    {products.length > 0 ? (
      products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))
    ) : (
      <p>No products found.</p>
    )}
  </div>
);

const ProductCard = ({ product }) => (
  <div className="product-card">
    <img src={product.thumbnail} alt={product.title} />
    <h3>{product.title}</h3>
    <p>{product.description}</p>
    <p><strong>${product.price}</strong></p>
  </div>
);

const SkeletonCard = () => (
  <div className="skeleton-card">
    <div className="skeleton-img"></div>
    <div className="skeleton-text"></div>
    <div className="skeleton-text short"></div>
  </div>
);

export default App;
