import { Hero } from "@/components/hero";
import { FeaturedProjects } from "@/components/featured-projects";
import { Manifesto } from "@/components/manifesto";
import { WritingResearch } from "@/components/writing-research";
import { EditorialFacts } from "@/components/editorial-facts";
import { HomeCTA } from "@/components/home-cta";

export default function HomePage() {
  return (
    <>
      <Hero />
      <FeaturedProjects />
      <Manifesto />
      <WritingResearch />
      <EditorialFacts />
      <HomeCTA />
    </>
  );
}
