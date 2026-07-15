import { useRef } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { useInView } from "../../hooks/useInView";
import { useNarrowViewport, useReducedMotion } from "../../hooks/useReducedMotion";

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
  const opacity = useTransform(progress, range, [0.2, 1]);
  return <motion.span style={{ opacity, display: "inline-block" }}>{word}</motion.span>;
}

function splitWords(text: string): string[] {
  const raw = text.split(" ");
  return raw.map((word, index) => (index === raw.length - 1 ? word : `${word} `));
}

/**
 * Word-by-word reveal, split per word rather than per character: splitting
 * per character (the original approach) let the browser insert line breaks
 * in the middle of Arabic words wherever a character span happened to
 * fall, since each character was its own independent inline box. Keeping
 * each word's letters in one text node means a line can only break between
 * words, same as normal text.
 *
 * The full sentence is exposed to assistive tech via aria-label on the
 * container; the animated words underneath are aria-hidden so screen
 * readers never see duplicated or fragmented text.
 */
export function AnimatedText({ text, className }: AnimatedTextProps) {
  const reducedMotion = useReducedMotion();
  const narrow = useNarrowViewport();

  if (reducedMotion) {
    return <p className={className}>{text}</p>;
  }

  return narrow ? <AnimatedTextTriggered text={text} className={className} /> : <AnimatedTextScrollLinked text={text} className={className} />;
}

/**
 * Desktop: opacity is continuously derived from scroll position across the
 * paragraph's own scroll-through range. Fine on desktop, where the viewport
 * height is stable.
 */
function AnimatedTextScrollLinked({ text, className }: AnimatedTextProps) {
  const containerRef = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.8", "end 0.2"],
  });

  const words = splitWords(text);

  return (
    <p className={className} ref={containerRef} aria-label={text}>
      <span aria-hidden="true">
        {words.map((word, index) => {
          const start = index / words.length;
          const end = start + 1 / words.length;
          return <Word key={`${word}-${index}`} word={word} range={[start, end]} progress={scrollYProgress} />;
        })}
      </span>
    </p>
  );
}

/**
 * Mobile: a continuously scroll-linked opacity value is unreliable on real
 * phones — iOS Safari's dynamic address-bar resize keeps changing the
 * viewport height mid-scroll, which can desync the scroll-progress
 * calculation enough that trailing words never reach full opacity and
 * stay visibly stuck at a dim, half-revealed state. Triggering a plain CSS
 * transition once via IntersectionObserver (the same proven, one-shot
 * mechanism ProjectCard/StatChip/the sticky-stack cards already use)
 * sidesteps that risk entirely: once triggered it always finishes,
 * regardless of what the viewport does afterward.
 */
function AnimatedTextTriggered({ text, className }: AnimatedTextProps) {
  const { ref, inView } = useInView<HTMLParagraphElement>();
  const words = splitWords(text);

  return (
    <p className={className} ref={ref} aria-label={text}>
      <span aria-hidden="true">
        {words.map((word, index) => (
          <span
            key={`${word}-${index}`}
            className={`animated-word${inView ? " is-visible" : ""}`}
            style={{ transitionDelay: `${Math.min(index, 24) * 18}ms` }}
          >
            {word}
          </span>
        ))}
      </span>
    </p>
  );
}
