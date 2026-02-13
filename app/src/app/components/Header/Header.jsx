import { useEffect, useMemo, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loadCart, getCartCount } from "../../services/cartService";
import "./Header.scss";

const Header = () => {
  const navigate = useNavigate();
  const [cartCount, setCartCount] = useState(0);
  const user = JSON.parse(localStorage.getItem("user"));

  const [query, setQuery] = useState("");

  const [notifOpen, setNotifOpen] = useState(false);
  const notifRef = useRef(null);

  const [drawerOpen, setDrawerOpen] = useState(false);

  const [notifications, setNotifications] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("notifications")) || [];
    } catch {
      return [];
    }
  });

  const unreadCount = useMemo(
    () => notifications.filter((n) => !n.read).length,
    [notifications]
  );

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

  useEffect(() => {
    const onClickOutside = (e) => {
      if (!notifRef.current) return;
      if (!notifRef.current.contains(e.target)) setNotifOpen(false);
    };
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  useEffect(() => {
    const refreshNotifs = () => {
      try {
        const arr = JSON.parse(localStorage.getItem("notifications")) || [];
        setNotifications(arr);
      } catch {
        setNotifications([]);
      }
    };
    window.addEventListener("notifications_updated", refreshNotifs);
    window.addEventListener("storage", refreshNotifs);
    return () => {
      window.removeEventListener("notifications_updated", refreshNotifs);
      window.removeEventListener("storage", refreshNotifs);
    };
  }, []);

  // ✅ escucha estado del drawer desde Drawer.jsx
  useEffect(() => {
    const handler = (e) => setDrawerOpen(!!e.detail?.open);
    window.addEventListener("drawer_state", handler);
    return () => window.removeEventListener("drawer_state", handler);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
    window.location.reload();
  };

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/home?q=${encodeURIComponent(query.trim())}`);
  };

  const markAllRead = () => {
    const updated = notifications.map((n) => ({ ...n, read: true }));
    setNotifications(updated);
    localStorage.setItem("notifications", JSON.stringify(updated));
    window.dispatchEvent(new Event("notifications_updated"));
  };

  const seedDemoNotifications = () => {
    const demo = [
      {
        id: "n1",
        text: "Tu camisa en deseados ahora tiene 20% de descuento",
        date: "Hoy",
        read: false,
      },
      {
        id: "n2",
        text: "Nuevo descuento en Zapatillas Runner (15%)",
        date: "Ayer",
        read: true,
      },
    ];
    setNotifications(demo);
    localStorage.setItem("notifications", JSON.stringify(demo));
    window.dispatchEvent(new Event("notifications_updated"));
  };

  return (
    <header className={`topbar ${drawerOpen ? "is-drawer-open" : ""}`}>
      <div className="topbar__left">
        <button
          className={`topbar__menuHint ${drawerOpen ? "is-floating" : ""}`}
          type="button"
          title="Menu"
          onClick={() => window.dispatchEvent(new CustomEvent("drawer_toggle"))}
        >
          {drawerOpen ? "✕" : "☰"}
        </button>

        <Link to="/" className="topbar__logo">
          FakeStore
        </Link>
      </div>

      <form className="topbar__search" onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Search products..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>

      <div className="topbar__right">
        <div className="topbar__notifWrap" ref={notifRef}>
          <button
            className="topbar__iconBtn"
            type="button"
            title="Notifications"
            onClick={() => setNotifOpen((v) => !v)}
          >
            🔔
            <span className={`topbar__dot ${unreadCount > 0 ? "is-visible" : ""}`} />
          </button>

          {notifOpen && (
            <div className="topbar__notifPanel">
              <div className="topbar__notifHeader">
                <h4 className="topbar__notifTitle">Notifications</h4>
                <div className="topbar__notifHeaderActions">
                  <button className="topbar__notifAction" type="button" onClick={markAllRead}>
                    Mark all read
                  </button>
                  <button
                    className="topbar__notifAction topbar__notifAction--muted"
                    type="button"
                    onClick={seedDemoNotifications}
                  >
                    Demo
                  </button>
                </div>
              </div>

              <div className="topbar__notifList">
                {notifications.length === 0 ? (
                  <div className="topbar__notifEmpty">No notifications yet.</div>
                ) : (
                  notifications.map((n) => (
                    <div key={n.id} className={`topbar__notifItem ${n.read ? "is-read" : ""}`}>
                      <div className="topbar__notifDot" />
                      <div className="topbar__notifContent">
                        <div className="topbar__notifText">{n.text}</div>
                        <div className="topbar__notifMeta">{n.date}</div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>

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