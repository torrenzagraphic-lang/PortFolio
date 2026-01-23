import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-background">
      <div className="pointer-events-none absolute inset-0 bg-hero" />
      <div className="pointer-events-none absolute inset-0 grain" />

      <section className="relative mx-auto w-full max-w-xl rounded-2xl border border-border/60 bg-card/55 p-8 shadow-glass backdrop-blur-xl">
        <h1 className="text-4xl font-semibold tracking-tight">404</h1>
        <p className="mt-2 text-muted-foreground">This page doesn’t exist. Let’s get you back.</p>
        <a
          href="/"
          className="mt-6 inline-flex rounded-xl border border-border/60 bg-secondary px-4 py-2 text-sm font-medium text-secondary-foreground shadow-soft transition-colors hover:bg-secondary/80"
        >
          Return to Home
        </a>
      </section>
    </main>
  );
};

export default NotFound;
