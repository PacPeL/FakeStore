import { useEffect, useMemo, useState } from "react";
import { products as initialProducts } from "../data/products";
import { calculateAverage } from "../utils/calculateAverage";
import { loadProducts, saveProducts } from "../services/storageService";
import {
  loadCart,
  saveCart,
  addToCart as addToCartFn,
  getCartCount,
} from "../services/cartService";
import StarRating from "../components/products/RatingStars";
import "../styles/pages/_home.scss";

const Home = () => {
  // productos (ratings) persistentes
  const [products, setProducts] = useState(() => loadProducts(initialProducts));

  // carrito persistente
  const [cart, setCart] = useState(() => loadCart());

  useEffect(() => {
    saveProducts(products);
  }, [products]);

  useEffect(() => {
    saveCart(cart);
  }, [cart]);

  const handleRating = (productId, rating) => {
    setProducts((prev) =>
      prev.map((p) =>
        p.id !== productId ? p : { ...p, ratings: [...p.ratings, rating] }
      )
    );
  };

  const sortedProducts = useMemo(() => {
    return [...products].sort(
      (a, b) =>
        Number(calculateAverage(b.ratings)) - Number(calculateAverage(a.ratings))
    );
  }, [products]);

  const handleAddToCart = (product) => {
    setCart((prev) => addToCartFn(prev, product, 1));
  };

  const cartCount = useMemo(() => getCartCount(cart), [cart]);

  return (
    <div className="home">
      <div className="home__topRow">
        <h1 className="home__title">Products</h1>
        <div className="home__cartMini"><span>{cartCount}</span>
        </div>
      </div>

      <div className="products-grid">
        {sortedProducts.map((product) => (
          <div className="product-card" key={product.id}>
            <img
              src={product.image}
              alt={product.name}
              className="product-card__image"
            />

            <h3 className="product-card__name">{product.name}</h3>

            <p className="product-card__price">${product.price}</p>

            <div className="product-card__ratingRow">
              <StarRating
                value={Number(calculateAverage(product.ratings))}
                onRate={(rating) => handleRating(product.id, rating)}
              />
              <span className="product-card__ratingValue">
                {calculateAverage(product.ratings)}
              </span>
            </div>

            <button
              className="product-card__btn"
              onClick={() => handleAddToCart(product)}
            >
              Add to cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
