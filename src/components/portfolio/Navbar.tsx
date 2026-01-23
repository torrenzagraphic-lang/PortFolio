import { motion, useScroll, useTransform } from "framer-motion";
import { profile } from "@/data/portfolio";
import { Button } from "@/components/ui/button";
import ThemeToggle from "@/components/portfolio/ThemeToggle";

const links = [
  { label: "Skills", href: "#skills" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 160], [0, -6]);
  const opacity = useTransform(scrollY, [0, 160], [1, 0.92]);

  return (
    <motion.header
      style={{ y, opacity }}
      className="fixed left-0 right-0 top-0 z-50 border-b border-border/50 bg-background/60 backdrop-blur-xl"
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <a href="#top" className="group inline-flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-primary shadow-soft" aria-hidden="true" />
          <span className="text-sm font-semibold tracking-tight">{profile.name}</span>
          <span className="text-xs text-muted-foreground sm:inline">· {profile.availability}</span>
        </a>

        <nav className="hidden items-center gap-1 md:flex" aria-label="Primary">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="rounded-xl px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Button asChild variant="glass" size="sm" className="hidden sm:inline-flex">
            <a href="#projects">View Projects</a>
          </Button>
          <Button asChild variant="hero" size="sm">
            <a href="#contact">Let’s talk</a>
          </Button>
        </div>
      </div>
    </motion.header>
  );
}
