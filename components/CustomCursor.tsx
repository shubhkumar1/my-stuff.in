"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";

export default function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    // Hide default cursor globally
    if (typeof window !== "undefined" && !window.matchMedia("(hover: none)").matches) {
      document.body.style.cursor = "none";
    }

    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      
      // Check if hovering clickable elements
      if (target.closest("a, button, [role='button']")) {
        setIsHovering(true);
        setIsTyping(false);
      } 
      // Check if hovering text inputs or text elements
      else if (target.closest("input, textarea, p, h1, h2, h3, h4, h5, h6, span")) {
        setIsHovering(false);
        // Only show typing cursor on actual inputs, else just a slightly different state
        if (target.closest("input, textarea")) {
          setIsTyping(true);
        } else {
          setIsTyping(true); // Treat all text as typing-selectable for the "font-style cursor effect"
        }
      } 
      else {
        setIsHovering(false);
        setIsTyping(false);
      }
    };

    window.addEventListener("mousemove", updateMousePosition);
    window.addEventListener("mouseover", handleMouseOver);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      window.removeEventListener("mousemove", updateMousePosition);
      window.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
      if (typeof window !== "undefined") {
        document.body.style.cursor = "auto";
      }
    };
  }, [pathname]);

  // Don't render cursor on touch devices or if not visible
  if (typeof window !== "undefined" && window.matchMedia("(hover: none)").matches) {
    return null;
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <>
          {/* Main small dot / text caret */}
          <motion.div
            className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-exclusion flex items-center justify-center shadow-xl"
            initial={{ opacity: 0 }}
            animate={{ 
              opacity: 1,
              x: mousePosition.x - (isTyping ? 1 : 4), 
              y: mousePosition.y - (isTyping ? 12 : 4),
              width: isTyping ? "2px" : "8px",
              height: isTyping ? "24px" : "8px",
              scale: isHovering ? 1.5 : 1,
              backgroundColor: isTyping ? "var(--primary)" : (isHovering ? "#ffffff" : "var(--primary)"), // teal-500
              borderRadius: isTyping ? "1px" : "50%",
            }}
            exit={{ opacity: 0 }}
            transition={{ type: "spring", stiffness: 1000, damping: 40, mass: 0.1 }}
          />

          {/* Outer ring for futuristic feel, only shown when not typing */}
          <motion.div
            className="fixed top-0 left-0 pointer-events-none z-[9998] border rounded-full"
            style={{ borderColor: "color-mix(in srgb, var(--primary) 50%, transparent)" }}
            initial={{ opacity: 0 }}
            animate={{
              opacity: isTyping ? 0 : (isHovering ? 0.8 : 0.5),
              x: mousePosition.x - (isHovering ? 20 : 16),
              y: mousePosition.y - (isHovering ? 20 : 16),
              width: isHovering ? 40 : 32,
              height: isHovering ? 40 : 32,
              scale: isHovering ? 1.2 : 1,
            }}
            exit={{ opacity: 0 }}
            transition={{ type: "spring", stiffness: 200, damping: 20, mass: 0.5 }}
          />
        </>
      )}
    </AnimatePresence>
  );
}
