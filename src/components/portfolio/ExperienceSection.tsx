import { motion } from "framer-motion";
import Section from "@/components/portfolio/Section";
import { experience } from "@/data/portfolio";

export default function ExperienceSection() {
  return (
    <Section
      id="experience"
      eyebrow="Trajectory"
      title="Experience"
      description="A timeline of roles focused on shipping polished UI and performance-first product work."
      className="py-16 sm:py-20"
    >
      <div className="relative">
        <div className="absolute left-4 top-0 h-full w-px bg-border/60 sm:left-6" aria-hidden="true" />

        <ul className="space-y-6">
          {experience.map((item, idx) => (
            <motion.li
              key={`${item.company}-${item.role}`}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.55, delay: idx * 0.05, ease: [0.22, 1, 0.36, 1] }}
              className="relative pl-12 sm:pl-16"
            >
              <span
                className="absolute left-2 top-6 h-5 w-5 rounded-full border border-border/60 bg-card/70 shadow-soft backdrop-blur-xl sm:left-4"
                aria-hidden="true"
              >
                <span className="absolute inset-1 rounded-full bg-primary/80" aria-hidden="true" />
              </span>

              <article className="rounded-2xl border border-border/60 bg-card/50 p-5 shadow-glass backdrop-blur-xl">
                <header className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
                  <div>
                    <h3 className="text-base font-semibold tracking-tight">{item.role}</h3>
                    <p className="text-sm text-muted-foreground">{item.company}</p>
                  </div>
                  <p className="text-xs font-medium uppercase tracking-[0.16em] text-muted-foreground">{item.duration}</p>
                </header>
                <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                  {item.achievements.map((a) => (
                    <li key={a} className="flex gap-2">
                      <span className="mt-2 h-1.5 w-1.5 flex-none rounded-full bg-primary/70" aria-hidden="true" />
                      <span>{a}</span>
                    </li>
                  ))}
                </ul>
              </article>
            </motion.li>
          ))}
        </ul>
      </div>
    </Section>
  );
}
