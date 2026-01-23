import Navbar from "@/components/portfolio/Navbar";
import ThreeHero from "@/components/portfolio/ThreeHero";
import SkillsSection from "@/components/portfolio/SkillsSection";
import ExperienceSection from "@/components/portfolio/ExperienceSection";
import ProjectsSection from "@/components/portfolio/ProjectsSection";
import TestimonialsSection from "@/components/portfolio/TestimonialsSection";
import CvSection from "@/components/portfolio/CvSection";
import ContactSection from "@/components/portfolio/ContactSection";
import Footer from "@/components/portfolio/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background font-sans text-foreground">
      <a
        href="#content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-xl focus:bg-secondary focus:px-3 focus:py-2 focus:text-sm"
      >
        Skip to content
      </a>

      <Navbar />

      <main id="content" className="relative">
        <ThreeHero />
        <SkillsSection />
        <ExperienceSection />
        <ProjectsSection />
        <TestimonialsSection />
        <CvSection />
        <ContactSection />
      </main>

      <Footer />
    </div>
  );
};

export default Index;
