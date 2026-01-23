import { motion, AnimatePresence } from "framer-motion";
import Section from "@/components/portfolio/Section";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMemo, useState } from "react";
//import { supabase } from "@/integrations/supabase/client";

const schema = z.object({
  name: z.string().trim().min(2, "Please enter your name").max(80),
  email: z.string().trim().email("Enter a valid email").max(255),
  message: z.string().trim().min(10, "Tell me a bit more").max(2000),
});

type FormValues = z.infer<typeof schema>;

export default function ContactSection() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  const defaultValues = useMemo<FormValues>(() => ({ name: "", email: "", message: "" }), []);
  const form = useForm<FormValues>({ resolver: zodResolver(schema), defaultValues, mode: "onTouched" });

  const onSubmit = async (values: FormValues) => {
    setStatus("sending");

    try {
      const { error } = await supabase.functions.invoke("send-contact-email", {
        body: values,
      });
      if (error) throw error;
      setStatus("sent");
      form.reset(defaultValues);
    } catch {
      setStatus("error");
    }
  };

  return (
    <Section
      id="contact"
      eyebrow="Inquiry"
      title="Let’s build something great"
      description="Send a message and I’ll reply quickly."
      className="py-16 sm:py-20"
    >
      <div className="grid gap-6 lg:grid-cols-5">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="lg:col-span-2"
        >
          <div className="rounded-2xl border border-border/60 bg-card/50 p-6 shadow-soft backdrop-blur-xl">
            <p className="text-sm font-medium">What I can help with</p>
            <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
              <li className="flex gap-2">
                <span className="mt-2 h-1.5 w-1.5 flex-none rounded-full bg-primary/70" aria-hidden="true" />
                <span>React / React Native builds with premium motion polish</span>
              </li>
              <li className="flex gap-2">
                <span className="mt-2 h-1.5 w-1.5 flex-none rounded-full bg-primary/70" aria-hidden="true" />
                <span>Design systems + component libraries</span>
              </li>
              <li className="flex gap-2">
                <span className="mt-2 h-1.5 w-1.5 flex-none rounded-full bg-primary/70" aria-hidden="true" />
                <span>Performance, accessibility, and WebGL enhancement</span>
              </li>
            </ul>
          </div>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.55, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
          onSubmit={form.handleSubmit(onSubmit)}
          className="relative overflow-hidden rounded-2xl border border-border/60 bg-card/50 p-6 shadow-glass backdrop-blur-xl lg:col-span-3"
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Name" error={form.formState.errors.name?.message}>
              <Input
                {...form.register("name")}
                autoComplete="name"
                placeholder="Your name"
                aria-invalid={!!form.formState.errors.name}
              />
            </Field>
            <Field label="Email" error={form.formState.errors.email?.message}>
              <Input
                {...form.register("email")}
                autoComplete="email"
                placeholder="you@company.com"
                aria-invalid={!!form.formState.errors.email}
              />
            </Field>
          </div>

          <div className="mt-4">
            <Field label="Message" error={form.formState.errors.message?.message}>
              <Textarea
                {...form.register("message")}
                rows={6}
                placeholder="Tell me about the project..."
                aria-invalid={!!form.formState.errors.message}
              />
            </Field>
          </div>

          <div className="mt-5 flex flex-wrap items-center gap-3">
            <Button type="submit" variant="hero" disabled={status === "sending"}>
              {status === "sending" ? "Sending…" : "Send message"}
            </Button>
            <Button
              type="button"
              variant="glass"
              onClick={() => {
                form.reset(defaultValues);
                setStatus("idle");
              }}
            >
              Reset
            </Button>

            <div className="ml-auto">
              <AnimatePresence mode="popLayout">
                {status === "sent" ? (
                  <motion.p
                    key="sent"
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    className="text-sm text-muted-foreground"
                  >
                    Sent — talk soon.
                  </motion.p>
                ) : null}
                {status === "error" ? (
                  <motion.p
                    key="error"
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    className="text-sm text-destructive"
                  >
                    Something went wrong. Check your Formspree endpoint.
                  </motion.p>
                ) : null}
              </AnimatePresence>
            </div>
          </div>
        </motion.form>
      </div>
    </Section>
  );
}

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-xs font-medium uppercase tracking-[0.16em] text-muted-foreground">{label}</span>
      <div className="[&_input]:rounded-xl [&_textarea]:rounded-xl">{children}</div>
      <AnimatePresence>
        {error ? (
          <motion.p
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            className="mt-2 text-xs text-destructive"
          >
            {error}
          </motion.p>
        ) : null}
      </AnimatePresence>
    </label>
  );
}
