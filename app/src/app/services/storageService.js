const KEY = "fakestore_products_v1";

export const loadProducts = (fallbackProducts) => {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return fallbackProducts;

    const parsed = JSON.parse(raw);

    // Validación mínima (por si el storage se corrompe)
    if (!Array.isArray(parsed)) return fallbackProducts;

    return parsed;
  } catch {
    return fallbackProducts;
  }
};

export const saveProducts = (products) => {
  try {
    localStorage.setItem(KEY, JSON.stringify(products));
  } catch {
    // Si el storage está lleno o bloqueado, no rompemos la app
  }
};

export const clearProductsCache = () => {
  localStorage.removeItem(KEY);
};
