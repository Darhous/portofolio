import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { useReducedMotion } from "../../hooks/useReducedMotion";

const PREMIUM_EASE = [0.25, 0.1, 0.25, 1] as const;

const TAGS = {
  div: motion.div,
  section: motion.section,
  article: motion.article,
  span: motion.span,
  p: motion.p,
  li: motion.li,
  h3: motion.h3,
} as const;

type FadeInTag = keyof typeof TAGS;

type FadeInProps = {
  children: ReactNode;
  as?: FadeInTag;
  className?: string;
  delay?: number;
  duration?: number;
  x?: number;
  y?: number;
};

export function FadeIn({ children, as = "div", className, delay = 0, duration = 0.7, x = 0, y = 30 }: FadeInProps) {
  const reducedMotion = useReducedMotion();

  if (reducedMotion) {
    const StaticTag = as;
    return <StaticTag className={className}>{children}</StaticTag>;
  }

  const MotionTag = TAGS[as];

  return (
    <MotionTag
      className={className}
      initial={{ opacity: 0, x, y }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -50px 0px", amount: 0 }}
      transition={{ duration, delay, ease: PREMIUM_EASE }}
    >
      {children}
    </MotionTag>
  );
}
