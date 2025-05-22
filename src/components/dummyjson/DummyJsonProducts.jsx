import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchProducts } from "../../store/productsSlice";
import styles from "./DummyJsonProducts.module.css";

const DummyJsonProducts = () => {
  const dispatch = useDispatch();
  const { items: products, loading, error } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  if (loading)
    return (
      <div className={styles.container} style={{ textAlign: "center" }}>
        <span style={{ fontSize: "1.2rem", color: "#4a4e69" }}>
          Loading DummyJSON products...
        </span>
      </div>
    );

  if (error)
    return (
      <div className={styles.container} style={{ textAlign: "center", color: "red" }}>
        Error: {error}
      </div>
    );

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>DummyJSON Products</h2>
      <div className={styles.grid}>
        {products.map((product) => (
          <div
            key={product.id}
            className={styles.card}
            tabIndex={0}
            aria-label={product.title}
          >
            <img
              src={product.thumbnail}
              alt={product.title}
              className={styles.image}
            />
            <div className={styles.title}>{product.title}</div>
            <div className={styles.price}>${product.price}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DummyJsonProducts;