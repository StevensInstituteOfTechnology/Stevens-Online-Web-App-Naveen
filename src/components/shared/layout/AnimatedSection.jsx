import React from "react";
import { motion } from "framer-motion";

/**
 * A reusable component that animates its children when they scroll into view.
 * It applies a fade-in and slide-up effect.
 *
 * @param {object} props - The component props.
 * @param {React.ReactNode} props.children - The content to be animated.
 * @param {string} [props.className] - Optional CSS classes to apply to the wrapper.
 * @param {number} [props.delay=0] - Optional delay for the animation start.
 */
export default function AnimatedSection({ children, className, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay, ease: "easeOut" }}
      viewport={{ once: true, amount: 0.2 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
