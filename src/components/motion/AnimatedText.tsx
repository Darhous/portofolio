import { useRef } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { useReducedMotion } from "../../hooks/useReducedMotion";

type AnimatedTextProps = {
  text: string;
  className?: string;
};

type WordProps = {
  word: string;
  range: [number, number];
  progress: MotionValue<number>;
};

function Word({ word, range, progress }: WordProps) {
  const opacity = useTransform(progress, range, [0.25, 1]);
  return <motion.span style={{ opacity }}>{word}</motion.span>;
}

/**
 * Scroll-linked word-by-word reveal (a readability/performance-friendly
 * adaptation of a character-by-character effect). The full sentence is
 * exposed to assistive tech via aria-label on the container; the animated
 * words underneath are aria-hidden so screen readers never see duplicated
 * or fragmented text.
 */
export function AnimatedText({ text, className }: AnimatedTextProps) {
  const containerRef = useRef<HTMLParagraphElement>(null);
  const reducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.85", "end 0.4"],
  });

  if (reducedMotion) {
    return <p className={className}>{text}</p>;
  }

  const words = text.split(" ");

  return (
    <p className={className} ref={containerRef} aria-label={text}>
      <span aria-hidden="true">
        {words.map((word, index) => {
          const start = index / words.length;
          const end = start + 1 / words.length;
          return (
            <span key={`${word}-${index}`} style={{ display: "inline-block" }}>
              <Word word={word} range={[start, end]} progress={scrollYProgress} />
              {index < words.length - 1 ? " " : ""}
            </span>
          );
        })}
      </span>
    </p>
  );
}
