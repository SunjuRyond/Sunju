
import React, { useState, useEffect, useRef } from 'react';
import { useInView, motion, animate } from 'framer-motion';

interface Props {
  value: number;
  duration?: number;
  suffix?: string;
  prefix?: string;
  isLakh?: boolean;
}

export const AnimatedCounter: React.FC<Props> = ({ 
  value, 
  duration = 2, 
  suffix = '', 
  prefix = '',
  isLakh = false 
}) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      const controls = animate(0, value, {
        duration: duration,
        onUpdate: (latest) => setCount(Math.floor(latest)),
      });
      return () => controls.stop();
    }
  }, [isInView, value, duration]);

  return (
    <span ref={ref} className="font-mono tabular-nums">
      {prefix}{count.toLocaleString('en-IN')}{suffix}
    </span>
  );
};
