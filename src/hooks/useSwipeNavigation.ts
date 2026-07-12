import { useEffect, useRef } from "react";

/**
 * Fires onSwipeLeft/onSwipeRight for decisive horizontal touch swipes.
 * Ignores swipes that are mostly vertical (page scroll) or too short.
 */
export function useSwipeNavigation(onSwipeLeft: () => void, onSwipeRight: () => void) {
  const startX = useRef(0);
  const startY = useRef(0);

  useEffect(() => {
    function handleTouchStart(event: TouchEvent) {
      startX.current = event.touches[0].clientX;
      startY.current = event.touches[0].clientY;
    }

    function handleTouchEnd(event: TouchEvent) {
      const touch = event.changedTouches[0];
      const dx = touch.clientX - startX.current;
      const dy = touch.clientY - startY.current;
      if (Math.abs(dx) < 80 || Math.abs(dx) < Math.abs(dy) * 1.5) return;
      if (dx < 0) onSwipeLeft();
      else onSwipeRight();
    }

    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchend", handleTouchEnd, { passive: true });
    return () => {
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, [onSwipeLeft, onSwipeRight]);
}
