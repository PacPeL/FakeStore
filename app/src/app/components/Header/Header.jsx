import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loadCart, getCartCount } from "../../services/cartService";
import "./Header.scss";

const Header = () => {
  const navigate = useNavigate();
  const [cartCount, setCartCount] = useState(0);
  const user = JSON.parse(localStorage.getItem("user"));

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

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
    window.location.reload();
  };

  return (
    <header className="topbar">
      <div className="topbar__left">
        <button
          className="topbar__menuHint"
          type="button"
          title="Menu"
          onClick={() => window.dispatchEvent(new CustomEvent("drawer_toggle"))}
        >
          ☰
        </button>

        <Link to="/" className="topbar__logo">
          FakeStore
        </Link>
      </div>

      <div className="topbar__search">
        <input type="text" placeholder="Search products..." />
        <button type="button">Search</button>
      </div>

      <div className="topbar__right">
        <button className="topbar__iconBtn" type="button" title="Notifications">
          🔔
          <span className="topbar__dot" />
        </button>

        <Link to="/cart" className="topbar__iconBtn" title="Cart">
          🛒
          {cartCount > 0 && <span className="topbar__badge">{cartCount}</span>}
        </Link>

        {user ? (
          <div className="topbar__profile">
            <span className="topbar__email">{user.email}</span>
            <button className="topbar__logout" onClick={handleLogout} type="button">
              Logout
            </button>
          </div>
        ) : (
          <Link to="/login" className="topbar__signin">
            Sign In
          </Link>
        )}
      </div>
    </header>
  );
};

export default Header;
