import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { Star } from "lucide-react";

import Section from "@/components/portfolio/Section";
//import { supabase } from "@/integrations/supabase/client";
//import type { Tables } from "@/integrations/supabase/types";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

type Testimonial = Tables<"testimonials">;

function initials(name: string) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((p) => p[0]?.toUpperCase())
    .join("");
}

function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-1" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, idx) => {
        const filled = idx < rating;
        return (
          <Star
            key={idx}
            className={
              filled
                ? "h-4 w-4 text-primary"
                : "h-4 w-4 text-muted-foreground/40"
            }
          />
        );
      })}
    </div>
  );
}

async function fetchTestimonials(): Promise<Testimonial[]> {
  const { data, error } = await supabase
    .from("testimonials")
    .select("*")
    .order("featured", { ascending: false })
    .order("sort_order", { ascending: true })
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data ?? [];
}

export default function TestimonialsSection() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["testimonials"],
    queryFn: fetchTestimonials,
  });

  const items = useMemo(() => data ?? [], [data]);

  return (
    <Section
      id="testimonials"
      eyebrow="Kind words"
      title="Testimonials"
      description="Public reviews pulled live from the backend."
      className="py-16 sm:py-20"
    >
      <div className="relative">
        <div
          className="pointer-events-none absolute -inset-24 opacity-80 blur-3xl"
          style={{
            background:
              "radial-gradient(closest-side, hsl(var(--primary) / 0.14), transparent 65%)",
          }}
          aria-hidden="true"
        />

        {isLoading ? (
          <div className="grid gap-4 md:grid-cols-2">
            {Array.from({ length: 2 }).map((_, idx) => (
              <div
                key={idx}
                className="h-44 rounded-2xl border border-border/60 bg-card/50 shadow-soft backdrop-blur-xl"
              />
            ))}
          </div>
        ) : isError ? (
          <div className="rounded-2xl border border-border/60 bg-card/50 p-6 text-sm text-muted-foreground shadow-soft backdrop-blur-xl">
            Unable to load testimonials right now.
          </div>
        ) : items.length === 0 ? (
          <div className="rounded-2xl border border-border/60 bg-card/50 p-6 text-sm text-muted-foreground shadow-soft backdrop-blur-xl">
            No testimonials yet.
          </div>
        ) : (
          <Carousel
            opts={{ align: "start", loop: true }}
            className="mx-auto max-w-5xl"
          >
            <CarouselContent>
              {items.map((t, idx) => (
                <CarouselItem
                  key={t.id}
                  className="basis-full md:basis-1/2"
                >
                  <motion.div
                    initial={{ opacity: 0, y: 14 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{
                      duration: 0.55,
                      delay: Math.min(idx, 6) * 0.05,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    className="h-full"
                  >
                    <Card className="h-full overflow-hidden rounded-2xl border-border/60 bg-card/50 shadow-soft backdrop-blur-xl">
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex items-center gap-3">
                            <Avatar className="h-11 w-11">
                              {t.avatar_url ? (
                                <AvatarImage src={t.avatar_url} alt={t.author_name} />
                              ) : null}
                              <AvatarFallback>{initials(t.author_name)}</AvatarFallback>
                            </Avatar>

                            <div>
                              <p className="text-sm font-semibold tracking-tight">{t.author_name}</p>
                              <p className="text-xs text-muted-foreground">
                                {[t.author_title, t.company].filter(Boolean).join(" • ")}
                              </p>
                            </div>
                          </div>

                          {typeof t.rating === "number" ? (
                            <Stars rating={Math.max(0, Math.min(5, t.rating))} />
                          ) : null}
                        </div>

                        <p className="mt-4 text-sm leading-relaxed text-foreground/90">
                          “{t.content}”
                        </p>
                      </CardContent>
                    </Card>
                  </motion.div>
                </CarouselItem>
              ))}
            </CarouselContent>

            <div className="hidden md:block">
              <CarouselPrevious variant="glass" />
              <CarouselNext variant="glass" />
            </div>
          </Carousel>
        )}
      </div>
    </Section>
  );
}
