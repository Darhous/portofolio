import { useRef } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { useReducedMotion } from "../../hooks/useReducedMotion";

type AnimatedTextProps = {
  text: string;
  className?: string;
};

type CharProps = {
  char: string;
  range: [number, number];
  progress: MotionValue<number>;
};

function Char({ char, range, progress }: CharProps) {
  const opacity = useTransform(progress, range, [0.2, 1]);
  return <motion.span style={{ opacity }}>{char === " " ? " " : char}</motion.span>;
}

/**
 * Scroll-linked character-by-character reveal. The full sentence is exposed
 * to assistive tech via aria-label on the container; the animated
 * characters underneath are aria-hidden so screen readers never see
 * duplicated or fragmented text.
 */
export function AnimatedText({ text, className }: AnimatedTextProps) {
  const containerRef = useRef<HTMLParagraphElement>(null);
  const reducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.8", "end 0.2"],
  });

  if (reducedMotion) {
    return <p className={className}>{text}</p>;
  }

  const chars = [...text];

  return (
    <p className={className} ref={containerRef} aria-label={text}>
      <span aria-hidden="true">
        {chars.map((char, index) => {
          const start = index / chars.length;
          const end = start + 1 / chars.length;
          return <Char key={`${char}-${index}`} char={char} range={[start, end]} progress={scrollYProgress} />;
        })}
      </span>
    </p>
  );
}
