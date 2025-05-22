import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getFakeStoreProductById } from "../api/fakestore";
import { getDummyJsonProductById } from "../api/dummyjson";
import styles from "./ProductDetail.module.css";

const ProductDetail = () => {
  const { source, id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProduct() {
      setLoading(true);
      let data;
      if (source === "fakestore") {
        data = await getFakeStoreProductById(id);
      } else if (source === "dummyjson") {
        data = await getDummyJsonProductById(id);
      }
      setProduct(data);
      setLoading(false);
    }
    fetchProduct();
  }, [source, id]);

  if (loading) return <div className={styles.loading}>Loading product...</div>;
  if (!product) return <div className={styles.notFound}>Product not found.</div>;

  return (
    <div className={styles.container}>
      <Link to="/" className={styles.backLink}>← Back to Products</Link>
      <h1 className={styles.title}>{product.title}</h1>
      <img
        src={product.image || product.thumbnail}
        alt={product.title}
        className={styles.image}
      />
      <div className={styles.price}>${product.price}</div>
      <p className={styles.description}>{product.description}</p>
    </div>
  );
};

export default ProductDetail;