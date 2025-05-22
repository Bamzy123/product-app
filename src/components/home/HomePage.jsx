import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchProducts } from "../../store/productsSlice";
import { addToCart } from "../../store/cartSlice";
import { Link } from "react-router-dom";
import styles from "./HomePage.module.css";
const HomePage = () => {
  const dispatch = useDispatch();
  const { items: products, loading, error } = useSelector((state) => state.products);

  useEffect(() => {
    if (products.length === 0) dispatch(fetchProducts());
  }, [dispatch, products.length]);

  const handleAddToCart = (product) => { 
    dispatch(addToCart(product));
  };

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
      <h2 className={styles.heading}>All Products</h2>
      <div className={styles.grid}>
        {products.map((product) => (
          <div key={product.id} className={styles.card}>
            <img
              src={product.thumbnail}
              alt={product.title}
              className={styles.image}
            />
            <div className={styles.title}>{product.title}</div>
            <div className={styles.price}>${product.price}</div>
            <div className={styles.actions}>
              <button className={styles.cartBtn} onClick={() => handleAddToCart(product)}>
                Add to Cart
              </button>
              <Link to={`/product/${product.id}`} className={styles.descBtn}>
                View Description
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;