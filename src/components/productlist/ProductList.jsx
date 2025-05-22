import { useEffect, useState } from "react";
import { getFakeStoreProducts } from "../api/fakestore";
import { getDummyJsonProducts } from "../api/dummyjson";
import ProductCard from "../productcard/ProductCard";
import styles from "./ProductList.module.css";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProducts() {
      setLoading(true);
      const [fakeStore, dummyJson] = await Promise.all([
        getFakeStoreProducts(),
        getDummyJsonProducts(),
      ]);
      const fakeStoreWithSource = fakeStore.map((p) => ({
        ...p,
        source: "fakestore",
      }));
      const dummyJsonWithSource = dummyJson.map((p) => ({
        ...p,
        source: "dummyjson",
      }));
      setProducts([...fakeStoreWithSource, ...dummyJsonWithSource]);
      setLoading(false);
    }
    fetchProducts();
  }, []);

  if (loading) return <div className={styles.loading}>Loading products...</div>;

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Product List</h1>
      <div className={styles.grid}>
        {products.map((product) => (
          <ProductCard key={product.source + product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductList;