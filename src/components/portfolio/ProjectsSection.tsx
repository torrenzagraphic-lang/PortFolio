import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import Section from "@/components/portfolio/Section";
import { projects, type ProjectItem } from "@/data/portfolio";
import ProjectModal from "@/components/portfolio/ProjectModal";
import { Button } from "@/components/ui/button";
import { ExternalLink, Github } from "lucide-react";

function ProjectCard({ project, onOpen }: { project: ProjectItem; onOpen: () => void }) {
  return (
    <motion.article
      whileHover={{ y: -6 }}
      transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
      className="group relative overflow-hidden rounded-2xl border border-border/60 bg-card/50 p-5 shadow-soft backdrop-blur-xl"
    >
      <div
        className="pointer-events-none absolute -inset-24 opacity-0 blur-2xl transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: "radial-gradient(closest-side, hsl(var(--primary) / 0.22), transparent 60%)",
        }}
        aria-hidden="true"
      />

      <header>
        <h3 className="text-base font-semibold tracking-tight">{project.title}</h3>
        <p className="mt-2 text-sm text-muted-foreground">{project.description}</p>
      </header>

      <div className="mt-4 flex flex-wrap gap-2">
        {project.tech.map((t) => (
          <span key={t} className="rounded-full border border-border/60 bg-accent px-2.5 py-1 text-[11px] text-accent-foreground">
            {t}
          </span>
        ))}
      </div>

      <div className="mt-5 flex flex-wrap gap-2">
        <Button variant="hero" size="sm" onClick={onOpen}>
          Preview
        </Button>
        {project.href ? (
          <Button asChild variant="glass" size="sm">
            <a href={project.href} target="_blank" rel="noreferrer">
              Live <ExternalLink className="ml-1" />
            </a>
          </Button>
        ) : null}
        {project.github ? (
          <Button asChild variant="glass" size="sm">
            <a href={project.github} target="_blank" rel="noreferrer">
              Code <Github className="ml-1" />
            </a>
          </Button>
        ) : null}
      </div>
    </motion.article>
  );
}

export default function ProjectsSection() {
  const [active, setActive] = useState<ProjectItem | null>(null);
  const list = useMemo(() => projects, []);

  return (
    <>
      <Section
        id="projects"
        eyebrow="Selected work"
        title="Projects"
        description="A few builds that showcase premium UI, thoughtful architecture, and performance-focused delivery."
        className="py-16 sm:py-20"
      >
        <div className="grid gap-4 lg:grid-cols-3">
          {list.map((p, idx) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.55, delay: idx * 0.06, ease: [0.22, 1, 0.36, 1] }}
            >
              <ProjectCard project={p} onOpen={() => setActive(p)} />
            </motion.div>
          ))}
        </div>
      </Section>

      <ProjectModal open={!!active} project={active} onClose={() => setActive(null)} />
    </>
  );
}
