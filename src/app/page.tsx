import { Hero } from "@/components/hero";
import { HomeCta } from "@/components/home/cta";
import { Institutions } from "@/components/home/institutions";
import { Manifesto } from "@/components/home/manifesto";
import { Method } from "@/components/home/method";
import { Products } from "@/components/home/products";
import { WritingResearch } from "@/components/home/writing-research";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Institutions />
      <Products />
      <Method />
      <Manifesto />
      <WritingResearch />
      <HomeCta />
    </>
  );
}
