// src/utils/animations.js
export const staggerContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.1 }
  }
};

export const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  show: { 
    opacity: 1, y: 0, 
    transition: { type: "spring", bounce: 0.3, duration: 1 } 
  }
};

export const scaleIn = {
  hidden: { opacity: 0, scale: 0.9 },
  show: { 
    opacity: 1, scale: 1, 
    transition: { type: "spring", bounce: 0.4, duration: 0.8 } 
  }
};

export const buttonHover = {
  scale: 1.05,
  transition: { type: "spring", stiffness: 400, damping: 10 }
};

export const buttonTap = { scale: 0.95 };