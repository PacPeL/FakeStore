import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { loadCart, getCartCount } from "../../services/cartService";
import "./Drawer.css";

const Drawer = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);

  const toggleDrawer = () => setIsOpen((v) => !v);
  const closeDrawer = () => setIsOpen(false);


  useEffect(() => {
    const updateCart = () => {
      const cart = loadCart();
      setCartCount(getCartCount(cart));
    };

    updateCart();

    window.addEventListener("cart_updated", updateCart); // misma pestaña
    window.addEventListener("storage", updateCart); // otras pestañas

    return () => {
      window.removeEventListener("cart_updated", updateCart);
      window.removeEventListener("storage", updateCart);
    };
  }, []);

  // ✅ permitir que el Header controle el drawer
  useEffect(() => {
    window.addEventListener("drawer_toggle", toggleDrawer);
    return () => window.removeEventListener("drawer_toggle", toggleDrawer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {/* botón hamburguesa (móvil) */}
      <button
        className={`menu-btn ${isOpen ? "open" : ""}`}
        onClick={toggleDrawer}
        type="button"
        aria-label="Open menu"
      >
        <span />
        <span />
        <span />
      </button>

      {/* overlay */}
      <div
        className={`overlay ${isOpen ? "active" : ""}`}
        onClick={closeDrawer}
      />

      {/* drawer */}
      <div className={`drawer ${isOpen ? "open" : ""}`}>
        <h2 className="logo">FakeStore</h2>

        <nav>
          <Link to="/" onClick={closeDrawer}>
            Home
          </Link>

          <Link to="/cart" onClick={closeDrawer}>
            Cart ({cartCount})
          </Link>

          <Link to="/profile" onClick={closeDrawer}>
            Profile
          </Link>

          <Link to="/admin" onClick={closeDrawer}>
            Admin
          </Link>
        </nav>
      </div>
    </>
  );
};

export default Drawer;
