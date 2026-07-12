import { useEffect, useRef } from "react";

/**
 * Imperatively sets the view-transition-name CSS property (avoids TS
 * CSSProperties typing gaps for this newer property, and keeps it out of
 * inline style objects that would need to change every render).
 */
export function useViewTransitionName<T extends HTMLElement>(name: string) {
  const ref = useRef<T>(null);
  useEffect(() => {
    ref.current?.style.setProperty("view-transition-name", name);
  }, [name]);
  return ref;
}
