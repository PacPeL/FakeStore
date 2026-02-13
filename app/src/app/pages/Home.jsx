// app/src/app/pages/Home.jsx
import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import "../styles/pages/_home.scss";

const LS_PRODUCTS_KEY = "products";

function moneyUSD(value) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(value);
}

function clamp(n, min, max) {
  return Math.max(min, Math.min(max, n));
}

function finalPrice(price, discountPercent) {
  const d = clamp(discountPercent || 0, 0, 100);
  return +(price * (1 - d / 100)).toFixed(2);
}

function seedDemoProducts() {
  return [
    {
      id: "p1",
      title: "Ultrabook 14",
      description: "Light and fast laptop for work and study (SSD + 16GB RAM).",
      category: "Laptops",
      price: 1299,
      discountPercent: 10,
      rating: 4.7,
      stock: 5,
      image:
        "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=1400&q=60",
      createdAt: Date.now() - 200000,
    },
    {
      id: "p2",
      title: "Compact Camera",
      description: "Compact camera for photo and video with great stabilization.",
      category: "Smart Home",
      price: 399,
      discountPercent: 0,
      rating: 4.0,
      stock: 2,
      image:
        "https://images.unsplash.com/photo-1519183071298-a2962be96c1b?auto=format&fit=crop&w=1400&q=60",
      createdAt: Date.now() - 300000,
    },
    {
      id: "p3",
      title: "Smartwatch X",
      description: "Smartwatch with health tracking, notifications and long battery life.",
      category: "Smartphones",
      price: 250,
      discountPercent: 0,
      rating: 4.4,
      stock: 12,
      image:
        "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=1400&q=60",
      createdAt: Date.now() - 500000,
    },
    {
      id: "p4",
      title: "Airbuds Pro",
      description: "Wireless earbuds with noise cancellation and premium sound.",
      category: "Accessories",
      price: 120,
      discountPercent: 15,
      rating: 4.3,
      stock: 8,
      image:
        "https://images.unsplash.com/photo-1585386959984-a41552231693?auto=format&fit=crop&w=1400&q=60",
      createdAt: Date.now() - 700000,
    },
    {
      id: "p5",
      title: "Mechanical Keyboard",
      description: "RGB mechanical keyboard with tactile switches for high performance.",
      category: "Accessories",
      price: 99,
      discountPercent: 20,
      rating: 4.2,
      stock: 0,
      image:
        "https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?auto=format&fit=crop&w=1400&q=60",
      createdAt: Date.now() - 900000,
    },
  ];
}

