'use client';

import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export function CustomCursor() {
  const [hover, setHover] = useState(false);
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);

  const ringX = useSpring(x, { stiffness: 200, damping: 20, mass: 0.5 });
  const ringY = useSpring(y, { stiffness: 200, damping: 20, mass: 0.5 });

  useEffect(() => {
    const move = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };

    const onOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest('a, button, [data-cursor-hover]')) {
        setHover(true);
      } else {
        setHover(false);
      }
    };

    window.addEventListener('mousemove', move);
    window.addEventListener('mouseover', onOver);
    return () => {
      window.removeEventListener('mousemove', move);
      window.removeEventListener('mouseover', onOver);
    };
  }, [x, y]);

  return (
    <>
      <motion.div
        className="cursor-dot"
        style={{ x, y }}
      />
      <motion.div
        className="cursor-ring"
        style={{
          x: ringX,
          y: ringY,
          width: hover ? 56 : 36,
          height: hover ? 56 : 36,
          borderColor: hover ? 'rgba(0,255,163,0.9)' : 'rgba(0,229,255,0.5)',
        }}
      />
    </>
  );
}
