import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import type { ProjectItem } from "@/data/portfolio";
import { ExternalLink, Github, X } from "lucide-react";
import { useEffect } from "react";

type Props = {
  open: boolean;
  project: ProjectItem | null;
  onClose: () => void;
};

export default function ProjectModal({ open, project, onClose }: Props) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && project ? (
        <motion.div
          className="fixed inset-0 z-[60] flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          aria-label={`${project.title} details`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <button
            onClick={onClose}
            className="absolute inset-0 bg-background/70 backdrop-blur"
            aria-label="Close modal"
          />

          <motion.div
            initial={{ opacity: 0, y: 14, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.98 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-full max-w-2xl overflow-hidden rounded-2xl border border-border/60 bg-card/60 shadow-glass backdrop-blur-xl"
          >
            <div className="flex items-start justify-between gap-4 border-b border-border/60 p-5">
              <div>
                <h3 className="text-lg font-semibold tracking-tight">{project.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{project.description}</p>
              </div>
              <Button variant="glass" size="icon" onClick={onClose} aria-label="Close">
                <X />
              </Button>
            </div>

            <div className="p-5">
              <div className="flex flex-wrap gap-2">
                {project.tech.map((t) => (
                  <span
                    key={t}
                    className="rounded-full border border-border/60 bg-accent px-3 py-1 text-xs text-accent-foreground"
                  >
                    {t}
                  </span>
                ))}
              </div>

              {project.highlights?.length ? (
                <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                  {project.highlights.map((h) => (
                    <li key={h} className="flex gap-2">
                      <span className="mt-2 h-1.5 w-1.5 flex-none rounded-full bg-primary/70" aria-hidden="true" />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              ) : null}

              <div className="mt-6 flex flex-wrap gap-3">
                {project.href ? (
                  <Button asChild variant="hero">
                    <a href={project.href} target="_blank" rel="noreferrer">
                      Live Demo <ExternalLink className="ml-1" />
                    </a>
                  </Button>
                ) : null}
                {project.github ? (
                  <Button asChild variant="glass">
                    <a href={project.github} target="_blank" rel="noreferrer">
                      GitHub <Github className="ml-1" />
                    </a>
                  </Button>
                ) : null}
              </div>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
