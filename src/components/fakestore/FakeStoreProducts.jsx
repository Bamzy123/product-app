import { useEffect, useState } from "react";
import styles from "./FakeStoreProducts.module.css";

const FakeStoreProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProducts() {
      setLoading(true);
      const res = await fetch("https://fakestoreapi.com/products");
      const data = await res.json();
      setProducts(data);
      setLoading(false);
    }
    fetchProducts();
  }, []);

  if (loading) return (
    <div className={styles.container} style={{ textAlign: "center" }}>
      <span style={{ fontSize: "1.2rem", color: "#4a4e69" }}>
        Loading FakeStore products...
      </span>
    </div>
  );

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>FakeStore Products</h2>
      <ul className={styles.list}>
        {products.map((product) => (
          <li key={product.id} className={styles.card} tabIndex={0} aria-label={product.title}>
            <div className={styles.title}>{product.title}</div>
            <div className={styles.price}>${product.price}</div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FakeStoreProducts;