export default function Home() {
  const [params] = useSearchParams();
  const qFromUrl = (params.get("q") || "").trim().toLowerCase();

  const [filtersOpen, setFiltersOpen] = useState(true);
  const [products, setProducts] = useState([]);
  const [sortBy, setSortBy] = useState("popular");

  // Load
  useEffect(() => {
    try {
      const stored = JSON.parse(localStorage.getItem(LS_PRODUCTS_KEY));
      if (stored?.length) setProducts(stored);
      else {
        const demo = seedDemoProducts();
        localStorage.setItem(LS_PRODUCTS_KEY, JSON.stringify(demo));
        setProducts(demo);
      }
    } catch {
      const demo = seedDemoProducts();
      localStorage.setItem(LS_PRODUCTS_KEY, JSON.stringify(demo));
      setProducts(demo);
    }
  }, []);

  const categories = useMemo(() => {
    const set = new Set(products.map((p) => p.category || "Other"));
    return Array.from(set).sort();
  }, [products]);

  const filteredProducts = useMemo(() => {
    let list = [...products];

    if (qFromUrl) {
      list = list.filter((p) => {
        const t = (p.title || "").toLowerCase();
        const d = (p.description || "").toLowerCase();
        return t.includes(qFromUrl) || d.includes(qFromUrl);
      });
    }

    // Stock rule: in stock first
    const inStock = list.filter((p) => (p.stock || 0) > 0);
    const outStock = list.filter((p) => (p.stock || 0) <= 0);

    const sortFn = {
      popular: (a, b) => (b.createdAt || 0) - (a.createdAt || 0),
      price_asc: (a, b) => finalPrice(a.price, a.discountPercent) - finalPrice(b.price, b.discountPercent),
      price_desc: (a, b) => finalPrice(b.price, b.discountPercent) - finalPrice(a.price, a.discountPercent),
      discount: (a, b) => (b.discountPercent || 0) - (a.discountPercent || 0),
      rating: (a, b) => (b.rating || 0) - (a.rating || 0),
    }[sortBy];

    inStock.sort(sortFn);
    outStock.sort(sortFn);

    return [...inStock, ...outStock];
  }, [products, qFromUrl, sortBy]);

  return (
    <section className="homePage">
      {/* ✅ El contenedor centra TODO */}
      <div className="homeContainer">
        <div className={`homeLayout ${filtersOpen ? "" : "homeLayout--filtersOff"}`}>
          {/* Filters */}
          <aside className="filtersSide">
            <div className="filtersCard">
              <div className="filtersTop">
                <h3>Filter by</h3>
                <button className="filtersLink" type="button" onClick={() => setFiltersOpen(false)}>
                  Hide
                </button>
              </div>

              <div className="filtersSection">
                <h4>Category</h4>
                <div className="catList">
                  {categories.map((c) => (
                    <label key={c} className="catRow">
                      <input type="checkbox" />
                      <span>{c}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="filtersSection">
                <h4>Price</h4>
                <p className="filtersHint">Hook up your price filter next.</p>
              </div>

              <div className="filtersSection">
                <h4>Rating</h4>
                <p className="filtersHint">Hook up your rating filter next.</p>
              </div>

              <div className="filtersSection">
                <label className="toggleRow">
                  <input type="checkbox" />
                  <span>Discount only</span>
                </label>
              </div>
            </div>
          </aside>

          {/* Main */}
          <main className="homeMain">
            <div className="productsHeader">
              <div className="resultsText">
                {qFromUrl ? <>Search: “{qFromUrl}”</> : <>All products</>}
              </div>

              <div className="productsHeaderRight">
                <button className="filtersBtn" type="button" onClick={() => setFiltersOpen((v) => !v)}>
                  ☰ Filters
                </button>

                <label className="sortBox">
                  Sort by:
                  <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                    <option value="popular">Most popular</option>
                    <option value="price_asc">Price: low → high</option>
                    <option value="price_desc">Price: high → low</option>
                    <option value="discount">Biggest discount</option>
                    <option value="rating">Top rated</option>
                  </select>
                </label>
              </div>
            </div>

            <div className="grid">
              {filteredProducts.map((p) => {
                const fp = finalPrice(p.price, p.discountPercent);
                const hasDiscount = (p.discountPercent || 0) > 0;
                const out = (p.stock || 0) <= 0;

                return (
                  <article key={p.id} className={`card ${out ? "card--out" : ""}`}>
                    <div className="card__imgWrap">
                      {hasDiscount && <div className="badge badge--discount">-{p.discountPercent}%</div>}
                      <div className={`stockPill ${out ? "stockPill--out" : "stockPill--in"}`}>
                        {out ? "Out of stock" : `In stock (${p.stock})`}
                      </div>

                      <img className="card__img" src={p.image} alt={p.title} />
                    </div>

                    <div className="card__body">
                      <h3 className="card__title">{p.title}</h3>

                      <div className="card__rating">
                        <span className="stars">{"★".repeat(Math.round(p.rating || 0))}</span>
                        <span className="ratingVal">{(p.rating || 0).toFixed(1)}</span>
                      </div>

                      <div className="card__priceRow">
                        <div className="priceLine">
                          {hasDiscount && <span className="priceOld">{moneyUSD(p.price)}</span>}
                          <span className={`priceNew ${hasDiscount ? "priceNew--green" : ""}`}>
                            {moneyUSD(fp)}
                          </span>
                        </div>
                      </div>

                      <button className="card__btn" disabled={out} type="button">
                        {out ? "Unavailable" : "Add to cart"}
                      </button>
                    </div>
                  </article>
                );
              })}
            </div>
          </main>
        </div>
      </div>
    </section>
  );
}