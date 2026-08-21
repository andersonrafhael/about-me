import { Reveal } from "@/components/reveal";
import { institutions } from "@/data/site";

export function Institutions() {
  return (
    <section className="hairline px-site py-10" aria-labelledby="inst-title">
      <Reveal className="container-site grid gap-6 lg:grid-cols-[220px_1fr] lg:items-start">
        <h2 id="inst-title" className="mono-label pt-1">
          Trabalho com e para
        </h2>
        <ul className="grid gap-x-10 gap-y-5 sm:grid-cols-2 lg:grid-cols-5">
          {institutions.map((inst) => (
            <li
              key={inst.name}
              className="flex flex-col gap-1 border-l border-border pl-4"
            >
              <span className="font-headline text-[15px] font-medium leading-snug text-foreground">
                {inst.name}
              </span>
              <span className="font-mono text-[11px] leading-snug tracking-[0.02em] text-foreground/65">
                {inst.detail}
              </span>
            </li>
          ))}
        </ul>
      </Reveal>
    </section>
  );
}
