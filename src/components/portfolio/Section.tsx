import * as React from "react";
import { cn } from "@/lib/utils";
type SectionProps = React.PropsWithChildren<{
  id: string;
  eyebrow?: string;
  title: string;
  description?: string;
  className?: string;
}>;
export default function Section({
  id,
  eyebrow,
  title,
  description,
  className,
  children
}: SectionProps) {
  return <section id={id} className={cn("relative scroll-mt-24", className)}>
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        <header className="mb-8 sm:mb-10">
          {eyebrow ? <p className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">{eyebrow}</p> : null}
          <h2 className="mt-3 text-2xl font-semibold tracking-tight sm:text-3xl">{title}</h2>
          {description ? <p className="mt-3 max-w-2xl text-muted-foreground">{description}</p> : null}
        </header>
        {children}
      </div>
    </section>;
}