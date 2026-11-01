import React from 'react';
import { motion } from 'framer-motion';
import { Delete } from 'lucide-react';

export interface NumpadProps {
  onDigit: (digit: string) => void;
  onBackspace: () => void;
  onClear?: () => void;
  className?: string;
}

export const Numpad: React.FC<NumpadProps> = ({
  onDigit,
  onBackspace,
  onClear,
  className = '',
}) => {
  const keys = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '.', '0', 'delete'];

  return (
    <div className={`grid grid-cols-3 gap-2.5 max-w-[320px] mx-auto w-full select-none ${className}`}>
      {keys.map((key) => {
        if (key === 'delete') {
          return (
            <motion.button
              key={key}
              type="button"
              whileTap={{ scale: 0.88 }}
              onClick={onBackspace}
              onContextMenu={(e) => {
                e.preventDefault();
                if (onClear) onClear();
              }}
              className="h-14 rounded-2xl flex items-center justify-center text-slate-500 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/80 active:bg-slate-200 dark:active:bg-slate-700 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
              aria-label="Delete last digit (Long press or right-click to clear)"
            >
              <Delete className="w-6 h-6 stroke-[2.2]" />
            </motion.button>
          );
        }

        return (
          <motion.button
            key={key}
            type="button"
            whileTap={{ scale: 0.92 }}
            onClick={() => onDigit(key)}
            className="h-14 rounded-2xl text-2xl font-bold text-slate-800 dark:text-slate-100 bg-slate-50 dark:bg-slate-800/60 hover:bg-slate-100 dark:hover:bg-slate-800 active:bg-slate-200 dark:active:bg-slate-700/80 border border-slate-200/50 dark:border-white/[0.05] shadow-xs flex items-center justify-center transition-all tabular-nums focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
          >
            {key}
          </motion.button>
        );
      })}
    </div>
  );
};
