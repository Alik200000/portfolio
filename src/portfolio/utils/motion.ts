export const springPresets = {
  snappy: { type: "spring", stiffness: 450, damping: 30 },
  fluid: { type: "spring", stiffness: 260, damping: 25 },
  gentle: { type: "spring", stiffness: 120, damping: 18 }
};

export const staggerContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

export const fadeInUp = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 280, damping: 24 },
  },
};
