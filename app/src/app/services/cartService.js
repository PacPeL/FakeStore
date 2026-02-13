const CART_KEY = "fakestore_cart_v1";

/* =========================
   LOAD
========================= */

export const loadCart = () => {
  try {
    const raw = localStorage.getItem(CART_KEY);

    if (!raw) return [];

    const parsed = JSON.parse(raw);

    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
};

/* =========================
   SAVE + EVENT DISPATCH
========================= */

export const saveCart = (cart) => {
  try {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));

    // 👉 notifica a la app que el carrito cambió
    window.dispatchEvent(new CustomEvent("cart_updated"));
  } catch {
    // no romper la app si falla storage
  }
};

/* =========================
   ADD PRODUCT
========================= */

export const addToCart = (cart, product, qty = 1) => {
  const safeQty = Math.max(1, Number(qty) || 1);

  const existing = cart.find((item) => item.id === product.id);

  if (existing) {
    return cart.map((item) =>
      item.id === product.id
        ? { ...item, qty: item.qty + safeQty }
        : item
    );
  }

  // snapshot del producto (backend-ready)
  return [
    ...cart,
    {
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      qty: safeQty,
    },
  ];
};

/* =========================
   UPDATE QTY
========================= */

export const updateQty = (cart, productId, qty) => {
  const safeQty = Math.max(1, Number(qty) || 1);

  return cart.map((item) =>
    item.id === productId ? { ...item, qty: safeQty } : item
  );
};

/* =========================
   REMOVE PRODUCT
========================= */

export const removeFromCart = (cart, productId) => {
  return cart.filter((item) => item.id !== productId);
};

/* =========================
   HELPERS
========================= */

export const getCartCount = (cart) => {
  return cart.reduce((total, item) => total + item.qty, 0);
};

export const getCartTotal = (cart) => {
  return cart.reduce(
    (total, item) => total + item.price * item.qty,
    0
  );
};
