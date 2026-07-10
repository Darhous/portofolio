import { useEffect } from "react";

export function useCommandPaletteShortcut(toggle: () => void) {
  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      const isModPressed = event.metaKey || event.ctrlKey;
      if (isModPressed && event.key.toLowerCase() === "k") {
        event.preventDefault();
        toggle();
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [toggle]);
}
