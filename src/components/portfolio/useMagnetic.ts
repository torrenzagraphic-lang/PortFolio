import { useCallback, useMemo, useRef } from "react";

/**
 * Signature interaction: subtle “magnetic” hover that respects reduced motion.
 * GPU-friendly (transform only) and opt-in per element.
 */
export function useMagnetic(intensity = 10, disabled = false) {
  const ref = useRef<HTMLDivElement | null>(null);

  const onMove = useCallback(
    (e: React.PointerEvent) => {
      if (disabled) return;
      const el = ref.current;
      if (!el) return;

      const rect = el.getBoundingClientRect();
      const x = e.clientX - (rect.left + rect.width / 2);
      const y = e.clientY - (rect.top + rect.height / 2);
      const tx = (x / rect.width) * intensity;
      const ty = (y / rect.height) * intensity;
      el.style.transform = `translate3d(${tx}px, ${ty}px, 0)`;
    },
    [disabled, intensity],
  );

  const onLeave = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    el.style.transform = "translate3d(0px, 0px, 0)";
  }, []);

  return useMemo(
    () => ({
      ref,
      onPointerMove: onMove,
      onPointerLeave: onLeave,
    }),
    [onLeave, onMove],
  );
}
