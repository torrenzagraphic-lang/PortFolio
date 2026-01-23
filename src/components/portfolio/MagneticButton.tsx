import * as React from "react";
import { Button, type ButtonProps } from "@/components/ui/button";
import { useMagnetic } from "@/components/portfolio/useMagnetic";
import { useReducedMotion } from "framer-motion";

type MagneticButtonProps = ButtonProps & {
  intensity?: number;
};

export default function MagneticButton({ intensity = 12, className, ...props }: MagneticButtonProps) {
  const reduced = useReducedMotion();
  const mag = useMagnetic(intensity, !!reduced);

  return (
    <div
      ref={mag.ref}
      onPointerMove={mag.onPointerMove}
      onPointerLeave={mag.onPointerLeave}
      className="inline-block will-change-transform transition-transform duration-200"
    >
      <Button className={className} {...props} />
    </div>
  );
}
