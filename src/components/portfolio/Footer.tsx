import { profile } from "@/data/portfolio";
import { Github, Linkedin, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-border/60 bg-background/70 backdrop-blur">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-10 sm:px-6 lg:px-8">
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <p className="text-sm font-semibold tracking-tight">{profile.name}</p>
            <p className="mt-1 text-sm text-muted-foreground">{profile.headline}</p>
          </div>

          <div className="flex items-center gap-2">
            <a
              href={profile.socials.github}
              target="_blank"
              rel="noreferrer"
              className="rounded-xl border border-border/60 bg-card/40 p-2 text-muted-foreground shadow-soft transition-colors hover:bg-accent hover:text-accent-foreground"
              aria-label="GitHub"
            >
              <Github className="h-4 w-4" />
            </a>
            <a
              href={profile.socials.linkedin}
              target="https://in.linkedin.com/in/darshan-jain-developer"
              rel="noreferrer"
              className="rounded-xl border border-border/60 bg-card/40 p-2 text-muted-foreground shadow-soft transition-colors hover:bg-accent hover:text-accent-foreground"
              aria-label="LinkedIn"
            >
              <Linkedin className="h-4 w-4" />
            </a>
            <a
              href={profile.socials.email}
              className="rounded-xl border border-border/60 bg-card/40 p-2 text-muted-foreground shadow-soft transition-colors hover:bg-accent hover:text-accent-foreground"
              aria-label="Email"
            >
              <Mail className="h-4 w-4" />
            </a>
          </div>
        </div>

        <div className="flex flex-col gap-2 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {profile.name}. All rights reserved.
          </p>
          <p>Built with React + Tailwind + Framer Motion + R3F.</p>
        </div>
      </div>
    </footer>
  );
}
