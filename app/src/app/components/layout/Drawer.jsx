import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { loadCart, getCartCount } from "../../services/cartService";
import "./Drawer.scss";

const Drawer = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);

  const toggleDrawer = () => setIsOpen((v) => !v);
  const closeDrawer = () => setIsOpen(false);

  // Cart count sync
  useEffect(() => {
    const updateCart = () => {
      const cart = loadCart();
      setCartCount(getCartCount(cart));
    };

    updateCart();
    window.addEventListener("cart_updated", updateCart);
    window.addEventListener("storage", updateCart);

    return () => {
      window.removeEventListener("cart_updated", updateCart);
      window.removeEventListener("storage", updateCart);
    };
  }, []);

  // Header controla el drawer
  useEffect(() => {
    window.addEventListener("drawer_toggle", toggleDrawer);
    return () => window.removeEventListener("drawer_toggle", toggleDrawer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ESC cierra
  useEffect(() => {
    const onKeyDown = (e) => e.key === "Escape" && closeDrawer();
    if (isOpen) document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [isOpen]);

  // ✅ Cuando abre: bloquea scroll + avisa estado al Header + clase global
  useEffect(() => {
    document.body.classList.toggle("drawer-open", isOpen);
    document.body.style.overflow = isOpen ? "hidden" : "";

    window.dispatchEvent(
      new CustomEvent("drawer_state", { detail: { open: isOpen } })
    );

    return () => {
      document.body.classList.remove("drawer-open");
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <>
      {/* overlay */}
      <div
        className={`overlay ${isOpen ? "active" : ""}`}
        onClick={closeDrawer}
        aria-hidden={!isOpen}
      />

      {/* drawer */}
      <aside className={`drawer ${isOpen ? "open" : ""}`} aria-hidden={!isOpen}>
        <div className="drawer__header">
          <h2 className="logo">FakeStore</h2>

          {/* Botón cerrar dentro del drawer (siempre visible cuando está abierto) */}
          <button
            className="drawer__close"
            onClick={closeDrawer}
            type="button"
            aria-label="Close menu"
          >
            ✕
          </button>
        </div>

        <nav>
          <Link to="/" onClick={closeDrawer}>Home</Link>

          <Link to="/cart" onClick={closeDrawer}>
            Cart {cartCount > 0 ? `(${cartCount})` : ""}
          </Link>

          <Link to="/profile" onClick={closeDrawer}>Profile</Link>

          {/* Settings lo agregamos después cuando lo pidas */}
          {/* <Link to="/settings" onClick={closeDrawer}>Settings</Link> */}

          <Link to="/admin" onClick={closeDrawer}>Admin</Link>
        </nav>
      </aside>
    </>
  );
};

export default Drawer;