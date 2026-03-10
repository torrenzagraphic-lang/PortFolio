import { motion } from "framer-motion";
import Section from "@/components/portfolio/Section";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";

const GOOGLE_FORM_URL =
  "https://docs.google.com/forms/d/e/1FAIpQLSfZZaLS7l1QqntGJ9mcjUsmHPujVV12zninQOzWNWQU4GAfXg/viewform?usp=publish-editor";

export default function ContactSection() {
  return (
    <Section
      id="contact"
      eyebrow="Inquiry"
      title="Let’s build something great"
      description="Prefer Google Forms? Open the form and send your message there."
      className="py-16 sm:py-20"
    >
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        className="mx-auto max-w-2xl"
      >
        <div className="rounded-2xl border border-border/60 bg-card/50 p-6 shadow-glass backdrop-blur-xl sm:p-8">
          <p className="text-sm text-muted-foreground">
            Click below to open the Google Form in a new tab.
          </p>

          <div className="mt-5">
            <Button asChild variant="hero" size="lg">
              <a href={GOOGLE_FORM_URL} target="_blank" rel="noreferrer" aria-label="Open Google Form">
                Open Google Form
                <ExternalLink className="ml-2 h-4 w-4" aria-hidden="true" />
              </a>
            </Button>
          </div>
        </div>
      </motion.div>
    </Section>
  );
}
