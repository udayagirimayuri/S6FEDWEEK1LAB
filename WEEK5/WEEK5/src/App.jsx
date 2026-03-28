import React, { useEffect, useState, useRef } from "react";
import ProductList from "./ProductList";
import SkeletonCard from "./SkeletonCard";

const ProductContainer = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // In-memory cache
  const cacheRef = useRef({});
  // Track latest fetch request to avoid stale state
  const activeFetchId = useRef(0);
  // Closure to track last fetch timestamp
  const lastFetchTime = useRef(null);

  const fetchProducts = async () => {
    const fetchId = ++activeFetchId.current;
    setLoading(true);

    // If cached data exists, use it
    if (cacheRef.current.data) {
      setProducts(cacheRef.current.data);
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("https://dummyjson.com/products");
      const data = await response.json();

      // Prevent stale state updates
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

  return (
    <div>
      {loading ? (
        <div className="skeleton-container">
          {[...Array(6)].map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      ) : (
        <ProductList products={products} />
      )}
    </div>
  );
};

export default ProductContainer;