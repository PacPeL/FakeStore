import { useEffect, useMemo, useState } from "react";
import {
  loadCart,
  saveCart,
  updateQty,
  removeFromCart,
  getCartTotal,
} from "../services/cartService";

const Cart = () => {
  const [cart, setCart] = useState(() => loadCart());

  useEffect(() => {
    saveCart(cart);
  }, [cart]);

  const total = useMemo(() => getCartTotal(cart), [cart]);

  const handleQty = (id, qty) => {
    setCart((prev) => updateQty(prev, id, qty));
  };

  const handleRemove = (id) => {
    setCart((prev) => removeFromCart(prev, id));
  };

  return (
    <div style={{ maxWidth: 900 }}>
      <h1>Cart</h1>

      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          {cart.map((item) => (
            <div
              key={item.id}
              style={{
                display: "flex",
                gap: 16,
                alignItems: "center",
                padding: 12,
                border: "1px solid var(--border-color)",
                borderRadius: 12,
                marginBottom: 12,
                background: "var(--card-bg)",
              }}
            >
              <img
                src={item.image}
                alt={item.name}
                style={{ width: 80, height: 80, objectFit: "contain" }}
              />

              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 700 }}>{item.name}</div>
                <div>${item.price}</div>
              </div>

              <input
                type="number"
                min="1"
                value={item.qty}
                onChange={(e) => handleQty(item.id, e.target.value)}
                style={{ width: 80, padding: 8, borderRadius: 8 }}
              />

              <div style={{ width: 120, fontWeight: 800 }}>
                ${(item.price * item.qty).toFixed(2)}
              </div>

              <button onClick={() => handleRemove(item.id)}>Remove</button>
            </div>
          ))}

          <h2>Total: ${total.toFixed(2)}</h2>

          <button
            style={{
              padding: "12px 16px",
              borderRadius: 10,
              border: "none",
              fontWeight: 800,
              background: "var(--accent-color)",
              cursor: "pointer",
            }}
            onClick={() => alert("Payment simulation ✅")}
          >
            Pay (simulation)
          </button>
        </>
      )}
    </div>
  );
};

export default Cart;
