import { motion } from "framer-motion";
import Section from "@/components/portfolio/Section";
import { skills, type Skill } from "@/data/portfolio";
import { cn } from "@/lib/utils";
import { SiFirebase, SiGit, SiJavascript, SiMongodb, SiNodedotjs, SiReact, SiTailwindcss, SiThreedotjs, SiTypescript } from "react-icons/si";
function iconFor(skill: Skill["icon"]) {
  const cls = "h-5 w-5";
  switch (skill) {
    case "react":
      return <SiReact className={cls} />;
    case "reactnative":
      return <SiReact className={cn(cls, "opacity-80")} />;
    case "js":
      return <SiJavascript className={cls} />;
    case "ts":
      return <SiTypescript className={cls} />;
    case "node":
      return <SiNodedotjs className={cls} />;
    case "mongo":
      return <SiMongodb className={cls} />;
    case "firebase":
      return <SiFirebase className={cls} />;
    case "tailwind":
      return <SiTailwindcss className={cls} />;
    case "git":
      return <SiGit className={cls} />;
    case "three":
      return <SiThreedotjs className={cls} />;
  }
}
export default function SkillsSection() {
  return <Section id="skills" eyebrow="Capabilities" title="Skills that ship" description="A modern stack with a bias toward performance, accessible UI, and delightful motion." className="py-16 sm:py-20">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {skills.map((s, idx) => <motion.div key={s.name} initial={{
        opacity: 0,
        y: 14
      }} whileInView={{
        opacity: 1,
        y: 0
      }} viewport={{
        once: true,
        margin: "-80px"
      }} transition={{
        duration: 0.5,
        delay: idx * 0.03,
        ease: [0.22, 1, 0.36, 1]
      }} className="group relative overflow-hidden rounded-2xl border border-border/60 bg-card/50 p-4 shadow-soft backdrop-blur-xl">
            <div className="pointer-events-none absolute -inset-24 opacity-0 blur-2xl transition-opacity duration-300 group-hover:opacity-100" style={{
          background: "radial-gradient(closest-side, hsl(var(--primary) / 0.24), transparent 60%)"
        }} aria-hidden="true" />

            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-border/60 bg-accent text-accent-foreground shadow-soft">
                {iconFor(s.icon)}
              </div>
              <div>
                <p className="text-sm font-medium tracking-tight">{s.name}</p>
                <p className="text-xs text-muted-foreground">​intermediate </p>
              </div>
            </div>

            <div className="mt-4 h-px w-full bg-border/60" />
            <p className="mt-3 text-xs text-muted-foreground">
              Clean architecture · thoughtful state · micro-interactions
            </p>
          </motion.div>)}
      </div>
    </Section>;
}