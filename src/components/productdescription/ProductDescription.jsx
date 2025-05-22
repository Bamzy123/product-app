import { useParams, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { addToCart } from "../../store/cartSlice";
import styles from "./ProductDescription.module.css";
// import "./ProductDescription.css";

const ProductDescription = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const product = useSelector((state) =>
    state.products.items.find((p) => String(p.id) === String(id))
  );

  if (!product) {
    return (
      <div className={styles.container}>
        <h2>Product Not Found</h2>
        <Link to="/">Back to Home</Link>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <Link to="/" className={styles.backBtn}>← Back to Home</Link>
      <div className={styles.card}>
        <img
          src={product.thumbnail}
          alt={product.title}
          className={styles.image}
        />
        <div className={styles.info}>
          <h2 className={styles.title}>{product.title}</h2>
          <p className={styles.price}>${product.price}</p>
          <p className={styles.desc}>{product.description}</p>
          <button
            className={styles.cartBtn}
            onClick={() => dispatch(addToCart(product))}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDescription;