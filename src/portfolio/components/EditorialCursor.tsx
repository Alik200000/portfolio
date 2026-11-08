import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export function EditorialCursor() {
  const [enabled, setEnabled] = useState(false);
  const [hoveredLabel, setHoveredLabel] = useState<string | null>(null);
  const [isPressed, setIsPressed] = useState(false);

  const cursorX = useMotionValue(-200);
  const cursorY = useMotionValue(-200);

  const springX = useSpring(cursorX, { stiffness: 480, damping: 32, mass: 0.4 });
  const springY = useSpring(cursorY, { stiffness: 480, damping: 32, mass: 0.4 });

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const hasFinePointer = window.matchMedia('(pointer: fine)').matches;
    if (prefersReduced || !hasFinePointer) return;

    setEnabled(true);

    const handleMouseMove = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);

      const target = e.target as HTMLElement | null;
      if (!target) return;

      const labeledEl = target.closest('[data-cursor-label]') as HTMLElement | null;
      if (labeledEl) {
        setHoveredLabel(labeledEl.getAttribute('data-cursor-label') || 'ОТКРЫТЬ ↗');
        return;
      }

      const interactiveEl = target.closest('a, button, [role="tab"]') as HTMLElement | null;
      if (interactiveEl) {
        setHoveredLabel('↗');
      } else {
        setHoveredLabel(null);
      }
    };

    const handleMouseDown = () => setIsPressed(true);
    const handleMouseUp = () => setIsPressed(false);

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [cursorX, cursorY]);

  if (!enabled) return null;

  return (
    <motion.div
      aria-hidden="true"
      style={{
        x: springX,
        y: springY,
      }}
      className="pointer-events-none fixed top-0 left-0 z-[80] -translate-x-1/2 -translate-y-1/2 hidden lg:flex items-center justify-center mix-blend-difference"
    >
      <motion.div
        animate={{
          scale: isPressed ? 0.85 : hoveredLabel ? 1.15 : 1,
          width: hoveredLabel && hoveredLabel.length > 2 ? 96 : hoveredLabel ? 42 : 26,
          height: hoveredLabel ? 36 : 26,
        }}
        transition={{ type: 'spring', stiffness: 420, damping: 28 }}
        className="rounded-full border border-white/80 bg-white/10 backdrop-blur-[2px] flex items-center justify-center text-white font-mono text-[10px] font-bold uppercase tracking-wider px-2"
      >
        {hoveredLabel ? (
          <span>{hoveredLabel}</span>
        ) : (
          <span className="w-1.5 h-1.5 rounded-full bg-white" />
        )}
      </motion.div>
    </motion.div>
  );
}
