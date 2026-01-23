import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { motion, useReducedMotion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Moon, Sun } from "lucide-react";

export default function ThemeToggle() {
  const reduced = useReducedMotion();
  const { theme, setTheme, systemTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const resolved = theme === "system" ? systemTheme : theme;
  const isDark = resolved === "dark";

  // Avoid hydration mismatch: render a stable button label until mounted.
  const label = mounted ? (isDark ? "Switch to light" : "Switch to dark") : "Toggle theme";

  return (
    <Button
      variant="glass"
      size="icon"
      type="button"
      aria-label={label}
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="relative"
    >
      {reduced ? (
        isDark ? <Sun /> : <Moon />
      ) : (
        <motion.span
          key={mounted ? String(isDark) : "mounted"}
          initial={{ opacity: 0, rotate: -12, scale: 0.92 }}
          animate={{ opacity: 1, rotate: 0, scale: 1 }}
          exit={{ opacity: 0, rotate: 12, scale: 0.92 }}
          transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
          className="inline-flex"
        >
          {isDark ? <Sun /> : <Moon />}
        </motion.span>
      )}
    </Button>
  );
}
