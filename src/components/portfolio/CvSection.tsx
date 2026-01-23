import { Download } from "lucide-react";
import { motion } from "framer-motion";
import Section from "@/components/portfolio/Section";
import MagneticButton from "@/components/portfolio/MagneticButton";

export default function CvSection() {
  return (
    <Section
      id="cv"
      eyebrow="Resume"
      title="Download CV"
      description=""
      className="py-16 sm:py-20"
    >
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        className="relative overflow-hidden rounded-2xl border border-border/60 bg-card/50 p-6 shadow-glass backdrop-blur-xl"
      >
        <div className="pointer-events-none absolute inset-0" aria-hidden="true">
          <div
            className="absolute -left-24 -top-24 h-64 w-64 rounded-full blur-3xl"
            style={{ background: "radial-gradient(closest-side, hsl(var(--primary) / 0.20), transparent 70%)" }}
          />
        </div>

        <div className="relative flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
          <div>
            <p className="text-sm font-medium">One-click download</p>
            <p className="mt-1 max-w-xl text-sm text-muted-foreground">
              Keep it simple for recruiters: a clean PDF, consistent naming, and up-to-date links.
            </p>
          </div>

          <MagneticButton asChild variant="hero" size="lg" className="gap-2">
            <a href="/resume.pdf" download>
              <Download /> Download CV
            </a>
          </MagneticButton>
        </div>
      </motion.div>
    </Section>
  );
}
