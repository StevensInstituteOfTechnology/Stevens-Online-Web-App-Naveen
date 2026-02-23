import { useState, useEffect, useRef, useCallback } from "react";
import { useInView } from "framer-motion";

function easeOutCubic(t) {
  return 1 - Math.pow(1 - t, 3);
}

/**
 * Parses a formatted stat string like "#1", "129%", "$5,250"
 * into { prefix, number, suffix, hasComma }.
 */
function parseStatValue(value) {
  const match = value.match(/^([#$]?)([0-9,]+)([%+]?)$/);
  if (!match) return null;

  const [, prefix, numStr, suffix] = match;
  const hasComma = numStr.includes(",");
  const number = parseInt(numStr.replace(/,/g, ""), 10);

  return { prefix, number, suffix, hasComma };
}

function formatNumber(n, hasComma) {
  const rounded = Math.round(n);
  if (hasComma) return rounded.toLocaleString("en-US");
  return String(rounded);
}

export function useCountUp(value, { duration = 1.5 } = {}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  const parsed = useRef(parseStatValue(value));
  const [display, setDisplay] = useState(value);

  const animate = useCallback(() => {
    const p = parsed.current;
    if (!p) return;

    const startTime = performance.now();
    const durationMs = duration * 1000;

    function tick(now) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / durationMs, 1);
      const eased = easeOutCubic(progress);
      const current = eased * p.number;

      setDisplay(`${p.prefix}${formatNumber(current, p.hasComma)}${p.suffix}`);

      if (progress < 1) {
        requestAnimationFrame(tick);
      }
    }

    requestAnimationFrame(tick);
  }, [duration]);

  useEffect(() => {
    if (isInView) animate();
  }, [isInView, animate]);

  return { ref, display };
}
