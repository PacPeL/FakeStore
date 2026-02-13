import { useState } from "react";

const clamp = (n, min, max) => Math.max(min, Math.min(max, n));

/**
 * RatingStars
 * - value: número 0..5 (ej: 4.2) para mostrar estrellas según promedio
 * - onRate: callback al hacer click en una estrella (1..5)
 */
const RatingStars = ({ value = 0, onRate }) => {
  const [hovered, setHovered] = useState(0);

  const safeValue = clamp(Number(value) || 0, 0, 5);

  // Cuando hay hover mostramos hover, si no mostramos el promedio
  const displayValue = hovered > 0 ? hovered : safeValue;

  // Para mostrar relleno parcial: cada estrella se rellena según cuánto "cubre" el valor
  const getFillPercent = (starIndex) => {
    const diff = displayValue - starIndex; // starIndex: 0..4
    const percent = clamp(diff, 0, 1) * 100;
    return percent;
  };

  return (
    <div
      style={{ display: "inline-flex", alignItems: "center", gap: "4px" }}
      onMouseLeave={() => setHovered(0)}
    >
      {[0, 1, 2, 3, 4].map((i) => {
        const fill = getFillPercent(i);

        return (
          <button
            key={i}
            type="button"
            aria-label={`Rate ${i + 1} stars`}
            onMouseEnter={() => setHovered(i + 1)}
            onClick={() => onRate?.(i + 1)}
            style={{
              position: "relative",
              width: "18px",
              height: "18px",
              padding: 0,
              border: "none",
              background: "transparent",
              cursor: onRate ? "pointer" : "default",
            }}
          >
            {/* estrella base (vacía) */}
            <span
              style={{
                position: "absolute",
                inset: 0,
                color: "#cbd5e1",
                fontSize: "18px",
                lineHeight: "18px",
              }}
            >
              ★
            </span>

            {/* estrella rellena parcial */}
            <span
              style={{
                position: "absolute",
                inset: 0,
                width: `${fill}%`,
                overflow: "hidden",
                color: "#f59e0b",
                fontSize: "18px",
                lineHeight: "18px",
                whiteSpace: "nowrap",
              }}
            >
              ★
            </span>
          </button>
        );
      })}
    </div>
  );
};

export default RatingStars;
