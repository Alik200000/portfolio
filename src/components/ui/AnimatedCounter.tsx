import React, { useEffect, useState } from 'react';
import { motion, useSpring, useTransform } from 'framer-motion';

interface AnimatedCounterProps {
  value: number;
  prefix?: string;
  className?: string;
  decimals?: number;
}

export const AnimatedCounter: React.FC<AnimatedCounterProps> = ({
  value,
  prefix = '$',
  className = '',
  decimals = 2,
}) => {
  // Use Framer Motion spring for silky smooth rolling number physics
  const spring = useSpring(value, {
    stiffness: 120,
    damping: 20,
    mass: 0.8,
  });

  const [displayValue, setDisplayValue] = useState<string>(() =>
    value.toLocaleString('en-US', {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    })
  );

  useEffect(() => {
    spring.set(value);
  }, [value, spring]);

  useEffect(() => {
    return spring.on('change', (latest) => {
      setDisplayValue(
        latest.toLocaleString('en-US', {
          minimumFractionDigits: decimals,
          maximumFractionDigits: decimals,
        })
      );
    });
  }, [spring, decimals]);

  return (
    <span className={`tabular-nums inline-flex items-baseline ${className}`}>
      {prefix && <span className="text-[0.7em] font-bold opacity-75 mr-1 select-none">{prefix}</span>}
      <motion.span>{displayValue}</motion.span>
    </span>
  );
};
